import { useLocation } from "react-router-dom";
import DetailPostItem from "../../components/diary/DetailPostItem";

function DetailPost() {
  const location = useLocation();
  const { postData } = location.state;
  return <DetailPostItem postData={postData} />;
}

export default DetailPost;
