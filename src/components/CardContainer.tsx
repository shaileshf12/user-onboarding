import React from "react";
import { Card } from "antd";

interface CardContainerProps {
  width?: number | string;
  height?: number | string;
  children: React.ReactNode;
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f0f2f5",
  },
  card: {
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    borderRadius: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

const CardContainer: React.FC<CardContainerProps> = ({ width = 1050, height = 700, children }) => {
  return (
    <div style={styles.container}>
      <Card style={{ ...styles.card, width, height }}>{children}</Card>
    </div>
  );
};

export default CardContainer;
