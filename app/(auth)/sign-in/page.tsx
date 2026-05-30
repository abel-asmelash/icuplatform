import React from "react";
import Link from "next/link";

const SignIn = () => {
  return (
    <div>
      <Link href="/sign-in">
        <h1>sign-In</h1>
      </Link>

      <form action="/search">
        <input type="text" placeholder="Type your email.." />
        <label>Email</label>

        <input type="password" placeholder="Type your password.." />
        <label>Password</label>

        <input name="query" />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignIn;
