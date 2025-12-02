import React from "react";

const styles = {
  card: {
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    borderRadius: 12,
    width: "100%",
  },
};

const NavBar: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div style={styles.card}>{children}</div>;
};

export default NavBar;
