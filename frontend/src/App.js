import { Routes, Route } from "react-router-dom";

// Pages
import Admin from "./pages/Admin.js";
import Login from "./pages/Login.js";
import Logout from "./pages/Logout.js";
import Signup from "./pages/Signup.js";
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
import ProtectedRoute from "./shared/ProtectedRoute.js";
import LoadingPage from "./pages/LoadingPage";
import About from "./pages/About";
import Home from "./pages/Home";
import CommunityForum from "./pages/Community-Page.js"

function App() {
  return (
    <>
      <Routes>
        {/* Landing Page */}
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/home" element={<Home />} />  */}
        <Route path="/" element={<LoadingPage />}></Route>
        <Route path="/admin" element={<Admin/>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        
        <Route path="/home" element={<Home />} /> 
		<Route path="/about" element={<About />} /> 
        {/* Add pages here */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/user-dashboard/safety-tools" element={<SafetyTools />} />
        <Route path="/user-dashboard/safety-tools/privacy-checker" element={<PrivacyChecker />}/>
        <Route path="/user-dashboard/safety-tools/privacy-checker/check-email" element={<CheckEmail />} />
        <Route path="/user-dashboard/safety-tools/privacy-checker/check-password" element={<CheckPassword />} />
        <Route path="/user-dashboard/safety-tools/privacy-checker/check-domain" element={<CheckDomain />} />
        <Route path="/user-dashboard/safety-tools/sagwa" element={<Sagwa />} />
        <Route path="/user-dashboard/community-page" element={<CommunityForum />} />
        {/* Protected Lesson pages */}
        <Route path="/user-dashboard/safety-tools/lessons-home" element={<ProtectedRoute><LessonsHome /></ProtectedRoute>} />
        <Route path="/user-dashboard/safety-tools/lesson/:topicId" element={<ProtectedRoute><Lesson /></ProtectedRoute>} />
        <Route path="/user-dashboard/safety-tools/lesson/1/interactive" element={<ProtectedRoute><Phishing /></ProtectedRoute>} />
        <Route path="/user-dashboard/safety-tools/lesson/3/interactive" element={<ProtectedRoute><TermsNConditions /></ProtectedRoute>}/>
        <Route path="/dangerous-phishing-url" element={<ProtectedRoute><PhishingUrl/></ProtectedRoute>} />

        <Route path="/user-dashboard/safety-tools/tips/:topicId" element={<Tips />} />
      </Routes>
    </>
  );
}

export default App;
 