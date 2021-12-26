const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const video = $('.video');
const stateVideo = $('.state');
const player_time = $('.player__time');

const player__progress = $('.player__progress');
const progress__filled = $('.progress__filled');
console.log(progress__filled);

const skipButtons = $$('[data-skip]');
const volume = $('.volume input');
video.onloadedmetadata = () => {
   // function ... ?
   player_time.innerText = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;

   function togglePlay() {
      if (video.paused) {
         video.play();
         stateVideo.innerHTML = "<i class='bx bx-pause'></i>";
         console.log('play');
      }
      else {
         video.pause();
         stateVideo.innerHTML = "<i class='bx bx-play'></i>";
         console.log('pause');
      }
   }
   function handleProgress() {
      const percent = video.currentTime / video.duration;
      progress__filled.style.width = `${percent * 100}%`;

      player_time.innerText = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
   }
   function formatTime(time) {
      let minutes = Math.floor(time / 60);
      let seconds = Math.floor(time - minutes * 60);

      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      return minutes + ' : ' + seconds;

   }
   let isSeek = false;
   function seek(event) {
      if (isSeek) {
         const seekTime = event.offsetX / player__progress.offsetWidth;
         video.currentTime = seekTime * video.duration;
         handleProgress();
      }
   }

   skipButtons.forEach((button) => {
      button.addEventListener('click', function () {
         video.currentTime += +this.dataset.skip;
      })
   })
   // event listener
   video.addEventListener('click', togglePlay);
   stateVideo.addEventListener('click', togglePlay);
   video.addEventListener('timeupdate', handleProgress);
   player__progress.addEventListener('mousedown', function () {
      isSeek = true;
      seek(event);
   });
   player__progress.addEventListener('mousemove', seek);
   player__progress.addEventListener('mouseup', () => { isSeek = false });
   volume.addEventListener('change', function () { video.volume = this.value });

}
