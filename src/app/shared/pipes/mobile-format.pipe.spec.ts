import { MobileFormatPipe } from './mobile-format.pipe';

describe('MobileFormatPipe', () => {
  it('create an instance', () => {
    // * arrange
    // * act
    const pipe = new MobileFormatPipe();
    // * assert
    expect(pipe).toBeTruthy();
  });

  // (what: string, how: fn)
  it('should format mobileNo', () => {

    // * arrange
    const pipe = new MobileFormatPipe();

    // * act
    const actual = pipe.transform('0891234567')

    // * assert
    const expected = '089-123-4567'
    expect(actual).toEqual(expected)
  })

});
