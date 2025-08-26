export type Framework = "angular" | "react" | "vue";

export type HobbyForm = {
  name?: string;
  duration?: number;
};

export type FormValues = {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  framework?: Framework;
  frameworkVersion?: string;
  email?: string;
  hobbies?: HobbyForm[];
};

export type Payload = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  framework: Framework;
  frameworkVersion: string;
  email: string;
  hobbies: Array<{ name: string; duration: string }>;
};
