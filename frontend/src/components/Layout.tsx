import React from "react";
import { AppBar, Toolbar, Typography, Paper } from "@material-ui/core";

const Layout = React.memo(({ children }) => (
  <Paper>
    <AppBar position="static">
      <Toolbar>
        <Typography>TODO APP</Typography>
      </Toolbar>
    </AppBar>
    {children}
  </Paper>
));

export default Layout;
