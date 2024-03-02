document.addEventListener('DOMContentLoaded', () => {
  displayUsers();
});

function createOrUpdateUser() {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const userId = Date.now().toString(); // Using timestamp as a simple unique identifier

  const user = {
    id: userId,
    name: nameInput.value,
    email: emailInput.value,
  };

  // Fetch existing users from localStorage
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

  // Check if user already exists
  const existingUserIndex = existingUsers.findIndex(u => u.id === userId);

  if (existingUserIndex !== -1) {
    // Update existing user
    existingUsers[existingUserIndex] = user;
  } else {
    // Create new user
    existingUsers.push(user);
  }

  // Save the updated user list to localStorage
  localStorage.setItem('users', JSON.stringify(existingUsers));

  // Clear form inputs
  nameInput.value = '';
  emailInput.value = '';

  // Refresh user list
  displayUsers();
}

function deleteUser(userId) {
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

  // Filter out the user to be deleted
  const updatedUsers = existingUsers.filter(user => user.id !== userId);

  // Save the updated user list to localStorage
  localStorage.setItem('users', JSON.stringify(updatedUsers));

  // Refresh user list
  displayUsers();
}

function displayUsers() {
  const userListElement = document.getElementById('userList');
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

  // Clear previous list items
  userListElement.innerHTML = '';

  // Display each user in the list
  existingUsers.forEach(user => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${user.name}</strong> (${user.email})
      <button onclick="editUser('${user.id}')">Edit</button>
      <button onclick="deleteUser('${user.id}')">Delete</button>
    `;
    userListElement.appendChild(listItem);
  });
}

function editUser(userId) {
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  const userToEdit = existingUsers.find(user => user.id === userId);

  if (userToEdit) {
    // Populate form with user data for editing
    document.getElementById('name').value = userToEdit.name;
    document.getElementById('email').value = userToEdit.email;
  }
}
