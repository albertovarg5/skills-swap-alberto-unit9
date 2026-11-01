
function filterSkillsByCategory(skills, category) {
  if (category === "all") {
    return skills;
  }

  return skills.filter(skill => skill.category === category);
}

function calculateTotalCosts(skills) {
  return skills.reduce((total, skill) => {
    return total + Number(skill.price);
  }, 0);
}

function matchSkillsToUser(skills, userInterests) {
  return skills.filter(skill => {
    return userInterests.includes(skill.category);
  });
}


const skillSwapFunctions = {
  filterSkillsByCategory,
  calculateTotalCosts,
  matchSkillsToUser
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = skillSwapFunctions;
}

if (typeof window !== "undefined") {
  window.skillSwapFunctions = skillSwapFunctions;
}

