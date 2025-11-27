import { spawn } from "child_process";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const ttfDir = path.join(repoRoot, "out", "TTF");
const outputDir = path.join(repoRoot, "out", "WOFF2", "SarasaUI-SC");

async function ensureDir(dir) {
        await fs.mkdir(dir, { recursive: true });
}

function run(cmd, args) {
        return new Promise((resolve, reject) => {
                const child = spawn(cmd, args, { stdio: "inherit" });
                child.on("close", code => {
                        if (code === 0) {
                                resolve();
                        } else {
                                reject(new Error(`${cmd} exited with code ${code}`));
                        }
                });
                child.on("error", reject);
        });
}

async function main() {
        await ensureDir(outputDir);

        const entries = await fs.readdir(ttfDir);
        const targets = entries.filter(name => name.startsWith("SarasaUiSC-") && name.endsWith(".ttf"));

        if (targets.length === 0) {
                throw new Error(`No Sarasa UI SC TTFs found in ${ttfDir}. Build hinted TTFs first.`);
        }

        for (const name of targets) {
                const ttfPath = path.join(ttfDir, name);
                console.log(`Compressing ${name} to WOFF2...`);
                await run("woff2_compress", [ttfPath]);

                const woff2Name = `${path.basename(name, ".ttf")}.woff2`;
                const woff2Source = path.join(ttfDir, woff2Name);
                const woff2Target = path.join(outputDir, woff2Name);
                await fs.rename(woff2Source, woff2Target);
                console.log(`Saved ${woff2Name} -> ${path.relative(repoRoot, woff2Target)}`);
        }

        console.log("Done. WOFF2 files are ready for web use.");
}

main().catch(err => {
        console.error(err.message);
        process.exitCode = 1;
});
