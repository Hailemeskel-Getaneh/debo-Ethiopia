# Gallery API

## 🖼️ Media Management
Handles the NGO's visual portfolio, including photo albums and video collections.

---

## Endpoints

### 1. List Gallery Items
`GET /api/gallery/`
- **Pagination**: Results are paged.
- **Filtering**: Use `?type=image` or `?type=video` to show specific media types.
- **Success (200 OK)**:
```json
{
  "count": 24,
  "results": [
    {
      "id": 1,
      "title": "Field Visit 2025",
      "images": [ { "id": 1, "image": "url" } ],
      "videos": []
    }
  ]
}
```

### 2. Manage Gallery (Admin)
- `POST /`: Create a new media collection/item.
- `PATCH /{id}/`: Update title or description.
- `DELETE /{id}/`: Remove item (**204 No Content**).

---

## 📂 Nested Media
Directly attach images or video URLs to a gallery collection.

- `POST /api/gallery/{gallery_pk}/images/`: Upload image (multipart).
- `POST /api/gallery/{gallery_pk}/videos/`: Attach video link.
- `DELETE /api/gallery/{gallery_pk}/images/{id}/`: Remove media item (**204 No Content**).
