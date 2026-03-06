# Staffs API

Manages staff profiles linked to user accounts. A staff record extends a user with a `region` and `position`.

> **Auth:** All endpoints require `Authorization: JWT <token>`. Write operations (POST, PUT, PATCH, DELETE) are **Admin only**.

---

## Data Model

| Field        | Type      | Notes                                        |
|--------------|-----------|----------------------------------------------|
| `id`         | `integer` | Auto-generated, read-only                    |
| `user_id`    | `integer` | References an existing user (write-only)     |
| `full_name`  | `string`  | Derived from linked user, read-only          |
| `email`      | `string`  | Derived from linked user, read-only          |
| `role`       | `string`  | Derived from linked user's role, read-only   |
| `region`     | `string`  | Staff's assigned region                      |
| `position`   | `string`  | Staff's job position/title                   |
| `created_at` | `datetime`| ISO 8601, read-only                          |
| `updated_at` | `datetime`| ISO 8601, read-only                          |

---

## Endpoints

### 1. List Staffs
`GET /api/staffs/`

Returns a paginated list of all staff members.

**Query Parameters:**

| Param       | Type      | Description                               |
|-------------|-----------|-------------------------------------------|
| `search`    | `string`  | Search across `full_name`, `email`, etc.  |
| `ordering`  | `string`  | Sort field (e.g., `full_name`, `-created_at`) |
| `page`      | `integer` | Page number                               |
| `page_size` | `integer` | Results per page                          |

**Success (200 OK):**
```json
{
  "count": 10,
  "next": "http://api.example.org/api/staffs/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "full_name": "Abebe Girma",
      "email": "abebe@debo.et",
      "role": "Staff",
      "region": "Addis Ababa",
      "position": "Program Coordinator",
      "created_at": "2026-01-10T09:00:00Z",
      "updated_at": "2026-03-01T12:00:00Z"
    }
  ]
}
```

---

### 2. Create Staff (Admin Only)
`POST /api/staffs/`

Links an existing user account to a new staff record.

**Request Body:**
```json
{
  "user_id": 42,
  "region": "Addis Ababa",
  "position": "Program Coordinator"
}
```

**Success (201 Created):**
```json
{
  "user_id": 42,
  "region": "Addis Ababa",
  "position": "Program Coordinator"
}
```

> **Note:** The response does not embed the full user details. Fetch by ID to get the complete staff object.

---

### 3. Get Staff by ID
`GET /api/staffs/{id}/`

**Path Parameter:** `id` — unique integer identifying the staff record.

**Success (200 OK):**
```json
{
  "id": 1,
  "full_name": "Abebe Girma",
  "email": "abebe@debo.et",
  "role": "Staff",
  "region": "Addis Ababa",
  "position": "Program Coordinator",
  "created_at": "2026-01-10T09:00:00Z",
  "updated_at": "2026-03-01T12:00:00Z"
}
```

---

### 4. Update Staff (Admin Only)
`PUT /api/staffs/{id}/` — Full update (all fields required).
`PATCH /api/staffs/{id}/` — Partial update (only include fields to change).

**Request Body:**
```json
{
  "region": "Oromia",
  "position": "Senior Coordinator"
}
```

**Success (200 OK):**
{
  "id": 1,
  "full_name": "Abebe Girma",
  "email": "abebe@debo.et",
  "role": "Staff",
  "region": "Oromia",
  "position": "Senior Coordinator",
  "created_at": "2026-01-10T09:00:00Z",
  "updated_at": "2026-03-01T14:30:00Z"
}
```

---

### 5. Delete Staff (Admin Only)
`DELETE /api/staffs/{id}/`

Removes the staff record (does **not** delete the linked user account).

**Success (204 No Content):** No response body.