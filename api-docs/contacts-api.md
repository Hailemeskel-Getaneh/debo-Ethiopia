# Contacts API

## ✉️ Contact and Feedback
Handles public inquiries and admin responses.

---

## Endpoints

### 1. Submit Inquiry (Public)
`POST /api/contact-messages/submit/`
- User-facing endpoint for the "Contact Us" page.
- **Request Body**: `first_name`, `last_name`, `email`, `subject`, `message`.
- **Success (200 OK)**: Message received.

---

## Admin Management

### 2. List Inquiries
`GET /api/contact-messages/`
- **Pagination**: Results are paged.
- **Filtering**: Use `?is_responded=false` to find new messages.

### 3. Respond to Message
`PATCH /api/contact-messages/{id}/respond/`
- **Request Body**: `{ "response_text": "..." }`
- **Success (200 OK)**: Marks message as responded and stores the reply.

### 4. Delete Message
`DELETE /api/contact-messages/{id}/`
- **Success (204 No Content)**: Removes record.

### 5. Stats
- `GET /api/contact-messages/stats/`: Returns count of pending vs responded messages.
- `GET /api/contact-messages/unresponded/`: Quick access to new mail.
