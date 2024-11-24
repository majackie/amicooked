import React from 'react';
import DOMPurify from 'dompurify';

const HtmlRenderer = ({ classNameString, htmlString }) => {
    // Sanitize the HTML string
    const sanitizedHtml = DOMPurify.sanitize(htmlString);

    return (
        <div className={classNameString} dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
    );
};

export default HtmlRenderer;
