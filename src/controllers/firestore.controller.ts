import { SubscribeParams } from "@/models/subscribe_params.model";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "@/services/firestore.service";

export class FirestoreController {
  static instance: FirestoreController | null = null;

  static async getInstance() {
    try {
      if (!this.instance) {
        this.instance = new FirestoreController();
      }
      return this.instance;
    } catch {
      throw new Error("Erro ao conectar");
    }
  }

  async register(params: SubscribeParams) {
    const { type, ...data } = params;
    try {
      switch (type) {
        case "event":
          const collectionName = "events";
          const docRef = await addDoc(
            collection(firestore, collectionName),
            data
          );
          break;
        default:
          throw new Error("Tipo de entidade desconhecido");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
      throw new Error("Erro ao adicionar documento: ");
    }
  }
}
