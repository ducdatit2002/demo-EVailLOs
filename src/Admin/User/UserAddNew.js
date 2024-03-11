import { Button, Form, Input, message, notification } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { userServ } from "../../Services/userService";
import { formItemLayout, tailFormItemLayout } from "../../Utilities/FormLayout";

const openNotification = (desc) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={() => {
          notification.close(key);
          // window.location.reload(); // Xem xét lại việc reload trang, có thể thay bằng navigate()
        }}
      >
        Close
      </Button>
    );
    notification.open({
      message: "Thông tin tài khoản",
      description: desc,
      btn,
      key,
      duration: 3, // Thông báo sẽ tự đóng sau 3 giây
    });
  };
export const UserAddNew = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinishSign = (values) => {

    userServ
      .postSign(values)
      .then((res) => {
        console.log(res.data);
        message.success("Đăng ký thành công");
        openNotification(
          `Email: ${values.email} / Password: ${values.password}`
        );
        navigate('/admin/user');
      })
      .catch((err) => {
        message.error("Đăng ký thất bại, email đã tồn tại hoặc lỗi kết nối");
        console.log(err);
      });
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinishSign}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "E-mail không hợp lệ",
          },
          {
            required: true,
            message: "Xin nhập Email",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="name"
        label="Họ và tên"
        rules={[
          {
            required: true,
            message: "Không bỏ trống",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Đăng Ký
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserAddNew;
