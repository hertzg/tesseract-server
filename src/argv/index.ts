import { createYargs } from "./yargs.ts";
import process from "node:process";

export { createYargs };
export const yargs = createYargs(process.argv);
export default yargs.parse();
