import {Routes, Route } from "react-router-dom";

// Pages
import Home from './pages/Home';
import UserDashboard from './pages/UserDashboard'
import SafetyLessons from "./pages/SafetyLessons";

function App() {
  return (
    <>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Home />} /> 
        <Route path="/home" element={<Home />} /> 
        {/* Add pages here */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/user-dashboard/safety-lessons" element={<SafetyLessons />} />
      </Routes>
    </>
  );
}

export default App;
 