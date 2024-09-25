import { isDisabled } from "@testing-library/user-event/dist/utils";
import { useState, useEffect } from "react";

const Counter = () => {
  const [count, setCount] = useState(5);
  const [inputText, setInputText] = useState(1);
  const [message, setMessage] = useState();
  const [min, setMin] = useState(5);
  const [max, setMax] = useState(100);

  let increment = () => {
    let finalNumberAdd = count + inputText;
    if (finalNumberAdd <= max) {
      setCount(finalNumberAdd);
      setMessage("");
      ding();
    } else {
      setMessage(`Not Above ${max}`);
    }
  };

  let decrement = () => {
    let finalNumber = count - inputText;
    if (finalNumber >= min) {
      setCount(finalNumber);
      setMessage("");
      ding();
    } else {
      setMessage(`Not Below ${min}`);
    }
  };

  let resetBtn = () => {
    setCount(5);
    setMessage("");
    ding();
  };

  let type = (e) => {
    let text = e.target.value;
    setInputText(Number(text));
    localStorage.setItem("previousCount", inputText);
  };

  const minimum = (e) => {
    let text = e.target.value;
    setMin(Number(text));
    console.log(min);
  };

  const maximum = (e) => {
    let text = e.target.value;
    setMax(Number(text));
    console.log(max);
  };

  useEffect(() => {
    let inputPreviousShow = localStorage.getItem("previousCount");
    setInputText(inputPreviousShow);
  }, []);

  function handleKeyUp(event) {
    if (event.key === "ArrowUp") {
      increment();
      // Perform an action when the Enter key is pressed
    }
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowDown") {
      decrement();
      // Perform an action when the Enter key is pressed
    }
  }

  function handleKeyReset(event) {
    if (event.key === "r") {
      resetBtn();
      // Perform an action when the Enter key is pressed
    }
  }

  function ding() {
    var sound = new Audio(
      "https://www.soundjay.com/misc/sounds/small-bell-ring-01a.mp3"
    );
    sound.play();
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col mt-5">
          <h1 className="text-center text-5xl mb-6">Counter</h1>
          <h2 className="text-center text-2xl mb-6">
            This is a custom counter{" "}
          </h2>
          <h1
            className="text-center text-3xl mb-6"
            style={{ color: count < 10 ? "red" : "blue" }}
          >
            {count}
          </h1>
          <label className="text-left text-1xl mb-6">
            Write Number to increase/decrease
          </label>
          <input
            className="text-center text-2xl mb-6 border"
            type="number"
            onChange={type}
            value={inputText}
            min={1}
            max={95}
          />
          <label className="text-left text-1xl mb-6">
            Write Minimum Limit for Counter To Decrease
          </label>
          <input
            type="text"
            className="text-center text-2xl mb-6 border"
            placeholder="Min Limit"
            onChange={minimum}
          />
          <label className="text-center text-1xl mb-6">
            Write Maximum Limit for Counter To Increase
          </label>
          <input
            type="text"
            className="text-center text-2xl mb-6 border"
            placeholder="Max Limit"
            onChange={maximum}
          />

          <div className="flex gap-5 justify-center items-center mb-6">
            <button
              className="border p-2 cursor-pointer bg-black text-white rounded-lg hover:bg-sky-700"
              onClick={increment}
              disabled={count === 100}
              onKeyDown={handleKeyUp}
            >
              Increment
            </button>

            <button
              className="border p-2 cursor-pointer bg-black text-white rounded-lg hover:bg-sky-700"
              onClick={decrement}
              disabled={count === 5}
              onKeyDown={handleKeyDown}
            >
              Decrement
            </button>

            <button
              className="border p-2 cursor-pointer bg-black text-white rounded-lg hover:bg-sky-700"
              onClick={resetBtn}
              onKeyDown={handleKeyReset}
            >
              Reset
            </button>
          </div>
          <h2 className="text-center text-1xl mb-6 text-slate-600">
            {message}
          </h2>
        </div>
      </div>
    </>
  );
};

export default Counter;
