# Advisory 0004: build the video

You are building one finished YouTube video for the channel **Not Covered**: **"If Your Wi-Fi Ever Shows A Network With Your Name… DO NOT CONNECT"**. The narrator is the fictional **Department of Unlisted Risks**. The video is drawn in code with the channel kit (Remotion + React + SVG) and rendered to MP4. The only AI-generated asset is the voice-over (OpenRouter).

The creative decisions are made. Don't ask the owner for any, and never change the wording of a line's `voice` or `caption`. If something in the script looks wrong, report it in the build report instead of fixing it. The only thing to ask for is `OPENROUTER_API_KEY` if `.env` doesn't have it.

## Where things are

This repo (**itsaytaa/YT-0004**) is the studio for this advisory: the channel kit (kit 1.1.0, seeded from `itsaytaa/YT-Notcovered-Template`), Advisory 0001 for reference, and Advisory 0004 already scaffolded and registered.

| File | Role |
|---|---|
| `advisories/0004-wifi-network/BUILD.md` | These instructions. |
| `advisories/0004-wifi-network/brief.md` | Story logic, directives, continuity with Advisories 0001–0003, the asset list. |
| `advisories/0004-wifi-network/scenes.json` | **Source of truth.** 97 lines (voice text, caption, shot, pause, emphasis, sfx, transition) and 98 shots. It validates against the kit, apart from the episode assets you build. |
| `advisories/0004-wifi-network/script.md` | Read-through version of `scenes.json`. |
| `advisories/0004-wifi-network/assets-spec.md` | Exact spec for the eight new elements and two new shot types this episode needs. |
| `advisories/0004-wifi-network/reference/phone-0002.tsx.txt` | Advisory 0002's phone (from `itsaytaa/YT-0002`), for the phone body. Reference only; not compiled. |
| `advisories/0004-wifi-network/metadata.md` | YouTube title, description, tags and pinned comment. The chapters are filled in at step 7. |
| `advisories/0004-wifi-network/shorts/` | Three Short plans (A, B, C) for the `advisory-to-short` skill. Not used in this build. |
| `advisories/0004-wifi-network/preview/contact-sheet.png` | One still per shot, rendered with **placeholder** assets: rough blocks stand in for the router, phone, rings, devices, the Wi-Fi list and the channel graph. It shows the intended composition of the kit parts. It is not the look of the new assets. |
| `video/src/episodes/0004-wifi-network/` | The episode's code: `index.ts` (wiring, done), `assets.tsx` (empty: you build it), `patches.ts`, `Thumbnail.tsx` (template: you replace the scene). |

## Step 0: Set up

```sh
cd video && npm ci && cd ..
node scripts/timings.mjs --ep 0004 --estimate
node scripts/validate.mjs --ep 0004
```

