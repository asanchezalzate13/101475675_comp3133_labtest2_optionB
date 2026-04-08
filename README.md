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

## Screenshots (for your D2L / README)

Add your own screenshots under `docs/` or the repo root, for example:

1. **Running app** — toolbar with “Characters” and “By house”, character grid on the list page.
2. **Filter page** — dropdown set to a house (e.g. Slytherin) with matching cards.
3. **Details page** — one character with image and fields (wand, actor, etc.).
4. **Code** — short captures of `potter-api.ts`, one component template, and `models/character.model.ts`.

Replace this section with embedded images in Markdown, e.g. `![Character list](docs/screenshot-list.png)`.

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

## Deployment (Vercel / Render)

- **Vercel**: connect the repo; set **Framework Preset** to Angular; **Output directory** `dist/101475675-lab-test2-comp3133/browser`. This repo includes `vercel.json` with SPA rewrites for deep links such as `/character/:id`.
- **Render** (static site): build command `npm install && npm run build`, publish directory `dist/101475675-lab-test2-comp3133/browser/`.

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
