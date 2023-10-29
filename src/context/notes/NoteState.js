import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const s1 = {
        "name": "Harry",
        "class": "10A"
    };
    
    return (
        <NoteContext.Provider value={s1}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;