import React from "react";
import styled from "styled-components";
import FormPaymentDialog from "./FormPaymentDialog";
import { BookingContext } from "./BookingContext";

const PurchaseModel = () => {
  return (
    <PurchaseModalWrapper>
      <FormPaymentDialog />
    </PurchaseModalWrapper>
  );
};
export default PurchaseModel;

const PurchaseModalWrapper = styled.div``;
