import React from "react";
import {Header, Input,Icon, Button} from 'semantic-ui-react'
import {Content, ButtonInput} from "./StartMeetElements";
import {Link} from "react-router-dom";
import { v1 as uuid } from "uuid";

//this is just a test value
/*const testdata = [
    {key: 'get-link', text: 'Get link meeting', value: 'getLink'}

];*/
const StartMeet = () => {

    return (
        <div>
            <Content>
                <Header as='h1'>Meeting with your friend</Header>
                <Header as='h3'>Please Enjoy </Header>

                <ButtonInput>
                    {/*<Dropdown
                        button
                        className='icon'
                        floating                             // insert after
                        labeled
                        icon='world'
                        options={testdata}
                        search
                        text='Select Language'

                    />*/}
                    <Link to="/room"  >

                        <Button icon labelPosition='left' className="btn green" >
                            <Icon name='plus' />
                            New Meeting
                        </Button>
                    </Link>
                    <Input icon='users' iconPosition='left' placeholder='enter link to join'/>
                </ButtonInput>
            </Content>
        </div>
    );
};

export default StartMeet;