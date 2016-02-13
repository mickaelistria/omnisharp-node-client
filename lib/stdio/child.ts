import {spawn} from "child_process";
const argv = require("yargs").argv;

const serverPath = argv.serverPath;
const projectPath = argv.projectPath;
const zeroBasedIndices = argv.projectPath;

const args = ["--stdio", "-s", projectPath, "--hostPID", process.pid];
if (zeroBasedIndices) {
    args.push("--zero-based-indicies");
}

Object.keys(argv)
    .filter(z => z !== "_" && z !== "$0" && z !== "serverPath" && z !== "projectPath" && z !== "zeroBasedIndices")
    .forEach(z => args.push("--" + z + "=" + argv[z]));

const childProcess = spawn(serverPath, args);

process.stdin.pipe(childProcess.stdin);
childProcess.stdout.pipe(process.stdout);
childProcess.stderr.pipe(process.stderr);

process.stdin.resume();
process.on("message", function(message: any) {
    if (message === "kill")
        process.exit();
});

childProcess.on("exit", () => process.exit());
childProcess.on("disconnect", () => process.exit());
childProcess.on("close", () => process.exit());
