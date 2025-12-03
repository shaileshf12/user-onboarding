import React from "react";
import { Avatar, Button, Typography } from "antd";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import NavBar from "../components/NavBar";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const { Title, Text } = Typography;

const styles = {
  navRight: { display: "flex", justifyContent: "flex-end", padding: 24 },
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column" as const,
    padding: "24px",
    boxSizing: "border-box" as const,
  },
  avatar: { marginBottom: 16 },
  title: { marginBottom: 20 },
  subtitle: { fontSize: 16 },
};

const Home: React.FC = () => {
  const profile = useSelector((state: RootState) => state.onboarding.profile);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <NavBar>
        <div style={styles.navRight}>
          <Button type="primary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </NavBar>
      <div style={styles.page}>
        <Avatar size={120} src={profile.picture?.url} style={styles.avatar} />

        <Title level={3} style={styles.title}>
          Hello, {profile.name}
        </Title>

        <Text type="secondary" style={styles.subtitle}>
          Welcome to the Home Page
        </Text>
      </div>
    </>
  );
};

export default Home;
