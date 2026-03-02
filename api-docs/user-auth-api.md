# User Authentication API

## 🔑 Authentication Flow
The DEBO project uses **JWT (JSON Web Token)**. 
1. Call `/jwt/create` with email/password.
2. Store the `access` token (short-lived) and `refresh` token (long-lived) in local storage/cookies.
3. Include the access token in the header of all other requests: `Authorization: JWT <token>`.

---

## JWT Endpoints

### 1. Create Token (Login)
`POST /api/auth/jwt/create`
- **Request Body**: `{"email": "...", "password": "..."}`
- **Success (200 OK)**: Returns `{ "access": "...", "refresh": "..." }`.

### 2. Refresh Token
`POST /api/auth/jwt/refresh`
- **Request Body**: `{ "refresh": "<your_refresh_token>" }`
- **Success (200 OK)**: Returns a new `{ "access": "..." }`.

---

## User Management

### 3. List Users (Admin only)
`GET /api/auth/users/`
- **Frontend Note**: This is a **Paginated** endpoint.
- **Success (200 OK)**:
```json
{
  "count": 100,
  "next": "url_to_next_page",
  "previous": null,
  "results": [ { "id": 1, "email": "..." } ]
}
```

### 4. Register
`POST /api/auth/users/`
- **Request Body**: `first_name`, `last_name`, `phone_number`, `email`, `password`, `re_password`.
- **Success (201 Created)**: User account created. Confirm email if activation is enabled.

### 5. Profile Management (Me)
- `GET /api/auth/users/me/`: Get current user details.
- `PATCH /api/auth/users/me/`: Update your own profile info.
- `DELETE /api/auth/users/me/`: Delete your own account (**204 No Content** on success).

### 6. Avatar Update
`PATCH /api/auth/users/avatar/`
- **Requirement**: Must use `multipart/form-data`.
- **Fields**: `avatar` (File).
- **Success (200 OK)**: Returns updated user object.

---

## Password & Email Resets
All these endpoints follow a standard flow:
1. `POST /reset_password/`: Send email.
2. `POST /reset_password_confirm/`: Provide `uid`, `token`, and `new_password`.
3. **Success (200 OK)**: Confirmation successful.