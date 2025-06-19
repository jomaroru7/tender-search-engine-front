const { execSync } = require("child_process");
const fs = require("fs");

const type = process.argv[2];

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
let [major, middle, minor] = pkg.version.split(".").map(Number);

if (type === "major") {
  major++;
  middle = 0;
  minor = 0;
} else if (type === "minor") {
  minor++;
} else {
  middle++;
  minor = 0;
}

const newVersion = `${major}.${middle}.${minor}`;
pkg.version = newVersion;
fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2) + "\n");
if (fs.existsSync("package-lock.json")) {
  const lock = JSON.parse(fs.readFileSync("package-lock.json", "utf8"));
  lock.version = newVersion;
  fs.writeFileSync("package-lock.json", JSON.stringify(lock, null, 2) + "\n");
}

execSync("git add .");
execSync(`git commit -m "Version ${newVersion}"`);
execSync(`git tag -a "${newVersion}" -m "Version ${newVersion}"`);
execSync("git push");
execSync("git push --tags");

execSync("npm run build", { stdio: "inherit" });

if (fs.existsSync("dist/.git")) {
  process.chdir("dist");
  execSync("git add .");
  try {
    execSync(`git commit -m "Version ${newVersion}"`);
  } catch (e) {
    console.log("No hay cambios en dist para commitear");
  }
  execSync("git push");
}

console.log(`Release ${newVersion} completado.`);