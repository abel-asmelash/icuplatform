"use client"
 import React from "react";
import AuthForm from "@/components/forms/AuthForm";
import { signInSchema } from "@/lib/validations";
const SignIn = () => {
  return (
    <div>
      <AuthForm 
      formType="SIGN_IN"
      schema={signInSchema}
      defaultValues={{email: "", password:""}}
      onSubmit={() => Promise.resolve({ success: true })}
       />
    </div>
  );
};

export default SignIn;
