"use client";
import { useRouter } from "next/router";
import { Button } from "./ui/button";
import { logOut } from "../lib/authHelpers";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logOut();
    router.push("/login");
  };

  return (
    <Button onClick={handleLogout} className="mt-4">
      Logout
    </Button>
  );
}
