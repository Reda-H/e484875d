import { connect } from "react-redux";
import { getCalls, setUnarchiveCall, unarchiveAllCalls } from "../services/api";
import { Button, List, ListItem } from "@mui/material";
import CallEntry from "./CallEntry.jsx";
import { useEffect, useState } from "react";
import { formatDate, groupCallsByDay } from "../services/utils.js";

const ArchiveFeed = (props) => {
    const [callsPerDay, setCallsPerDay] = useState([]);

    useEffect(() => {
        props.getCalls();
    }, []);

    useEffect(() => {
        setCallsPerDay(groupCallsByDay(props.archives.filter(call => call.is_archived)));
    }, [props.archives]);

    const unarchive = (call) => {
        props.setUnarchiveCall(call.id);
    }

    const handleUnarchiveAllCalls = () => {
        props.unarchiveAllCalls(props.archives.map(call => call.id));
    }

    return (
        <div>
            {callsPerDay.length ? <List
                sx={{
                    width: "100%",
                    maxWidth: 360,
                    position: "relative",
                    overflow: "auto",
                    "& ul": { padding: 0 },
                    boxShadow: "none",
                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
                    paddingBottom: "32px"
                }}
                subheader={<li />}
            >
                {callsPerDay.map((calls, index) => (
                    <div key={index} style={{ paddingBottom: "20px" }}>
                        {calls.length > 0 && <div className="date-container">
                            <span className="date">{formatDate(calls[0].created_at)}</span>
                            <span className="dash-line"></span>
                        </div>}
                        {calls && calls.length > 0 && calls.map((call) => (
                            <ListItem
                                key={call.id}
                                sx={{
                                    padding: 0,
                                    paddingBottom: "10px",
                                    ":last-child": {
                                        paddingBottom: 0,
                                    },
                                    backgroundColor: "transparent",
                                }}
                            >
                                <CallEntry call={call} action={props.toggleDrawer} />
                            </ListItem>
                        ))}
                    </div>
                ))}
            </List> : <div style={{ display: 'flex', width: "auto", minHeight: "100px", justifyContent: "center", alignItems: 'center' }}><h2>No Archived Calls</h2></div>}
            {callsPerDay.length ? <Button sx={{ position: "absolute", bottom: "50px", right: "10px" }} variant='contained' onClick={handleUnarchiveAllCalls}>Unarchive All</Button> : null}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        calls: state.calls,
        archives: state.archives,
        error: state.error
    }
}

export default connect(mapStateToProps, { getCalls, setUnarchiveCall, unarchiveAllCalls })(ArchiveFeed);