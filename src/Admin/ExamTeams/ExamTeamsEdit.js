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
    tieuchi: [],
  });

  useEffect(() => {
    examteamsServ.getExamteams(id).then((data) => {
      form.setFieldsValue(data);
      setExamStructure(data.examStructure || { NoofQuestion: 0, tieuchi: [] });
    });
  }, [id, form]);

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
          <Col span={8}>
            <Form.Item
              name={["examStructure", "tieuchi", i, "id"]}
              label={`ID ${i + 1}`}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name={["examStructure", "tieuchi", i, "name"]}
              label={`Name ${i + 1}`}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name={["examStructure", "tieuchi", i, "note"]}
              label={`Note ${i + 1}`}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      );
    }
    return inputs;
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={() => {}}
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

          {renderTieuchiInputs()}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Exam Structure
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ExamTeamsEdit;
