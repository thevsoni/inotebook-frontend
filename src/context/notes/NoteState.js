import React from "react";
//if we dont import react ,it will be also ok bcs we r not writing any react code here

import { useState } from "react";

import NoteContext from "./noteContext";

const NoteState = (props) => {

    // const host = "http://localhost:5000"
    const host = "https://thevsoni-inotebook.onrender.com"
    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);

    // const [userToken, setUserToken] = useState("");
    //i can use my local storage also to get user token

    //add a note
    const addNote = async (title, description, tag) => {
        //API call
        const url = `${host}/api/notes/addnote/`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();

        // console.log("adding addNote")

        //in client side
        // if (title.length < 3 || description.length < 5) {
        //     alert("title length should be greater than 3 and desc length should be greater than 5");
        // }
        // else {
        //     setNotes(notes.concat(json));
        // }
        setNotes(notes.concat(json));
    }

    //fetch all note
    const getNotes = async () => {
        //API call
        const url = `${host}/api/notes/fetchallnotes/`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                // 'Content-type': 'application/json', i dont need this bcs we r not sending anything so not require
                // 'auth-token': userToken
                'auth-token': localStorage.getItem('token')
            },
        });
        // console.log("fetching all notes")
        const json = await response.json();
        // console.log(json);

        setNotes(json);

    }

    //delete a note
    const deleteNote = async (id) => {
        //API call
        const url = `${host}/api/notes/deletenote/${id}`;
        await fetch(url, {
            method: "DELETE",
            headers: {
                // 'Content-type': 'application/json', i dont need this bcs we r not sending anything so not require
                'auth-token': localStorage.getItem('token')
            },
        });
        // console.log("deleting note")
        // const json = await response.json();
        // console.log(json);

        //in client side
        // console.log("deleting this id = ", id);
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }

    //edit a note

    const editNote = async (id, title, description, tag) => {
        //api call
        const url = `${host}/api/notes/updatenote/${id}`;
        await fetch(url, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        // const json = await response.json();

        //logic to edit in client
        // for (let i = 0; i < notes.length; i++) {
        //     if (notes[i]._id === id) {
        //         notes[i].title = title;
        //         notes[i].description = description;
        //         notes[i].tag = tag;
        //         break;
        //     }
        // }
        // setNotes(notes); //using this,  need to reload the page to see the changes thats why

        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let i = 0; i < notes.length; i++) {
            if (newNotes[i]._id === id) {
                newNotes[i].title = title;
                newNotes[i].description = description;
                newNotes[i].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, getNotes, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;



















// import React from "react";
// //if we dont import react ,it will be also ok bcs we r not writing any react code here

// import { useState } from "react";

// import NoteContext from "./noteContext";

// const NoteState = (props) => {


//     const s1 = {
//         "name": "vishal",
//         "class": "5b"
//     }
//     const [state, setState] = useState(s1);
//     const update = () => {
//         setTimeout(() => {
//             setState({
//                 "name": "soni",
//                 "class": "10b"
//             })
//         }, 2000)
//     }
//     return (
//         // <NoteContext.Provider value={state}> //if use only one thing then
//         <NoteContext.Provider value={{ state, update }}>
//             {/* <NoteContext.Provider value={{ state:state, update:update }}> */}
//             {/* we can write also this  */}
//             {props.children}
//         </NoteContext.Provider>
//     )
// }

// export default NoteState; 