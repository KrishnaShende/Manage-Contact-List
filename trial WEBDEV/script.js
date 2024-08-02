document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const contactList = document.getElementById('contactList');
    const contactIdField = document.getElementById('contactId');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');

    let contacts = loadContacts();

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const contact = {
            id: contactIdField.value ? parseInt(contactIdField.value) : Date.now(),
            name: nameField.value,
            email: emailField.value,
            phone: phoneField.value
        };

        if (contactIdField.value) {
            contacts = contacts.map(c => c.id === contact.id ? contact : c);
        } else {
            contacts.push(contact);
        }

        saveContacts(contacts);
        renderContacts(contacts);
        contactForm.reset();
        contactIdField.value = '';
    });

    contactList.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit')) {
            const contactId = parseInt(event.target.dataset.id);
            const contact = contacts.find(c => c.id === contactId);

            contactIdField.value = contact.id;
            nameField.value = contact.name;
            emailField.value = contact.email;
            phoneField.value = contact.phone;
        }

        if (event.target.classList.contains('delete')) {
            const contactId = parseInt(event.target.dataset.id);
            contacts = contacts.filter(c => c.id !== contactId);

            saveContacts(contacts);
            renderContacts(contacts);
        }
    });

    function renderContacts(contacts) {
        contactList.innerHTML = '';
        contacts.forEach(contact => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${contact.name} - ${contact.email} - ${contact.phone}
                <div>
                    <button class="edit" data-id="${contact.id}">Edit</button>
                    <button class="delete" data-id="${contact.id}">Delete</button>
                </div>
            `;
            contactList.appendChild(li);
        });
    }

    function saveContacts(contacts) {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    function loadContacts() {
        const storedContacts = localStorage.getItem('contacts');
        return storedContacts ? JSON.parse(storedContacts) : [];
    }

    renderContacts(contacts);
});
