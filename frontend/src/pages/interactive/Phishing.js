import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from "../../shared/Navbar";
import Button from "../../shared/Button";
import '../../style/Phishing.css';

function Phishing() {
    const navigate = useNavigate();
    const highlights = [
        "support@bankofamericaupdates.com",
        "Verify My Account",
        "Social Security Number and password.",
        "If you do not complete verification within 24 hours, your account will be permanently disabled.",
        "chose"
    ];
    const [openDropdownIndex, setOpenDropdownIndex] = useState(-1);
    const dropdownRefs = useRef([]);

    const handleToggleDropdown = (index) => {
        setOpenDropdownIndex(openDropdownIndex === index ? null : index);
    };

    
    return (
        <div className="Phishing">
            <Navbar type={"default"} />
            <div className="Phishing-body">
                <h2>Phishing email</h2>
                <p>Here’s an example of a phishing email that’s designed to look like it’s from a bank. Click on the highlighted areas to see their red flag.</p>
                <div className="Phishing-example">
                        <p><b>From:</b> <span className="Redflag" onClick={() => handleToggleDropdown(0)}><u>{highlights[0]}</u></span></p>
                        <div 
                            ref={(el) => dropdownRefs.current[0] = el}
                            className={`dropdown ${openDropdownIndex === 0 ? 'open' : ''}`}
                            style={{
                                maxHeight: openDropdownIndex === 0 ? `${dropdownRefs.current[0]?.scrollHeight}px` : '0px',}}
                        >
                            <p>Email Address: The email is from "support@bankofamericaupdates.com", which is not the official Bank of America domain.</p>
                        </div>
                        
                    
                        <p><b>Subject:</b> Urgent: Verify Your Account Now to Avoid Suspension</p>
                        <p>Dear Customer,</p>
                        <p>We detected suspicious activity on your account and temporarily suspended it to protect your information. To prevent further issues, please verify your account immediately.</p>
                        <p>Follow the steps below:</p>
                        <ol>
                            <li>Click on the secure link to verify your account: <span className="Redflag" onClick={() => handleToggleDropdown(1)}><a href="" onClick={() => navigate('/dangerous-phishing-url')}>{highlights[1]}</a></span></li>
                            <div 
                            ref={(el) => dropdownRefs.current[1] = el}
                            className={`dropdown ${openDropdownIndex === 1 ? 'open' : ''}`}
                            style={{
                                maxHeight: openDropdownIndex === 1 ? `${dropdownRefs.current[1]?.scrollHeight}px` : '0px',}}
                            >
                                <p>Suspicious Link: The link text says "Verify My Account," but if you hover over it, the actual URL (http://secure-bankofamerica-login.com) is not the official bank website. This is a classic phishing tactic.</p>
                            </div>
                            <li>Enter your account details, including your <span className="Redflag" onClick={() => handleToggleDropdown(2)}>{highlights[2]}</span></li>
                            <div 
                                ref={(el) => dropdownRefs.current[2] = el}
                                className={`dropdown ${openDropdownIndex === 2 ? 'open' : ''}`}
                                style={{
                                    maxHeight: openDropdownIndex === 2 ? `${dropdownRefs.current[2]?.scrollHeight}px` : '0px',}}
                            >
                                <p>Requests for Sensitive Information: The email asks for details like your Social Security Number and password. No legitimate bank will ask for sensitive information through email.</p>
                            </div>
                            <li>Review your account for recent activity.</li>
                        </ol>
                        <p><span className="Redflag" onClick={() => handleToggleDropdown(3)}>{highlights[3]}</span></p>
                        <div 
                            ref={(el) => dropdownRefs.current[3] = el}
                            className={`dropdown ${openDropdownIndex === 3 ? 'open' : ''}`}
                            style={{
                                maxHeight: openDropdownIndex === 3 ? `${dropdownRefs.current[3]?.scrollHeight}px` : '0px',}}
                        >
                            <p>Urgent Language: The email uses fear-inducing words like "suspicious activity," "temporarily suspended," and "permanently disabled" to make you act quickly without thinking.</p>
                        </div>
                        <p>Thank you for <span className="Redflag" onClick={() => handleToggleDropdown(4)}>{highlights[4]}</span> Bank of America. We apologize for any inconvenience.</p>
                        <div 
                            ref={(el) => dropdownRefs.current[4] = el}
                            className={`dropdown ${openDropdownIndex === 4 ? 'open' : ''}`}
                            style={{
                                maxHeight: openDropdownIndex === 4 ? `${dropdownRefs.current[4]?.scrollHeight}px` : '0px',}}
                        >
                            <p>Spelling or grammar mistake: The email contains mistake like "chose" instead of "choosing". Authenticate emails are always proof-read, while Phishing emails are generated by bad actors who potentially will not proof-read their email contents.</p>
                        </div>
                        <p><b>Bank of America Security Team</b></p>                  
                </div>
                <Button theme="secondary" onClick={() => navigate('/user-dashboard/safety-tools/lessons-home')}>Finish Lesson</Button>
            </div>
        </div>
    );
}

export default Phishing;