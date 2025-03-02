import { useDispatch, useSelector } from "react-redux";
import { getCalls, unarchiveAllCalls } from "../services/api";
import { Box, Button, Divider, List, ListItem, Typography } from "@mui/material";
import CallEntry from "./CallEntry.jsx";
import { useEffect, useMemo } from "react";
import { formatDate, getUniqueCalls, groupCallsByDay } from "../services/utils.js";
import EmptyState from "./EmptyState.jsx";
import DayGroup from "./DayGroup.jsx";

const ArchiveFeed = (props) => {

    const dispatch = useDispatch();
    const archives = useSelector(state => getUniqueCalls(state.archives.filter(call => call.is_archived)));

    const callsPerDay = useMemo(() => groupCallsByDay(archives), [archives])

    useEffect(() => {
        dispatch(getCalls());
    }, [dispatch]);

    const handleUnarchiveAll = () => {
        dispatch(unarchiveAllCalls(archives.map(call => call.id)));
    };

    return (
        <Box>
            {callsPerDay.length ? (
                <List sx={{
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
                    subheader={<li />}>
                    {callsPerDay.map((calls) => (
                        <DayGroup key={calls[0].created_at} calls={calls} action={props.toggleDrawer} />
                    ))}
                </List>
            ) : <EmptyState />}

            {Boolean(callsPerDay.length) && (
                <Button
                    sx={{ position: "absolute", bottom: "50px", right: "10px" }}
                    variant="contained"
                    onClick={handleUnarchiveAll}
                >
                    Unarchive All
                </Button>
            )}
        </Box>
    );
}

export default ArchiveFeed;