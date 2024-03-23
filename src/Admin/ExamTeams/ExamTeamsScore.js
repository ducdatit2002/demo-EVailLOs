import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Upload, message, Modal } from 'antd';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import ExamTeamsScoreTable from './ExamTeamsScoreTable';
import { setDataListExamteams } from '../../Redux/actions/actionExamteams';
import * as XLSX from 'xlsx';
export default function ExamTeamsScore() {
  const dispatch = useDispatch();
  const [fileData, setFileData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);




  const mockData = [
    {
       key: '1',
       'No': '1',
       'Student ID': 'S001',
       'Student first name': 'John',
       'Student last name': 'Doe',
       'Total Score': 80,
       'Note': 'Good performance',
       absent: false, // This is now at the student level
       questions: [
         {
           questionId: 'Q1',
           score: 40,
           maxScore:50,
           clo: 'CLO1, CLO2',
         },
         {
           questionId: 'Q2',
           score: 40,
           maxScore:50,
           clo: 'CLO1',
         },
         // Add more questions as needed
       ],
    },
    {
       key: '2',
       'No': '2',
       'Student ID': 'S002',
       'Student first name': 'Jane',
       'Student last name': 'Smith',
       'Total Score': 90,
       'Note': 'Excellent performance',
       absent: true, // This is now at the student level
       questions: [
         {
           questionId: 'Q1',
           score: 85,
           clo: 'CLO1, CLO2',
         },
         {
           questionId: 'Q2',
           score: 85,
           clo: 'CLO1',
         },
       ],
    },
   ];
   
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
        setFileData(excelData); 
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
  };

  const beforeUpload = (file) => {
    const isExcel = file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type === "application/vnd.ms-excel";
    if (!isExcel) {
      message.error(`${file.name} is not an excel file.`);
      return Upload.LIST_IGNORE; 
    }
    return true;
  };

  const showModal = () => {
    setIsModalVisible(true);
};

const handleOk = () => {
    setIsModalVisible(false);
};

const handleCancel = () => {
    setIsModalVisible(false);
};


  const handleSaveScores = () => {
    const scoresForLocalStorage = fileData.map((student) => {
      return {
        id: student['No'].toString(), 
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
  
    try {
      scoresForLocalStorage.forEach((record) => {
        localStorage.setItem(`examScore-${record.id}`, JSON.stringify(record.examScore));
      });
  
      message.success('Exam scores have been successfully saved to local storage.');
    } catch (error) {
      message.error('Failed to save exam scores to local storage.');
      console.error('Error saving exam scores:', error);
    }
  };
  
  // const handleExportCLOsResult = () => {
  //   const ws = XLSX.utils.json_to_sheet(fileData);
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, "CLOsResult");
  //   XLSX.writeFile(wb, "Ex_CLOsResult.xlsx");
  // };
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl">Exam Teams Scores</h1>
      <Button icon={<UploadOutlined />} onClick={showModal}>Import from Excel</Button>

      <Modal title="Import Excel File" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Upload
                    beforeUpload={beforeUpload}
                    customRequest={({ file }) => handleFileUpload(file)}
                    showUploadList={false}
                >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
                <div>
                <a href={`/assets/Examscore.xlsx`} download="Examscore.xlsx">Download Sample File</a>
                </div>
            </Modal>

      
      <Button
        type="primary"
        onClick={handleSaveScores}
        disabled={!fileData.length}
        style={{ marginLeft: 8 }}
      >
        Save Scores
      </Button>
      {fileData.length > 0 && (
        <a
          href={`/assets/Ex_CLOsResult.xlsx`}
          download="Ex_CLOsResult.xlsx"
        >
          <Button
            icon={<DownloadOutlined />}
            style={{ marginLeft: 8 }}
          >
            Export CLO Result
          </Button>
        </a>
      )}
      {/* <ExamTeamsScoreTable data={fileData} /> */}
      { <ExamTeamsScoreTable initialData={mockData} /> }

    </div>
  );
}
