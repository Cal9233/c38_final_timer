import React, { useEffect, useState } from 'react';
import './timer.css';
import {
  MDBInput,
  MDBBtn,
  MDBContainer,
  MDBIcon,
  MDBAnimation
} from 'mdbreact';

const TimerClock2 = () => {
  const [formData, setFormData] = useState(null);
  const [counter, setCounter] = useState(25 * 60);
  const [breaktime, setBreakTime] = useState(0);
  const [worktime, setWorkTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const timeInMinutes = Math.floor(counter / 60);
  const timeInSeconds = Math.floor(counter % 60);

  //adding that 0 on for the seconds
  const makeMeTwoDigits = (n) => {
    return (n < 10 ? '0' : '') + n;
  };

  //sets the session to active
  const toggle = () => {
    setIsActive(!isActive);
  };

  //resets count to 25
  const reset = () => {
    setCounter(25 * 60);
    setIsActive(false);
  };

  //records data from inputs
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  //sets breaktime
  const handleBreakTime = (event) => {
    event.preventDefault();
    setCounter(event.target.break.value * 60);
    setIsActive(true);
  };

  //sets worktime
  const handleWorkTime = (event) => {
    event.preventDefault();
    setCounter(event.target.work.value * 60);
    setIsActive(true);
  };

  useEffect(() => {
    console.log(counter, isActive);
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
      <div id="pomodoro-timer" style={{ marginBottom: '20px' }}>
        <div className="timer-div">
          {' '}
          <h1 className="timer">
            {timeInMinutes}:{makeMeTwoDigits(timeInSeconds)}
          </h1>
        </div>
      </div>
      <MDBAnimation type="pulse" count={7} duration="300ms">
        <MDBBtn outline color="blue" size="md" onClick={toggle}>
          <MDBIcon icon="play" />
          <span>{'  '}</span>
          <MDBIcon icon="pause" />
        </MDBBtn>
        <MDBBtn outline color="orange" size="md" onClick={reset}>
          <MDBIcon icon="stop" />
        </MDBBtn>
      </MDBAnimation>

      <MDBContainer style={{ width: '40%' }}>
        <form onSubmit={handleBreakTime}>
          <MDBInput
            label="Break Time"
            type="text"
            onChange={handleChange}
            name="break"
            outline
          ></MDBInput>
          <MDBBtn
            className="btn-btn-primary"
            type="submit"
            gradient="blue"
            size="sm"
            waves-effect
            valueDefault={breaktime}
          >
            Break
          </MDBBtn>
        </form>
      </MDBContainer>
      <MDBContainer style={{ width: '40%' }}>
        <form onSubmit={handleWorkTime}>
          <MDBInput
            label="Work Time"
            type="text"
            name="work"
            onChange={handleChange}
            outline
          ></MDBInput>
          <MDBBtn
            className="btn-btn-primary"
            type="submit"
            gradient="blue"
            size="sm"
            waves-effect
            valueDefault={worktime}
          >
            POMODORO
          </MDBBtn>
        </form>
      </MDBContainer>

      <div>
        <MDBInput
          label="Session Name"
          onChange={handleChange}
          type="text"
          id="pomodoro-clock-task"
          name="sessionName"
          placeholder="Enter your task..."
          outline
        />
      </div>
    </div>
  );
};

export default TimerClock2;
