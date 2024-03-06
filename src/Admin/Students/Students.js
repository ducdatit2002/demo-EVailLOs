import React from "react";
import { useDispatch } from "react-redux"; // If you need to dispatch actions
import { Button, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import StudentsTable from "./StudentsTable";
import * as XLSX from "xlsx";

// Placeholder beforeUpload function
const beforeUpload = (file) => {
  const isExcel = file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  if (!isExcel) {
    message.error(`${file.name} is not an Excel file`);
  }
  return isExcel || Upload.LIST_IGNORE;
};

// Placeholder handleFileUpload function
const handleFileUpload = (file) => {
  // Example: Reading and processing the file
  const reader = new FileReader();
  reader.onload = (e) => {
    const workbook = XLSX.read(e.target.result, { type: 'binary' });
    // Process workbook
    console.log(workbook);
    message.success(`${file.name} file processed successfully`);
  };
  reader.readAsBinaryString(file);
};

// Placeholder onSearch function
const onSearch = (value) => console.log(value);

export default function Course() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl">STUDENTS MANAGEMENT</h1>
      <div className="flex justify-between items-center">
        <Upload
          beforeUpload={beforeUpload}
          customRequest={({ file }) => handleFileUpload(file)}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Import từ Excel</Button>
        </Upload>
      </div>
      <Input.Search
        placeholder="Nhập tên khóa học muốn tìm"
        allowClear
        onSearch={onSearch}
        style={{ width: 600 }}
        className="my-4"
      />
      <StudentsTable />
    </div>
  );
}
