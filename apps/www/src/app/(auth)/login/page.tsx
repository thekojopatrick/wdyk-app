import React from "react";

import { AuthShowcase } from "../../_components/auth-showcase";

const LoginPage = () => {
  return (
    <div className="container h-screen">
      <div className="flex h-full flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold">Login</h2>
        <AuthShowcase />
      </div>
    </div>
  );
};

export default LoginPage;
