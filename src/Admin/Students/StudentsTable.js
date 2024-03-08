import React from 'react';
import { message, Popconfirm, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { studentServ } from "../../Services/studentService";
import { setDataListStudent } from "../../Redux/actions/actionStudent";


export default function StudentTable({dataListStudent = []}){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const transformedData = transformData(dataListStudent);


function transformData(data){
  return data.map((item) => ({
    key: item.No,
    id: item.No,
    studentId: item.studentInfo.studentId,
    studentName: item.studentInfo.studentName,
    classId: item.studentInfo.classId,
    violation: item.studentInfo.violation,
    note: item.studentInfo.note,
  }));
}

console.log(dataListStudent);
  // Các cột của bảng
  const columns = [
    {
      title: 'No',
      dataIndex: 'No',
      key: 'No',
    },
    {
      title: 'Student ID',
      dataIndex: 'studentId',
      key: 'studentId',
    },
    {
      title: 'Student Name',
      dataIndex: 'studentName',
      key: 'studentName',
    },
    {
      title: 'Class',
      dataIndex: 'classId',
      key: 'classId',
    },
    {
      title: 'Violation',
      dataIndex: 'violation',
      key: 'violation',
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
    },

    {
      title: "Thao tác",
      key: "action",
      render: (text, record) => (
        <div className="space-x-2">
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => {
              studentServ
                .deleteStudent(record.id)
                .then(() => {
                  message.success("Xóa thành công");
                  // Cập nhật dataListCourse để loại bỏ khóa học đã xóa
                  const updatedDataListStudent = dataListStudent.filter(
                    (student) => student.id !== record.id
                  );
                  dispatch(setDataListStudent(updatedDataListStudent));
                })

                .catch((err) => {
                  message.error("Xóa thất bại");
                  console.error(err);
                });
            }}
            okText="Yes"
            cancelText="No"
          >
            <span className="hover:cursor-pointer text-red-500">Xóa</span>
          </Popconfirm>
          <span
            className="hover:cursor-pointer text-purple-500"
            onClick={() => navigate(`/admin/student/studentEdit/${record.id}`)}
          >
            Sửa
          </span>
        </div>
      ),
    },
  ];

  return <Table columns={columns} dataSource={transformedData} />;
}
