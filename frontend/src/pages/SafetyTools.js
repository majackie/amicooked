import { useNavigate } from "react-router-dom";
import Button from "../shared/Button"
import Navbar from "../shared/Navbar";
import "../style/SafetyTools.css"
import PrivacyTracker from "./PrivacyTracker";
import { isAuthenticated } from "../shared/ProtectedRoute";

/**
 * A SafeTools component displaying safety tool options.
 */
function SafetyTools() {
    const navigate = useNavigate();
    return (
        <div className="SafetyTools">
            <Navbar type={"default"} />
            <div className="Body">
                {/* Only display PrivacyTracker is user has an account, i.e. authentication token */}
                {isAuthenticated() ? (
                    <PrivacyTracker />
                ) : (
                    <>
                        <h3>Check out the tools below to help enhance your privacy.</h3>
                    </>
                )}
                <Button style={{display: isAuthenticated() ? 'block' : 'none'}} theme="primary" onClick={() => navigate('/user-dashboard/safety-tools/lessons-home')}>Lessons</Button>
                <Button theme="primary" onClick={() => navigate('/user-dashboard/safety-tools/tips/1')}>Tips</Button>
                <Button theme="primary" onClick={() => navigate('/user-dashboard/safety-tools/privacy-checker')}>Check Your Privacy</Button>
                <Button theme="back" onClick={() => navigate('/user-dashboard')}>Back</Button>
            </div>
        </div>
    )
}

export default SafetyTools;