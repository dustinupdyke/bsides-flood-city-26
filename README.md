# AI Adoption keynote

The existing 25-slide NASA Modernist design now runs on reveal.js 5.2.0.
All assets are bundled locally, so presenting requires no internet connection.
Keep the HTML, CSS, JavaScript, and `vendor` directory together.

## Open the slideshow

Start a local server from this folder:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open [the slideshow](http://127.0.0.1:8000/AI-Adoption-Keynote-NASA-Modernist.html).
The presenter window needs a local server for reveal.js's synchronized previews.
Allow popups for localhost if the browser blocks the notes window.

## Present and print

| Key | Action |
| --- | --- |
| Arrow keys / Space | Navigate slides |
| S, N or P | Open private presenter notes with current/next previews and timer |
| O, G or Escape | Slide overview |
| F | Fullscreen |
| ? | Keyboard help |
| E | Open PDF view for slides |
| Shift E | Open PDF view with a separate notes page after every slide |

The toolbar appears for six seconds when opening the deck. Hover at the bottom
center or use Tab to reveal it again. Presenter previews never show this toolbar.

In PDF view, wait for “PDF ready,” then click **Print / Save PDF**. In Chrome,
choose **Save as PDF**, **Landscape**, **No margins**, and **Background graphics**.
Disable browser headers and footers. The deck uses 16:9 pages. Notes stay private
in the normal presentation; only the explicit PDF-with-notes view includes them.

Notes live in each slide's `<aside class="notes">` in the HTML.
`reveal-integration.css` preserves the original artwork and styles PDF notes.
`speaker.css` is the source for the presenter theme embedded into the notes plugin.
If that theme changes, update its embedded copy in `vendor/reveal/notes.js` too.
The bundled reveal.js distribution retains its MIT license in `vendor/reveal/LICENSE`.

Reference: [speaker view](https://revealjs.com/speaker-view/) and
[PDF export](https://revealjs.com/pdf-export/).
