import instance from "./intance";
import { isAuthenticate } from "../utils/localStorage";

const userInfo = isAuthenticate();

export const list = () => {
  const url = `/products`;
  return instance.get(url);
};

export const listWithCategory = () => {
  const url = `/products?_expand=category`;
  return instance.get(url);
};

export const add = (product) => {
  const url = `/products/${userInfo?.user?.id}`;
  return instance.post(url, product, {
    headers: {
      Authorization: `Bearer ${userInfo?.token}`,
    },
  });
};

export const remove = (id) => {
  const url = `products/${id}`;

  return instance.delete(url);
};

export const read = (id) => {
  const url = `products/${id}`;
  return instance.get(url);
};

export const readWithCateId = (id) => {
  const url = `products/${id}?_expand=category`;
  return instance.get(url);
};

export const listWithCate = (id) => {
  const url = `categories/${id}?_embed=products`;
  return instance.get(url);
};

export const edit = (product) => {
  console.log(product);
  const url = `products/${product._id}`;
  console.log(url);
  return instance.put(url, product);
};

export const search = (searchValue) => {
  const url = `products?search=${searchValue}`;
  return instance.get(url);
};
