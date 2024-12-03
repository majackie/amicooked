import React from 'react';
import DOMPurify from 'dompurify';

/**
 * An HtmlRenderer component helps render HTML texts.
 */

const HtmlRenderer = ({ classNameString, htmlString }) => {
    // Sanitize the HTML string
    const sanitizedHtml = DOMPurify.sanitize(htmlString);

    return (
        <div className={classNameString} dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
    );
};

export default HtmlRenderer;
