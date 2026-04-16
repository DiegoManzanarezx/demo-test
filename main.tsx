import React from "react";
import ReactDOM from "react-dom/client";
import { PolicyTable } from "./PolicyTable";
import { getBookOfBusiness } from "./policyService";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PolicyTable data={getBookOfBusiness("AGT-1001")} />
  </React.StrictMode>
);