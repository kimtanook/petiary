import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      <Link to={`/main`}>
        <button>Main</button>
      </Link>
      <Link to={`/diary`}>
        <button>Diary</button>
      </Link>
      <Link to={`/todo`}>
        <button>Todo</button>
      </Link>
      <Link to={`/calendar`}>
        <button>Calendar</button>
      </Link>
    </div>
  );
}

export default Landing;
