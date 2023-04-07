import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { dbService, storageService } from "./firebase";

// 구글 로그인, 회원가입 시 유저 데이터 저장
export const addUserData = async (data: any) => {
  setDoc(doc(dbService, `user/${data.uid}`), data);
};
// 전체공개 다이어리 포스트 가져오기
export const getOpenDiaryPost = async () => {
  const response: any = [];

  const q = query(
    collection(dbService, "diary"),
    where("open", "==", true),
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    response.push({ id: doc.id, ...doc.data() });
  });

  return response;
};
// 내 다이어리 포스트 가져오기
export const getDiaryPost = async ({ queryKey }: any) => {
  const [_, uid] = queryKey;
  const response: any = [];

  const q = query(
    collection(dbService, "diary"),
    where("uid", "==", uid),
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    response.push({ id: doc.id, ...doc.data() });
  });

  return response;
};
// 다이어리 포스트 저장
export const addDiaryPost = (data: any) => {
  addDoc(collection(dbService, "diary"), data);
};
// 다이어리 포스트 수정
export const updateDiaryPost = (data: any) => {
  return updateDoc(doc(dbService, `diary/${data.id}`), data);
};
// 다이어리 포스트 삭제
export const deleteDiaryPost = (data: any) => {
  deleteDoc(doc(dbService, `diary/${data.id}`));
};

export const deleteDiaryPostImage = ({ imageUrl }: any) => {
  const desertRef = ref(storageService, `images/${imageUrl}`);
  // 스토리지에서 이미지 삭제
  deleteObject(desertRef)
    .then(() => {})
    .catch((error) => {
      console.log("error : ", error);
    });
};
