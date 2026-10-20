# Advisory 0004: episode assets

Advisory 0004 needs a few things the kit can't draw. Build them in `video/src/episodes/0004-wifi-network/assets.tsx` (plus helper files in the same folder if it gets long) and register them under exactly these names. They are already declared in `scenes.json → meta.customElements / meta.customShots`, and `validate.mjs` fails until they are registered.

Everything else in this episode is drawn by the kit. Don't redraw the person, inspector, crowd, bed, door, window, clock, sofa, labels, marks, speech and thought bubbles, boundary, gaze, glow, checklist, cards, documents, case file, counter, calendar or seal.

**Style rules** (`brand/BRAND.md` §5):
- Use palette tokens from `video/src/theme.ts` only (`C.*`). No new hex values. The one exception is the phone screen fill `#0E1216`, which Advisory 0002 already uses for its phone; keep it so the two phones match.
- Figures (the thing the story is about: the router) are solid `C.fg` with `filter="url(#glow)"`, like the cat in 0001, the vacuum in 0002 and the washing machine in 0003. Details cut into a figure are drawn in `C.bg`.
- Set dressing and devices (the shelf, sticker, phone body, laptop, television, glasses) are outline-on-surface: `C.surface`/`C.surface2` fill, `C.line` stroke of 2–3 px, no glow. Screens are the only light they give off.
- Annotations (signal icons, rings, upload bars, the channel graph's lines) are 3 px strokes in blue, red or grey.
- Check every asset against a 360 px kit person standing on the ground line (y = 780). Hero objects are drawn larger than life, as in 0002 and 0003: a router next to a standing person is about 240–320 px wide.
- Use the kit's animation helpers from `video/src/anim.ts` (`prog`, `lerp`, `ease`, `easeInOut`, `popIn`, `rand`, `shake`). Nothing bounces, nothing overshoots.

**Time units used below:** `t` (frames since the element appeared, after its `delay`) and `dur` (frames of that line) come from `CustomElementProps`. When `t < 0` the element hasn't appeared yet: render nothing. *Fraction* means a fraction of `dur`. *Seconds* means `t / fps`. The tableau already applies `opacity`, `delay` and `z`; anims listed in an element's `anim` array must be implemented by the asset itself.

**Two engine limits from Advisory 0002's build report** (the kit is unchanged, so they still apply):
- `same_as` does not merge custom-shot fields. Every `wifi-list` and `channel-graph` shot in `scenes.json` is therefore fully specified and none of them uses `same_as`. Keep it that way.
- A custom element gets no fresh clock on a `hold` transition. No line in this script holds onto a shot with custom elements; every change that needs its animation to start again is its own shot with a `cut`.

---

## Elements (tableau)

### `router` (figure: the episode's hero)
A home Wi-Fi router: a low rounded box with two antennas and a row of status lights.

| Field | Meaning |
|---|---|
| `x`, `y`, `w` | Centre, the surface it stands on (the shelf top when `stand` is `shelf`), and body width (default 240). Body height = 0.26·w. |
| `stand` | `shelf` (default): a wall shelf under it, outline-on-surface: a plank 1.6·w long and 14 px thick whose top is exactly `y`, with two triangular brackets underneath (0.35·w tall) at ±0.6·w. `floor`: no shelf. |
| `leds` | `calm` (default): power and internet steady; the two Wi-Fi lights flicker slowly (each toggles at random every 6–12 frames, seeded with `rand`); LAN off. `busy`: all four data lights flicker fast (every 2–4 frames). `restart`: all off for the first 30% of the line, then only the power light blinks at 1 Hz. `off`: every light dark. |
| `plug` | `in`: a power cable leaves the right end of the body at mid-height and droops in a soft curve to a wall socket at (x + 1.4·w, y + 140): a 48×60 socket plate, outline-on-surface, with the plug in it. `out`: same socket, empty (two `C.bg` holes); the plug hangs 40 px lower and 30 px left of it, at rest. Omit for no cable. |
| `lift` | `{dy, rot}`: drawn `dy` px above where it would rest (negative = up) and rotated `rot`° around its centre, for the whole line. The shelf stays where it is. |
| `settle` | `{fromDy, dx}`: starts raised `fromDy` px (as `lift`, upright) at `x`, then between 40% and 80% of the line moves down onto its shelf, ending `dx` px to the side (negative = left). `easeInOut`; no bounce, no shake. |
| `ghost_at` | `{dx}`: a dashed outline (`C.dim`, 3 px, dash 8/8) of the body's footprint at `x + dx`, standing on the shelf: where the router used to be. In S59 it marks the old place while the router settles to its left; in S61 the router stands at `x` and the outline is 40 px to its right. |
| `age` | `old`: one antenna leans 8° outward, two short `C.bg` scuffs on the body, the lights' glow at 70%. |
| `view` | `front` (default) or `back`. See below. |

**Front view** (origin at the centre of the body's bottom edge):
- **Body:** rounded rect `w` × 0.26·w, corner radius 0.065·w, solid `C.fg` with glow. A thin `C.bg` seam 0.06·w above the bottom edge.
- **Antennas:** two rounded rods 0.04·w wide and 0.42·w tall, standing on the top edge at ±0.35·w, solid `C.fg`.
- **Lights:** five round sockets (`C.bg`, r = 0.022·w) in a row at 0.45 of the body height, from −0.3·w to +0.3·w: power, internet, 2.4G, 5G, LAN. A lit light is a `C.blue` dot (r = 0.016·w) with `url(#glowBlue)`; an unlit one is `C.line`. Tiny mono labels under them are not needed.

**Back view** (`view: "back"`, used large as a close-up in S65, S66, S75):
- Same body and antennas. Cut into the body in `C.bg`: four LAN ports (0.08·w × 0.4·h rectangles) from −0.42·w, a round power socket (r = 0.04·w) at +0.12·w, and a **tiny recessed reset hole at (x + 0.28·w, y − 0.5·h)**, r = 0.012·w, with `RESET` in IBM Plex Mono, 0.022·w, `C.bg`, centred under it. The shots point labels, a cross and a check at that hole (`(1173, 501)` at `w` 760, `y` 600), so keep it exactly there.

### `router-sticker`
The label stuck under the router, in close-up. It is paper, so it uses the document colours (`C.paper` fill, `C.ink` text): it is a document.

| Field | Meaning |
|---|---|
| `x`, `y`, `w` | Centre and width (height = 0.45·w). |
| `tilt` | Rotation in degrees. |
| `color` | `grey`: the whole label in greys (the slip shot; the frame is greyscale anyway). |

- **Card:** rounded rect (radius 0.012·w), a 2 px `C.ink` border at 25%, a faint shadow (`C.bg` at 40%, offset 6 px).
- **Lines** (IBM Plex Mono, 0.034·w, `C.ink`, left-aligned at 0.07·w, three rows from 0.2·h): `MODEL  NC-R7 · S/N ████████`, `NETWORK  HOME-5G`, `PASSWORD  ████████████`. The redactions are `C.redaction` bars, as on every Department document. **The password is never printed.**
- **Barcode** along the bottom (0.2·h tall, random bar widths seeded with `rand`) and two small square marks at the bottom right (plain outlines, not real certification logos).

### `phone`
A smartphone, portrait. **Its body is Advisory 0002's phone**, unchanged: use `reference/phone-0002.tsx.txt` (a copy of `video/src/episodes/0002-robot-vacuum/phone.tsx` from `itsaytaa/YT-0002`) for the body, screen inset, `#0E1216` screen fill, soft radial glow, `glow` light pool, glass sheen, notch and status bar (time, signal, battery). Only the screen content is new. Don't import from 0002 (it isn't in this repo); copy the body into `phone.tsx` here, and see "After this episode" about the kit.

| Field | Meaning |
|---|---|
| `x`, `y`, `h` | Centre and height. Width = 0.5·h. **Large phones are 600–640 px centred at y 400–480** (0002's report: taller phones ran into the HUD and the caption zone). |
| `time` | Status-bar time (default `03:02`). |
| `glow` | `true`: also draw the wider light pool (a phone lighting a dark room). |
| `tilt` | Rotation in degrees around the centre (S11: a phone lying on the blanket, −70). |
| `screen` | What it shows (below). |
| `networks`, `highlight` | For `wifi-list` and `join`: the same row objects as the `wifi-list` shot; `highlight` is the row drawn in red. |

`screen` values:
- `glow-only`: for small phones (h < 300): a lit screen with a few faint unreadable rows, no text. With `glow`, the light pool falls on the floor or blanket around it.
- `wifi-list`: header `WI-FI` (mono, letter-spaced, `C.dim`) with a blue toggle, then `networks` as rows in the same style as the `wifi-list` shot, scaled to the screen width. The `highlight` row's redaction bar is `C.red`.
- `join`: a card in the middle of the screen: the network's name (the redaction bar of the `highlight` row, `C.fg`), `OPEN NETWORK · NO PASSWORD` in mono `C.dim` under it, and a `JOIN` button: a 2 px `C.blue` outlined rounded rect, 0.7 of the screen width, mono caps. **The button's centre is at (x, y + 0.2·h)**; S03 and S22 draw a cross exactly there. `pulse_join: true`: the button outline pulses 60% → 100% every 1.2 s (as 0002's dock button).
- `offline`: the status-bar Wi-Fi icon crossed out; in the middle a large crossed-out Wi-Fi glyph (`C.dim`) and `NO INTERNET` in mono. `timer: {to}`: under it a mono `MM:SS` timer counting from `00:00` to `to` linearly over the line.
- `rename`: the router app's settings page: title `NETWORK`, a field label `NETWORK NAME`, a text box with `rename.from` and a blinking cursor (0.5 s on/off). When `rename.to` is set: `from` deletes letter by letter over 0–40% of the line, `to` types in over 45–85%, then a `SAVE` button under the box flashes `C.blue` once. When `to` is `null`, only the cursor blinks.

### `signal-bars`
The Wi-Fi symbol as an annotation: a dot and three arcs, fanning upward.

| Field | Meaning |
|---|---|
| `x`, `y`, `size` | Centre of the symbol and its width. |
| `bars` | 0–4 lit levels: 1 = the dot, 2–4 = the arcs from the inside out. Unlit parts are `C.line` at 60%. |
| `color` | `blue`, `red` (with `glowBlue`/`glowRed`), `grey`, `dim`. |
| `label` | Optional mono caption 0.55·size under the symbol's centre: 22 px, letter-spaced 0.2em, `C.dim`. |
| `anim` | `pop-in` (kit `popIn`), `pulse` (scale 1 → 1.08 → 1 and opacity 0.75 → 1, once a second). |

Stroke width 0.09·size, round caps. The arcs span 90°.

### `waves`
Broadcast rings: what a network looks like when it fills a room. Concentric rings expanding from (`x`, `y`) up to radius `r`.

| Field | Meaning |
|---|---|
| `color` | `grey` (theirs, `C.grey`), `blue` (your router, `C.blue` with `glowBlue` at 50%), `red` (with `glowRed`). |
| `mode` | `loop`: a new ring every 0.6 s grows from 0 to `r` over 2.4 s and fades out over its last half; start the line already in this steady state (about four rings visible). `converge`: the same, reversed: rings start at `r` and shrink onto the point, as if homing in. `fade-out`: start in the steady state, spawn no new rings; the existing ones finish and are gone by 60% of the line. `burst`: rings only at the times in `at` (seconds after the line starts): each burst is three short paired arcs opening left and right (like a knock), growing from 14 px to `r` over 10 frames and fading over 18. |
| `opacity` | Multiplier on top of the rings' own fade. |
| `clip` | `{x, y, r}`: rings are hidden inside this circle (a mask). S72 uses it so the grey rings from the left break off where the router's blue rings begin. |

Rings are 3 px strokes. They may run off the frame. Keep them out of the caption zone (y > 840) with a soft fade at the bottom of the scene zone, as 0002 did for its zoomed map.

### `device`
Ordinary screens in the home, outline-on-surface, standing on the floor line `y`. `h` is the total height.
- `kind: "phone"`: a phone (the `phone` body at small size) leaning on a small wedge stand.
- `kind: "laptop"`: an open laptop seen from the front: a screen 1.4·h wide and 0.75·h tall on a base 1.6·h wide and 0.08·h thick.
- `kind: "tv"`: a flat television (1.7·h wide, 0.85·h tall) on a short centre foot.
- **Screens** are filled `C.bg`. `screen: "searching"`: a small outlined Wi-Fi symbol (`C.line`) and three dots under it lighting in turn (one every 0.4 s, `C.dim`). `connected`: a grey Wi-Fi symbol with all bars lit and a small grey check. `buffering`: a ring of eight dots turning (0.8 s per turn), the leading dot `C.fg` and the rest fading behind it.

### `glasses`
A small pair of folded reading glasses lying on top of the router in the slip shot. `x`, `y` (centre), `w` (width), `color` (`grey`).
- Two round lenses (r = 0.2·w) as 3 px wire outlines with a faint lens fill (`C.surface` at 50%) and a small highlight arc; a curved bridge; the two arms folded behind, crossing each other. Seen from slightly above. No glow. It is a prop, not a figure: nothing about it should suggest a face.

### `upload-bar`
A file upload progress bar: the Department's report trying to send.

| Field | Meaning |
|---|---|
| `x`, `y`, `w` | Centre of the bar, its vertical centre, and width. |
| `file` | File name after the redacted name: the label reads `████████ / {file}` (a `C.fg` bar for the name, then mono). |
| `value`, `from` | Percent. With `from`, the bar fills from `from` to `value` over the first 80% of the line (`ease`), then stops dead. Without it, it is at `value` from the start. |
| `state` | `uploading`: fill `C.blue` (or `color`). `failed`: fill `C.red`, the word `FAILED` in red after the percentage. `stalled`: fill `C.blue`, the word `WAITING` blinking at 1 Hz in `C.dim`. |
| `color` | `red` overrides the fill and percentage colour. |
| `size` | Default: bar 18 px tall, label and percentage 20 px mono. `large`: bar 40 px tall, label 32 px mono, the percentage in the display font (Archivo 800, 72 px) right-aligned above the bar's end. |

The label sits above the left end of the bar, the percentage above the right end. The bar's outline is a 2 px `C.line` rect; the fill is flat, with no stripes or shine.

---

## Shot type: `wifi-list`

The phone's Wi-Fi settings page, filling the frame (no phone body around it). It is the episode's signature visual. Fields live under `shot.wifi`. `shot.accent` sets the caption emphasis colour and the colour of labels.

**Look:**
- **Panel:** a 1000 px wide panel centred at x 960, from y 170 to y 800, `C.surface` fill, `C.line` 2 px border, radius 24.
- **Header:** `WI-FI` in IBM Plex Mono 30 px, letter-spaced 0.3em, `C.dim`, at the top left of the panel; a blue toggle (on) at the top right; under the header `NETWORKS` in mono 20 px `C.dim`.
- **Rows:** 90 px tall from y 300, separated by 1 px `C.line` dividers. Each row: the name in mono 36 px `C.fg` at the panel's left padding; a padlock outline (`C.dim`) at x 1300 when `lock`; a signal symbol (the `signal-bars` look, size 56, `C.fg`) at x 1400.
- **Your network** (`mine: true`): a small blue check left of the name and `CONNECTED` in mono 18 px `C.blue` under it.
- **Their network** (`redact: n`): no text. The name is a solid `C.fg` bar n × 24 px wide and 30 px tall, with the figure glow, so it reads as a name the Department will not print. No lock, full bars. **We never show the viewer's name.**

| Field | Meaning |
|---|---|
| `networks` | Rows, top to bottom: `{name \| redact, bars, lock, mine, theirs}`. |
| `focus`, `zoom` | Push in on that row: scale around the row's centre from 1 to `zoom` over the first 0.8 s (`ease`). Mask the panel to the scene zone with soft fades at y 108–150 and 800–842 (as 0002's zoomed map), so nothing reaches the HUD or the captions. |
| `fill_bars` | That row's signal symbol starts empty and lights one level at a time, 0 → 4, over 0–70% of the line. |
| `scan` | A small spinner next to the `WI-FI` title for the whole line. |
| `appear` | `"sequence"`: the rows pop in one by one, 0.15 s apart. A list of indices: only those rows slide down into place from above over 0.5 s; the rest are there from the start. |
| `pulse` | List of rows highlighted one after another, each for an equal share of the line (row background `C.surface2`, name at full brightness, the others at 60%). |
| `highlight` | One row highlighted in blue (background `C.blue` at 10%, name in `C.blue`). |
| `dim_others` | Every row except the focus, highlight and `theirs` rows at 35%. |
| `labels` | `[{part, row, text, mark}]`, drawn on one after another 0.4 s apart. `part` is `name`, `bars` or `lock` of `row` (default: `focus`, else 0). With `text`, a kit-style annotation label (3 px leader, mono 24 px, letter-spaced) in the accent colour points at that part. With `mark: "circle"`, a red circle draws around it instead (the kit `mark` look). |
| `pulse_name` | `"red"`: the redaction bar of the focus row pulses `C.fg` → `C.red` → `C.fg` twice (0.5 s each way). |
| `retype` | `{row, to, color}`: that row's bar blinks three times in 0.3 s, shrinks to nothing, then grows to `to` × 24 px over 0.6 s and ends in `color`. |
| `empty_hint` | `NO OTHER NETWORKS` in mono 20 px `C.dim`, centred under the last row. |
| `outline` | A 3 px red outline draws around that row (draw-on over 0.5 s). |

## Shot type: `channel-graph`

A Wi-Fi analyser view of the 2.4 GHz band: which network sits on which channel, and how loud it is. Fields live under `shot.graph`.

**Look:**
- **Axis:** a baseline at y 760 from x 340 to x 1580, `C.line` 2 px. Channel numbers 1–13 under it in mono 20 px `C.dim`, at `X(ch) = 360 + (ch − 1) / 12 · 1200`. Faint vertical gridlines (`C.line` at 25%) at each channel.
- **Title** top left of the graph: `WI-FI ANALYSER · 2.4 GHZ` in mono 20 px `C.dim`, letter-spaced. A rotated `SIGNAL` label on the left.
- **Networks:** each is a smooth hump (raised cosine) centred on its channel and spanning channel − 2 to channel + 2, with height `strength · 520` px. A 3 px stroke in its colour and the same colour at 12% as fill. Its label sits just above the peak: the name in mono 22 px, or a `C.fg` redaction bar (`redact` × 18 px) for theirs. Colours: `blue` (`C.blue`, `glowBlue`), `grey` (`C.grey`), `dim` (`C.dim`), `red` (`C.red`, `glowRed`).
- Where two humps share a channel, draw the weaker one first.

| Field | Meaning |
|---|---|
| `networks` | `{name \| redact, channel, strength (0–1), color}`. |
| `mark_channel` | A dashed `C.blue` vertical line at that channel and `CH 6` in mono 20 px `C.blue` under the axis. |
| `mode` | *(none)*: static, the humps rise from 0 to their strength over the first 0.6 s. `talkover`: the blue hump breathes (±5% at 0.8 Hz); each time it peaks, the grey hump under it dips a further 10%; the part of the grey hump inside the blue one is drawn at 40%. `quiet`: a hump with strength 0 starts at 0.7 and falls flat over the first 25% of the line; a `red` hump starts grey at 0.6 and rises to its strength over 15–45%, turning red as it rises. |
| `timer` | `{from, to}`: a mono `HH:MM` clock at the top right ticking minute by minute from `from` to `to` over the line. |

---

## Sound

No new sound effects. The router being lifted is silent on purpose (only the `burst` arcs show it), the plug uses the kit's `click`, and `static`, `page`, `stamp`, `tick` and `silence` cover the rest.

## After this episode

- **`phone` is due for promotion.** It is now the second advisory with a phone (0002 drew one for its vacuum app). By `BRAND.md` §6 the phone body (frame, glow, status bar, sheen) belongs in the kit, with each episode supplying only its screens. That is a kit change, so it is not done here: build 0004's phone from the 0002 body, and flag the promotion in the build report for the owner to schedule (in the template repo, so 0005+ start with it).
- `router`, `signal-bars` and `waves` are likely to come back in smart-home advisories. `waves` with `mode: "burst"` reproduces 0002's `knock`; if a third advisory needs knocks or rings, promote it into the kit as one element.
- `wifi-list`, `channel-graph`, `router-sticker`, `glasses` and `upload-bar` should stay episode assets.
