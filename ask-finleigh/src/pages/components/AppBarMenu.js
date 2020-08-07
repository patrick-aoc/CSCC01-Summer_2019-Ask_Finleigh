import React, { Component } from "react";

import { AppBar, Toolbar, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Grid } from '@material-ui/core';

import "../../styles/components/AppBarMenu.css"

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default class AppBarMenu extends Component {
    handleChange = event => {
        this.props.handleChange(event);
    }

    render() {
        return (
            <AppBar color="primary">
                <Toolbar
                    style={styles.toolbar.style}
                >
                    <Grid container alignItems="center" justify="space-between" spacing={3}>
                        <Grid item>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="Menu"
                                onClick={this.props.toggleDrawer('left', true)}
                            ><MenuIcon
                                    style={styles.icons.style}
                                />
                            </IconButton>
                        </Grid>

                        <Grid item>
                            <Typography
                                variant="h6"
                                style={{ position: 'fixed', left: '75px', top: '16px', fontSize: '20px', flexShrink: '2' }}>
                                {this.props.currentSelection}
                            </Typography>
                        </Grid>

                        <Grid item className="options">
                            <FormControl style={{ paddingTop: '5px', flexShrink: '2' }} component="fieldset">
                                <FormLabel
                                    style={styles.radioGroupLabel.style}
                                >I want my queries to go to...
                                            </FormLabel>
                                <RadioGroup
                                    aria-label="position"
                                    name="position"
                                    value={this.props.selection}
                                    onChange={this.handleChange} row>
                                    <FormControlLabel
                                        value="INDEXER"
                                        control={<Radio color="secondary" />}
                                        label={<Typography type="h4" style={styles.radioGroup.style}>Finleigh</Typography>}
                                        labelPlacement="end"
                                    />
                                    <FormControlLabel
                                        value="WATSON"
                                        control={<Radio color="secondary" />}
                                        label={<Typography type="h4" style={styles.radioGroup.style}>Watson</Typography>}
                                        labelPlacement="end"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        );
    }
}

// Constants for Style
const styles = {
    icons: {
        style: {
            width: '27px',
            height: '27px'
        },
        exit: {
            width: '27px',
            height: '27px',
            color: 'red'
        }
    },

    radioGroupLabel: {
        style: {
            color: '#FFF',
            fontSize: '15px'
        }
    },

    radioGroup: {
        style: {
            color: '#FFF',
            fontSize: '17px'
        }
    },

    toolbar: {
        style: {
            spacing: '2',
            height: '10%',
            flexGrow: '1'
        }
    }
}
// ====================
