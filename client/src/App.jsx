import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Clip from "./pages/Clip";

function App() {
  return (
    <div>
      {/* Navigation
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/contact">Contact</Link>
      </nav> */}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Clip />} />

        {/* Catch-all for 404
        <Route path="*" element={<h1>Page Not Found</h1>} /> */}
      </Routes>
    </div>
  );
}

export default App;
