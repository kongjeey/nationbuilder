import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import { Defaults } from "../settings/defaults/defaults";

function TabContainer(props) {
  return (
    <Typography component="div" style={{marginTop: '24px'}}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
},
  headerTitle: {
    fontFamily: 'Helvetica',
    fontSize: '30px',
    color: '#000000',
    lineHeight: '42px'
  }
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 2
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const headerTabs = [
      {
        header: 'Your account',
        color: 'black',
        link: '/'
      },
      {
        header: 'Contact',
        color: 'black',
        link: '/'
      },
      {
        header: 'Defaults',
        color: 'black',
        link: '/'
      },
      {
        header: 'Political',
        color: 'black',
        link: '/'
      },
      {
        header: 'Domains',
        color: 'black',
        link: '/'
      },
      {
        header: 'Payment processors',
        color: 'black',
        link: '/'
      },
      {
        header: 'Apps',
        color: 'black',
        link: '/'
      },
      {
        header: 'Developer',
        color: 'black',
        link: '/'
      },  {
        header: 'Database',
        color: 'black',
        link: '/'
      },
      {
        header: 'Privacy',
        color: 'black',
        link: '/'
      }
    ];

    return (
      <div style={{width: '100%', height: '147px', backgroundColor: 'white', boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'}}>
        <div className={classes.headerTitle} style={{padding: '20px'}}>{this.props.headerTitle}</div>

        {this.props.headerTitle && this.props.headerTitle === 'Settings' &&
          <div className={classes.root} >
            <Tabs
              value={value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto">
            {headerTabs && headerTabs.map(tab => {
                return (<Tab label={tab.header} style={{outline: 'none', minWidth: 'auto'}} />)
              })
            }
            </Tabs>
          </div>
        }

        {this.props.headerTitle && this.props.headerTitle === 'Settings' && this.state.value === 2 &&
          <TabContainer>
            <Defaults/>
          </TabContainer>
        }
      </div>
    )
  }
}

export default withStyles(styles)(Header);
