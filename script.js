// ===== PROFILE DATA =====
const CryptoData = {
    userData: {
        name: "User",
        email: "User@gmail.com",
        avatar: null,
        status: "Premium Member"
    }
};

// ===== PROFILE FUNCTIONS =====
const Profile = {
    initialize() {
        const { name, email, avatar } = CryptoData.userData;
        const initial = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

        document.getElementById('profileName').textContent = name.split(' ')[0];

        const avatarContent = avatar ? `<img src="${avatar}" alt="${name}">` : initial;

        document.getElementById('profileAvatar').innerHTML = avatarContent;
        document.getElementById('userAvatarLarge').innerHTML = avatarContent;

        document.getElementById('userName').textContent = name;
        document.getElementById('userEmail').textContent = email;
    },

    setupDropdown() {
        const trigger = document.getElementById('profileTrigger');
        const dropdown = document.getElementById('profileDropdown');

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
            trigger.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!trigger.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
                trigger.classList.remove('active');
            }
        });
    }
};

// Load user from localStorage
function loadUserFromStorage() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        const user = JSON.parse(storedUser);
        Object.assign(CryptoData.userData, user);
        Profile.initialize();
    }
}

// Init on page load
document.addEventListener('DOMContentLoaded', () => {
    Profile.initialize();
    Profile.setupDropdown();
    loadUserFromStorage();
});
