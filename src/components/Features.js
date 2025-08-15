import React from "react";



export default function Features(){
    return(
    <section className="features">
      <h2>Why Choose Our Tool?</h2>
      <div className="feature-grid">
        <div className="feature-card">
          <h3>Layer-Aware AI</h3>
          <p>
            Detects objects in your video and allows text placement behind or
            in front of them.
          </p>
        </div>
        <div className="feature-card">
          <h3>Creator-Friendly</h3>
          <p>
            No editing skills needed—just upload your video, type your text, and let AI handle the magic.
          </p>
        </div>
        <div className="feature-card">
          <h3>Fast Processing</h3>
          <p>
            Get results in minutes, not hours, so you can keep creating without delays.
          </p>
        </div>
      </div>
    </section>
    );
}