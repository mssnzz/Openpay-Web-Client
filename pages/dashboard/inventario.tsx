import * as React from "react";
import { CssVarsProvider, styled } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

import { useEffect, useState } from "react";

import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import { Button } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { getProducts } from "../../services/products";
import Sidebar from "../../components/Sidebar";
import NewProduct from "../../components/nuevo";
import { NewCategoryForm } from "../../components/nuevacategoria";
import OrderTable from "../../components/OrderTable";
import theme from "../../src/theme";
export default function InventarioPage() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [openedCategories, setOpenNewCategory] = React.useState<boolean>(false);

  const [products, setProducts] = useState([]);

  async function loadProducts() {
    try {
      const fetchedProducts = await getProducts(
        "6778b1a3-fc6b-4abb-8fc6-20e7d26aba3d"
      ); // Asume que esta función existe y es asíncrona
      setProducts(fetchedProducts.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez después del montaje inicial

  const materialTheme = materialExtendTheme();
  return (
    <Sidebar>
      <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
        <JoyCssVarsProvider>
          <CssVarsProvider 
            defaultMode="light" disableTransitionOnChange theme={theme}>
            <CssBaseline />
            <Box sx={{ display: "flex", minHeight: "100dvh" }}>
              <Box
                component="main"
                className="MainContent"
                sx={{
                  px: { xs: 2, md: 6 },
                  pt: {
                    xs: "calc(12px + var(--Header-height))",
                    sm: "calc(12px + var(--Header-height))",
                    md: 3,
                  },
                  pb: { xs: 2, sm: 2, md: 3 },
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  minWidth: 0,
                  height: "100dvh",
                  gap: 1,
                  background: "#fff",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    mb: 1,
                    gap: 1,
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "start", sm: "center" },
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography></Typography>

                  <Box>
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={() => setOpen(true)}
                      sx={{
                        fontFamily: "Uber-Medium",
                        textTransform: "none",
                        fontSize: 18,
                        marginRight: 1,
                      }}
                    >
                      Nuevo producto
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      sx={{
                        fontFamily: "Uber-Medium",
                        textTransform: "none",
                        fontSize: 18,
                      }}
                      onClick={() => setOpenNewCategory(true)} // Assuming you manage the state to open new category modal/form
                    >
                      Nueva categoría
                    </Button>
                  </Box>
                </Box>

                <OrderTable products={products} reloadProducts={loadProducts} />
                {/* Pasamos products como prop a OrderTable */}
              </Box>
            </Box>
            <Drawer
              anchor="right"
              open={open}
              onClose={() => setOpen(false)}
              sx={{
                "& .MuiDrawer-paper": {
                  width: 600,
                  position: "absolute",
                  right: 10,
                  top: 10,
                  bottom: 10,
                  maxHeight: `calc(100% - 20px)`,
                  transform: open ? "translateX(0)" : "translateX(100%)",
                  boxShadow: "none",
                  borderRadius: 1,
                },
              }}
            >
              <NewProduct setOpen={setOpen} reloadProducts={loadProducts} />
            </Drawer>
            <Drawer
              anchor="right"
              open={openedCategories}
              onClose={() => setOpenNewCategory(false)}
              sx={{
                "& .MuiDrawer-paper": {
                  width: 500,
                  position: "absolute",
                  right: 10,
                  top: 10,
                  bottom: 10,
                  maxHeight: `calc(100% - 20px)`,
                  transform: open ? "translateX(0)" : "translateX(100%)",
                  boxShadow: "none",
                  borderRadius: 1,
                },
              }}
            >
              <NewCategoryForm />
            </Drawer>
          </CssVarsProvider>
        </JoyCssVarsProvider>
      </MaterialCssVarsProvider>
    </Sidebar>
  );
}
