"use server";
// https://regal-holidays.net/wp-content/uploads/2019/06/red-fort-lal-qila-delhi-india.jpg
import { db, storage } from "@/config/firebase";
import { EventModel } from "@/model/EventModel";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { z } from "zod";

export const uploadEvent = async (values: z.infer<typeof EventModel>) => {
  try {
    console.log(values);
    if (values.urlImage) {
      const collectionRef = collection(db, "eventos");
      addDoc(collectionRef, {
        name: values.eventDate,
        date: values.eventDate,
        description: values.description,
        location: values.location,
        category: values.category,
        frequency: values.frequency,
        image: values.urlImage,
      });

      console.log("Formulário atualizado com o URL da imagem");
    } else {
      const collectionRef = collection(db, "eventos");
      addDoc(collectionRef, {
        name: values.eventDate,
        date: values.eventDate,
        description: values.description,
        location: values.location,
        category: values.category,
        frequency: values.frequency,
        image:
          "https://regal-holidays.net/wp-content/uploads/2019/06/red-fort-lal-qila-delhi-india.jpg",
      });
    }
  } catch (error) {
    console.error("Erro durante o upload ou obtenção do URL:", error);
  }
};
