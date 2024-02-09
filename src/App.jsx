import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductivityApp from "./pages/AppPage/ProductivityApp";
import Authentication from "./pages/AuthPage/Authentication";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Auth" element={<Authentication />} />
        <Route path="/App" element={<ProductivityApp />} />
      </Routes>
    </Router>
  
  );
}

export default App;