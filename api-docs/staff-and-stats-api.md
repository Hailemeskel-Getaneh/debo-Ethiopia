# Staff & Stats API

## 👥 Personnel and Operations
Handles internal staff records and organizational performance metrics.

---

## 👨‍💼 Staff Management
**Base URL**: `/api/staffs/`

### 1. List Staff
`GET /`
- Returns a list of all staff members (Paginated).

### 2. Manage Staff (Admin Only)
- `POST /`: Add new staff record.
- `GET /{id}/`: View staff details.
- `PATCH /{id}/`: Update region or position.
- `DELETE /{id}/`: Remove staff record (**204 No Content**).

---

## 📊 Statistics API
**Base URL**: `/api/stats/`

### 1. Analytics & Metrics
- `GET /`: List all tracked impact metrics (e.g., "Active Volunteers", "Cities Covered").

### 2. Dashboard Tracking
- `POST /`: Add/Update a numeric metric.
- `GET /summary/`: Quick dashboard view of core numbers for the frontend home page/hero section.
- `DELETE /{id}/`: Remove a metric record (**204 No Content**).
