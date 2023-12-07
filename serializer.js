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

// Example Usage:
const serializer = new CompactSerializer();

// Test cases
const testCases = [
  [1, 2, 3, 4, 5], // Simplest short
  [34, 12, 256, 89, 150], // Random - 5 numbers
  Array.from({ length: 50 }, (_, i) => i + 1), // Random - 50 numbers
  Array.from({ length: 100 }, (_, i) => i + 1), // Random - 100 numbers
  Array.from({ length: 500 }, (_, i) => i + 1), // Random - 500 numbers
  Array.from({ length: 1000 }, (_, i) => i + 1), // Random - 1000 numbers
  Array.from({ length: 9 }, (_, i) => i + 1), // Boundary - All numbers of 1 digit
  Array.from({ length: 90 }, (_, i) => i + 10), // Boundary - All numbers of 2 digits
  Array.from({ length: 200 }, (_, i) => i + 100), // Boundary - All numbers of 3 digits
  Array.from({ length: 300 }, (_, i) => (i % 300) + 1).flat(), // 3 of each number - 900 numbers in total
];

testCases.forEach((originalSet) => {
  const compressedString = serializer.serialize(originalSet);
  const decompressedSet = serializer.deserialize(compressedString);
  const originalSize = JSON.stringify(originalSet).length;
  const compressedSize = compressedString.length;
  const compressionRatio =
    ((originalSize - compressedSize) / originalSize) * 100;

  console.log("Original set:", originalSet);
  console.log("Serialized string:", compressedString);
  console.log("Deserialized set:", decompressedSet);
  console.log(
    `Compression Ratio: ${compressionRatio.toFixed(0)}%`,
    compressedSize,
    originalSize
  );
});
