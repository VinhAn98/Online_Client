import React from "react";
import { v1 as uuid } from "uuid";
import {Button} from "semantic-ui-react";

const CreateRoom = (props) => {
    function create() {
        const id = uuid();
        props.history.push(`/room/${id}`);
    }

    return (
        <Button onClick={create} className="btn green">Create room</Button>
    );
};

export default CreateRoom;
