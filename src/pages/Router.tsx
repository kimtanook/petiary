import { BrowserRouter, Route, Routes } from "react-router-dom";
import Calendar from "./Calendar";
import Diary from "./Diary";
import Main from "./Main";
import Todo from "./Todo";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/Calendar" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
