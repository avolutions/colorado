import { HexColor } from "./HexColor.js";
import { IColor } from "./IColor.js";

/**
 * Class representing an RGB color.
 * Implements the IColor interface.
 */
export class RgbColor implements IColor {
  /**
   * The red component of the RGB color.
   * @type {number}
   */
  private red: number;

  /**
   * The green component of the RGB color.
   * @type {number}
   */
  private green: number;

  /**
   * The blue component of the RGB color.
   * @type {number}
   */
  private blue: number;

  /**
   * Creates an instance of RgbColor.
   *
   * @param {number} red - The red component (0-255).
   * @param {number} green - The green component (0-255).
   * @param {number} blue - The blue component (0-255).
   */
  constructor(red: number, green: number, blue: number) {
    // Ensure RGB values are clamped between 0 and 255
    this.red = this.clampValue(red);
    this.green = this.clampValue(green);
    this.blue = this.clampValue(blue);
  }

  /**
   * Returns this instance in RGB format.
   *
   * @returns {RgbColor} This RGB color instance.
   */
  toRgb(): RgbColor {
    return this;
  }

  /**
   * Converts the RGB color to a Hexadecimal color.
   *
   * @returns {HexColor} An instance of HexColor representing the same  color in Hex format.
   */
  toHex(): HexColor {
    // Convert RGB to Hex format
    const hex = "#" + (1 << 24 | this.red << 16 | this.green << 8 | this.blue).toString(16).slice(1);

    return new HexColor(hex);
  }

  /**
   * Returns the string representation of the RGB color.
   *
   * @returns {string} The RGB color string, e.g., 'rgb(255, 0, 0)'.
   */
  toString(): string {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }

  /**
   * Clamps the RGB value to ensure it stays within the valid range (0-255).
   *
   * @param {number} value - The RGB component value.
   * @param {number} [min=0] - The minimum allowed value (default 0).
   * @param {number} [max=255] - The maximum allowed value (default 255).
   * @returns {number} The clamped value.
   */
  private clampValue(value: number, min: number = 0, max: number = 255): number {
    // Clamp the value between the min and max range
    return Math.max(min, Math.min(max, value));
  }
}
