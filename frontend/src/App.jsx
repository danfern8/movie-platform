import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import { Navbar } from "./components/ui/Navbar";

function App() {
  return (
    <>
      <Navbar/>
      <div className="w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
