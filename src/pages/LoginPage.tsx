import React, { useEffect } from "react";
import { Form, Input, Button, message, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import type { User } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import type { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import CardContainer from "../components/CardContainer";

const { Title } = Typography;

const styles = {
  wrapper: { width: 400 },
  title: { textAlign: "center" as const, marginBottom: 20 },
};

const LoginCard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const completed = useSelector((state: RootState) => state.onboarding.completed);

  useEffect(() => {
    if (completed && isLoggedIn) navigate("/home", { replace: true });
    else if (isLoggedIn) navigate("/onboarding", { replace: true });
  }, [isLoggedIn, navigate, completed]);

  const onFinish = (values: User) => {
    if (values.username === "user123" && values.password === "password123") {
      dispatch(login({ username: values.username }));
    } else {
      message.error("Either username or password is incorrect");
    }
  };

  return (
    <CardContainer width={500} height={400}>
      <div style={styles.wrapper}>
        <Title level={3} style={styles.title}>
          Login
        </Title>

        <Form name="loginForm" layout="vertical" onFinish={onFinish}>
          <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please enter your username" }]}>
            <Input prefix={<UserOutlined />} placeholder="Enter username" />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password" }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Enter password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </CardContainer>
  );
};

export default LoginCard;
