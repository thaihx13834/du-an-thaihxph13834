import React, { useEffect, useState } from "react";
import { Table, Divider, Space, Button, PageHeader, Modal, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getBills, removeBill } from "./BillSlice";
import { read } from "../../api/user";
import moment from "moment";
import {
  EditOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { isAuthenticate } from "../../utils/localStorage";

const Bill = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBills());
  }, []);

  const bills = useSelector((data) => data.bill.value);
  //   console.log(bills);
  //   const { user } = isAuthenticate();
  const dataSource = bills.map((item, index) => {
    const date = moment(item.createdAt).format("HH:mm:ss DD-MM-YYYY");
    console.log(date);
    return {
      key: index + 1,
      id: item._id,
      name: item.user.name,
      phone: item.phone,
      address: item.address,
      total: item.total,
      status: item.status,
      date: date,
    };
  });

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: (record1, record2) => {
        return record1.id - record2.id;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        console.log(selectedKeys);
        return (
          <div style={{ padding: "10px" }}>
            <Input
              autoFocus
              placeholder="Nhap ten danh muc!"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
            ></Input>
            <Space style={{ marginTop: "20px" }}>
              <Button
                onClick={() => {
                  confirm();
                }}
                type="primary"
              >
                Tìm kiếm
              </Button>

              <Button
                onClick={() => {
                  clearFilters();
                }}
                type="danger"
              >
                Reset
              </Button>
            </Space>
          </div>
        );
      },
      onFilter: (value, record) => {
        return record.name.toLowerCase().includes(value.toLowerCase());
        // console.log(record.name.toLowerCase().includes(value.toLowerCase()));
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
    },

    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },

    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },

    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      sorter: (record1, record2) => {
        return record1.total - record2.total;
      },
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        if (text === 0) {
          return <p>Chờ xử lý</p>;
        } else if (text === 1) {
          return <p>Đang xử lý</p>;
        } else if (text === 2) {
          return <p>Đang giao hàng</p>;
        } else if (text === 4) {
          return <p>Đã giao hàng</p>;
        }
      },
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/bills/${record.id}`}>
            <ExclamationCircleOutlined />
          </Link>
          <Link to={`/bills/${record.id}/edit`}>
            <EditOutlined />
          </Link>

          <DeleteOutlined
            style={{ color: "red", marginLeft: 12, cursor: "pointer" }}
            onClick={() => {
              Modal.confirm({
                title: `Are you sure delete this product ${record.name}?`,
                okText: "Ok",
                okType: "danger",
                onOk: () => {
                  dispatch(removeBill(record.id));
                },
              });
            }}
          />
        </Space>
      ),
    },
  ];
  return (
    <div style={{ padding: "20px" }}>
      <PageHeader
        ghost={false}
        title="Danh sách loại hàng"
        extra={[
          <Button key="1" type="primary">
            <Link to={`/admin/bills/add`}>Thêm mới loại hàng</Link>
          </Button>,
        ]}
      ></PageHeader>
      <Divider orientation="left"></Divider>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 9 }}
      />
    </div>
  );
};

export default Bill;
