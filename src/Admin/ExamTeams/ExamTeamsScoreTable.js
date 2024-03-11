// ExamTeamsScoreTable.js
import React from 'react';
import { Table } from 'antd';

const ExamTeamsScoreTable = ({ data }) => {
  const columns = [
    { title: 'No', dataIndex: 'No', key: 'No' },
    { title: 'Student ID', dataIndex: 'Student ID', key: 'Student ID' },
    { title: 'Student First Name', dataIndex: 'Student first name', key: 'Student first name' },
    { title: 'Student Last Name', dataIndex: 'Student last name', key: 'Student last name' },
    { title: 'MCQ Q1', dataIndex: 'mcq_q1', key: 'mcq_q1' },
    { title: 'MCQ Q2', dataIndex: 'mcq_q2', key: 'mcq_q2' },
    { title: 'MCQ Q3', dataIndex: 'mcq_q3', key: 'mcq_q3' },
    { title: 'MCQ Q4', dataIndex: 'mcq_q4', key: 'mcq_q4' },
    { title: 'MCQ Q5', dataIndex: 'mcq_q5', key: 'mcq_q5' },
    { title: 'WQ Q1', dataIndex: 'wq_q1', key: 'wq_q1' },
    { title: 'WQ Q2', dataIndex: 'wq_q2', key: 'wq_q2' },
    { title: 'Note', dataIndex: 'Note', key: 'Note' },
  ];

  // Process the data as needed for display, ensuring the data keys match column dataIndeces
  const processedData = data.map((item, index) => ({
    key: index.toString(),
    ...item,
  }));

  return (
    <Table columns={columns} dataSource={data} pagination={false} rowKey="No" />
  );
};

export default ExamTeamsScoreTable;