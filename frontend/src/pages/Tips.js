import "../style/Tips.css"
import { Carousel } from '@trendyol-js/react-carousel';
import Button from "../shared/Button"
import Navbar from "../shared/Navbar"

function Tips(props) {
    return (
        <div className="Tips">
            <Navbar />
            <div className="Tips-body">
            <h2>TIPS</h2>
            <h3>Topic {props.topicName}</h3>
            <Carousel show={1} slide={1} swiping={true} leftArrow={<Button theme="round">{'<'}</Button>} rightArrow={<Button theme="round">{'>'}</Button>}>
                {/* Add tip's contents to DB and dynamically render them props.tipList */}
                <div className="Carousel-item" style={{ padding: '20px', backgroundColor: '#ffddc1' }}><b>Check the Sender's Email Address</b><br/> Phishers often use email addresses that resemble legitimate ones. Look closely for small variations, such as extra characters or misspellings.</div>
                <div className="Carousel-item" style={{ padding: '20px', backgroundColor: '#c2f0c2' }}><b>Avoid Clicking on Links</b><br/> Hover over links before clicking to see the actual URL. Phishing emails often use fake links that appear similar to real sites.</div>
                <div className="Carousel-item" style={{ padding: '20px', backgroundColor: '#c2e9fb' }}><b>Look for Red Flags</b><br/> Grammar errors, urgent calls for action (like "act now" or "urgent!"), and requests for sensitive information are common in phishing emails.</div>
                <div className="Carousel-item" style={{ padding: '20px', backgroundColor: '#f6d6ad' }}><b>Verify Directly with the Source</b><br/> If an email claims to be from a known organization, contact them through their official website or customer support to confirm.</div>
                <div className="Carousel-item" style={{ padding: '20px', backgroundColor: '#d9e3f0' }}><b>Use Email Filtering Tools</b><br/> Many email services have built-in phishing and spam filters. Enable these and adjust your settings for maximum security.</div>
                <div className="Carousel-item" style={{ padding: '20px', backgroundColor: '#e0f7fa' }}><b>Enable Multi-Factor Authentication (MFA)</b><br/> MFA adds an extra layer of security, even if an attacker gets your password from a phishing attack.</div>
            </Carousel>
            </div>
        </div>
    );
}

export default Tips;