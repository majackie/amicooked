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
                    {/* TODO - Billy: Push this as text to db */}
                    {/* start - This is what details.content should look like */}
                    <h3>What is phishing?</h3>
                    <p>Phishing is an attempt to steal personal information or break in to online accounts using deceptive emails, messages, ads, or sites that look similar to sites you already use. For example, a phishing email might look like it's from your bank and request private information about your bank account.</p>
                    <p>Phishing messages or content may: </p>
                    <ul>
                        <li>Ask for your personal or financial information.</li>
                        <li>Ask you to click links or download software.</li>
                        <li>Impersonate a reputable organization, like your bank, a social media site you use, or your workplace.</li>
                        <li>Impersonate someone you know, like a family member, friend, or coworker.</li>
                        <li>Look exactly like a message from an organization or person you trust.</li>
                    </ul>
                    <h3>What to look for?</h3>
                    <p>Detecting phishing emails can be challenging, as they are increasingly sophisticated. Here are key signs to look for to help you recognize and avoid them:</p>
                    <ol>
                        <b><li>Check the Sender’s Email Address</li></b>
                        <ul>
                            <li>Often, phishing emails come from addresses that look similar to legitimate ones but have subtle differences (e.g., support@pay-pal.com instead of support@paypal.com).</li>
                            <li>Hover over the sender's name to reveal the actual email address; if it doesn’t match the official domain, be cautious.</li>
                        </ul>
                        <b><li>Look for Poor Grammar and Spelling</li></b>
                            <ul>
                                <li>Many phishing emails contain grammatical errors, awkward phrasing, or typos, as they are often sent from non-native English speakers or hastily crafted.</li>
                            </ul>
                        <b><li>Sense of Urgency or Threats</li></b>
                        <ul>
                            <li>Phishing emails often create a sense of urgency, warning of account closure, suspicious activity, or other time-sensitive issues to prompt a quick response.</li>
                            <li>Example phrases include: "Your account will be deactivated," "Immediate action required," or "Suspicious login detected."</li>
                        </ul>
                        <b><li>Requests for Personal or Financial Information</li></b>
                        <ul>
                            <li>Legitimate organizations rarely ask for sensitive information (like passwords, credit card numbers, or Social Security numbers) over email.</li>
                            <li>Be wary if asked to click a link to "confirm" or "verify" personal details.</li>
                        </ul>
                        <b><li>Suspicious Links or Attachments</li></b>
                        <ul>
                            <li>Hover over links before clicking. If the URL doesn’t match the legitimate website or looks unusual (e.g., with extra characters or unfamiliar domains), don’t click.</li>
                            <li>Attachments, especially unexpected or strangely named ones, can contain malware. Avoid opening them unless you’re sure of the source.</li>
                        </ul>
                        <b><li>Trust Your Instincts</li></b>
                        <ul>
                            <li>If something feels off, it probably is. When in doubt, contact the organization directly (using their official website or phone number) instead of interacting with the email.</li>
                        </ul>
                    </ol>
                    {/* end - This is what details.content should look like */}
                </div>
                <Button theme="primary" onClick={() => navigate(`/user-dashboard/safety-tools/lesson/${props.topicId}/interactive`)}>See example</Button>
                <Button theme="back" onClick={() => navigate('/user-dashboard/safety-tools/lessons-home')}>Back</Button>
            </div>
        </div>
    )
}

export default Lesson;