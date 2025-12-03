import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPayment, goToStep } from "../redux/onboardingSlice";
import type { RootState } from "../store";
import { Form, Input, Button } from "antd";
import CardContainer from "./CardContainer";
import type { Payment } from "../types";

const styles = {
    wrapper: {
        width: 400,
    },
    title: {
        textAlign: "center" as const,
        marginBottom: 20,
    }
}

const Step3Payment: React.FC<{ onPrev?: () => void; onNext?: () => void }> = ({ onPrev, onNext }) => {
  const dispatch = useDispatch();
  const payment = useSelector((s: RootState) => s.onboarding.payment);

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(payment);
  }, [payment, form]);

  const handleFinish = (values: Payment) => {
    dispatch(setPayment(values));
    onNext?.();
  };

  return (
    <CardContainer>
      <div style={styles.wrapper}>
        <h2 style={styles.title}>Payment Information</h2>
        <Form form={form} layout="vertical" initialValues={payment} onFinish={handleFinish}>
          <Form.Item label="Card Number" name="cardNumber" rules={[{ required: true, message: "Card number is required" }]}>
            <Input maxLength={16} placeholder="Enter card number" />
          </Form.Item>

          <Form.Item label="Expiry (MM/YY)" name="expiry" rules={[{ required: true, message: "Expiry is required" }]}>
            <Input placeholder="MM/YY" maxLength={5} />
          </Form.Item>

          <Form.Item label="CVV" name="cvv" rules={[{ required: true, message: "CVV is required" }]}>
            <Input.Password placeholder="CVV" maxLength={4} />
          </Form.Item>

          <Form.Item>
            <Button
              onClick={() => {
                dispatch(goToStep(2));
                onPrev?.();
              }}
            >
              Back
            </Button>

            <Button type="primary" htmlType="submit" style={{ marginLeft: 8 }}>
              Finish
            </Button>
          </Form.Item>
        </Form>
      </div>
    </CardContainer>
  );
};

export default Step3Payment;
