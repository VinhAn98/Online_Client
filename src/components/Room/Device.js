import React, {useEffect, useState} from "react";
import {Dropdown, Label} from "semantic-ui-react";
import _ from 'lodash';

const Device = ({chatBox, onSelectMic, onSelectCamera}) => {
    const [mics, setMics] = useState([]);
    const [cameras, setCameras] = useState([]);
    const [speakers, setSpeakers] = useState([]);


    useEffect(() => {
        getDevice()
    }, []);


    const getDevice = () => {
        navigator.mediaDevices.enumerateDevices()
            .then((devices) => {
                for (let d of devices) {

                    if (d.kind === 'videoinput') {
                        setCameras(camera => [...camera, d]);

                    } else if (d.kind === 'audioinput') {
                        setMics(mic => [...mic, d]);



                    } else {
                        setSpeakers(speaker => [...speaker, d]);

                    }
                }


            })
            .catch(function (err) {
                console.log(err.name + ": " + err.message);
            });
    };


    return (
        <div className="device-area" style={{display: chatBox ? 'none' : 'block'}}>

            <div>
                <Label> Mic </Label>
                <select
                    style={{marginTop: '10px', width: '100%'}}
                    placeholder='Choose an option'

                    onChange={(event) => onSelectMic(event.target.value)}

                >
                    {
                        _.map(mics, (mic) => {
                            return(
                                <option key={mic.deviceId} value={mic.deviceId} > {mic.label} </option>
                            );
                        })
                    }
                </select>
            </div>
            <br/>
            <div>
                <Label> Camera </Label>

                <select
                    style={{marginTop: '10px', width: '100%'}}
                    placeholder='Choose an option'

                    onChange={(event) => onSelectCamera(event.target.value)}
                >
                    {
                        _.map(cameras, (camera) => {
                            return(
                                <option key={camera.deviceId} value={camera.deviceId} > {camera.label} </option>
                            );
                        })
                    }
                </select>
            </div>
        </div>
    );
};

export default Device;