import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Space, Select, Alert } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { courseServ } from "../../Services/courseService";

const { Option } = Select;

const CourseEdit2 = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [cloCount, setCloCount] = useState(0);
  const [clos, setClos] = useState([]);
  const [isQuestionsUpdated, setIsQuestionsUpdated] = useState(false);


  useEffect(() => {
    courseServ.getCourse(id).then((data) => {
      form.setFieldsValue({
        courseInfo: data.courseInfo,
        CLOs: data.CLOs,
        questions: data.questions,
      });
      setClos(data.CLOs);
      setCloCount(data.CLOs.length);
    });
  }, [id, form]);

  const onFinish = async (values) => {
    try {
      await courseServ.editCourse(id, values);
      message.success("Course updated successfully");
      setIsQuestionsUpdated(true);
      //navigate("/admin/course");
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
      initialValues={{ CLOs: [], questions: [] }}
    >
      {/* Existing CLOs Form.List */}
      {/* ... */}

      {/* Questions Form.List */}
      <h2>Nhập Questions</h2>
      <Form.List name="questions">
        {(fields, { add, remove }) => (
          <>
            {fields.map(
              (
                { key, name, fieldKey, ...restField } // Cập nhật dòng này để khai báo đúng các biến
              ) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  {/* Các Form.Item khác */}
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
                    name={[name, "cloIds"]}
                    fieldKey={[fieldKey, "cloIds"]}
                    rules={[
                      { required: true, message: "Please select CLO(s)" },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      placeholder="Select CLO(s)"
                      style={{ width: "100%" }}
                    >
                      {clos.map((clo) => (
                        <Select.Option key={clo.cloId} value={clo.cloId}>
                          {clo.cloId}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              )
            )}
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
      </Form.List>

      <Form.Item>
        <Button
          style={{ backgroundColor: "purple", color: "white" }} // Thêm màu xanh lá và màu chữ trắng
          onClick={() => navigate("/admin/course")} // Sử dụng navigate để chuyển hướng
        >
          Cancel
        </Button>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update Course
        </Button>
      </Form.Item>
      {isQuestionsUpdated && (
        <Alert message="Đã nhập" type="success" showIcon />
      )}
    </Form>
  );
};

export default CourseEdit2;
