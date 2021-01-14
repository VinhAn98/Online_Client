import React from "react";
import { Button, Header, Modal } from 'semantic-ui-react';

const ShowModal = ({openModal,data,answer}) => {

    const {userInfo} = data;
   // console.log(userInfo);
    if(userInfo === undefined){
        return null;
    }else {
        return(

            <Modal
                style={{height:'auto',top:'auto',left:'auto',bottom:'auto',right:'auto'}}
                open={openModal}

            >
                <Modal.Header>User Want To Join</Modal.Header>
                <Modal.Content >
                    <Modal.Description>
                        <Header>User  {userInfo.name}  want to join</Header>

                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => answer(false)}>
                        Deny
                    </Button>
                    <Button
                        content="Alow"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={() => answer(true)}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        );
    }
};

export default ShowModal;