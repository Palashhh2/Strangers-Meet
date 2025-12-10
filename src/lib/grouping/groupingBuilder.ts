import { scoreCompatibility } from "@/app/api/utils/scoring";

export function buildGroups(applicants: any[]) {
  try {
    const groups: any[] = [];
    const clone = [...applicants];

    while (clone.length > 0) {
      const group = [clone.shift()];

      clone.sort((a, b) => {
        return scoreCompatibility(group[0], b) - scoreCompatibility(group[0], a);
      });

      while (group.length < 6 && clone.length > 0) {
        group.push(clone.shift());
      }

      groups.push(group);
    }

    return groups;
  } catch (error) {
    console.error("Error building groups:", error);
    return [];
  }
}
