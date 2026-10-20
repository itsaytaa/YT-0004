# Brief: Advisory 0004

## The video

**Title:** If Your Wi-Fi Ever Shows A Network With Your Name… DO NOT CONNECT
**Format:** "rules horror" instruction tape, 16:9, about 5 minutes, English.
**One-line pitch:** At three in the morning your router restarts for an update, and for four minutes your phone shows a new Wi-Fi network: your name, full bars, no lock. The Department explains six directives. In the end you learn that its inspectors upload their reports over a network named after your file, and that your slow old router has been talking over that network every night for seven years, so not one report from your home has ever finished uploading.

Channel identity, layout and characters are fixed: see `brand/BRAND.md`. The voice is locked: MiniMax Speech 2.8 HD, voice `English_ManWithDeepVoice`, through OpenRouter as `minimax/speech-2.8-hd`. It ignores tone instructions, so the delivery is written into the text (short sentences, "..." for held pauses).

## Story logic

1. **The hook.** Your phone sees every network near you: the neighbours', the printer, the television upstairs, and one called "FBI Surveillance Van" (*"It is not ours."*). Tonight you woke at 3 AM. Your router was restarting for an update, and for four minutes your home had no Wi-Fi. That is when you saw it: your name, full bars, no lock. Your router is in the hallway and never gets full bars in the bedroom. Full bars means it is closer than your router.
2. **Directive 1: Do not connect.** It has no lock and needs no password. Your phone offers to join it, and you want to know who set it up. Do not tap it. A network does not need your name to find you; this one already has it. Connecting only tells it which room you are in.
3. **Directive 2: Do not follow the signal** (the one most households violate). You get up and hold the phone out: two bars in the kitchen, three in the hallway. Case 0516 (Glasgow): she walked her phone through every room. Full bars in the bedroom. Full bars on her side of the bed. The blanket was warm. She had been out of bed for ten minutes. Stay where you are.
4. **Directive 3: Do not rename your network.** You will want to send a message and rename your own network "GO AWAY". In the Department's files, 804 households did this. In the morning, the network with their name had been renamed too. *"We will not be putting the new name in writing."*
5. **Directive 4: Do not unplug the router.** Pull the plug and your network goes away. Theirs does not. Without your router, theirs is the only network in your home, and by morning your phone, laptop and television will have found it. Leave it plugged in. Let its lights blink.
6. **Directive 5: Do not read the password out loud.** It is on a sticker under the router; every guest has asked for it, and you turned the router over and read it out, twice. Not tonight. Sometime after four you hear the router being lifted. A long pause. Then it is put back down, a little to the left. **Slip:** *"We had to use our glasses."* → *"Apologies. That remark has been redacted."* (slip line L065)
7. **Directive 6: Do not reset it.** The emotional turn. Your router is old and videos stop loading at night. Your provider says to hold the reset button for ten seconds. Do not. Seven years, 2,557 nights. In its first week it changed one setting by itself: channel 6, the same channel as theirs. Every night since, it has been talking over them. You thought it was slow; it was busy. A reset puts it back the way it came. Tonight it was quiet for four minutes; after a reset it would be quiet for good. Let it keep talking.
8. **Addendum.** Inspectors file their reports before they leave your home. Their device makes a network to send them, named after the file, and your file is under your name. *"The Department of Unlisted Risks has filed inspection reports wirelessly for twenty-six years."* In seven years not one report from your home has finished uploading. Tonight, for four minutes, it was quiet. Your report is at 96%. Your router is the only reason it is not finished. That is why it is listed as a risk.
9. **Callback.** If your phone shows a network with your name tonight, it is not a neighbour. Do not connect. Leave the router on. And let it keep talking.

**Continuity with Advisories 0001–0003:** the same Department, the same faceless grey **inspector** with hat, coat and clipboard (its clipboard is the device that makes the network), the same reveal shape (a household thing has been quietly protecting you, and that is why the Department lists it as a risk). In 0001 the inspectors stood in corners; in 0002 we learned where they wait; in 0003 why you never hear them; here we learn how they file what they saw, and why your home has never been filed.

## Directives

| # | Title | Escalation |
|---|---|---|
| 1 | Do not connect | It already has your name; connecting tells it which room you are in |
| 2 | Do not follow the signal | Full bars on her side of the bed; the blanket was warm (case 0516) |
| 3 | Do not rename your network | Theirs was renamed too (804 households); the refusal line |
| 4 | Do not unplug the router | Without yours, theirs is the only network; every device finds it |
| 5 | Do not read the password out loud | The router is lifted in the night and put back to the left; the slip |
| 6 | Do not reset it | Seven years on channel 6, talking over them; 2,557 nights |

## Assets

- **Kit characters used:** person ("you"), inspector (hinted at 7–8% opacity in S17 and S58 until the addendum reveal in S84), crowd (S54, the guests), cat (none).
- **Kit props used:** bed, door, window, clock, sofa, label, mark, speech, thought, boundary, gaze, glow, checklist, doc, case-file, counter (`decor: folder-stack`, `dots-grid`), calendar (`fromYear`/`toYear`/`pageLabel`), seal, cards, doc-mini.
- **New episode assets** (spec in `assets-spec.md`; declared in `scenes.json → meta`):
  - elements: `router`, `router-sticker`, `phone`, `signal-bars`, `waves`, `device`, `glasses`, `upload-bar`
  - shot types: `wifi-list` (the phone's Wi-Fi list, full frame) and `channel-graph` (a Wi-Fi analyser view of channels 1–13)
- **Promotion check:** Advisory 0002 already drew a `phone` as an episode asset (its vacuum app). This is the second advisory that needs a phone, so by `BRAND.md` §6 the phone body is due for the kit. Because that is a kit change, it is left to the owner: 0004 builds its own `phone` with the same body as 0002 (the 0002 file is included in `reference/`), and the build report flags the promotion. Nothing else from 0002 or 0003 is reused.

## End card

Status word: **UPLOADING.** + "NEXT ADVISORY: 0005".
