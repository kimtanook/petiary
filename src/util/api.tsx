import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { dbService, storageService } from "./firebase";

// 다이어리 포스트 저장
export const addDiaryPost = (data: any) => {
  addDoc(collection(dbService, "diary"), data);
};

// 다이어리 포스트 가져오기
export const getDiaryPost = async () => {
  const response: any = [];

  const q = query(collection(dbService, "diary"), orderBy("createdAt", "desc"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    response.push({ id: doc.id, ...doc.data() });
  });

  return response;
};

export const deleteDiaryPostImage = ({ imageUrl }: any) => {
  const desertRef = ref(storageService, `images/${imageUrl}`);

  // 작성 중 이탈 시 해당 사진을 스토리지에서 삭제
  deleteObject(desertRef)
    .then(() => {})
    .catch((error) => {
      console.log("error : ", error);
    });
};
