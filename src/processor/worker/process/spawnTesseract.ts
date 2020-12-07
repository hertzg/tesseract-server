import { spawnWithWorkingDirectory } from './spawnWithWorkingDirectory';

const detectTesseract = () => 'tesseract';
export const spawnTesseract = (
  args: readonly string[],
  workingDirectory = process.cwd(),
) => spawnWithWorkingDirectory(detectTesseract(), args, workingDirectory);
