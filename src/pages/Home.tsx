import React from "react";
import { Avatar, Button, Typography } from "antd";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import NavBar from "../components/NavBar";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const { Title, Text } = Typography;

interface HomeProps {
  name?: string;
  imageUrl?: string;
}

const Home: React.FC<HomeProps> = ({ name, imageUrl }) => {
  const profile = useSelector((state: RootState) => state.onboarding.profile);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <NavBar>
        <div style={{ display: "flex", justifyContent: "flex-end", padding: 25 }}>
          <Button type="primary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </NavBar>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Avatar size={120} src={profile.picture?.url} style={{ marginBottom: 16 }}>
          {!imageUrl && name?.charAt(0)}
        </Avatar>

        <Title level={3} style={{ marginBottom: 20 }}>
          Hello, {profile.name}
        </Title>

        <Text type="secondary" style={{ fontSize: 16 }}>
          Welcome to the Home Page
        </Text>
      </div>
    </>
  );
};

export default Home;
