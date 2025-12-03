import React, { useEffect, useState } from "react";
import { Progress, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import CardContainer from "./CardContainer";
import { useDispatch } from "react-redux";
import { complete } from "../redux/onboardingSlice";

const { Text } = Typography;

const Step4Success: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [percent, setPercent] = useState<number>(0);

  const DURATION = 4000;

  useEffect(() => {
    dispatch(complete());
    let rafId = 0;
    const start = performance.now();

    const step = (now: number) => {
      const elapsed = now - start;
      const next = Math.min(100, (elapsed / DURATION) * 100);
      setPercent(Number(next.toFixed(1)));
      if (next < 100) {
        rafId = requestAnimationFrame(step);
      } else {
        setTimeout(() => navigate("/home"), 150);
      }
    };

    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <CardContainer>
      <h2 style={{ color: "green", textAlign: "center", marginBottom: 20 }}>Payment Information</h2>

      <div style={{ marginTop: 48 }}>
        <Progress type="line" percent={Math.round(percent)} strokeWidth={12} showInfo={true} />
        <div style={{ marginTop: 12 }}>
          <Text type="secondary">Redirecting to home page.</Text>
        </div>
      </div>
    </CardContainer>
  );
};

export default Step4Success;
