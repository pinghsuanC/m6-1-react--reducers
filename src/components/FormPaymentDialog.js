import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { BookingContext } from "./BookingContext";
import { makeStyles } from "@material-ui/core/styles";

export default function FormPaymentDialog() {
  const { state, actions } = React.useContext(BookingContext);
  const {
    cancelBooking,
    purchaseReq,
    purchaseFail,
    purchaseSucc,
    resetDefault,
  } = actions;
  const { status, selectedSeatId, price } = state;
  console.log(state);
  // states
  const [cr, setCr] = useState("");
  const [exp, setExp] = useState("");
  // console.log(isOpen);
  // handlers
  const handleReset = () => {
    resetDefault(); // reset to default value
  };
  const handleClose = () => {
    cancelBooking(); // cancel the booking
  };
  const handlePurchase = (ev) => {
    purchaseReq({
      status: "submitting",
      selectedSeatId: selectedSeatId,
      price: price,
    });
    // send back to server
    fetch("/api/book-seat", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        seatId: selectedSeatId,
        creditCard: cr,
        expiration: exp,
      }),
    })
      .then((info) => info.json())
      .then((info) => {
        if (info.status === 200) {
          purchaseSucc({
            // set back to default state
            status: "success",
            error: null,
            selectedSeatId: null,
            price: null,
          });
        } else {
          //console.log(info.message);
          purchaseFail({
            status: "error",
            error: info.message,
            selectedSeatId: selectedSeatId,
            price: price,
          });
        }
      });
  };

  return (
    <div>
      {status === "selecting" ? (
        <Dialog
          open={status === "selecting"}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Purchase ticket</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You are purchasing <PurchaseNum>1</PurchaseNum> ticket for the
              price of ${price}, seat {state.selectedSeatId}
            </DialogContentText>
            <TextField
              autoFocus
              margin="normal"
              id="creditCard"
              label="Credit Card Number"
              value={cr}
              onChange={(ev) => setCr(ev.target.value)}
              fullWidth
              required
            />
            <label htmlFor="expire">Expiration Date:</label>
            <TextField
              margin="normal"
              id="expire"
              type="date"
              value={exp}
              onChange={(ev) => setExp(ev.target.value)}
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={(ev) => handlePurchase(ev)} color="primary">
              Purchase
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      ) : status === "error" ? (
        <Dialog open={status === "error"}>
          <DialogActions>
            <DialogContentText>
              Sorry an error occurred: {state.error}. The purchase failed.
              Please contact us for information.
            </DialogContentText>
            <Button onClick={handleClose} color="primary">
              Leave
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        status === "success" && (
          <Dialog open={status === "success"}>
            <DialogContentText>Your purchase was successful!</DialogContentText>
            <DialogActions>
              <Button onClick={handleReset} color="primary">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        )
      )}
    </div>
  );
}

const PurchaseNum = styled.span`
  font-weight: 600;
`;
const PurchasePrice = styled.span``;
