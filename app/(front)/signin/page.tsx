import { Metadata } from "next";
import Form from "./Form";

export const metadata: Metadata = {
  title: "Sign in",
};

const Signin = async () => {
  return <Form />;
};
export default Signin;
