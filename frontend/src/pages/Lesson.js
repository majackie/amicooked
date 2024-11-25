<<<<<<< HEAD
import AppHeader from "../shared/AppHeader";
import { useNavigate } from "react-router-dom";
import Button from "../shared/Button"
import "../style/Lesson.css";

function Lesson(props) {
// TODO
// Retrieve from db to get details[props.id]
// Display contents from details like details.topic, details.content
// * contents will be in html format for parsing
    const navigate = useNavigate();
    console.log("Topic id: "+props.topicId)
    console.log("Topic name: "+props.topicName)

    return (
        <div className="Lesson">
            <AppHeader />
            <div className="Lesson-body">
                <div className="Lesson-content">
                    <h2>{props.topicName}</h2>
                    {/* start - This is what details.content should look like */}
                    <h3>What phishing is</h3>
                    <p>Phishing is an attempt to steal personal information or break in to online accounts using deceptive emails, messages, ads, or sites that look similar to sites you already use. For example, a phishing email might look like it's from your bank and request private information about your bank account.</p>
                    <p>Phishing messages or content may: </p>
                    <ul>
                        <li>Ask for your personal or financial information.</li>
                        <li>Ask you to click links or download software.</li>
                        <li>Impersonate a reputable organization, like your bank, a social media site you use, or your workplace.</li>
                        <li>Impersonate someone you know, like a family member, friend, or coworker.</li>
                        <li>Look exactly like a message from an organization or person you trust.</li>
                    </ul>
                    {/* end - This is what details.content should look like */}
                </div>
                <Button theme="primary" onClick={() => navigate('/user-dashboard/safety-tools/lessons-home')}>Back</Button>
=======
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loading from "../pages/Loading"
import Navbar from "../shared/Navbar";
import Button from "../shared/Button"
import "../style/Lesson.css";
import HtmlRenderer from "../shared/HtmlRenderer";
import { getLessonStatus, handleFinishLesson, updatePoints } from "../utils/lessonHelper";

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
                // console.log("@@@ Retrieved lesson "+response.data.topicName)
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
        console.log("lessonStatus: "+lessonStatus)
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
                        <Button theme="back" onClick={() => {
                            if (!lessonStatus && !lesson.isInteractive)
                            {
                                handleFinishLesson(userid, topicId, 100)
                            }
                            navigate('/user-dashboard/safety-tools/lessons-home')

                        }}>Exit Lesson</Button>
                    </>
                )}
>>>>>>> Develop
            </div>
        </div>
    )
}

export default Lesson;