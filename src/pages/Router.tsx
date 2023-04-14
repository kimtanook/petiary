import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout";
import NavBar from "../components/Nav/NavBar";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { authService } from "../util/firebase";
import Calendar from "./Calendar";
import Landing from "./Landing";
import Todo from "./Todo";
import DetailPost from "./diary/DetailPost";
import Diary from "./diary/Diary";
import PostForm from "./diary/PostForm";
import Main from "./main/Main";
import MyPage from "./mypage/MyPage";

const AppRouter = () => {
  const user = authService.currentUser;
  return (
    <>
      {user ? (
        <>
          <Header />
          <NavBar />
        </>
      ) : null}
      <Wrap>
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
          </Routes>
        </ContentWrap>
      </Wrap>
      {user ? <Footer /> : null}
      <Layout />
    </>
  );
};

export default AppRouter;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
`;
const ContentWrap = styled.div`
  padding: 32px 32px 32px 32px;
  background-color: wheat;
  width: 80vw;
  min-height: 100vh;
`;
