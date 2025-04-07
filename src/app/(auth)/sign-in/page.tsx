import { redirect } from "next/navigation";
import SignInForm from "./components/sign-in-form";
import { loginUser } from "../../../firebase/auth";

export default function SignInPage() {
  async function handleSignIn(formData: FormData) {
    "use server";

    // Debug logs to help track execution
    console.log("Server action triggered with form data");

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      console.log("Missing fields");
      return { error: "missing-fields" };
    }

    try {
      console.log("Attempting login");
      const res = await loginUser(email, password);
      if (res) {
        redirect("/dashboard");
      }
      return { success: true };
    } catch (errorCode) {
      console.log("Login error:", errorCode);
      return { error: errorCode as string };
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto p-6 bg-bkg rounded-xl shadow-lg font-sans">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-textcolor">Welcome Back</h2>
          <p className="text-DarkerGrayWhite mt-2">Sign in to your account</p>
        </div>

        <SignInForm handleSignIn={handleSignIn} />
      </div>
    </div>
  );
}
