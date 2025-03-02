import { connect, useSelector } from "react-redux";
import { getArchives, setUnarchiveCall } from "../services/api";
import { List, ListItem } from "@mui/material";
import CallEntry from "./CallEntry.jsx";
import { useEffect } from "react";

const ArchiveFeed = (props) => {

    useEffect(() => {
        props.getArchives();
    }, []);

    const unarchive = (call) => {
        props.setUnarchiveCall(call.id);
    }

    return (
        <div>
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
                {props.archives && props.archives.map((call) => (
                    <ListItem
                        key={call.id}
                        sx={{
                            padding: 0,
                            paddingBottom: "16px",
                            backgroundColor: "transparent",
                        }}
                    >
                        <CallEntry call={call} archived action={unarchive} />
                    </ListItem>
                ))}
            </List>
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

export default connect(mapStateToProps, { getArchives, setUnarchiveCall })(ArchiveFeed);