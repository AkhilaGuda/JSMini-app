const userDropdown = document.getElementById('user-dropdown');
const albumList = document.getElementById('album-list');
const photoGallery = document.getElementById('photo-Gallery');

const createOption = (value, text) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    return option;
}

const createAlbumItem = (album, albums) => {
    const button = document.createElement('button');
    button.textContent = album.title;
    button.addEventListener('click', () => loadPhotos(album.id, albums));
    return button;
}

const fetchUsers=async()=>{
    const res=await fetch('https://jsonplaceholder.typicode.com/users');
    return await res.json();
}

const loadUsers = async () => {
    try {
        const users=await fetchUsers();
        users.forEach(user => {
            userDropdown.appendChild(createOption(user.id, user.username));
        });
        userDropdown.addEventListener('change', () => {
            const userId = userDropdown.value;
            if (userId) {
                 loadAlbums(userId);
                let resultingObject = users.find(users => users.id == userId);
                const heading2 = document.getElementById('heading2');
                heading2.innerHTML = `Albums by ${resultingObject.username}`;
                const heading3 = document.getElementById('heading3');
                heading3.innerHTML = '';
            }


        });

    }
    catch (err) {
        console.error('failed to load users', err);
    }
}
const fetchAlbums=async(userId)=>{
    const res = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
        return await res.json();
}
const loadAlbums = async (userId) => {
    albumList.innerHTML = '';
    photoGallery.innerHTML = '';
    try {
        const albums=await fetchAlbums(userId);
        albums.forEach(album => {
            albumList.appendChild(createAlbumItem(album, albums));
            albumList.className = "albums";

        })
    }
    catch (err) {
        console.error('unable to load albums ', err);
    }
}
const loadPhotos = async (albumId, albums) => {
    photoGallery.innerHTML = '';
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
        const photos = await res.json();
        photos.forEach(photo => {
            const img = document.createElement('div');
            img.src = photo.thumbnailUrl;
            img.textContent = photo.title;
            img.className = "image";
            img.style.padding = '20px';
            photoGallery.appendChild(img);
        });
        const heading3 = document.getElementById('heading3');
        let resultingObject = albums.find(albums => albums.id == albumId);
        heading3.innerHTML = `Album photos: ${resultingObject.title}`;
    }
    catch (err) {
        console.error('failed to load photos ', err);
    }
}

loadUsers();



