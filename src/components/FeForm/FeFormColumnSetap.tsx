import { useEffect, useMemo, } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import type { FormInstance } from "antd/es/form"; 
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";  
import type { FormValues } from "../../types"; 
import { VERSIONS } from "../../constants"; 
import type { FC } from "react"; 
import dayjs, { Dayjs } from "dayjs"; 
import css from "./FeForm.module.css";

type FeFormColumnProps = { form: FormInstance<FormValues> };

export const FeFormColumnSetap: FC<FeFormColumnProps> = ({ form }) => {
  const framework = Form.useWatch("framework", form); 
  const hobbiesWatch = Form.useWatch("hobbies", form); 
   const hasHobby = Array.isArray(hobbiesWatch) && hobbiesWatch.length > 0;

  const versionOptions = useMemo(
    () =>
      (framework ? VERSIONS[framework] : []).map((version) => ({
        label: version,
        value: version,
      })),
    [framework]
  );

useEffect(() => {
  form.resetFields(["frameworkVersion"]);
}, [framework,form]);
  
  
  return (
    <>
      <Row gutter={[16, 0]}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Name"
            name="firstName"
            rules={[{ required: true, message: "Enter a name" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            label="Second name"
            name="lastName"
            rules={[{ required: true, message: "Enter your last name" }]}
          >
            <Input placeholder="Second Name" />
          </Form.Item>

          <Form.Item
            label="Date of birth"
            name="dateOfBirth"
            rules={[{ required: true, message: "Choose your date of birth" }]}
            getValueProps={(value?: string) => ({
              value: value ? dayjs(value, "DD-MM-YYYY") : null,
            })}
            getValueFromEvent={(date: Dayjs | null) =>
              date ? date.format("DD-MM-YYYY") : undefined
            }
          >
            <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY" />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="FE technology"
            name="framework"
            rules={[{ required: true, message: "Choose a version" }]}
          >
            <Select
              placeholder="angular / react / vue"
              options={[
                { value: "angular", label: "angular" },
                { value: "react", label: "react" },
                { value: "vue", label: "vue" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="FE technology version"
            name="frameworkVersion"
            rules={[{ required: true, message: "Choose a version" }]}
          >
            <Select
              disabled={!framework}
              placeholder={
                framework ? "Choose a version" : "choose a technology"
              }
              options={versionOptions}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            validateDebounce={400}
            rules={[
              { required: true, message: "Enter email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input placeholder="email@example.com" />
          </Form.Item>
        </Col>
      </Row>

      <Form.List name="hobbies">
        {(fields, { add, remove }, { errors }) => (
          <div>
            <Typography.Text strong className={css.hobbyLabel}>
              Hobbies
            </Typography.Text>

            <Space direction="vertical" style={{ width: "100%" }}>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className={css.hobbyRow}>
                  <Form.Item
                    {...restField}
                    name={[name, "name"]}
                    rules={[
                      { required: true, message: "Hobby name is required" },
                    ]}
                    className={css.hobbyName}
                  >
                    <Input placeholder="add please some hobby" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "duration"]}
                    rules={[{ required: true, message: "Duration in months" }]}
                    className={css.hobbyDuration}
                  >
                    <InputNumber
                      min={1}
                      max={12}
                      addonAfter="month"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>

                  <Button
                    type="text"
                    size="small"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "25px",
                    }}
                    icon={<DeleteOutlined />}
                    onClick={() => remove(name)}
                  />
                </div>
              ))}
              <Form.ErrorList errors={errors} />
            </Space>
            {!hasHobby && (
              <div className={css.hobbyError}>
                You need to add at least one hobby
              </div>
            )}

            <div className={css.hobbyAdd}>
              <Button
                onClick={() => add()}
                type="link"
                size="small"
                icon={<PlusOutlined />}
              >
                Add hobby
              </Button>
            </div>
          </div>
        )}
      </Form.List>
    </>
  );
};