import { useNavigate } from "react-router-dom";
import Button from "../shared/Button"
import AppHeader from "../shared/AppHeader";
import "../style/SafetyTools.css"

function SafetyTools() {
    const navigate = useNavigate();
    return (
        <div className="SafetyTools">
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
            </div>
        </div>
    )
}

export default SafetyTools;