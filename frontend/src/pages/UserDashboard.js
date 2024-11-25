import "../style/UserDashboard.css"

<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import Button from "../shared/Button"
import AppHeader from "../shared/AppHeader";

function UserDashboard() {
    const navigate = useNavigate();
    return (
        <div className="UserDashboard">
            <AppHeader />
            <div className="Body">
                <Button theme="primary">Scan for Leaks</Button>
                <Button theme="primary" onClick={() => navigate("/user-dashboard/safety-tools")}>Safety Tools</Button>
                <Button theme="primary">Community Forums</Button>
                <Button theme="primary">Edit Profiles</Button>
                <Button theme="primary">Log Out</Button>
=======
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../shared/Button"
import Navbar from "../shared/Navbar";
import { isAuthenticated } from "../shared/ProtectedRoute";
import * as IoIcons from "react-icons/io";

function UserDashboard() {
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const toggleParagraph = () => {
        setIsCollapsed(prevState => !prevState);
    }

    useEffect(() => {
        console.log("isVisible")
        setIsVisible(true);
    }, []);

    return (
        <div className="UserDashboard">
            <Navbar type={"default"} />
            <div className="Header">
                <h2>Let us cook</h2>
                <p>Check out the following features to help with your journey to privacy.</p>
            </div>
            <div className="Body">
                <Button theme="primary" onClick={() => navigate("/user-dashboard/safety-tools/privacy-checker/check-domain")}>Check Domain Leaks</Button>
                <Button theme="primary" onClick={() => navigate("/user-dashboard/safety-tools")}>Safety Tools</Button>
                <Button theme="primary">Community Forums</Button>
                <Button style={{display: isAuthenticated() ? 'block' : 'none'}} theme="primary">Edit Profiles</Button>
                <Button style={{display: isAuthenticated() ? 'block' : 'none'}} theme="secondary" onClick={() => navigate("/logout")}>Log Out</Button>
            </div>
            <div style={{display: !isAuthenticated() ? 'block' : 'none'}} className={`Tip ${isVisible ? 'fade-in' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
                <IoIcons.IoMdArrowDropdown className="ToggleButton" onClick={toggleParagraph}/>
                <p><b>Tip:</b><br/> Join the amicooked crew to access Lessons and more.</p>
>>>>>>> Develop
            </div>
        </div>
    );
}

export default UserDashboard;