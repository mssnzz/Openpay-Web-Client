import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import LinearProgress from "@mui/joy/LinearProgress";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SupportRoundedIcon from "@mui/icons-material/SupportRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import userProfile from "../../../_app";

import ColorSchemeToggle from "./ColorSchemeToggle";
import { closeSidebar } from "../utils";
import {
  AddBox,
  AttachMoney,
  BarChart,
  BarChartOutlined,
  BarChartRounded,
  ChatRounded,
  ExitToApp,
  HomeOutlined,
  Inventory,
  Inventory2Outlined,
  ListAltOutlined,
  PlaylistAddCheckCircleOutlined,
  PointOfSaleOutlined,
  PunchClockOutlined,
  Report,
  StorefrontOutlined,
  SupervisedUserCircleOutlined,
  ThreePOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getProfile } from "../../../../services/users";
import { getUserProfile } from "../../../../context/profile";
interface TogglerProps {
  paths?: string[]; // Las rutas que deberían provocar que el menú esté abierto
  defaultExpanded?: boolean;
  children: React.ReactNode; // Definición explícita del tipo para children
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}

const Toggler: React.FC<TogglerProps> = ({
  paths,
  defaultExpanded = false,
  children,
  renderToggle,
}) => {
  const router = useRouter();

  // Función para determinar si alguna ruta está activa
  const isAnyActive = () =>
    paths?.some((path) => router.pathname.includes(path)) ?? false;

  // Estado inicial basado en si alguna ruta está activa
  const [open, setOpen] = useState<boolean>(defaultExpanded || isAnyActive());

  // Efecto para abrir automáticamente el menú cuando la ruta coincide
  useEffect(() => {
    setOpen(isAnyActive());
  }, [router.pathname, paths]); // Agregar paths en las dependencias para reevaluar cuando las rutas cambian

  return (
    <>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default function Sidebar() {
  const router = useRouter();
  const isActive = (pathname: any) => router.pathname === pathname;
  const userProfile = getUserProfile();
  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "280px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "300px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <img src="https://tidyfresh-tidynewclient.6gpvax.easypanel.host/_next/image?url=%2Ftidylogo.png&w=384&q=75" width={40} />
        <Typography
          level="title-lg"
          sx={{ fontFamily: "Uber-Bold", marginTop: -0.4, fontSize: 22 }}
        >
          Negocios
        </Typography>
        <Divider />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "left",
          border: "1px solid #ebebeb",
          padding: 1,
          borderRadius: 6,
        }}
      >
        <Avatar
          sx={{ background: "#ebebeb" }}
          alt="Temy Sharp"
          src="https://tidyfresh-tidynewclient.6gpvax.easypanel.host/_next/image?url=%2Ftidylogo.png&w=384&q=75"
        />
        <Box sx={{ ml: 1 }}>
          <Typography sx={{ fontSize: 18, fontFamily: "Uber-Bold" }}>
            Tidyfresh
          </Typography>
          <Typography
            sx={{ fontSize: 16, fontFamily: "Uber-Medium", color: "darkgray" }}
          >
            Lavandería
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1.2,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton>
              <HomeOutlined />
              <ListItemContent>
              Incio
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <BarChartOutlined/>

                  <ListItemContent>
                  Reportes
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? "rotate(180deg)" : "none" }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton
                    selected={isActive("/dashboard/inventario/lista")}
                    onClick={() => router.push("/dashboard/inventario/lista")}
                    sx={{ fontFamily: "Uber-Medium", fontSize: 16 }}
                  >
                    Cortes de caja
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    selected={isActive("/dashboard/inventario/nuevo")}
                    onClick={() => router.push("/dashboard/inventario/nuevo")}
                    sx={{
                      fontFamily: "Uber-Medium",
                      fontSize: 16,
                     
                    }}
                  >
                    Inventario
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    selected={isActive("/dashboard/inventario/nuevo")}
                    onClick={() => router.push("/dashboard/inventario/nuevo")}
                    sx={{ fontFamily: "Uber-Medium", fontSize: 16 }}
                  >
                    Ventas
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    selected={isActive("/dashboard/inventario/nuevo")}
                    onClick={() => router.push("/dashboard/inventario/nuevo")}
                    sx={{ fontFamily: "Uber-Medium", fontSize: 16 }}
                  >
                    Empleados
                  </ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>

          <Divider />
          <ListItem>
            <ListItemButton selected={isActive("/dashboard/inventario/lista")}>
              <Inventory2Outlined />
              <ListItemContent>
                
              Inventario
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <AttachMoney />
              <ListItemContent>
              Finanzas
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ThreePOutlined  />
              <ListItemContent>
              Empleados
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <PunchClockOutlined />
              <ListItemContent>
              Control de tiempo
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <SupervisedUserCircleOutlined
              />
              <ListItemContent>
              Clientes
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemButton>
              <PlaylistAddCheckCircleOutlined
              />
              <ListItemContent>
              Órdenes
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListAltOutlined />
              <ListItemContent>
              Ventas
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <StorefrontOutlined  />
              <ListItemContent>
              Sucursales
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>

        <List
          size="sm"
          sx={{
            mt: "auto",
            flexGrow: 0,
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
            "--List-gap": "8px",
            mb: 2,
          }}
        >
          <ListItem>
            <ListItemButton sx={{ fontFamily: "Uber-Medium" }}>
              <PointOfSaleOutlined/>
             
              Puntos de venta
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton sx={{ fontFamily: "Uber-Medium" }}>
              <SupportRoundedIcon />
              Soporte
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton sx={{ fontFamily: "Uber-Medium" }}>
              <SettingsRoundedIcon />
              Ajustes
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton sx={{ fontFamily: "Uber-Medium", color: "red" }}>
              <ExitToApp />
              Cerrar sesión
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Sheet>
  );
}
