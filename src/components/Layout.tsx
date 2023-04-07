import { useRecoilValue } from "recoil";
import { Alert } from "../util/atom";
import AlertModal from "./common/AlertModal";

function Layout() {
  const alertModal = useRecoilValue(Alert);
  return (
    <div>
      {alertModal.toggle ? <AlertModal alertModal={alertModal} /> : null}
    </div>
  );
}

export default Layout;
