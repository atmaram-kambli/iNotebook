import React from 'react'

function NoteItem(props) {
    const { note } = props;
    return (
        <>
        <div className='col-md-3 my-2'>
            <div className="card row m-1">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                    </div>
            </div>
        </div>
        </>
    )
}

export default NoteItem