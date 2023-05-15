import { useRecoilState } from "recoil";
import styled from "styled-components";
import { animalPageValue } from "../../util/atom";

import { useEffect, useRef } from "react";

function PageCount({ totalPage }: any) {
  const [page, setPage] = useRecoilState(animalPageValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPage = e.target.value;
    if (!inputRef) {
      return;
    }
    setPage(newPage);
    timerIdRef.current && clearTimeout(timerIdRef.current);
    timerIdRef.current = setTimeout(() => {
      setPage(newPage);
      timerIdRef.current = null;
    }, 500);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = page.toString();
    }
  }, [page]);

  return (
    <Wrap>
      <Button onClick={() => setPage(String(Number(page) - 1))}>〈</Button>
      <PageBox>
        <PageInput ref={inputRef} onChange={handleInputChange} />/{" "}
        {Math.ceil(totalPage)}
      </PageBox>
      <Button onClick={() => setPage(String(Number(page) + 1))}>〉</Button>
    </Wrap>
  );
}

export default PageCount;

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
`;
const PageBox = styled.div`
  margin: 0 12px 0 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const PageInput = styled.input`
  width: 32px;
  text-align: center;
  margin-right: 4px;
`;
const Button = styled.div`
  cursor: pointer;
  width: 20px;
  text-align: center;
  font-weight: 700;
`;
