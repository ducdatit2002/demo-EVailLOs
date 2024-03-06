import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'antd';

export default function ExamTeamsTable() {
  const examTeamsList = useSelector(state => state.examTeamsReducer.examTeamsList || []);

  // Dynamically generate columns based on the questions present in the first item, if available
  let questionColumns = [];
  if (examTeamsList.length > 0) {
    const firstItem = examTeamsList[0];
    questionColumns = Object.keys(firstItem)
      .filter(key => key.startsWith('mcq_') || key.startsWith('wq_'))
      .map(questionKey => ({
        title: questionKey.toUpperCase(),
        dataIndex: questionKey,
        key: questionKey,
      }));
  }

  const columns = [
    { title: 'No.', dataIndex: 'no', key: 'no' },
    { title: 'Student ID', dataIndex: 'studentId', key: 'studentId' },
    { title: 'Student Name', dataIndex: 'studentName', key: 'studentName' },
    ...questionColumns, // Spread the dynamically generated question columns here
    { title: 'Note', dataIndex: 'note', key: 'note' },
  ];

  // Map the dataSource to include dynamic question scores and notes
  const dataSource = examTeamsList.map((item, index) => ({
    key: index,
    no: index + 1,
    studentId: item["Student ID"],
    studentName: `${item["Student first name"]} ${item["Student last name"]}`,
    ...Object.keys(item).reduce((acc, currKey) => {
      if (currKey.startsWith('mcq_') || currKey.startsWith('wq_')) {
        acc[currKey] = item[currKey];
      }
      return acc;
    }, {}),
    note: item.note,
  }));

  return <Table columns={columns} dataSource={dataSource} />;
}
