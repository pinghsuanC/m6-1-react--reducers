import React from "react";
export const BookingContext = React.createContext();

const initialState = {
  status: "idle",
  error: null,
  selectedSeatId: null,
  price: null,
};

function reducer(state, action) {
  //console.log(action);
  switch (action.type) {
    case "beginBooking": {
      //console.log(action);
      return {
        ...state,
        status: "selecting",
        error: action.error,
        selectedSeatId: action.selectedSeatId,
        price: action.price,
      };
    }
    case "cancelBooking": {
      return {
        ...state,
        status: "idle",
        error: null,
        selectedSeatId: null,
        price: null,
      };
    }
    case "purchaseReq": {
      return {
        ...state,
        status: "submitting",
        error: null,
        selectedSeatId: action.selectedSeatId,
        price: action.price,
      };
    }
    case "purchaseFail": {
      return {
        ...state,
        status: "error",
        error: action.error,
        selectedSeatId: action.selectedSeatId,
        price: action.price,
      };
    }
    case "purchaseSucc": {
      return {
        ...state,
        status: "success",
        error: null,
        selectedSeatId: null,
        price: null,
      };
    }
    case "resetDefault": {
      return {
        ...state,
        status: "idle",
        error: null,
        selectedSeatId: null,
        price: null,
      };
    }
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const beginBooking = (data) => {
    //console.log(data);
    dispatch({
      type: "beginBooking",
      ...data,
    });
  };

  const cancelBooking = (data) => {
    dispatch({
      type: "cancelBooking",
      ...data,
    });
  };

  const purchaseReq = (data) => {
    dispatch({
      type: "purchaseReq",
      ...data,
    });
  };

  const purchaseFail = (data) => {
    dispatch({
      type: "purchaseFail",
      ...data,
    });
  };

  const purchaseSucc = (data) => {
    dispatch({
      type: "purchaseSucc",
      ...data,
    });
  };

  const resetDefault = () => {
    dispatch({ type: "resetDefault", ...initialState });
  };

  return (
    <BookingContext.Provider
      value={{
        state,
        actions: {
          beginBooking,
          cancelBooking,
          purchaseReq,
          purchaseFail,
          purchaseSucc,
          resetDefault,
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
