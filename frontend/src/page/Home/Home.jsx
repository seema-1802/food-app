import React, { useState } from 'react'
import "./Home.css"
import Header from '../../componets/Header/Header'
import ExploreMenu from '../../componets/ExploreMenu/ExploreMenu'
import Food from '../../componets/Food/Food'
import AppDownload from '../../componets/AppDownload/AppDownload'
function Home() {
    const [category,setCategory]=useState("All")
  return (
    <div><Header/>
    
    <ExploreMenu category={category} setCategory={setCategory}/>
       <Food category={category} />
       <AppDownload />
    </div>
  )
}

export default Home