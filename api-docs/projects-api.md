# Projects API

## 🏗️ Overview
The Projects API manages the NGO's work portfolio. These endpoints are primarily consumed by the **Projects Listing** page and the **Admin Dashboard**.

---

## Endpoints

### 1. List All Projects
`GET /api/projects/`

**Frontend Implementation**:
- This endpoint is **Paginated**. Your frontend should map `results`.
- Use the `status` query parameter to filter between `active`, `planned`, and `completed`.

**Query Parameters Table**:
| Parameter | Type | Use Case |
| :--- | :--- | :--- |
| `status` | string | Filter list (e.g., `?status=active`) |
| `search` | string | Search by name/description |
| `page` | integer | Pagination (e.g., `?page=2`) |

**Success (200 OK)**:
```json
{
  "count": 10,
  "next": null,
  "results": [
    {
      "id": 1,
      "name": "Project Name",
      "progress_percent": 75,
      "status": "active"
    }
  ]
}
```

### 2. Get Project Detail
`GET /api/projects/{id}/`
- Used for the project's individual details page.
- **Success (200 OK)**: Returns the full project object.

### 3. Create Project (Admin Only)
`POST /api/projects/`
- **Success (201 Created)**: Resource successfully added to database.

### 4. Update Project (Admin Only)
`PUT /api/projects/{id}/` (Full Update) | `PATCH /api/projects/{id}/` (Partial Update)
- **Success (200 OK)**: Resource updated.

### 5. Delete Project (Admin Only)
`DELETE /api/projects/{id}/`
- **Success (204 No Content)**: Item removed. Your frontend should remove the item from the local state list after receiving this code.
