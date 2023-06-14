let songs = [
    { name: "Song 1", src: "./access/mp3/Omg - NewJeans.mp3" },
    { name: "Song 2", src: "./access/mp3/Cupid - 1818.mp3" },
    { name: "Song 3", src: "./access/mp3/Love - iKon.mp3" },
    { name: "Song 4", src: "./access/mp3/Hybe Boy - Newjeans.mp3" }
];
let isPlaying = false;
let songList = document.querySelectorAll("tr[data-song]");
let audio = document.getElementById("audioPlayer");
let inforMusic = document.querySelector(".infor-music");
let inforImg = inforMusic.querySelector(".img-infor");
let inforName = inforMusic.querySelector(".infor-music--name");
let inforNameMusican = inforMusic.querySelector(".infor-musican--name");
songList.forEach(function (row) {
    row.addEventListener("click", function () {
        var imgSong = row.querySelector(".song-img"); // Truy cập class con trong thẻ <td>
        var musicName = row.querySelector(".music-name"); // Truy cập class con trong thẻ <p>
        var nameMusican = row.querySelector(".musican-name"); // Truy cập class con trong thẻ <td>
        let songName = this.getAttribute("data-song");
        let selectedSong = songs.find(function (song) {
            return song.name === songName;
        });
        if (selectedSong) {
            audio.src = selectedSong.src;
            audio.play();
            isPlaying = true;
            checkPlay();
            inforImg.src = imgSong.src;
            inforName.textContent = musicName.textContent;
            inforNameMusican.textContent = nameMusican.textContent;

        }
    });
});
// play and stop
let play = document.querySelector(".main-control");
let iconPlay = document.querySelector(".fa-play");
let iconPause = document.querySelector(".fa-pause");
function checkPlay(){
    if (!isPlaying) {
        iconPause.classList.add('d-none');
        iconPlay.classList.remove('d-none');
    }
    else {
        iconPlay.classList.add('d-none');
        iconPause.classList.remove('d-none');
    }
}
play.addEventListener('click', function () {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        checkPlay();
    }
    else {
        audio.play();
        isPlaying = true;
        checkPlay();
    }
});
checkPlay();
// controls next

let currentSongIndex = 0;
let next = document.getElementById('next');
next.addEventListener('click', function () {
    currentSongIndex++;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    changeSong();
})
function changeSong() {
    const selectedSong = songs[currentSongIndex];
    if (selectedSong) {
        audio.src = selectedSong.src;
        audio.play();
        inforImg.src = imgSong.src;
        inforName.textContent = musicName.textContent;
        inforNameMusican.textContent = nameMusican.textContent;
    }
}
//   control
let volumeSlider = document.getElementById("volumeSlider");
let seekSlider = document.getElementById("musicSlider");
// Khi âm thanh được tải
audio.addEventListener("loadedmetadata", function () {
    // Cập nhật giá trị tối đa của seekSlider với thời lượng của âm thanh
    seekSlider.max = audio.duration;
});

audio.addEventListener("timeupdate", function () {
    // Cập nhật giá trị của seekSlider với thời gian phát hiện tại của âm thanh
    seekSlider.value = audio.currentTime;
});
// Khi seekSlider thay đổi giá trị
seekSlider.addEventListener("input", function () {
    // Cập nhật thời gian phát của âm thanh theo giá trị của seekSlider
    audio.currentTime = seekSlider.value;
});



// Khi volumeSlider thay đổi giá trị
volumeSlider.addEventListener("input", function () {
    // Cập nhật âm lượng của âm thanh theo giá trị của volumeSlider
    audio.volume = volumeSlider.value;
});
//   canvas
const canvas = document.getElementById('audioCanvas');
const ctx = canvas.getContext('2d');

// Khởi tạo ngữ cảnh âm thanh và đường dẫn âm thanh
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const audioSource = audioContext.createMediaElementSource(audio);

// Khởi tạo bộ phân tích âm thanh
const analyser = audioContext.createAnalyser();
analyser.fftSize = 256; // Kích thước FFT, ảnh hưởng đến độ chi tiết của phân tích

// Kết nối bộ phân tích âm thanh với nguồn âm thanh
audioSource.connect(analyser);
analyser.connect(audioContext.destination);

// Chuẩn bị các mảng để lưu trữ dữ liệu phân tích âm thanh
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// Vẽ các frame của âm thanh lên canvas
function draw() {
    requestAnimationFrame(draw);

    // Lấy dữ liệu phân tích âm thanh
    analyser.getByteFrequencyData(dataArray);

    // Xóa canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Vẽ các thanh âm thanh
    const barWidth = canvas.width / bufferLength;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2;

        ctx.fillStyle = 'rgb(' + (barHeight + 100) + ', ' + (barHeight + 100) + ', ' + (barHeight + 100) + ')';
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
    }
}

// Bắt đầu vẽ
draw();
// drop and drag
var draggableRows = Array.from(document.querySelectorAll('#sortable tr'));

draggableRows.forEach(function(row) {
  row.addEventListener('dragstart', handleDragStart);
  row.addEventListener('dragover', handleDragOver);
  row.addEventListener('dragend', handleDragEnd);
});

function handleDragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
  event.currentTarget.classList.add('dragging');
}

function handleDragOver(event) {
  event.preventDefault();
  var draggedElement = document.querySelector('.dragging');

  if (event.currentTarget.tagName !== 'TR') {
    return;
  }

  var afterElement = getDragAfterElement(event.clientY);
  var parent = event.currentTarget.parentNode;

  if (afterElement === null) {
    parent.appendChild(draggedElement);
  } else {
    parent.insertBefore(draggedElement, afterElement);
  }
}

function handleDragEnd(event) {
  event.currentTarget.classList.remove('dragging');
}
function getDragAfterElement(y) {
  var draggableElements = [...document.querySelectorAll('#sortable tr:not(.dragging)')];

  return draggableElements.reduce(function(closest, child) {
    var box = child.getBoundingClientRect();
    var offset = y - box.top - box.height / 2;

    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}
