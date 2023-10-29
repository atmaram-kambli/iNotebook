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
          "_id": "653dceed72f5d00c26101ea1",
          "user": "65375cf706925e17244182a6",
          "title": "Home Work",
          "description": "project of some one to do",
          "tag": "study",
          "date": "1698549485332",
          "__v": 0
        },
        {
          "_id": "653dceed72f5d00c26101ea1",
          "user": "65375cf706925e17244182a6",
          "title": "Home Work",
          "description": "project of some one to do",
          "tag": "study",
          "date": "1698549485332",
          "__v": 0
        },
        {
          "_id": "653dceed72f5d00c26101ea1",
          "user": "65375cf706925e17244182a6",
          "title": "Home Work",
          "description": "project of some one to do",
          "tag": "study",
          "date": "1698549485332",
          "__v": 0
        },
        {
          "_id": "653dceed72f5d00c26101ea1",
          "user": "65375cf706925e17244182a6",
          "title": "Home Work",
          "description": "project of some one to do",
          "tag": "study",
          "date": "1698549485332",
          "__v": 0
        }
      ]
    
      const [notes, setNotes] = useState(initialNotes)
    
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;