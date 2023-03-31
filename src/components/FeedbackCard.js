import React from "react";

function FeedbackCard({ title, text, feedbackType }) {
    return (
        <div className={feedbackType + " card"}>
            <h2>{title}</h2>
            <p>{text}</p>
        </div>
    );
}

export default FeedbackCard;
