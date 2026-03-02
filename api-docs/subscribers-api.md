# Subscribers API

## 📧 Newsletter & Mailing List
Manage public newsletter subscriptions and mailing lists.

---

## Endpoints

### 1. List Subscribers (Admin Only)
`GET /api/subscribers/`
- **Query Params**:
  - `email` (string): Filter by exact email.
  - `ordering` (string): Field to order by (e.g., `subscribed_at`).
  - `page` (integer): Page number.
  - `page_size` (integer): Results per page.
  - `search` (string): Search term.
  - `subscribed_after` (datetime): Filter by subscription date.
  - `subscribed_before` (datetime): Filter by subscription date.
- **Success (200 OK)**:
```json
{
  "count": 123,
  "next": "...",
  "previous": "...",
  "results": [
    {
      "id": 0,
      "email": "user@example.com",
      "subscribed_at": "2026-03-02T05:22:40.375Z"
    }
  ]
}
```

### 2. Subscribe (Public)
`POST /api/subscribers/subscribe/`
- User-facing endpoint for newsletter signup.
- **Request Body**: `{ "email": "user@example.com" }`
- **Success (200 OK)**:
```json
{
  "email": "user@example.com"
}
```

### 3. Subscriber Detail (Admin Only)
`GET /api/subscribers/{id}/`
- Retrieve details for a specific subscriber record.
- **Success (200 OK)**:
```json
{
  "id": 0,
  "email": "user@example.com",
  "subscribed_at": "2026-03-02T05:22:40.388Z"
}
```

### 4. Delete Subscriber (Admin Only)
`DELETE /api/subscribers/{id}/`
- **Success (204 No Content)**: Effectively unsubscribes or removes the user from the list.
