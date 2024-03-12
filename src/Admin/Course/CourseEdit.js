import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { courseServ } from "../../Services/courseService";

const CourseEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    // Giả định courseServ.getCourse(id) trả về dữ liệu theo cấu trúc mới
    courseServ.getCourse(id).then((data) => {
      form.setFieldsValue(data);
    });
  }, [id, form]);

  const onFinish = async (values) => {
    try {
      await courseServ.editCourse(id, values); // Giả định editCourse cập nhật dữ liệu
      message.success("Course updated successfully");
      navigate("/admin/course"); // Giả định đây là đường dẫn sau khi cập nhật thành công
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
      initialValues={{
        courseInfo: {
          courseId: "",
          courseName: "",
          semester: "",
          schoolYear: "",
          classId: "",
          teacherId: "",
        },
        CLOs: [],
      }}
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
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                <Form.Item
                  {...restField}
                  name={[name, 'clo']}
                  fieldKey={[fieldKey, 'clo']}
                  rules={[{ required: true, message: 'Please input CLO description' }]}
                >
                  <Input placeholder="CLO Description" />
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
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add CLO
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update Course
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CourseEdit;
