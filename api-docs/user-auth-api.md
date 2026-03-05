# User Authentication API

JWT-based authentication and full user account management for the DEBO platform.

> **Auth:** All endpoints except `jwt/create`, `users/` (register), and password/email resets are protected. Include `Authorization: JWT <token>` in all authenticated requests.

---

## Data Model

| Field          | Type      | Notes                                 |
|----------------|-----------|---------------------------------------|
| `id`           | `integer` | Auto-generated, read-only             |
| `username`     | `string`  | Read-only                             |
| `first_name`   | `string`  | -                                     |
| `last_name`    | `string`  | -                                     |
| `phone_number` | `string`  | Optional                              |
| `role`         | `string`  | Assigned role (read-only on profile)  |
| `email`        | `email`   | Used as login identifier              |
| `image_url`    | `string`  | Profile image URL, read-only          |

---

## Authentication Endpoints

### 1. Login — Create JWT Token
`POST /api/auth/jwt/create`

**Request Body:**
```json
{ "email": "user@example.com", "password": "string" }
```

**Success (200 OK):**
```json
{ "access": "<jwt_access_token>", "refresh": "<jwt_refresh_token>" }
```

> Store `access` (short-lived) and `refresh` (long-lived) in localStorage. Pass `access` as `Authorization: JWT <access>` on all subsequent requests.

---

### 2. Refresh Token
`POST /api/auth/jwt/refresh`

**Request Body:**
```json
{ "refresh": "<your_refresh_token>" }
```

**Success (200 OK):**
```json
{ "access": "<new_access_token>" }
```

---

## User Management (Admin)

### 3. List All Users (Admin Only)
`GET /api/auth/users/`

Returns a paginated list of all users.

**Success (200 OK):**
```json
{
  "count": 100,
  "next": "http://api.example.org/api/auth/users/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "username": "abebe",
      "first_name": "Abebe",
      "last_name": "Girma",
      "phone_number": "+251911000000",
      "role": "Admin",
      "email": "abebe@debo.et",
      "image_url": null
    }
  ]
}
```

---

### 4. Register / Create User
`POST /api/auth/users/`

**Request Body:**
```json
{
  "first_name": "Abebe",
  "last_name": "Girma",
  "phone_number": "+251911000000",
  "email": "abebe@debo.et",
  "password": "strongpassword",
  "re_password": "strongpassword"
}
```

**Success (201 Created):**
```json
{
  "id": 1,
  "username": "abebe",
  "first_name": "Abebe",
  "last_name": "Girma",
  "phone_number": "+251911000000",
  "email": "abebe@debo.et"
}
```

---

### 5. Get User by ID (Admin Only)
`GET /api/auth/users/{id}/`

**Path Parameter:** `id` — unique integer identifying the user.

**Success (200 OK):** Returns the full user object (see data model above).

---

### 6. Update User (Admin Only)
`PUT /api/auth/users/{id}/` — Full update.
`PATCH /api/auth/users/{id}/` — Partial update.

**Request Body:**
```json
{
  "first_name": "Abebe",
  "last_name": "Girma",
  "phone_number": "+251911000000"
}
```

**Success (200 OK):** Returns the updated user object.

---

### 7. Delete User (Admin Only)
`DELETE /api/auth/users/{id}/`

**Success (204 No Content):** User deleted. No response body.

---

## Profile (Self)

### 8. Get My Profile
`GET /api/auth/users/me/`

Returns the currently authenticated user's full profile object.

---

### 9. Update My Profile
`PUT /api/auth/users/me/` — Full update.
`PATCH /api/auth/users/me/` — Partial update.

**Request Body:**
```json
{
  "first_name": "Abebe",
  "last_name": "Girma",
  "phone_number": "+251911000000"
}
```

---

### 10. Delete My Account
`DELETE /api/auth/users/me/`

**Success (204 No Content):** Account permanently removed.

---

### 11. Update Avatar / Profile Image
`PATCH /api/auth/users/avatar/`

- **Content-Type**: `multipart/form-data`
- **Fields**: `first_name`, `last_name`, `phone_number` (avatar file expected — confirm field name with backend)

**Success (200 OK):** Returns updated user object.

---

## Account Activation

### 12. Activate Account
`POST /api/auth/users/activation/`

**Request Body:**
```json
{ "uid": "string", "token": "string" }
```

---

### 13. Resend Activation Email
`POST /api/auth/users/resend_activation/`

**Request Body:**
```json
{ "email": "user@example.com" }
```

---

## Password Management

### 14. Change Password
`POST /api/auth/users/set_password/`

**Request Body:**
```json
{
  "current_password": "oldpassword",
  "new_password": "newpassword",
  "re_new_password": "newpassword"
}
```

---

### 15. Request Password Reset
`POST /api/auth/users/reset_password/`

**Request Body:**
```json
{ "email": "user@example.com" }
```

---

### 16. Confirm Password Reset
`POST /api/auth/users/reset_password_confirm/`

**Request Body:**
```json
{
  "uid": "string",
  "token": "string",
  "new_password": "string",
  "re_new_password": "string"
}
```

---

## Email Management

### 17. Change Email
`POST /api/auth/users/set_email/`

**Request Body:**
```json
{ "current_password": "string", "new_email": "new@example.com" }
```

---

### 18. Request Email Reset
`POST /api/auth/users/reset_email/`

**Request Body:**
```json
{ "email": "current@example.com" }
```

---

### 19. Confirm Email Reset
`POST /api/auth/users/reset_email_confirm/`

**Request Body:**
```json
{ "new_email": "new@example.com" }
```