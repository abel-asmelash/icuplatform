"use client"
 import React from "react";
import AuthForm from "@/components/forms/AuthForm";
import { SignInSchema } from "@/lib/validations";
import { signInWithCredentials } from "@/lib/action/auth.action";
const SignIn = () => {
  return (
    <div>
      <AuthForm 
      formType="SIGN_IN"
      schema={SignInSchema}
      defaultValues={{email: "", password:""}}
      onSubmit={signInWithCredentials}
       />
    </div>
  );
};

export default SignIn;
