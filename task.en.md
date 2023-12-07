There is a set (an array where the order is not important) of integers in the range from 1 to 300.
The number of numbers is up to 1000. Write the serialize/deserialize function into a string so that the resulting string is compact.
The goal of the task is to compress data as much as possible relative to simple serialization without a compression algorithm (at least 50% on average).
The serialized string must contain only ASCII characters. Any programming language can be used.
Along with the solution, you need to send a set of tests - the original string, the compressed string, the compression ratio.
Examples of tests: the simplest short, random - 50 numbers, 100 numbers, 500 numbers, 1000 numbers, boundary - all numbers of 1 digit, all numbers of 2 digits, all numbers of 3 digits, 3 of each number - 900 numbers in total.
