import { useSelector } from "react-redux";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import "./App.css";
function App() {
  const store = useSelector((store) => store);
  console.log(store);
  return (
    <>
      {!store.customer.fullName ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </>
  );
}

export default App;
