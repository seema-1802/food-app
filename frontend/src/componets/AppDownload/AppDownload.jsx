import React from 'react'
import './AppDownload.css'
import play_store from "../../assets/frontend_assets/play_store.png";
import app_store from "../../assets/frontend_assets/app_store.png";
function AppDownload() {
  return (
    <div className="app-downlaod" id="app-downlaod">
        <p>For Better Experience Download <br /> Food-App</p>

  <div className="app-platform">
    <img src={play_store} alt="Play Store" />
    <img src={app_store} alt="App Store" />
  </div>
    </div>
  )
}

export default AppDownload