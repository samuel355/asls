"use client";

import { SignIn, SignUp, useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // shadcn button

export default function Home() {
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const { isSignedIn } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Detect ?mode= in URL
  useEffect(() => {
    const urlMode = searchParams.get("mode");
    if (urlMode === "sign-up") setMode("sign-up");
    if (urlMode === "sign-in") setMode("sign-in");
  }, [searchParams]);

  // Redirect to dashboard if signed in
  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Akwamufie Stool Lands Secretariat
        </h1>

        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            variant={mode === "sign-in" ? "default" : "outline"}
            onClick={() => setMode("sign-in")}
          >
            Sign In
          </Button>
          <Button
            variant={mode === "sign-up" ? "default" : "outline"}
            onClick={() => setMode("sign-up")}
          >
            Sign Up
          </Button>
        </div>

        {/* Clerk Auth Component */}
        <div className="mt-4">
          {mode === "sign-in" ? (
            <SignIn
              routing="hash"
              redirectUrl="/dashboard"
              signUpUrl="/?mode=sign-up"
            />
          ) : (
            <SignUp
              routing="hash"
              redirectUrl="/dashboard"
              afterSignUpUrl="/dashboard"
              signInUrl="/?mode=sign-in"
            />
          )}
        </div>
      </div>
    </div>
  );
}
