import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import TransformListBtn from "../../components/common/TransformListBtn";
import PostList from "../../components/diary/PostList";
import { leftCategoryValue } from "../../util/atom";
function Diary() {
  const [selectCategory, setSelectCategory] = useRecoilState(leftCategoryValue);
  useEffect(() => {
    setSelectCategory("");
  }, []);
  return (
    <Wrap>
      <TransformListBtn />
      <PostList />
    </Wrap>
  );
}

export default Diary;
const Wrap = styled.div``;
