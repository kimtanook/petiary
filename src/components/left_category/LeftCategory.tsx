import { Link, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import WriteImg from "../../img/icon/book.png";
import { leftCategoryValue } from "../../util/atom";

function LeftCategory() {
  const location = useLocation();
  const url = location.pathname;
  const index = url.indexOf("/", 1); // 첫 번째 '/' 이후의 위치를 찾음
  const urlResult = index === -1 ? url : url.substring(0, index);
  const [selectCategory, setSelectCategory] = useRecoilState(leftCategoryValue);
  return (
    <Wrap>
      {urlResult === "/diary" ? (
        <CategoryBox>
          <Link
            to={"/diary/write"}
            style={{ textDecoration: "none", color: "black" }}
          >
            <ItemBox
              select={selectCategory}
              name="write"
              onClick={() => setSelectCategory("write")}
            >
              <WriteImgBox src={WriteImg} />
              일기 쓰기
            </ItemBox>
          </Link>
          <ItemBox select={selectCategory} name="1">
            준비중
          </ItemBox>
          <ItemBox select={selectCategory} name="2">
            준비중
          </ItemBox>
          <ItemBox select={selectCategory} name="3">
            준비중
          </ItemBox>
        </CategoryBox>
      ) : (
        <CategoryBox>
          <ItemBox select={selectCategory} name="1">
            준비중
          </ItemBox>
          <ItemBox select={selectCategory} name="2">
            준비중
          </ItemBox>
          <ItemBox select={selectCategory} name="3">
            준비중
          </ItemBox>
          <ItemBox select={selectCategory} name="4">
            준비중
          </ItemBox>
        </CategoryBox>
      )}
    </Wrap>
  );
}

export default LeftCategory;

const Wrap = styled.div`
  margin: auto;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  max-width: 500px;
  display: flex;
  margin-top: 8px;
`;
const CategoryBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const ItemBox = styled.div<{ select: string; name: string }>`
  cursor: pointer;
  color: "black";
  border-bottom: 3px solid
    ${(props) => (props.select === props.name ? "#b71d51" : "white")};
  margin: 8px;
  font-weight: 600;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 36px;
  :hover {
    background-color: #ffe3f3;
  }
`;
const WriteImgBox = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;
