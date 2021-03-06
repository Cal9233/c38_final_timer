import React, { useEffect, useState, useContext } from 'react';
import './timer.css';
import {
  MDBInput,
  MDBBtn,
  MDBContainer,
  MDBIcon,
  MDBAnimation,
  MDBRow
} from 'mdbreact';
import { AppContext } from '../context/AppContext';
import TimerPostModal from './TimerPostModal';
import { motion } from 'framer-motion';
import Solemn from '../Assets/solemn.mp3';
import GetStarted from '../components/GetStarted';

const TimerClock = () => {
  const {
    currentUser,
    adder,
    setAdder,
    setTimeStampEnd,
    setTimerDuration,
    modal,
    setModal,
    setTimeStampStart
  } = useContext(AppContext);
  const [counter, setCounter] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [timestamp, setTimestamp] = useState(false);
  const [breakTime, setBreakTime] = useState(false);
  const [animationState, setAnimationState] = useState('paused');
  const [timeDuration, setTimeDuration] = useState('');
  const [key, setKey] = useState('');

  const timeInMinutes = Math.floor(counter / 60);
  const timeInSeconds = Math.floor(counter % 60);

  const svgVariants = {
    hidden: { rotate: -180 },
    visible: {
      rotate: 0,
      transition: { duration: 1 }
    }
  };

  const audio = new Audio(Solemn);
  if (isActive && counter === 0) {
    audio.play();
  }

  const toggle = () => {
    if (timestamp === false) {
      setTimestamp(true);
      let time = new Date().getTime();

      console.log(timeDuration);
      setTimeStampStart(time);
      setAdder(time);
    }
    setIsActive(!isActive);
    setTimeDuration(counter * 1.799);
    animation();
  };

  const animation = () => {
    if (isActive === false) {
      setAnimationState('running');
      console.log('animation is running');
    } else {
      setAnimationState('paused');
      console.log('animation has been paused');
    }
  };

  const reset = () => {
    setCounter(25 * 60);
    setIsActive(false);
    let time2 = Date.now();
    setTimeStampEnd(time2);
    let durationInMins = Math.abs(time2 - adder) / 60000;
    setTimerDuration(durationInMins);
    setTimestamp(false);
    setAnimationState('paused');
    setKey((preKey) => preKey + 1);
    if (currentUser && breakTime === false) {
      setModal(!modal);
    }
  };

  const handleBreakTime = (event) => {
    event.preventDefault();
    setCounter(event.target.break.value * 60);
    setBreakTime(true);
    setTimerValues();
  };

  const handleWorkTime = (event) => {
    event.preventDefault();
    setCounter(event.target.work.value * 60);
    setBreakTime(false);
    setTimerValues();
  };

  const setTimerValues = () => {
    console.log("it's break time!");
    setTimeDuration(counter * 1.799);
    console.log('timer duration:' + timeDuration);
    setIsActive(false);
    setAnimationState('paused');
    setKey((preKey) => preKey + 1);
  };

  const makeMeTwoDigits = (n) => {
    return (n < 10 ? '0' : '') + n;
  };

  useEffect(() => {
    if (isActive) {
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    } else if (!isActive && counter !== 0) {
      clearInterval(counter);
    }
  }, [counter, isActive]);

  return (
    <div className="App">
      <div id="clock-timer">
        <div style={{ marginBottom: '-5%' }}>
          <motion.svg
            width="400"
            height="300"
            variants={svgVariants}
            initial="hidden"
            animate="visible"
          >
            <path
              style={{
                animationName: 'dash',
                animationDirection: 'normal',
                animationTimingFunction: 'linear',
                animationDuration: `${timeDuration}s`,
                WebkitAnimationPlayState: `${animationState}`
              }}
              key={key}
              transform="rotate(90 200 200)"
              fill="none"
              d="
        M 200, 200
        m -90, 0
        a 90,90 0 1,0 180,0
        a 90,90 0 1,0 -180,0
        "
            />
            <path
              className={counter > 0 ? 'circle2' : 'timeup'}
              d="
        M 200, 200
        m -90, 0
        a 90,90 0 1,0 180,0
        a 90,90 0 1,0 -180,0
        "
            />
            <text
              x="135"
              y="220"
              fill="white"
              fontSize="40pt"
              fontWeight="bold"
            >
              {' '}
              {makeMeTwoDigits(timeInMinutes)}:{makeMeTwoDigits(timeInSeconds)}
            </text>
          </motion.svg>
        </div>
      </div>
      <MDBAnimation type="pulse" count={7} duration="300ms">
        <MDBBtn outline color="blue" size="md" onClick={toggle}>
          <MDBIcon icon="play" />
          <span>{'  '}</span>
          <MDBIcon icon="pause" />
        </MDBBtn>
        <MDBBtn outline color="orange" size="md" onClick={reset}>
          <MDBIcon icon="check-square" />
        </MDBBtn>
      </MDBAnimation>

      <MDBContainer className=" flex-d-col">
        <div className="form">
          <form onSubmit={handleWorkTime}>
            <MDBRow className="d-flex align-items-center ">
              <MDBInput
                label="Work Time"
                type="number"
                name="work"
                outline
              ></MDBInput>
              <MDBBtn
                className="rounded btn-btn-primary waves-effect"
                type="submit"
                gradient="peach"
                style={{ height: '40px', marginBottom: '15px' }}
              >
                SET WORK
              </MDBBtn>
            </MDBRow>
          </form>
        </div>

        <div className="forms">
          <form onSubmit={handleBreakTime}>
            <MDBRow className="d-flex align-items-center">
              <MDBInput
                label="Break Time"
                type="number"
                name="break"
                outline
              ></MDBInput>
              <MDBBtn
                className="rounded btn-btn-primary waves-effect"
                type="submit"
                gradient="blue"
                style={{ height: '40px', marginBottom: '15px' }}
              >
                SET BREAK
              </MDBBtn>
            </MDBRow>
          </form>
        </div>
        <GetStarted />
      </MDBContainer>
      <div>
        <TimerPostModal />
      </div>
    </div>
  );
};

export default TimerClock;
