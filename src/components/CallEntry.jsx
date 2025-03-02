import { Box, Button, Card } from "@mui/material";
import { ArchiveIcon, PhoneInbound, PhoneOutbound } from "../icons";

const CallEntry = ({ call }) => {
  const callDirection = {
    inbound: <PhoneInbound />,
    outbound: <PhoneOutbound />,
  };

  const formatCallDuration = (duration) => {
    const seconds = duration % 60;
    const minutes = Math.floor(duration / 60);
    if (minutes) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };

  const formatPhoneNumber = (phoneNumber) => {
    const strPhoneNumber = phoneNumber.toString();
    if (strPhoneNumber.length === 10)
      return `(${strPhoneNumber.slice(0, 3)}) ${strPhoneNumber.slice(
        3,
        6
      )}-${strPhoneNumber.slice(6)}`;
    else if (strPhoneNumber.length === 11)
      return `+${strPhoneNumber.slice(0, 1)} (${strPhoneNumber.slice(
        1,
        4
      )}) ${strPhoneNumber.slice(4, 7)}-${strPhoneNumber.slice(7)}`;
    return strPhoneNumber;
  };

  return (
    <Card
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "none",
        borderRadius: "14px",
      }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "16px",
          padding: "16px",
        }}
      >
        <div
          style={{ minWidth: "42px", display: "flex", alignItems: "center" }}
        >
          {callDirection[call.direction] || <PhoneOutbound />}
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span
              className={`nunito-sans-500 ${call.call_type}`}
              style={{
                textTransform: "capitalize",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              {call.call_type}
            </span>
            <span
              className="nunito-sans-500"
              style={{ fontSize: "14px", fontWeight: "bold" }}
            >
              {formatCallDuration(call.duration)}
            </span>
          </div>
          <span
            className="nunito-sans-500"
            style={{ fontSize: "18px", fontWeight: "bold" }}
          >
            {call.direction === "inbound"
              ? formatPhoneNumber(call.from)
              : formatPhoneNumber(call.to)}
          </span>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="noto-sans-500" style={{ fontSize: "14px" }}>
              on{" "}
              {call.direction === "inbound"
                ? formatPhoneNumber(call.to)
                : formatPhoneNumber(call.from)}
            </span>
          </div>
        </div>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(0, 0, 0, 0.4)",
          width: "100%",
          minHeight: "25px",
          paddingLeft: "16px",
        }}
      >
        <p
          className="noto-sans-500"
          style={{
            fontWeight: "bold",
            marginTop: "8px",
            marginBottom: "8px",
          }}
        >
          via {call.via}
        </p>

        <Button
          variant="contained"
          endIcon={<ArchiveIcon />}
          sx={{
            marginRight: "14px",
            borderRadius: 0,
            backgroundColor: "#fcbc2b",
            "&:hover": {
              backgroundColor: "#DDA72E",
            },
            boxShadow: "none",
          }}
        >
          Archive
        </Button>
      </Box>
    </Card>
  );
};

export default CallEntry;
