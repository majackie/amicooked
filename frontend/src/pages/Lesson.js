import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loading from "../pages/Loading"
import Navbar from "../shared/Navbar";
import Button from "../shared/Button"
import "../style/Lesson.css";
import HtmlRenderer from "../shared/HtmlRenderer";
import { getLessonStatus, handleFinishLesson, updatePoints } from "../utils/lessonHelper";

/**
 * A Lesson component displaying fetched contents from DB.
 * This is visible only to users with accounts.
 */
function Lesson() {
    const token = localStorage.getItem("token");
    const userid = localStorage.getItem("id")

    const { topicId } = useParams();
    const [lesson, setLesson] = useState();
    const [loading, setLoading] = useState(false);
    const [lessonStatus, setLessonStatus] = useState();
    const navigate = useNavigate();
    
    useEffect(() => {
        setLoading(true)
        const fetchLesson = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/lesson/${topicId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setLesson(response.data)
            } catch (error) {
                console.error("Error fetching lesson:", error);
            } finally {
                setLoading(false)
            }
        };
        
        const fetchStatus = async () => {
            try {
                const status = await getLessonStatus(userid, topicId)
                setLessonStatus(status)
            } catch (error) {
                console.error("Error fetching lesson:", error);
            } finally {
                setLoading(false)
            }
        }
    
        fetchLesson();
        fetchStatus();
    }, []);

    if (loading)
    {
        return <><Loading /></>
    }

    return (
        <div className="Lesson">
            <Navbar type={"default"} />
            <div className="Lesson-body">
                {/* Ensure lesson obj is ready before rendering */}
                {lesson && (
                    <>
                        <h2>{lesson.topicName}</h2>
                        <HtmlRenderer classNameString="Lesson-content" htmlString={lesson.topicContent} />
                        {/* Updating partial user score if lesson has interactive content */}
                        <Button style={{ display: lesson.isInteractive ? 'block' : 'none'}} theme="primary" onClick={() => {
                            if (!lessonStatus)
                            {
                                console.log("Update score")
                                updatePoints(userid, topicId, 50)
                            }
                            else
                            {
                                console.log("Lesson is already completed. No score update.")
                            }
                            navigate(`/user-dashboard/safety-tools/lesson/${topicId}/interactive`)
                            }
                        }>Continue</Button>
                        {/* Completing lesson and updating user score */}
                        <Button theme="back" onClick={() => {
                            if (!lessonStatus && !lesson.isInteractive)
                            {
                                handleFinishLesson(userid, topicId, 100)
                            }
                            navigate('/user-dashboard/safety-tools/lessons-home')

                        }}>Exit Lesson</Button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Lesson;