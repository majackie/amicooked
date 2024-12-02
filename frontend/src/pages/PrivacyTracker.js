import axios from "axios";
import { useEffect, useState } from "react";
import * as IoIcons from "react-icons/io";
import "../style/PrivacyTracker.css";
import logo from '../asset/logo.png';

function PrivacyTracker() {
    const token = localStorage.getItem("token")
    const userid = localStorage.getItem("id")
    const [loading, setLoading] = useState(false);
    const [totalLessons, setTotalLessons] = useState();
    const [score, setScore] = useState();

    useEffect(() => {
        setLoading(true)
        const fetchScore = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/get_score/${userid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setScore(response.data.total_points)
            } catch (error) {
                console.error("Error getting user total points]:", error);
            } finally {
                setLoading(false)
            }        
        };

        const fetchTotalLessons = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`http://127.0.0.1:5000/get_total_lessons`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTotalLessons(response.data.total_lessons)
            } catch (error) {
                console.error("Error getting total lessons:", error);
            } finally {
                setLoading(false)
            }
        };
        fetchScore();
        fetchTotalLessons();
        
    }, []);

    if (loading)
    {
        return (
            <div className="PrivacyTracker" style={{height: "50vmin"}}>
                <h1 style={{fontWeight: "bold"}}>Calculating your score...</h1>
            </div>
        )
    }

    return(
        <div className="PrivacyTracker">
            <h3>YOUR PRIVACY SCORE</h3>
            {score ? (
                <h2>{score} / {100 * totalLessons}</h2>
            ) : (
                <h2>0</h2>
            )}
            <div className="PrivacyTrackerStatusBar">
                <div className="SafeBlock"></div>
                <div className="SemiSafeBlock"></div>
                <div className="RiskBlock"></div>
                <div className="DangerousBlock"></div>
            </div>
            <div className="PrivacyTrackerPointer" style={{left: `${(score && totalLessons) ? (-1 * (score / totalLessons) + 50 ).toString() : "50"}%`}}>
                <IoIcons.IoMdArrowDropup className="Pointer"/>
                <img src={logo} className="App-logo-pointer" alt="logo" />
            </div>
            <p>Check out the tools below to help enhance your privacy.</p>
        </div>
    )
}

export default PrivacyTracker;