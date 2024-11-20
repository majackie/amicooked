import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loading from "../pages/Loading"
import Navbar from "../shared/Navbar";
import Button from "../shared/Button"
import "../style/Lesson.css";
import HtmlRenderer from "../shared/HtmlRenderer";

function Lesson() {
    const { topicId } = useParams();
    const [lesson, setLesson] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    console.log("Topic id: "+topicId)
    
    useEffect(() => {
        console.log("@@@ in useEffect")
        setLoading(true)
        const fetchLesson = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/lesson/${topicId}`);
                // console.log("@@@ Retrieved lesson "+response.data.topicName)
                setLesson(response.data)
            } catch (error) {
                console.error("Error fetching lesson:", error);
            } finally {
                setLoading(false)
            }
        };
    
        fetchLesson();
    }, []);

    if (loading)
    {
        return <><Loading /></>
    }

    const updatePoints = async (user_id, topic_id, new_points) => {
        try {
            const response = await axios.post(`http://127.0.0.1:5000/update_points`, {
                userid: parseInt(user_id),
                topicid: parseInt(topic_id),
                points: parseInt(new_points),
            });
            console.log(response.data)
        } catch (error) {
            console.error("Error updating points:", error);
        }
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
                            // TODO - Billy: replace "8" with dynamic userid
                            updatePoints(8, topicId, 50)
                            navigate(`/user-dashboard/safety-tools/lesson/${topicId}/interactive`)
                            }
                        }>Continue</Button>
                        <Button theme="back" onClick={() => navigate('/user-dashboard/safety-tools/lessons-home')}>Exit Lesson</Button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Lesson;