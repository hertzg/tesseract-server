import { createYargs } from './yargs';

export { createYargs };
export const yargs = createYargs(process.argv);
export default yargs.parse();
