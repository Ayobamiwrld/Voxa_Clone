import logo from "./assets/images/logo.png";
import genz from "./assets/images/gen_z/genz.png";
import gen_z1 from "./assets/images/gen_z/gen_z1.png";
import gen_z2 from "./assets/images/gen_z/gen_z2.png";
import image from "./assets/images/gen_z/image.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";

export default function SignUp() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassWord, setConfirmPassWord] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [secondShowPassword, setSecondShowPassword] = useState(false);
  const [confirmPassWordError, setConfirmPassWordError] = useState("");
  const [accountCreation, setAccountCreation] = useState(false);
  const [successfullCreation, setSuccessfullCreation] = useState(false);

  async function dataUpload() {
    try {
      await fetch(
        "https://voxa-golang-server-547m.onrender.com/account/register",
        {
          method: "POST",
          headers: {
            "content-type": "application/JSON",
          },
          body: JSON.stringify({ username: userName, password }),
        },
      );
      setSuccessfullCreation(true);
    } catch (error) {
      console.log(error);
    } finally {
      setAccountCreation(false);
    }
  }

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    let isValid = true;
    if (!userName) {
      setUserNameError("This is required !!");
      isValid = false;
    } else if (userName.length < 5) {
      setUserNameError("Username must be above 5 ");
      isValid = false;
    } else {
      setUserNameError("");
    }
    if (!password) {
      setPasswordError("Set your password");
      isValid = false;
    } else if (password.length < 8) {
      isValid = false;
      setPasswordError("Password must be 8 characters");
    } else {
      setPasswordError("");
    }
    if (!confirmPassWord) {
      setConfirmPassWordError("Confirm your password");
      isValid = false;
    } else if (password !== confirmPassWord) {
      setConfirmPassWordError("The password does not match");
      isValid = false;
    } else {
      setConfirmPassWordError("");
    }
    if (!isValid) {
      return;
    } else {
      dataUpload();
    }
  }
  return (
    <div className="grid grid-cols-1 min-h-screen lg:grid-cols-2 p-5">
      {/* Left promotional panel shown on large screens only */}
      <div className="hidden bg-[#fff3ec] lg:grid rounded-3xl">
        <div className="flex flex-col justify-evenly  items-center ">
          <div>
            <h5 className="text-5xl font-bold">
              From Anon to{" "}
              <span className="text-5xl font-bold text-[#f65200]">You</span>
            </h5>
            <p className="text-mist-400 text-base">
              {" "}
              You can send and recieve both text and voice message
            </p>
          </div>
          <div className="flex flex-col justify-center items-center ">
            <div className=" group grid grid-cols-1 grid-rows-1 w-[60%]  min-w-[320px] ml-14 min-[1200px]:w-[80%] ">
              <img
                src={genz}
                alt=""
                className="col-start-1 row-start-1 w-[80%] max-w-125 rounded-[18px] outline-[3px] outline-white outline-offset-[-3px] shadow-[0_0_12px_#2714141e] transition-all duration-300 ease-in-out cursor-pointer translate-x-0 -translate-y-1.25 z-3"
              />
              <img
                src={gen_z2}
                alt=""
                className="col-start-1 row-start-1 w-[80%] max-w-125 rounded-[18px] outline-[3px] outline-white outline-offset-[-3px] shadow-[0_0_12px_#2714141e] transition-all duration-300 ease-in-out cursor-pointer translate-x-5 rotate-[4deg] z-2 group-hover:translate-x-10 group-hover:rotate-12"
              />
              <img
                src={gen_z1}
                alt=""
                className="col-start-1 row-start-1 w-[80%] max-w-125 rounded-[18px] outline-[3px] outline-white outline-offset-[-3px] shadow-[0_0_12px_#2714141e] transition-all duration-300 ease-in-out cursor-pointer -translate-x-5 rotate-[-4deg] z-1 group-hover:-translate-x-10 group-hover:-rotate-12"
              />
            </div>
            <img
              src={image}
              alt=""
              className="relative left-20 -top-12 z-4 w-[18rem] min-[1200px]:hidden "
            />
          </div>
        </div>
      </div>

      {/* Signup form shown on both mobile and desktop */}
      {successfullCreation ? (
        <div className="flex justify-center items-center w-full">
          <div className="flex flex-col items-center  gap-8 w-[85%]">
            <FaCircleCheck className=" text-[#ff7a37] w-15 h-15" />
            <div className="flex  flex-col gap-1 justify-center items-center text-balance">
              <h2 className="font-bold text-black text-[30px]">Success</h2>
              <p className="text-balance">
                Your account has been created succesfully, continue to login
              </p>
            </div>
            <button
              className=" bg-linear-to-b from-orange-500 to-red-500 p-3.5 rounded-4xl text-white w-[24rem]"
              onClick={() => navigate("/signin")}
            >
              Proceed to login
            </button>
          </div>
        </div>
      ) : (
        <div className=" flex flex-col w-full justify-between items-center mt-6 md:justify-center gap-6">
          <div className="inline-flex w-full flex-col justify-center items-center gap-3">
            <img src={logo} alt="Voxa Logo" className="w-28 md:w-32 lg: 32" />
            <div className="flex w-full sm:w-md flex-col justify-center gap-8 px-4">
              <div className=" flex flex-col justify-center items-center gap-1.5">
                <h5 className="text-4xl font-bold">Create Memories</h5>
                <p className="text-[14px] text-mist-400">
                  You can create a new account or Sign-in to continue
                </p>
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col gap-1.5"
              >
                <label htmlFor="username" className="text-mist-600">
                  Username
                </label>
                <input
                  id="Username"
                  type="text"
                  value={userName}
                  onChange={(e) => {
                    const value = e.target.value;
                    setUserName(value);
                    setUserNameError(
                      value.trim().length !== 0 ? "" : "Set your Username",
                    );
                  }}
                  placeholder="e.g, isaac"
                  className="w-full border border-slate-300 rounded-md p-2.5 placeholder:text-mist-400 pl-1.5 lg:p-2.5"
                />
                {userNameError && (
                  <p className="text-[10px] text-red-700">{userNameError}</p>
                )}
                <label htmlFor="password" className="text-mist-600">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      const value = e.target.value;
                      setPassword(value);
                      setPasswordError(
                        value.trim().length !== 0 ? "" : "Set password",
                      );
                    }}
                    placeholder="Password"
                    className="w-full border border-slate-300 rounded-md p-2.5 placeholder:text-mist-400 pl-1.5 lg:p-2.5"
                  />
                  {passwordError && (
                    <p className="text-[10px] text-red-700">{passwordError}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </button>
                </div>
                <label htmlFor="" className="text-mist-600">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmpassword"
                    type={secondShowPassword ? "text" : "password"}
                    value={confirmPassWord}
                    onChange={(e) => {
                      const value = e.target.value;
                      setConfirmPassWord(value);
                    }}
                    placeholder=" Confirm Password"
                    className="w-full border border-slate-300 rounded-md p-2.5 placeholder:text-mist-400 pl-1.5 lg:p-2.5"
                  />
                  {confirmPassWordError && (
                    <p className="text-[10px] text-red-700">
                      {confirmPassWordError}
                    </p>
                  )}
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setSecondShowPassword(!secondShowPassword)}
                  >
                    {" "}
                    {secondShowPassword ? (
                      <IoEyeOutline />
                    ) : (
                      <IoEyeOffOutline />
                    )}
                  </button>
                </div>
                <button
                  className="w-full rounded-3xl bg-linear-to-b from-orange-500 to-red-500 p-2.5 text-[1.2rem] text-white mt-4 cursor-pointer"
                  type="submit"
                  disabled={accountCreation ? true : false}
                >
                  {accountCreation ? (
                    <span
                      aria-hidden="true"
                      className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none"
                    />
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>
              <div className="flex flex-row gap-4 justify-center">
                Have an account already?{" "}
                <Link to="/signin" className=" text-[#f65200]">
                  Sign-in
                </Link>
              </div>
            </div>
          </div>
          {successfullCreation ? (
            ""
          ) : (
            <footer className="text-center text-balance p-3 text-[17px]">
              By using Voxa, you agree to our Terms of service and privacy
              policy
            </footer>
          )}
        </div>
      )}
    </div>
  );
}
