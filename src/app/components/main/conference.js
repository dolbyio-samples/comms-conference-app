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

  const token = accessToken.split('.')[1];
  const jwt = JSON.parse(window.atob(token));
  const accessTokenExpiration = new Date(jwt.exp * 1000);
  if (accessTokenExpiration.getTime() <= new Date().getTime()) {
      return <div>The access token you have provided has expired.</div>;
  }

  console.group('Access Token');
  console.log(`\x1B[94mInitialize the SDK with the Access Token: \x1B[m${accessToken}`);
  console.log(`Access Token Expiration: ${accessTokenExpiration}`);
  console.groupEnd();

  // Set the web browser URL with the Alias and Access Token
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set('token', accessToken);
  urlParams.set('alias', conferenceAlias);
  window.history.replaceState("", "", window.location.href.replace(window.location.search, '') + '?' + urlParams);

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
