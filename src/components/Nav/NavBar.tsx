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
    { pathname: "/diary", value: "diary", name: "다이어리" },
    { pathname: "/todo", value: "todo", name: "할 일" },
    { pathname: "/calendar", value: "calendar", name: "캘린더" },
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
    </Wrap>
  );
}

export default NavBar;

const Wrap = styled.div`
  background-color: #f5efdc;
  height: 60px;
  display: flex;
  padding: ${({ theme }) => theme.padding};
`;
const ItemBox = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;
const CategoryItem = styled.button<{ location: any; value: any }>`
  cursor: pointer;
  margin: 8px;
  border: none;
  font-size: 16px;
  color: ${(props) => (props.location === props.value ? "white" : "black")};
  background-color: ${(props) =>
    props.location === props.value ? "#feb638" : "inherit"};
  border-radius: 8px;
  width: 100px;
  height: 32px;
  :hover {
    background-color: #fccd7d;
    color: white;
  }
`;