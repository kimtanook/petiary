import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SocialLogin from "../components/auth/SocialLogin";
import { authService } from "../util/firebase";

function Landing() {
  const navigate = useNavigate();
  useEffect(() => {
    if (authService.currentUser) {
      navigate("/main");
    }
  }, []);
  return (
    <div>
      <SocialLogin />
    </div>
  );
}

export default Landing;
