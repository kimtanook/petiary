import { Link, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import WriteImg from "../../img/icon/write.png";
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
              <Write src={WriteImg} />
              일기 쓰기
            </ItemBox>
          </Link>
          <div>
            <ItemBox select={selectCategory} name="1">
              준비중
            </ItemBox>
          </div>
          <div>
            <ItemBox select={selectCategory} name="2">
              준비중
            </ItemBox>
          </div>
          <div>
            <ItemBox select={selectCategory} name="3">
              준비중
            </ItemBox>
          </div>
        </CategoryBox>
      ) : (
        <CategoryBox>
          <div>
            <ItemBox select={selectCategory} name="1">
              준비중
            </ItemBox>
          </div>

          <div>
            <ItemBox select={selectCategory} name="2">
              준비중
            </ItemBox>
          </div>
          <div>
            <ItemBox select={selectCategory} name="3">
              준비중
            </ItemBox>
          </div>
          <div>
            <ItemBox select={selectCategory} name="4">
              준비중
            </ItemBox>
          </div>
        </CategoryBox>
      )}
    </Wrap>
  );
}

export default LeftCategory;
const Wrap = styled.div`
  position: sticky;
  top: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  border-right: 1px solid #c7c7c7;
  margin-top: 16px;
  height: 98vh;
  @media screen and (max-width: 450px) {
    justify-content: center;
    position: relative;
    width: inherit;
    height: 60px;
  }
`;
const CategoryBox = styled.div`
  margin-top: 12px;
  @media screen and (max-width: 450px) {
    overflow: scroll;
    width: 100vw;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
const ItemBox = styled.div<{ select: string; name: string }>`
  cursor: pointer;
  background-color: ${(props) =>
    props.select === props.name ? "#ffb5ce" : "white"};
  color: "black";
  margin: 8px;
  padding-left: 12px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 130px;
  height: 36px;
  text-align: center;
  :hover {
    background-color: #ffe3f3;
  }
`;
const Write = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;
