const userDropdown = document.getElementById('user-dropdown');
const albumList = document.getElementById('album-list');
const photoGallery = document.getElementById('photo-Gallery');

function createOption(value, text) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    return option;
}

function createAlbumItem(album) {
    const button = document.createElement('button');
    button.textContent = album.title;
    button.addEventListener('click', () => loadPhotos(album.id));
    return button;
}

async function loadUsers() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        users = await res.json();
        users.forEach(user => {
            userDropdown.appendChild(createOption(user.id, user.username));
        });
    }
    catch (err) {
        console.error('failed to load users', err);
    }
}

async function loadAlbums(userId) {
    albumList.innerHTML = '';
    photoGallery.innerHTML = '';
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
         albums = await res.json();
        albums.forEach(album => {
            albumList.appendChild(createAlbumItem(album));
            albumList.className="albums";
            
        })
    }
    catch (err) {
        console.error('unable to load albums ', err);
    }
}
async function loadPhotos(albumId) {
    photoGallery.innerHTML = '';
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
        const photos = await res.json();
        photos.forEach(photo => {
            const img = document.createElement('div');
            img.src = photo.thumbnailUrl;
            img.textContent = photo.title;
            img.className="image";
            img.style.padding='20px';
            photoGallery.appendChild(img);
        });
        const heading3= document.getElementById('heading3');
        let resultingObject=albums.find(albums=> albums.id==albumId);
        heading3.innerHTML=`Albums by ${resultingObject.title}`;
    }
    catch (err) {
        console.error('failed to load photos ', err);
    }
}

userDropdown.addEventListener('change', () => {
    const userId = userDropdown.value;
    if (userId){loadAlbums(userId);
        const heading2= document.getElementById('heading2');
        let resultingObject=users.find(users=> users.id==userId);
        heading2.innerHTML=`Albums by ${resultingObject.username}`;
    }


});

loadUsers();



