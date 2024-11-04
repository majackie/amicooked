import { useNavigate } from "react-router-dom";
import Button from "../shared/Button"
import Navbar from "../shared/Navbar";
// import "../style/LessonsHome.css"

function LessonsHome() {
    const navigate = useNavigate();
    return (
        <div className="LessonsHome">
            <Navbar type={"default"} />
            <div className="Body">
                <div className="PrivacyTracker">
                    <h3>YOUR PRIVACY SCORE</h3>
                    <h2>SCORE</h2>
                    <p>Check out the lessons below to enhance your score</p>
                </div>
                <Button theme="primary" onClick={() => navigate('/user-dashboard/safety-tools/lesson/1')}>Phishing Emails</Button>
                <Button theme="primary" onClick={() => navigate('/user-dashboard/safety-tools/lesson/2')}>Password</Button>
                <Button theme="primary" onClick={() => navigate('/user-dashboard/safety-tools')}>Back</Button>
            </div>
        </div>
    )
}

export default LessonsHome;