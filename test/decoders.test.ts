import { assertEquals, assertThrows } from "@std/assert";
import { asOptions } from "../src/providers/http/decoders.ts";
import {
  OCREngineMode,
  PageSegmentationMethod,
} from "../src/processor/index.ts";

Deno.test("http decoders - should throw on invalid values", () => {
  assertThrows(() => asOptions(undefined));
  assertThrows(() => asOptions(null));
  assertThrows(() => asOptions(""));
  assertThrows(() => asOptions(1));
  assertThrows(() => asOptions([]));
});

Deno.test("http decoders - should throw on invalid dpi values", () => {
  assertThrows(() => asOptions({ dpi: -100 }));
  assertThrows(() => asOptions({ dpi: 0 }));
  asOptions({ dpi: 300 });
  asOptions({ dpi: 600 });
});

Deno.test("http decoders - should throw on wrong psm and oem options", () => {
  assertThrows(() => asOptions({ pageSegmentationMethod: 99999 }));
  assertThrows(() => asOptions({ pageSegmentationMethod: -1 }));
  asOptions({
    pageSegmentationMethod:
      PageSegmentationMethod.AUTO_PAGE_SEGMENTATION_WITH_OSD,
  });

  assertThrows(() => asOptions({ ocrEngineMode: 98774 }));
  assertThrows(() => asOptions({ ocrEngineMode: -13 }));
  asOptions({ ocrEngineMode: OCREngineMode.AUTO });
});

Deno.test("http decoders - should throw on non string config option values", () => {
  assertThrows(() => asOptions({ configParams: { nullKey: null } }));
  assertThrows(() => asOptions({ configParams: { undefinedKey: undefined } }));
  assertThrows(() => asOptions({ configParams: { numKey: 999 } }));
  assertThrows(() => asOptions({ configParams: { boolKey: false } }));
  assertThrows(() => asOptions({ configParams: { arrKey: [] } }));
  assertThrows(() => asOptions({ configParams: { objKey: {} } }));
});

Deno.test("http decoders - should pass language options", () => {
  const result1 = asOptions({ languages: ["eng"] });
  assertEquals(result1.languages, ["eng"]);

  const result2 = asOptions({ languages: ["eng", "deu"] });
  assertEquals(result2.languages, ["eng", "deu"]);
});
