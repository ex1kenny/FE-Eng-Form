import type { FC } from "react";
import {  Button, Form,   Card,  message } from "antd";
import { FeFormColumnSetap } from "./FeFormColumnSetap";
import type { FormValues, Payload } from "../../types"; 
import css from "./FeForm.module.css"; 
import { isDuplicateEmail } from "../../utils";

export const FeForm: FC = () => {
  const [form] = Form.useForm<FormValues>(); 
  const hobbiesWatch = Form.useWatch("hobbies", form);
  const [msgApi, contextHolder] = message.useMessage();  


const hasValidHobby = !!hobbiesWatch?.some(
  (h) => !!h?.name?.trim() && (h?.duration ?? 0) > 0
);

  const onValue = (values: FormValues) => {  

     if (!hasValidHobby) {
       msgApi.error("You need to add at least one hobby");
       form.scrollToField("hobbies");
       return;
     }

if (isDuplicateEmail(values.email)) {
  form.setFields([{ name: "email", errors: ["Such an email already exists"] }]);
  msgApi.error("Such an email already exists");
  return; 
}
   const payload: Payload = {
      firstName: values.firstName!.trim(),
      lastName: values.lastName!.trim(),
      dateOfBirth: values.dateOfBirth || "",
      framework: values.framework!,
      frameworkVersion: values.frameworkVersion!,
      email: values.email!.trim(),
      hobbies: (values.hobbies || []).map((h) => ({
        name: (h.name || "").trim(),
        duration: `${h.duration ?? 0} month`,
      })),
    };

    console.log("Submit payload:", payload);
    msgApi.success("Form submitted! Payload in console");
    form.resetFields();
  };

  return (
    <>
      {contextHolder}
      <div className={css.fePage}>
        <div className={css.feWrap}>
          <Card
            style={{
              borderColor: "rgba(22,119,255,.15)",
              boxShadow: "0 8px 30px rgba(22,119,255,.08)",
              borderRadius: 12,
            }}
          >
            <Form<FormValues>
              form={form}
              layout="vertical"
              onFinish={onValue}
              initialValues={{ dateOfBirth: undefined, hobbies: [{}] }}
            >
              <FeFormColumnSetap form={form} />

              <div className={css.feactions}>
                <Button type="primary" htmlType="submit" className={css.feBtn}>
                  Submit
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};