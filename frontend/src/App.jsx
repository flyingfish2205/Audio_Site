import { useState, useEffect } from 'react'
import './App.css'
import './Header.css'

import supabase from './components/services/supabase'
import Player from './components/player/AudioPlayer'
import Form from './components/uploads/Form'



function Page(){
  const [show, setShow] = useState(false)

  
  
  return(
  <div>
    
    <button className = "button" onClick={() => setShow(prev => !prev)}>
      Submit a song!
    </button>

    {show && < Form/>}
    
     <button className = "button" >
      About
    </button>

   
  </div>
)
}

function Footer(){
  return(
    <div className = "footer">
      <p>Created by<a href="https://flyingfish.dev" target="_blank" rel="noopener noreferrer">flyingfish2205</a></p>
      </div>
    )
      
}
function Shuffle(Array){
  const shuffled = [...Array]
  for(let i = shuffled.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled
}

function App() {
  const [tracks, setTracks] = useState([])

  async function getTracks(){
    const {data} = await supabase.from('tracks').select()
    setTracks(Shuffle(data))
  }

  useEffect(() => {
    getTracks()
  }, [])

  return (
    <>
    
    <div>Tune in!</div>
    
    < Player tracks={tracks}/>
    < Page />
    
    
    <div>
      <p>Now Playing: {tracks.length > 0 ? tracks[0].title : 'No tracks available'}</p>
      <p>By: {tracks.length > 0 ? tracks[0].artist : 'Unknown Artist'}</p>
    </div>
    <Footer />

    </>

    
  )
}

export default App
