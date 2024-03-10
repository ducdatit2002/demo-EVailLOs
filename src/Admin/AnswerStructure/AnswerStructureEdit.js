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
  const [cloCount, setCloCount] = useState(0);
  const [clos, setClos] = useState([]);
  const [warningMessage, setWarningMessage] = useState(""); // State for warning message
  const [isFormValid, setIsFormValid] = useState(true); // State to track form validity


  useEffect(() => {
    answerStructureServ.getAnswerStructure(id).then((data) => {
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
      await answerStructureServ.editAnswerStructure(id, values);
      message.success("Answer Structure updated successfully");
      navigate("/admin/course");
    } catch (err) {
      message.error("Failed to update answer structure");
      console.error(err);
    }
  };

  const onValuesChange = (changedValues, allValues) => {
    const totalMaxScore = allValues.questions.reduce((sum, question) => sum + parseInt(question.maxScore, 10), 0);
    if (totalMaxScore > allValues.scoreLadder) {
      setWarningMessage("The sum of all max scores cannot exceed the score ladder.");
      setIsFormValid(false); // Set form as invalid
    } else {
      setWarningMessage("");
      setIsFormValid(true); // Set form as valid
    }
 };
  return (
    <Form
      form={form}
      onFinish={onFinish}
      onValuesChange={onValuesChange} 
      layout="vertical"
      name="editAnswerStructureForm"
      initialValues={{ CLOs: [], questions: [] }}
    >
      {/* Existing CLOs Form.List */}
      {/* ... */}

      {/* Questions Form.List */}
      <h2>Input Questions</h2>
          {/* Score Ladder Field */}
          <Form.Item
        name="scoreLadder"
        label="Score Ladder"
        rules={[{ required: true, message: "Please input the score ladder" }]}
      >
        <Input placeholder="Score Ladder" />
      </Form.Item>
            {/* Display warning message */}
            {warningMessage && <div style={{ color: 'red' }}>{warningMessage}</div>}

      
      <Form.List name="questions">
  {(fields, { add, remove }) => (
    <>
      {fields.map(({ key, name, fieldKey, ...restField }) => ( // Cập nhật dòng này để khai báo đúng các biến
        <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
          {/* Các Form.Item khác */}
          <Form.Item
            {...restField}
            name={[name, "questionsId"]}
            fieldKey={[fieldKey, "questionsId"]}
            rules={[{ required: true, message: "Please input Question ID" }]}
          >
            <Input placeholder="Question ID" />
          </Form.Item>
       
      
          <Form.Item
            {...restField}
            name={[name, "maxScore"]}
            fieldKey={[fieldKey, "maxScore"]}
            rules={[{ required: true, message: "Please input Max Score" }]}
          >
            <Input placeholder="Max Score" />
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
            name={[name, "cloIds"]}
            fieldKey={[fieldKey, "cloIds"]}
            rules={[{ required: true, message: "Please select CLO(s)" }]}
          >
            <Select
              mode="multiple"
              placeholder="Select CLO(s)"
              style={{ width: "100%" }}
            >
              {clos.map(clo => (
                <Select.Option key={clo.cloId} value={clo.cloId}>
                  {clo.cloId}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <MinusCircleOutlined onClick={() => remove(name)} />
        </Space>
      ))}
      <Form.Item>
      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} disabled={!isFormValid}>
          Add Question
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
