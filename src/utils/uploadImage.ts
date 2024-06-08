import { storage } from "@/services/storage.service";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadImage(file: File) {
  const filePath = "images/";
  const storageRef = ref(storage, filePath + "asas");
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}
