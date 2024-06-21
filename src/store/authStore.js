// import { create } from "zustand";

// const useAuthStore = create((set) => ({
//     user: JSON.parse(localStorage.getItem("user-info")),
//     login: (user) => set({ user }),
//     logout: (user) => set({ user: null }),
//     setUser: (user) => set({ user }),
// }));

// export default useAuthStore;

import { create } from "zustand";

const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem("user-info")),
    profileComplete:
        JSON.parse(localStorage.getItem("profile-complete")) || false,
    login: (user) => set({ user }),
    logout: () => {
        localStorage.removeItem("user-info");
        localStorage.removeItem("profile-complete");
        set({ user: null, profileComplete: false });
    },
    setUser: (user) => set({ user }),
    setProfileComplete: (isComplete) => {
        localStorage.setItem("profile-complete", JSON.stringify(isComplete));
        set({ profileComplete: isComplete });
    },
}));

export default useAuthStore;
