import "./App.css";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Show from "./pages/Show";
import Trashed from "./pages/Trashed";
import Archived from "./pages/Archived";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/show/:id" element={<Show />} />
          <Route path="/trashed" element={<Trashed />} />
          <Route path="/archived" element={<Archived />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
