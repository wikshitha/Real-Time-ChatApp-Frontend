import axios from "axios";
import { create } from "zustand";

export const useAuth = create((set) => ({
    user: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpddatingProfile: false,
    
    isCheckingAuth: true,

     checkAuth: async ()=> {
        try{
            const res = await axios.get('/api/users/check')

            set({user: res.data})
        } catch (error) {
            console.log("Error checking auth", error)
            set({user: null})
        } finally {
            set({isCheckingAuth: false})
        }
    }
}));

