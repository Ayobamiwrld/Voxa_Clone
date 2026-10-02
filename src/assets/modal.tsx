import bgImage from "./dashboard_images/bgImage.png";
import { CloseSquare } from "iconsax-reactjs";
import { Trash } from "iconsax-reactjs";
import { MagicStar } from "iconsax-reactjs";
import heartImg from "./dashboard_images/heartImg.png";
import logo from "./images/logo.png";
import type { messageType } from "@/message";

type ModalpgProps = {
  onClose: () => void;
  selectedMessages:messageType;
  starredIds: string[];
  toggleStar:(id: string) => void
  requestDelete: () => void;
};

export default function Modalpg(props:ModalpgProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-orange-200/80 backdrop-blur-sm rounded-3xl"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute right-5 top-5 z-10 cursor-pointer"
        onClick={props.onClose}
      >
        <CloseSquare size="32" color="#ff8a65" variant="Bulk" />
      </div>

      <div className="flex flex-col  h-screen items-center justify-evenly gap-10">
        <div className="h-40 w-72 rounded-3xl bg-white" >
            <div className="flex flex-row justify-between p-3">
                <img src={heartImg} alt="" className="h-9 w-9" />
                <img src={logo} alt="" className="w-20 blur-[2px]" />
              </div>
              <div className="text-center mt-4">{props.selectedMessages.messageText}</div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <div className="rounded-full bg-white p-1">
            <Trash size="32" color="#f47379" variant="TwoTone" 
            onClick={props.requestDelete}/>
          </div>
          <button className="w-auto rounded-4xl bg-linear-to-b from-orange-500 to-red-500 p-2.5 text-[1.2rem] text-white">
            Share Message
          </button>
          <div className="rounded-full bg-white p-1">
            <MagicStar
            size="32"
            className={`transition-all duration-200 ${
              props.starredIds.includes(props.selectedMessages.id)
                ? "drop-shadow-[0_0_6px_rgba(255,184,77,0.85)]"
                : ""
            }`}
            color={props.starredIds.includes(props.selectedMessages.id) ? "#ffb84d" : "#d9e3f0"}
          variant={props.starredIds.includes(props.selectedMessages.id) ? "Bold" : "TwoTone"}
        onClick={() => props.toggleStar(props.selectedMessages.id)} />
          </div>
        </div>
      </div>
    </div>
  );
}
