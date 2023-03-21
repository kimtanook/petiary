import { Link } from "react-router-dom";

function App() {
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
    </div>
  );
}

export default App;
