# Achievements API

## 🏆 Impact & Milestones
Displays the NGO's major accomplishments (e.g., "1000 Students Graduated").

---

## Endpoints

### 1. List Achievements
`GET /api/achievements/`
- **Pagination**: Results are paged.
- **Success (200 OK)**:
```json
{
  "count": 15,
  "results": [
    {
      "id": 1,
      "title": "Clean Water Initiative",
      "description": "Built 5 wells in Rural Gojam.",
      "achieved_at": "2024-12-01"
    }
  ]
}
```

### 2. Manage Achievements (Admin)
- `POST /`: Add new milestone (**201 Created**).
- `PATCH /{id}/`: Update achievement info.
- `DELETE /{id}/`: Remove milestone (**204 No Content**).