"use client";

import { SignIn, SignUp, useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const { isSignedIn } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  // 🔁 When the page loads or query param changes, sync the mode
  useEffect(() => {
    const urlMode = searchParams.get("mode");
    if (urlMode === "sign-up") {
      setMode("sign-up");
    } else if (urlMode === "sign-in") {
      setMode("sign-in");
    }
  }, [searchParams]);

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
  );
}
