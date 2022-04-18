import React from "react";

import { ConferenceRoom } from "../../VoxeetReactComponents";

const constraints = {
  audio: true,
  video: false,
};

const videoRatio = {
  width: 1280,
  height: 720,
};

const Conference = ({ conferenceAlias, accessToken, handleOnLeave }) => {
  function refreshAccessToken() {
    return Promise.resolve(accessToken);
  }

  return (
      <ConferenceRoom
        isWidget={false}
        autoJoin
        videoRatio={videoRatio}
        kickOnHangUp
        handleOnLeave={() => {
            console.log("You have been disconnected from the conference.");
            handleOnLeave();
        }}
        handleOnConnect={() => console.log("Connecting to the conference...")}
        constraints={constraints}
        conferenceAlias={conferenceAlias}
        videoCodec={"H264"}
        oauthToken={accessToken && accessToken}
        refreshTokenCallback={accessToken && refreshAccessToken}
      />
    );
};

export default Conference;
