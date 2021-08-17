import React from "react";
import "./NameTicker.css";

import { Palette } from "react-palette";

export default function NameTicker(props) {
  const { people } = props;

  const renderHex = (name, fill, animal, bg) => (
    <div className="svg-container">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        className="name-hexagon-svg"
        width="148"
        height="170"
        viewbox="0 0 147.22431864335456 170"
      >
        <path
          fill="#fff"
          d="M63.21985447626402 5.999999999999999Q73.61215932167728 0 84.00446416709055 5.999999999999999L136.8320137979413 36.5Q147.22431864335456 42.5 147.22431864335456 54.5L147.22431864335456 115.5Q147.22431864335456 127.5 136.8320137979413 133.5L84.00446416709055 164Q73.61215932167728 170 63.21985447626402 164L10.392304845413264 133.5Q0 127.5 0 115.5L0 54.5Q0 42.5 10.392304845413264 36.5Z"
        ></path>
      </svg>
      <span className="svg-name">{name}</span>

      {animal && (
        <div className="animal-container" style={{ background: bg }}>
          <img className="animal-img" src={animal.image} />
        </div>
      )}
    </div>
  );

  // const renderHex2 = (name, fill, animal, bg) => (
  //   // In your render...
  //   <Palette src={animal.image}>
  //     {({ data, loading, error }) => {
  //       console.log(data);

  //       return (
  //       <div className="svg-container">
  //         <svg
  //           version="1.1"
  //           xmlns="http://www.w3.org/2000/svg"
  //           className="name-hexagon-svg"
  //           width="148"
  //           height="170"

  //           viewBox="0 0 147.22431864335456 170"
  //         >
  //           <path
  //             fill="#fff"
  //             d="M63.21985447626402 5.999999999999999Q73.61215932167728 0 84.00446416709055 5.999999999999999L136.8320137979413 36.5Q147.22431864335456 42.5 147.22431864335456 54.5L147.22431864335456 115.5Q147.22431864335456 127.5 136.8320137979413 133.5L84.00446416709055 164Q73.61215932167728 170 63.21985447626402 164L10.392304845413264 133.5Q0 127.5 0 115.5L0 54.5Q0 42.5 10.392304845413264 36.5Z"
  //           ></path>
  //         </svg>
  //         <span className="svg-name">{name}</span>

  //         {animal && (
  //           <div className="animal-container" style={{ background: data.vibrant}}>
  //             <img className="animal-img" src={animal.image} />
  //           </div>
  //         )}
  //       </div>
  //       )}}
  //   </Palette>
  // );

  const renderHexagons = () => {
    const jsx = [];

    for (const person of people) {
      const { name, animal, bg } = person;

      // jsx.push(renderHex(name, "#fff", animal, bg));
      jsx.push(renderHex(name, "#fff", animal, animal?.bgColor));
    }

    return jsx;
  };
  return <div className="NameTicker-container">{renderHexagons()}</div>;
}
