import React from "react";
import Tippy from "@tippyjs/react";
import styled from "styled-components";
import { getRowName, getSeatNum } from "../helpers";

const Tooltip = ({ r_index, s_index, price, children }) => {
  return (
    <TippyWrapper
      className="Tippy"
      delay={[1000, 200]}
      content={`Row ${getRowName(r_index)} Seat ${getSeatNum(
        s_index
      )} , $${price}`}
      animation="scale"
      arrow={true}
    >
      {children}
    </TippyWrapper>
  );
};

const TippyWrapper = styled(Tippy)`
  color: white;
  padding: 10px;
  background: black;
  opacity: 0.7;
`;

export default Tooltip;
