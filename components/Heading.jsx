import React from "react";
import { orbitron } from '../app/fonts';




const Heading = ({children}) => {
  return <h1 className={`font-bold text-2xl pb-3 ${orbitron.className}`}>{children}</h1>;
};

export default Heading;
