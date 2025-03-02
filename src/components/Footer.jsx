import { Phone } from "@mui/icons-material";
import { Button } from "@mui/material";
import { ArchiveSectionIcon } from "../icons";
import { Link } from "react-router-dom/cjs/react-router-dom";

const Footer = () => {

    return (
        <footer style={{
            display: "flex",
            justifyContent: "space-around",
            backgroundColor: "#F0F2F6",
            height: "fit-content",
            borderTop: "1px solid rgba(0, 0, 0, 0.4)"
        }}>
            <Link style={{ width: "100%", borderRight: "1px solid rgba(0,0,0,0.4)" }} to="/">
                <Button sx={{
                    color: "white",
                    width: "100%",
                    height: '100%',
                    backgroundColor: "rgba(5, 181, 139, 0.8)",
                    borderRadius: 0,
                    "&:hover": {
                        backgroundColor: "#05B58B"
                    }
                }}
                    startIcon={<Phone />}>
                    Calls
                </Button>
            </Link>
            <Link style={{ width: '100%' }} to="/archives">
                <Button variant="text" sx={{ flex: 1, width: "100%", height: '100%', color: "black" }} startIcon={<ArchiveSectionIcon />}>Archives</Button>
            </Link>
        </footer>
    )
};

export default Footer;