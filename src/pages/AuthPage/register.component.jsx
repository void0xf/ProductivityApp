import React, { useState } from "react";
import {
  registerWithEmailAndPassword,
  signInWithGoogle,
  signInWithGithub,
} from "../../firebase/auth";
import { useRouter } from "next/navigation";
import { errorCodeToMessage } from "../../utils/firebase/handleErrors";

const Register = ({ setLogin }) => {
  const router = useRouter();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (passwordInput !== confirmPasswordInput) {
        setError("passwords-dont-match");
        return;
      }
      const res = await registerWithEmailAndPassword(emailInput, passwordInput);
      if (res) {
        router.push("/app");
      }
    } catch (errorCode) {
      setError(errorCode);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setIsLoading(true);
    try {
      const res = await signInWithGoogle();
      if (res) {
        router.push("/app");
      }
    } catch (errorCode) {
      setError(errorCode);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGithubSignIn() {
    setIsLoading(true);
    try {
      const res = await signInWithGithub();
      if (res) {
        router.push("/app");
      }
    } catch (errorCode) {
      setError(errorCode);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-bkg rounded-xl shadow-lg font-sans">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-textcolor">Create Account</h2>
        <p className="text-DarkerGrayWhite mt-2">Sign up to get started</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-textcolor mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full px-4 py-2 border border-bordercolor rounded-lg focus:ring-2 focus:ring-acent focus:border-transparent transition bg-bkg text-textcolor"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-textcolor mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full px-4 py-2 border border-bordercolor rounded-lg focus:ring-2 focus:ring-acent focus:border-transparent transition bg-bkg text-textcolor"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-textcolor mb-1"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPasswordInput}
              onChange={(e) => setConfirmPasswordInput(e.target.value)}
              className="w-full px-4 py-2 border border-bordercolor rounded-lg focus:ring-2 focus:ring-acent focus:border-transparent transition bg-bkg text-textcolor"
              placeholder="Confirm your password"
              required
            />
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">
            {errorCodeToMessage(error)}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-acent hover:bg-acent/90 text-customWhite font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-acent focus:ring-opacity-75 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-bordercolor"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-bkg text-DarkerGrayWhite">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full inline-flex justify-center py-2 px-4 border border-bordercolor rounded-md shadow-sm bg-bkg text-sm font-medium text-textcolor hover:bg-bkg/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-acent transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#FFC107"
                d="M21.35,11.1H12.18V13.83H16.69C16.36,15.64 14.78,17.12 12.18,17.12C9.1,17.12 6.68,14.7 6.68,11.62C6.68,8.54 9.1,6.12 12.18,6.12C13.61,6.12 14.89,6.62 15.85,7.5L18.22,5.13C16.74,3.75 14.6,2.88 12.18,2.88C6.63,2.88 2.18,7.33 2.18,12.88C2.18,18.43 6.63,22.88 12.18,22.88C17.73,22.88 22.18,18.43 22.18,12.88C22.18,12.3 22.12,11.73 22.03,11.18L21.35,11.1Z"
              />
            </svg>
            <span className="ml-2">Google</span>
          </button>

          <button
            onClick={handleGithubSignIn}
            disabled={isLoading}
            className="w-full inline-flex justify-center py-2 px-4 border border-bordercolor rounded-md shadow-sm bg-bkg text-sm font-medium text-textcolor hover:bg-bkg/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-acent transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
              />
            </svg>
            <span className="ml-2">GitHub</span>
          </button>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-DarkerGrayWhite">
          Already have an account?{" "}
          <button
            onClick={() => setLogin(true)}
            className="font-medium text-acent hover:text-acent/90 focus:outline-none focus:underline transition"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
