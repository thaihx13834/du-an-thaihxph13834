import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/ProductSlice";
import categoryReducer from "../features/category/CategorySlice";
import userReducer from "../features/user/UserSlice";
import billReducer from "../features/bill/BillSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
    user: userReducer,
    bill: billReducer,
  },
});
