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

  return (
    <Form
      form={form}
      onFinish={onFinish}
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
      <Form.Item
        label="Semester"
        name={['courseInfo', 'semester']}
        rules={[{ required: true, message: 'Please input the semester!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="School Year"
        name={['courseInfo', 'schoolYear']}
        rules={[{ required: true, message: 'Please input the school year!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Class ID"
        name={['courseInfo', 'classId']}
        rules={[{ required: true, message: 'Please input the class ID!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Teacher ID"
        name="teacherId"
        rules={[{ required: true, message: 'Please input the teacher ID!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CourseEdit;
