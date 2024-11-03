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
import Password from "./pages/interactive/Password";
import TermsNConditions from "./pages/interactive/TermsNConditions"

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
        {/* TODO: Turn this into a loop to generate Route component with path lesson/id */}
        <Route path="/user-dashboard/safety-tools/lesson/:topicId" element={<Lesson />} />
        <Route path="/user-dashboard/safety-tools/lesson/:topicId/interactive" element={<Phishing />} />
        <Route path="/user-dashboard/safety-tools/lesson/:topicId" element={<Lesson />} />
        {/* TODO: Remove once added contents to DB */}
        <Route path="/user-dashboard/safety-tools/lesson/2" element={<Password topicId={2} topicName={"Password Management"}/>} />
        <Route path="/user-dashboard/safety-tools/lesson/2/interactive" element={<TermsNConditions topicId={2} />} />
      </Routes>
    </>
  );
}

export default App;
 