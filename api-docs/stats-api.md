# Stats API

Manages stat metrics — key/value pairs used to track platform-level numbers (e.g., total donors, volunteers served).

> **Auth:** All write operations require an `Authorization: JWT <token>` header (Admin only).

---

## Data Model

| Field        | Type      | Notes                          |
|--------------|-----------|--------------------------------|
| `id`         | `integer` | Auto-generated, read-only      |
| `name`       | `string`  | Label for the stat             |
| `value`      | `integer` | The numeric value (max ~2.1B)  |
| `created_at` | `datetime`| ISO 8601, read-only            |
| `updated_at` | `datetime`| ISO 8601, read-only            |

---

## Endpoints

### 1. List Stats
`GET /api/stats/`

Returns a paginated list of all stat metrics.

**Query Parameters:**

| Param       | Type      | Description                          |
|-------------|-----------|--------------------------------------|
| `name`      | `string`  | Filter by stat name                  |
| `min_value` | `integer` | Filter stats with value ≥ this       |
| `max_value` | `integer` | Filter stats with value ≤ this       |
| `search`    | `string`  | Search across stat names             |
| `ordering`  | `string`  | Sort field (e.g., `value`, `-name`)  |
| `page`      | `integer` | Page number                          |
| `page_size` | `integer` | Results per page                     |

**Success (200 OK):**
```json
{
  "count": 123,
  "next": "http://api.example.org/api/stats/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "Total Donors",
      "value": 4500,
      "created_at": "2026-01-01T00:00:00Z",
      "updated_at": "2026-03-01T00:00:00Z"
    }
  ]
}
```

---

### 2. Create Stat (Admin Only)
`POST /api/stats/`

**Request Body:**
```json
{
  "name": "Total Donors",
  "value": 4500
}
```

**Success (201 Created):**
```json
{
  "id": 1,
  "name": "Total Donors",
  "value": 4500,
  "created_at": "2026-03-03T00:00:00Z",
  "updated_at": "2026-03-03T00:00:00Z"
}
```

---

### 3. Get Stat by ID
`GET /api/stats/{id}/`

**Path Parameter:** `id` — unique integer identifying the stat.

**Success (200 OK):**
```json
{
  "id": 1,
  "name": "Total Donors",
  "value": 4500,
  "created_at": "2026-01-01T00:00:00Z",
  "updated_at": "2026-03-01T00:00:00Z"
}
```

---

### 4. Update Stat (Admin Only)
`PUT /api/stats/{id}/` — Full update (all fields required).
`PATCH /api/stats/{id}/` — Partial update (only include fields to change).

**Request Body:**
```json
{
  "name": "Total Donors",
  "value": 5000
}
```

**Success (200 OK):** Returns the updated stat object.

---

### 5. Delete Stat (Admin Only)
`DELETE /api/stats/{id}/`

**Success (204 No Content):** Stat removed. No response body.

---

### 6. Stats Summary
`GET /api/stats/summary/`

Returns a high-level summary of platform stats (no query parameters).

**Success (200 OK):**
```json
{
  "id": 1,
  "name": "string",
  "value": 0,
  "created_at": "2026-03-03T00:00:00Z",
  "updated_at": "2026-03-03T00:00:00Z"
}
```

> **Note:** The summary endpoint may return a single aggregated object rather than a paginated list. Confirm with backend if the shape differs from the above.