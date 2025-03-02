import { Box, List, ListItem } from "@mui/material";
import CallEntry from "./CallEntry.jsx";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCalls } from "../services/api.js";

const CallFeed = (props) => {

    useEffect(() => {
        props.getCalls();
    }, []);

    return (
        <Box>
            <List
                sx={{
                    width: "100%",
                    maxWidth: 360,
                    position: "relative",
                    overflow: "auto",
                    "& ul": { padding: 0 },
                    boxShadow: "none",
                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
                    gap: "16px",
                }}
                subheader={<li />}
            >
                {props.calls && props.calls.map((call) => (
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
    );
}


const mapStateToProps = (state) => {
    return {
        calls: state.calls,
        archives: state.archives,
        error: state.error
    }
}

export default connect(mapStateToProps, { getCalls })(CallFeed);