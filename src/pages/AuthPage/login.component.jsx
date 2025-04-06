import React, { useEffect, useState } from "react";
import InputRegister from "./input";
import { loginUser, registerWithEmailAndPassword } from "../../firebase/auth";
import { useRouter } from "next/navigation";
import { errorCodeToMessage } from "../../utils/firebase/handleErrors";

const Login = ({ setLogin }) => {
  const router = useRouter();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");

  async function handleSignUp() {
    try {
      const res = await loginUser(emailInput, passwordInput);
      if (res) {
        router.push("/app");
      }
    } catch (errorCode) {
      setError(errorCode);
    }
  }

  return (
    <div className="flex flex-col border-2 border-color rounded-lg bg-bkg min-w-[20rem] h-full items-center">
      <div>
        <p className="font-semibold text-center text-xl my-5">
          Login To Your Account
        </p>
      </div>
      <div className="flex items-center flex-col m-2">
        <InputRegister
          label={"E-Mail"}
          input={emailInput}
          inputSetter={setEmailInput}
        />
      </div>

      <div className="flex items-center flex-col m-2">
        <InputRegister
          label={"Password"}
          input={passwordInput}
          inputSetter={setPasswordInput}
        />
      </div>
      {error.length > 0 ? (
        <div className="justify-center flex text-center">
          <p className="font-sans text-red-500">{errorCodeToMessage(error)}</p>
        </div>
      ) : null}

      <div className="flex text-center text-[1rem] mt-5 mb-2">
        <p></p>
        <button
          className="text-acent mx-2"
          onClick={() => {
            setLogin(false);
          }}
        >
          Dont Have Account ?
        </button>
      </div>

      <button
        className="py-2 px-2 rounded-lg bg-acent text-white font-semibold min-w-[10rem]"
        onClick={() => {
          handleSignUp();
        }}
      >
        Sign In
      </button>

      <div className="m-2">
        <p className="text-center">Or</p>
      </div>

      <div>
        <div className="flex justify-center">
          <button>
            <p>Login With Google</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
