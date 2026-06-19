"use client";
import React from "react";
import AuthForm from "@/components/forms/AuthForm";
import { signUpSchema } from "@/lib/validations";
import { signUpWithCredentials } from "@/lib/action/auth.action";
const SignUp = () => {
  return (
    <AuthForm
      formType="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{ email: "", password: "", name: "", username: "",confirmPassword: ""}}
      onSubmit={signUpWithCredentials}
    />
  );
};

export default SignUp;
