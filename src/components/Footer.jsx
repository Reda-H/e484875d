import { Phone } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Button } from "@mui/material";
import { ArchiveSectionIcon } from "../icons";
import { Link, useLocation } from "react-router-dom";
import React from 'react';

// Constants for maintainability
const NAV_ITEMS = [
  {
    label: 'Calls',
    icon: <Phone />,
    path: '/',
    ariaLabel: 'Navigate to recent calls'
  },
  {
    label: 'Archives',
    icon: <ArchiveSectionIcon />,
    path: '/archives',
    ariaLabel: 'Navigate to archived calls'
  }
];

const Footer = () => {
  const location = useLocation();
  
  const currentValue = NAV_ITEMS.findIndex(item => item.path === location.pathname);

  return (
    <BottomNavigation
      value={currentValue}
      showLabels
      role="navigation"
      aria-label="Main navigation"
    >
      {NAV_ITEMS.map((item) => (
        <BottomNavigationAction
          key={item.path}
          component={Link}
          to={item.path}
          label={item.label}
          icon={item.icon}
          aria-label={item.ariaLabel}
          role="link"
        />
      ))}
    </BottomNavigation>
  );
};

export default React.memo(Footer);