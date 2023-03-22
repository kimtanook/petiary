import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import LeftCategory from "../components/category/LeftCategory";
import Header from "../components/header/Header";
import { authService } from "../util/firebase";
import Calendar from "./Calendar";
import DetailPost from "./diary/DetailPost";
import Diary from "./diary/Diary";
import PostForm from "./diary/PostForm";
import Landing from "./Landing";
import Main from "./Main";
import Todo from "./Todo";

const AppRouter = () => {
  const user = authService.currentUser;
  return (
    <>
      {user ? <Header /> : null}
      <Wrap>
        {user ? <LeftCategory /> : null}
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/main" element={<Main />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/post-form" element={<PostForm />} />
          <Route path="/detail-diary/:postId" element={<DetailPost />} />
        </Routes>
      </Wrap>
    </>
  );
};

export default AppRouter;
const Wrap = styled.div`
  display: flex;
  flex-direction: row;
`;
