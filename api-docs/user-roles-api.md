# User Roles API

## 🎭 Access Control
Manage system roles and permissions (e.g., `Admin`, `Staff`, `Volunteer`, `Donor`).

---

## Endpoints

### 1. List Roles
`GET /api/user-roles/`
- Returns a list of all defined user roles.
- **Pagination**: Results are paged.
- **Success (200 OK)**:
```json
{
  "count": 5,
  "results": [
    {
      "id": 1,
      "name": "Admin",
      "description": "Full system access"
    }
  ]
}
```

### 2. Create Role (Admin Only)
`POST /api/user-roles/`
- **Request Body**: `{"name": "...", "description": "..."}`
- **Success (201 Created)**: New role added.

### 3. Role Detail
`GET /api/user-roles/{id}/`
- View specific details for a role.

### 4. Update Role (Admin Only)
`PUT /api/user-roles/{id}/` | `PATCH /api/user-roles/{id}/`
- Update the name or description of a role.

### 5. Delete Role (Admin Only)
`DELETE /api/user-roles/{id}/`
- **Success (204 No Content)**: Role removed from system.
