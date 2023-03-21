import { useLocation } from "react-router-dom";
import PostItem from "../../components/diary/PostItem";

function DetailPost() {
  const location = useLocation();
  const { postData } = location.state;
  return <PostItem postData={postData} />;
}

export default DetailPost;
