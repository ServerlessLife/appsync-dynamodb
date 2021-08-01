import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const Layout = React.memo(({ children }) => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Typography>TODO APP</Typography>
      </Toolbar>
    </AppBar>
    {children}
  </>
));

export default Layout;
