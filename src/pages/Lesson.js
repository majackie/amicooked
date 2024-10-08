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
            </div>
        </div>
    )
}

export default Lesson;