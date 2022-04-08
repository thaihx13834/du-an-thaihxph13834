import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { list, remove } from "../../api/bill";

export const getBills = createAsyncThunk("bill/getBills", async () => {
  const { data } = await list();
  return data;
});

export const removeBill = createAsyncThunk("bill/removeBill", async (id) => {
  await remove(id);
  return id;
});

// export const addCategory = createAsyncThunk(
//   "category/addCategory",
//   async (category) => {
//     const { data } = await add(category);
//     return data;
//   }
// );

// export const updateCategory = createAsyncThunk(
//   "category/updateCategory",
//   async (category) => {
//     const { data } = await edit(category);
//     return data;
//   }
// );

const billSlice = createSlice({
  name: "bill",
  initialState: {
    value: [],
  },

  extraReducers: (builder) => {
    builder.addCase(getBills.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    // builder.addCase(addCategory.fulfilled, (state, action) => {
    //   console.log(action.payload);
    //   state.value.push(action.payload);
    // });
    builder.addCase(removeBill.fulfilled, (state, action) => {
      state.value = state.value.filter((item) => item._id !== action.payload);
    });
    // builder.addCase(updateCategory.fulfilled, (state, action) => {
    //   console.log(action.payload);
    //   state.value = state.value.map((item) =>
    //     item._id === action.payload._id ? action.payload : item
    //   );
    // });
  },
});

export default billSlice.reducer;
