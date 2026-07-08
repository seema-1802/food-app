import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";
// const firebaseConfig = {
//   apiKey: "AIzaSyByElRm5H67zmY3bijq8WtSbLnc9q-ABok",
//   authDomain: "food--app-68298.firebaseapp.com",
//   projectId: "food--app-68298",
//   appId: "1:818807902633:web:0efd823200aa8a5cc174b8",
  
// };

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

