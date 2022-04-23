import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ForumIcon from '@mui/icons-material/Forum';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { User } from 'firebase/auth';

export function mainListItems(setOpen: Dispatch<SetStateAction<boolean>>, currentUser: User) {
  return (
    <>
      <Link href='/' passHref>
        <ListItemButton onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>
      <Link href={currentUser ? 
        `/community/${currentUser.uid}`
        :
        '/login'
        } passHref>
        <ListItemButton onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
          <ListItemIcon>
            <ForumIcon />
          </ListItemIcon>
          <ListItemText primary="Community" />
        </ListItemButton>
      </Link>
      {/* <Link href='/profile' passHref>
        <ListItemButton onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
      </Link> */}
    </>
  );
}

export const secondaryListItems = (
  <>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </>
);