import { useNavigate } from "react-router-dom";
import Button from "../shared/Button"
<<<<<<< HEAD
import AppHeader from "../shared/AppHeader";
import "../style/SafetyTools.css"
=======
import Navbar from "../shared/Navbar";
import "../style/SafetyTools.css"
import PrivacyTracker from "./PrivacyTracker";
import { isAuthenticated } from "../shared/ProtectedRoute";
>>>>>>> Develop

function SafetyTools() {
    const navigate = useNavigate();
    return (
        <div className="SafetyTools">
<<<<<<< HEAD
            <AppHeader />
            <div className="Body">
                <div className="PrivacyTracker">
                    <h3>YOUR PRIVACY SCORE</h3>
                    <h2>SCORE</h2>
                    <p>Check out the lessons and tips below to enhance your score</p>
                </div>
                <Button theme="primary" onClick={() => navigate('/user-dashboard/safety-tools/lessons-home')}>Lessons</Button>
                <Button theme="primary">Tips</Button>
                <Button theme="primary">Suggestions</Button>
                <Button theme="primary" onClick={() => navigate('/user-dashboard/safety-tools/privacy-checker')}>Check Your Privacy</Button>
                <Button theme="primary" onClick={() => navigate('/user-dashboard')}>Back</Button>
=======
            <Navbar type={"default"} />
            <div className="Body">
                {isAuthenticated() ? (
                    <PrivacyTracker />
                ) : (
                    <>
                        <h2>Safety Tools</h2>
                        <p>Check out the tools below to help enhance your privacy.</p>
                    </>
                )}
                <Button style={{display: isAuthenticated() ? 'block' : 'none'}} theme="primary" onClick={() => navigate('/user-dashboard/safety-tools/lessons-home')}>Lessons</Button>
                <Button theme="primary" onClick={() => navigate('/user-dashboard/safety-tools/tips/1')}>Tips</Button>
                <Button theme="primary" onClick={() => navigate('/user-dashboard/safety-tools/privacy-checker')}>Check Your Privacy</Button>
                <Button theme="back" onClick={() => navigate('/user-dashboard')}>Back</Button>
>>>>>>> Develop
            </div>
        </div>
    )
}

export default SafetyTools;