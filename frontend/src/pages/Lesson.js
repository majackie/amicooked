import { useEffect, useState } from "react";
import axios from "axios";

import AppHeader from "../shared/AppHeader";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../shared/Button"
import "../style/Lesson.css";
import HtmlRenderer from "../shared/HtmlRenderer";

function Lesson() {
// TODO
// Retrieve from db to get details[props.id]
// Display contents from details like details.topic, details.content
// * contents will be in html format for parsing
    const { topicId } = useParams();
    const [lesson, setLesson] = useState();
    const navigate = useNavigate();
    console.log("Topic id: "+topicId)
    
    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/lesson/${topicId}`);
                console.log("@@@ Retrieved lesson "+response.data.topicName)
                setLesson(response.data)
            } catch (error) {
                console.error("Error fetching lesson:", error);
            }
        };
    
        fetchLesson();
      }, []);

    return (
        <div className="Lesson">
            <AppHeader />
            <div className="Lesson-body">
                <h2>{lesson.topicName}</h2>
                {/* TODO - Billy: Push this as text to db */}
                {/* start - This is what details.content should look like */}
                <HtmlRenderer classNameString="Lesson-content" htmlString={lesson.topicContent} />
                {/* end - This is what details.content should look like */}
                <Button theme="primary" onClick={() => navigate(`/user-dashboard/safety-tools/lesson/${topicId}/interactive`)}>See example</Button>
                <Button theme="back" onClick={() => navigate('/user-dashboard/safety-tools/lessons-home')}>Back</Button>
            </div>
        </div>
    )
}

export default Lesson;