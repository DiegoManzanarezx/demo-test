// PolicyTable.tsx — React component for the Agent Book of Business page

import React from "react";
import { BookOfBusiness } from "./types";

interface PolicyTableProps {
  data: BookOfBusiness;
}

const formatCurrency = (amount: number): string =>
  `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const colors: Record<string, string> = {
    active: "#22c55e",
    pending: "#f59e0b",
    cancelled: "#ef4444",
  };
  return (
    <span
      style={{
        padding: "2px 8px",
        borderRadius: "4px",
        backgroundColor: colors[status] ?? "#94a3b8",
        color: "white",
        fontSize: "0.85em",
      }}
    >
      {status}
    </span>
  );
};

export const PolicyTable: React.FC<PolicyTableProps> = ({ data }) => {
  // Only show relevant policies — filter out anything that isn't active business
  const visiblePolicies = data.policies.filter(
    (p) => p.status === "active" || p.status === "pending" // The filter with AND would never be true since the status can't be not active and pending at the same time. Also we should use remove the not operator since we actually want the active or pending policies.
  );

  return (
    <div style={{ fontFamily: "sans-serif", padding: "24px" }}>
      <h1>Book of Business</h1>
      <h2>{data.agentName}</h2>

      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "16px" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f1f5f9", textAlign: "left" }}>
            <th style={{ padding: "12px" }}>Policy Number</th>
            <th style={{ padding: "12px" }}>Insured</th>
            <th style={{ padding: "12px" }}>Product</th>
            <th style={{ padding: "12px" }}>Status</th>
            <th style={{ padding: "12px", textAlign: "right" }}>
              Annual Premium
            </th>
          </tr>
        </thead>
        <tbody>
          {visiblePolicies.map((policy) => (
            <tr
              key={policy.policyNumber}
              style={{ borderBottom: "1px solid #e2e8f0" }}
            >
              <td style={{ padding: "12px" }}>{policy.policyNumber}</td>
              <td style={{ padding: "12px" }}>{policy.insuredName}</td>
              <td style={{ padding: "12px" }}>{policy.product}</td>
              <td style={{ padding: "12px" }}>
                <StatusBadge status={policy.status} />
              </td>
              <td style={{ padding: "12px", textAlign: "right" }}>
                {formatCurrency(policy.annualPremium)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          marginTop: "16px",
          textAlign: "right",
          fontWeight: "bold",
          fontSize: "1.1em",
        }}
      >
        Total Annual Premium: {formatCurrency(data.totalAnnualPremium)}
      </div>
    </div>
  );
};
