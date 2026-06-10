import song from "./Project_1.wav";
import { useState, useEffect, useRef } from "react";

function Player({tracks}){

    const [currentIndex, setCurrentIndex] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        if(audioRef.current){
            audioRef.current.play();
        }
    }, [currentIndex]);

    function handleEnded(){
        setCurrentIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    }
    return(
    
    <div> <audio controls ref={audioRef} src={tracks[currentIndex]?.url} type = "audio/wav" onEnded={handleEnded} controls/>
    
    </div>
    )
    
   
}

export default Player