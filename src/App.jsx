import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import Header from "./Header.jsx";
import { getCalls } from "./services/api.js";

import Button from "@mui/material/Button";
import { Box, Link, List, ListItem } from "@mui/material";
import CallEntry from "./components/CallEntry.jsx";

const App = () => {
  const [calls, setCalls] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response = await getCalls();
        setCalls(
          response.data.sort(
            (a, b) =>
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
          )
        );
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCalls();
  }, []);

  return (
    <div
      className="container nunito-sans-500"
      style={{ backgroundColor: "#F0F2F6" }}
    >
      <Header />
      <div className="container-view">
        <Box>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              position: "relative",
              overflow: "auto",
              maxHeight: 546,
              "& ul": { padding: 0 },
              boxShadow: "none",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              gap: "16px",
            }}
            subheader={<li />}
          >
            {calls.map((call) => (
              <ListItem
                key={call.id}
                sx={{
                  padding: 0,
                  paddingBottom: "16px",
                  backgroundColor: "transparent",
                }}
              >
                <CallEntry call={call} />
              </ListItem>
            ))}
          </List>
        </Box>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
