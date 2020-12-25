import { asOptions } from '../src/providers/http/decoders';
import { OCREngineMode, PageSegmentationMethod } from '../src/processor';

describe('http decoders', () => {
  it('should throw on invalid values', () => {
    expect(() => asOptions(undefined)).toThrow();
    expect(() => asOptions(null)).toThrow();
    expect(() => asOptions('')).toThrow();
    expect(() => asOptions(1)).toThrow();
    expect(() => asOptions([])).toThrow();
  });

  it('should throw on invalid dpi values', () => {
    expect(() => asOptions({ dpi: -100 })).toThrow();
    expect(() => asOptions({ dpi: 0 })).toThrow();
    expect(() => asOptions({ dpi: 300 })).not.toThrow();
    expect(() => asOptions({ dpi: 600 })).not.toThrow();
  });

  it('should throw on wrong psm and oem options', () => {
    expect(() => asOptions({ pageSegmentationMethod: 99999 })).toThrow();
    expect(() => asOptions({ pageSegmentationMethod: -1 })).toThrow();
    expect(() =>
      asOptions({
        pageSegmentationMethod:
          PageSegmentationMethod.AUTO_PAGE_SEGMENTATION_WITH_OSD,
      }),
    ).not.toThrow();

    expect(() => asOptions({ ocrEngineMode: 98774 })).toThrow();
    expect(() => asOptions({ ocrEngineMode: -13 })).toThrow();
    expect(() =>
      asOptions({ ocrEngineMode: OCREngineMode.AUTO }),
    ).not.toThrow();
  });

  it('should throw on non string config option values', () => {
    const expectConfigParams = (configParams: unknown) =>
      expect(() =>
        asOptions({
          configParams,
        }),
      );

    expectConfigParams({ nullKey: null }).toThrow();
    expectConfigParams({ undefinedKey: undefined }).toThrow();
    expectConfigParams({ numKey: 999 }).toThrow();
    expectConfigParams({ boolKey: false }).toThrow();
    expectConfigParams({ arrKey: [] }).toThrow();
    expectConfigParams({ objKey: {} }).toThrow();
  });

  it('should pass language options', () => {
    expect(asOptions({ languages: ['eng'] })).toMatchObject({
      languages: ['eng'],
    });
    expect(asOptions({ languages: ['eng', 'deu'] })).toMatchObject({
      languages: ['eng', 'deu'],
    });
  });
});
