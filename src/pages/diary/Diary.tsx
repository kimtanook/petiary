import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import PostList from "../../components/diary/PostList";
import { leftCategoryValue } from "../../util/atom";
function Diary() {
  const [selectCategory, setSelectCategory] = useRecoilState(leftCategoryValue);
  useEffect(() => {
    setSelectCategory("");
  }, []);
  return (
    <Wrap>
      <PostList />
    </Wrap>
  );
}

export default Diary;
const Wrap = styled.div``;
