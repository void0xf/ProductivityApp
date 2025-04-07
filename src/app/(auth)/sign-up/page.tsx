import { registerWithEmailAndPassword } from "../../../firebase/auth";
import { redirect } from "next/navigation";
import SignUpForm from "./components/sign-up-form";

export default function SignUpPage() {
  async function handleRegister(formData: FormData) {
    "use server";
    
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    
    if (!email || !password || !confirmPassword) {
      return { error: "missing-fields" };
    }
    
    if (password !== confirmPassword) {
      return { error: "passwords-dont-match" };
    }
    
    try {
      const res = await registerWithEmailAndPassword(email, password);
      if (res) {
        redirect("/dashboard");
      }
      return { success: true };
    } catch (errorCode) {
      return { error: errorCode as string };
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-bkg rounded-xl shadow-lg font-sans">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-textcolor">Create Account</h2>
        <p className="text-DarkerGrayWhite mt-2">Sign up to get started</p>
      </div>

      <SignUpForm handleRegister={handleRegister} />
    </div>
  );
} 