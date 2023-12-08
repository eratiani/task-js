const minRange: number = 1;
const maxRange: number = 301;
class CompactSerializer {
  charStart: number;
  maxCharacters: number;

  charStartIncrementer: number;
  constructor() {
    this.charStart = 65;
    this.maxCharacters = 62;
    this.charStartIncrementer = 32;
  }

  serialize(numbers: number[]) {
    return numbers
      .map((num) => {
        let remainder: null | number = null;
        let multiplier: null | number = null;
        if (num >= 0 && num < this.maxCharacters) {
          return String.fromCharCode(this.charStart + num);
        } else {
          multiplier = Math.floor(num / this.maxCharacters);
          remainder = num % this.maxCharacters;

          return (
            String.fromCharCode(multiplier + this.charStartIncrementer) +
            String.fromCharCode(this.charStart + remainder)
          );
        }
      })
      .join("");
  }

  deserialize(s: string) {
    let multiplier: string | number = "";
    const answer: number[] = [];
    s.split("").forEach((char: string) => {
      const charCode: number = char.charCodeAt(0);
      if (charCode < 65) {
        multiplier = `${multiplier}${charCode - this.charStartIncrementer}`;
        return;
      } else if (multiplier !== "") {
        answer.push(
          this.maxCharacters * Number(multiplier) +
            char.charCodeAt(0) -
            this.charStart
        );
        multiplier = "";
        return;
      } else {
        multiplier = "";
        answer.push(char.charCodeAt(0) - this.charStart);
      }
    });
    return answer;
  }
}
const randomizer = (
  loverLimit: number,
  upperLimit: number,
  repeatCount = 0
): number | number[] => {
  const number: number = Math.floor(
    Math.random() * (upperLimit - loverLimit) + loverLimit
  );
  if (repeatCount) {
    const triplets: number[] = [];
    for (let i = 0; i < repeatCount; i++) {
      triplets.push(number);
    }
    return triplets;
  }
  return number;
};

const serializer = new CompactSerializer();

const testCases: Array<number[]> = [
  [1, 2, 3, 4, 5], // Simplest short
  Array.from({ length: 5 }, () => randomizer(minRange, maxRange)) as number[], // Random - 5 numbers
  Array.from({ length: 50 }, () => randomizer(minRange, maxRange)) as number[], // Random - 50 numbers
  Array.from({ length: 100 }, () => randomizer(minRange, maxRange)) as number[], // Random - 100 numbers
  Array.from({ length: 500 }, () => randomizer(minRange, maxRange)) as number[], // Random - 500 numbers
  Array.from({ length: 1000 }, () =>
    randomizer(minRange, maxRange)
  ) as number[], // Random - 1000 numbers
  Array.from({ length: 9 }, (_, i) => i + 1), // Boundary - All numbers of 1 digit
  Array.from({ length: 90 }, (_, i) => i + 10), // Boundary - All numbers of 2 digits
  Array.from({ length: 900 }, (_, i) => i + 100), // Boundary - All numbers of 3 digits
  ([] as number[]).concat(
    ...Array.from({ length: 900 }, () => randomizer(minRange, maxRange, 3))
  ), // 3 of each number - 900 numbers in total
];

testCases.forEach((teseCase, i) => {
  const compressedString = serializer.serialize(teseCase);
  const decompressedSet = serializer.deserialize(compressedString);
  const originalSize = JSON.stringify(teseCase).length;
  const compressedSize = compressedString.length;
  const compressionRatio =
    ((originalSize - compressedSize) / originalSize) * 100;

  console.log("case number:", i, teseCase);
  console.log("Serialized string:", compressedString);
  console.dir(decompressedSet, { maxArrayLength: null });
  console.log(`Compression Ratio: ${compressionRatio.toFixed(0)}%`);
});
