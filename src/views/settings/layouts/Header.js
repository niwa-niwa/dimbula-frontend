import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Typography,
  useScrollTrigger,
  IconButton,
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

import NAMES from "../../../const/names";
import PATHS from "../../../const/paths";

function ElevationScroll(props) {
  const { children, window } = props;
  // attention that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function ElevateAppBar(props) {
  return (
    <React.Fragment>
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6"><Link to={PATHS.APP_INBOX}>{NAMES.TITLE}</Link></Typography>
            <IconButton><Link to={PATHS.APP_INBOX}><CloseIcon color="error" /></Link></IconButton>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}
