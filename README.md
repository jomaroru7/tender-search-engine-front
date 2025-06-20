# Tender Search Engine Front

This project connects to an API to show you the most suitable tenders for your company, checking their relevance based on your company's characteristics.

---

## Requirements

- [Node.js](https://nodejs.org/) >= 18.x
- [npm](https://www.npmjs.com/) >= 9.x

---

## Install

Clone the repository and install dependencies:

```bash
git clone https://github.com/youruser/tender-search-engine-front.git
cd tender-search-engine-front
npm install
```

---

## Development

Start the development server:

```bash
npm run dev
```
The app will be available at [http://localhost:5173](http://localhost:5173) (or your configured port).

---

## Build

Generate a production build. After that it will try to copy CNAME in the dist folder:

```bash
npm run build
```
This will create (or replace) the `dist` folder with the compiled files for production use.

---

## Release

This project includes a release automation script to bump the version, commit, tag, push, build, and update the `dist` folder.

### Usage

```bash
npm run release [major|minor]
```

- `major`: Increments the first digit of the version (e.g., 1.2.3 → 2.0.0).
- `minor`: Increments the last digit of the version (e.g., 1.2.3 → 1.2.4).
- *(no parameter)*: Increments the middle digit (e.g., 1.2.3 → 1.3.0).

The script will:
1. Update the version in `package.json` and `package-lock.json`.
2. Commit the change and create a git tag.
3. Push the commit and tag to the repository.
4. Run the production build.
5. Commit and push the contents of the `dist` folder (if it is a git repo).

---

## Tests

This project uses [Vitest](https://vitest.dev) for testing.

- Run all tests:
  ```bash
  npm test
  ```
- Run tests in watch mode:
  ```bash
  npm run test:watch
  ```

---

## Documentation

This project uses [Storybook](https://storybook.js.org) for component documentation.

- Build Storybook:
  ```bash
  npm run build-storybook
  ```
- Start Storybook:
  ```bash
  npm run storybook
  ```

---

## Project Structure

```
src/
  components/        # Reusable components
  models/            # TypeScript types and models
  store/             # Redux store and slices
  services/          # API/data access logic
  ...
```

---

## Contributing

Contributions are welcome!  
Please open an issue or pull request following the community guidelines.

---

## License

This project is licensed under the [MIT License](./LICENSE.md).

---

## Notes

- Make sure to set up any required environment variables if the API needs them (you can rename `.env.example` as `.env` and set your environment variables).
- For more details on each component, check the internal documentation in Storybook.

---