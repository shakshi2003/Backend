const apiUrl = 'http://localhost:3000/api';
let token = '';

async function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    const response = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        alert('User registered successfully!');
    } else {
        alert('Registration failed');
    }
}

async function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        const data = await response.json();
        token = data.token;
        document.getElementById('item-management').style.display = 'block';
        alert('Login successful!');
    } else {
        alert('Login failed');
    }
}

async function fetchItems() {
    const response = await fetch(`${apiUrl}/items`, {
        headers: { 'Authorization': `Bearer ${token} `}
    });

    if (response.ok) {
        const items = await response.json();
        const itemsList = document.getElementById('items-list');
        itemsList.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ${item.description}` (`Rating: ${item.rating}`);
            itemsList.appendChild(li);
        });
    } else {
        alert('Failed to fetch items');
    }
}

async function addItem() {
    const name = document.getElementById('item-name').value;
    const description = document.getElementById('item-description').value;

    const response = await fetch(`${apiUrl}/admin/item`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, description })
    });

    if (response.ok) {
        alert('Item added successfully!');
        fetchItems();
    } else {
        alert('Failed to add item');
    }
}