import "../style/UserDashboard.css"

import { useNavigate } from "react-router-dom";
import Button from "../shared/Button"
import Navbar from "../shared/Navbar";

function UserDashboard() {
    const navigate = useNavigate();
    return (
        <div className="UserDashboard">
            <Navbar type={"default"} />
            <div className="Body">
                <Button theme="primary" onClick={() => navigate("/user-dashboard/safety-tools/privacy-checker/check-domain")}>Scan Domain for Leaks</Button>
                <Button theme="primary" onClick={() => navigate("/user-dashboard/safety-tools")}>Safety Tools</Button>
                <Button theme="primary">Community Forums</Button>
                <Button theme="primary">Edit Profiles</Button>
                <Button theme="primary">Log Out</Button>
            </div>
        </div>
    );
}

export default UserDashboard;