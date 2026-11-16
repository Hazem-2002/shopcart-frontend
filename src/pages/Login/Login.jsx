import React from "react";

import WelcomeSection from "./Components/WelcomeSection";
import LoginForm from "./Components/LoginForm";

const Login = () => {
  return (
    <main className="flex min-h-screen items-center justify-center md:px-4 md:py-4 lg:px-8 bg-bg-surface">
      <div className="w-[98%] mx-auto grid max-md:grid-rows-[auto_auto] gap-8 w-full grid-cols-1 overflow-hidden md:rounded-2xl md:border border-border bg-bg-card shadow md:grid-cols-2">
        <WelcomeSection />
        <LoginForm />
      </div>
    </main>
  );
};

export default React.memo(Login);
