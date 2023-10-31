import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/NoteContext';


const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title:"", description:"", tag:""})

    function onChange(e) {
        setNote({...note, [e.target.name]: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }

  return (
    <>
        <div className="container">
            <h2>Add a Note</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" name="title" onChange={onChange} aria-describedby="emailHelp" placeholder="Title of note" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} placeholder="Add description here..." />
                </div>
                <div className="form-group ">
                    <label htmlFor="tag">Tags</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} placeholder='tags'/>
                </div>
                <button type="submit" className="btn btn-primary m-3" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    </>
  )
}

export default AddNote