import "../style/UserDashboard.css"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../shared/Button"
import Navbar from "../shared/Navbar";
import { isAuthenticated } from "../shared/ProtectedRoute";
import * as IoIcons from "react-icons/io";

/**
 * A UserDashboard component displaying options that user with or without account
 * can interact with.
 */
function UserDashboard() {
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const toggleParagraph = () => {
        setIsCollapsed(prevState => !prevState);
    }

    useEffect(() => {
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
                <Button theme="primary" onClick={() => navigate("/user-dashboard/community-page")}>Community Forums</Button>
                {/* Hide user-account-only features */}
                <Button style={{display: isAuthenticated() ? 'block' : 'none'}} theme="primary">Edit Profiles</Button>
                <Button style={{display: isAuthenticated() ? 'block' : 'none'}} theme="secondary" onClick={() => navigate("/logout")}>Log Out</Button>
            </div>
            {/* Display promotional popup for users without accounts */}
            <div style={{display: !isAuthenticated() ? 'block' : 'none'}} className={`Tip ${isVisible ? 'fade-in' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
                <IoIcons.IoMdArrowDropdown className="ToggleButton" onClick={toggleParagraph}/>
                <p><b>Tip:</b><br/> Join the amicooked community to access Lessons and more.</p>
            </div>
        </div>
    );
}

export default UserDashboard;