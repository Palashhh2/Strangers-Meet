export function scoreCompatibility(a: any, b: any) {
  let score = 0;
  if (a.diet === b.diet) score += 2;

  const aInterests = a.interests.toLowerCase().split(", ");
  const bInterests = b.interests.toLowerCase().split(", ");

  for (let i of aInterests) {
    if (bInterests.includes(i)) score += 1;
  }

  return score;
}
