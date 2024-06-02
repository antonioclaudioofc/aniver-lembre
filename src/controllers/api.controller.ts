import { SubscribeParams } from "@/models/subscribe_params.model";
import { firestore } from "@/services/firestore.service";
import { addDoc, collection } from "firebase/firestore";

export class FirestoreController {
  private constructor() {}

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
    try {
      switch (params.type) {
        case "event":
          break;
        default:
          throw new Error("Tipo de entidade desconhecido");
      }

      const collectionRef = await addDoc(
        collection(firestore, "event"),
        params
      );
      console.log("Document written with ID: ", collectionRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);

      throw new Error(error.response?.data?.message);
    }
  }
}
