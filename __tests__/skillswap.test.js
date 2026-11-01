
const {
  filterSkillsByCategory,
  calculateTotalCosts,
  matchSkillsToUser
} = require("../skillswap-functions");

const skills = [
  { title: "Guitar", category: "Music", price: 20 },
  { title: "JavaScript", category: "Technology", price: 30 },
  { title: "Piano", category: "Music", price: 25 }
];

describe("Skill Swap Functions", () => {

  test("filterSkillsByCategory filters skills correctly", () => {
    const result = filterSkillsByCategory(skills, "Music");

    expect(result).toHaveLength(2);
    expect(result[0].title).toBe("Guitar");
    expect(result[1].title).toBe("Piano");
  });

  test("calculateTotalCosts calculates the total price", () => {
    const result = calculateTotalCosts(skills);

    expect(result).toBe(75);
  });

  test("matchSkillsToUser matches user interests", () => {
    const result = matchSkillsToUser(skills, ["Technology"]);

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("JavaScript");
  });

});
