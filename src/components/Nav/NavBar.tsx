import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

function NavBar() {
  const location = useLocation();
  const url = location.pathname;
  const index = url.indexOf("/", 1); // 첫 번째 '/' 이후의 위치를 찾음
  const result = index === -1 ? url : url.substring(0, index);

  const categories = [
    { pathname: "/main", value: "main", name: "메인" },
    { pathname: "/diary", value: "diary", name: "일기" },
    { pathname: "/calendar", value: "calendar", name: "캘린더" },
    { pathname: "/todo", value: "todo", name: "할 일" },
  ];
  return (
    <Wrap>
      <ItemBox>
        {categories.map((item) => (
          <Link to={item.pathname} key={uuidv4()}>
            <CategoryItem location={result} value={`/${item.value}`}>
              {item.name}
            </CategoryItem>
          </Link>
        ))}
      </ItemBox>
      <ItemBox>
        <CategoryItem location={result} value="/shelter">
          <Link
            to="/shelter"
            key={uuidv4()}
            style={{ textDecorationLine: "none", color: "inherit" }}
          >
            보호 동물
          </Link>
        </CategoryItem>
      </ItemBox>
    </Wrap>
  );
}

export default NavBar;

const Wrap = styled.div`
  max-width: 1060px;
  margin: auto;
  border-bottom: 1px solid #c7c7c7;
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.padding};
`;
const ItemBox = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const CategoryItem = styled.button<{ location: any; value: any }>`
  cursor: pointer;
  margin: 8px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  background-color: ${(props) =>
    props.location === props.value ? "#b71d51" : "inherit"};
  color: ${(props) => (props.location === props.value ? "white" : "black")};
  width: 100px;
  height: 32px;
  @media screen and (max-width: 500px) {
    width: 80px;
    font-size: 12px;
  }
  :hover {
    background-color: #ffe3f3;
  }
`;
