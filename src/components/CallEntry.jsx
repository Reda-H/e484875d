import { Box, Button, Card, Divider, Typography } from "@mui/material";
import { ArchiveIcon, PhoneInbound, PhoneOutbound } from "../icons";
import { formatCallDuration, formatPhoneNumber } from "../services/utils";
import React from "react";

const CallEntry = ({ call, action }) => {
  const callDirection = {
    inbound: <PhoneInbound />,
    outbound: <PhoneOutbound />,
  };

  const getMainNumber = () => {
    return call.direction === "inbound"
      ? formatPhoneNumber(call.from)
      : formatPhoneNumber(call.to);
  }

  const getRecipientNumber = () => {
    return "on " + call.direction === "inbound"
      ? formatPhoneNumber(call.to)
      : formatPhoneNumber(call.from)
  }

  return (
    <Card
      sx={{
        width: "100%",
        boxShadow: "none",
        borderRadius: 2,
        position: "relative",
      }}
    >
      <Box width="100%">
        <Box
          display="flex"
          gap={2}
          px={1.5}
          pt={1}
          pb={.5}
        >
          <Box
            minWidth={42}
            display="flex"
            alignItems="center"
          >
            {callDirection[call.direction] || <PhoneOutbound />}
          </Box>

          <Box width="100%" display="flex" flexDirection="column">
            <Box display="flex" justifyContent="space-between">
              <Typography
                variant="body2"
                fontWeight="bold"
                textTransform="capitalize"
                className={call.call_type}
              >
                {call.call_type}
              </Typography>
              <Typography variant="body2" fontWeight={600} m={0}>
                {formatCallDuration(call.duration)}
              </Typography>
            </Box>

            <Typography variant="h6" fontWeight={800}>
              {getMainNumber()}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {getRecipientNumber()}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ opacity: 0.4 }} />

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pl={2}
        >
          <Typography variant="body2" fontWeight={600}>
            via {formatPhoneNumber(call.via)}
          </Typography>

          <DetailButton action={action} call={call} />
        </Box>
      </Box>
    </Card>
  );
};

const DetailButton = ({ action, call }) => (
  <Button
    variant="contained"
    endIcon={<ArchiveIcon />}
    sx={{
      borderRadius: 0,
      backgroundColor: "rgb(5, 175, 181)",
      "&:hover": {
        backgroundColor: "#05B58B",
      },
      boxShadow: "none",
      paddingTop: "4px",
      paddingBottom: "3px",
    }}
    onClick={() => action(call)}
  >
    Details
  </Button>
)

export default React.memo(CallEntry);
