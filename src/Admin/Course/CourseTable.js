import React from "react";
import { message, Popconfirm, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { courseServ } from "../../Services/courseService";
import { setDataListCourse } from "../../Redux/actions/actionCourse";

export default function CourseTable({ dataListCourse = [] }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const transformedData = transformData(dataListCourse);

  function transformData(data) {
    // Không cần sử dụng flatMap nữa vì dữ liệu đã là một mảng các đối tượng
    return data.map((item) => ({
      key: item.id, // Sử dụng id của mỗi item làm key
      id: item.id,
      nofClos: item.nofClos,
      courseId: item.courseInfo.courseId,
      courseName: item.courseInfo.courseName,
    }));
  }
  
  console.log(dataListCourse);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Course ID",
      dataIndex: "courseId",
      key: "courseId",
    },
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
    },
    // Cập nhật thêm các cột tùy theo bạn muốn hiển thị thông tin gì từ `courseInfo`
   
    {
      title: "Nof. CLOs",
      dataIndex: "nofClos",
      key: "nofClos",
    },
   
    // Cột Thao tác không thay đổi
    {
      title: "Thao tác",
      key: "action",
      render: (text, record) => (
        <div className="space-x-2">
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => {
              courseServ
                .deleteCourse(record.id)
                .then(() => {
                  message.success("Xóa thành công");
                  // Cập nhật dataListCourse để loại bỏ khóa học đã xóa
                  const updatedDataListCourse = dataListCourse.filter(
                    (course) => course.id !== record.id
                  );
                  dispatch(setDataListCourse(updatedDataListCourse));
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
            className="hover:cursor-pointer text-blue-500"
            onClick={() => navigate(`/admin/course/edit/${record.id}`)}
          >
            Chỉnh sửa CLOs
          </span>
        </div>
      ),
    },
  ];

  return <Table columns={columns} dataSource={transformedData} />;
}


