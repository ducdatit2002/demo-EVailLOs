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
} from "antd";
import { examteamsServ } from "../../Services/examteamsService";

const ExamTeamsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [examStructureForm] = Form.useForm();
  const [examStructureModalVisible, setExamStructureModalVisible] =
    useState(false);
  const [examStructure, setExamStructure] = useState({
    NoofQuestion: 0,
    TotalScore:0,
    tieuchi: [],
  });
  const [warning, setWarning] = useState(false);


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
            name={["examStructure", "tieuchi", i, "questionName"]}
            label={`Question Name ${i + 1}`}
          >
            <Input />
          </Form.Item>
          </Col>
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
        </Row>
        <Button
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
      </Form>

      <Modal
        title="Edit Exam Structure"
        visible={examStructureModalVisible}
        onCancel={() => setExamStructureModalVisible(false)}
        footer={null}
        width={800} // Adjust the width value as needed

      >
        <Form
          form={examStructureForm}
          onFinish={onExamStructureFinish}
          layout="vertical"
          name="examStructureForm"
          initialValues={{ examStructure: examStructure }}
        >
          <Form.Item
            name={["examStructure", "NoofQuestion"]}
            label="Number of Questions"
          >
            <InputNumber
              min={0}
              max={20}
              onChange={(value) =>
                setExamStructure({ ...examStructure, NoofQuestion: value })
              }
            />
          </Form.Item>
          <Form.Item
            name={["examStructure", "TotalScore"]}
            label="Total Score"
          >
            <InputNumber
              min={0}
              max={110}
              onChange={(value) =>
                setExamStructure({ ...examStructure, TotalScore: value })
              }
            />
          </Form.Item>

          {renderTieuchiInputs()}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Exam Structure
            </Button>
          </Form.Item>
        </Form>
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
