import { dict, exact, guard, integer, oneOf, optional, string } from 'decoders';
import { nonEmptyArray } from 'decoders/array';
import { OCREngineMode, Options, PageSegmentationMethod } from '../processor';

const pageSegmentationMethod = oneOf([
  PageSegmentationMethod.ORIENTATION_AND_SCRIPT_DETECTION_ONLY,
  PageSegmentationMethod.AUTO_PAGE_SEGMENTATION_WITH_OSD,
  PageSegmentationMethod.AUTO_PAGE_SEGMENTATION_WITHOUT_OSD_AND_OCR,
  PageSegmentationMethod.AUTO_PAGE_SEGMENTATION_WITHOUT_OSD,
  PageSegmentationMethod.SINGLE_COLUMN_VARIABLE_SIZE,
  PageSegmentationMethod.SINGLE_UNIFORM_BLOCK_VERTICAL_TEXT,
  PageSegmentationMethod.SINGLE_UNIFORM_BLOCK_TEXT,
  PageSegmentationMethod.SINGLE_LINE,
  PageSegmentationMethod.SINGLE_WORD,
  PageSegmentationMethod.SINGLE_WORD_IN_CIRCLE,
  PageSegmentationMethod.SINGLE_CHAR,
  PageSegmentationMethod.SPARSE_TEXT,
  PageSegmentationMethod.SPARSE_TEXT_WITH_OSD,
  PageSegmentationMethod.RAW_SINGLE_LINE,
]);

const ocrEngineMode = oneOf([
  OCREngineMode.TESSERACT,
  OCREngineMode.LSTM,
  OCREngineMode.TESSERACT_WITH_LSTM,
  OCREngineMode.AUTO,
]);

const optionsDecoder = exact({
  languages: optional(nonEmptyArray(string)),
  dpi: optional(integer),
  pageSegmentationMethod: optional(pageSegmentationMethod),
  ocrEngineMode: optional(ocrEngineMode),
  tessDataDir: optional(string),
  userPatternsFile: optional(string),
  userWordsFile: optional(string),
  configParams: optional(dict(string)),
});

export const asOptions = guard<Options>(optionsDecoder);
