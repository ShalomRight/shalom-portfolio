import React from "react";
import { Metadata } from "next";
import RegisterMain from "@/pages/register/register-main";

export const metadata: Metadata = {
  title: "Shalom.js - Register page",
};

const RegisterPage = () => {
  return (
    <RegisterMain/>
  );
};

export default RegisterPage;
