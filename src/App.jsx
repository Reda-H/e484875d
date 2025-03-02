import React, { useState } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.js";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import ArchiveFeed from "./components/ArchiveFeed.jsx";
import CallFeed from "./components/CallFeed.jsx";
import { archiveAllCalls, setArchiveCall, setUnarchiveCall } from "./services/api.js";
import { Box, Button, Chip, Divider, Drawer, Stack, Typography } from "@mui/material";
import { formatPhoneNumber } from "./services/utils.js";


const App = (props) => {

  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedCall, setSelectedCall] = useState(null);

  const toggleOpenDrawer = (call = null) => {
    if (openDrawer) {
      setOpenDrawer(false);
      setSelectedCall(null);
      return;
    }

    setOpenDrawer(true);
    setSelectedCall(call);
  }


  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const onArchive = (call) => {
    toggleOpenDrawer();
    if (call.is_archived) props.setUnarchiveCall(call.id)
    else props.setArchiveCall(call.id);
  }

  return (
    <section
      className="container nunito-sans-500"
      style={{ backgroundColor: "#F0F2F6", position: 'relative' }}
    >
      <Header />
      <Switch>
        <Route exact path="/">
          <div className="container-view">
            <CallFeed toggleDrawer={toggleOpenDrawer} />
          </div>
        </Route>
        <Route exact path="/archives">
          <div className="container-view">
            <ArchiveFeed toggleDrawer={toggleOpenDrawer} />
          </div>
        </Route>
      </Switch>
      <Footer />
      <Drawer open={openDrawer} onClose={toggleOpenDrawer} anchor="bottom">
        {selectedCall &&
          <Box sx={{ width: "auto", padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Call Details
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Stack spacing={2}>
              <Typography variant="body1">
                <strong>ID:</strong> {selectedCall.id}
              </Typography>
              <Typography variant="body1">
                <strong>Created At:</strong> {new Date(selectedCall.created_at).toLocaleString()}
              </Typography>
              <Typography component={"span"} variant="body1">
                <strong>Direction:</strong>{" "}
                <Chip
                  label={selectedCall.direction}
                  color={selectedCall.direction === "inbound" ? "primary" : "secondary"}
                  size="small"
                />
              </Typography>
              <Typography variant="body1">
                <strong>From:</strong> {formatPhoneNumber(selectedCall.from)}
              </Typography>
              <Typography variant="body1">
                <strong>To:</strong> {formatPhoneNumber(selectedCall.to)}
              </Typography>
              <Typography variant="body1">
                <strong>Via:</strong> {formatPhoneNumber(selectedCall.via)}
              </Typography>
              <Typography variant="body1">
                <strong>Duration:</strong> {formatDuration(selectedCall.duration)}
              </Typography>
              <Typography component={"span"} variant="body1">
                <strong>Status:</strong>{" "}
                <Chip
                  label={selectedCall.call_type}
                  color={
                    selectedCall.call_type === "missed"
                      ? "error"
                      : selectedCall.call_type === "answered"
                        ? "success"
                        : "warning"
                  }
                  size="small"
                />
              </Typography>
              <Typography component={"span"} variant="body1">
                <strong>Archived:</strong>{" "}
                <Chip
                  label={selectedCall.is_archived ? "Yes" : "No"}
                  color={selectedCall.is_archived ? "success" : "primary"}
                  size="small"
                />
              </Typography>
            </Stack>

            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => onArchive(selectedCall)}
              >
                {selectedCall.is_archived ? "Unarchive Call" : "Archive Call"}
              </Button>
            </Box>
          </Box>
        }
      </Drawer>
    </section>
  );
};

const mapStateToProps = (state) => {
  return ({
    calls: state.calls,
    archives: state.archives,
    error: state.error
  })
}

export default connect(mapStateToProps, { archiveAllCalls, setArchiveCall, setUnarchiveCall })(App);
