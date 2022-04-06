import React, { useEffect } from "react";
import { Menu, Button, Divider } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../features/category/CategorySlice";
import { Link, Navigate } from "react-router-dom";
import { getProductWC } from "../features/product/ProductSlice";

const SiderProduct = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const categories = useSelector((data) => data.category.value);
  return (
    <>
      <Menu
        mode="vertical"
        style={{ width: 200, paddingTop: 30 }}
        title="Danh muc san pham"
      >
        {categories.map((item) => {
          return (
            <Menu.Item key={item._id}>
              <Button
                onClick={() => {
                  dispatch(getProductWC(item._id));
                }}
                block
              >
                {item.name}
              </Button>
            </Menu.Item>
          );
        })}
        {/* to={<Navigate to={`/products/category/${item._id}`} />} */}
      </Menu>
    </>
  );
};

export default SiderProduct;
