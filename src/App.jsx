import React, { useCallback, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom/cjs/react-router-dom.js";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import ArchiveFeed from "./components/ArchiveFeed.jsx";
import CallFeed from "./components/CallFeed.jsx";
import { archiveAllCalls, setArchiveCall, setUnarchiveCall } from "./services/api.js";
import { Box, Button, Chip, Divider, Drawer, Stack, Typography } from "@mui/material";
import { formatCallDuration, formatPhoneNumber } from "./services/utils.js";


const App = (props) => {

  const dispatch = useDispatch();
  const location = useLocation();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedCall, setSelectedCall] = useState(null);

  const toggleOpenDrawer = useCallback((call = null) => {
    setOpenDrawer(prev => !prev);
    setSelectedCall(prev => call ?? null);
  }, []);

  const handleArchive = useCallback(() => {
    if (!selectedCall) return;

    const action = selectedCall.is_archived ? setUnarchiveCall : setArchiveCall;
    dispatch(action(selectedCall.id));
    setOpenDrawer(false);
  }, [selectedCall, dispatch]);

  const getStatusColor = useCallback((callType) => {
    const statusMap = {
      missed: 'error',
      answered: 'success',
      voicemail: 'warning'
    };
    return statusMap[callType] || 'warning';
  }, []);


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
                <strong>Duration:</strong> {formatCallDuration(selectedCall.duration)}
              </Typography>
              <Typography component={"span"} variant="body1">
                <strong>Status:</strong>{" "}
                <Chip
                  label={selectedCall.call_type}
                  color={getStatusColor()}
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
                onClick={() => handleArchive(selectedCall)}
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

export default React.memo(App);
