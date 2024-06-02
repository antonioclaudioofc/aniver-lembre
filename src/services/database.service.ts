import { getDatabase } from 'firebase/database';
import { app } from './firebase.service';

export const database = getDatabase(app);