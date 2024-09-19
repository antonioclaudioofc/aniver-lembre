import { firestore } from "@/services/firestore.service";
import { addDoc, collection, doc, onSnapshot, query } from "firebase/firestore";

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

      await addDoc(birthdaysCollectionRef, {
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
