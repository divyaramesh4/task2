const audioPlayer = document.getElementById('audio-player');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const volumeControl = document.getElementById('volume');
const playlistElement = document.getElementById('playlist');
const searchInput = document.getElementById('search');

const songs = [
    { title: 'Song 1', src: 'song1.mp3' },
    { title: 'Song 2', src: 'song2.mp3' },
    { title: 'Song 3', src: 'song3.mp3' },
];

let currentSongIndex = 0;

// Load the playlist
function loadPlaylist() {
    playlistElement.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = song.title;
        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong();
            playSong();
        });
        playlistElement.appendChild(li);
    });
}

// Load the selected song
function loadSong() {
    audioPlayer.src = songs[currentSongIndex].src;
}

// Play the song
function playSong() {
    audioPlayer.play();
    playButton.textContent = '⏸';
}

// Pause the song
function pauseSong() {
    audioPlayer.pause();
    playButton.textContent = '▶️';
}

// Handle play/pause button
playButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

// Handle next button
nextButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong();
    playSong();
});

// Handle previous button
prevButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong();
    playSong();
});

// Handle volume control
volumeControl.addEventListener('input', () => {
    audioPlayer.volume = volumeControl.value;
});

// Handle search
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredSongs = songs.filter(song =>
        song.title.toLowerCase().includes(searchTerm)
    );
    playlistElement.innerHTML = '';
    filteredSongs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = song.title;
        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong();
            playSong();
        });
        playlistElement.appendChild(li);
    });
});

// Initial load
loadPlaylist();
loadSong();
