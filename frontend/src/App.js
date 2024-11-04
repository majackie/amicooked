import {Routes, Route } from "react-router-dom";

// Pages
import Admin from './Admin.js'
import Home from './pages/Home';
import UserDashboard from './pages/UserDashboard'
import SafetyTools from "./pages/SafetyTools";
import PrivacyChecker from "./pages/PrivacyChecker";
import Sagwa from "./pages/Sagwa";
import LessonsHome from "./pages/LessonsHome";
import Lesson from "./pages/Lesson";
import Phishing from "./pages/interactive/Phishing";
import PhishingUrl from "./pages/interactive/PhishingUrl";
import Tips from "./pages/Tips";

function App() {
  return (
    <>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} /> 
        <Route path="/home" element={<Home />} /> 
        {/* Add pages here */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/user-dashboard/safety-tools" element={<SafetyTools />} />
        <Route path="/user-dashboard/safety-tools/privacy-checker" element={<PrivacyChecker />}/>
        <Route path="/user-dashboard/safety-tools/sagwa" element={<Sagwa />} />
        <Route path="/user-dashboard/safety-tools/lessons-home" element={<LessonsHome />} />
        {/* Lesson pages */}
        <Route path="/user-dashboard/safety-tools/lesson/:topicId" element={<Lesson />} />
        <Route path="/user-dashboard/safety-tools/lesson/:topicIdid/interactive" element={<Phishing />} />
        <Route path="/user-dashboard/safety-tools/lesson/:topicId" element={<Lesson />} />
        <Route path="/dangerous-phishing-url" element={<PhishingUrl/>} />
        {/* Tips */}
        <Route path="/user-dashboard/safety-tools/tips" element={<Tips />} />
      </Routes>
    </>
  );
}

export default App;
 