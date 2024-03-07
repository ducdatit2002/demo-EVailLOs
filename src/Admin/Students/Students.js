import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input, Upload, message, Select } from "antd";
import { UploadOutlined, SearchOutlined } from "@ant-design/icons";
import StudentsTable from "./StudentsTable";
import * as XLSX from "xlsx";

const { Option } = Select;

const beforeUpload = (file) => {
  const isExcel =
    file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  if (!isExcel) {
    message.error(`${file.name} is not an Excel file`);
  }
  return isExcel || Upload.LIST_IGNORE;
};

const handleFileUpload = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const workbook = XLSX.read(e.target.result, { type: "binary" });
    console.log(workbook);
    message.success(`${file.name} file processed successfully`);
  };
  reader.readAsBinaryString(file);
};

const onSearch = (value) => console.log(value);

export default function Course() {
  const [semester, setSemester] = useState("");
  const [schoolYear, setSchoolYear] = useState("");

  const handleSemesterChange = (value) => {
    setSemester(value);
  };

  const handleSchoolYearChange = (value) => {
    setSchoolYear(value);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl">STUDENTS MANAGEMENT</h1>
      <div className="flex justify-start items-center">
        <Upload
          beforeUpload={beforeUpload}
          customRequest={({ file }) => handleFileUpload(file)}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Import từ Excel</Button>
        </Upload>
      </div>
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
        <Input.Search
          placeholder="Enter the student name"
          allowClear
          onSearch={onSearch}
          style={{ width: 250, marginLeft: 16 }}
          enterButton={<SearchOutlined />}
        />
      </div>
      <StudentsTable semester={semester} schoolYear={schoolYear} />
    </div>
  );
}