
const API_BASE_URL = 'http://localhost:3001/api';

async function fetchSkills() {
  try {
    const response = await fetch(`${API_BASE_URL}/skills`);

    if (!response.ok) {
      throw new Error('Failed to fetch skills');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching skills:', error);
    throw error;
  }
}

async function createSkill(skillData) {
  try {
    const response = await fetch(`${API_BASE_URL}/skills`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(skillData)
    });

    if (!response.ok) {
      throw new Error('Failed to create skill');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating skill:', error);
    throw error;
  }
}

window.apiService = { fetchSkills, createSkill };
