import { ArrowForward } from "@mui/icons-material";
import { Sheet } from "@mui/joy";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  TextField,
  Typography,
  Box,
  Chip,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getStores } from "../../../../services/users";
import { createCategory } from "../../../../services/categories";

export function NewCategoryForm() {
  const [categoryName, setCategoryName] = useState("");
  const [color, setColor] = useState("#000000");
  const [isFormValid, setIsFormValid] = useState(false);
  const [stores, setStores] = useState([]);
  const [selectedStores, setSelectedStores] = useState([]);

  async function loadStores() {
    try {
      const fetchedStores = await getStores("2"); // Asume que esta función existe y es asíncrona
      setStores(fetchedStores.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }

  useEffect(() => {
    // Esta función se ejecuta cuando `categoryName` o `color` cambian.
    setIsFormValid(categoryName.trim() !== "" && /^#[0-9A-F]{6}$/i.test(color));

    loadStores();
  }, [categoryName, color]); // Dependencias que al cambiar, disparan el efecto.

  const handleCategoryNameChange = (event: any) => {
    setCategoryName(event.target.value);
  };



  const handleSubmit = async () => {
    const formData = {
      name: categoryName,
      color: "#000",
      storeId: "2ec9bbb9-dd1e-4c54-9f76-19713d9cec0d"
    };
    const response = await createCategory(formData);
    if (response) {
        window.location.reload();
    }
  };

  const handleStoreChange = (event: any) => {
    const {
      target: { value },
    } = event;
    // Assuming each store is an object and setting selectedStores directly
    setSelectedStores(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <Sheet
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        minHeight: "97vh", // Ensure the Sheet takes up at least the height of the viewport
        position: "relative", // Necessary for absolute positioning of the button
        pb: "56px", // Add padding bottom to prevent content from being hidden behind the button
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          borderBottom: "1px solid #ebebeb",
          paddingBottom: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Uber-Bold",
            fontSize: 28,
            color: "#000",
            letterSpacing: -0.5,
          }}
        >
          Nueva Categoría
        </Typography>
      </Box>
      <FormControl>
        <TextField
          id="category-name"
          value={categoryName}
          label="Nombre de la categoria"
          onChange={handleCategoryNameChange}
          fullWidth // Ensures the input takes the full width
          variant="filled"
          sx={{
            "& .MuiFilledInput-root": {
              background: "#fff", // Fondo blanco
              border: "1px solid #ccc", // Borde completo en todos los lados
              borderBottom: "1px solid #ccc", // Asegurarse de que no hay borde inferior
              borderRadius: "4px", // Bordes redondeados ligeramente
              "&:hover": {
                borderColor: "#b3b3b3", // Color de borde al pasar el mouse
              },
              "&.Mui-focused": {
                borderColor: "#3f51b5", // Color de borde al enfocar
              },
            },
            "& .MuiInputBase-input": {
              // Estilos para el texto del input
              fontFamily: "Uber-Medium", // Aplicar la fuente Uber-Medium
              fontSize: "1rem", // Puedes ajustar el tamaño de la fuente aquí si es necesario
            },
            "& .MuiInputLabel-root": {
              // Apunta al label del TextField
              fontFamily: "Uber-Regular", // Fuente personalizada para el label
              color: "#000",
            },
            "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after":
              {
                display: "none", // Esconder las líneas de underline por completo
              },
          }}
        />
      </FormControl>
      <FormControl
        variant="filled"
        sx={{
          "& .MuiFilledInput-root": {
            background: "#fff", // Fondo blanco
            border: "1px solid #ccc", // Borde completo en todos los lados
            borderRadius: "4px", // Bordes redondeados ligeramente
            height: 70,
            "&:hover": {
              borderColor: "#b3b3b3", // Color de borde al pasar el mouse
            },
            "&.Mui-focused": {
              borderColor: "#3f51b5", // Color de borde al enfocar
              boxShadow: "0 0 0 2px rgba(63,81,181,0.25)", // Agrega un boxShadow si quieres un indicador de foco
            },
          },
          "& .MuiInputBase-input": {
            fontFamily: "Uber-Regular", // Aplicar la fuente Uber-Medium
            fontSize: "1rem", // Ajustar el tamaño de la fuente aquí si es necesario
          },
          "& .MuiInputLabel-root": {
            fontFamily: "Uber-Regular", // Fuente personalizada para el label
            marginTop: 1,
            "&.Mui-focused": {
              color: "#3f51b5", // Cambiar el color al enfocar
            },
          },
          "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after":
            {
              display: "none", // Esconder las líneas de underline por completo
            },
        }}
      >
        <InputLabel id="demo-multiple-chip-label">Sucursales</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          name="stores" // Use the correct name
          value={selectedStores}
          onChange={handleStoreChange}
          label="Categorías"
          renderValue={(selected) => (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
                alignItems: "center",
                mt: 0.5,
              }}
            >
              {selected.length > 2
                ? [
                    <Chip
                      key={selected[0]}
                      label={selected[0]}
                      sx={{ fontFamily: "Uber-Medium" }}
                    />,
                    <Chip
                      key="more"
                      label={`+${selected.length - 1} más`}
                      sx={{ fontFamily: "Uber-Medium" }}
                    />,
                  ]
                : selected.map((value: any) => (
                    <Chip
                      key={value}
                      label={value.name}
                      sx={{ fontFamily: "Uber-Medium" }}
                    />
                  ))}
            </Box>
          )}
        >
          {stores.map((store: any) => (
            <MenuItem
              key={store.id}
              value={store}
              sx={{ fontFamily: "Uber-Medium" }}
            >
              {store.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
      </FormControl>
      <Button
        sx={{
          height: "80px",
          fontSize: "18px",
          fontFamily: "Uber-Medium",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          textTransform: "none",
          boxShadow: "none",
          overflow: "hidden",
          marginTop: "-36px",
          position: "absolute", // Fixes the button to the bottom
          bottom: 0, // Aligns the button at the bottom edge
          left: 0, // Aligns the button at the left edge
          width: "96%", // Makes the button full width
          marginLeft: 1.5,
          background: "#000",
        }}
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!isFormValid} // El botón estará deshabilitado si el formulario no es válido.
      >
        <Box
          sx={{
            zIndex: 2,
            paddingLeft: 2, // Espaciado interno a la izquierda para el texto
            fontSize: 22,
          }}
        >
          Completar
        </Box>
        <Box
          sx={{
            position: "absolute",
            right: 24, // Ajusta la posición horizontal del ícono hacia la derecha
            top: "54%",
            transform: "translateY(-50%)", // Centra verticalmente el ícono
            zIndex: 2,
          }}
        >
          <ArrowForward sx={{ fontSize: 34 }} /> {/* Añade el ícono aquí */}
        </Box>
      </Button>
    </Sheet>
  );
}
