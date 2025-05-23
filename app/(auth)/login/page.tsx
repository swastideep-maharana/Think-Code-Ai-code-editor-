"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/authHelpers";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthError {
  message: string;
  code?: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push("/editor");
    }
  }, [user, router]);

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err && typeof err === "object" && "message" in err) {
        handleError(err as AuthError);
      } else {
        handleError({ message: "An unknown error occurred." });
      }
    }
  };

  const handleError = (error: AuthError) => {
    alert(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-4 p-6">
          <h2 className="text-2xl font-bold">Login</h2>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <Button onClick={handleLogin} className="w-full mt-4">
              Login
            </Button>
          </div>
          <p className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-blue-600 underline">
              Signup
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
