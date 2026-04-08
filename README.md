# 101475675-lab-test2-comp3133 — Harry Potter API (COMP 3133 Lab Test 2b)

Repository: [101475675_comp3133_labtest2_optionB](https://github.com/asanchezalzate13/101475675_comp3133_labtest2_optionB) (Angular app lives at the **repo root** next to `angular.json`).

Angular application that loads character data from the public [HP API](https://hp-api.onrender.com/) (`https://hp-api.onrender.com`), with list, house filter, and detail views.

## App description

The app uses `HttpClient` through a dedicated `PotterApiService`, TypeScript interfaces for API models, and Angular Material for layout (toolbar, cards, form fields, buttons, spinners). The UI uses a dark theme aligned with the lab sample figures.

## Features implemented

- **Character list** (`/characters`): loads `/api/characters`, shows `name`, `house`, and `image` on cards, with **search by name** (template-driven `ngModel` + signal-backed `computed` filter).
- **Filter by house** (`/by-house`): dropdown (Reactive `FormControl` + `mat-select`) for Gryffindor, Slytherin, Hufflepuff, Ravenclaw, or **All characters**; loads `/api/characters/house/:house` or all characters.
- **Character details** (`/character/:id`): loads `/api/character/:id` (array response normalized in the service) and shows name, species, house, wizard, ancestry, wand (wood, core, length), actor, and image.
- **Angular control flow**: `@for`, `@if`, and `@switch` in templates; **signals** for async UI state; a **pipe** (`houseColor`) for house accent colors.
- **Modules (rubric)**: `HttpClientModule`, `FormsModule`, and `ReactiveFormsModule` are registered via `importProvidersFrom` in `app.config.ts` (standalone app equivalent to root module imports).

## How to run the project

Prerequisites: **Node.js** (LTS recommended) and **npm**.

```bash
git clone https://github.com/asanchezalzate13/101475675_comp3133_labtest2_optionB.git
cd 101475675_comp3133_labtest2_optionB
npm install
npm start
```

Open `http://localhost:4200/`. The default route redirects to `/characters`.

### Production build

```bash
npm run build
```

Output: `dist/101475675-lab-test2-comp3133/browser/`.

## Hosted application (Vercel)

The app is available online at **Vercel** — no clone or install needed to try it.

| Page | URL |
|------|-----|
| **Home** (redirects to character list) | [https://101475675-comp3133-labtest2-option-two.vercel.app/](https://101475675-comp3133-labtest2-option-two.vercel.app/) |
| **Character list** | [https://101475675-comp3133-labtest2-option-two.vercel.app/characters](https://101475675-comp3133-labtest2-option-two.vercel.app/characters) |
| **Filter by house** | [https://101475675-comp3133-labtest2-option-two.vercel.app/by-house](https://101475675-comp3133-labtest2-option-two.vercel.app/by-house) |

Character details open when you click **View details** / **Details** on a card. You can also bookmark a direct URL:  
`https://101475675-comp3133-labtest2-option-two.vercel.app/character/<id>` (use a character `id` from the [HP API](https://hp-api.onrender.com/)).

## How to view the application

For anyone who only wants to see the running project:

1. Open **[https://101475675-comp3133-labtest2-option-two.vercel.app/](https://101475675-comp3133-labtest2-option-two.vercel.app/)** in a browser (Chrome, Firefox, Edge, Safari, etc.).
2. Use the top bar: **Characters** for the full list with search, or **By house** for the house filter dropdown.
3. Click a character card to open the **details** page. Data is loaded from the public Harry Potter API, so a normal internet connection is required.

## API references

- Characters: `GET https://hp-api.onrender.com/api/characters`
- By house: `GET https://hp-api.onrender.com/api/characters/house/:house` (lowercase house names, e.g. `gryffindor`)
- Character by id: `GET https://hp-api.onrender.com/api/character/:id` (returns an array; the service uses the first item)

## Development

This project was generated with [Angular CLI](https://github.com/angular/angular/cli) 21.x.

```bash
ng test
```

Runs unit tests with Vitest.
