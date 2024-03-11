import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Modal, Row, Col } from "antd";
import { examteamsServ } from "../../Services/examteamsService";

const ExamTeamsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [maxScoreForm] = Form.useForm();
  const [maxScoreModalVisible, setMaxScoreModalVisible] = useState(false);

  useEffect(() => {
    examteamsServ.getExamteams(id).then((data) => {
      form.setFieldsValue(data);
      maxScoreForm.setFieldsValue({
        maxScore: data.maxScore ? data.maxScore[0] : {},
      });
    });
  }, [id, form, maxScoreForm]);

  const onMaxScoreFinish = async (values) => {
    try {
      // Assuming editExamteams API can handle partial updates
      await examteamsServ.editExamteams(id, { maxScore: [values.maxScore] });
      message.success("Max score updated successfully");
      setMaxScoreModalVisible(false);
    } catch (err) {
      message.error("Failed to update max score");
      console.error(err);
    }
  };

  const onFinish = async (values) => {
    try {
      await examteamsServ.editExamteams(id, values);
      message.success("Exam team updated successfully");
      navigate("/admin/examteams");
    } catch (err) {
      message.error("Failed to update exam team");
      console.error(err);
    }
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
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
          onClick={() => setMaxScoreModalVisible(true)}
        >
          Edit Max Score
        </Button>
      </Form>

      <Modal
        title="Edit Max Score"
        visible={maxScoreModalVisible}
        onCancel={() => setMaxScoreModalVisible(false)}
        footer={null}
      >
        <Form
          form={maxScoreForm}
          onFinish={onMaxScoreFinish}
          layout="vertical"
          name="maxScoreForm"
        >
          {/* Define your MaxScore inputs here, similar to how they're defined in the main form */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name={["maxScore", "mcq_q1"]} label="MCQ-Q1">
                <Input />
              </Form.Item>
              <Form.Item name={["maxScore", "mcq_q2"]} label="MCQ-Q2">
                <Input />
              </Form.Item>
              <Form.Item name={["maxScore", "mcq_q3"]} label="MCQ-Q3">
                <Input />
              </Form.Item>
              <Form.Item name={["maxScore", "mcq_q4"]} label="MCQ-Q4">
                <Input />
              </Form.Item>
              <Form.Item name={["maxScore", "mcq_q5"]} label="MCQ-Q5">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={["maxScore", "wq_q1"]} label="wq_q1">
                <Input />
              </Form.Item>
              <Form.Item name={["maxScore", "wq_q2"]} label="wq_q2">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          {/* Repeat for other maxScore fields */}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Max Score
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ExamTeamsEdit;
