import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Space, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { courseServ } from "../../Services/courseService";

const { Option } = Select;

const CourseEdit = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [cloCount, setCloCount] = useState(0);

  useEffect(() => {
    // Assuming courseServ.getCourse fetches course data including CLOs
    courseServ.getCourse(id).then((data) => {
      form.setFieldsValue({
        courseInfo: data.courseInfo,
        CLOs: data.CLOs,
      });
      setCloCount(data.CLOs.length);
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
      <h2>Nhập CLOs</h2>
      <Form.List name="CLOs">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <Space
                key={field.key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...field}
                  name={[field.name, "cloId"]}
                  fieldKey={[field.fieldKey, "cloId"]}
                  rules={[{ required: true, message: "Please input CLO ID" }]}
                >
                  <Input placeholder="CLO ID" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, "cloName"]}
                  fieldKey={[field.fieldKey, "cloName"]}
                  rules={[{ required: true, message: "Please input CLO name" }]}
                >
                  <Input placeholder="CLO Name" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, "cloNote"]}
                  fieldKey={[field.fieldKey, "cloNote"]}
                >
                  <Input placeholder="CLO Note" />
                </Form.Item>
                <MinusCircleOutlined
                  onClick={() => {
                    remove(field.name);
                    setCloCount(cloCount - 1);
                  }}
                />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add({ cloId: 0 })} // Thêm CLO mới với cloId mặc định là 0
                block
                icon={<PlusOutlined />}
              >
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
    </Form>
  );
};

export default CourseEdit;
