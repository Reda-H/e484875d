import { Button, List, ListItem } from "@mui/material";
import CallEntry from "./CallEntry.jsx";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { archiveAllCalls, getCalls, setArchiveCall } from "../services/api.js";
import { formatDate, groupCallsByDay } from "../services/utils.js";

const CallFeed = (props) => {
    const [callsPerDay, setCallsPerDay] = useState([]);

    useEffect(() => {
        props.getCalls();
    }, []);


    useEffect(() => {
        setCallsPerDay(groupCallsByDay(props.calls.filter(call => !call.is_archived)));
    }, [props.calls]);

    const archive = (call) => {
        props.setArchiveCall(call.id);
    }

    const handleArchiveAllCalls = () => {
        props.archiveAllCalls(props.calls.map(call => call.id));
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
                    paddingBottom: "30px"
                }}
                subheader={<li />}
            >
                {callsPerDay.map((calls, index) => (
                    <div key={index} style={{ paddingBottom: "20px" }}>
                        {calls.length && <div className="date-container">
                            <span className="date">{formatDate(calls[0].created_at)}</span>
                            <span className="dash-line"></span>
                        </div>}
                        {calls && calls.filter(call => !call.is_archived).map((call) => (
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
            </List> : <div style={{ display: 'flex', width: "auto", minHeight: "100px", justifyContent: "center", alignItems: 'center' }}><h2>No Calls at the moment ! Come back a bit later :)</h2></div>}
            {callsPerDay.length ? <Button sx={{ position: "absolute", bottom: "50px", right: "10px" }} variant='contained' onClick={handleArchiveAllCalls}>Archive all</Button>
                : null}
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

export default connect(mapStateToProps, { getCalls, setArchiveCall, archiveAllCalls })(CallFeed);