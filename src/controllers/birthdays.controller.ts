import { firestore } from "@/services/firestore.service";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { nanoid } from "nanoid";

export class BirthdaysController {
  static instance: BirthdaysController | null = null;

  private constructor() {}

  static async getInstance() {
    if (!this.instance) {
      this.instance = new BirthdaysController();
    }
    return this.instance;
  }

  async registerBirthday(
    name: string,
    birthdayDate: string,
    notificationTime: string,
    userId: string
  ) {
    try {
      const birthdaysCollectionRef = collection(
        firestore,
        `users/${userId}/birthdays`
      );

      const id = nanoid();

      await addDoc(birthdaysCollectionRef, {
        id,
        name,
        birthdayDate,
        notificationTime,
        userId,
      });

      return true;
    } catch (error) {
      console.error("Error adding birthday: ", error);
      return false;
    }
  }

  async updateBirthday(
    id: string, 
    name: string,
    birthdayDate: string,
    notificationTime: string,
    userId: string
  ) {
    try {
      const birthdaysRef = collection(firestore, `users/${userId}/birthdays`);

      const q = query(birthdaysRef, where("id", "==", id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;

        await updateDoc(docRef, {
          name,
          birthdayDate,
          notificationTime,
        });

        return true;
      } else {
        console.error("No birthday found with the given id:", id);
        return false;
      }
    } catch (error) {
      console.error("Error updating birthday: ", error);
      return false;
    }
  }

  listenToBirthdayChanges(userId: string, callback: (data: any[]) => void) {
    try {
      const birthdaysRef = collection(firestore, `users/${userId}/birthdays`);

      const unsubscribe = onSnapshot(birthdaysRef, (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        callback(data);
      });

      return unsubscribe;
    } catch (error) {
      console.error("Erro ao escutar mudanças no aniversário:", error);
      throw new Error("Erro ao escutar mudanças no aniversário");
    }
  }
}
