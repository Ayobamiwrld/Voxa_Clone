import logo from "./assets/images/logo.png";
import heartImg from "./assets/dashboard_images/heartImg.png";
import { useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

export default function Link() {
  const route = useNavigate();
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const { username } = useParams();
  const [sendingMessage, setSendingMessage] = useState(false);
  function hanldeSendMessage(event: { preventDefault: () => void }) {
    event.preventDefault();
    if (!message) {
      setMessageError("");
      toast.warn("message can not be empty");
      return;
    } else {
      setMessageError("");
    }
    sendMessage();
  }

  async function sendMessage() {
    setSendingMessage(true);
    try {
      const resp = await fetch(
        "https://voxa-golang-server-547m.onrender.com/message/send/text-message",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            messageText: message,
            ownerUsername: username,
          }),
        },
      );
      const data = await resp.json();
      console.log("MESSAGE RESPONSE:", data);
    } catch (error) {
      console.log(error);
      toast.warn("message can not be empty");
    } finally {
      console.log("done");
      setSendingMessage(false);
      toast.success("Message sent");
    }
  }
  return (
    <main className="flex h-screen w-full flex-col gap-8">
      <div className="flex w-full flex-col items-center justify-center gap-10 p-4">
        <nav className="flex flex-row w-full  justify-between lg:w-[65%]">
          <img src={logo} alt="" className="w-26 h-auto lg:w-24" />
          <button
            className="bg-[#fff3ec] font-bold text-[#f65200] rounded-3xl border-[#ffd4ba] border pl-8 pr-8 cursor-pointer"
            onClick={() => route("/signIn")}
          >
            login
          </button>
        </nav>
      </div>
      <div className="w-full h-screen ">
        <form
          className="flex flex-col justify-center items-center  mr-4 ml-4"
          onSubmit={hanldeSendMessage}
        >
          <label
            htmlFor=""
            className="block bg-linear-to-b from-orange-500 to-red-600 p-5 rounded-tr-3xl rounded-tl-3xl w-full lg:w-[30%]"
          >
            <div className="flex flex-row gap-1 items-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white p-2">
                <img
                  src={heartImg}
                  alt=""
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col ">
                <p className="font-bold text-[18px] text-white">
                  Send a message to <span>{username}</span>
                </p>
                <p className="text-white ">Don't fret, You are anonymous</p>
              </div>
            </div>
          </label>
          <textarea
            className="min-h-100  resize-none rounded-b-2xl rounded-bl-2xl p-3 shadow-[10px_10px_45px_#fff3ec] focus:outline-[#fff3ec] w-full lg:w-[30%]"
            id="message"
            value={message}
            onChange={(e) => {
              const value = e.target.value;
              setMessage(value);
            }}
            placeholder="Write your message..."
          />
          {messageError && (
            <p className="text-[10px] text-red-700 mt-1">{messageError}</p>
          )}
          <button
            className="w-[24rem] rounded-3xl bg-linear-to-b from-orange-500 to-red-600 p-2.5 text-[1.2rem] text-white mt-4 font-bold text-center lg:w-[30%] cursor-pointer "
            type="submit"
            disabled={sendingMessage ? true : false}
          >
            {sendingMessage ? (
                  <span
                    aria-hidden="true"
                    className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none"
                  />
                ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
