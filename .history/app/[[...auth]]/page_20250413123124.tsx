import { SignIn, SignUp } from '@clerk/nextjs'

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Welcome to ASLS</h1>
          <p className="mt-2 text-sm text-gray-600">Sign in or create an account</p>
        </div>
        <div className="space-y-4">
          <SignIn 
            routing="path"
            path="/sign-in"
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-none",
              }
            }}
          />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>
          <SignUp 
            routing="path"
            path="/sign-up"
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-none",
              }
            }}
          />
        </div>
      </div>
    </div>
  )
} 