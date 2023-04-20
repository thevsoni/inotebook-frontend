import React from 'react'
import Notes from './Notes'


function Home(props) {


    const { showAlert } = props;
    return (
        <div>
            {/* <Notes showAlert={props.showAlert} /> */}
            {/* or we can use destructure to get showAlert */}

            <Notes showAlert={showAlert} />
        </div>
    )
}

export default Home