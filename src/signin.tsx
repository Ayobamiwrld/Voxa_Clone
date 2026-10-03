import logo from "./assets/images/logo.png";
import genz from "./assets/images/gen_z/genz.png";
import gen_z1 from "./assets/images/gen_z/gen_z1.png";
import gen_z2 from "./assets/images/gen_z/gen_z2.png";
import image from "./assets/images/gen_z/image.png";
import { useState } from "react";
import { Link } from "react-router";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { Bounce, toast } from "react-toastify";
import useAuthStore from "./authStore";
import { useNavigate } from "react-router";

export default function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginState, setLoginState] = useState(false);
  const { login } = useAuthStore();
  const route = useNavigate();
  async function logIn() {
    setLoginState(true);
    try {
      const resp = await fetch(
        "https://voxa-golang-server-547m.onrender.com/account/login",
        {
          method: "POST",
          headers: {
            "content-type": "application/JSON",
          },
          body: JSON.stringify({ username: userName, password }),
        },
      );
      const userData = await resp.json();
      const authToken = userData.data.token;
      localStorage.setItem("voxaToken", authToken);
      console.log(userData);
      const response = await fetch(
        "https://voxa-golang-server-547m.onrender.com/account/current-user",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      const userInfo = await response.json();
      console.log("CURRENT USER:", userInfo.data);
      login(userInfo.data);
      toast.success("Login successfull", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      // toast.warn("No try am again")
      route("/dashboard");
      return userInfo;
    } catch (error) {
      console.log(error);
      toast.error("Try again");
    } finally {
      setLoginState(false);
    }
  }

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    let isValid = true;

    if (!userName) {
      setUserNameError("This is required !!");
      isValid = false;
    } else if (userName.length == 0) {
      setUserNameError("Username must be above 5 ");
      isValid = false;
    } else {
      setUserNameError("");
    }

    if (!password) {
      setPasswordError("Set your password");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be 8 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      void logIn();
    }
  }
  return (
    <div className="grid grid-cols-1 min-h-screen lg:grid-cols-2 p-5">
      {/* Left promotional panel shown on large screens only */}
      <div className="hidden lg:grid rounded-3xl bg-[#fff3ec]">
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
          <div className="flex flex-col justify-center items-center  ">
            <div className="group grid grid-cols-1 grid-rows-1 w-[60%] min-w-[320px] ml-14 min-[1200px]:w-[80%]">
              <img
                src={gen_z2}
                alt=""
                className="col-start-1 row-start-1 w-[80%] max-w-125 rounded-[18px] outline-[3px] outline-white outline-offset-[-3px] shadow-[0_0_12px_#2714141e] transition-all duration-300 ease-in-out cursor-pointer translate-x-0 -translate-y-1.25 z-3"
              />
              <img
                src={genz}
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
              className="relative left-20 -top-12 z-4 w-[18rem] min-[1200px]:hidden"
            />
          </div>
        </div>
      </div>

      {/* Login form section for the sign-in experience */}
      <div className="flex flex-col w-full justify-between items-center mt-6 md:justify-center gap-10">
        <div className="inline-flex w-full flex-col justify-center items-center gap-6">
          <img src={logo} alt="Voxa Logo" className="w-28 md:w-32 lg: 32" />
          <div className="flex w-full sm:w-md flex-col justify-center gap-8 px-4">
            <div className=" flex flex-col justify-center items-center gap-1.5">
              <h5 className="text-4xl font-bold">Welcome Back</h5>
              <p className="text-[14px] text-mist-400 text-center text-balance">
                You can create a new account or Sign-in to continue
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col gap-3"
            >
              <label htmlFor="name" className="text-mist-600">
                Username
              </label>
              <input
                id="username"
                value={userName}
                onChange={(e) => {
                  e.preventDefault;
                  const value = e.target.value;
                  setUserName(value);
                  setUserNameError(
                    value.trim().length !== 0 ? "" : "Set username",
                  );
                }}
                type="text"
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
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </button>
              </div>
              <button
                type="submit"
                className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-3xl bg-linear-to-b from-orange-500 to-red-500 p-2.5 text-[1.2rem] text-white cursor-pointer"
                disabled={loginState}
              >
                {loginState ? (
                  <span
                    aria-hidden="true"
                    className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none"
                  />
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
            <div className="flex flex-row gap-4 justify-center">
              You are new here?{" "}
              <Link to="/signup" className=" text-[#f65200]">
                Sign up
              </Link>
            </div>
          </div>
        </div>

        {/* Footer note for terms and privacy agreement */}
        <footer className="text-center text-balance p-3 text-[17px]">
          By using Voxa, you agree to our Terms of service and privacy policy
        </footer>
      </div>
    </div>
  );
}
