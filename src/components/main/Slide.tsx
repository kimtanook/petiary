import styled from "styled-components";
import mainImage from "../../img/main/main-image.png";

function Slide() {
  return <Wrap />;
}

export default Slide;
const Wrap = styled.div`
  background-image: url(${mainImage});
  background-position: center;
  background-size: cover;
  border-radius: 12px 12px 0 0;
  min-width: 360px;
  height: 200px;
  margin: 8px 0 12px 0;
`;
