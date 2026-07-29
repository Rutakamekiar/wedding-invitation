# Wedding invitation

A static, newspaper-style wedding invitation prepared for GitHub Pages.

The page opens with an animated envelope. Clicking the wax seal opens the
invitation, unlocks scrolling, and starts the background music.

## Run locally

Because the site is completely static, any local HTTP server works:

```powershell
npx serve .
```

Then open the displayed local URL.

## RSVP behavior

The RSVP form validates responses in the browser and submits them to Formspree.
It also includes a spam honeypot, loading and error states, and a confirmation
dialog after successful submission.

## GitHub Pages

1. Push the project to GitHub.
2. Open **Settings → Pages** in the repository.
3. Choose **Deploy from a branch**.
4. Select the desired branch and `/ (root)`.

All asset paths are relative, so the site works from a repository subpath.
