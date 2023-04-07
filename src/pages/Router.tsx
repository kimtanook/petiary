import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout";
import LeftCategory from "../components/category/LeftCategory";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { authService } from "../util/firebase";
import Calendar from "./Calendar";
import Landing from "./Landing";
import Main from "./Main";
import Todo from "./Todo";
import DetailPost from "./diary/DetailPost";
import Diary from "./diary/Diary";
import PostForm from "./diary/PostForm";

const AppRouter = () => {
  const user = authService.currentUser;
  return (
    <>
      {user ? <Header /> : null}
      <Wrap>
        {user ? <LeftCategory /> : null}
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
  width: 100vw;
  height: 100vh;
  background-color: beige;
`;
const ContentWrap = styled.div`
  padding: 12px;
`;
