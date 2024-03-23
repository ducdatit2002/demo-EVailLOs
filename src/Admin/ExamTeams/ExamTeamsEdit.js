import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  message,
  Modal,
  Row,
  Col,
  Alert,
  InputNumber,
  Table,
} from "antd";
import { examteamsServ } from "../../Services/examteamsService";

const ExamTeamsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [examStructureForm] = Form.useForm();
  const [examStructureModalVisible, setExamStructureModalVisible] =
    useState(false);
  const [rubricModalVisible, setRubricModalVisible] = useState(false);
  const [examStructure, setExamStructure] = useState({
    NoofQuestion: 0,
    TotalScore:0,
    tieuchi: [],
  });
  const [warning, setWarning] = useState(false);
  const [rubrics, setRubrics] = useState([{ criteria: [] }]);


  useEffect(() => {
    examteamsServ.getExamteams(id).then((data) => {
      form.setFieldsValue(data);
      setExamStructure(data.examStructure || { NoofQuestion: 0, tieuchi: [] });
    });
  }, [id, form]);
  
  useEffect(() => {
    const maxScores = examStructure.tieuchi.map((item) => item.maxScore);
    const totalScore = examStructure.TotalScore;
    const sumOfMaxScores = maxScores.reduce((sum, score) => sum + score, 0);
    setWarning(sumOfMaxScores > totalScore);
  }, [examStructure]);

  const onExamStructureFinish = async (values) => {

    try {
      await examteamsServ.editExamteams(id, {
        examStructure: values.examStructure,
      });
      message.success("Exam structure updated successfully");
      setExamStructureModalVisible(false);
    } catch (err) {
      message.error("Failed to update exam structure");
      console.error(err);
    }
  };

  const renderTieuchiInputs = () => {
    let inputs = [];
    for (let i = 0; i < examStructure.NoofQuestion; i++) {
      inputs.push(
        <Row key={i} gutter={16}>
          <Col span={6}>
            <Form.Item
              name={["examStructure", "tieuchi", i, "id"]}
              label={`Câu/Tiêu chí ${i + 1} (CLOs)`}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name={["examStructure", "tieuchi", i, "maxScore"]}
              label={`Max Score`}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name={["examStructure", "tieuchi", i, "note"]}
              label={`Note`}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      );
    }
    return inputs;
  };

  const onFinishMainForm = async (values) => {
    try {
      await examteamsServ.editExamteams(id, values);
      message.success("Exam team updated successfully");
      navigate("/admin/examteams");
    } catch (error) {
      message.error("Failed to update exam team");
      console.error(error);
    }
  };

  const addRubric = () => {
    setRubrics([...rubrics, { criteria: [] }]);
 };

 const addCriterion = (rubricIndex) => {
    const newRubrics = [...rubrics];
    newRubrics[rubricIndex].criteria.push({});
    setRubrics(newRubrics);
 };

 return (
  <div>
    <Form
      form={form}
      onFinish={onFinishMainForm}
      layout="vertical"
      name="editExamTeamForm"
    >
<Form.Item>
          <Button type="primary" htmlType="submit">
            Update Exam Team
          </Button>
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="courseID"
              label="Course ID"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="courseName"
              label="Course Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="courseGroup"
              label="Course Group"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="examTeams"
              label="Exam Teams"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="numberOfStudent"
              label="Number of Student"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="examDate"
              label="Exam Date"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="examTime"
              label="Exam Time"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="examRoom"
              label="Exam Room"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="examType"
              label="Exam Type"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lecturer"
              label="Lecturer"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>      <Button
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          borderColor: "#4CAF50",
        }}
        type="primary"
        onClick={() => setExamStructureModalVisible(true)}
      >
        Edit Exam Structure
      </Button>
      <Button
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          borderColor: "#4CAF50",
          marginLeft: 10,
        }}
        type="primary"
        onClick={() => setRubricModalVisible(true)}
      >
        Set Rubric
      </Button>
    </Form>

 
      <Modal
        title="Set Rubric"
        visible={rubricModalVisible}
        onCancel={() => setRubricModalVisible(false)}
        footer={null}
        width={800}
      >
        {rubrics.map((rubric, rubricIndex) => (
          <div key={rubricIndex}>
            <h3>Rubric {rubricIndex + 1}</h3>
            {rubric.criteria.map((criterion, criterionIndex) => (
              <div key={criterionIndex}>
                <Form.Item label="Criteria Name">
                 <Input placeholder="Criteria Name" />
                </Form.Item>
                <Form.Item label="Note">
                 <Input placeholder="Note" />
                </Form.Item>
                <Form.Item label="Lower Score">
                 <InputNumber placeholder="Lower Score" />
                </Form.Item>
                <Form.Item label="Upper Score">
                 <InputNumber placeholder="Upper Score" />
                </Form.Item>
              </div>
            ))}
            <Button onClick={() => addCriterion(rubricIndex)}>Add Criterion</Button>
          </div>
        ))}
        <Button onClick={addRubric}>Add Rubric</Button>
      </Modal>

      {warning && (
        <Alert
          message="Warning"
          description="The sum of all max scores is greater than the total score."
          type="warning"
          showIcon
          closable
        />
      )}
    </div>
  );
};

export default ExamTeamsEdit;
