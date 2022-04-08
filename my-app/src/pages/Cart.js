import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Divider, Image, Button, Table, Modal } from "antd";
import { getDataCart } from "../utils/localStorage";
import {
  PlusSquareOutlined,
  MinusSquareOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { isAuthenticate } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const dataSouces = getDataCart();
  useEffect(() => {
    const data = [];
    dataSouces.map((item, index) => {
      data.push({
        key: index + 1,
        name: item.name,
        img: item.img,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity,
      });
    });

    setDataSource(data);
  }, []);

  console.log(dataSource);
  const columns = [
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (text) => <Image width={100} src={text} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => {
        return (
          <>
            <Button
              type="text"
              onClick={() => {
                const quantt = (record.quantity += 1);
                const total = record.price * quantt;
                const editData = { ...record, quantity: quantt, total: total };
                console.log(editData);

                setDataSource(
                  dataSource.map((item) =>
                    item.key === record.key ? editData : item
                  )
                );
                localStorage.setItem(
                  "cart",
                  JSON.stringify(
                    dataSource.map((item) =>
                      item.key === record.key ? editData : item
                    )
                  )
                );
              }}
            >
              <PlusSquareOutlined />
            </Button>
            <span>{text}</span>
            <Button
              type="text"
              onClick={() => {
                const quantt = (record.quantity -= 1);
                if (quantt < 1) {
                  console.log(quantt);
                  setDataSource(
                    dataSource.filter((item) => item.key !== record.key)
                  );
                  localStorage.setItem(
                    "cart",
                    JSON.stringify(
                      dataSource.filter((item) => item.key !== record.key)
                    )
                  );
                } else {
                  const total = record.price * quantt;
                  const editData = {
                    ...record,
                    quantity: quantt,
                    total: total,
                  };
                  console.log(editData);

                  setDataSource(
                    dataSource.map((item) =>
                      item.key === record.key ? editData : item
                    )
                  );
                  localStorage.setItem(
                    "cart",
                    JSON.stringify(
                      dataSource.map((item) =>
                        item.key === record.key ? editData : item
                      )
                    )
                  );
                }
              }}
            >
              <MinusSquareOutlined />
            </Button>
          </>
        );
      },
    },

    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <DeleteOutlined
            style={{ color: "red", marginLeft: 12, cursor: "pointer" }}
            onClick={() => {
              Modal.confirm({
                title: `Are you sure delete this product ${record.name}?`,
                okText: "Ok",
                okType: "danger",
                onOk: () => {
                  setDataSource(
                    dataSource.filter((item) => item.key !== record.key)
                  );
                  localStorage.setItem(
                    "cart",
                    JSON.stringify(
                      dataSource.filter((item) => item.key !== record.key)
                    )
                  );
                },
              });
            }}
          />
        );
      },
    },
  ];
  return (
    <div style={{ padding: 50 }}>
      <Row>
        <Col span={12} offset={6}>
          <Divider orientation="center">Cart Product</Divider>
          <Table columns={columns} dataSource={dataSource} pagination={true} />
          <Button
            block
            type="primary"
            bordered={true}
            sytle={{ marginTop: 40 }}
            onClick={() => {
              const user = isAuthenticate();
              if (!user) {
                Modal.error({
                  title: "Vui lòng đăng nhập để thanh toán",
                });
                navigate("/signin");
              } else {
                navigate("/checkout");
              }
            }}
          >
            Check Out
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
