import React from 'react'

function About() {
    return (
        <div>this is about</div>
    )
}

export default About
















// import React, { useContext, useEffect } from "react"
// import noteContext from "../context/notes/noteContext"

// function About() {
//     const a = useContext(noteContext);
//     useEffect(()=>{
//         a.update();
//     },[]);

//     return (
//         <div>
//             {/* This is about {a.name} and studying in class {a.class} */}
//             {/* if i get only state then above code will work */}
//             This is about {a.state.name} and studying in class {a.state.class}
//         </div>
//     )
// }

// export default About