import { HasFlagsPipe } from './hasFlags.pipe';

describe('hasFlag.pipe', () => {
  let pipe: HasFlagsPipe;

  beforeEach(() => {
    pipe = new HasFlagsPipe();
  });

  it('positive result tests using number', () => {
    expect(pipe.transform(1, 1)).toBe(true);
    expect(pipe.transform(3, 1)).toBe(true);
    expect(pipe.transform(3, 1, 2)).toBe(true);
  });

  it('positive result tests using type', () => {
    expect(pipe.transform(1, SampleFlags.one)).toBe(true);
    expect(pipe.transform(3, SampleFlags.one)).toBe(true);
    expect(pipe.transform(3, SampleFlags.one, SampleFlags.two)).toBe(true);
  });

  it('negative result tests', () => {
    expect(pipe.transform(2, 1)).toBe(false);
    expect(pipe.transform(2, 2, 1)).toBe(false);
    expect(pipe.transform(0, 1)).toBe(false);
    expect(pipe.transform(4, 2)).toBe(false);
  });

  it('undefined result tests', () => {
    expect(pipe.transform(2)).toBeUndefined();
    expect(pipe.transform(2, 0)).toBeUndefined();
    expect(pipe.transform(2, 0, 0)).toBeUndefined();
  });
});

type SampleFlag = 1 | 2 | 4;
const SampleFlags = {
  one: 1 as SampleFlag,
  two: 2 as SampleFlag,
  four: 4 as SampleFlag,
}
