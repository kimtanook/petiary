import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { dbService } from "./firebase";

export const addDiaryPost = (data: any) => {
  addDoc(collection(dbService, "diary"), data);
};

export const getDiaryPost = async () => {
  const response: any = [];

  const q = query(collection(dbService, "diary"), orderBy("createdAt", "desc"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    response.push({ id: doc.id, ...doc.data() });
  });

  return response;
};
