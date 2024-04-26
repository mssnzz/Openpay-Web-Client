import * as React from "react";
import { CssVarsProvider, styled } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import OrderTable from "./components/OrderTable";
import OrderList from "./components/OrderList";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import { createProduct, getProducts } from "../../../services/products";
import { Add, AddCircle, AttachMoney } from "@mui/icons-material";
import {
  Chip,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Sheet,
  Stack,
} from "@mui/joy";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import Option from "@mui/joy/Option";
import { getCategories } from "../../../services/categories";
import { getStores } from "../../../services/users";
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import {
  Checkbox,
  ListItemText,
  MenuItem,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import NewProduct from "./components/nuevo";
import { NewCategoryForm } from "./components/nuevacategoria";
import { useSession } from "next-auth/react";
import theme from "../../../src/theme";

export default function JoyOrderDashboardTemplate() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [openedCategories, setOpenNewCategory] = React.useState<boolean>(false);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);
  const [variations, setVariations] = useState<any>([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const handleCategoryChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  async function loadProducts() {
    try {
      const fetchedProducts = await getProducts(
        "2ec9bbb9-dd1e-4c54-9f76-19713d9cec0d"
      ); // Asume que esta función existe y es asíncrona
      setProducts(fetchedProducts.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }
  async function loadCategories() {
    try {
      const fetchetCategories = await getCategories(
        "2ec9bbb9-dd1e-4c54-9f76-19713d9cec0d"
      ); // Asume que esta función existe y es asíncrona
      setCategories(fetchetCategories.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }

  async function loadStores() {
    try {
      const fetchedStores = await getStores("2"); // Asume que esta función existe y es asíncrona
      setStores(fetchedStores.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }
  useEffect(() => {
    loadProducts();
    loadCategories();
    loadStores();
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez después del montaje inicial

  const StyledInput = styled("input")({
    border: "none", // remove the native input border
    minWidth: 0, // remove the native input width
    outline: 0, // remove the native input outline
    padding: 0, // remove the native input padding
    paddingTop: "1em",
    flex: 1,
    color: "inherit",
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: "inherit",
    fontStyle: "inherit",
    fontWeight: "inherit",
    lineHeight: "inherit",
    textOverflow: "ellipsis",
    "&::placeholder": {
      opacity: 0,
      transition: "0.1s ease-out",
    },
    "&:focus::placeholder": {
      opacity: 1,
    },
    "&:focus ~ label, &:not(:placeholder-shown) ~ label, &:-webkit-autofill ~ label":
      {
        top: "0.5rem",
        fontSize: "0.75rem",
      },
    "&:focus ~ label": {
      color: "var(--Input-focusedHighlight)",
    },
    "&:-webkit-autofill": {
      alignSelf: "stretch", // to fill the height of the root slot
    },
    "&:-webkit-autofill:not(* + &)": {
      marginInlineStart: "calc(-1 * var(--Input-paddingInline))",
      paddingInlineStart: "var(--Input-paddingInline)",
      borderTopLeftRadius:
        "calc(var(--Input-radius) - var(--variant-borderWidth, 0px))",
      borderBottomLeftRadius:
        "calc(var(--Input-radius) - var(--variant-borderWidth, 0px))",
    },
  });

  const StyledLabel = styled("label")(({ theme }) => ({
    position: "absolute",
    lineHeight: 1,
    top: "calc((var(--Input-minHeight) - 1em) / 2)",
    color: theme.vars.palette.text.tertiary,
    fontWeight: theme.vars.fontWeight.md,
    transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
  }));

  const InnerInput = React.forwardRef<
    HTMLInputElement,
    JSX.IntrinsicElements["input"]
  >(function InnerInput(props, ref) {
    const [inputValue, setInputValue] = React.useState("");
    const id = React.useId();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value); // Actualizar el estado con el valor ingresado
    };

    return (
      <React.Fragment>
        <StyledInput
          {...props}
          ref={ref}
          id={id}
          value={inputValue}
          name="name"
          onChange={handleInputChange} // Asegurarse de manejar cambios aquí
        />
        <StyledLabel htmlFor={id} sx={{ fontFamily: "Uber-Medium" }}>
          Nombre del producto
        </StyledLabel>
      </React.Fragment>
    );
  });

  const addVariation = () => {
    const newVariation = { input1: "", input2: "", input3: "" };
    setVariations([...variations, newVariation]);
  };

  const handleVariationChange = (index: any, field: any, value: any) => {
    const newVariations = [...variations];
    newVariations[index][field] = value;
    setVariations(newVariations);
  };
  const materialTheme = materialExtendTheme();


  return (
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider>
        <CssVarsProvider disableTransitionOnChange theme={theme}>
          <CssBaseline />
          <Box sx={{ display: "flex", minHeight: "100dvh" }}>
            <Header />
            <Sidebar />
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
                background: "#f5f5f5"
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Breadcrumbs
                  size="sm"
                  aria-label="breadcrumbs"
                  separator={<ChevronRightRoundedIcon />}
                  sx={{ pl: 0 }}
                >
                  <Link
                    underline="none"
                    color="neutral"
                    href="#some-link"
                    aria-label="Home"
                  >
                    <HomeRoundedIcon />
                  </Link>
                  <Link
                    underline="hover"
                    color="neutral"
                    href="#some-link"
                    fontSize={12}
                    fontWeight={500}
                  >
                    Dashboard
                  </Link>
                  <Typography color="primary" fontWeight={500} fontSize={12}>
                    Inventario
                  </Typography>
                </Breadcrumbs>
              </Box>
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
                <Typography level="h2" component="h1">
                  Inventario
                </Typography>
                <Box>
                  <Button
                    color="primary"
                    startDecorator={<Add />}
                    size="sm"
                    onClick={() => setOpen(true)}
                    sx={{ marginRight: 2 }} // Ensure there is space between the buttons
                  >
                    Nuevo producto
                  </Button>
                  <Button
                    color="primary"
                    startDecorator={<AddCircle />} // Using AddCircle for a slight variation or you can use any other icon
                    size="sm"
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
  );
}
