import { ChangeEvent } from "react";
import { useRecoilState } from "recoil";
import { animalPageValue, animalValue } from "../../util/atom";

function AnimalCategory() {
  const [optionValue, setOptionValue] = useRecoilState(animalValue);
  const [page, setPage] = useRecoilState(animalPageValue);
  const onChangeOption = (e: ChangeEvent<HTMLSelectElement>) => {
    setOptionValue(e.target.value);
    setPage("1");
  };
  return (
    <div>
      <select onChange={onChangeOption}>
        <option value="">전체</option>
        <option value="417000">강아지</option>
        <option value="422400">고양이</option>
        <option value="429900">기타</option>
      </select>
    </div>
  );
}

export default AnimalCategory;
