# Solution

## Overview

I fixed three bugs so the Book of Business page matches the behavior described in `README.md`.

## Changes

1. **Quarterly premium calculation (`policyService.ts`)**
   - Bug: quarterly premiums were annualized with `amount * 2` instead of `amount * 4`.
   - Fix: changed the quarterly branch in `annualizePremium` to `premium.amount * 4`.

2. **Agent filtering (`policyService.ts`)**
   - Bug: `getBookOfBusiness(agentID)` ignored its `agentID` argument and always filtered on `"AGT-1001"`. 
   - Fix: updated the filter to use `p.agentID === agentID`, so the function works for any agent. -> (Evn though the instructions ask for AGT-1001, this should be called at top level since the function allows an ID, so no need to harcode it)

3. **Frontend status filter (`PolicyTable.tsx`)**
   - Bug: the table filtered **out** active and pending policies with `p.status !== "active" && p.status !== "pending"`.
   - Fix: changed it to `p.status === "active" || p.status === "pending"` so only active and pending policies are shown.

## Client side preview and steps to replicat:

### Clone the repo
git clone https://github.com/DiegoManzanarezx/demo-test.git

### Install dependencies
npm install

### Run the app
npm run dev

### Result:

<img width="3412" height="410" alt="image" src="https://github.com/user-attachments/assets/f0e2d643-3621-4f32-a4ef-ba4585cea79c" />

## For easier results (only server debugging) -> for `AGT-1001`:


###  Use:

```npx --yes ts-node -O '{"module":"commonjs"}' -e "const { getBookOfBusiness } = require('./policyService'); console.log(JSON.stringify(getBookOfBusiness('AGT-1001'), null, 2));"```

### Results:

```json
{
  "agentName": "Margaret Chen",
  "policies": [
    {
      "policyNumber": "POL-2024-001",
      "insuredName": "James Whitfield",
      "product": "Secure Horizon Term Life",
      "status": "active",
      "annualPremium": 1500
    },
    {
      "policyNumber": "POL-2024-002",
      "insuredName": "Anika Patel",
      "product": "Legacy Builder Whole Life",
      "status": "active",
      "annualPremium": 4800
    },
    {
      "policyNumber": "POL-2024-003",
      "insuredName": "Robert Espinoza",
      "product": "FlexGrowth Indexed Annuity",
      "status": "pending",
      "annualPremium": 3000
    },
    {
      "policyNumber": "POL-2024-005",
      "insuredName": "Michael Tanaka",
      "product": "RetireWell Fixed Annuity",
      "status": "active",
      "annualPremium": 6000
    }
  ],
  "totalAnnualPremium": 15300
}
```



