import React, { useState } from "react";
import "./App.css";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";

function App() {
  const [data, setData] = useState([]);
  const [navPage, setNavPage] = useState(1);
  const [loader, setLoader] = useState(false);
  return (
    <div>
      <Navbar
        setData={setData}
        navPage={navPage}
        setNavPage={setNavPage}
        setLoader={setLoader}
      />
      <Home
        data={data}
        setNavPage={setNavPage}
        loader1={loader}
        navPage={navPage}
      />
    </div>
  );
}

export default App;
