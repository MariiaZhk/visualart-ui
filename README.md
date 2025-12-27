# 🎨 VisualArt Frontend

Frontend for managing artists and their artworks.
Built with React and Redux, connected to the [VisualArt API](https://github.com/MariiaZhk/visualart-api).

This application allows viewing, creating, editing, and deleting artworks, as well as managing artists.
The interface supports filtering, sorting, pagination, and user-friendly UX with success/error notifications.

---

## 📌 Technologies

- React 18 + Hooks
- Redux Toolkit
- React Router v6
- Axios for API requests
- Material UI + custom UI components (Card, Button, Snackbar, Dialog)
- Custom form validation
- Jest + React Testing Library for testing

---

## 🚀 Project Setup

1. Clone the repository:

```bash
git clone https://github.com/MariiaZhk/visualart-ui.git
cd visualart-ui
```

2. Switch to your feature branch (with Block 3 implementation):

```bash
git checkout visualart-ui-feature-block3-visualart-ui
```

3. Install dependencies:

```bash
npm install
# or
yarn install
```

4. Start the development server:

```bash
npm start
# or
yarn start
```

---

## 🌐 How the Application Works

The app runs locally and communicates with the backend [VisualArt API](https://github.com/MariiaZhk/visualart-api) to fetch and manage data about artworks and artists.

### Main Features:

1. **Artworks List**

- **URL:** `/artworks`
- Displays all artworks with key fields: **title, artist, year**.
- Features:

  - **Hover effect** shows a delete button:

    - Opens a confirmation dialog
    - Shows success notification after deletion
    - Shows error notification on failure

  - **Clicking an artwork** opens the details page (`/artworks/:id`)

  - **Floating + button** opens the creation page in edit mode for adding a new artwork

  - **Filter** (applied via backend):

    - **Artist:** select from a dropdown of all artists
    - **Title:** search by artwork title
    - **Sort:** Title A→Z, Title Z→A, Year Oldest→Newest, Year Newest→Oldest
    - **Apply:** applies selected filters
    - **Clear:** resets filters to default

  - **Pagination**

    - Maintains current page and filters on reload

  - Success/error notifications via `Snackbar`

2. **Artwork Details**

- **URL:** `/artworks/:id`
- Two modes:

  1. **View mode** — displays artwork data

     - Shows all fields: title, artist, year, genres, media
     - Edit button (pencil) switches to Edit mode
     - Back button returns to the artworks list

  2. **Edit/Create mode**

     - All fields editable

     - Buttons: **Save / Cancel** or **Create / Cancel**

     - Field validation on Save/Create

       - Invalid fields are highlighted
       - Backend request only sent if all fields are valid

     - **Cancel** reverts changes to previous values

     - Shows success notification after saving

     - Shows error notification on failure and keeps form open

---

## 🔗 API Endpoints Used

Frontend uses the following VisualArt API endpoints:

### Artworks

| Method | Endpoint               | Description                                 |
| ------ | ---------------------- | ------------------------------------------- |
| POST   | `/api/artworks`        | Create a new artwork                        |
| GET    | `/api/artworks/:id`    | Get artwork details                         |
| PUT    | `/api/artworks/:id`    | Update an existing artwork                  |
| DELETE | `/api/artworks/:id`    | Delete an artwork                           |
| POST   | `/api/artworks/_list`  | Get filtered and paginated list of artworks |
| POST   | `/api/artworks/upload` | Upload JSON file to populate initial data   |

### Artists

| Method | Endpoint       | Description         |
| ------ | -------------- | ------------------- |
| GET    | `/api/artists` | Get list of artists |
| POST   | `/api/artists` | Create a new artist |

---

## 💡 Preparing Test Data

1. To test the app, upload a JSON file with sample artworks:

```
upload.json
```

2. Send it to the backend via Swagger or Postman:

```
POST http://localhost:8080/api/artworks/upload
```

This will populate the database with initial data for testing.

---