- Read `CLAUDE.md` and `brand/BRAND.md` before anything else. Use `brand/reference/*.png` for the look and `brand/catalog.json` for what the kit can draw.
- Expect exactly **10 errors** at this point, all "custom asset … is not registered". Anything else is a problem: stop and report it.
- **Drone bed:** `node scripts/sfx.mjs` fails out of the box (Advisory 0002's report: the recipes in `brand/audio.json` write to `audio/sfx/`, which doesn't exist). Do what 0002 did: generate only the drone bed with its recipe into `brand/sfx/drone.wav` (gitignored) and `video/public/sfx/`, and leave the committed SFX WAVs alone. Report it; don't fix the kit.
- Work on a branch: `git checkout -b advisory/0004-wifi-network` (or the session's designated branch, and say which in the report).
- If you work from the zip package instead of this repo: clone `itsaytaa/YT-Notcovered-Template` (kit 1.1.0 or later), run `node scripts/new-advisory.mjs 0004 wifi-network "If Your Wi-Fi Ever Shows A Network With Your Name… DO NOT CONNECT"`, and copy the package's files into `advisories/0004-wifi-network/`, overwriting the skeletons.

## Step 1: Build the episode assets

1. Implement everything in `assets-spec.md` in `video/src/episodes/0004-wifi-network/assets.tsx`, registered under the exact names. Keep larger pieces in their own files in the same folder (`router.tsx`, `phone.tsx`, `wifi-list.tsx`, `channel-graph.tsx`), as 0002 did. **Don't edit kit files** (`video/src/` outside `episodes/`, or `brand/`).
2. **The phone:** copy the body from `reference/phone-0002.tsx.txt` into this episode's `phone.tsx` (frame, glow, light pool, sheen, notch, status bar), drop the vacuum-app screens and its `map.tsx` import, and add the Wi-Fi screens from the spec. Side by side, the two phones must look like the same phone.
3. Before using them in shots, build an asset test sheet: a temporary composition in the episode folder, not registered in the shared Root (0002 used `video/src/episodes/0002-robot-vacuum/sheet/` with its own entry point, then removed it and kept the renders in `reports/asset-sheet/`).
   - Show the router in every state: front and back, both `stand`s, every `leds` mode (a few frames of `busy` and `restart`), `plug` in and out, `lift`, mid-`settle` with `ghost_at`, `age: old`.
   - Show the phone with every `screen` (mid-`rename`, `timer` part-way, `pulse_join`), large and small, with and without `glow`, and tilted.
   - Show `signal-bars` at 0–4 in every colour with a label; `waves` in every mode (mid-`burst`, with `clip`); every `device` kind in every screen state; the sticker and the glasses (normal and grey); `upload-bar` in every state, normal and large.
   - Show `wifi-list` with every field (mid-`zoom`, mid-`fill_bars`, `labels` with text and with `mark`, mid-`retype`) and `channel-graph` in every mode.
   - For scale, stand a 360 px kit person next to a 300 px router on its shelf and the kit inspector next to it at full opacity. The router must read as the same family as the cat and person in `brand/reference/characters.png`.
4. `node scripts/validate.mjs --ep 0004` must now report 0 errors. Also run `cd video && npx tsc --noEmit`.

## Step 2: Preview for free, before any voice money

1. `REMOTION_BROWSER_EXECUTABLE=<chrome-headless-shell> node scripts/review-stills.mjs --ep 0004`, then open `advisories/0004-wifi-network/out/review/contact-sheet.png`.
2. Compare it with `preview/contact-sheet.png`: the kit parts should sit where they do there.
3. Fix every shot where something overlaps, crowds the caption zone (y 860–1000) or doesn't match its `desc`. **`desc` is the authority.**
4. Check the motion. Remotion Studio (`cd video && npx remotion studio` → `Advisory-0004`) is best; in a headless container, render frame strips through the moving shots as 0002 did. Check in particular:
   - the full bars filling in on the redacted row (S02), and the new row sliding in at the top of the list (S14);
   - the second, red signal icon at the foot of the bed with the faint inspector under it (S17);
   - the grey rings rolling in over the bed (S23) and then converging on it (S25);
   - the dotted walk through the three doors and the icons filling 2, 3, 4 (S31);
   - `GO AWAY` typing in (S39) and the redacted name re-typing itself longer (S42);
   - the plug coming out and the blue rings dying (S46), and the devices finding the network (S49 → S50);
   - the router hanging above its shelf (S58), settling back to the left of its outline (S59), and the outline 3 cm away in the morning (S61);
   - the slip at L065 (SLIP1: greyscale, the sticker and the glasses);
   - the channel graph: two humps on channel 6 (S70), talking over (S71, S91) and the blue one going quiet (S74);
   - the seven failed uploads (S83), the inspector reveal (S84) and the bar stopping at 96% (S85).

## Step 3: Voice (costs money, about $0.40)

The voice is locked: **MiniMax Speech 2.8 HD, voice `English_ManWithDeepVoice`, through OpenRouter as `minimax/speech-2.8-hd`** (`brand/voice.json → chosen`). Don't run a voice test, and don't change the model.

```sh
node scripts/tts.mjs --ep 0004          # one request per line; the budget guard caps spend at $2
node scripts/stt-check.mjs --ep 0004    # WER check, re-generates bad lines, trims silence, slip treatment on L065
node scripts/timings.mjs --ep 0004      # real timings; runtime must land in 4:45–5:30 (estimate: 5:05)
```

- On Node 22 behind a proxy, prefix the commands with `NODE_USE_ENV_PROXY=1`.
- If the real runtime falls outside 4:45–5:30, `timings.mjs` scales all pauses automatically toward 5:00 (it prints the factor). Don't add or cut lines; report the factor.
- **STT spellings that are not errors:** "Wi-Fi" may come back as "wifi" or "WiFi", "neighbours'" as "neighbors", "per cent" as "percent" or "%", "FBI" as "F.B.I.". Judge those lines by ear, not by WER, and note them in the report. **L042** ends with "Go away." spoken flatly as a quote; a take that shouts it or turns it into a question is a regenerate.

## Step 4: Review

1. Run `review-stills.mjs --ep 0004` again and look at the contact sheet.
2. Watch the whole video once with sound (or sample the render every 2.5 s in a headless container, as 0002 did).
3. Fix layout in `scenes.json`. Once the voice exists, timing-safe corrections can also go in `video/src/episodes/0004-wifi-network/patches.ts`. Never change line text.

## Step 5: Render and master

```sh
cd video && npx remotion render Advisory-0004 ../advisories/0004-wifi-network/out/advisory-0004-wifi-network.mp4 --codec=h264 --crf=16 --audio-codec=aac --audio-bitrate=320k
cd ../advisories/0004-wifi-network/out && ffmpeg -i advisory-0004-wifi-network.mp4 \
  -af "loudnorm=I=-14:TP=-2.0:LRA=11,aresample=48000" \
  -c:v copy -c:a aac -b:a 320k -ar 48000 -movflags +faststart advisory-0004-wifi-network-final.mp4
```

- **Targets:** −14 LUFS integrated and at most −1.0 dBTP. Check with `ffmpeg -i …-final.mp4 -af ebur128=peak=true -f null -`.
- **If it lands off target:** do what 0002 did: a second `loudnorm` pass with the first pass's measured values, and ride a peaking stamp transient's clip gain down 2 dB.
- **Small container:** add `--concurrency=1`. If Chrome can't be downloaded, pass `--browser-executable=<chrome-headless-shell>`.

## Step 6: Thumbnail

Edit `video/src/episodes/0004-wifi-network/Thumbnail.tsx` (1280×720, `brand/BRAND.md` §7). Reuse this episode's `phone` and `router` components and the kit's `InspectorBody`.

- **Scene:** the phone large on the right, tilted a few degrees, its Wi-Fi list showing the network with the redacted name on top in red with full bars. Bottom left, small, the router on its shelf with every light dark. Behind the phone, at its left edge, the inspector silhouette at 20% opacity.
- **Text:** `DO NOT CONNECT` in the display font, 140 px, on two lines (`DO NOT` / `CONNECT`), `CONNECT` in `C.red` with a red underline. Above it, `ADVISORY 0004` small in blue mono.
- **Finish:** a vignette stronger than in the video.

Then render it:

```sh
cd video && npx remotion still Thumbnail-0004 ../advisories/0004-wifi-network/out/thumbnail.png
```

## Step 7: Chapters and metadata

`node scripts/chapters.mjs --ep 0004` fills the CHAPTERS block in `metadata.md` from the real timings. Check that the first chapter is 0:00.

## Step 8: Report

Write `advisories/0004-wifi-network/reports/report.md` covering:
- final runtime and the pause scale factor
- lines regenerated after the STT check
- loudness and true peak
- OpenRouter cost (from `reports/tts-log.json` and the budget)
- every deviation from `scenes.json`, `assets-spec.md` or `brand/BRAND.md`, and why
- kit issues you hit (not fixed), and the **phone promotion** (see `assets-spec.md → After this episode`)
- the output file paths

## Step 9: Commit

- **Before committing:** run `npx tsc --noEmit`, then `node scripts/validate.mjs --ep 0004` and `--ep 0001`. Run `node scripts/check-reference.mjs` too; it must still pass, because you didn't touch the kit.
- **What to commit:** everything except the gitignored files (the MP4s and regenerable WAVs). The trimmed line WAVs in `video/public/episodes/0004-wifi-network/lines/` **are** committed.
- **Where:** commit on your branch. Push and open a pull request only when the owner asks.

## Done when

- [ ] `Advisory-0004` renders 4:45–5:30 at 1920×1080, 30 fps. The final MP4 is at −14 LUFS and ≤ −1.0 dBTP.
- [ ] Every shot matches its `desc`, nothing enters the caption zone, and all eight episode elements, `wifi-list` and `channel-graph` follow `assets-spec.md`.
- [ ] The viewer's name is never shown: the network's name is always a redaction bar.
- [ ] The inspector is only a faint hint (S17, S58) until S84. In S84 it is clearly visible.
- [ ] The slip (L065 → L067) has the grey frame, the slip transition and the post treatment on L065.
- [ ] Every caption emphasis shows, and validate reports 0 errors.
- [ ] `out/thumbnail.png`, the filled-in `metadata.md` and `reports/report.md` exist.
- [ ] Advisory 0001 still renders, and `check-reference.mjs` passes.

## Do not

- Change any `voice` or `caption` text, the voice model or the directive titles.
- Show a real or invented personal name anywhere on screen.
- Redraw or restyle kit characters (person, inspector) or kit props. Use them as they are.
- Edit kit files for this episode, including promoting the phone. Note it in the report instead.
- Print, log or commit `OPENROUTER_API_KEY`.
