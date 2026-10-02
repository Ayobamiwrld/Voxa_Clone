import { create } from "zustand";

type User = {
  id: string;
  username: string;
  token: string;
  PushNotificationEnabled: boolean;
  PushToken: string[];
};

type AuthStore = {
  currentUser: User | null;
  isLoggedIn: boolean;

  login: (user: User) => void;
  logout: () => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  currentUser: null,
  isLoggedIn: false,

  login: (user) => {
    set({
      currentUser: user,
      isLoggedIn: true,
    });
  },

  logout: () => {
    set({
      currentUser: null,
      isLoggedIn: false,
    });
  },
}));

export default useAuthStore;