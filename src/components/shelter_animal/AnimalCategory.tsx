import { ChangeEvent } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { animalPageValue, animalValue, shelterCity } from "../../util/atom";

function AnimalCategory() {
  const [optionValue, setOptionValue] = useRecoilState(animalValue);
  const [page, setPage] = useRecoilState(animalPageValue);
  const [cityValue, setCityValue] = useRecoilState(shelterCity);

  const onChangeOption = (e: ChangeEvent<HTMLSelectElement>) => {
    setOptionValue(e.target.value);
    setPage("1");
  };
  const onChangeCity = (e: ChangeEvent<HTMLSelectElement>) => {
    setCityValue(e.target.value);
    setPage("1");
  };
  return (
    <Wrap>
      <SelectBox onChange={onChangeOption}>
        <option value="">동물전체</option>
        <option value="417000">강아지</option>
        <option value="422400">고양이</option>
        <option value="429900">기타</option>
      </SelectBox>
      <SelectBox onChange={onChangeCity}>
        <option value="">대한민국전체</option>
        <option value="6110000">서울특별시</option>
        <option value="6260000">부산광역시</option>
        <option value="6270000">대구광역시</option>
        <option value="6280000">인천광역시</option>
        <option value="6290000">광주광역시</option>
        <option value="5690000">세종특별자치시</option>
        <option value="6300000">대전광역시</option>
        <option value="6310000">울산광역시</option>
        <option value="6410000">경기도</option>
        <option value="6420000">강원도</option>
        <option value="6430000">충청북도</option>
        <option value="6440000">충청남도</option>
        <option value="6450000">전라북도</option>
        <option value="6460000">전라남도</option>
        <option value="6470000">경상북도</option>
        <option value="6480000">경상남도</option>
        <option value="6500000">제주특별자치도</option>
      </SelectBox>
    </Wrap>
  );
}

export default AnimalCategory;
const Wrap = styled.div`
  margin: 12px;
`;
const SelectBox = styled.select`
  margin-right: 8px;
`;
