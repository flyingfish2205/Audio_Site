import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import './App.css'
import './Header.css'
import Player from './components/player/AudioPlayer'
import Form from './components/uploads/Form'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


function Header(){
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
  

function App() {
  const [tracks, setTracks] = useState([])

  async function getTracks(){
    const {data} = await supabase.from('tracks').select()
    setTracks(data)
  }

  useEffect(() => {
    getTracks()
  }, [])

  return (
    <>
    
    <div>Tune in!</div>
    
    < Player tracks={tracks}/>
    < Header/>
    
    
    <ul>
      
      {tracks.map(track => <li key={track.id}>{track.title}</li>)}

    </ul>
    </>
  )
}

export default App
