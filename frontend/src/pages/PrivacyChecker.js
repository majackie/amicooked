import "../style/PrivacyChecker.css"

import { useNavigate } from "react-router-dom";
import Button from "../shared/Button"
import Navbar from "../shared/Navbar";

/**
 * A PrivacyChecker component displaying options for privacy checking.
 */
function PrivacyChecker() {
    const navigate = useNavigate();
    return (
        <div className="PrivacyChecker">
            <Navbar type={"default"} />
            <div className="Body">
                <div className="Subtext">
                    <p>Click below to see if your info is compromised in the dark web!</p>
                </div>
                <Button theme="primary" onClick={() => navigate('/user-dashboard/safety-tools/privacy-checker/check-email')}>Email</Button>
                <Button theme="primary" onClick={() => navigate('/user-dashboard/safety-tools/privacy-checker/check-password')}>Password</Button>
                <Button theme="primary" onClick={() => navigate('/user-dashboard/safety-tools/sagwa')}>SIN</Button>
                <Button theme="primary" onClick={() => navigate('/user-dashboard/safety-tools/sagwa')}>Driver's License</Button>
                <Button theme="primary" onClick={() => navigate('/user-dashboard/safety-tools/sagwa')}>Credit Card</Button>
                <Button theme="back" onClick={() => navigate('/user-dashboard/safety-tools')}>Back</Button>
            </div>
        </div>
    );
}

export default PrivacyChecker;