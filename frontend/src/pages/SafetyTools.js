import { useNavigate } from "react-router-dom";
import Button from "../shared/Button"
import Navbar from "../shared/Navbar";
import "../style/SafetyTools.css"
import PrivacyTracker from "./PrivacyTracker";

function SafetyTools() {
    const navigate = useNavigate();
    return (
        <div className="SafetyTools">
            <Navbar type={"default"} />
            <div className="Body">
                <PrivacyTracker />
                <Button theme="primary" onClick={() => navigate('/user-dashboard/safety-tools/lessons-home')}>Lessons</Button>
                <Button theme="primary" onClick={() => navigate('/user-dashboard/safety-tools/tips/1')}>Tips</Button>
                <Button theme="primary" onClick={() => navigate('/user-dashboard/safety-tools/privacy-checker')}>Check Your Privacy</Button>
                <Button theme="back" onClick={() => navigate('/user-dashboard')}>Back</Button>
            </div>
        </div>
    )
}

export default SafetyTools;