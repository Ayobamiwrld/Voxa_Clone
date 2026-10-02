import voxaLogo from "./assets/dashboard_images/voxaLogo.png";
import foxHead from "./assets/dashboard_images/foxHead.png";
import emptyState from "./assets/dashboard_images/emptyState.png";
import bgImage from "./assets/dashboard_images/bgImage.png";
import noChat from "./assets/dashboard_images/noChat.png";
import { Trash } from "iconsax-reactjs";
import { useState, useEffect } from "react";
import useAuthStore from "./authStore";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router";
import useMessageStore from "./message";
import heartImg from "./assets/dashboard_images/heartImg.png";
import { Text } from "iconsax-reactjs";
import { Music } from "iconsax-reactjs";
import logo from "./assets/images/logo.png";
import { CloseSquare } from "iconsax-reactjs";
import { Link1 } from "iconsax-reactjs";
import { MagicStar } from "iconsax-reactjs";
import { Setting } from "iconsax-reactjs";
import Modalpg from "./assets/modal";
import type { messageType } from "./message";
import DeletePg from "./deletePg";
import { Logout } from "iconsax-reactjs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "./components/ui/dropdown-menu";

export default function Dashboard() {
  const [mode, setMode] = useState("message");
  const navigate = useNavigate();
  const { login, currentUser } = useAuthStore();
  const [selectedMessage, setSelectedMessage] = useState<messageType | null>(
    null,
  );
  const [revealedMessageId, setRevealedMessageId] = useState<string | null>(
    null,
  );
  const isSelectedMessageRevealed =
    selectedMessage !== null && revealedMessageId === selectedMessage.id;
  const [clickButton, setClickButton] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<"message" | "all" | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { messages, setMessages } = useMessageStore();
  const [starredIds, setStarredIds] = useState<string[]>([]);

  const toggleStar = (id: string) => {
    setStarredIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  function handleLogout() {
    localStorage.removeItem("voxaToken");
    navigate("/signin");
  }

  const visibleMessages =
    mode === "favourite"
      ? messages?.filter((message) => starredIds.includes(message.id))
      : messages;

  async function dashboardAuth() {
    const authToken = localStorage.getItem("voxaToken");

    if (!authToken) {
      navigate("/signin");
      return;
    }

    try {
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

      if (!response.ok) {
        throw new Error("Unauthorized");
      }

      const userInfo = await response.json();
      login(userInfo.data);
      const resp = await fetch(
        "https://voxa-golang-server-547m.onrender.com/message/get-messages",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      console.log(resp);
      const data = await resp.json();
      setMessages(data.data);
    } catch (error) {
      console.log(error);
      console.log("omo mehn");
      navigate("/signin");
    } finally {
      console.log("done");
    }
  }
  useEffect(() => {
    dashboardAuth();
  }, []);
  function handleCopy() {
    console.log(currentUser);
    window.navigator.clipboard.writeText(
      `localhost:5173/send-message/${currentUser?.username as string}`,
    );
    toast.success("link copied !", {
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
  }
  async function deleteMessage(id: string) {
    const token = localStorage.getItem("voxaToken");

    try {
      const response = await fetch(
        `https://voxa-golang-server-547m.onrender.com/message/delete-message/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (!response.ok) {
        toast.error("Could not delete message");
        return;
      }

      setMessages(messages.filter((message) => message.id !== id));
      setSelectedMessage(null);
      setClickButton(false);
      setIsModalOpen(false);
      setDeleteDialog(null);
      toast.success("Message deleted");
    } catch {
      toast.error("Could not delete message");
    }
  }
  async function deleteAllMessage() {
    if (messages.length === 0) {
      setDeleteDialog(null);
      return;
    }

    const token = localStorage.getItem("voxaToken");
    try {
      const response = await fetch(
        `https://voxa-golang-server-547m.onrender.com/message/delete-all-messages`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log(response);
      if (!response.ok) {
        toast.error("Could not delete messages");
        return;
      }

      setMessages([]);
      setSelectedMessage(null);
      setClickButton(false);
      setIsModalOpen(false);
      setDeleteDialog(null);
      toast.success("Message deleted");
    } catch {
      toast.error("Could not delete message");
    }
  }
  function formatMessageDate(value: string) {
    const date = new Date(value);
    const elapsedSeconds = Math.floor((Date.now() - date.getTime()) / 1000);

    if (Number.isNaN(elapsedSeconds)) return "";
    if (elapsedSeconds < 60) return `${Math.max(0, elapsedSeconds)}s ago`;

    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    if (elapsedMinutes < 60) return `${elapsedMinutes}m ago`;

    const elapsedHours = Math.floor(elapsedMinutes / 60);
    if (elapsedHours < 24) return `${elapsedHours}h ago`;

    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  }
  function confirmDelete() {
    if (deleteDialog === "all") {
      deleteAllMessage();
    } else if (deleteDialog === "message" && selectedMessage) {
      deleteMessage(selectedMessage.id);
    }
  }
  return (
    <div className="grid min-h-screen grid-cols-1 gap-1 p-4 lg:grid-cols-[420px_minmax(0,1fr)]">
      {/* Main mobile dashboard section with header, tabs, and empty state */}
      <div className="flex flex-col gap-10">
        <nav className="flex flex-col p-3 gap-5.5 justify-center items-center ">
          <div className="flex w-full flex-row justify-between items-center p-0.5">
            {" "}
            <img src={voxaLogo} alt="" className="w-11 h-11" />
            <div className="flex flex-row justify-evenly items-center gap-2.5">
              <button
                type="button"
                aria-label="Copy your share link"
                className="rounded-[20px] bg-gray-100 p-1 transition-transform duration-200 ease-out hover:scale-105 active:scale-90 active:-rotate-12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 motion-reduce:transition-none"
                onClick={handleCopy}
              >
                <Link1 className="h-9 w-9 text-[#a88d7f]" />
              </button>
              <button
                type="button"
                aria-label="Delete all messages"
                title={messages.length === 0 ? "No messages to delete" : undefined}
                disabled={messages.length === 0}
                className="cursor-pointer rounded-[20px] bg-gray-100 p-1 transition-transform duration-200 ease-out hover:scale-105 active:scale-90 active:rotate-12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:active:scale-100 disabled:active:rotate-0"
                onClick={() => setDeleteDialog("all")}
              >
                <Trash size="32" color="#f47379" variant="TwoTone" />
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger className="group relative inline-flex h-12 w-12 items-center justify-center rounded-[20px] bg-[#ffcc00] cursor-pointer transition-transform duration-200 ease-out hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 motion-reduce:transition-none">
                  <img
                    src={foxHead}
                    alt=""
                    className="h-9 w-9 object-cover transition-transform duration-200 ease-out group-hover:-rotate-6 group-hover:scale-110 group-active:rotate-6 motion-reduce:transition-none"
                  />
                  <div className="absolute -bottom-1 -right-1 flex  items-center justify-center rounded-full border-2 border-white bg-[white] shadow-sm p-0.5">
                    <Setting size="12" color="red" variant="TwoTone" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-[15px] font-bold text-black capitalize text-center text-balance">
                      {currentUser?.username}
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => handleLogout()}
                    className="text-red-500 flex flex-row justify-evenly items-center"
                  >
                    Log out
                    <Logout size="20" variant="TwoTone" color="red" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="relative flex w-60 rounded-[30px] bg-gray-200 p-1">
            <div
              className={`absolute bottom-1 left-1 top-1 w-[calc(50%-4px)] rounded-[30px] bg-white shadow-sm transition-transform duration-300 ease-out ${
                mode === "favourite" ? "translate-x-full" : "translate-x-0"
              }`}
            />
            <button
              className={`relative z-10 w-1/2 rounded-[30px] px-4 py-3 text-center font-medium transition-colors ${
                mode === "message" ? "text-black" : "text-gray-400"
              }`}
              onClick={() => {
                setMode("message");
                setIsModalOpen(false);
                setClickButton(false);
              }}
            >
              Messages
            </button>
            <button
              className={`relative z-10 w-1/2 rounded-[30px] px-4 py-3 text-center font-medium transition-colors ${
                mode === "favourite" ? "text-black" : "text-gray-400"
              }`}
              onClick={() => {
                setMode("favourite");
                setIsModalOpen(false);
                setClickButton(false);
              }}
            >
              Favourites
            </button>
          </div>
        </nav>
        {mode !== "message" ? (
          visibleMessages?.length === 0 && mode === "favourite" ? (
            <p className="text-[15px] font-bold mt-10 text-center">
              No favourites yet
            </p>
          ) : (
            <div className="flex w-full flex-col items-center justify-center gap-2">
              {visibleMessages?.map((message) => (
                <div
                  key={message.id}
                  className="flex w-full items-center justify-between px-2 py-1"
                  onClick={() => {
                    setSelectedMessage(message);
                    setIsModalOpen(true);
                    setClickButton(true);
                  }}
                >
                  <div className="flex flex-1 items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff3ec] p-2">
                      <img
                        src={heartImg}
                        alt=""
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div className="flex flex-col max-w-40">
                      <p className="font-medium truncate">
                        {message?.messageText || "Voice Message"}
                      </p>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        {message.ownerUsername === "music" ? (
                          <div className="bg-transparent rounded-xs p-0.5">
                            <Music
                              size="10"
                              color="#ff8a65"
                              variant="TwoTone"
                            />
                          </div>
                        ) : (
                          <div className="bg-transparent rounded-xs p-0.5">
                            <Text size="10" color="#ff8a65" variant="Bulk" />
                          </div>
                        )}
                        {formatMessageDate(message.createdAt)}
                      </span>
                    </div>
                  </div>

                  <MagicStar
                    className={`cursor-pointer transition-all duration-200 ease-out hover:scale-110 active:scale-125 motion-reduce:transition-none ${
                      starredIds.includes(message.id)
                        ? "drop-shadow-[0_0_6px_rgba(255,184,77,0.85)]"
                        : ""
                    }`}
                    size="32"
                    color={
                      starredIds.includes(message.id) ? "#ffb84d" : "#d9e3f0"
                    }
                    variant={
                      starredIds.includes(message.id) ? "Bold" : "TwoTone"
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStar(message.id);
                    }}
                  />
                </div>
              ))}
            </div>
          )
        ) : (
          <main className="flex w-full flex-col justify-center items-center">
            <div className="flex  w-full flex-col justify-center items-center gap-4">
              {messages?.length === 0 ? (
                <>
                  <img src={emptyState} alt="" className="w-45" />
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-[16px] font-bold">No Messages Yet</p>
                    <p className="text-gray-400">Share Link to Friends</p>
                  </div>
                  <button
                    className="w-40 cursor-pointer rounded-4xl bg-linear-to-b from-orange-500 to-red-500 px-4 py-2 text-[16px] text-white"
                    onClick={handleCopy}
                  >
                    Copy Link
                  </button>
                </>
              ) : (
                messages?.map((message) => (
                  <div
                    key={message.id}
                    className="flex  w-full items-center justify-between pl-2 pr-2 pt-0.5 pb-0.5"
                    onClick={() => {
                      setSelectedMessage(message);
                      setIsModalOpen(true);
                      setClickButton(true);
                    }}
                  >
                    <div className="flex flex-1 items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff3ec] p-2">
                        <img
                          src={heartImg}
                          alt=""
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <div className="flex flex-col max-w-40">
                        <p className="font-medium truncate">
                          {message?.messageText || "Voice Message"}
                        </p>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          {message.ownerUsername === "music" ? (
                            <div className="bg-transparent rounded-xs p-0.5">
                              <Music
                                size="10"
                                color="#ff8a65"
                                variant="TwoTone"
                              />
                            </div>
                          ) : (
                            <div className="bg-transparent rounded-xs p-0.5">
                              <Text size="10" color="#ff8a65" variant="Bulk" />
                            </div>
                          )}
                          {formatMessageDate(message.createdAt)}
                        </span>
                      </div>
                    </div>

                    <MagicStar
                      className={`cursor-pointer transition-all duration-200 ease-out hover:scale-110 active:scale-125 motion-reduce:transition-none ${
                        starredIds.includes(message.id)
                          ? "drop-shadow-[0_0_6px_rgba(255,184,77,0.85)]"
                          : ""
                      }`}
                      size="32"
                      color={
                        starredIds.includes(message.id) ? "#ffb84d" : "#d9e3f0"
                      }
                      variant={
                        starredIds.includes(message.id) ? "Bold" : "TwoTone"
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStar(message.id);
                      }}
                    />
                  </div>
                ))
              )}
            </div>
          </main>
        )}
      </div>

      {/* Desktop right panel, hidden on mobile and used as a background visual section */}
      <div
        className="relative hidden rounded-3xl bg-[#ffd09d] lg:flex lg:h-[calc(100vh-2rem)] lg:self-start lg:sticky lg:top-4 lg:overflow-hidden flex-col items-center justify-evenly"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {!clickButton || !selectedMessage ? (
          <div className="flex flex-col items-center justify-center gap-3">
            <img src={noChat} alt="" className="w-60" />
            <div className="flex flex-col items-center justify-center">
              <p className="text-[16px] font-bold">No Messages Opened</p>
              <p className="text-gray-400">Your messages appears here</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex h-40 w-80 flex-col rounded-xl bg-white">
              <div
                className="absolute right-5 top-5 z-10 cursor-pointer"
                onClick={() => setClickButton(false)}
              >
                <CloseSquare size="32" color="#ff8a65" variant="Bulk" />
              </div>
              <div className="flex flex-row justify-between p-3">
                <img
                  src={heartImg}
                  alt=""
                  className={`h-9 w-9 transition-transform duration-300 ease-out hover:scale-125 hover:-rotate-12 motion-reduce:transition-none ${
                    isSelectedMessageRevealed ? "scale-110 -rotate-12" : ""
                  }`}
                />
                <img
                  src={logo}
                  alt=""
                  className={`w-20 transition-all duration-500 ease-out motion-reduce:transition-none ${
                    isSelectedMessageRevealed
                      ? "scale-105 opacity-100 blur-0"
                      : "opacity-60 blur-[2px]"
                  }`}
                />
              </div>
              <button
                type="button"
                aria-label={
                  isSelectedMessageRevealed
                    ? "Message revealed"
                    : "Click to reveal message"
                }
                title={
                  isSelectedMessageRevealed
                    ? "Message revealed"
                    : "Click to reveal"
                }
                onClick={() => setRevealedMessageId(selectedMessage.id)}
                className={`mt-4 w-full cursor-pointer px-3 text-center transition-all duration-500 ease-out motion-reduce:transition-none ${
                  isSelectedMessageRevealed
                    ? "opacity-100 blur-0"
                    : "opacity-60 blur-[5px]"
                }`}
              >
                {selectedMessage.messageText || "No message content"}
              </button>
            </div>
            <div className="flex w-full items-center justify-evenly gap-4">
              <div className="cursor-pointer rounded-full border border-white/50 bg-white/35 p-1 shadow-sm backdrop-blur-md">
                <Trash
                  size="32"
                  color="#f47379"
                  variant="TwoTone"
                  className="cursor-pointer rounded-[20px]p-1 transition-transform duration-200 ease-out hover:scale-105 active:scale-90 active:rotate-12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 motion-reduce:transition-none"
                  onClick={() => {
                    setDeleteDialog("message");
                  }}
                />
              </div>

              <div className="rounded-full border border-white/50 bg-white/35 p-1 shadow-sm backdrop-blur-md">
                <MagicStar
                  className={`cursor-pointer transition-all duration-200 ease-out hover:scale-110 active:scale-125 motion-reduce:transition-none ${
                    starredIds.includes(selectedMessage.id)
                      ? "drop-shadow-[0_0_6px_rgba(255,184,77,0.85)]"
                      : ""
                  }`}
                  size="32"
                  color={
                    starredIds.includes(selectedMessage.id)
                      ? "#ffb84d"
                      : "#d9e3f0"
                  }
                  variant={
                    starredIds.includes(selectedMessage.id) ? "Bold" : "TwoTone"
                  }
                  onClick={(e) => {
                    toggleStar(selectedMessage.id);
                    e.stopPropagation();
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
      {isModalOpen && selectedMessage && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <Modalpg
            onClose={() => setIsModalOpen(false)}
            selectedMessages={selectedMessage}
            starredIds={starredIds}
            toggleStar={toggleStar}
            requestDelete={() => setDeleteDialog("message")}
          />
        </div>
      )}
      {deleteDialog && (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm">
          <DeletePg
            onClose={() => setDeleteDialog(null)}
            onConfirm={confirmDelete}
            title={
              deleteDialog === "all" ? "Delete All Messages" : "Delete Message"
            }
            description={
              deleteDialog === "all"
                ? "Are you sure you want to delete all messages? This action can't be undone."
                : "Are you sure you want to delete this message? This action can't be undone."
            }
            confirmLabel={
              deleteDialog === "all" ? "Delete All" : "Delete Message"
            }
          />
        </div>
      )}
    </div>
  );
}
