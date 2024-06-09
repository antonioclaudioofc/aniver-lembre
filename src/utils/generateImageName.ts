function generateRandomSegment(length: number = 4): string {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

export function generateImageName(): string {
  const segments = [];
  for (let i = 0; i < 5; i++) {
    segments.push(generateRandomSegment());
  }
  return segments.join("-");
}