import { Routes, Route } from "react-router-dom";

// Pages
import Home from './pages/Home';
import UserDashboard from './pages/UserDashboard'
import SafetyTools from "./pages/SafetyTools";
import PrivacyChecker from "./pages/PrivacyChecker";
import CheckEmail from "./pages/CheckEmail";
import CheckPassword from "./pages/CheckPassword";
import CheckDomain from "./pages/CheckDomain";
import Sagwa from "./pages/Sagwa";
import LessonsHome from "./pages/LessonsHome";
import Lesson from "./pages/Lesson";

function App() {
  return (
    <>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        {/* Add pages here */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/user-dashboard/safety-tools" element={<SafetyTools />} />
        <Route path="/user-dashboard/safety-tools/privacy-checker" element={<PrivacyChecker />} />
        <Route path="/user-dashboard/safety-tools/privacy-checker/check-email" element={<CheckEmail />} />
		<Route path="/user-dashboard/safety-tools/privacy-checker/check-password" element={<CheckPassword />} />
		<Route path="/user-dashboard/safety-tools/privacy-checker/check-domain" element={<CheckDomain />} />
        <Route path="/user-dashboard/safety-tools/sagwa" element={<Sagwa />} />
        <Route path="/user-dashboard/safety-tools/lessons-home" element={<LessonsHome />} />
        {/* TODO: Turn this into a loop to generate Route component with path lesson/id */}
        <Route path="/user-dashboard/safety-tools/lesson/1" element={<Lesson topicId="1" topicName="Phishing Email" />} />
        <Route path="/user-dashboard/safety-tools/lesson/2" element={<Lesson topicId="2" topicName="Password" />} />
      </Routes>
    </>
  );
}

export default App;
