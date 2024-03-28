import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Table, Modal, Form, Input, Button } from 'antd';
import { importExamTeamsScores } from '../../Redux/actions/actionExamteams';

const ExamTeamsScoreTable = ({ data, id, onDataChange }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [tempScores, setTempScores] = useState([]); 
  const [form] = Form.useForm();
const dispatch = useDispatch();
  const showEditModal = (record) => {
    setEditingStudent(record);
    setIsModalVisible(true);
    // Set giá trị cho form dựa trên dữ liệu của sinh viên được chọn
    const scores = record.student.scores.reduce((acc, curr) => {
      acc[curr.title] = curr.score; // Sửa đổi tại đây
      return acc;
    }, {});
    form.setFieldsValue({
      ...scores, // Đảm bảo rằng các điểm được set vào form
      note: record.student.note,
    });
  };


  const handleOk = () => {
    form.validateFields().then((values) => {
      // Map the form values back to the student scores structure
      const updatedScores = editingStudent.student.scores.map(score => ({
        ...score,
        score: values[score.title], // Update the score based on the form values
      }));
  
      // Prepare the updated student object with the new scores
      const updatedStudentData = {
        ...editingStudent,
        student: {
          ...editingStudent.student,
          scores: updatedScores,
          note: values.note,
        },
      };
  
      // Call the onDataChange prop with the updated scores
      // This should update the tempScores state in the parent component
      onDataChange(data.map(item => 
        item.student.studentID === updatedStudentData.student.studentID ? updatedStudentData : item
      ));
  
      setIsModalVisible(false);
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };
  
  

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const generateColumns = () => {
    const baseColumns = [
      { title: 'STT', dataIndex: 'stt', key: 'stt', render: (_, __, index) => index + 1 },
      { title: 'Student ID', dataIndex: ['student', 'studentID'], key: 'studentID' },
      { title: 'Student First Name', dataIndex: ['student', 'studentFirstName'], key: 'firstName' },
      { title: 'Student Last Name', dataIndex: ['student', 'studentLastName'], key: 'lastName' },
      { title: 'Note', dataIndex: ['student', 'note'], key: 'note' },
      
    ];
  
    // Collect all unique score titles across all students
    const scoreTitles = data.reduce((titles, item) => {
      // Ensure 'scores' is an array before calling forEach
      if (Array.isArray(item.student.scores)) {
        item.student.scores.forEach(score => {
          if (score && !titles.includes(score.title)) {
            titles.push(score.title);
          }
        });
      }
      return titles;
    }, []);
  
    // Create a column for each score title
    const scoreColumns = scoreTitles.map(title => ({
      title,
      dataIndex: ['student', 'scores'],
      key: title,
      render: (scores) => {
        // Safely find the score object with the matching title
        const scoreObject = scores?.find(s => s.title === title);
        return scoreObject ? scoreObject.score : '-';
      },
    }));
    
    return [...baseColumns, ...scoreColumns];
  };
  
  const dataSource = data.map((item, index) => ({
    key: index,
    stt: index + 1,
    ...item,
  }));

  return (
    <>
      <Table
        dataSource={dataSource}
        columns={generateColumns()}
        pagination={false}
        onRow={(record) => ({
          onClick: () => showEditModal(record),
        })}
      />
  <Modal
    title="Edit Student Scores"
    visible={isModalVisible}
    onOk={handleOk}
    onCancel={handleCancel}
    okText="Save"
    cancelText="Cancel"
  >
    <Form form={form} layout="vertical">
      {editingStudent?.student.scores.map((score, index) => (
        <Form.Item
          key={index}
          name={score.title} // Use the score title as the name of the Form.Item
          label={score.title} // The label is also the score title
        >
          <Input />
        </Form.Item>
      ))}
      <Form.Item name="note" label="Note">
        <Input />
      </Form.Item>
    </Form>
  </Modal>
    </>
  );
};

export default ExamTeamsScoreTable;
