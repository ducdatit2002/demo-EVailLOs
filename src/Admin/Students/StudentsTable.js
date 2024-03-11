import React from 'react';
import { message, Popconfirm, Table } from "antd";
import { useDispatch } from "react-redux";
import { studentServ } from "../../Services/studentService";
import { setDataListStudent } from "../../Redux/actions/actionStudent";


export default function StudentTable({dataListStudent = []}){
  const dispatch = useDispatch();
  //const navigate = useNavigate();
  
  // Chuyển đổi dữ liệu dựa trên cấu trúc dữ liệu thực tế
  function transformData(data) {
    return data.map((item) => ({
       key: item.studentId, // Sử dụng studentId làm key
       id: item.id,
       studentId: item.studentId,
       studentFirstName: item.studentFirstName,
       studentLastName: item.studentLastName,
       classId: item.classId,
       courseName: item.courseName,
       courseGroups: item.courseGroups,
       violation: item.violation,
       note: item.note,
    }));
  }

  // Gọi hàm chuyển đổi dữ liệu
  const transformedData = transformData(dataListStudent);
  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Student ID',
      dataIndex: 'studentId',
      key: 'studentId',
    },
    {
      title: 'Student First Name',
      dataIndex: 'studentFirstName',
      key: 'studentFirstName',
    },
    {
      title: 'Student Last Name',
      dataIndex: 'studentLastName',
      key: 'studentLastName',
    },
    {
      title: 'Class',
      dataIndex: 'classId',
      key: 'classId',
    },
    {
      title: 'Course Name',
      dataIndex: 'courseGroups',
      key: 'courseGroups',
    },
    {
      title: 'Course Group',
      dataIndex: 'courseName',
      key: 'courseName',
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
                  // Cập nhật dataListStudent để loại bỏ student đã xóa
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
          {/* <span
            className="hover:cursor-pointer text-purple-500"
            onClick={() => navigate(`/admin/student/studentEdit/${record.id}`)}
          >
            Sửa
          </span> */}
        </div>
      ),
    },
  ];

  return <Table columns={columns} dataSource={transformedData} />;
}

