import React from "react";
import { message, Popconfirm, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { examteamsServ } from "../../Services/examteamsService";
import { setDataListExamteams } from "../../Redux/actions/actionExamteams";

export default function ExamTeamsTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const examTeamsList = useSelector(
    (state) => state.examteamsReducer.dataListExamteams || []
  );

  // Function to handle the deletion of an exam team
  const handleDelete = (id) => {
    examteamsServ
      .deleteExamTeam(id)
      .then(() => {
        message.success("Exam team deleted successfully");
        // Re-fetch the updated list of exam teams
        dispatch(setDataListExamteams());
      })
      .catch((err) => {
        message.error("Failed to delete exam team");
        console.error(err);
      });
  };

  const dataSource = examTeamsList.map((item) => ({
    key: item.No,
    courseID: item.courseID,
    courseName: item.courseName,
    courseGroup: item.courseGroup,
    examTeams: item.examTeams,
    numberOfStudent: item.numberOfStudent,
    examDate: item.examDate,
    examTime: item.examTime,
    examRoom: item.examRoom,
    examType: item.examType,
    lecturer: item.lecturer,
    id: item.id,
  }));

  const columns = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Course ID",
      dataIndex: "courseID",
      key: "courseID",
    },
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Course Group",
      dataIndex: "courseGroup",
      key: "courseGroup",
    },
    {
      title: "Exam Teams",
      dataIndex: "examTeams",
      key: "examTeams",
    },
    {
      title: "No of Student",
      dataIndex: "numberOfStudent",
      key: "numberOfStudent",
    },
    {
      title: "Exam Date",
      dataIndex: "examDate",
      key: "examDate",
    },
    {
      title: "Exam Time",
      dataIndex: "examTime",
      key: "examTime",
    },
    {
      title: "Exam Room",
      dataIndex: "examRoom",
      key: "examRoom",
    },
    {
      title: "Exam Type",
      dataIndex: "examType",
      key: "examType",
    },
    {
      title: "Lecturer",
      dataIndex: "lecturer",
      key: "lecturer",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="space-x-2">
          <Popconfirm
            title="Are you sure to delete this exam team?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <span className="hover:cursor-pointer text-red-500">Delete</span>
          </Popconfirm>
          <br />
          <span
            className="hover:cursor-pointer text-blue-500"
            onClick={() => navigate(`/admin/examteams/edit/${record.id}`)}
          >
            Edit
          </span>
          <br />
          <span
            className="hover:cursor-pointer text-green-500"
            onClick={() => navigate(`/admin/examteams/examteamsscore/${record.id}`)}
          >
            Score
          </span>
        </div>
      ),
    },
  ];

  return <Table columns={columns} dataSource={dataSource} />;
}
