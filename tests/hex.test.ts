import { InvalidHexStringError } from '../src/errors/InvalidHexStringError';
import { HtmlColors } from '../src/HtmlColors';
import { HexColor } from '../src/HexColor';
import { RgbColor } from '../src/RgbColor';

describe('HexColor class', () => {
  it('should correctly assign values through the constructor', () => {
    const color = new HexColor('#5c8a73');

    expect((color as any).hex).toBe('#5c8a73FF');
  });

  it('should correctly assign values through the constructor using shorthand', () => {
    const color = new HexColor('#03f');

    expect((color as any).hex).toBe('#0033ffFF');
  });

  it('should correctly assign values through the constructor with alpha', () => {
    const color = new HexColor('#5c8a73cc');

    expect((color as any).hex).toBe('#5c8a73cc');
  });

  it('should correctly assign values through the constructor using HtmlColors', () => {
    const color = new HexColor(HtmlColors.Khaki);

    expect((color as any).hex).toBe('#F0E68CFF');
  });

  it('should correctly handle upper- and lowercase characters in hex string', () => {
    const uppercase = new HexColor('#ABCDEF');
    const lowercase = new HexColor('#abcdef');

    expect((uppercase as any).hex).toBe('#ABCDEFFF');
    expect((lowercase as any).hex).toBe('#abcdefFF');
  });

  it("should detect hex strings correctly", () => {
    expect(HexColor.isValidHexString('#123')).toBe(true);
    expect(HexColor.isValidHexString('#123456')).toBe(true);
    expect(HexColor.isValidHexString('#12345678')).toBe(true);

    expect(HexColor.isValidHexString('123')).toBe(false);
    expect(HexColor.isValidHexString('#12')).toBe(false);
    expect(HexColor.isValidHexString('#1234')).toBe(false);
    expect(HexColor.isValidHexString('#12345')).toBe(false);
    expect(HexColor.isValidHexString('#1234567')).toBe(false);
    expect(HexColor.isValidHexString('#123456789')).toBe(false);
    expect(HexColor.isValidHexString('#ZZZ')).toBe(false);
  });

  it("should throw an InvalidHexStringError for invalid hex string (length)", () => {
    expect(() => new HexColor("#12345")).toThrow(InvalidHexStringError);
  });

  it("should throw an InvalidHexStringError for invalid hex string (non-hex characters)", () => {
      expect(() => new HexColor("#ZZZZZZ")).toThrow(InvalidHexStringError);
  });

  it('should convert correctly to hex', () => {
    const color = new HexColor('#62C718');
    const hexColor = color.toHex();

    expect(hexColor).toBeInstanceOf(HexColor);
    expect(hexColor).toBe(color);
  });

  it('should convert correctly to rgb', () => {
    const color3 = new HexColor('#2D7');
    const rgbColor3 = color3.toRgb();

    expect(rgbColor3).toBeInstanceOf(RgbColor);
    expect((rgbColor3 as any).red).toBe(34);
    expect((rgbColor3 as any).green).toBe(221);
    expect((rgbColor3 as any).blue).toBe(119);
    expect((rgbColor3 as any).alpha).toBe(1);

    const color6 = new HexColor('#2D71D7');
    const rgbColor6 = color6.toRgb();

    expect(rgbColor6).toBeInstanceOf(RgbColor);
    expect((rgbColor6 as any).red).toBe(45);
    expect((rgbColor6 as any).green).toBe(113);
    expect((rgbColor6 as any).blue).toBe(215);
    expect((rgbColor6 as any).alpha).toBe(1);

    const color8 = new HexColor('#2D71D7CC');
    const rgbColor8 = color8.toRgb();

    expect(rgbColor8).toBeInstanceOf(RgbColor);
    expect((rgbColor8 as any).red).toBe(45);
    expect((rgbColor8 as any).green).toBe(113);
    expect((rgbColor8 as any).blue).toBe(215);
    expect((rgbColor8 as any).alpha).toBe(0.8);
  });

  it('toString() should return the correct hex string', () => {
    const color = new HexColor('#7D4118CC');

    expect(color.toString()).toBe('#7D4118');
    expect(color.toString(false)).toBe('#7D4118');
    expect(color.toString(true)).toBe('#7D4118CC');
  });
});