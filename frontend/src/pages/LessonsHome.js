import { useNavigate } from "react-router-dom";
import Button from "../shared/Button"
import Navbar from "../shared/Navbar";
import PrivacyTracker from "./PrivacyTracker";

/**
 * A LessonHome component displaying available lessons.
 * This is visible only to users with accounts.
 */
function LessonsHome() {
    const navigate = useNavigate();
    return (
        <div className="LessonsHome">
            <Navbar type={"default"} />
            <div className="Body">
                <PrivacyTracker />
                <Button theme="primary" onClick={() => navigate('/user-dashboard/safety-tools/lesson/1')}>Phishing Emails</Button>
                <Button theme="primary" onClick={() => navigate('/user-dashboard/safety-tools/lesson/2')}>Password Management</Button>
                <Button theme="primary" onClick={() => navigate('/user-dashboard/safety-tools/lesson/3')}>Terms And Conditions</Button>
                <Button theme="back" onClick={() => navigate('/user-dashboard/safety-tools')}>Back</Button>
            </div>
        </div>
    )
}

export default LessonsHome;