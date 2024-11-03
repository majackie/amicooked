import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import AppHeader from "../../shared/AppHeader";
import '../../style/TermsNConditions.css';
import Button from "../../shared/Button";

function TermsNConditions() {
    const navigate = useNavigate();
    const [value, setValue] = useState([]);
    const handleChange = (val) => setValue(val);

    console.log("value selected: "+value)
    const options = [
        { label: "1. Data Collection and Sharing", value: 1},
        { label: "2. Content Ownership", value: 2},
        { label: "3. Tracking and Profiling", value: 3},
        { label: "4. Device Access", value: 4},
        { label: "5. Limited User Rights", value: 5},
        { label: "6. Non-Disparagement", value: 6},
        { label: "7. Changes to Terms", value: 7},
    ];
    const [openDropdownIndex, setOpenDropdownIndex] = useState(-1);
    const dropdownRefs = useRef([]);

    const handleToggleDropdown = (index) => {
        setOpenDropdownIndex(openDropdownIndex === index ? null : index);
    };

    // <span className="Redflag" onClick={() => handleToggleDropdown(0)}><u>{highlights[0]}</u></span></p>
    // <div 
    //     ref={(el) => dropdownRefs.current[0] = el}
    //     className={`dropdown ${openDropdownIndex === 0 ? 'open' : ''}`}
    //     style={{
    //         maxHeight: openDropdownIndex === 0 ? `${dropdownRefs.current[0]?.scrollHeight}px` : '0px',}}
    // >
    //     <p>Email Address: The email is from "support@bankofamericaupdates.com", which is not the official Bank of America domain.</p>
    // </div>

    return (
        <div className="TermsNConditions">
            <AppHeader />
            <div className="TermsNConditions-body">
                <h2>Terms And Conditions</h2>
                <p>Here’s an example of a Terms and Conditions. After reading through the sample, please answer below the clause number that you think it is dangerous/concerning.</p>
                <div className="TermsNConditions-example">
                    <h3>Terms and Conditions</h3>
                    <ol>
                        <li>Data Collection and Sharing</li>
                        <p>By using this service, you consent to the collection of all information you input, including personal information, browsing activity, device information, and location data. We reserve the right to share this data with third-party advertisers, analytics providers, and business partners.</p>                    
                        <li>Content Ownership</li>
                        <p>Any content you create, upload, or share on this platform (e.g., photos, videos, text) becomes the property of the service. We retain the right to use, modify, or distribute this content indefinitely, even after your account is deleted.</p>
                        <li>Tracking and Profiling</li>
                        <p>We may track your behavior on this service and across other online platforms to build a profile for targeted advertising. This data may be shared with external companies.</p>
                        <li>Device Access</li>
                        <p>By agreeing, you allow this app to access your camera, microphone, contacts, and storage at any time, even when not in active use. We may use these permissions to enhance service delivery, including tailored ad placement.</p>
                        <li>Limited User Rights</li>
                        <p>Users waive the right to dispute any account terminations or restrictions we impose, including loss of access to account data. The service may suspend your account at its sole discretion without notice or explanation.</p>
                        <li>Non-Disparagement</li>
                        <p>By accepting, you agree not to publicly criticize or negatively review this service. Violation may result in account termination and possible legal action.</p>
                        <li>Changes to Terms</li>
                        <p>We reserve the right to modify these terms at any time without prior notice. Continued use of the service indicates your acceptance of the updated terms.</p>
                    </ol>
                </div>
                <div className="TermsNConditions-quiz">
                    <br />
                    <h3>Please select up to 7 of the clauses that you think are dangerous or concerning in this example.</h3>
                    <ToggleButtonGroup
                        className="custom-toggle-group"
                        type="checkbox"
                        name="options" 
                        value={value} 
                        onChange={handleChange}>
                            {renderToggleButtons(options)}
                    </ToggleButtonGroup>
                </div>
                <Button theme="primary" onClick={handleAnswer}>Check Answer</Button>
                <Button theme="back" onClick={() => navigate('/user-dashboard/safety-tools/lessons-home')}>Back to Lessons</Button>
            </div>
        </div>
    );
}

const renderToggleButtons = (optionsArray) => {
    return optionsArray.map((option) => (
        <ToggleButton className="custom-toggle-btn" key={option.value} id={`tbg-btn-${option.value}`} value={option.value}>
        {option.label}
        </ToggleButton>
    ));
};

function handleAnswer(value) {
    if (value.length == 7) {
        console.log("Correct")
        // return true
    } else {
        console.log("False")
    }
    
    // return false
}

export default TermsNConditions;