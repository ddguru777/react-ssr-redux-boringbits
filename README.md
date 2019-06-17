## Get Started

```bash
npx create-boring-app my-new-app
```

> `create-boring-app` command will
> * Create a new directoring `my-new-app`
> * npm install `boring` and it's dependencies
> * Generate / scaffold a basic app for you (press `yes` on the CLI to take all the defaults)
> * Prompt you to boot up HA Proxy (press yes)
> * Boot up your app server
> * Open a webpage to the top level container it just scaffolded

`boring` support HMR so once you have your app running, simply change your react files found in `src/client/pages/demo` and see your changes reflect immediately in your browser.  `boring` also does universal rendering by default, yet does similar server side HMR techniques so if you do a hard refresh your SSR and hydrated client will always be in sync and reflect the same DOM.

If you need to stop your server and start it again, make sure you are in your applications directory and simply `npm start`

## Running in Production

Boring needs to be built via webpack, as well as the node code needs to be babeled.

```bash
npm run build

# you do not need to set the NODE_ENV on the command line,
# it is better simply to have this set as an env var for that user.
# The only requirement is the value needs to be set to `production`
NODE_ENV=production npm start
```
