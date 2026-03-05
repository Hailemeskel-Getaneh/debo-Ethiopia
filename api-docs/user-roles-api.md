# User Roles API

Manages system roles (e.g., `Admin`, `Staff`, `Volunteer`, `Donor`) used for access control across the platform.

> **Auth:** All endpoints require `Authorization: JWT <token>`. Write operations (POST, PUT, PATCH, DELETE) are **Admin only**.

---

## Data Model

| Field        | Type      | Notes                     |
|--------------|-----------|---------------------------|
| `id`         | `integer` | Auto-generated, read-only |
| `name`       | `string`  | Role label (e.g., "Admin")|
| `description`| `string`  | What this role can do     |
| `created_at` | `datetime`| ISO 8601, read-only       |

---

## Endpoints

### 1. List Roles
`GET /api/user-roles/`

Returns a paginated list of all defined roles.

**Query Parameters:**

| Param       | Type      | Description         |
|-------------|-----------|---------------------|
| `page`      | `integer` | Page number         |
| `page_size` | `integer` | Results per page    |

**Success (200 OK):**
```json
{
  "count": 4,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "Admin",
      "description": "Full system access",
      "created_at": "2026-01-01T00:00:00Z"
    },
    {
      "id": 2,
      "name": "Staff",
      "description": "Can manage events, news, and gallery",
      "created_at": "2026-01-01T00:00:00Z"
    }
  ]
}
```

---

### 2. Create Role (Admin Only)
`POST /api/user-roles/`

**Request Body:**
```json
{
  "name": "Volunteer",
  "description": "Can register for events and view programs"
}
```

**Success (201 Created):**
```json
{
  "id": 5,
  "name": "Volunteer",
  "description": "Can register for events and view programs",
  "created_at": "2026-03-03T00:00:00Z"
}
```

---

### 3. Get Role by ID
`GET /api/user-roles/{id}/`

**Path Parameter:** `id` — unique integer identifying the role.

**Success (200 OK):**
```json
{
  "id": 1,
  "name": "Admin",
  "description": "Full system access",
  "created_at": "2026-01-01T00:00:00Z"
}
```

---

### 4. Update Role (Admin Only)
`PUT /api/user-roles/{id}/` — Full update (all fields required).
`PATCH /api/user-roles/{id}/` — Partial update (only include fields to change).

**Request Body:**
```json
{
  "name": "Admin",
  "description": "Full system access including user management"
}
```

**Success (200 OK):** Returns the updated role object.

---

### 5. Delete Role (Admin Only)
`DELETE /api/user-roles/{id}/`

> **⚠️ Caution:** Deleting a role that is currently assigned to users may cause access issues. Ensure the role is unassigned before deletion.

**Success (204 No Content):** Role removed. No response body.
