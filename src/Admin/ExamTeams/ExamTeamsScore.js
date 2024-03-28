import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Upload, message, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import {
  importExamTeamsScores,
  setDataListExamteams,
} from "../../Redux/actions/actionExamteams";
import ExamTeamsScoreTable from "./ExamTeamsScoreTable";

export default function ExamTeamsScore() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileData, setFileData] = useState([]);

  useEffect(() => {
    dispatch(setDataListExamteams(id));
  }, [dispatch, id]);

  const examTeamsScores = useSelector(
    (state) =>
      state.examteamsReducer.dataListExamteams?.find((team) => team.id === id)
        ?.examScore || []
  );

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const workbook = XLSX.read(e.target.result, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          defval: null // Set default value for empty cells to null
        });
  
        const headers = jsonData.shift(); // The first row should be headers
        // Find the index for the 'Note' column, assuming 'Note' is in the headers
        const noteIndex = headers.indexOf('Note');
  
        const formattedData = jsonData.map((row) => {
          if (!row[1]) return null; // Skip the row if 'Student ID' is not present
  
          const scores = headers.slice(4, noteIndex).map((title, index) => ({
            title: title.toString(),
            score: row[index + 4] !== null ? row[index + 4].toString() : ""
          }));
  
          // Get the note from the cell at the noteIndex, if it exists
          const note = noteIndex > -1 && row[noteIndex] !== null ? row[noteIndex].toString() : "";
  
          return {
            student: {
              studentID: row[1].toString(),
              studentFirstName: row[2].toString(),
              studentLastName: row[3].toString(),
              scores: scores,
              note: note // Assign the note here
            }
          };
        }).filter(Boolean); // Filter out any null entries if rows were skipped
  
        setFileData(formattedData);
        message.success("Data loaded from file successfully.");
      } catch (error) {
        console.error("Error reading the Excel file:", error);
        message.error("There was an issue processing the Excel file.");
      }
    };
  
    reader.onerror = () => {
      console.error("FileReader error");
      message.error("Failed to read the file");
    };
  
    reader.readAsBinaryString(file);
    return false;
  };
  
  
  

  const beforeUpload = (file) => {
    const isExcel =
      file.type.includes("excel") || file.type.includes("spreadsheetml");
    if (!isExcel) {
      message.error(`${file.name} is not an excel file.`);
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const saveDataToAPI = async () => {
    try {
      const response = await dispatch(importExamTeamsScores(id, fileData));
      message.success("All scores have been successfully uploaded.");
      dispatch(setDataListExamteams(id));
    } catch (error) {
      console.error("Upload failed:", error);
      message.error("Failed to upload scores. Please try again.");
    }
  };

  const showModal = () => setIsModalVisible(true);
  const handleOk = () => setIsModalVisible(false);
  const handleCancel = () => setIsModalVisible(false);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl">Exam Teams Scores</h1>
      <Button icon={<UploadOutlined />} onClick={showModal}>
        Import from Excel
      </Button>
      <br />
      <Button type="danger" onClick={saveDataToAPI}>Save Scores</Button>


      <Modal
        title="Import Excel File"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Upload
          beforeUpload={beforeUpload}
          customRequest={({ file }) => handleFileUpload(file)}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        <div>
          <a href={`/assets/Examscore.xlsx`} download="Examscore.xlsx">
            Download Sample File
          </a>
        </div>
      
      </Modal>
      <ExamTeamsScoreTable data={examTeamsScores} onDataChange={setFileData} />
    </div>
  );
}
