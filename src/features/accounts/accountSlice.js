const initailStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

export default function accountReducer(state = initailStateAccount, action) {
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

export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount: amount, purpose: purpose },
  };
}
export function deposit(amount, currency) {
  console.log(amount);
  if (currency === "USD")
    return {
      type: "account/deposit",
      payload: amount,
    };

  return async function (dispatch) {
    console.log(amount);
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    console.log(data);
    const converted = data.rates.USD;
    dispatch({
      type: "account/deposit",
      payload: converted,
    });
  };
}
export function withdraw(amount) {
  return {
    type: "account/withdraw",
    payload: amount,
  };
}

export function payLoan() {
  return {
    type: "account/payLoan",
  };
}
