import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../shared/Navbar";
import Button from "../shared/Button"
import "../style/Lesson.css";
import HtmlRenderer from "../shared/HtmlRenderer";

function Lesson() {
    const { topicId } = useParams();
    const [lesson, setLesson] = useState();
    const navigate = useNavigate();
    console.log("Topic id: "+topicId)
    
    useEffect(() => {
        console.log("@@@ in useEffect")
        const fetchLesson = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/lesson/${topicId}`);
                // console.log("@@@ Retrieved lesson "+response.data.topicName)
                setLesson(response.data)
            } catch (error) {
                console.error("Error fetching lesson:", error);
            }
        };
    
        fetchLesson();
      }, []);

    return (
        <div className="Lesson">
            <Navbar type={"default"} />
            <div className="Lesson-body">
                {/* Ensure lesson obj is ready before rendering */}
                {lesson && (
                    <>
                        <h2>{lesson.topicName}</h2>
                        <HtmlRenderer classNameString="Lesson-content" htmlString={lesson.topicContent} />
                        <Button style={{ display: lesson.isInteractive ? 'block' : 'none'}} theme="primary" onClick={() => navigate(`/user-dashboard/safety-tools/lesson/${topicId}/interactive`)}>See example</Button>
                        <Button theme="back" onClick={() => navigate('/user-dashboard/safety-tools/lessons-home')}>Back</Button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Lesson;