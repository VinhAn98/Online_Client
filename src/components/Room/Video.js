import React from "react";
import styled from "styled-components";

const StyledVideo = styled.video`
    height: 500px;
    width: 100%;
`;
const Video = ({userVideo}) => {
  return (
      <StyledVideo
          className="video-border"
          muted
          ref={userVideo}
          autoPlay
          playsInline
          style={{position: 'relative'}}
      >
          <div style={{position:'absolute'}}>
            1
          </div>
      </StyledVideo>
  );
};

export default Video;