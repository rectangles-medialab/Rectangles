import React from "react";

function FeedbackCard() {
    return (
            <div class="card-container">
                <div class="card positive">
                    <h2>Postuur</h2>
                    <p>Je postuur is uitstekend in jouw pitch, ga zo door hiermee.</p>
                </div>

                <div class="card positive">
                    <h2>Pitch Lengte</h2>
                <p>De lengte van je pitch is precies goed, houd deze tijd aan.</p>
                </div>

            <div class="card negative">
                    <h2>Uhmmm</h2>
                <p>Probeer in je volgende pitch minder "Uhm" te zeggen.</p>
                </div>
            </div>

            
    );
}

export default FeedbackCard;
