/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import { ColorPaletteProp } from "@mui/joy/styles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { deleteProduct } from "../../../../services/products";

const rows = [
  {
    id: "INV-1234",
    date: "Feb 3, 2023",
    status: "Refunded",
    customer: {
      initial: "O",
      name: "Olivia Ryhe",
      email: "olivia@email.com",
    },
  },
  {
    id: "INV-1233",
    date: "Feb 3, 2023",
    status: "Paid",
    customer: {
      initial: "S",
      name: "Steve Hampton",
      email: "steve.hamp@email.com",
    },
  },
  {
    id: "INV-1232",
    date: "Feb 3, 2023",
    status: "Refunded",
    customer: {
      initial: "C",
      name: "Ciaran Murray",
      email: "ciaran.murray@email.com",
    },
  },
  {
    id: "INV-1231",
    date: "Feb 3, 2023",
    status: "Refunded",
    customer: {
      initial: "M",
      name: "Maria Macdonald",
      email: "maria.mc@email.com",
    },
  },
  {
    id: "INV-1230",
    date: "Feb 3, 2023",
    status: "Cancelled",
    customer: {
      initial: "C",
      name: "Charles Fulton",
      email: "fulton@email.com",
    },
  },
  {
    id: "INV-1229",
    date: "Feb 3, 2023",
    status: "Cancelled",
    customer: {
      initial: "J",
      name: "Jay Hooper",
      email: "hooper@email.com",
    },
  },
  {
    id: "INV-1228",
    date: "Feb 3, 2023",
    status: "Refunded",
    customer: {
      initial: "K",
      name: "Krystal Stevens",
      email: "k.stevens@email.com",
    },
  },
  {
    id: "INV-1227",
    date: "Feb 3, 2023",
    status: "Paid",
    customer: {
      initial: "S",
      name: "Sachin Flynn",
      email: "s.flyn@email.com",
    },
  },
  {
    id: "INV-1226",
    date: "Feb 3, 2023",
    status: "Cancelled",
    customer: {
      initial: "B",
      name: "Bradley Rosales",
      email: "brad123@email.com",
    },
  },
  {
    id: "INV-1225",
    date: "Feb 3, 2023",
    status: "Paid",
    customer: {
      initial: "O",
      name: "Olivia Ryhe",
      email: "olivia@email.com",
    },
  },
  {
    id: "INV-1224",
    date: "Feb 3, 2023",
    status: "Cancelled",
    customer: {
      initial: "S",
      name: "Steve Hampton",
      email: "steve.hamp@email.com",
    },
  },
  {
    id: "INV-1223",
    date: "Feb 3, 2023",
    status: "Paid",
    customer: {
      initial: "C",
      name: "Ciaran Murray",
      email: "ciaran.murray@email.com",
    },
  },
  {
    id: "INV-1221",
    date: "Feb 3, 2023",
    status: "Refunded",
    customer: {
      initial: "M",
      name: "Maria Macdonald",
      email: "maria.mc@email.com",
    },
  },
  {
    id: "INV-1220",
    date: "Feb 3, 2023",
    status: "Paid",
    customer: {
      initial: "C",
      name: "Charles Fulton",
      email: "fulton@email.com",
    },
  },
  {
    id: "INV-1219",
    date: "Feb 3, 2023",
    status: "Cancelled",
    customer: {
      initial: "J",
      name: "Jay Hooper",
      email: "hooper@email.com",
    },
  },
  {
    id: "INV-1218",
    date: "Feb 3, 2023",
    status: "Cancelled",
    customer: {
      initial: "K",
      name: "Krystal Stevens",
      email: "k.stevens@email.com",
    },
  },
  {
    id: "INV-1217",
    date: "Feb 3, 2023",
    status: "Paid",
    customer: {
      initial: "S",
      name: "Sachin Flynn",
      email: "s.flyn@email.com",
    },
  },
  {
    id: "INV-1216",
    date: "Feb 3, 2023",
    status: "Cancelled",
    customer: {
      initial: "B",
      name: "Bradley Rosales",
      email: "brad123@email.com",
    },
  },
];

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

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

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

  const handleStatusFilterChange = (
    event: React.SyntheticEvent | null,
    newValue: any
  ) => {
    setStatusFilter(newValue);
  };

  const handleCategoryFilterChange = (
    event: React.SyntheticEvent | null,
    newValue: any
  ) => {
    setCategoryFilter(newValue);
  };

  const deleteProducts = async () => {
    const payload = { ids: selected }; // 'selected' should be an array of product IDs
    try {
      const response = await deleteProduct(payload); // Assuming deleteProduct handles the API call
      if (response) {
        console.log('Products deleted successfully:', response);
        // Refresh the product list after successful deletion
        reloadProducts(); // Call to reload products
        setSelected([]);
      }
    } catch (error) {
      console.error('Failed to delete products:', error);
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
  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Estado del producto</FormLabel>
        <Select
          size="sm"
          value={statusFilter}
          onChange={handleStatusFilterChange}
          placeholder="Filter by status"
          slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
        >
          <Option value="">Todos</Option>
          {uniqueStatuses.map((status) => (
            <Option key={String(status)} value={String(status)}>
              {status === "trash" ? "No publicado" : "Publicado"}
            </Option>
          ))}
        </Select>
      </FormControl>

      <FormControl size="sm">
        <FormLabel>Categorias</FormLabel>
        <Select
          size="sm"
          placeholder="All"
          value={categoryFilter}
          onChange={handleCategoryFilterChange}
        >
          <Option value="">Todas</Option>
          {uniqueCategories.map((categories: any) => (
            <Option key={String(categories)} value={String(categories)}>
              {categories}
            </Option>
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
  console.log(currentRows);
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
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Búsqueda por nombre</FormLabel>
          <Input
            size="sm"
            placeholder="Buscar..."
            startDecorator={<SearchIcon />}
            sx={{ flexGrow: 1 }}
            value={searchTerm}
            onChange={handleSearchChange}
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
                }}
              >
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                  fontWeight="lg"
                  endDecorator={<ArrowDropDownIcon />}
                  sx={{
                    "& svg": {
                      transition: "0.2s",
                      transform:
                        order === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                    },
                  }}
                >
                  Código
                </Link>
              </th>
              <th
                style={{
                  width: 240,
                  padding: "12px 6px",
                  fontFamily: "Uber-Medium",
                  fontWeight: 500,
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
                }}
              >
                Descripción
              </th>
              <th
                style={{
                  width: 140,
                  padding: "12px 6px",
                  fontFamily: "Uber-Medium",
                  fontWeight: 500,
                }}
              >
                Estado
              </th>

              <th
                style={{
                  width: 100,
                  padding: "12px 6px",
                  fontFamily: "Uber-Medium",
                  fontWeight: 500,
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
                }}
              >
                Variaciones
              </th>
              <th
                style={{
                  width: 240,
                  padding: "12px 6px",
                  fontFamily: "Uber-Medium",
                  fontWeight: 500,
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
                }}
              >
                {" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row: any, index: any) => (
              <tr key={index}>
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
                      fontSize: 14,
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
                          fontSize: 14,
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
                      fontSize: 14,
                    }}
                  >
                    {row.description || "No disponible"}
                  </Typography>
                </td>
                <td>
                  {row.status === "trash" ? (
                    <Chip
                      color="danger"
                      sx={{ fontFamily: "Uber-Regular", fontWeight: 400 }}
                    >
                      No publicado
                    </Chip>
                  ) : (
                    <Chip
                      color="success"
                      sx={{ fontFamily: "Uber-Regular", fontWeight: 400 }}
                    >
                      Publicado
                    </Chip>
                  )}
                </td>

                <td>
                  <Typography
                    level="body-xs"
                    sx={{
                      fontFamily: "Uber-Regular",
                      fontWeight: 400,
                      fontSize: 14,
                    }}
                  >
                    {row.variations.reduce(
                      (acc: number, variation: any) => acc + variation.stock,
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

                <td>
                  {row.categories.map((category: any, index: any) => (
                    <Chip
                      sx={{
                        mr: 0.5,
                        fontFamily: "Uber-Regular",
                        fontWeight: 500,
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
      <Box display="flex" justifyContent="space-between">
        <Button onClick={() => setPage(page - 1)} disabled={page === 0}>
          Anterior
        </Button>
        {selected.length > 0 && (
          <Button onClick={deleteProducts} color="danger">Eliminar Productos</Button>
        )}
        <Button
          onClick={() => setPage(page + 1)}
          disabled={
            page >= Math.ceil(filteredProducts.length / rowsPerPage) - 1
          }
        >
          Siguiente
        </Button>
      </Box>
    </React.Fragment>
  );
}
