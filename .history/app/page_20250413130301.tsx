"use client";

import { SignIn, SignUp, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome to MyApp</h1>

      <div>
        <button onClick={() => setMode("sign-in")}>Sign In</button>
        <button onClick={() => setMode("sign-up")}>Sign Up</button>
      </div>

      <div style={{ marginTop: "2rem" }}>
        {mode === "sign-in" ? (
          <SignIn
          routing="hash"
          redirectUrl="/dashboard"
          signUpUrl="/?mode=sign-up" // 👈 Add this
        />
        
        ) : (
          <SignUp
            routing="hash"
            redirectUrl="/dashboard"
            afterSignUpUrl="/dashboard"
            signInUrl="/"
          />
        )}
      </div>
    </div>
  );
}
