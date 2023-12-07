const minRange = 1;
const maxRange = 301;
class CompactSerializer {
  constructor() {
    this.charStart = 65;
    this.maxCharacters = 62;
  }

  serialize(numbers) {
    return numbers
      .map((num) => {
        let remainder = null;
        let multiplier = null;
        if (num >= 0 && num < this.maxCharacters) {
          return String.fromCharCode(this.charStart + num);
        } else {
          multiplier = Math.floor(num / this.maxCharacters);
          remainder = num % this.maxCharacters;
          return multiplier + String.fromCharCode(this.charStart + remainder);
        }
      })
      .join("");
  }

  deserialize(s) {
    let multiplier = "";
    const answer = [];
    s.split("").forEach((char) => {
      if (!isNaN(char)) {
        multiplier += char;
        return;
      } else if (multiplier !== "") {
        answer.push(
          this.maxCharacters * multiplier + char.charCodeAt() - this.charStart
        );
        multiplier = "";
        return;
      } else {
        multiplier = "";
        answer.push(char.charCodeAt() - this.charStart);
      }
    });
    return answer;
  }
}
const randomizer = (loverLimit, upperLimit, repeatCount = 0) => {
  const number = Math.floor(
    Math.random() * (upperLimit - loverLimit) + loverLimit
  );
  if (repeatCount) {
    const triplets = [];
    for (let i = 0; i < repeatCount; i++) {
      triplets.push(number);
    }
    return triplets;
  }
  return number;
};

const serializer = new CompactSerializer();

const testCases = [
  [1, 2, 3, 4, 5], // Simplest short
  Array.from({ length: 5 }, () => randomizer(minRange, maxRange)), // Random - 5 numbers
  Array.from({ length: 50 }, () => randomizer(minRange, maxRange)), // Random - 50 numbers
  Array.from({ length: 100 }, () => randomizer(minRange, maxRange)), // Random - 100 numbers
  Array.from({ length: 500 }, () => randomizer(minRange, maxRange)), // Random - 500 numbers
  Array.from({ length: 1000 }, () => randomizer(minRange, maxRange)), // Random - 1000 numbers
  Array.from({ length: 9 }, (_, i) => i + 1), // Boundary - All numbers of 1 digit
  Array.from({ length: 90 }, (_, i) => i + 10), // Boundary - All numbers of 2 digits
  Array.from({ length: 900 }, (_, i) => i + 100), // Boundary - All numbers of 3 digits
  Array.from({ length: 900 }, () => randomizer(minRange, maxRange, 3)).flat(), // 3 of each number - 900 numbers in total
];

testCases.forEach((originalSet) => {
  const compressedString = serializer.serialize(originalSet);
  const decompressedSet = serializer.deserialize(compressedString);
  const originalSize = JSON.stringify(originalSet).length;
  const compressedSize = compressedString.length;
  const compressionRatio =
    ((originalSize - compressedSize) / originalSize) * 100;

  console.dir(originalSet, { maxArrayLength: null });
  console.log("Serialized string:", compressedString);
  console.dir(decompressedSet, { maxArrayLength: null });
  console.log(`Compression Ratio: ${compressionRatio.toFixed(0)}%`);
});
