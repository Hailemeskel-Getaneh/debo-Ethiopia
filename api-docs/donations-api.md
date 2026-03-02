# Donations API

## 💰 Donation Integration
The Donations API handles single and recurring contributions.

---

## Endpoints

### 1. List Donations (Admin Only)
`GET /api/donations/`
- **Pagination**: Standard wrapper (`count`, `results`).
- **Success (200 OK)**: Paginated results of all donor activity.

### 2. Submit a Donation (Public)
`POST /api/donations/`
- Call this after the payment gateway (e.g., Stripe, Chapa) returns a success.
- **Request Body**:
```json
{
  "first_name": "John",
  "amount": 100,
  "currency": "ETB",
  "payment_method": "card",
  "recurring_plan_id": null 
}
```
- **Success (201 Created)**: Donation record stored.

### 3. Get My Donations
`GET /api/donations/mine/`
- **Requirement**: Must be authenticated.
- **Use Case**: Show a user their donation history on their profile page.

### 4. Manage Donation (Admin Only)
- `GET/{id}/`: View details.
- `PATCH/{id}/`: Update status (e.g., from `pending` to `completed`).
- `DELETE/{id}/`: **204 No Content** on success.

---

## 📅 Recurring Plan Management
**Base URL**: `/api/recurring-plans/`

- `GET /`: List all active subscription plans.
- `POST /`: Create a new plan (e.g., "Monthly Education Support").
- `PATCH /{id}/deactivate/`: Stop a recurring plan.
