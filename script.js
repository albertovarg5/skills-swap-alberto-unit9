
console.log("Welcome to Skill Swap!");

let skills = [];

const skillsList = document.getElementById("skills-list");
const skillsStatus = document.getElementById("skills-status");
const categoryFilter = document.getElementById("category-filter");
const skillForm = document.getElementById("add-skill-form");
const formMessage = document.getElementById("form-message");

function renderSkills(items) {
  skillsList.replaceChildren();

  if (items.length === 0) {
    skillsStatus.textContent = "No skills found.";
    return;
  }

  skillsStatus.textContent = "";

  items.forEach(skill => {
    const card = document.createElement("article");
    card.className = "skill-card";

    const title = document.createElement("h3");
    title.textContent = skill.title;

    const category = document.createElement("p");
    category.textContent = `Category: ${skill.category}`;

    const price = document.createElement("p");
    price.textContent = `Price: $${Number(skill.price).toFixed(2)}`;

    const description = document.createElement("p");
    description.textContent = skill.description;

    card.append(title, category, price, description);
    skillsList.appendChild(card);
  });
}

function updateCategories() {
  const selected = categoryFilter.value;
  categoryFilter.replaceChildren(new Option("All Categories", "all"));

  const categories = [...new Set(skills.map(skill => skill.category))];

  categories.forEach(category => {
    categoryFilter.add(new Option(category, category));
  });

  if (categories.includes(selected)) {
    categoryFilter.value = selected;
  }
}


function filterDisplayedSkills() {
  const category = categoryFilter.value;

  const filtered = window.skillSwapFunctions
    .filterSkillsByCategory(skills, category);

  renderSkills(filtered);

  const total = window.skillSwapFunctions
    .calculateTotalCosts(filtered);

  const totalElement = document.getElementById("total-cost");

  if (totalElement) {
    totalElement.textContent = `Total Cost: $${total.toFixed(2)}`;
  }
}


async function loadSkills() {
  skillsStatus.textContent = "Loading skills...";

  try {
    const data = await window.apiService.fetchSkills();

    // Supports an array or a response containing a skills array.
    if (Array.isArray(data)) {
      skills = data;
    } else if (Array.isArray(data.skills)) {
      skills = data.skills;
    } else {
      throw new Error("Unexpected API response format");
    }

    updateCategories();
    filterDisplayedSkills();
  } catch (error) {
    skillsStatus.textContent = "Unable to load skills. Check the backend.";
    console.error(error);
  }
}

categoryFilter.addEventListener("change", filterDisplayedSkills);

skillForm.addEventListener("submit", async event => {
  event.preventDefault();

  const skillData = {
    title: document.getElementById("skill-title").value.trim(),
    category: document.getElementById("skill-category").value.trim(),
    price: Number(document.getElementById("skill-price").value),
    description: document.getElementById("skill-description").value.trim()
  };

  const submitButton = skillForm.querySelector("button[type='submit']");
  submitButton.disabled = true;
  formMessage.textContent = "Saving skill...";

  try {
    await window.apiService.createSkill(skillData);

    skillForm.reset();
    categoryFilter.value = "all";
    formMessage.textContent = "Skill added successfully!";

    await loadSkills();
  } catch (error) {
    formMessage.textContent = "Could not save skill. Please try again.";
    console.error(error);
  } finally {
    submitButton.disabled = false;
  }
});

loadSkills();

document.getElementById("match-skills-btn")
  .addEventListener("click", () => {

    const input = document.getElementById("user-interests").value;

    const interests = input
      .split(",")
      .map(interest => interest.trim())
      .filter(Boolean);

    const normalizedInterests = interests.map(interest =>
      interest.toLowerCase()
    );

    const normalizedSkills = skills.map(skill => ({
      ...skill,
      category: String(skill.category).toLowerCase()
    }));

    const matches = window.skillSwapFunctions.matchSkillsToUser(
      normalizedSkills,
      normalizedInterests
    );

    const results = document.getElementById("matching-results");
    const status = document.getElementById("match-status");

    results.replaceChildren();

    if (matches.length === 0) {
      status.textContent = "No matching skills found.";
      return;
    }

    status.textContent = `${matches.length} matching skill(s) found!`;

    matches.forEach(skill => {
      const card = document.createElement("article");
      const title = document.createElement("h3");
      const category = document.createElement("p");

      title.textContent = skill.title;
      category.textContent = `Category: ${skill.category}`;

      card.append(title, category);
      results.appendChild(card);
    });
  });

