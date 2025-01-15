import React from "react";
import { Tooltip, IconButton, withStyles, AddIcon,  } from "@mui/material";

const defaultToolbarStyles = {
  iconButton: {
  },
};

class CustomTableToolbar extends React.Component {
  
  handleClick = () => {
    console.log("clicked on icon!");
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Tooltip title={"custom icon"}>
          <IconButton className={classes.iconButton} onClick={this.handleClick}>
            <AddIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }

}

export default withStyles(defaultToolbarStyles, { name: "CustomTableToolbar" })(CustomTableToolbar);
