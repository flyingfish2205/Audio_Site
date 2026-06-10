function Form(){
    return(
        <div>
            <h3>Submit your song here!</h3>
            <h4>Title</h4>
            <input></input>
            
            <h4>Artist</h4>
            <input></input>

            <h4>File</h4>
            <input type="file" accept="audio/*"></input>
            <div> <button className="button">Submit</button></div>
           
        </div>

        
           
        
    )
}

export default Form