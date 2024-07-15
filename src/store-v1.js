/* eslint-disable no-unused-vars */
import { combineReducers, createStore } from "redux";

const initailStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initailStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};
function accountReducer(state = initailStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}
function customerReducer(state = initailStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);

store.dispatch({ type: "account/deposit", payload: 500 });
store.dispatch({
  type: "account/requestLoan",
  payload: { amount: 500, purpose: "Buy a Car" },
});
store.dispatch({ type: "account/payLoan" });

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}

store.dispatch(createCustomer("Hamza Zuabir", 12345));
console.log(store.getState());
