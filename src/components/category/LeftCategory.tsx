import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

function LeftCategory() {
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

export default LeftCategory;

const Wrap = styled.div`
  background-color: #f5efdc;
  box-shadow: 8px 0px 8px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 200px;
  padding-right: 4px;
`;
const ItemBox = styled.div`
  padding-left: 8px;
`;
const CategoryItem = styled.button<{ location: any; value: any }>`
  cursor: pointer;
  margin: 4px;
  border: none;
  border-bottom: 1px solid black;
  background-color: inherit;
  width: ${(props) => (props.location === props.value ? 180 : 140)}px;
  height: ${(props) => (props.location === props.value ? 60 : 48)}px;
  line-height: 60px;
`;
