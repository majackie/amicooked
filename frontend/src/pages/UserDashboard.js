import "../style/UserDashboard.css"

import { useNavigate } from "react-router-dom";
import Button from "../shared/Button"
import Navbar from "../shared/Navbar";

function UserDashboard() {
    const navigate = useNavigate();
    return (
        <div className="UserDashboard">
            <Navbar type={"default"} />
            <div className="Header">
                <h2>Let us cook</h2>
                <p>Check out the following features to help with your journey to privacy.</p>
            </div>
            <div className="Body">
                <Button theme="primary">Scan for Leaks</Button>
                <Button theme="primary" onClick={() => navigate("/user-dashboard/safety-tools")}>Safety Tools</Button>
                <Button theme="primary">Community Forums</Button>
                <Button theme="primary">Edit Profiles</Button>
                <Button theme="secondary">Log Out</Button>
            </div>
        </div>
    );
}

export default UserDashboard;