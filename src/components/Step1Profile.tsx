import React, { useEffect, useState } from "react";
import { Form, Input, Button, InputNumber, Upload, message, type UploadProps, type UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setProfile } from "../redux/onboardingSlice";
import CardContainer from "./CardContainer";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { getBase64 } from "../utils";

interface OnboardingFormValues {
  name: string;
  age: number;
  email: string;
  profilePicture?: UploadFile;
}

const Step1Profile: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.onboarding.profile);

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        name: profile.name,
        age: profile.age,
        email: profile.email,
      });
    }
  }, [profile, form]);

  useEffect(() => {
    if (profile.picture?.url) {
      setFileList([
        {
          uid: profile.picture.uid || "-1",
          name: profile.picture.name || "profile-picture",
          status: "done",
          url: profile.picture?.url,
        },
      ]);
    }
  }, [profile]);

  const handleFinish = async (values: OnboardingFormValues) => {
    const { name, age, email } = values;
    let imageDataUrl: string | undefined;

    const uploaded = fileList[0];
    const fileObj = uploaded?.originFileObj as File | undefined;

    if (fileObj) {
      imageDataUrl = await getBase64(fileObj);
    }

    const formData = {
      name,
      age,
      email,
      picture: {
        url: imageDataUrl,
        name: uploaded?.name,
        uid: uploaded?.uid,
      },
    };

    dispatch(setProfile(formData));
    message.success("Form submitted successfully!");
    onNext();
  };

  const handleChange: UploadProps["onChange"] = ({ fileList }) => {
    setFileList(fileList.slice(-1));
  };

  return (
    <CardContainer>
      <div style={{ width: 400 }}>
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>Personal Profile</h2>

        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item name="name" label="Full Name" rules={[{ required: true, message: "Please enter your name" }]}>
            <Input placeholder="Enter your name" size="large" />
          </Form.Item>

          <Form.Item name="age" label="Age" rules={[{ required: true, message: "Please enter your age" }]}>
            <InputNumber placeholder="Enter your age" style={{ width: "100%" }} min={1} max={120} size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input placeholder="Enter your email" size="large" />
          </Form.Item>

          <Form.Item name="profilePicture" label="Profile Picture" rules={[{ required: true, message: "Please upload a profile picture" }]}>
            <Upload
              beforeUpload={(file) => {
                const isValidType = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg";

                if (!isValidType) {
                  message.error("Only JPEG, JPG, and PNG files are allowed!");
                  return Upload.LIST_IGNORE;
                }

                return false;
              }}
              accept=".jpg,.jpeg,.png"
              listType="picture"
              fileList={fileList}
              onChange={handleChange}
              multiple={false}
            >
              <Button icon={<UploadOutlined />}>Upload Picture</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" style={{ width: "100%", marginTop: 10 }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </CardContainer>
  );
};

export default Step1Profile;
