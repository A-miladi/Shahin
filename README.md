# Shahin Cafe

Use Node.js 24 LTS and Yarn Classic.

```sh
yarn install --frozen-lockfile
yarn dev
```

Open [localhost:3000](http://localhost:3000) to browse the menu.

```sh
yarn lint
yarn build
yarn start
```

Run `yarn build` for deployment. It builds the site and generates `public/sw.js` for that build. Deploy the generated worker alongside the Next.js build and public assets. Serve production over HTTPS so browsers can register the worker.

To check offline use, open the production site online once and wait for the service worker to activate. Then turn off the network, reload the home page, and search for a drink you haven't opened. The page, local fonts, and every menu image are cached during installation. The development server does not register the service worker.
