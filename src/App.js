import { render } from "@testing-library/react";
import React, { useState } from "react";
import "./App.css";
import NameTicker from "./components/NameTicker";
import { ANIMALS } from "./constants/animals";
import confetti from "canvas-confetti";

const COLOR_PALETTE = [
  "#845EC2",
  "#D65DB1",
  "#FF6F91",
  "#FF9671",
  "#FFC75F",
  "#F9F871",
];
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function App() {
  const [people, setPeople] = useState([]);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);

  const [animal, setAnimal] = useState("");

  const validate = () => {
    let hasError = false;

    if (name === "") {
      setNameError("Please enter a name!");
      hasError = true;
    } else {
      setNameError(null);
    }

    if (email === "") {
      setEmailError("Please enter an email!");
      hasError = true;
    } else if (!email.trim().endsWith("@wsu.edu")) {
      hasError = true;
      setEmailError("Please enter a WSU email!");
    } else {
      setEmailError(null);
    }

    return !hasError;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    /* Handle input validation */
    if (!validate()) {
      return;
    }

    setPeople(
      people.concat({
        name,
        email,
        animal,
        bg: COLOR_PALETTE[getRandomInt(0, COLOR_PALETTE.length)],
      })
    );

    /* npm package */
    confetti();

    setName("");
    setEmail("");
    setAnimal(null);
  };

  const renderAnimals = () => {
    return ANIMALS.map((value, index) => {
      return (
        <div
          onClick={() => setAnimal(ANIMALS[index])}
          className={
            value.name === animal?.name
              ? "animal-grid-item selected"
              : "animal-grid-item"
          }
        >
          <div className="img-container">
            <img src={value.image} />
          </div>
          <span>{value.name}</span>
        </div>
      );
    });
  };

  const handleNameOnChange = (e) => {
    if (nameError) {
      setNameError(null);
    }

    setName(e.target.value);
  };
  const handleEmailOnChange = (e) => {
    if (emailError) {
      setEmailError(null);
    }

    setEmail(e.target.value);
  };

  return (
    <div className="App">
      <div className="name-ticker">
        <NameTicker people={people} />
        {people.length > 0 && (
          <div className="name-ticker-msg-container">
            <span className="name-ticker-msg">Current People Signed Up</span>
            <span className="live-span">LIVE</span>
          </div>
        )}
      </div>
      <main className="main-form-container">
        <form onSubmit={onSubmit}>
          <h1 className="form-heading">
            <i>Coding Cougs</i> Sign Up Sheet
          </h1>

          <div className="input-wrapper">
            <label htmlFor="name" className="input-label">Preferred Name</label>
            <input
              className={`input-control ${nameError ? "has-error" : ""}`}
              placeholder="Name"
              value={name}
              id="name"
              onChange={handleNameOnChange}
            ></input>
            {nameError && <p className="input-error-text">{nameError}</p>}
          </div>

          <div className="input-wrapper">
            <label htmlFor="email" className="input-label">WSU Email</label>
            <input
              className={`input-control ${emailError ? "has-error" : ""}`}
              placeholder="Email"
              value={email}
              id="email"
              onChange={handleEmailOnChange}
            ></input>
            {emailError && <p className="input-error-text">{emailError}</p>}
          </div>

          <div className="input-wrapper">
            <label className="input-label">
              Choose an animal (optional for fun)
            </label>
            <div className="image-grid">{renderAnimals()}</div>
          </div>
          <input class="submit-btn" type="submit" value="Sign Up" />
        </form>
      </main>
    </div>
  );
}

export default App;
