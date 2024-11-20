import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import "../style/PrivacyTracker.css";
import logo from '../asset/logo.png';

function PrivacyTracker() {
    return(
        <div className="PrivacyTracker">
            <h3>YOUR PRIVACY SCORE</h3>
            <h2>SCORE</h2>
            <div className="PrivacyTrackerStatusBar">
                <div className="SafeBlock"></div>
                <div className="SemiSafeBlock"></div>
                <div className="RiskBlock"></div>
                <div className="DangerousBlock"></div>
            </div>
            <div className="PrivacyTrackerPointer" style={{left: '50%'}}>
                <IoIcons.IoMdArrowDropup className="Pointer"/>
                <img src={logo} className="App-logo-pointer" alt="logo" />
            </div>
            <p>Check out the tools below to help enhance your score.</p>
        </div>
    )
}

export default PrivacyTracker;