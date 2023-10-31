import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const initialNotes = [
        {
          "_id": "653dce9a72f5d00c26101e9b",
          "user": "65375cf706925e17244182a6",
          "title": "Exercise",
          "description": "some work out at 5.00 pm",
          "tag": "personal",
          "date": "1698549402038",
          "__v": 0
        },
        {
          "_id": "653dceed72f5d00c26101eea1",
          "user": "65375cf706925e17244182a6",
          "title": "Home Work",
          "description": "project of some one to do",
          "tag": "study",
          "date": "1698549485332",
          "__v": 0
        },
        {
          "_id": "653dceed72f5d0e0c26101ea1",
          "user": "65375cf706925e17244182a6",
          "title": "Home Work",
          "description": "project of some one to do",
          "tag": "study",
          "date": "1698549485332",
          "__v": 0
        },
        {
          "_id": "653dceed72fw5d00c26101ea1",
          "user": "65375cf706925e17244182a6",
          "title": "Home Work",
          "description": "project of some one to do",
          "tag": "study",
          "date": "1698549485332",
          "__v": 0
        },
        {
          "_id": "653dceed72f5d0w0c26101ea1",
          "user": "65375cf706925e17244182a6",
          "title": "Home Work",
          "description": "project of some one to do",
          "tag": "study",
          "date": "1698549485332",
          "__v": 0
        }
      ]
    
      const [notes, setNotes] = useState(initialNotes);

      // Add a Note
      const addNote = (title, description, tag) => {
        // TODO: api call
        const note = {
          "_id": "653dceed723f5d0w0c26101ea1",
          "user": "65375cf706925e17244182a6",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "1698549485332",
          "__v": 0
        }
        setNotes(notes.concat(note));
      }

      // Delete a Note
      function deleteNote(id) {
          // TODO: api calls
          const newNotes = notes.filter((note) => {return (note._id !== id)});
          setNotes(newNotes);
      }

      // Edit a Note
      function editNote(id, title, description, tag) {

      }
    
    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;