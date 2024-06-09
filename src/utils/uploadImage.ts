import { storage } from "@/services/storage.service";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { generateImageName } from "./generateImageName";

export async function uploadImage(file: File) {
  const filePath = "births/";
  const filename = generateImageName();
  const storageRef = ref(storage, filePath + filename);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}
