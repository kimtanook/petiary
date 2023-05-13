import { Route, Routes, useLocation } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout";
import NavBar from "../components/Nav/NavBar";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import SubCategory from "../components/sub_category/SubCategory";
import { authService } from "../util/firebase";
import Landing from "./Landing";
import Todo from "./Todo";
import Calendar from "./calendar/Calendar";
import DetailPost from "./diary/DetailPost";
import Diary from "./diary/Diary";
import PostForm from "./diary/PostForm";
import Main from "./main/Main";
import MyPage from "./mypage/MyPage";
import DetailAnimal from "./shelter_animal/DetailAnimal";
import Shelter from "./shelter_animal/Shelter";

const AppRouter = () => {
  const user = authService.currentUser;
  const location = useLocation();
  const categoryTrue = location.pathname;

  return (
    <>
      {user ? (
        <>
          <Header />
          <NavBar />
        </>
      ) : null}
      {categoryTrue === "/diary" || categoryTrue === "/diary/write" ? (
        <SubCategory />
      ) : null}
      <Container categoryTrue={categoryTrue}>
        <ContentWrap>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/main" element={<Main />} />
            <Route path="/diary" element={<Diary />} />
            <Route path="/diary/:postId" element={<DetailPost />} />
            <Route path="/diary/write" element={<PostForm />} />
            <Route path="/diary/write/:postId" element={<PostForm />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/main/:postId" element={<DetailPost />} />
            <Route path="/my-page" element={<MyPage />} />
            <Route path="/shelter" element={<Shelter />} />
            <Route path="/shelter/:id" element={<DetailAnimal />} />
          </Routes>
        </ContentWrap>
      </Container>
      {user ? <Footer /> : null}
      <Layout />
    </>
  );
};

export default AppRouter;

const Container = styled.div<{ categoryTrue: string }>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1060px;
  margin: auto;
  @media screen and (max-width: 450px) {
    flex-direction: column;
    align-items: center;
  }
`;
const ContentWrap = styled.div`
  padding: 32px 32px 32px 32px;
  max-width: 1060px;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 450px) {
    padding: inherit;
  }
`;
