import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Space, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { answerStructureServ } from "../../Services/answerStructureService";
const { Option } = Select;

const AnswerStructureEdit = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [answerStructureCount, setAnswerStructureCount] = useState(0);
  const [answerStructures, setAnswerStructures] = useState([]);

  useEffect(() => {
    answerStructureServ.getAnswerStructure(id).then((data) => {
      form.setFieldsValue({
        courseInfo: data.courseInfo,
        CLOs: data.CLOs,
        questions: data.questions,
      });
      setAnswerStructures(data.CLOs); // Cập nhật state ở đây
      setAnswerStructureCount(data.CLOs.length);
    });
  }, [id, form]);


  const updateQuestions = async () => {
    const values = await form.validateFields(["questions"]); // Chỉ validate và lấy dữ liệu từ phần questions
    console.log("Updating Questions with", values.questions);
    // Gọi API cập nhật questions tại đây
    // Không cần navigate sau khi cập nhật
  };

  const updateCLOs = async () => {
    const values = await form.validateFields(["CLOs"]); // Chỉ validate và lấy dữ liệu từ phần CLOs
    console.log("Updating CLOs with", values.CLOs);
    // Gọi API cập nhật CLOs tại đây
    // Không cần navigate sau khi cập nhật
  };

  const onFinish = async (values) => {
    try {
      await answerStructureServ.editAnswerStructure(id, values);
      message.success("Answer Structure updated successfully");
      navigate("/admin/course");
    } catch (err) {
      message.error("Failed to update answer structure");
      console.error(err);
    }
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      name="editAnswerStructureForm"
      initialValues={{ questionId: [] }}
    >
      <h2>Nhập question id</h2>
      <Form.List name="AnswerStructure">
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
                  name={[field.name, "questionId"]}
                  fieldKey={[field.fieldKey, "questionId"]}
                  rules={[{ required: true, message: "Please input Question ID" }]}
                >
                  <Input placeholder="Question ID" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, "questionName"]}
                  fieldKey={[field.fieldKey, "questionName"]}
                  rules={[{ required: true, message: "Please input question name" }]}
                >
                  <Input placeholder="Question Name" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, "questionMaxScore"]}
                  fieldKey={[field.fieldKey, "questionMaxScore"]}
                  rules={[{ required: true, message: "Please input question max score" }]}
                >
                  <Input placeholder="Question Max Score" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, "cloId"]}
                  fieldKey={[field.fieldKey, "cloId"]}
                >
                  <Input placeholder="Enter CLO IDs separated by commas" />
                </Form.Item>
                <MinusCircleOutlined
                  onClick={() => {
                    remove(field.name);
                    setAnswerStructureCount(answerStructureCount - 1);
                  }}
                />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add({ questionId: 0 })} // Thêm question id mới với question id mặc định là 0
                block
                icon={<PlusOutlined />}
              >
                Add Answer Structure
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>


      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update Answer Structure
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AnswerStructureEdit;
