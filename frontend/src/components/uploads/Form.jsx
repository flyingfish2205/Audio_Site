import { useState } from 'react'
import supabase from '../services/supabase'

function Form(){

    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false)

    async function handleSubmit(e){
        if(!title||!artist||!file) return alert('Please fill in all fields')
        setUploading(true);

        const fileName = `${Date.now()}_${file.name}`
        const {error: uploadError} = await supabase.storage.from('audio').upload(fileName, file);
        if(uploadError) {
            alert('Error uploading file: ' + uploadError.message)
            setUploading(false)
            return
        }

        const {data} = supabase.storage.from('audio').getPublicUrl(fileName)

        const {error: insertError} = await supabase.from('tracks').insert({ title, artist, filename: fileName, url: data.publicUrl })
        if(insertError){
            alert('Error saving track info: ' + insertError.message)
        } else{
            alert('Track submitted successfully!')
            setTitle('')
            setArtist('')
            setFile(null)
        }

        setUploading(false)
    }


    return(
        <div>
            <h3>Submit your song here!</h3>
            <h4>Title</h4>
            <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
            <h4>Artist</h4>
            <input value={artist} onChange={(e) => setArtist(e.target.value)}></input>

            <h4>File</h4>
            <input type="file" accept="audio/*" onChange={(e) => setFile(e.target.files[0])}></input>

            <div> <button className="button" onClick={handleSubmit} disabled={uploading}> {uploading ? 'Uploading...' : 'Submit'} </button></div>
           
        </div>

        
           
        
    )
}

export default Form