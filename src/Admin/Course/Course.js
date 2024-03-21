import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Upload, message } from "antd";
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";
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

      const formattedData = excelData.map((item) => ({
        courseInfo: {
          id: item["No"],
          courseId: item["Course ID"],
          courseName: item["Course Name"],
        },
        CLOs: [
          { clo1: item["CLO1"], cloNote: item["CLO1_Note"] },
          { clo2: item["CLO2"], cloNote: item["CLO2_Note"] },
          { clo3: item["CLO3"], cloNote: item["CLO3_Note"] },
          { clo4: item["CLO4"], cloNote: item["CLO4_Note"] },
          { clo5: item["CLO5"], cloNote: item["CLO5_Note"] },
          { clo6: item["CLO6"], cloNote: item["CLO6_Note"] },
        ].filter(
          (clo) =>
            clo.clo1 || clo.clo2 || clo.clo3 || clo.clo4 || clo.clo5 || clo.clo6
        ),
        nofClos: item["CLOs"],
      }));

      dispatch(importCourses(formattedData));
    };
    reader.readAsBinaryString(file);
    return false; // Prevent upload
  };

  const beforeUpload = (file) => {
    const isExcel =
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.type === "application/vnd.ms-excel";
    if (!isExcel) {
      message.error(`${file.name} is not an excel file`);
    }
    return isExcel || Upload.LIST_IGNORE;
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl">COURSE</h1>
      <div className="flex justify-between items-center">
        <Upload
          beforeUpload={beforeUpload}
          customRequest={({ file }) => handleFileUpload(file)}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Import từ Excel</Button>
        </Upload>
      </div>
      <br />
      <a href={`/assets/ExampleCourse.xlsx`} download="ExampleCourse.xlsx">
        Download Mẫu Course
      </a>
      <br />

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
