import React from "react";
import seat from "../assets/seat-available.svg";
import Tooltip from "./Tooltip";
import styled from "styled-components";
import { BookingContext } from "./BookingContext";
import { getRowName, getSeatNum } from "../helpers";

const Seat = ({ r_index, s_index, width, height, price, status }) => {
  const {
    actions: { beginBooking },
  } = React.useContext(BookingContext);
  //console.log(beginBooking);
  //const { beginBooking } = actions;

  const sid = `${getRowName(r_index)}-${getSeatNum(s_index)}`;
  return (
    <SeatWrapper>
      <Tooltip r_index={r_index} s_index={s_index} price={price}>
        <SeatBtn
          disabled={status}
          onClick={() =>
            beginBooking({
              status: "selecting",
              selectedSeatId: sid,
              price: price,
            })
          }
        >
          <SeatImg src={seat} width={width} height={height} isAva={!status} />
        </SeatBtn>
      </Tooltip>
    </SeatWrapper>
  );
};

const SeatWrapper = styled.div`
  padding: 3px;
`;
const SeatImg = styled.img`
  filter: ${(prop) => (prop.isAva ? `none` : "grayscale(100%)")};
`;
const SeatBtn = styled.button`
  cursor: pointer;
  border: none;
  outline: none;

  :focus {
    background-color: #ddd;
    outline: none;
  }
`;

export default Seat;
