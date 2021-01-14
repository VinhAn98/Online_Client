import React, {useEffect, useRef} from "react";
import styled from "styled-components";


const PartnerVideo = styled.video`
    height:250px;
    width:100%
`;

const PartnerVideos = ({peer}) => {
    const ref = useRef();
    console.log(peer);
    useEffect(() => {

        peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, [peer]);

    return (
        <PartnerVideo playsInline autoPlay muted ref={ref}/>
    );
};

export default PartnerVideos;