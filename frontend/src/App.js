import {Routes, Route } from "react-router-dom";

// Pages
import Admin from './Admin.js'
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
import Phishing from "./pages/interactive/Phishing";
import TermsNConditions from "./pages/interactive/TermsNConditions"
import PhishingUrl from "./pages/interactive/PhishingUrl.js";
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
        <Route path="/user-dashboard/safety-tools/privacy-checker/check-email" element={<CheckEmail />} />
        <Route path="/user-dashboard/safety-tools/privacy-checker/check-password" element={<CheckPassword />} />
        <Route path="/user-dashboard/safety-tools/privacy-checker/check-domain" element={<CheckDomain />} />
        <Route path="/user-dashboard/safety-tools/sagwa" element={<Sagwa />} />
        {/* Lesson pages */}
        <Route path="/user-dashboard/safety-tools/lessons-home" element={<LessonsHome />} />
        <Route path="/user-dashboard/safety-tools/lesson/:topicId" element={<Lesson />} />
        <Route path="/user-dashboard/safety-tools/lesson/1/interactive" element={<Phishing />} />
        <Route path="/user-dashboard/safety-tools/lesson/3/interactive" element={<TermsNConditions />} />
        <Route path="/dangerous-phishing-url" element={<PhishingUrl/>} />
        <Route path="/user-dashboard/safety-tools/tips" element={<Tips />} />
      </Routes>
    </>
  );
}

export default App;
 