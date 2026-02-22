import { spawnWithWorkingDirectory } from './spawnWithWorkingDirectory.ts';
import process from "node:process";

const detectTesseract = () => 'tesseract';
export const spawnTesseract = (
  args: readonly string[],
  workingDirectory = process.cwd(),
) => spawnWithWorkingDirectory(detectTesseract(), args, workingDirectory);
