import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    name: "product001",
    type: "print",
  },
  {
    id: 2,
    name: "product002",
    type: "print",
  },
];
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      console.log(action.payload);
    },
  },
});

export default productSlice.reducer;
export const { addProduct } = productSlice.actions;
