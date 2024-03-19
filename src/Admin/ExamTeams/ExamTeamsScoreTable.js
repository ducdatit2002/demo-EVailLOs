import React, { useState, useEffect } from 'react';
import { Table, Form, Input, Button, InputNumber, Select, Checkbox, Space } from 'antd';

const ExamTeamsScoreTable = ({ initialData }) => {
 const [data, setData] = useState(initialData);
 const [editingKey, setEditingKey] = useState('');
 const [form] = Form.useForm();

 const columns = [
    { title: 'No', dataIndex: 'No', key: 'No' },
    { title: 'Student ID', dataIndex: 'Student ID', key: 'Student ID' },
    { title: 'Student First Name', dataIndex: 'Student first name', key: 'Student first name' },
    { title: 'Student Last Name', dataIndex: 'Student last name', key: 'Student last name' },
    { title: 'Total Score', dataIndex: 'Total Score', key: 'Total Score' },
    { title: 'Note', dataIndex: 'Note', key: 'Note' },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        const editable = editingKey === record.key;
        return editable ? (
          <span>
            <button
              type="button"
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => cancel(record.key)}
            >
              Cancel
            </button>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => edit(record.key)}
          >
            Edit
          </button>
        );
      },
    },
 ];

 const edit = (key) => {
    setEditingKey(key);
    form.setFieldsValue({ ...data.find(item => item.key === key) });
 };

 const cancel = () => {
    setEditingKey('');
 };

 const save = (key) => {
    form.validateFields().then(async (row) => {
      const newData = [...data];
      const index = newData.findIndex(item => key === item.key);
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...row });
      setData(newData);
      setEditingKey('');
    });
 };

 return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="No"
      />
      {editingKey && (
        <Form
        form={form}
        layout="vertical"
        onFinish={save}
        initialValues={{
           'Total Score': data.find(item => item.key === editingKey)?.['Total Score'],
           questions: data.find(item => item.key === editingKey)?.questions.map(question => ({
             questionId: question.questionId,
             score: question.score,
             maxScore: question.maxScore,
             clo: question.clo,
           })),
        }}
       >
        <Form.Item name="Total Score" label="Total Score">
           <InputNumber disabled />
        </Form.Item>
        <Form.Item name="absent" valuePropName="checked">
    <Checkbox>Absent</Checkbox>
 </Form.Item>
        <Form.List name="questions">
           {(fields, { add, remove }) => (
             <>
               {fields.map((field, index) => (
                 <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  
                   <Form.Item
                     {...field}
                     name={[field.name, 'questionId']}
                     fieldKey={[field.fieldKey, 'questionId']}
                   >
                     <Input placeholder={`Câu/Tiêu chí ${index + 1}`} disabled />
                   </Form.Item>
                   <Form.Item
                     {...field}
                     name={[field.name, 'score']}
                     fieldKey={[field.fieldKey, 'score']}
                     rules={[{ required: true, message: 'Missing score' }]}
                   >
                     <InputNumber placeholder="Score" />
                   </Form.Item>
                   <Form.Item
                     {...field}
                     name={[field.name, 'maxScore']}
                     fieldKey={[field.fieldKey, 'maxScore']}
                   >
                     <InputNumber placeholder="Max Score" disabled />
                   </Form.Item>
                   <Form.Item
                     {...field}
                     name={[field.name, 'clo']}
                     fieldKey={[field.fieldKey, 'clo']}
                   >
                     <Input placeholder="CLO" disabled />
                   </Form.Item>
                 </Space>
               ))}
             </>
           )}
        </Form.List>
        <Form.Item>
           <Button type="primary" htmlType="submit">
             Submit
           </Button>
        </Form.Item>
       </Form>
       
      )}
    </>
 );
};

export default ExamTeamsScoreTable;
