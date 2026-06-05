"use client";
import React from "react";
import AuthForm from "@/components/forms/AuthForm";
import { signUpSchema } from "@/lib/validations";
import { number } from "zod"
const SignUp = () => {
  return (
    <AuthForm
      formType="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{ email: "", password: "", name: "", username: "" }}
      onSubmit={(data) => Promise.resolve({ success: true, data })}
    />
  );
};

export default SignUp;

