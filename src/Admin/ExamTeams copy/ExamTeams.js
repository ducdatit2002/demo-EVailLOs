import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import { importExamTeams } from "../../Redux/actions/actionCourse";
import ExamTeamsTable from "./ExamTeamsTable";

export default function ExamTeams() {
  const [results, setResults] = useState(null);
  const dispatch = useDispatch();
  const examData = useSelector((state) => state.examData); // Replace with your actual data path

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet);
      dispatch(importExamTeams(excelData)); // Assuming you have an action that handles this
    };
    reader.readAsBinaryString(file);
    return false; // Prevent default upload behavior
  };

  const beforeUpload = (file) => {
    const isExcel = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ].includes(file.type);
    if (!isExcel) {
      message.error(`${file.name} is not an excel file.`);
    }
    return isExcel || Upload.LIST_IGNORE;
  };

  const calculateResults = () => {
    if (!examData || !Array.isArray(examData)) {
      message.error("Exam data is not loaded or in an unexpected format.");
      return;
    }

    // Filter out absent students before calculations
    const filteredData = examData.filter(
      (student) => student.note !== "ABSENT"
    );
    const numStudents = filteredData.length;
    let cloTotals = { CLO1: 0, CLO2: 0, CLO3: 0 };
    let cloCounts = { CLO1: 0, CLO2: 0, CLO3: 0 };

    filteredData.forEach((student) => {
      Object.entries(student).forEach(([key, value]) => {
        if (key.startsWith("mcq_") || key.startsWith("wq_")) {
          if (value > 0) {
            const cloMapping = {
              mcq_q1: ["CLO1", "CLO2", "CLO3"],
              mcq_q2: ["CLO1"],
              mcq_q3: ["CLO1", "CLO2"],
              mcq_q4: ["CLO1"],
              mcq_q5: ["CLO1"],
              wq_q1: ["CLO1"],
              wq_q2: ["CLO1"],
            };

            cloMapping[key]?.forEach((clo) => {
              cloTotals[clo] += value;
              cloCounts[clo] += 1;
            });
          }
        }
      });
    });

    let cloAverages = {};
    for (const clo in cloTotals) {
      cloAverages[clo] =
        cloCounts[clo] > 0 ? cloTotals[clo] / cloCounts[clo] : 0;
    }

    let percentPassCLO = {};
    for (const clo in cloAverages) {
      percentPassCLO[clo] = (cloAverages[clo] / numStudents) * 100;
    }

    setResults({ cloAverages, percentPassCLO });
  };
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl">Exam Teams</h1>
      <Upload
        beforeUpload={beforeUpload}
        customRequest={({ file }) => handleFileUpload(file)}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>Import from Excel</Button>
      </Upload>
      <ExamTeamsTable />
      <Button type="primary" onClick={calculateResults}>
        Calculate Results
      </Button>
      {/* Results display */}
      {results && (
        <div>
          <h2>Results:</h2>
          <table>
            <thead>
              <tr>
                <th>CLO ID</th>
                <th>Average Score</th>
                <th>% Pass</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(results.cloAverages).map(([cloId, average]) => (
                <tr key={cloId}>
                  <td>{cloId}</td>
                  <td>{average.toFixed(2)}</td>
                  <td>{results.percentPassCLO[cloId].toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
