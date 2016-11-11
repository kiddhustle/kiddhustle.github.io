if ('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('./sw.js')
           .then(function() { console.log('Service Worker Registered'); });
}


var audio_file = 'audio_locked_up_mini.mp3';
function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse(document.getElementById('endDate').getAttribute('datetime')));
initializeClock('clockdiv', deadline);
// audio
const AUDIO_FADE_OUT_THRESHOLD = 4;
const AUDIO_FADE_OUT_FREQ = 16;
const AUDIO_FADE_OUT_INTERVAL_SECS = 1/AUDIO_FADE_OUT_FREQ;
const AUDIO_FADE_OUT_INTERVAL_MILLISECS = AUDIO_FADE_OUT_INTERVAL_SECS * 1000;
const AUDIO_FADE_OUT_VOLUME_STEP = 1/(AUDIO_FADE_OUT_THRESHOLD * AUDIO_FADE_OUT_FREQ);
var fading = false;
var firstLoop = true;
function getSoundAndFadeAudio (audiosnippetId) {

    var sound = document.getElementById(audiosnippetId);

    // Set the point in playback that fadeout begins. This is for a 2 second fade out.
    var fadePoint = sound.duration - 2;

    var fadeAudio = setInterval(function () {

        // Only fade if past the fade out point or not at zero already
        if ((sound.currentTime >= fadePoint) && (sound.volume != 0.0)) {
            sound.volume -= 0.1;
        }
        // When volume at zero stop all the intervalling
        if (sound.volume === 0.0) {
            clearInterval(fadeAudio);
        }
    }, 200);

}

function audioFadeOut(sound) {

    // Set the point in playback that fadeout begins. This is for a 2 second fade out.
    var fadePoint = sound.duration - AUDIO_FADE_OUT_THRESHOLD;

    var fadeAudio = setInterval(function () {

        // Only fade if past the fade out point or not at zero already
        if ((sound.currentTime >= fadePoint) && (sound.volume != 0.0)) {
            sound.volume -= AUDIO_FADE_OUT_VOLUME_STEP;
        }
        // When volume at zero stop all the intervalling
        if (sound.volume === 0.0) {
            clearInterval(fadeAudio);
            fading = false;
        }
    }, AUDIO_FADE_OUT_INTERVAL_MILLISECS);

    fading = true;

}

function audioFadeIn(sound) {

    // Set the point in playback that fadeout begins. This is for a 2 second fade out.
    var fadePoint = AUDIO_FADE_OUT_THRESHOLD;

    var fadeAudioIn = setInterval(function () {

        // Only fade if past the fade out point or not at zero already
        if ((sound.currentTime <= fadePoint) && (sound.volume != 1.0)) {
            sound.volume += AUDIO_FADE_OUT_VOLUME_STEP;
        }
        // When volume at zero stop all the intervalling
        if (sound.volume >= 1) {
            clearInterval(fadeAudioIn);
            fading = false;
        }
    }, AUDIO_FADE_OUT_INTERVAL_MILLISECS);

    fading = true;

}

var startAudio = function(e){
  audio = new Audio(audio_file);
  // audio.loop = true;
  // var duration = audio.duration;

  // listeners
  audio.addEventListener('timeupdate', function(){
    // var
    console.log(audio.currentTime);
    if(fading == false && audio.currentTime >= (audio.duration - AUDIO_FADE_OUT_THRESHOLD)){
      audioFadeOut(audio);
      fading = true;
    }
    console.log('fading:', fading);
    console.log('volume:', audio.volume);
    console.log('duration:', audio.duration);
  });
  audio.addEventListener('ended', function(){
    console.log('ENDED');
    firstLoop = false;
    this.currentTime = 0;
    this.play();
  });
  audio.addEventListener('play', function(){
    console.log('PLAY');
    if(firstLoop === false && audio.volume === 0.0){
      audioFadeIn(audio);
    }
  });
  // audio.play();
}
var audio;
window.addEventListener('load', startAudio, false);
