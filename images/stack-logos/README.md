# Stack logos

SVG logos for the technology stack section. They are shown in white on the dark background via CSS (`filter: brightness(0) invert(1)`).

## PNG versions (optional)

To generate 64×64 white PNG versions (e.g. for export or other use):

```bash
# From project root
npm install
npm run logos:png
```

This creates `.png` files next to each `.svg`. To use PNGs in the page, point the `<img src>` in `data-foundation-labs-ai.html` to the `.png` files instead of `.svg`.

## Sigma Computing

The Sigma Computing logo is a stylized Sigma (Σ) symbol. Official assets can be requested from [Sigma Computing](https://www.sigmacomputing.com).
