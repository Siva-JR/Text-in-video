import React, { useState, useRef } from 'react';
import './VideoEditor.css';

export default function VideoEditor() {
  const [videoFile, setVideoFile] = useState(null);
  const [maskedTextPosition, setMaskedTextPosition] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setVideoFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleProcess = async () => {
    setIsProcessing(true);
    
    // Example API call to get mask position
    const response = await fetch('http://localhost:5000/get-mask', {
      method: 'POST',
      body: JSON.stringify({ video: videoFile }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();

    // Example: API returns { x: 200, y: 150 }
    setMaskedTextPosition({ x: data.x, y: data.y });
    setIsProcessing(false);
  };

  return (
    <div className="video-editor-container">
      
      <div className="upload-section">
        <h2>Upload Video</h2>
        <input 
          type="file" 
          className="file-input" 
          id="videoUpload" 
          accept="video/*" 
          onChange={handleFileChange} 
        />
        <label htmlFor="videoUpload" className="upload-label">
          Choose Video
        </label>

        {videoFile && (
          <div className="video-preview">
            <video ref={videoRef} src={videoFile} controls />
            <div className="text-overlay">
              {maskedTextPosition && (
                <span
                  className="masked-text"
                  style={{ top: maskedTextPosition.y, left: maskedTextPosition.x }}
                >
                  Your Text Here
                </span>
              )}
            </div>
          </div>
        )}

        {videoFile && (
          <button className="process-button" onClick={handleProcess}>
            Process Video
          </button>
        )}

        {isProcessing && <div className="processing">Processing...</div>}
      </div>
    </div>
  );
}
