import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBillDetail } from "./BillSlice";
import { listDetail } from "../../api/bill";

const BillDetail = () => {
  const { id } = useParams("id");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBillDetail(id));
  }, [id]);
  const data = useSelector((data) => data.bill.value);
  console.log(data);

  return <div>BillDetail</div>;
};

export default BillDetail;
