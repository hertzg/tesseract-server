import { createYargs } from './yargs.ts';

export { createYargs };
export const yargs = createYargs(process.argv);
export default yargs.parse();
