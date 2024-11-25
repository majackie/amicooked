import { useNavigate } from "react-router-dom";
import Button from "../shared/Button"
<<<<<<< HEAD
import AppHeader from "../shared/AppHeader";
// import "../style/LessonsHome.css"
=======
import Navbar from "../shared/Navbar";
import PrivacyTracker from "./PrivacyTracker";
>>>>>>> Develop

function LessonsHome() {
    const navigate = useNavigate();
    return (
        <div className="LessonsHome">
<<<<<<< HEAD
            <AppHeader />
            <div className="Body">
                <div className="PrivacyTracker">
                    <h3>YOUR PRIVACY SCORE</h3>
                    <h2>SCORE</h2>
                    <p>Check out the lessons below to enhance your score</p>
                </div>
                <Button theme="primary" onClick={() => navigate('/user-dashboard/safety-tools/lesson/1')}>Phishing Emails</Button>
                <Button theme="primary" onClick={() => navigate('/user-dashboard/safety-tools/lesson/2')}>Password</Button>
                <Button theme="primary" onClick={() => navigate('/user-dashboard/safety-tools')}>Back</Button>
=======
            <Navbar type={"default"} />
            <div className="Body">
                <PrivacyTracker />
                <Button theme="primary" onClick={() => navigate('/user-dashboard/safety-tools/lesson/1')}>Phishing Emails</Button>
                <Button theme="primary" onClick={() => navigate('/user-dashboard/safety-tools/lesson/2')}>Password Management</Button>
                <Button theme="primary" onClick={() => navigate('/user-dashboard/safety-tools/lesson/3')}>Terms And Conditions</Button>
                <Button theme="back" onClick={() => navigate('/user-dashboard/safety-tools')}>Back</Button>
>>>>>>> Develop
            </div>
        </div>
    )
}

export default LessonsHome;