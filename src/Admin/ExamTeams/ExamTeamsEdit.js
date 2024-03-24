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
import { CloseCircleOutlined } from '@ant-design/icons';


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
  const [rubrics, setRubrics] = useState([{ id: 0 }]);
  const [criteria, setCriteria] = useState([{ id: 0, name: '', note: '', lowerScore: 0, upperScore: 0 }]);
  

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
    setRubrics([...rubrics, { id: rubrics.length + 1 }]);
   };
   
   const addCriterion = () => {
    setCriteria([...criteria, { id: criteria.length + 1, name: '', note: '', lowerScore: 0, upperScore: 0 }]);
   };
   
   const removeRubric = (id) => {
    setRubrics(rubrics.filter(rubric => rubric.id !== id));
   };
   
   const removeCriterion = (id) => {
    setCriteria(criteria.filter(criterion => criterion.id !== id));
   };

   const saveRubric = () => {
    setRubrics([...rubrics]);
    setCriteria([...criteria]);
    message.success('Rubric saved successfully');
  };

      
   const renderRubricCriteriaMatrix = () => {
    return (
       <Table
         dataSource={rubrics}
         columns={[
           {
             title: 'Rubric/Criteria',
             dataIndex: 'id',
             key: 'id',
             render: (text, record, index) => (
               <div>
                 {`Rubric ${index + 1}`}
                 <Button
                   type="link"
                   danger
                   onClick={() => removeRubric(record.id)}
                   style={{ float: 'right' }}
                   icon={<CloseCircleOutlined />}
                 />
               </div>
             ),
           },
           ...criteria.map((criterion, criterionIndex) => ({
             title: (
               <div>
                 <Button
                   type="link"
                   danger
                   onClick={() => removeCriterion(criterion.id)}
                   style={{ float: 'right' }}
                   icon={<CloseCircleOutlined />}
                 />
                 <Form.Item label="Criteria Name">
              
                   <Input placeholder="Criteria Name" />
                 </Form.Item>
                 <Form.Item label="Note">
                   <Input placeholder="Note" />
                 </Form.Item>
                 <Form.Item label="Score Range">
                   <Row gutter={8}>
                    <Col span={10}>
                       <Form.Item
                         name={["examStructure", "tieuchi", criterionIndex, "lowerScore"]}
                       >
                         <InputNumber placeholder="00" />
                       </Form.Item>
                    </Col>
                    <Col span={4} style={{ textAlign: 'center' }}>
                       to
                    </Col>
                    <Col span={10}>
                       <Form.Item
                         name={["examStructure", "tieuchi", criterionIndex, "upperScore"]}
                       >
                         <InputNumber placeholder="00" />
                       </Form.Item>
                    </Col>
                   </Row>
                 </Form.Item>
                
               </div>
             ),
             dataIndex: `criterion${criterionIndex}`,
             key: `criterion${criterionIndex}`,
             render: (text, record) => (
               <div>
                 {/* Render the rubric's score for this criterion */}
                 <Input placeholder="Criteria Description" />
               </div>
             ),
           })),
         ]}
         pagination={false}
       />
    );
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
 width={"auto"} // Set width to auto for dynamic adjustment
 style={{ minWidth: '500px' }} // Set a minimum width to prevent the modal from becoming too narrow
>
 {renderRubricCriteriaMatrix()}
 <Button onClick={addRubric}>Add Rubric</Button>
 <Button onClick={addCriterion}>Add Criterion</Button>
 <Button type="primary" onClick={saveRubric}>Save Rubric</Button>
</Modal>

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
          description="The sum of all max scores can not be greater than the total score."
          type="warning"
          showIcon
          closable
        />
      )}
    </div>
  );
};

export default ExamTeamsEdit;
