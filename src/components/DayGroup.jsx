import { Box, Divider, ListItem, Typography } from "@mui/material";
import CallEntry from "./CallEntry.jsx";
import { formatDate } from "../services/utils";

const DayGroup = ({ calls, action }) => (
    <Box pb={2.5}>
        <Box className="date-container">
            <Typography variant="subtitle2">
                {formatDate(calls[0].created_at)}
            </Typography>
            <Divider sx={{ flexGrow: 1, ml: 2 }} />
        </Box>
        {calls.map((call) => (
            <ListItem key={call.id} sx={{ py: 1, px: 0, "&:first-of-type": { pt: 0 }, "&:last-of-type": { pb: 0 } }}>
                <CallEntry call={call} action={action} />
            </ListItem>
        ))}
    </Box>
);

export default DayGroup;