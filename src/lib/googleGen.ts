import { GoogleGenerativeAI } from "@google/generative-ai";


export const genAI = new GoogleGenerativeAI(
    `${import.meta.env.VITE_GOOGLE_STUDIO_KEY}`
);