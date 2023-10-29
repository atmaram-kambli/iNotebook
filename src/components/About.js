import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';

export default function About() {
  const a = useContext(noteContext);
  return (
    <>
        <h1>This is About {a.name} and he is in class {a.class}</h1>
    </>
  )
}
