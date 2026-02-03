import React from 'react';
import './SplashScreen.css';

function SplashScreen() {
  return (
    <div className="splash-screen">
      <div className="room">
        <div className="lamp">
          <div className="line"></div>
          <div className="base">
            <div className="light"></div>
          </div>
        </div>
        <div className="text">
          <span>STOCKPULSE</span>
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
