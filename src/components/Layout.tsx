import { useRecoilValue } from "recoil";
import { alertValue, editProfileValue } from "../util/atom";
import AlertModal from "./common/AlertModal";
import EditProfileModal from "./mypage/EditProfileModal";

function Layout() {
  const alertModal = useRecoilValue(alertValue);
  const editProfileModal = useRecoilValue(editProfileValue);
  return (
    <div>
      {alertModal.toggle ? <AlertModal alertModal={alertModal} /> : null}
      {editProfileModal ? <EditProfileModal /> : null}
    </div>
  );
}

export default Layout;
