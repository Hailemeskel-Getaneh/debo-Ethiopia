# Debo Ethiopia API Master Index

This document provides a consolidated view of all available API endpoints for the Debo Media and Operations system. 

---

## 🚦 Global Standards

### Pagination
All `GET` endpoints that return lists (e.g., `/api/projects/`) are paginated.
- **Request**: Use `?page=N` and `?page_size=M`.
- **Response Structure**:
  ```json
  {
    "count": "Total items",
    "next": "URL for next page",
    "previous": "URL for previous page",
    "results": [ ...data... ]
  }
  ```

### HTTP Status Codes
| Code | Meaning | Frontend Action |
| :--- | :--- | :--- |
| **200 OK** | Success | Use returned data. |
| **201 Created** | Success (POST) | Item added. Refresh list or redirect. |
| **204 No Content** | Success (DELETE) | Item removed. Remove from local UI state immediately. |
| **401 Unauthorized** | Token Error | Redirect to login / Refresh token. |
| **403 Forbidden** | No Permission | Show "Access Denied" error. |

---

## 🔑 Authentication & Users
**Detailed Docs**: [user-auth-api.md](file:///d:/Haile/debo-project/api-docs/user-auth-api.md)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/auth/jwt/create` | Login / Obtain tokens |
| POST | `/api/auth/jwt/refresh` | Obtain new access token |
| GET | `/api/auth/users/me/` | Get current user profile |
| POST | `/api/auth/users/` | Register/Create user |
| PATCH | `/api/auth/users/avatar/` | Upload profile picture |

---

## 🏗️ Organizational Projects
**Detailed Docs**: [projects-api.md](file:///d:/Haile/debo-project/api-docs/projects-api.md)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/api/projects/` | List all projects (Filtered/Paginated) |
| POST | `/api/projects/` | Create new project |
| GET | `/api/projects/{id}/` | View project details |
| DELETE | `/api/projects/{id}/` | Remove project (204) |

---

## 💰 Donations & Recurring Plans
**Detailed Docs**: [donations-api.md](file:///d:/Haile/debo-project/api-docs/donations-api.md) & [recurring-plan-api.md](file:///d:/Haile/debo-project/api-docs/recurring-plan-api.md)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/donations/` | Submit new donation |
| GET | `/api/donations/mine/` | View current user's history |
| GET | `/api/recurring-plans/` | List all recurring plans |

---

## 📰 News & Gallery
**Detailed Docs**: [news-api.md](file:///d:/Haile/debo-project/api-docs/news-api.md) & [gallery-api.md](file:///d:/Haile/debo-project/api-docs/gallery-api.md)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/api/news/` | List articles |
| PATCH | `/api/news/{id}/publish/` | Set article to live status |
| GET | `/api/gallery/` | Portfolio images & videos |

---

## 📅 Events & Programs
**Detailed Docs**: [events-api.md](file:///d:/Haile/debo-project/api-docs/events-api.md) & [programms-api.md](file:///d:/Haile/debo-project/api-docs/programms-api.md)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/api/events/` | List upcoming/past events |
| GET | `/api/programs/` | Core NGO program tracks |

---

## 📧 Subscribers & Roles
**Detailed Docs**: [subscribers-api.md](file:///d:/Haile/debo-project/api-docs/subscribers-api.md) & [user-roles-api.md](file:///d:/Haile/debo-project/api-docs/user-roles-api.md)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/subscribers/subscribe/` | Newsletter signup |
| GET | `/api/subscribers/` | List all newsletter emails |
| GET | `/api/user-roles/` | List system permissions/roles |

---

## 👨‍💼 Staff, Stats & Contacts
**Detailed Docs**: [staff-and-stats-api.md](file:///d:/Haile/debo-project/api-docs/staff-and-stats-api.md) & [contacts-api.md](file:///d:/Haile/debo-project/api-docs/contacts-api.md)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/api/staffs/` | Directory of staff members |
| GET | `/api/stats/summary/` | Core impact metrics |
| POST | `/api/contact-messages/submit/` | Public inquiry form |

---

## 🏆 Achievements
**Detailed Docs**: [achievement-api.md](file:///d:/Haile/debo-project/api-docs/achievement-api.md)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/api/achievements/` | Historical milestones |