const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img'),
    volumeSlider = document.getElementById('volume-slider'),
    volumeIcon = document.getElementById('volume-icon');

const music = new Audio();

const songs = [
    {
        path: 'Assets/Without Me Audio.mp3',
        displayName: 'Without Me',
        cover: 'Assets/Without Me Cover Image.jpg',
        artist: 'Eminem',
    },
    {
        path: 'Assets/Maharani Audio.mp3',
        displayName: 'Maharani',
        cover: 'Assets/Maharani Cover Image.jpg',
        artist: 'Arpit Bala, Karun, Lambo Drive, GHILDIYAL',
    },
    {
        path: 'Assets/Ik Kudi Audio.mp3',
        displayName: 'Ik Kudi',
        cover: 'Assets/Ik Kudi Cover Image.jpg',
        artist: 'Arpit Bala, wolf.cryman',
    },
    {
        path: 'Assets/Wavy Audio.mp3',
        displayName: 'Wavy',
        cover: 'Assets/WavyCover Image.jpg',
        artist: 'Karan Aujla, Jay Trak',
    },
    {
        path: 'Assets/Superman Audio.mp3',
        displayName: 'Superman',
        cover: 'Assets/Superman Cover Image.jpg',
        artist: 'Eminem',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

music.volume = volumeSlider.value;

volumeSlider.addEventListener('input', (e) => {
    music.volume = e.target.value;
    updateVolumeIcon(music.volume);
});

volumeIcon.addEventListener('click', () => {
    if (music.volume > 0) {
        music.volume = 0;
        volumeSlider.value = 0;
    } else {
        music.volume = 1;
        volumeSlider.value = 1;
    }
    updateVolumeIcon(music.volume);
});

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

updateVolumeIcon(music.volume);
loadMusic(songs[musicIndex]);