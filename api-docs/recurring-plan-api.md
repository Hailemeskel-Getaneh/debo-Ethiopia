# Recurring Plans API

## 🔄 Subscription Management
Manages automated recurring donations (Monthly/Yearly).

---

## Endpoints

### 1. List Plans
`GET /api/recurring-plans/`
- **Pagination**: Results are paged.
- **Success (200 OK)**:
```json
{
  "count": 5,
  "results": [
    {
      "id": 1,
      "interval": "monthly",
      "is_active": true,
      "start_date": "2024-01-01"
    }
  ]
}
```

### 2. Manage Plans
- `POST /`: Create a new automated plan description (**201 Created**).
- `PATCH /{id}/activate/`: Resume a paused plan.
- `PATCH /{id}/deactivate/`: Stop a recurring plan.
- `DELETE /{id}/`: Remove plan record (**204 No Content**).

### 3. Plan History
- `GET /api/recurring-plans/{id}/donations/`: List all individual payments received under this specific recurring plan.
- `GET /api/recurring-plans/stats/`: View growth and retention metrics for recurring donations.