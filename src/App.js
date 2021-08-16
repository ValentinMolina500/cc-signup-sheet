import { render } from '@testing-library/react';
import React, { useState } from 'react';
import "./App.css";
import NameTicker from './components/NameTicker';
import { ANIMALS } from "./constants/animals";
import confetti from 'canvas-confetti';

const COLOR_PALETTE = [
  "#845EC2",
  "#D65DB1",
  "#FF6F91",
  "#FF9671",
  "#FFC75F",
  "#F9F871"
]
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function App() {
  const [people, setPeople] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [animal, setAnimal] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "") {
      return;
    }

    setPeople(people.concat({
      name,
      email,
      animal,
      bg: COLOR_PALETTE[getRandomInt(0, COLOR_PALETTE.length)]
    }));

    /* npm package */
    confetti();

    setName("");
    setEmail("");
    setAnimal(null)
  }

  const renderAnimals = () => {
    return ANIMALS.map((value,index) => {
      return (
      <div onClick={() => setAnimal(ANIMALS[index])} className={value.name === animal?.name ? "animal-grid-item selected" : "animal-grid-item"}>
        <div className="img-container">
          <img src={value.image} />
        </div>
        <span>{value.name}</span>
      </div>
      )
    });
  }

  return (
    <div className="App">                   

      <div className="name-ticker">
        <NameTicker people={people}/>
        
        
      </div>                                                                                                        
      <main className="main-form-container">
        <form onSubmit={onSubmit}>
          <h1 className="form-heading"><i>Coding Cougs</i> Sign Up Sheet</h1>

          <div className="input-wrapper">
            <label className="input-label">Preferred Name</label>
            <input className="input-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}></input>
          </div>

          <div className="input-wrapper">
            <label className="input-label">WSU Email</label>
            <input className="input-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
          </div>

          <div className="input-wrapper">
            <label className="input-label">Choose an animal (optional for fun)</label>
            <div className="image-grid">
              {renderAnimals()}
            </div>
          </div>
          <input class="submit-btn" type="submit" value="Sign Up" />


        </form>
       
      </main>
    </div>
  )
}

export default App;
