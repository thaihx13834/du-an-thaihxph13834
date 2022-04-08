import instance from "./intance";

export const creat = (bill) => {
  const url = "/bills";
  return instance.post(url, bill);
};

export const creatbilldt = (billdetail) => {
  const url = "/billdetails";
  return instance.post(url, billdetail);
};
