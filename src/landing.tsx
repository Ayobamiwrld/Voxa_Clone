import "./App.css";
import backgroundImage from "./assets/images/backgroundImage.png";
import logo from "./assets/images/logo.png";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

export default function App() {
  return (
    <div
      className="flex flex-col justify-between bg-cover bg-center bg-no-repeat min-h-screen w-screen overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Top navigation/header bar with logo and sign-in button */}
      <div className="mx-auto flex w-full flex-6 flex-col items-center">
        <div className="mt-8 flex w-[95%] flex-row items-center justify-between rounded-[5rem] border border-white/30 bg-white/10 p-2 shadow-lg backdrop-blur-md sm:w-[70%] md:w-[70%] lg:w-[45%]">
          <img src={logo} alt="Voxa Logo" className="w-24 sm:w-32" />
          <Link
            to="/signin"
            className="inline-flex flex-row items-center gap-x-1 rounded-4xl bg-[#fff3ec] p-3 text-center"
          >
            Sign in <FaArrowRight />
          </Link>
        </div>

        {/* Hero section with main headline, supportive text, and CTA */}
        <div className="flex w-full flex-1 flex-col items-center justify-center gap-10">
          <div className="flex flex-col items-center gap-2">
            <span className="w-fit rounded-l-2xl rounded-r-2xl bg-[#fff3ec] p-1 text-center outline-0.5 outline-orange-500 pl-1.5 pr-1.5 pt-0.5 pb-0.5">
              Alpha
            </span>
            <h1 className="text-center text-3xl font-bold sm:text-4xl md:text-6xl text-balance">
              Speak <span className="text-[#f65200]">Anonymously,</span>
              <br />
              Connect Honestly
            </h1>
            <p className="w-full pl-4 pr-4 text-center text-sm font-bold sm:text-base text-balance">
              Anonymous text messaging.
            </p>
          </div>

          <Link
            to="/signup"
            className="rounded-4xl bg-[#f65200] p-3 text-white sm:text-[0.85rem] max-sm:w-32"
          >
            Get started
          </Link>
        </div>
      </div>

      {/* Footer links for privacy and terms */}
      <footer>
        <ul className="mb-2 flex flex-row justify-center gap-8">
          <li>Privacy Policy</li>
          <li>Terms of service</li>
        </ul>
      </footer>
    </div>
  );
}
