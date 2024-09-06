import { getAuth } from "firebase/auth";
import { app } from "./firebase.service";

export const auth = getAuth(app);
