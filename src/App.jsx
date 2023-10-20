import { Routes, Route } from "react-router-dom";
import "./App.css";

import Main from "./components/Main.jsx";
import Login from "./pages/Login/Login.jsx";
import Employees from "./pages/Employees/Employees.jsx"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/"  element={<Main />}/>
      <Route path="/employees" element={<Employees />} />
    </Routes>
  );
}

export default App;
