import { atom } from "recoil";
import { v4 as uuidv4 } from "uuid";

export const mdPostState = atom({
  key: `mdPostdata${uuidv4()}`,
  default: "",
});
export const Alert = atom({
  key: `customAlert${uuidv4()}`,
  default: { toggle: false, message: "" },
});
