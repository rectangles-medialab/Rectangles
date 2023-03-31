import React from "react";
import FeedbackCard from './FeedbackCard';

function FeedbackList() {
    return (
        <div className="next-container">
            <h1>Je Pitch is gecheckt!</h1>
            <p>Bekijk hieronder de feedback op je postuur en spraak! Merkt u enkele fouten of problemen in de feedback? Laat het ons weten via npo@info.nl</p>

            <FeedbackCard />
        </div>

    );
}

export default FeedbackList;
