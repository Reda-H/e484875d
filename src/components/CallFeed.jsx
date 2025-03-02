import { Box, List, ListItem } from "@mui/material";
import CallEntry from "./CallEntry.jsx";
import { useEffect, useState } from "react";
import { getCalls } from "../services/api.js";

const CallFeed = () => {
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
        <Box>
            <List
                sx={{
                    width: "100%",
                    maxWidth: 360,
                    position: "relative",
                    overflow: "auto",
                    maxHeight: 526,
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
    );
}

export default CallFeed;