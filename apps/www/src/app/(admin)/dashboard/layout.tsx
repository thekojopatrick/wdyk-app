import React, { ReactNode } from "react";
import { redirect } from "next/navigation";

import { auth } from "@acme/auth";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session?.user) {
    return redirect("/login");
  }

  return (
    <div>
      <h3>Dashboard</h3>
      {children}
    </div>
  );
};

export default DashboardLayout;
