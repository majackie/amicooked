import { useEffect, useState } from "react";
import axios from "axios";

import AppHeader from "../../shared/AppHeader";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../shared/Button"
import "../../style/Lesson.css";
import HtmlRenderer from "../../shared/HtmlRenderer";

function Password(props) {
// TODO
// Retrieve from db to get details[props.id]
// Display contents from details like details.topic, details.content
// * contents will be in html format for parsing
    // const { topicId } = useParams();
    // const [lesson, setLesson] = useState();
    // const navigate = useNavigate();
    // console.log("Topic id: "+topicId)
    
    // useEffect(() => {
    //     const fetchLesson = async () => {
    //         try {
    //             const response = await axios.get(`http://127.0.0.1:5000/lesson/${topicId}`);
    //             console.log("@@@ Retrieved lesson "+response.data.topicName)
    //             setLesson(response.data)
    //         } catch (error) {
    //             console.error("Error fetching lesson:", error);
    //         }
    //     };
    
    //     fetchLesson();
    //   }, []);
    const navigate = useNavigate();
    return (
        <div className="Lesson">
            <AppHeader />
            <div className="Lesson-body">
                <h2>{props.topicName}</h2>
                <br />
                {/* <HtmlRenderer classNameString="Lesson-content" htmlString={lesson.topicContent} /> */}
                {/* TODO - Billy: Add content (Terms&Conditions) to DB */}
                <div className="Lesson-content">
                    <h3>Why Should You Always Read The Terms And Conditions Carefully?</h3>
                    <p>When you sign up for a new website or you download an app, you are usually presented with a long list of terms and conditions that you need to agree to before you can proceed. For many years now, people have been blindly agreeing to terms and conditions to save the time that would be typically spent reading through them. This has led to numerous problems involving privacy and moreover the years.</p>
                    <p>Below, we will look at some of the reasons why you should always read the terms and conditions carefully before agreeing to them. Read on to find out more.</p>
                    <h3>Privacy Concerns</h3>
                    <p>One of the biggest issues that consumers have faced over recent years as a result of ignoring terms and conditions involves privacy. There are <b>tons of apps out there that include some really concerning privacy issues</b> in their terms and millions of people around the world have agreed to them. This has resulted in personal data being shared amongst third parties without their knowledge and resulted in some serious legal implications. Even the most popular apps such as <b>Facebook and WhatsApp</b> have had to deal with privacy complaints despite the terms and conditions being very clear.</p>
                    <p>If you want to protect the privacy of yourself or your business, you should always read the terms and conditions carefully.</p>
                    <h3>Issues With Agreements</h3>
                    <p>Finally, you need to always be reading the terms and conditions so that you know what you are getting yourself into. For example, if you were to take out an insurance policy for your business and you didn’t read the terms and conditions, you could find that some of the tasks you do aren’t covered when you need to make a claim. This can cause major issues for you as a business owner and result in you losing out on a financial payout.</p>
                    <p>It is vitally important that you are always reading the terms and conditions so that you are aware of what you are agreeing to. Often, businesses will hide terms in these documents and if you never read them, you could find that you have serious issues further down the line. Avoid this by reading over them or having a member of your legal team do so.</p>
                    <h3>Don't Ignore Them</h3>
                    <p>While it can be tempting to ignore the terms and conditions in order to speed up the process, you should try to read them every single time you need to. This way, you won’t need to deal with the repercussions of tight terms that you weren’t aware of when you signed an agreement. <b>Your privacy is also very important</b> and if you skim the terms, you could find that your details are being passed on without your knowledge.</p>
                    <p>The truth of the matter is that no one wants to waste time reading the terms but there are advantages to doing so.</p>
                </div>
                <Button theme="primary" onClick={() => navigate(`/user-dashboard/safety-tools/lesson/${props.topicId}/interactive`)}>See example</Button>
                <Button theme="back" onClick={() => navigate('/user-dashboard/safety-tools/lessons-home')}>Back</Button>
            </div>
        </div>
    )
}

export default Password;