import React from 'react';
import { Table } from 'antd';

const StudentsTable = () => {
  // Các cột của bảng
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Lớp',
      dataIndex: 'class',
      key: 'class',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ];

  // Dữ liệu giả định, thay thế bằng dữ liệu thực tế từ API hoặc state
  const data = [
    {
      key: '1',
      id: 1,
      name: 'Nguyễn Văn A',
      class: '10A1',
      email: 'vana@example.com',
    },
    {
      key: '2',
      id: 2,
      name: 'Trần Thị B',
      class: '10A2',
      email: 'thib@example.com',
    },
    // Thêm nhiều sinh viên tại đây
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default StudentsTable;
