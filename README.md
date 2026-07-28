# Wedding invitation

A static, newspaper-style wedding invitation prepared for GitHub Pages.

## Run locally

Because the site is completely static, any local HTTP server works:

```powershell
npx serve .
```

Then open the displayed local URL.

## Personalized guest links

The page accepts a UTF-8 Base64URL-encoded guest name in the `guest` query
parameter:

```text
https://your-name.github.io/wedding-invitation/?guest=<encoded-name>
```

For quick testing, a readable `name` parameter is also supported:

```text
http://localhost:3000/?name=Тарас%20Шевченко
```

To generate the encoded link from the open page, use the browser console:

```js
createGuestLink("Тарас та Олена Шевченко")
```

The encoded value can also be a Base64URL-encoded JSON object:

```json
{ "name": "Тарас та Олена Шевченко" }
```

or:

```json
{ "names": ["Тарас", "Олена"] }
```

## RSVP behavior

This first static version validates the RSVP form and stores the preview
response in the visitor's browser under `wedding-rsvp-preview`. GitHub Pages
cannot receive form submissions by itself. Before launch, connect the form to
an endpoint such as Google Forms, Formspree, a serverless function, or your own
API.

## GitHub Pages

1. Push the project to GitHub.
2. Open **Settings → Pages** in the repository.
3. Choose **Deploy from a branch**.
4. Select the desired branch and `/ (root)`.

All asset paths are relative, so the site works from a repository subpath.
