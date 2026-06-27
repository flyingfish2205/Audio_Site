import song from "./Project_1.wav";
import { useState, useEffect, useRef } from "react";
import "./AudioPlayer.css";

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
    
        
    <div> 
        <audio controls ref={audioRef} src={tracks[currentIndex]?.url} type = "audio/wav" onEnded={handleEnded} controls/>
        
        {/*
        <div className = "player">
            <ul className = "buttons">
                <li className = "play">
                    <a href = "#">play</a>
                    
                    </li>
                <li className = "pause">
                    <a href = "#">pause</a>
                    
                </li>
                <li className = "stop">
                    <a href = "#">previous</a>
                    
                </li>
                <li className = "next">
                    <a href = "#">next</a>
                    
                </li>

            </ul>
        </div>
        */}

    </div>

   
    )
    
   
}
    

export default Player