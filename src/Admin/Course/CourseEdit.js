import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Space, Select } from "antd";
import { courseServ } from "../../Services/courseService";

const CourseEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { Option } = Select;
  const [numberOfCLOs, setNumberOfCLOs] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await courseServ.getCourse(id);
        if (data) {
          const validCLOsCount = data.CLOs.filter(clo => clo.clo1 || clo.clo2 || clo.clo3 || clo.clo4 || clo.clo5 || clo.clo6).length;
          form.setFieldsValue({
            ...data,
            nofClos: validCLOsCount,
            CLOs: data.CLOs,
          });
          setNumberOfCLOs(validCLOsCount);
        }
      } catch (err) {
        message.error("An error occurred while fetching course data.");
        console.error(err);
      }
    }
    fetchData();
  }, [id, form]);

  const onFinish = async (values) => {
    try {
      // Lọc dữ liệu CLOs để chỉ bao gồm số lượng CLOs mong muốn
      const filteredCLOs = values.CLOs.slice(0, numberOfCLOs);
  
      // Cập nhật giá trị CLOs trong object values trước khi gửi
      const updatedValues = {
        ...values,
        CLOs: filteredCLOs,
      };
  
      await courseServ.editCourse(id, updatedValues); // Gửi yêu cầu cập nhật với dữ liệu đã được lọc
      message.success("Course updated successfully");
      navigate("/admin/course");
    } catch (err) {
      message.error("Failed to update course.");
      console.error(err);
    }
  };
  
  const handleCancel = () => {
    navigate("/admin/course"); // Thay đổi đường dẫn này nếu bạn muốn quay lại trang khác
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      name="editCourseForm"
      initialValues={{
        courseInfo: {
          courseId: "",
          courseName: "",
        },
        CLOs: [],
      }}
    >
      <h2>Course Info</h2>
      <Form.Item
        label="Course ID"
        name={["courseInfo", "courseId"]}
        rules={[{ required: true, message: "Please input the course ID!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Course Name"
        name={["courseInfo", "courseName"]}
        rules={[{ required: true, message: "Please input the course name!" }]}
      >
        <Input />
      </Form.Item>
      <h2>Course Learning Outcomes (CLOs)</h2>
      <Form.Item
        label="Number of CLOs"
        name="nofClos"
        rules={[{ required: true, message: 'Please select the number of CLOs!' }]}
      >
        <Select
          onChange={value => setNumberOfCLOs(value)}
          value={numberOfCLOs}
        >
          {Array.from({ length: 6 }, (_, index) => (
            <Option key={index} value={index + 1}>
              {index + 1}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.List name="CLOs">
        {(fields, { add, remove }) => {
          fields = fields.slice(0, numberOfCLOs); // Đảm bảo số lượng fields phản ánh số lượng CLOs được chọn
          return (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="start">
                  <h1>{`CLO${index + 1}`}</h1>
                  <Form.Item
                    {...restField}
                    name={[name, `clo${index + 1}`]}
                    fieldKey={[fieldKey, `clo${index + 1}`]}
                    rules={[{ required: true, message: "Please input CLO description" }]}
                  >
                    <Input placeholder="CLO Description" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "cloNote"]}
                    fieldKey={[fieldKey, "cloNote"]}
                  >
                    <Input placeholder="CLO Note" />
                  </Form.Item>
                </Space>
              ))}
            </>
          );
        }}
      </Form.List>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Update Course
          </Button>
          <Button type="default" onClick={handleCancel}>
            Cancel
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default CourseEdit;

