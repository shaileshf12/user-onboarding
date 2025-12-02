import React, { useEffect, useState } from "react";
import { Formik, Form, Field, type FieldProps } from "formik";
import { Input, Button, List, message, Space, Typography } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setSongs, goToStep } from "../redux/onboardingSlice";
import type { RootState } from "../store";
import CardContainer from "./CardContainer";

const { Text } = Typography;

interface FormValues {
  song: string;
}

const Step2Songs: React.FC<{ onPrev?: () => void; onNext?: () => void }> = ({ onPrev, onNext }) => {
  const dispatch = useDispatch();
  const storedSongs = useSelector((s: RootState) => s.onboarding.songs || []);
  const [songs, setLocalSongs] = useState<string[]>(storedSongs);

  useEffect(() => {
    setLocalSongs(storedSongs);
  }, [storedSongs]);

  const persist = (newList: string[]) => {
    setLocalSongs(newList);
    dispatch(setSongs(newList));
  };

  return (
    <CardContainer>
      <div style={{ width: 600, maxWidth: "95%" }}>
        <h2 style={{ textAlign: "center", marginBottom: 12 }}>Favorite Songs</h2>
        <Text type="secondary">Enter a song name and press Add — it will appear in the list below.</Text>

        <div style={{ marginTop: 16 }}>
          <Formik
            initialValues={{ song: "" } as FormValues}
            onSubmit={(values, { resetForm, setSubmitting }) => {
              const trimmed = values.song.trim();
              if (!trimmed) {
                message.warning("Please enter a song name");
                setSubmitting(false);
                return;
              }
              if (songs.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
                message.warning("This song is already in your list");
                setSubmitting(false);
                return;
              }

              const next = [...songs, trimmed];
              persist(next);
              message.success(`Added "${trimmed}"`);
              resetForm();
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Space style={{ width: "100%" }} direction="vertical">
                  <div style={{ display: "flex", gap: 8 }}>
                    <Field name="song">
                      {({ field }: FieldProps<string>) => (
                        <Input
                          {...field}
                          placeholder="Enter song name"
                          onPressEnter={(e) => {
                            (e.target as HTMLInputElement).form?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
                          }}
                        />
                      )}
                    </Field>

                    <Button type="primary" htmlType="submit" icon={<PlusOutlined />} loading={isSubmitting}>
                      Add
                    </Button>
                  </div>
                </Space>
              </Form>
            )}
          </Formik>

          <div style={{ marginTop: 18, maxHeight: 220, overflowY: "auto", paddingRight: 4 }}>
            <List
              bordered
              dataSource={songs}
              locale={{ emptyText: "No songs added yet" }}
              renderItem={(item, idx) => (
                <List.Item
                  key={idx}
                  actions={[
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        const next = songs.filter((_, i) => i !== idx);
                        persist(next);
                        message.success(`Removed "${item}"`);
                      }}
                    >
                      Delete
                    </Button>,
                  ]}
                >
                  <Text>{item}</Text>
                </List.Item>
              )}
            />
          </div>

          <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between" }}>
            <Button
              onClick={() => {
                dispatch(goToStep(1));
                onPrev?.();
              }}
            >
              Back
            </Button>

            <Button
              type="primary"
              onClick={() => {
                dispatch(goToStep(3));
                onNext?.();
              }}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </CardContainer>
  );
};

export default Step2Songs;
