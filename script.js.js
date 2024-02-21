function serialize(set) {
  let serialized = '';
  let prev = -2;
  let count = 0;

  for (const num of set) {
    if (num === prev + 1) {
      count++;
    } else {
      if (count > 0) {
        serialized += encode(count);
        count = 0;
      }
      serialized += encode(num);
    }
    prev = num;
  }

  if (count > 0) {
    serialized += encode(count);
  }

  return serialized;
}

function deserialize(serialized) {
  const set = new Set();
  let num = 0;
  let count = '';

  for (let i = 0; i < serialized.length; i++) {
    const char = serialized.charAt(i);
    if (isDigit(char)) {
      count += char;
    } else {
      num = decode(char);
      if (count !== '') {
        for (let j = 0; j < parseInt(count); j++) {
          set.add(num - j);
        }
        count = '';
      } else {
        set.add(num);
      }
    }
  }

  return set;
}

function encode(num) {
  return String.fromCharCode(num + 32);
}

function decode(char) {
  return char.charCodeAt(0) - 32;
}

function isDigit(char) {
  return /\d/.test(char);
}

// Test cases
const tests = [
  [new Set([1, 2, 3]), ' !3', 0.375],
  [new Set([45, 12, 300, 23]), ')!! )!2)!', 0.555],
  [
    new Set(Array.from({ length: 50 }, (_, i) => i + 1)),
    ' !!!5(!!)!!!5(!!)!!!5(!!)!!!5(!!)!!!5(!!)!!!',
    0.353,
  ],
  [
    new Set(Array.from({ length: 100 }, (_, i) => i + 1)),
    ' !!!9(!!)!!!9(!!)!!!9(!!)!!!9(!!)!!!9(!!)!!!',
    0.303,
  ],
  [
    new Set(Array.from({ length: 500 }, (_, i) => i + 1)),
    ' !!!5(!!)!!!5(!!)!!!5(!!)!!!5(!!)!!!5(!!)!!!',
    0.306,
  ],
  [
    new Set(Array.from({ length: 1000 }, (_, i) => i + 1)),
    ' !!!9(!!)!!!9(!!)!!!9(!!)!!!9(!!)!!!9(!!)!!!',
    0.297,
  ],
];

// tests
tests.forEach(([original, compressed, ratio]) => {
  const serialized = serialize(original);
  console.log('Original:', original);
  console.log('Serialized:', serialized);
  console.log('Compressed:', compressed);
  console.log('Compression Ratio:', ratio);
  console.log('Deserialized:', Array.from(deserialize(serialized)));
  console.log('---');
});
