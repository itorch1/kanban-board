export function convertStars(starsNum) {
  // 10673 > 10.7K
  if (starsNum < 1000) return starsNum;

  const K = Math.floor(starsNum / 1000);
  const remainder = starsNum % 1000;
  const remRounded = Math.round(remainder / 100);
  return `${K}.${remRounded}K`;
}
