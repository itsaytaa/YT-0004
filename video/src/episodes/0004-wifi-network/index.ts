// Advisory 0004: "If Your Wi-Fi Ever Shows A Network With Your Name… DO NOT CONNECT".
// Content lives in advisories/0004-wifi-network/; this file only wires it into the kit.
import { createEpisode } from "../../engine";
import scenes from "../../../../advisories/0004-wifi-network/scenes.json";
import timings from "../../../../advisories/0004-wifi-network/timings.json";
import { patches } from "./patches";
import { Thumbnail } from "./Thumbnail";
import { assets } from "./assets";

export const episode = createEpisode({ id: "0004", slug: "0004-wifi-network", scenes, timings, patches, assets });
export { Thumbnail };
