import React from "react";
import { useState } from "react";

const Home = () => {
  const [count, setCount] = useState(0);
  

  return (
    <div>
      <h1>Home Page</h1>
      <p>Current count: {count}</p>
      <h3> Yotam 777 </h3>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default Home;
