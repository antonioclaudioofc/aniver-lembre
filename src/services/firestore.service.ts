import { getFirestore } from 'firebase/firestore/lite';
import { app } from './firebase.service';

export const firestore = getFirestore(app);