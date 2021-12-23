import React, { useState, useEffect } from "react";
import CatHappiness from "../modules/CatHappiness.js";
import Cube from "../modules/Cube.js";

import "../../utilities.css";
import "./Profile.css";

import abcjs from "abcjs";
import "abcjs/abcjs-audio.css";

const Profile = () => {
  const [catHappiness, setCatHappiness] = useState(0);

  useEffect(() => {
    document.title = "Profile Page";
  }, []);

  const incrementCatHappiness = () => {
    setCatHappiness(catHappiness + 1);
  };

  useEffect(() => {
    var abcOptions = { add_classes: true };
    var audioParams = { chordsOff: true };
    var abc = "X:1\nK:D\nDDAA|BBA2|\n";
    var cursorControl = function () {
      this.beatSubdivisions = 2;
      this.onStart = function () {
        console.log("The tune has started playing.");
      };
      this.onFinished = function () {
        console.log("The tune has stopped playing.");
      };
      this.onBeat = function (beatNumber) {
        console.log("Beat " + beatNumber + " is happening.");
      };
      this.onEvent = function (event) {
        console.log("An event is happening", event);
      };
    };
    if (abcjs.synth.supportsAudio()) {
      var synthControl = new abcjs.synth.SynthController();
      synthControl.load("#audio", cursorControl, {
        displayLoop: true,
        displayRestart: true,
        displayPlay: true,
        displayProgress: true,
        displayWarp: true,
      });

      var visualObj = abcjs.renderAbc("paper", abc, abcOptions);
      var createSynth = new abcjs.synth.CreateSynth();
      createSynth
        .init({ visualObj: visualObj[0] })
        .then(function () {
          synthControl
            .setTune(visualObj[0], false, audioParams)
            .then(function () {
              console.log("Audio successfully loaded.");
            })
            .catch(function (error) {
              console.warn("Audio problem:", error);
            });
        })
        .catch(function (error) {
          console.warn("Audio problem:", error);
        });
    } else {
      document.querySelector("#audio").innerHTML = "Audio is not supported in this browser.";
    }
  }, []);

  return (
    <>
      <div
        className="Profile-avatarContainer"
        onClick={() => {
          incrementCatHappiness();
        }}
      >
        <div className="Profile-avatar" />
      </div>
      <h1 className="Profile-name u-textCenter">Vincent Huang</h1>
      <hr className="Profile-line" />
      <div className="u-flex">
        <div className="Profile-subContainer u-textCenter">
          <h4 className="Profile-subTitle">About Me</h4>
          <div id="profile-description">uwu</div>
        </div>
        <div className="Profile-subContainer u-textCenter">
          <Cube />
        </div>
      </div>
      <div className="Profile-subContainer u-textCenter">
        <div id="paper"></div>
        <div id="audio"></div>
      </div>
    </>
  );
};

export default Profile;
