// MultipleSelectChip.jsx
import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

// Las props son las categorías que vienen del componente padre y la selección actual
export default function MultipleSelectChip(
  categories: any,
  selectedCategories: any,
  onChange: any
) {
  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="demo-multiple-chip-label">Categorías</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={selectedCategories}
        onChange={onChange}
        input={<OutlinedInput id="select-multiple-chip" label="Categorías" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value: any) => (
              <Chip
                key={value}
                label={categories.find((cat: any) => cat.id === value).name}
              />
            ))}
          </Box>
        )}
      >
        {categories.map((category: any) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
