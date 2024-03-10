import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { courseServ } from "../../Services/courseService";

const CourseEdit = () => {
 let { id } = useParams();
 const navigate = useNavigate();
 const [form] = Form.useForm();

 useEffect(() => {
    courseServ.getCourse(id).then((data) => {
      form.setFieldsValue({
        courseInfo: data.courseInfo,
        CLOs: data.CLOs,
        questions: data.questions,
      });
    });
 }, [id, form]);

 const onFinish = async (values) => {
    try {
      await courseServ.editCourse(id, values);
      message.success("Course updated successfully");
      navigate("/admin/course");
    } catch (err) {
      message.error("Failed to update course");
      console.error(err);
    }
 };

 const onValuesChange = (changedValues, allValues) => {
    // Update nof. CLOs based on the number of CLOs in the list
    if (changedValues.CLOs) {
      form.setFieldsValue({ nofClos: allValues.CLOs.length });
    }
 };

 return (
    <Form
      form={form}
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      layout="vertical"
      name="editCourseForm"
      initialValues={{ CLOs: [] }}
    >
      <h2>Course Info</h2>
      <Form.Item
        label="Course ID"
        name={['courseInfo', 'courseId']}
        rules={[{ required: true, message: 'Please input the course ID!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Course Name"
        name={['courseInfo', 'courseName']}
        rules={[{ required: true, message: 'Please input the course name!' }]}
      >
        <Input />
      </Form.Item>

      <h2>Course Learning Outcomes (CLOs)</h2>
      <Form.Item
        label="Number of CLOs"
        name="nofClos"
        rules={[{ required: true, message: 'Please input the Number of CLOs!' }]}
      >
        <Input placeholder="Number of CLOs" />
      </Form.Item>

      <Form.List name="CLOs">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                 {...restField}
                 name={[name, 'cloId']}
                 fieldKey={[fieldKey, 'cloId']}
                 rules={[{ required: true, message: 'Please input the CLO ID!' }]}
                >
                 <Input placeholder="CLO ID" />
                </Form.Item>
                <Form.Item
                 {...restField}
                 name={[name, 'cloName']}
                 fieldKey={[fieldKey, 'cloName']}
                 rules={[{ required: true, message: 'Please input the CLO Name!' }]}
                >
                 <Input placeholder="CLO Name" />
                </Form.Item>
                <Form.Item
                 {...restField}
                 name={[name, 'cloNote']}
                 fieldKey={[fieldKey, 'cloNote']}
                >
                 <Input placeholder="CLO Note" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} disabled={form.getFieldValue('nofClos') <= fields.length}>
                Add CLO
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item>
    <Button type="primary" htmlType="submit">
      Update Course
    </Button>
 </Form.Item>
 <Form.Item>
    <Button type="primary" onClick={() => navigate("/admin/course")}>
      Cancel
    </Button>
 </Form.Item>
    </Form>
 );
};

export default CourseEdit;
