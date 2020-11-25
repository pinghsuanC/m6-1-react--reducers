import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";

import PurchaseModel from "./PurchaseModel";
import Seat from "./Seat";
import { SeatContext } from "./SeatContext";

const TicketWidget = () => {
  const {
    state: { numOfRows },
    state: { seatsPerRow },
    state: { hasLoaded },
    state: { seats },
  } = React.useContext(SeatContext);

  return hasLoaded ? (
    <WidgetWrapper>
      {range(numOfRows).map((row) => {
        const r_name = getRowName(row);
        return (
          <RowWrapper key={r_name}>
            <RowTxt>Row {r_name}</RowTxt>
            <ColWrapper key={row}>
              {range(seatsPerRow).map((col) => {
                const s_name = `${r_name}-${getSeatNum(col)}`;
                const s = seats[s_name];
                return (
                  <Seat
                    key={s_name}
                    r_index={row}
                    s_index={col}
                    width={40}
                    height={40}
                    price={s.price}
                    status={s.isBooked}
                  />
                );
              })}
            </ColWrapper>
          </RowWrapper>
        );
      })}
    </WidgetWrapper>
  ) : (
    <WidgetWrapper>
      <CircularProgress />
    </WidgetWrapper>
  );
};

const WidgetWrapper = styled.div`
  align-self: center;
  width: auto;
  height: auto;
  border-radius: 3px;
  padding: 8px;
  display: flex;
  flex-direction: column;
`;
const RowWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const ColWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background: #fafbfc;
  padding: 10px;
`;
const RowTxt = styled.div`
  color: white;
  font-weight: bold;
  width: auto;
  padding-right: 10px;
`;

export default TicketWidget;
