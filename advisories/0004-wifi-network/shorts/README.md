# Shorts plans: Advisory 0004

Three Short plans for the `advisory-to-short` Claude Code skill, built with the channel's Short formula (`channel/shorts-formula.md`). They are not used by the long-form build.

**To use them:** copy `short-A.json`, `short-B.json` and `short-C.json` into `.claude/skills/advisory-to-short/plans/0004-wifi-network/` in the repo that has the skill, then, once the advisory is rendered:

> Use the advisory-to-short skill to make the three Shorts for Advisory 0004. The master is `advisories/0004-wifi-network/out/advisory-0004-wifi-network-final.mp4`.

| | Angle | Lines | Est. runtime* | Exit |
|---|---|---|---|---|
| **A** | Most violated: Do not follow the signal (case 0516) | L001–L003, L008, L029–L039, L093–L094 | ~51 s | callback "it is not a neighbour." |
| **B** | Case file: Do not rename your network (804 households) | L001–L003, L040–L046, L093–L094 | ~39 s | callback |
| **C** | The slip: Do not read the password out loud | L001–L003, L055–L067 | ~49 s | "That remark has been redacted." |

\* From the estimated timings, before any voice exists. `make_short.py check` gives the real numbers. A runs a little over the 50 s target on the estimate; if `check` agrees, move the first `dropFirst` group (`L032`, "Two bars in the kitchen…") into `skip`.

- **B** is the second-best directive with a number, because A already holds the case file (D2 has case 0516; the formula says B then takes the next directive with a concrete number or document).
- Nothing from Directive 6, the addendum, the reveal line or the end stamp is used, per the formula.
- Posting order: A on launch day, B two days later, C four days later. Set the long form as each Short's Related video.
