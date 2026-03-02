# Events API

## 📅 Event Management
Manage NGO events, workshops, and community gatherings.

---

## Endpoints

### 1. List Events
`GET /api/events/`
- **Pagination**: Results are paged. 
- **Filtering**: Use `?from_date=YYYY-MM-DD` and `?to_date=YYYY-MM-DD` to show upcoming or past events.
- **Success (200 OK)**:
```json
{
  "count": 5,
  "results": [
    {
      "id": 1,
      "title": "Community Cleanup",
      "images": [ { "id": 10, "image_url": "..." } ]
    }
  ]
}
```

### 2. Event Details
`GET /api/events/{id}/`
- Returns full details including all galleries/images for that event.

### 3. Manage Events (Admin)
- `POST /`: Create new event (**201 Created**).
- `PATCH /{id}/`: Partial update.
- `DELETE /{id}/`: Remove event (**204 No Content**).

---

## 🖼️ Event Media
Handle multiple images for a single event.

- `POST /api/events/{event_pk}/images/`: Upload a new image to an event. Use `multipart/form-data`.
- `DELETE /api/events/{event_pk}/images/{id}/`: Remove an image (**204 No Content**).