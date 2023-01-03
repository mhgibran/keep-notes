import "./App.css";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Show from "./pages/Show";
import data from "./json/data.json";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/show/:id" element={<Show />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
