import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  BarChartOutlined,
  ContactMailOutlined,
  HomeMaxOutlined,
  HomeOutlined,
  InsertChartOutlined,
  Inventory2Outlined,
  Inventory2Rounded,
  PeopleAltOutlined,
  PointOfSaleOutlined,
} from "@mui/icons-material";
import HomeRounded from "@mui/icons-material/HomeRounded";
import ResponsiveAppBar from "./appbar";

type CustomIcon = {
  [key: string]: React.ReactElement;
};

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleInventarioClick = () => {
    setOpen(!open);
  };

  const drawerWidth = 250;

  const customIcons: CustomIcon = {
    Inicio: <HomeOutlined sx={{ fontSize: 28 }} />,
    Inventario: open ? (
      <ExpandLess sx={{ marginLeft: 4 }} />
    ) : (
      <ChevronRightIcon sx={{ marginLeft: 4 }} />
    ),
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Drawer para dispositivos móviles */}
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        {drawerContent()}
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              selected={router.pathname.includes("ajustes")}
              onClick={() => router.push("/ajustes")}
            >
              <ListItemText primary="Ajustes" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={router.pathname.includes("soporte")}
              onClick={() => router.push("/soporte")}
            >
              <ListItemText primary="Soporte" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>


      {/* Sidebar para pantallas grandes */}
      <Box
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: { xs: "none", md: "block" },
        }}
      >
        {drawerContent()}
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              selected={router.pathname.includes("ajustes")}
              onClick={() => router.push("/ajustes")}
            >
              <ListItemText primary="Ajustes" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={router.pathname.includes("soporte")}
              onClick={() => router.push("/soporte")}
            >
              <ListItemText primary="Soporte" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      {/* Contenido principal */}
      <Box sx={{ flexGrow: 1, bgcolor: "#f5f5f5" }}>
        <ResponsiveAppBar onDrawerToggle={handleDrawerToggle} />
        {children}
      </Box>
    </Box>
  );

  function drawerContent() {
    return (
      <>
        <Box
          sx={{
            background: "#006AFF",
            height: 100,
            marginTop: -1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <p
            style={{
              margin: "auto",
              color: "white",
              fontFamily: "Uber-Mono-Medium",
              fontSize: 34,
            }}
          >
            Openpay
          </p>
        </Box>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              selected={router.pathname.includes("inicio")}
              onClick={() => router.push("/inicio")}
            >
              <ListItemIcon>
                <HomeOutlined sx={{ fontSize: 26 }} />
              </ListItemIcon>
              <ListItemText primary="Inicio" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={router.pathname.includes("reportes")}
              onClick={() => router.push("/reportes")}
            >
              <ListItemIcon>
                <InsertChartOutlined sx={{ fontSize: 26 }} />
              </ListItemIcon>
              <ListItemText primary="Reportes" />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ marginBottom: 1, marginTop: 1 }} />

          <ListItem disablePadding>
            <ListItemButton
              onClick={handleInventarioClick}
              selected={router.pathname.includes("inventario")}
            >
              <ListItemIcon>
                <Inventory2Outlined />
              </ListItemIcon>
              <ListItemText primary="Inventario" />
              <ListItemIcon>{customIcons.Inventario}</ListItemIcon>
            </ListItemButton>
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                selected={router.pathname.includes(
                  "/inventario/lista-de-productos"
                )}
                onClick={() => router.push("/inventario/lista-de-productos")}
              >
                <ListItemText primary="Lista de productos" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                selected={router.pathname.includes("/inventario/agregar-nuevo")}
                onClick={() => router.push("/inventario/agregar-nuevo")}
              >
                <ListItemText primary="Agregar nuevo" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItem disablePadding>
            <ListItemButton
              selected={router.pathname.includes("clientes")}
              onClick={() => router.push("/clientes")}
            >
              <ListItemIcon>
                <PeopleAltOutlined />
              </ListItemIcon>
              <ListItemText primary="Clientes" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={router.pathname.includes("empleados")}
              onClick={() => router.push("/empleados")}
            >
              <ListItemIcon>
                <ContactMailOutlined />
              </ListItemIcon>
              <ListItemText primary="Empleados" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={router.pathname.includes("pos")}
              onClick={() => router.push("/pos")}
            >
              <ListItemIcon>
                <PointOfSaleOutlined />
              </ListItemIcon>
              <ListItemText primary="Puntos de venta" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </>
    );
  }
}
