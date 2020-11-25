// react & styled
import React, { useEffect } from "react";
import styled from "styled-components";
// global style
import GlobalStyles from "./GlobalStyles";
// components
import TicketWidget from "./TicketWidget";
import PurchaseModel from "./PurchaseModel";
// loading circle
import CircularProgress from "@material-ui/core/CircularProgress";
import { SeatContext } from "./SeatContext";

function App() {
  // retrieve info from context
  const {
    state: { hasLoaded },
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  // useEffect to fetch data from server
  useEffect(() => {
    fetch("/api/seat-availability")
      .then((info) => info.json())
      .then((info) => receiveSeatInfoFromServer(info));
  }, []);

  return (
    <AppWrapper>
      {hasLoaded ? <TicketWidget /> : <CircularProgress />}
      <PurchaseModel />
      <GlobalStyles />
    </AppWrapper>
  );
}
const AppWrapper = styled.div`
  width: 90vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;
