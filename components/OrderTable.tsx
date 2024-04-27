/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import { ColorPaletteProp } from "@mui/joy/styles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Option from "@mui/joy/Option";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import Dropdown from "@mui/joy/Dropdown";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { deleteProduct } from "../services/products";
import { Button, FormControl, InputAdornment, TextField } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { getUserProfile } from "../context/profile";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Editar</MenuItem>
        <MenuItem>Publicar</MenuItem>
        <Divider />
        <MenuItem color="danger">Eliminar</MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default function OrderTable({ products, reloadProducts }: any) {
  const displayProducts = products;
  const [order, setOrder] = React.useState<Order>("desc");
  const [selected, setSelected] = React.useState<any>([]);
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds = displayProducts.map((n: any) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: any, id: any) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: any[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const uniqueStatuses = Array.from(
    new Set(
      displayProducts
        .filter((product: any) => product.status)
        .map((product: any) => product.status)
    )
  );

  const uniqueCategories = Array.from(
    new Set(
      displayProducts.flatMap((product: any) =>
        product.categories.map((category: any) => category.name)
      )
    )
  );
  const [statusFilter, setStatusFilter] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("");

  const deleteProducts = async () => {
    const payload = { ids: selected }; // 'selected' should be an array of product IDs
    try {
      const response = await deleteProduct(payload); // Assuming deleteProduct handles the API call
      if (response) {
        console.log("Products deleted successfully:", response);
        // Refresh the product list after successful deletion
        reloadProducts(); // Call to reload products
        setSelected([]);
      }
    } catch (error) {
      console.error("Failed to delete products:", error);
    }
  };

  // Filtra los productos por nombre basado en el término de búsqueda.
  // Filtra los productos por nombre y por el estado seleccionado.
  const filteredProducts = displayProducts.filter((product: any) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? product.status === statusFilter : true;
    const matchesCategory = categoryFilter
      ? product.categories.some(
          (category: any) => category.name === categoryFilter
        )
      : true;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleStatusFilterChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value as string);
  };
  const handleCategoryFilterChange = (event: SelectChangeEvent) => {
    setCategoryFilter(event.target.value as string);
  };
  const renderFilters = () => (
    <React.Fragment>
      <FormControl
        variant="filled"
        sx={{
          width: 200,
          "& .MuiFilledInput-root": {
            background: "#fff", // Fondo blanco
            border: "0px solid #ccc", // Borde completo en todos los lados
            borderBottom: "0px solid #ccc", // Asegurarse de que no hay borde inferior
            borderRadius: "40px", // Bordes redondeados ligeramente
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
            background: "#f5f5f5",
            borderRadius: "40px", // Bordes redondeados ligeramente
            paddingLeft: 2.4,
          },
          "& .MuiInputLabel-root": {
            // Apunta al label del TextField
            fontFamily: "Uber-Medium", // Fuente personalizada para el label
            paddingLeft: 1,
          },
          "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after":
            {
              display: "none", // Esconder las líneas de underline por completo
            },
        }}
      >
        <InputLabel id="demo-simple-select-label">Estado</InputLabel>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={statusFilter}
          label="Estado"
          onChange={handleStatusFilterChange}
          variant="filled"
        >
          <MenuItem value="">Todos</MenuItem>
          {uniqueStatuses.map((status) => (
            <MenuItem key={String(status)} value={String(status)}>
              {status === "trash" ? "No publicado" : "Publicado"}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        variant="filled"
        sx={{
          width: 200,
          "& .MuiFilledInput-root": {
            background: "#fff", // Fondo blanco
            border: "0px solid #ccc", // Borde completo en todos los lados
            borderBottom: "0px solid #ccc", // Asegurarse de que no hay borde inferior
            borderRadius: "40px", // Bordes redondeados ligeramente
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
            background: "#f5f5f5",
            borderRadius: "40px", // Bordes redondeados ligeramente
            paddingLeft: 2.4,
          },
          "& .MuiInputLabel-root": {
            // Apunta al label del TextField
            fontFamily: "Uber-Medium", // Fuente personalizada para el label
            paddingLeft: 1,
          },
          "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after":
            {
              display: "none", // Esconder las líneas de underline por completo
            },
        }}
      >
        <InputLabel id="demo-simple-select-labels">Categorías</InputLabel>

        <Select
          labelId="demo-simple-select-labels"
          label="Categorías"
          value={categoryFilter}
          onChange={handleCategoryFilterChange}
          variant="filled"
        >
          <MenuItem value="" selected>
            Todas
          </MenuItem>
          {uniqueCategories.map((categories: any) => (
            <MenuItem key={String(categories)} value={String(categories)}>
              {categories}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </React.Fragment>
  );

  // Obtener filas para la página actual
  const currentRows = filteredProducts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const userData = getUserProfile();
  const isRetail = userData.user.brands.category === "Retail";

  return (
    <React.Fragment>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: { xs: "flex", sm: "none" },
          my: 1,
          gap: 1,
        }}
      >
        <Input
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAltIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {renderFilters()}
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }}>
          <TextField
            id="filled-basic"
            label="Búsqueda de productos"
            variant="filled"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              "& .MuiFilledInput-root": {
                background: "#fff", // Fondo blanco
                border: "0px solid #ccc", // Borde completo en todos los lados
                borderBottom: "0px solid #ccc", // Asegurarse de que no hay borde inferior
                borderRadius: "40px", // Bordes redondeados ligeramente
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
                background: "#f5f5f5",
                borderRadius: "40px", // Bordes redondeados ligeramente
                paddingLeft: 2.4,
              },
              "& .MuiInputLabel-root": {
                // Apunta al label del TextField
                fontFamily: "Uber-Medium", // Fuente personalizada para el label
                paddingLeft: 1,
              },
              "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after":
                {
                  display: "none", // Esconder las líneas de underline por completo
                },
            }}
          />
        </FormControl>
        {renderFilters()}
      </Box>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: "block",
          width: "100%",
          overflowX: "auto", // Asegura que la tabla pueda desplazarse horizontalmente en pantallas pequeñas
          borderRadius: "sm",
          flexShrink: 1,
          minHeight: 0,
          "& thead th": {
            position: "sticky",
            top: 0, // Opcional: hace que el encabezado de la tabla se quede fijo al hacer scroll vertical
            backgroundColor: "var(--joy-palette-background-paper)", // Ajusta según tus colores de tema
          },
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground":
              "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{ width: 48, textAlign: "center", padding: "12px 6px" }}
              >
                <Checkbox
                  indeterminate={
                    selected.length > 0 &&
                    selected.length < displayProducts.length
                  }
                  checked={
                    displayProducts.length > 0 &&
                    selected.length === displayProducts.length
                  }
                  onChange={handleSelectAllClick}
                />
              </th>
              <th
                style={{
                  width: 220,
                  padding: "12px 6px",
                  fontFamily: "Uber-Medium",
                  fontWeight: 500,
                  fontSize: 18,
                }}
              >
                Código
              </th>
              <th
                style={{
                  width: 240,
                  padding: "12px 6px",
                  fontFamily: "Uber-Medium",
                  fontWeight: 500,
                  fontSize: 18,
                }}
              >
                Nombre
              </th>
              <th
                style={{
                  width: 240,
                  padding: "12px 6px",
                  fontFamily: "Uber-Medium",
                  fontWeight: 500,
                  fontSize: 18,
                }}
              >
                Descripción
              </th>
              <th
                style={{
                  width: 180,
                  padding: "12px 6px",
                  fontFamily: "Uber-Medium",
                  fontWeight: 500,
                  fontSize: 18,
                }}
              >
                Estado
              </th>
              {isRetail ? (
                <>
                  <th
                    style={{
                      width: 100,
                      padding: "12px 6px",
                      fontFamily: "Uber-Medium",
                      fontWeight: 500,
                      fontSize: 18,
                    }}
                  >
                    Stock
                  </th>
                  <th
                    style={{
                      width: 240,
                      padding: "12px 6px",
                      fontFamily: "Uber-Medium",
                      fontWeight: 500,
                      fontSize: 18,
                    }}
                  >
                    Variaciones
                  </th>
                </>
              ) : (
                <>
                  <th
                    style={{
                      width: 200,
                      padding: "12px 6px",
                      fontFamily: "Uber-Medium",
                      fontWeight: 500,
                      fontSize: 18,
                    }}
                  >
                    Precio de venta
                  </th>
                  <th
                    style={{
                      width: 200,
                      padding: "12px 6px",
                      fontFamily: "Uber-Medium",
                      fontWeight: 500,
                      fontSize: 18,
                    }}
                  >
                    Precio de compra
                  </th>
                  <th
                    style={{
                      width: 200,
                      padding: "12px 6px",
                      fontFamily: "Uber-Medium",
                      fontWeight: 500,
                      fontSize: 18,
                    }}
                  >
                    Stock mínimo
                  </th>
                  <th
                    style={{
                      width: 200,
                      padding: "12px 6px",
                      fontFamily: "Uber-Medium",
                      fontWeight: 500,
                      fontSize: 18,
                    }}
                  >
                    Stock disponible
                  </th>
                </>
              )}
              <th
                style={{
                  width: 240,
                  padding: "12px 6px",
                  fontFamily: "Uber-Medium",
                  fontWeight: 500,
                  fontSize: 18,
                }}
              >
                Categoría del producto
              </th>

              <th
                style={{
                  width: 240,
                  padding: "12px 6px",
                  fontFamily: "Uber-Medium",
                  fontWeight: 500,
                  fontSize: 18,
                }}
              >
                {" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row: any, index: any) => (
              <tr key={index} style={{ height: 60 }}>
                <td
                  style={{
                    textAlign: "center",
                    width: 120,
                    fontFamily: "Uber-Regular",
                    fontWeight: 500,
                  }}
                >
                  <Checkbox
                    checked={selected.indexOf(row.id) !== -1}
                    onChange={(event) => handleClick(event, row.id)}
                  />
                </td>
                <td>
                  <Typography
                    level="body-xs"
                    sx={{
                      fontFamily: "Uber-Regular",
                      fontWeight: 400,
                      fontSize: 18,
                    }}
                  >
                    {row.barcode || "No disponible"}
                  </Typography>
                </td>
                <td>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Avatar size="sm" src={row.imageUrl}>
                      {row.name[0]}
                    </Avatar>
                    <div>
                      <Typography
                        level="body-xs"
                        sx={{
                          fontFamily: "Uber-Regular",
                          fontWeight: 400,
                          fontSize: 18,
                        }}
                      >
                        {row.name}
                      </Typography>
                    </div>
                  </Box>
                </td>
                <td>
                  <Typography
                    level="body-xs"
                    sx={{
                      fontFamily: "Uber-Regular",
                      fontWeight: 400,
                      fontSize: 18,
                    }}
                  >
                    {row.description || "No disponible"}
                  </Typography>
                </td>
                <td>
                  {row.status === "trash" ? (
                    <Chip
                      color="danger"
                      sx={{
                        fontFamily: "Uber-Medium",
                        fontWeight: 400,
                        fontSize: 18,
                      }}
                    >
                      No publicado
                    </Chip>
                  ) : (
                    <Chip
                      color="success"
                      sx={{
                        fontFamily: "Uber-Medium",
                        fontWeight: 400,
                        fontSize: 18,
                      }}
                    >
                      Publicado
                    </Chip>
                  )}
                </td>

                {isRetail ? (
                  <>
                    <td>
                      <Typography
                        level="body-xs"
                        sx={{
                          fontFamily: "Uber-Regular",
                          fontWeight: 400,
                          fontSize: 18,
                        }}
                      >
                        {row.variations.reduce(
                          (acc: number, variation: any) =>
                            acc + variation.stock,
                          0
                        )}
                      </Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">
                        {row.variations.length > 0 ? (
                          row.variations.map((variation: any, index: any) => (
                            <Chip
                              key={index}
                              sx={{
                                mr: 0.5,
                                fontFamily: "Uber-Regular",
                                fontWeight: 500,
                                fontSize: 18,
                              }}
                            >
                              {variation.name}
                            </Chip>
                          ))
                        ) : (
                          <Typography
                            level="body-xs"
                            sx={{
                              fontFamily: "Uber-Regular",
                              fontWeight: 400,
                              fontSize: 14,
                            }}
                          >
                            No disponible
                          </Typography>
                        )}
                      </Typography>
                    </td>
                  </>
                ) : (
                  <>
                    <td>
                      <Typography
                        level="body-xs"
                        sx={{
                          fontFamily: "Uber-Regular",
                          fontWeight: 400,
                          fontSize: 18,
                        }}
                      >
                        {row.precioVenta || "No disponible"}
                      </Typography>
                    </td>
                    <td>
                      <Typography
                        level="body-xs"
                        sx={{
                          fontFamily: "Uber-Regular",
                          fontWeight: 400,
                          fontSize: 18,
                        }}
                      >
                        {row.precioCompra || "No disponible"}
                      </Typography>
                    </td>
                    <td>
                      <Typography
                        level="body-xs"
                        sx={{
                          fontFamily: "Uber-Regular",
                          fontWeight: 400,
                          fontSize: 18,
                        }}
                      >
                        {row.minimumStock || "No disponible"}
                      </Typography>
                    </td>{" "}
                    <td>
                  <Typography
                    level="body-xs"
                    sx={{
                      fontFamily: "Uber-Regular",
                      fontWeight: 400,
                      fontSize: 18,
                    }}
                  >
                    {row.stockAvailable || "No disponible"}
                  </Typography>
                </td>                  </>
                )}
                <td>
                  {row.categories.map((category: any, index: any) => (
                    <Chip
                      sx={{
                        mr: 0.5,
                        fontFamily: "Uber-Medium",
                        fontWeight: 500,
                        fontSize: 18,
                      }}
                      key={index}
                    >
                      {category.name}
                    </Chip>
                  ))}
                </td>
                <td>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <RowMenu />
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
      <Box display="flex" justifyContent="flex-end" sx={{ marginTop: 1 }}>
        {selected.length > 0 && (
          <Button
            onClick={deleteProducts}
            variant="outlined"
            sx={{
              fontFamily: "Uber-Medium",
              textTransform: "none",
              fontSize: 18,
            }}
          >
            Eliminar Productos
          </Button>
        )}

        <Button
          variant="outlined"
          onClick={() => setPage(Math.max(0, page - 1))}
          disabled={page === 0}
          sx={{
            fontFamily: "Uber-Medium",
            textTransform: "none",
            fontSize: 18,
            margin: "0 8px",
          }}
        >
          Anterior
        </Button>
        <Button
          variant="outlined"
          onClick={() => setPage(page + 1)}
          disabled={
            page >= Math.ceil(filteredProducts.length / rowsPerPage) - 1
          }
          sx={{
            fontFamily: "Uber-Medium",
            textTransform: "none",
            fontSize: 18,
          }}
        >
          Siguiente
        </Button>
      </Box>
    </React.Fragment>
  );
}
