import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Input, Upload, message, Select, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ExamTeamsTable from "./ExamTeamsTable";
import { importExamTeams, setDataListExamteams } from "../../Redux/actions/actionExamteams";
import * as XLSX from "xlsx";

const { Option } = Select;

export default function ExamTeams() {
    const dispatch = useDispatch();
    const [semester, setSemester] = useState("");
    const [schoolYear, setSchoolYear] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

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
                    semester: item["Semester"],
                    schoolYear: item["School Year"]
                }));

                for (const course of formattedData) {
                    await dispatch(importExamTeams(course));
                }

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

    const handleSemesterChange = (value) => {
        setSemester(value);
    };

    const handleSchoolYearChange = (value) => {
        setSchoolYear(value);
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

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl">Exam Teams</h1>
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
                    <a href={`/assets/ExampleExamTeam.xlsx`} download="ExampleExamTeam.xlsx">Download Sample File</a>
                </div>
            </Modal>
            
            <div className="flex justify-start items-center my-4">
                <span style={{ marginRight: 8 }}>Semester:</span>
                <Select
                    placeholder="Select semester"
                    style={{ width: 150 }}
                    value={semester}
                    onChange={handleSemesterChange}
                >
                    <Option value="semester1">1</Option>
                    <Option value="semester2">2</Option>
                </Select>
                <span style={{ marginRight: 8 }}>School year:</span>
                <Select
                    placeholder="Select school year"
                    style={{ width: 150 }}
                    value={schoolYear}
                    onChange={handleSchoolYearChange}
                >
                    <Option value="2022-2023">22-23</Option>
                    <Option value="2023-2024">23-24</Option>
                </Select>
            </div>
            <ExamTeamsTable />
        </div>
    );
}
