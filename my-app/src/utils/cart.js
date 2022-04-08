let cart = [];
if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"));
}

export const addToCart = (newProduct, next) => {
  console.log(newProduct);
  const exitsProduct = cart.find((item) => item._id === newProduct._id);
  console.log(exitsProduct);
  if (!exitsProduct) {
    cart.push(newProduct);
  } else {
    exitsProduct.quantity += +newProduct.quantity;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  next();
};
export const increaseQuantity = (id, next) => {
  console.log(id);
  const currentProduct = cart.find((item) => item.id == id);
  currentProduct.quantity++;
  localStorage.setItem("cart", JSON.stringify(cart));
  next();
};
export const decreaseQuantity = (id, next) => {
  console.log(cart);
  const currentProduct = cart.find((item) => item.id == id);

  currentProduct.quantity--;
  if (currentProduct.quantity < 1) {
    const confirm = window.confirm("Ban co chac chan xoa khong?");
    if (confirm) {
      cart = cart.filter((item) => item.id != id);
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  next();
};
export const removeItemInCart = (id, next) => {
  const confirm = window.confirm("Ban co chac chan xoa khong?");
  if (confirm) {
    cart = cart.filter((item) => item.id !== +id);
    console.log(cart);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  next();
};
