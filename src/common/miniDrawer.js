import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Header from '../common/header';
import { Defaults } from '../settings/defaults/defaults';
import NationBuilderMark from '../assets/img/NationBuilderMark.png';
import comboChart from '../assets/img/comboChart.png';
import people from '../assets/img/people.png';
import webDesign from '../assets/img/webDesign.png';
import chat from '../assets/img/chat.png';
import creditCard from '../assets/img/creditCard.png';
import flowChart from '../assets/img/flowChart.png';
import tune from '../assets/img/tune.png';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
    height: '-webkit-fill-available'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: 'black'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: '-webkit-fill-available',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    width: '100%',
    // padding: theme.spacing.unit * 3,
  },
  span: {
    color: 'white'
  }
});

class MiniDrawer extends React.Component {
  state = {
    open: false,
    clickedItemName: 'Settings',
    selectedHeaderTitle: 'Settings'
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
    console.log('opening')
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
    console.log('closing')
  };

  onClickDrawerItem = (itemName) => {
    if (itemName === 'Settings') {
      this.setState({clickedItemName: 'Settings'})
    } else {
      this.setState({clickedItemName: ''})
    }
    this.setState({selectedHeaderTitle: itemName})
  };

  render() {
    const { classes, theme } = this.props;
    const drawerList = ['Dashboard', 'People', 'Website', 'Communication', 'Finances', 'Nations', 'Settings'];
    const imageSrc = [NationBuilderMark, comboChart, people, webDesign, chat, creditCard, flowChart, tune];

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
          onMouseEnter={this.handleDrawerOpen}
          onMouseLeave={this.handleDrawerClose}>
          <List style={{flex: 1, backgroundColor: 'black'}}>
            {drawerList.map((text, index) => (
              <ListItem button key={text} onClick={() => this.onClickDrawerItem(text)}>

                <ListItemIcon>
                    <img src={imageSrc[index]}/>
                </ListItemIcon>

                <ListItemText primary={<span style={{color: 'white'}}>{text}</span>}/>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          {/*<div className={classes.toolbar} />*/}
          <Header headerTitle={this.state.selectedHeaderTitle} />
          {/*{this.state.clickedItemName &&*/}
            {/*<Defaults/>*/}
          {/*}*/}
        </main>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);