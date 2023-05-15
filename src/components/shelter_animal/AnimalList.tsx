import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { getAnimals } from "../../util/api";
import { animalPageValue, animalValue, shelterCity } from "../../util/atom";
import AnimalItem from "./AnimalItem";
import PageCount from "./PageCount";

function AnimalList() {
  const optionValue = useRecoilValue(animalValue);
  const cityValue = useRecoilValue(shelterCity);
  const pageValue = useRecoilValue(animalPageValue);
  const [totalPage, setTotalPage] = useState<number>();

  const { data: animalData, isLoading: animalLoading } = useQuery(
    ["animalData", optionValue, cityValue, pageValue],
    getAnimals,
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
    }
  );
  const animalList = animalData?.response.body.items.item;
  const length = 10;

  const list = Array.from({ length }, (_, index) => {
    return (
      <Skeleton key={uuidv4()}>
        <SkeletonImg></SkeletonImg>
        <SkeletonInfo>
          <InfoTitle></InfoTitle>
          <InfoContent></InfoContent>
          <InfoContent></InfoContent>
        </SkeletonInfo>
      </Skeleton>
    );
  });

  useEffect(() => {
    if (animalData) {
      const totalCount = animalData.response.body.totalCount;
      setTotalPage(Math.ceil(totalCount / 10));
    }
  }, [animalData]);

  return (
    <div>
      {animalLoading ? (
        <Wrap>{list}</Wrap>
      ) : (
        <Wrap>
          {!animalList ? (
            <div>보호동물이 없습니다.</div>
          ) : (
            animalList?.map((item: any) => (
              <AnimalItem key={uuidv4()} item={item} />
            ))
          )}
        </Wrap>
      )}
      <PageCount totalPage={totalPage} />
    </div>
  );
}

export default AnimalList;
const Wrap = styled.div`
  display: grid;
  @media screen and (min-width: 200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
const Skeleton = styled.div`
  width: 220px;
  height: 230px;
  background-color: #e2e2e2b0;
  margin: 12px;
  display: flex;
  flex-direction: column;
  padding-top: 8px;
  @media screen and (max-width: 500px) {
    width: 160px;
    height: 190px;
    margin: 4px;
  }
`;
const SkeletonImg = styled.div`
  width: 200px;
  height: 120px;
  margin: auto;
  background-color: #dadada;
  @media screen and (max-width: 500px) {
    width: 140px;
    height: 100px;
  }
`;
const SkeletonInfo = styled.div`
  width: 184px;
  height: 100px;
  display: flex;
  flex-direction: column;
  padding: 8px;
  @media screen and (max-width: 500px) {
    width: 140px;
  }
`;
const InfoTitle = styled.div`
  width: 120px;
  height: 32px;
  background-color: #c1c1c1;
  border-radius: 20px;
  margin: 4px;
`;
const InfoContent = styled.div`
  width: 160px;
  height: 16px;
  background-color: #c1c1c1;
  border-radius: 20px;
  margin: 4px;
  @media screen and (max-width: 500px) {
    width: 140px;
  }
`;
