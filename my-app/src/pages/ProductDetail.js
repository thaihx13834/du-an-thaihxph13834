import React, { useEffect } from "react";
import {
  Layout,
  Typography,
  Image,
  Row,
  Col,
  Form,
  Input,
  Button,
  Modal,
} from "antd";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../features/product/ProductSlice";
import { read } from "../api/product";
import { addToCart } from "../utils/cart";

const ProductDetail = () => {
  const { Content } = Layout;
  const { Title, Paragraph } = Typography;
  const dispatch = useDispatch();
  const { id } = useParams("id");
  useEffect(() => {
    dispatch(getProduct(id));
  }, []);

  const [form] = Form.useForm();
  const product = useSelector((data) => data.product.value);

  const onfinish = async (value) => {
    console.log(typeof +value.quantity);
    const { data } = await read(id);
    addToCart(
      { ...data, quantity: +value.quantity ? +value.quantity : 1 },
      () => {
        Modal.success({ title: "Them thanh cong vao gio hang" });
      }
    );
  };

  return (
    <div>
      <Content style={{ padding: "50px" }}>
        <Row>
          <Col span={12} style={{ textAlign: "center" }}>
            <Image src={product.img} width={600} />
          </Col>
          <Col span={12}>
            <Typography>
              <Title level={2}>Tên sản phẩm: {product.name}</Title>
              <Title level={4}>Giá: {product.price} vnđ</Title>
              <Paragraph>
                <Title level={4}>Mô tả: </Title> {product.desc}
              </Paragraph>
            </Typography>

            <Form
              form={form}
              onFinish={onfinish}
              initialValues={{ quantity: "1" }}
              layout="vertical"
            >
              <Form.Item name="quantity" label="Số lượng sản phẩm:">
                <Input width={300} maxLength="100px" />
              </Form.Item>
              <Form.Item>
                <Button block type="primary" htmlType="submit">
                  Add to cart
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </div>
  );
};

export default ProductDetail;
