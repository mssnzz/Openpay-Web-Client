// En el componente ResponsiveAppBar
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";

const pages = ["Products", "Pricing", "Blog"];

type ResponsiveAppBarProps = {
  onDrawerToggle?: () => void;
};

function ResponsiveAppBar({ onDrawerToggle }: ResponsiveAppBarProps) {
  return (
    <AppBar position="static" sx={{boxShadow: "none", bgcolor: "#fff", color: "#000"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="open drawer"
              onClick={onDrawerToggle}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" }
            }}
          >
            LOGO
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
