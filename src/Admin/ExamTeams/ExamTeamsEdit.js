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
  const [clos, setClos] = useState([]);

  useEffect(() => {
    courseServ.getCourse(id).then((data) => {
      form.setFieldsValue({
        courseInfo: data.courseInfo,
        CLOs: data.CLOs,
        questions: data.questions,
      });
      setClos(data.CLOs); // Cập nhật state ở đây
      setCloCount(data.CLOs.length);
    });
  }, [id, form]);

  const updateCLOs = async () => {
    const values = await form.validateFields(["CLOs"]); // Chỉ validate và lấy dữ liệu từ phần CLOs
    console.log("Updating CLOs with", values.CLOs);
    // Gọi API cập nhật CLOs tại đây
    // Không cần navigate sau khi cập nhật
  };

  const updateQuestions = async () => {
    const values = await form.validateFields(["questions"]); // Chỉ validate và lấy dữ liệu từ phần questions
    console.log("Updating Questions with", values.questions);
    // Gọi API cập nhật questions tại đây
    // Không cần navigate sau khi cập nhật
  };

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

      {/* <Form.Item>
        <Button type="primary" onClick={updateCLOs}>
          Update CLOs
        </Button>
      </Form.Item> */}

      {/* <h2>Nhập Questions</h2> */}
      {/* <Form.List name="questions">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, "questionsId"]}
                  fieldKey={[fieldKey, "questionsId"]}
                  rules={[
                    { required: true, message: "Please input Question ID" },
                  ]}
                >
                  <Input placeholder="Question ID" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "questionsName"]}
                  fieldKey={[fieldKey, "questionsName"]}
                  rules={[
                    { required: true, message: "Please input Question Name" },
                  ]}
                >
                  <Input placeholder="Question Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "questionsNote"]}
                  fieldKey={[fieldKey, "questionsNote"]}
                >
                  <Input placeholder="Question Note" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "maxScore"]}
                  fieldKey={[fieldKey, "maxScore"]}
                  rules={[
                    { required: true, message: "Please input Max Score" },
                  ]}
                >
                  <Input placeholder="Max Score" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "cloName"]}
                  fieldKey={[fieldKey, "cloName"]}
                  rules={[
                    { required: true, message: "Please select a CLO Name" },
                  ]}
                >
                  <Select placeholder="Select a CLO">
                    {clos.map((clo, index) => (
                      <Select.Option key={index} value={clo.cloName}>
                        {clo.cloName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Question
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List> */}
{/* 
      <Form.Item>
        <Button type="primary" onClick={updateQuestions}>
          Update Questions
        </Button>
      </Form.Item> */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update Course
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CourseEdit;
