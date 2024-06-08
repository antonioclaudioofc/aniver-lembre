import { getStorage } from "firebase/storage";
import { app } from './firebase.service';

export const storage = getStorage(app);
