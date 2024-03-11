import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userServ } from '../../Services/userService';
import { Button, Form, Input, message, Select } from 'antd';

const UserEdit = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch và set dữ liệu người dùng vào form
    if (id) {
      setLoading(true);
      userServ.getInfo(id)
        .then(response => {
          form.setFieldsValue(response.data);
          setLoading(false);
        })
        .catch(error => {
          message.error('Lỗi khi tải thông tin người dùng');
          setLoading(false);
        });
    }
  }, [id, form]);

  const onFinish = (values) => {
    setLoading(true);
    userServ.editUser(id, values)
      .then(() => {
        message.success('Cập nhật người dùng thành công');
        navigate('/admin/user'); // Điều hướng về trang danh sách người dùng
      })
      .catch(error => {
        message.error('Lỗi khi cập nhật người dùng');
        setLoading(false);
      });
  };

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="name"
          label="Tên Người Dùng"
          rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
        name="role"
        label="Quản trị"
        rules={[{ required: true, message: "Không bỏ trống" }]}
      >
        <Select
          style={{ width: 120 }}
          options={[
            { value: "ADMIN", label: "ADMIN" },
            { value: "TEACHER", label: "TEACHER" },
          ]}
        />
      </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserEdit;
