import {
  Box,
  DialogContent,
  DialogTitle,
  Divider,
  ModalClose,
  Sheet,
  Stack,
} from "@mui/joy";
import {
  Button,
  Checkbox,
  Chip,
  FilledInput,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { Add, Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getCategories } from "../services/categories";
import { getStores } from "../services/users";
import { createProduct } from "../services/products";
import { getUserProfile } from "../context/profile";

export default function NewProduct({ setOpen, reloadProducts }: any) {
  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);
  const [variations, setVariations] = useState<any>([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStores, setSelectedStores] = useState([]);
  const handleCategoryChange = (event: any) => {
    const {
      target: { value },
    } = event;
    // Setting selectedCategories directly to the array of selected category objects
    setSelectedCategories(typeof value === "string" ? value.split(",") : value);
  };

  const handleStoreChange = (event: any) => {
    const {
      target: { value },
    } = event;
    // Assuming each store is an object and setting selectedStores directly
    setSelectedStores(typeof value === "string" ? value.split(",") : value);
  };

  const handleVariationChange = (index: any, field: any, value: any) => {
    const newVariations = [...variations];
    newVariations[index] = { ...newVariations[index], [field]: value };
    setVariations(newVariations);
  };

  const handleRemoveVariation = (index: number) => {
    // Filtramos las variaciones para eliminar la que tiene el índice proporcionado
    setVariations(variations.filter((_: any, i: number) => i !== index));
  };

  const addVariation = () => {
    const newVariation = { name: "", price: "", stock: "" };
    setVariations([...variations, newVariation]);
  };
  async function loadCategories() {
    try {
      const fetchetCategories = await getCategories(
        "6778b1a3-fc6b-4abb-8fc6-20e7d26aba3d"
      ); // Asume que esta función existe y es asíncrona
      setCategories(fetchetCategories.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }

  async function loadStores() {
    try {
      const fetchedStores = await getStores("4"); // Asume que esta función existe y es asíncrona
      setStores(fetchedStores.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }
  useEffect(() => {
    loadCategories();
    loadStores();
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez después del montaje inicial

  const handleSubmit = async (event: any) => {
    event.preventDefault(); // Prevent the form from submitting normally

    // Extract form data using FormData
    const formData = new FormData(event.currentTarget);

    // Construct the product data object, ensuring to parse and structure it correctly
    const productData = {
      name: formData.get("name") || "", // Provide default empty string if nothing is entered
      barcode: formData.get("barcode") || "",
      description: formData.get("description") || "",
      precioCompra: formData.get("precioCompra") || "",
      precioVenta: formData.get("precioVenta") || "",
      stockAvailable: formData.get("stockAvailable") || "",
      minimumStock: formData.get("minimumStock") || "",

      categoryIds: selectedCategories, // Assuming selectedCategories is an array of category IDs
      storeIds: selectedStores, // Assuming selectedStores is an array of store IDs
      variations: variations.map((variation: any) => ({
        name: variation.name,
        stock: variation.stock,

        prices: [
          {
            amount: variation.price, // Assuming each variation object has a 'price' property
            conditions: variation.name, // Assuming each variation has 'conditions' property
          },
        ],
      })),
    };

    // Use createProduct to send the request
    console.log(productData);
    const result = await createProduct(productData);

    if (result.error) {
      console.error("Failed to create product:", result.message);
    } else {
      setOpen(false); // Cerrar el drawer
      reloadProducts(); // Recargar la lista de productos
    }
  };

  const userData = getUserProfile();
  console.log(userData);
  return (
    <Sheet
      sx={{
        borderRadius: "md",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        height: "100%",
        overflow: "hidden",
        background: "#fff",
      }}
    >
      <DialogTitle
        sx={{ fontFamily: "Uber-Bold", fontSize: 32, color: "black", mb: 4, mt: 2, letterSpacing: 0 }}
      >
        Nuevo producto
      </DialogTitle>
      <ModalClose size="lg" sx={{marginRight: 1.5, marginTop: 3}} />
      <DialogContent sx={{ gap: 2 }}>
        <form id="productForm" onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", gap: 2, overflowX: "hidden" }}>
            <Box sx={{ flex: 1 }}>
              <Stack spacing={1}>
              <FormControl>
                  <TextField
                    id="filled-basic"
                    label="Código de barra"
                    variant="filled"
                    name="barcode"
                   
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    id="filled-basic"
                    label="Nombre del producto"
                    name="name" // Make sure the name attribute is set
                    variant="filled"
                   
                  />
                </FormControl>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "space-between",
                    maxWidth: "100%",
                  }}
                >
                  {/* Columna Izquierda: Categorías disponibles */}
                  <FormControl
                    variant="filled"
                    sx={{
                      width: 275
                    }}
                  >
                    <InputLabel id="demo-multiple-chip-label">
                      Categorías
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      name="categories"
                      multiple
                      value={selectedCategories}
                      onChange={handleCategoryChange}
                      label="Categorías"
                      renderValue={(selected: any) => (
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 0.5,
                            alignItems: "center",
                            mt: 0.5,
                          }}
                        >
                          {selected.length > 3
                            ? [
                                <Chip
                                  key={selected[0].id}
                                  label={selected[0].name}
                                  sx={{ fontFamily: "Uber-Medium" }}
                                />,
                                <Chip
                                  key="more"
                                  label={`+${selected.length - 1} más`}
                                  sx={{ fontFamily: "Uber-Medium" }}
                                />,
                              ]
                            : selected.map((category: any) => (
                                <Chip
                                  key={category.id}
                                  label={category.name}
                                  sx={{ fontFamily: "Uber-Medium" }}
                                />
                              ))}
                        </Box>
                      )}
                    >
                      {categories.map((category: any) => (
                        <MenuItem
                          key={category.id}
                          value={category}
                          sx={{ fontFamily: "Uber-Medium" }}
                        >
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl
                    variant="filled"
                    sx={{
                      width: 275,
                     
                    }}
                  >
                    <InputLabel id="demo-multiple-chip-label">
                      Sucursales
                    </InputLabel>
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
                </Box>
                <FormControl>
                  <TextField
                    id="outlined-textarea"
                    label="Descripción"
                    name="description"
                    variant="filled"
                    
                  />
                </FormControl>
               
                {userData?.user.brands.category == "Retail" ? (
                  <Box>
                    <Divider
                      sx={(theme) => ({
                        [theme.getColorSchemeSelector("light")]: {
                          color: {
                            xs: "#FFF",
                            md: "text.tertiary",
                            fontFamily: "Uber-Medium",
                            marginTop: 18,
                            marginBottom: 14,
                          },
                        },
                      })}
                    >
                      Variaciones y precios
                    </Divider>
                    <Box sx={{ flex: 1, overflow: "hidden" }}>
                      {variations.map((variation: any, index: any) => (
                        <Stack
                          key={index}
                          direction="row"
                          alignItems="center" // Asegúrese de alinear los ítems verticalmente
                          spacing={2}
                          sx={{ maxWidth: "100%", overflow: "hidden", mb: 1 }}
                        >
                          {/* Input para nombre, tipo texto */}
                          <TextField
                            id={`nombre-variacion-${index}`}
                            label="Nombre"
                            variant="filled"
                            name={`variations[${index}].name`}
                            value={variation.name}
                            onChange={(event) =>
                              handleVariationChange(
                                index,
                                "name",
                                event.target.value
                              )
                            }
                            sx={{
                              "& .MuiFilledInput-root": {
                                background: "#fff", // Fondo blanco
                                border: "1px solid #ccc", // Borde completo en todos los lados
                                borderRadius: "4px", // Bordes redondeados ligeramente
                                "&:hover": {
                                  borderColor: "#b3b3b3", // Color de borde al pasar el mouse
                                },
                                "&.Mui-focused": {
                                  borderColor: "#3f51b5", // Color de borde al enfocar
                                  boxShadow: "0 0 0 2px rgba(63,81,181,0.25)", // Agrega un boxShadow si quieres un indicador de foco
                                },
                              },
                              "& .MuiInputBase-input": {
                                fontFamily: "Uber-Medium", // Aplicar la fuente Uber-Medium
                                fontSize: "1rem", // Ajustar el tamaño de la fuente aquí si es necesario
                              },
                              "& .MuiInputLabel-root": {
                                fontFamily: "Uber-Medium", // Fuente personalizada para el label
                                "&.Mui-focused": {
                                  color: "#3f51b5", // Cambiar el color al enfocar
                                },
                              },
                              "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after":
                                {
                                  display: "none", // Esconder las líneas de underline por completo
                                },
                            }}
                          />

                          {/* Input para precio, tipo número pero formateado como dinero */}
                          <TextField
                            id={`precio-base-variacion-${index}`}
                            label="Precio base"
                            variant="filled"
                            type="number"
                            name={`variations[${index}].price`}
                            value={variation.price}
                            onChange={(event) =>
                              handleVariationChange(
                                index,
                                "price",
                                event.target.value
                              )
                            }
                            sx={{
                              "& .MuiFilledInput-root": {
                                background: "#fff", // Fondo blanco
                                border: "1px solid #ccc", // Borde completo en todos los lados
                                borderRadius: "4px", // Bordes redondeados ligeramente
                                "&:hover": {
                                  borderColor: "#b3b3b3", // Color de borde al pasar el mouse
                                },
                                "&.Mui-focused": {
                                  borderColor: "#3f51b5", // Color de borde al enfocar
                                  boxShadow: "0 0 0 2px rgba(63,81,181,0.25)", // Agrega un boxShadow si quieres un indicador de foco
                                },
                              },
                              "& .MuiInputBase-input": {
                                fontFamily: "Uber-Medium", // Aplicar la fuente Uber-Medium
                                fontSize: "1rem", // Ajustar el tamaño de la fuente aquí si es necesario
                              },
                              "& .MuiInputLabel-root": {
                                fontFamily: "Uber-Medium", // Fuente personalizada para el label
                                "&.Mui-focused": {
                                  color: "#3f51b5", // Cambiar el color al enfocar
                                },
                              },
                              "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after":
                                {
                                  display: "none", // Esconder las líneas de underline por completo
                                },
                            }}

                            // ...resto de tus estilos
                          />

                          {/* Input para stock, tipo número */}
                          <TextField
                            id={`stock-variacion-${index}`}
                            label="Stock"
                            variant="filled"
                            type="number"
                            name={`variations[${index}].stock`}
                            value={variation.stock}
                            onChange={(event) =>
                              handleVariationChange(
                                index,
                                "stock",
                                event.target.value
                              )
                            }
                            sx={{
                              "& .MuiFilledInput-root": {
                                background: "#fff", // Fondo blanco
                                border: "1px solid #ccc", // Borde completo en todos los lados
                                borderRadius: "4px", // Bordes redondeados ligeramente
                                "&:hover": {
                                  borderColor: "#b3b3b3", // Color de borde al pasar el mouse
                                },
                                "&.Mui-focused": {
                                  borderColor: "#3f51b5", // Color de borde al enfocar
                                  boxShadow: "0 0 0 2px rgba(63,81,181,0.25)", // Agrega un boxShadow si quieres un indicador de foco
                                },
                              },
                              "& .MuiInputBase-input": {
                                fontFamily: "Uber-Medium", // Aplicar la fuente Uber-Medium
                                fontSize: "1rem", // Ajustar el tamaño de la fuente aquí si es necesario
                              },
                              "& .MuiInputLabel-root": {
                                fontFamily: "Uber-Medium", // Fuente personalizada para el label
                                "&.Mui-focused": {
                                  color: "#3f51b5", // Cambiar el color al enfocar
                                },
                              },
                              "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after":
                                {
                                  display: "none", // Esconder las líneas de underline por completo
                                },
                            }}
                            inputProps={{
                              // Nota el uso de 'inputProps' en lugar de 'InputProps' para atributos nativos
                              min: 0, // Mínimo valor 0 para evitar números negativos
                            }}
                            // ...resto de tus estilos
                          />

                          <IconButton
                            aria-label="delete"
                            onClick={() => handleRemoveVariation(index)}
                            sx={{
                              "&:hover": {
                                backgroundColor: "rgba(255, 0, 0, 0.1)", // Color de fondo al pasar el mouse
                              },
                            }}
                          >
                            <Close /> {/* Este icono representa la "X" */}
                          </IconButton>
                        </Stack>
                      ))}
                    </Box>

                    <Button
                      sx={{ fontFamily: "Uber-Regular", fontWeight: 500 }}
                      variant="outlined"
                      onClick={addVariation}
                    >
                      <Add sx={{ marginRight: 1 }} />
                      Nueva variación
                    </Button>
                  </Box>
                ) : (
                  <Stack spacing={1}>
                    <Divider
                      sx={(theme) => ({
                        [theme.getColorSchemeSelector("light")]: {
                          color: {
                            xs: "#FFF",
                            md: "text.tertiary",
                            fontFamily: "Uber-Medium",
                            marginTop: 18,
                            marginBottom: 14,
                          },
                        },
                      })}
                    >
                      Información de inventario
                    </Divider>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        justifyContent: "space-between",
                        maxWidth: "100%",
                      }}
                    >
                      {/* Columna Izquierda: Categorías disponibles */}
                      <FormControl>
                        <TextField
                          id="filled-basic"
                          label="Costo del producto"
                          variant="filled"
                          name="precioCompra"
                          sx={{
                            width: 275,
                           
                          }}
                        />
                      </FormControl>
                      <FormControl>
                        <TextField
                          id="filled-basic"
                          label="Stock disponible"
                          variant="filled"
                          name="stockAvailable"
                          sx={{
                            width: 275,
                           
                          }}
                        />
                      </FormControl>
                    </Box>
                    <FormControl>
                      <TextField
                        id="filled-basic"
                        label="Precio de venta"
                        variant="filled"
                        name="precioVenta"
                        
                      />
                    </FormControl>
                    <FormControl>
                      <TextField
                        id="filled-basic"
                        label="Stock minimo"
                        variant="filled"
                        name="minimumStock"
                        
                      />
                    </FormControl>
                  </Stack>
                )}
              </Stack>
            </Box>
          </Box>
        </form>
      </DialogContent>

      <Divider sx={{ mt: "auto" }} />
      <Stack
        direction="row"
        justifyContent="space-between"
        useFlexGap
        spacing={1}
      >
        <Button variant="outlined" sx={{ fontFamily: "Uber-Medium", boxShadow: "none", fontSize: 18, textTransform: "none" }}>
          Cancelar
        </Button>
        <Button
          form="productForm"
          type="submit"
          variant="contained"
          sx={{ fontFamily: "Uber-Medium", boxShadow: "none", fontSize: 18, textTransform: "none" }}
        >
          Continuar
        </Button>
      </Stack>
    </Sheet>
  );
}
