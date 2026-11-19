// Renders a motion reel (marketing/<name>/reel.html) to an MP4 and a poster per language with the local Chrome and ffmpeg.
// Usage: node scripts/render-reel.mjs <intro|book> [en de fr]
import {spawn} from "node:child_process";
import {mkdtempSync, rmSync, writeFileSync} from "node:fs";
import {tmpdir} from "node:os";
import path from "node:path";
import {fileURLToPath, pathToFileURL} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const chrome = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const reels = {
  intro: {seconds: 25, posterAt: 22.6, out: "public/media/intro/sinda-intro"},
  book: {seconds: 26, posterAt: 24.6, out: "public/media/book/book-reel"},
};
const name = process.argv[2];
if (!reels[name]) throw new Error("Usage: node scripts/render-reel.mjs <intro|book> [en de fr]");
const {seconds, posterAt, out: prefix} = reels[name];
const fps = 30, port = 9333;
const languages = process.argv.slice(3).length ? process.argv.slice(3) : ["en", "de", "fr"];

const profile = mkdtempSync(path.join(tmpdir(), "intro-chrome-"));
const browser = spawn(chrome, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "--window-size=1920,1080", "--hide-scrollbars", "--force-device-scale-factor=1", "--allow-file-access-from-files", "about:blank"], {stdio: "ignore"});
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
let target;
for (let i = 0; i < 50 && !target; i++) { await sleep(200); try { target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find(t => t.type === "page"); } catch {} }
if (!target) throw new Error("Chrome did not start");
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise(resolve => socket.addEventListener("open", resolve));
let id = 0; const pending = new Map();
socket.addEventListener("message", event => { const message = JSON.parse(event.data); pending.get(message.id)?.(message); pending.delete(message.id); });
const send = (method, params = {}) => new Promise((resolve, reject) => { pending.set(++id, message => message.error ? reject(new Error(message.error.message)) : resolve(message.result)); socket.send(JSON.stringify({id, method, params})); });
const evaluate = expression => send("Runtime.evaluate", {expression, awaitPromise: true, returnByValue: true});
await send("Emulation.setDeviceMetricsOverride", {width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false});

for (const lang of languages) {
  const url = `${pathToFileURL(path.join(root, `marketing/${name}/reel.html`))}?lang=${lang}`;
  await send("Page.navigate", {url});
  await sleep(800);
  await evaluate("Promise.all([document.fonts.ready, ...[...document.images].map(image => image.decode().catch(() => {}))]).then(() => true)");
  const out = path.join(root, `${prefix}-${lang}.mp4`);
  const ffmpeg = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(fps), "-c:v", "mjpeg", "-i", "-", "-c:v", "libx264", "-preset", "slow", "-crf", "21", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", out], {stdio: ["pipe", "inherit", "inherit"]});
  for (let frame = 0; frame < fps * seconds; frame++) {
    await evaluate(`render(${(frame / fps).toFixed(4)}); new Promise(resolve => requestAnimationFrame(() => resolve(true)))`);
    const {data} = await send("Page.captureScreenshot", {format: "jpeg", quality: 93});
    if (!ffmpeg.stdin.write(Buffer.from(data, "base64"))) await new Promise(resolve => ffmpeg.stdin.once("drain", resolve));
  }
  ffmpeg.stdin.end();
  await new Promise(resolve => ffmpeg.on("close", resolve));
  await evaluate(`render(${posterAt}); new Promise(resolve => requestAnimationFrame(() => resolve(true)))`);
  const poster = await send("Page.captureScreenshot", {format: "jpeg", quality: 86});
  writeFileSync(path.join(root, `${prefix}-${lang}-poster.jpg`), Buffer.from(poster.data, "base64"));
  console.log(out);
}
socket.close(); browser.kill(); await sleep(300); rmSync(profile, {recursive: true, force: true});
