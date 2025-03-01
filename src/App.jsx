import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import Header from "./Header.jsx";
import { getCalls } from "./services/api.js";

const App = () => {
  const [calls, setCalls] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response = await getCalls();
        setCalls(response.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCalls();
  }, []);

  return (
    <div className="container">
      <Header />
      <div className="container-view">
        <ul>
          {calls.map((call) => (
            <li>{call.from}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
