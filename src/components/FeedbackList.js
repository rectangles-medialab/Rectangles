import React from "react";

function FeedbackList({ feedback }) {

    return (
        <div className="next-container">
            <h1>Je Pitch is gecheckt!</h1>
            <p>Bekijk hieronder de feedback op je postuur en spraak! Merkt u enkele fouten of problemen in de feedback? Laat het ons weten via npo@info.nl</p>

            <FeedbackCard
                title={feedback == "wave" ? "Rare beweging" : "Zelfverzekerde houding"}
                text={feedback == "wave" ? "Probeer minder onverwachtse bewegingen te maken, dit kan er namelijk voor zorgen dat het publiek afgeleid raakt." : "Goed dat je geen onverwachte bewegingen maakt of wiebelt. Het publiek waardeerd een rustig persoon die niet al te nerveus lijkt."}
                feedbackType={feedback == "wave" ? "negative" : "positive"} />
        </div>
    );
}

export default FeedbackList;
