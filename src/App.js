import {Routes, Route } from "react-router-dom";

// Pages
import Home from './pages/Home';
import UserDashboard from './pages/UserDashboard'

function App() {
  return (
    <>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Home />} /> 
        <Route path="/home" element={<Home />} /> 
        {/* Add pages here */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
    </>
  );
}

export default App;
 