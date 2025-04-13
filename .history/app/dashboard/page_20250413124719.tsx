// pages/dashboard.tsx
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';

export default function Dashboard() {
  return (
    <>
      <SignedIn>
        <h1>Welcome to your dashboard!</h1>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
