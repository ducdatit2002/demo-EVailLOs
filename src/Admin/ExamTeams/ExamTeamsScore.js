import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ExamTeamsScoreTable from './ExamTeamsScoreTable';
import { setDataListExamteams } from '../../Redux/actions/actionExamteams';
import * as XLSX from 'xlsx';
export default function ExamTeamsScore() {
  const dispatch = useDispatch();
  const [fileData, setFileData] = useState([]);

  useEffect(() => {
    dispatch(setDataListExamteams());
  }, [dispatch]);

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const workbook = XLSX.read(e.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(worksheet);
        setFileData(excelData); // Save the data to state
        message.success(`${file.name} file processed successfully`);
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
    // The `return false` here might be unnecessary, as the function doesn't need to return anything for `customRequest`.
  };

  const beforeUpload = (file) => {
    const isExcel = file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type === "application/vnd.ms-excel";
    if (!isExcel) {
      message.error(`${file.name} is not an excel file.`);
      return Upload.LIST_IGNORE; // This should be the return value if the file is not an Excel file.
    }
    return true; // Return true to allow the file upload process to continue.
  };

  // const handleSaveScores = async () => {
  //   // Chuyển đổi dữ liệu từ Excel sang cấu trúc cần thiết cho API
  //   const scoresForApi = fileData.map((student, index) => {
  //     return {
  //       id: student['No'].toString(), // Đảm bảo rằng 'id' là một chuỗi
  //       examScore: {
  //         No: student['No'],
  //         studentID: student['Student ID'],
  //         studentFirstName: student['Student first name'],
  //         studentLastName: student['Student last name'],
  //         score: [{
  //           mcq_q1: student.mcq_q1,
  //           mcq_q2: student.mcq_q2,
  //           mcq_q3: student.mcq_q3,
  //           mcq_q4: student.mcq_q4,
  //           mcq_q5: student.mcq_q5,
  //           wq_q1: student.wq_q1,
  //           wq_q2: student.wq_q2,
  //           note: student.Note
  //         }]
  //       }
  //     };
  //   });
  
  //   try {
  //     // Gửi mỗi đối tượng điểm số lên API
  //     for (const scoreData of scoresForApi) {
  //       await examteamsServ.importExamTeamsScore({ examScore: scoreData.examScore });
  //       // Đảm bảo rằng phương thức importExamTeamsScore được thiết kế để nhận và xử lý cấu trúc dữ liệu này
  //     }
  //     message.success('Exam scores have been successfully updated.');
  //     // Làm mới dữ liệu trong Redux store nếu cần
  //     dispatch(setDataListExamteams());
  //   } catch (error) {
  //     message.error('Failed to update exam scores.');
  //     console.error('Error updating exam scores:', error);
  //   }
  // };
  const handleSaveScores = () => {
    // Chuyển đổi dữ liệu từ Excel sang cấu trúc cần thiết
    const scoresForLocalStorage = fileData.map((student) => {
      return {
        id: student['No'].toString(), // Đảm bảo rằng 'id' là một chuỗi
        examScore: {
          No: student['No'],
          studentID: student['Student ID'],
          studentFirstName: student['Student first name'],
          studentLastName: student['Student last name'],
          score: [{
            mcq_q1: student.mcq_q1,
            mcq_q2: student.mcq_q2,
            mcq_q3: student.mcq_q3,
            mcq_q4: student.mcq_q4,
            mcq_q5: student.mcq_q5,
            wq_q1: student.wq_q1,
            wq_q2: student.wq_q2,
            note: student.Note
          }]
        }
      };
    });
  
    // Serialize và lưu trữ dữ liệu vào localStorage
    try {
      // Lưu từng bản ghi dựa trên ID của sinh viên
      scoresForLocalStorage.forEach((record) => {
        localStorage.setItem(`examScore-${record.id}`, JSON.stringify(record.examScore));
      });
  
      message.success('Exam scores have been successfully saved to local storage.');
    } catch (error) {
      message.error('Failed to save exam scores to local storage.');
      console.error('Error saving exam scores:', error);
    }
  };
  
  
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl">Exam Teams Scores</h1>
      <Upload
        beforeUpload={beforeUpload}
        customRequest={({ file }) => handleFileUpload(file)}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>Import Scores from Excel</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleSaveScores}
        disabled={!fileData.length}
        style={{ marginLeft: 8 }}
      >
        Save Scores
      </Button>
      <ExamTeamsScoreTable data={fileData} />
    </div>
  );
}
