import {
  DocumentData,
  QueryDocumentSnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { dbService, storageService } from "./firebase";

// 구글 로그인, 회원가입 시 유저 데이터 저장
export const addUserData = async (data: any) => {
  setDoc(doc(dbService, `user/${data.uid}`), data);
};

// 특정 유저 정보 가져오기
export const getUserData = async ({ queryKey }: any) => {
  const [_, userUid] = queryKey;
  const docRef = doc(dbService, "user", userUid);
  const docData = await getDoc(docRef);

  return docData.data();
};

// 유저 정보 수정
export const editProfileImage = async (data: any) => {
  updateDoc(doc(dbService, `user/${data.uid}`), data);
};

// 전체 유저 정보 가져오기
export const getAllUserData = async () => {
  const response: any = [];

  const querySnapshot = await getDocs(collection(dbService, "user"));
  querySnapshot.forEach((doc) => {
    response.push({ ...doc.data() });
  });

  return response;
};

// 전체공개 다이어리 포스트 가져오기
let openPostLastVisible:
  | QueryDocumentSnapshot<DocumentData>
  | number
  | undefined = undefined;
export const openPostLastVisibleReset = () => {
  // 리셋을 해주지 않으면 새로고침 전까지 lastVisible이 querySnapshot.docs.length로 유지됨
  // 그로 인해, 페이지 이동 후 돌아오면 다음 페이지부터 보여주므로 기존 데이터 날아감.
  openPostLastVisible = undefined;
};

export const getOpenDiaryPost = async () => {
  const getData: { [key: string]: string }[] = [];
  let q;

  if (openPostLastVisible === -1) {
    return;
  } else {
    if (openPostLastVisible) {
      q = query(
        collection(dbService, "diary"),
        where("open", "==", true),
        orderBy("createdAt", "desc"),
        limit(4),
        startAfter(openPostLastVisible)
      );
    } else {
      q = query(
        collection(dbService, "diary"),
        where("open", "==", true),
        orderBy("createdAt", "desc"),
        limit(8)
      );
    }
  }
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    getData.push({ id: doc.id, ...doc.data() });
    if (querySnapshot.docs.length === 0) {
      openPostLastVisible = -1;
    } else {
      openPostLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    }
  });

  return getData;
};

// 내 다이어리 포스트 가져오기
let myPostLastVisible:
  | QueryDocumentSnapshot<DocumentData>
  | number
  | undefined = undefined;
export const myPostLastVisibleReset = () => {
  // 리셋을 해주지 않으면 새로고침 전까지 lastVisible이 querySnapshot.docs.length로 유지됨
  // 그로 인해, 페이지 이동 후 돌아오면 다음 페이지부터 보여주므로 기존 데이터 날아감.
  myPostLastVisible = undefined;
};
export const getMyDiaryPost = async ({ queryKey }: any) => {
  const [_, uid] = queryKey;
  const getData: { [key: string]: string }[] = [];
  let q;

  if (myPostLastVisible === -1) {
    return;
  } else {
    if (myPostLastVisible) {
      q = query(
        collection(dbService, "diary"),
        where("uid", "==", uid),
        orderBy("createdAt", "desc"),
        limit(4),
        startAfter(myPostLastVisible)
      );
    } else {
      q = query(
        collection(dbService, "diary"),
        where("uid", "==", uid),
        orderBy("createdAt", "desc"),
        limit(8)
      );
    }
  }
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    getData.push({ id: doc.id, ...doc.data() });
    if (querySnapshot.docs.length === 0) {
      myPostLastVisible = -1;
    } else {
      myPostLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    }
  });

  return getData;
};

// 다이어리 포스트 저장
export const createDiaryPost = async (data: any) => {
  addDoc(collection(dbService, "diary"), data);
};
// 다이어리 포스트 수정
export const updateDiaryPost = async (data: any) => {
  return updateDoc(doc(dbService, `diary/${data.id}`), data);
};
// 다이어리 포스트 삭제
export const deleteDiaryPost = async (data: any) => {
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

// 캘린더 일정 저장
export const createSchedule = async (data: any) => {
  addDoc(collection(dbService, `calendar`), data);
};
// 캘린더 일정 가져오기
export const getSchedule = async ({ queryKey }: any) => {
  const [_, uid] = queryKey;
  const response: any = [];
  const q = query(collection(dbService, "calendar"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    response.push({ id: doc.id, ...doc.data() });
  });
  return response;
};
// 캘린더 일정 삭제
export const deleteSchedule = async (id: any) => {
  deleteDoc(doc(dbService, `calendar/${id}`));
};

// 보호동물 리스트 가져오기
export const getAnimals = async ({ queryKey }: any) => {
  const [_, upKind, page] = queryKey;

  return fetch(
    `https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?_type=json&upkind=${upKind}&upr_cd=&numOfRows=10&pageNo=${page}&serviceKey=${process.env.REACT_APP_SHELTER_ANIMAL_KEY}`
  ).then((res) => res.json());
};
