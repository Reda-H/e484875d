import { Box, Button, List } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { archiveAllCalls, getCalls } from "../services/api.js";
import { formatDate, getUniqueCalls, groupCallsByDay } from "../services/utils.js";
import EmptyState from "./EmptyState.jsx";
import DayGroup from "./DayGroup.jsx";

const CallFeed = (props) => {
    const dispatch = useDispatch();
    const calls = useSelector(state => getUniqueCalls(state.calls.filter(call => !call.is_archived)));

    const callsPerDay = useMemo(() => groupCallsByDay(calls), [calls]);

    useEffect(() => {
        dispatch(getCalls());
    }, [dispatch]);

    const handleArchiveAll = () => {
        dispatch(archiveAllCalls(calls.map(call => call.id)));
    }

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
                    onClick={handleArchiveAll}
                >
                    Archive All
                </Button>
            )}
        </Box>
    );
}


export default CallFeed;