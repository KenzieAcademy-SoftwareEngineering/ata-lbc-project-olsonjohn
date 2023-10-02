import React from "react";
import Sheet  from"@mui/joy/Sheet";
import GlobalStyles from '@mui/joy/GlobalStyles';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
// icons
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';


import { openMenu, toggleMenu } from "../util/menuUtils";
  
function MenuSideBar() {
    return (
        <>
         <Sheet
      className="MenuSideBar"
      sx={{
        position: {
          xs: 'fixed',
          md: 'sticky',
        },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--MenuSideBar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    ><GlobalStyles
    styles={{
      ':root': {
        '--FirstSidebar-width': '68px',
      },
    }}
  />
<List size="sm" sx={{ '--ListItem-radius': '6px', '--List-gap': '8px' }}>
        <ListItem>
          <ListItemButton>
            <HomeRoundedIcon  onClick={() => toggleMenu()}/>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemButton selected variant="soft" onClick={() => openMenu()}>
            <DashboardRoundedIcon />
          </ListItemButton>
        </ListItem>
        <Divider />
      </List>
    </Sheet>
        </>
    );
    }
    
export default MenuSideBar