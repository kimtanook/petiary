import { atom } from "recoil";
import { v4 as uuidv4 } from "uuid";

export const mdPostState = atom({
  key: `mdPostdata${uuidv4()}`,
  default: "",
});
export const alertValue = atom({
  key: `customAlert${uuidv4()}`,
  default: { toggle: false, message: "" },
});
export const editProfileValue = atom({
  key: `editProfileValue${uuidv4()}`,
  default: false,
});
export const leftCategoryValue = atom({
  key: `leftCategoryValue${uuidv4()}`,
  default: "",
});
export const animalValue = atom({
  key: `animalValue${uuidv4()}`,
  default: "",
});
export const animalPageValue = atom({
  key: `animalPageValue${uuidv4()}`,
  default: "1",
});
export const shelterCity = atom({
  key: `shelterCity${uuidv4()}`,
  default: "",
});
