import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import CourseTable from "./CourseTable";
import {
  searchCourse,
  setDataListCourse,
  importCourses,
} from "../../Redux/actions/actionCourse";
import * as XLSX from "xlsx";

const { Search } = Input;

export default function Course() {
  const { dataListCourse } = useSelector((state) => state.courseReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDataListCourse());
  }, [dispatch]);

  const onSearch = (value) => {
    dispatch(searchCourse(value));
  };

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet);
  
      // Map the Excel data to your API structure
      const formattedData = excelData.map((item) => ({
        courseInfo: {
          courseId: item.courseId,
          courseName: item.courseName,
          semester: item.semester,
          schoolYear: item.schoolYear,
          teacherId: item.teacherId,
          classId: item.classId,
        },

      }));

      dispatch(importCourses(formattedData));
    };
    reader.readAsBinaryString(file);
    return false; // Prevent upload
  };
  

  const beforeUpload = (file) => {
    const isExcel = file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type === "application/vnd.ms-excel";
    if (!isExcel) {
      message.error(`${file.name} is not an excel file`);
    }
    return isExcel || Upload.LIST_IGNORE;
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl">COURSE</h1>
      <div className="flex justify-between items-center">
        {/* <NavLink to="/admin/course/addnew">
          <Button type="primary">Thêm Khóa Học Mới</Button>
        </NavLink> */}
        <Upload
          beforeUpload={beforeUpload}
          customRequest={({ file }) => handleFileUpload(file)}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Import từ Excel</Button>
        </Upload>
      </div>
      <Search
        placeholder="Nhập tên khóa học muốn tìm"
        allowClear
        onSearch={onSearch}
        style={{ width: 600 }}
        className="my-4"
      />
      <CourseTable dataListCourse={dataListCourse} />
    </div>
  );
}
