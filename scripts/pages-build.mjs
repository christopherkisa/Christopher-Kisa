import { spawnSync } from "node:child_process";

function run(command, args, options = {}) {
  return spawnSync(command, args, { stdio: "inherit", shell: false, ...options });
}

function hasCommand(cmd) {
  const checker = process.platform === "win32" ? "where" : "command";
  const args = process.platform === "win32" ? [cmd] : ["-v", cmd];
  const res = spawnSync(checker, args, { stdio: "ignore", shell: false });
  return res.status === 0;
}

const isWindows = process.platform === "win32";

if (isWindows && !hasCommand("bash")) {
  console.error(
    [
      "Cloudflare Pages local build requires bash on Windows.",
      "Use one of these options:",
      "1) Deploy from Cloudflare Pages Git integration (recommended).",
      "2) Install Git Bash or WSL, then run `npm run pages:build` again.",
    ].join("\n"),
  );
  process.exit(1);
}

const result = run("npx", ["--yes", "@cloudflare/next-on-pages@1"]);
process.exit(result.status ?? 1);
