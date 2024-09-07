import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PlaceIcon from '@mui/icons-material/Place';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse'; 
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useTranslation } from 'react-i18next'; 
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

export default function Sidebar() {
    const { i18n } = useTranslation();  
    const navigate = useNavigate(); 
    const { lang, id } = useParams();  
    console.log("lang", lang);  
  
    const location = useLocation(); 
    const { pathname } = location;
    const { t } = useTranslation(); 
    


    


    const [contactOpen, setContactOpen] = React.useState(false);  

    const changeLanguage = (selectedLang) => {
        i18n.changeLanguage(selectedLang);
        const pathParts = pathname.split('/');
        if (pathParts[1]) {
          pathParts[1] = selectedLang;
        } else { 
          pathParts.splice(1, 0, selectedLang);
        }
        const newPath = pathParts.join('/');
        navigate(newPath);
    };

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleContactClick = () => {
    setContactOpen(!contactOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <List>
            <ListItemButton>
              <ListItemButton sx={{ p: 0 }} component={Link} to={`/${lang || 'en'}/home/${id || 1}`}>
                <ListItemIcon>
                  <Box
                    component="img"
                    src="/logo.png"
                    sx={{ width: 24, height: 24 }}
                    alt="Logo"
                  />
                </ListItemIcon>
              </ListItemButton>
            </ListItemButton>
          </List>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={() => changeLanguage('en')}>EN</Button>
          <Button color="inherit" onClick={() => changeLanguage('th')}>TH</Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>         
          <ListItemButton>
            <ListItemButton sx={{ p: 0 }} component={Link} to={`/${lang || 'en' || 'th'}/home/${id || 1}`}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={t("home")} />
            {/* {contactOpen ? <ExpandLess /> : <ExpandMore />} */}
            </ListItemButton>
          </ListItemButton>
        </List>
        <List>
          <ListItemButton onClick={handleContactClick}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={t("contact")} />
            {contactOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={contactOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} component={Link} to={`/${lang || 'en' || 'th'}/contact`}>
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary={t("list")} />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} component={Link} to={`/${lang || 'en' || 'th'}/create`}>
                <ListItemIcon>
                  <AddBoxIcon />
                </ListItemIcon>
                <ListItemText primary={t("create")} />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
        <List>         
          <ListItemButton>
            <ListItemButton sx={{ p: 0 }} component={Link} to={`/${lang || 'en'}/location`}>
              <ListItemIcon>
                <PlaceIcon />
              </ListItemIcon>
              <ListItemText primary={t("currentlocation")} />
            </ListItemButton>
          </ListItemButton>
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}
