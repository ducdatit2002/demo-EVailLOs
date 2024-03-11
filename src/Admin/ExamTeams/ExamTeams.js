import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ExamTeamsTable from "./ExamTeamsTable";
import { importExamTeams, setDataListExamteams } from "../../Redux/actions/actionExamteams";
import * as XLSX from "xlsx";

export default function ExamTeams() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(setDataListExamteams());
    }, [dispatch]);
    
    const handleFileUpload = (file) => {
      const reader = new FileReader();
    
      reader.onload = async (e) => {
        try {
          const workbook = XLSX.read(e.target.result, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const excelData = XLSX.utils.sheet_to_json(worksheet);
    
          const formattedData = excelData.map(item => ({
            // Your existing mapping
            courseID: item["Course ID"],
            courseName: item["Course Name"],
            courseGroup: item["Course Group"],
            examTeams: item["Exam Team"],
            numberOfStudent: item["Number of Student"],
            examDate: item["Exam Date"],
            examTime: item["Exam Time"],
            examRoom: item["Exam Room"],
            examType: item["Exam Type"],
            lecturer: item["Lecturer"],
            // Add any additional fields here
          }));
    
          // Sequentially dispatch actions for each course
          for (const course of formattedData) {
            await dispatch(importExamTeams(course));
          }
    
          // After all courses are imported, update the exam teams list
          dispatch(setDataListExamteams());
    
        } catch (error) {
          console.error("Error reading the Excel file: ", error);
          message.error("There was an issue processing the Excel file.");
        }
      };
    
      reader.onerror = (error) => {
        console.error("Error reading the Excel file: ", error);
        message.error("There was an issue reading the Excel file.");
      };
    
      reader.readAsBinaryString(file);
      return false; // Prevent default upload behavior
    };
    
  

    const beforeUpload = (file) => {
        const isExcel = file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type === "application/vnd.ms-excel";
        if (!isExcel) {
            message.error(`${file.name} is not an excel file.`);
        }
        return isExcel || Upload.LIST_IGNORE;
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
        </div>
    );
}
