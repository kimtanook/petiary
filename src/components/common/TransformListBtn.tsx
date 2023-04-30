import { useRecoilState } from "recoil";
import styled from "styled-components";
import transformAppImage from "../../img/icon/apps.png";
import transformListImage from "../../img/icon/list.png";
import { transformListValue } from "../../util/atom";

function TransformListBtn() {
  const [transformValue, setTransformValue] =
    useRecoilState(transformListValue);
  return (
    <Wrap onClick={() => setTransformValue(!transformValue)}>
      <TransformButton
        src={transformValue ? transformAppImage : transformListImage}
      />
    </Wrap>
  );
}

export default TransformListBtn;

const Wrap = styled.div`
  margin: 12px;
`;
const TransformButton = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
