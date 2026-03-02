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

Handles impact metrics and analytics data displayed across the public site.

### 1. List Metrics
`GET /`
- Returns a list of all tracked metrics (Paginated).
- **Query Params**: `name`, `min_value`, `max_value`, `search`, `ordering`, `page`, `page_size`.

### 2. Create Metric (Admin Only)
`POST /`
- **Body**: `{ "name": "string", "value": number }`
- Returns the created metric object.

### 3. Retrieve Metric
`GET /{id}/`
- Returns details of a specific stat metric.

### 4. Update Metric (Admin Only)
`PUT/PATCH /{id}/`
- **Body**: `{ "name": "string", "value": number }` (Partial updates supported via PATCH).

### 5. Delete Metric (Admin Only)
`DELETE /{id}/`
- Removes a metric record (**204 No Content**).

### 6. Analytics Summary
`GET /summary/`
- Returns dynamic impact highlights for the frontend home page.
