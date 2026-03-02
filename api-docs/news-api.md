# News API

## 📰 Article Management
Handles blog posts, news updates, and press releases.

---

## Endpoints

### 1. List News
`GET /api/news/`
- **Pagination**: Results are paged.
- **Key Params**: `?is_published=true` (Public view) vs `false` (Drafts).
- **Success (200 OK)**:
```json
{
  "count": 12,
  "results": [
    {
      "id": 1,
      "title": "New School Opened",
      "author": { "first_name": "Admin" },
      "is_published": true
    }
  ]
}
```

### 2. Article Detail
`GET /api/news/{id}/`
- Returns full content and associated media.

### 3. Manage News (Admin)
- `POST /`: Create draft/article (**201 Created**).
- `PATCH /{id}/publish/`: Quick toggle to set an article as live.
- `DELETE /{id}/`: Remove article (**204 No Content**).

---

## 📽️ News Media
News articles support multiple images and video URLs.

- `POST /api/news/{news_pk}/images/`: Upload image (multipart).
- `POST /api/news/{news_pk}/videos/`: Add video URL (json).
- `DELETE /.../videos/{id}/`: Remove media (**204 No Content**).
