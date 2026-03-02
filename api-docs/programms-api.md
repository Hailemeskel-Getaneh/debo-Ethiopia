# Programs API

## 🎓 Organizational Programs
Manage the core social and education programs run by the NGO.

---

## Endpoints

### 1. List Programs
`GET /api/programs/`
- **Pagination**: Results are paged.
- **Success (200 OK)**:
```json
{
  "count": 4,
  "results": [
    {
      "id": 1,
      "name": "Rural Education Support",
      "description": "Providing books and materials..."
    }
  ]
}
```

### 2. Manage Programs (Admin)
- `GET /{id}/`: View specific program details.
- `POST /`: Add a new program (**201 Created**).
- `PATCH /{id}/`: Update program details.
- `DELETE /{id}/`: Remove program (**204 No Content**).