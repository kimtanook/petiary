import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import DiaryOpenPostList from "../../components/main/DiaryOpenPostList";
import Slide from "../../components/main/Slide";
import { leftCategoryValue } from "../../util/atom";

function Main() {
  const [selectCategory, setSelectCategory] = useRecoilState(leftCategoryValue);
  useEffect(() => {
    setSelectCategory("");
  }, []);
  return (
    <Wrap>
      <Slide />
      <DiaryOpenPostList />
    </Wrap>
  );
}

export default Main;
const Wrap = styled.div``;
