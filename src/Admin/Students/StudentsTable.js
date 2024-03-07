import React from 'react';
import { Table } from 'antd';

const StudentsTable = () => {
  // Các cột của bảng
  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
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
      dataIndex: 'class',
      key: 'class',
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
  ];

  // Dữ liệu giả định, thay thế bằng dữ liệu thực tế từ API hoặc state
  const data = [
    {
      key: '1',
      no: 1,
      studentId: 'ITITIU20000',
      studentName: 'Nguyễn Văn A',
      class: 'ITCS20IU',
      violation: 'None',
      note: 'Good student',
    },
    {
      key: '2',
      no: 2,
      studentId: 'ITITIU20001',
      studentName: 'Trần Thị B',
      class: 'ITCS20IU',
      violation: '2 times',
      note: 'Needs improvement',
    },
    {
      key: '3',
      no: 3,
      studentId: 'ITITIU20003',
      studentName: 'Phạm Văn C',
      class: 'ITCS20IU',
      violation: '1 time',
      note: 'Average student',
    },
    {
      key: '4',
      no: 4,
      studentId: 'ITITIU20004',
      studentName: 'Hoàng Thị D',
      class: 'ITCS20IU',
      violation: 'None',
      note: 'Excellent student',
    },
    // Add more students here if needed
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default StudentsTable;
