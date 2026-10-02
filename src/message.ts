import { create } from "zustand";

export type messageType = {
    id: string,
     ownerUsername: string,
    messageText: string,
    isOpen: boolean,
    isStarred: boolean,
    createdAt: string,
}
type MessageStore = {
    messages: messageType[];
    setMessages: (messages: messageType[]) => void;
    setSingleMessage: (message: messageType) => void;
};

const useMessageStore = create<MessageStore>((set) => ({
    messages: [],
    setMessages: (messages) => {
        set({ messages });
    },
    setSingleMessage: (message) => {
        set((state) => ({
            messages: [message, ...state.messages],
        }));
    },
}));

export default useMessageStore;