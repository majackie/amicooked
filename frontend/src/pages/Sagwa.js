import "../style/Sagwa.css"

import sagwa from '../asset/sagwa.png';
import { useNavigate } from "react-router-dom";
import Button from "../shared/Button"
import Navbar from "../shared/Navbar";

function Sagwa() {
    const navigate = useNavigate();
    return (
        <div className="Sagwa">
            <Navbar type={"default"} />
            <div className="Sagwa-body">
                <img src={sagwa} className="Sagwa-img" alt="Sagwa the cat" />
                <div className="Subtext">
                    <h3>No website will ever genuinely check these for you!</h3>
                    <p>Never give your sensitive information to anyone, unless they are confirmed to be legitimate.</p>
                </div>
                <Button theme="primary" onClick={() => navigate('/user-dashboard/safety-tools/privacy-checker')}>Back</Button>
            </div>
        </div>
    );
}

export default Sagwa;