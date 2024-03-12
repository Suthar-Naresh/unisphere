import { createContext, useContext, useState } from "react";
import authService from "../appwrite/auth";

export const AppWriteContext = createContext({
    loggedIn: false,
    setLoggedIn: () => {},
    auth: authService
});

export const AppwriteProvider = AppWriteContext.Provider;

export default function useAppwrite() {
    return useContext(AppWriteContext)
}