import { Phone } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Button } from "@mui/material";
import { ArchiveSectionIcon } from "../icons";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom";
import { useState } from "react";

const Footer = () => {
    const location = useLocation();

    const [value, setValue] = useState(location.pathname === '/' ? 0 : 1);
    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        >
            <BottomNavigationAction label="Calls" icon={<Phone />} LinkComponent={Link} to="/" />
            <BottomNavigationAction label="Archives" icon={<ArchiveSectionIcon />} LinkComponent={Link} to="/archives" />
        </BottomNavigation>
    )
};

export default Footer;