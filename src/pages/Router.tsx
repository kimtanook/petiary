import { BrowserRouter, Route, Routes } from "react-router-dom";
import Calendar from "./Calendar";
import DetailPost from "./diary/DetailPost";
import Diary from "./diary/Diary";
import PostForm from "./diary/PostForm";
import Landing from "./Landing";
import Main from "./Main";
import Todo from "./Todo";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/main" element={<Main />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/post-form" element={<PostForm />} />
        <Route path="/detail-diary/:postId" element={<DetailPost />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
