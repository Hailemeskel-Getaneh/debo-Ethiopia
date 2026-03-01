# Subscribers API

## 📧 Newsletter & Mailing List
Manage public newsletter subscriptions and mailing lists.

---

## Endpoints

### 1. Subscribe (Public)
`POST /api/subscribers/subscribe/`
- User-facing endpoint for newsletter signup.
- **Request Body**: `{ "email": "user@example.com" }`
- **Success (200 OK)**: Added to mailing list.

### 2. List Subscribers (Admin Only)
`GET /api/subscribers/`
- **Pagination**: Results are paged.
- **Filtering**: Support filtering by `subscribed_after` and `subscribed_before`.
- **Success (200 OK)**: Returns the list of subscriber emails.

### 3. Subscriber Detail (Admin Only)
`GET /api/subscribers/{id}/`
- Retrieve details for a specific subscriber record.

### 4. Delete Subscriber (Admin Only)
`DELETE /api/subscribers/{id}/`
- **Success (204 No Content)**: Effectively unsubscribes or removes the user from the list.
