
var earthHourElement = document.getElementById('hour');
var earthMinuteElement = document.getElementById('min');
var earthSecondElement = document.getElementById('sec');

var martianHourElement = document.getElementById('martian-hour');
var martianMinuteElement = document.getElementById('martian-min');
var martianSecondElement = document.getElementById('martian-sec');

var oneSecond = 60 / 60; // 1 second
var oneHour = 60 * 60; //1 hour tween
var twelveHours = 12 * 60 * 60; //12 hour tween
var tweenConfiguration = {
    rotation: "360",
    ease: Linear.easeNone,
    repeat: -1,
    paused: true
};
var initialPosition = {
    transformOrigin: "left 50%"
};

TweenMax.set("#sec, #hour, #min", initialPosition);

TweenMax.set("#martian-sec, #martian-hour, #martian-min", initialPosition);

var hourTween = TweenMax.to(earthHourElement, twelveHours, tweenConfiguration);
var minuteTween = TweenMax.to(earthMinuteElement, oneHour, tweenConfiguration);
var secondsTween = TweenMax.to(earthSecondElement, oneSecond, tweenConfiguration);

var martianHourTween = TweenMax.to(martianHourElement, twelveHours, tweenConfiguration);
var martianMinuteTween = TweenMax.to(martianMinuteElement, oneHour, tweenConfiguration);
var martianSecondsTween = TweenMax.to(martianSecondElement, oneSecond, tweenConfiguration);

function showTime() {
    var datetime = new Date();
    h = datetime.getUTCHours();
    m = datetime.getUTCMinutes();
    s = datetime.getUTCSeconds();

    minutesAsSeconds = m * 60;
    hoursAsSeconds = h * 60 * 60;
    secondsAsSeconds = s / 60;

    hourTween.progress(hoursAsSeconds / twelveHours);
    minuteTween.progress(minutesAsSeconds / oneHour);
    secondsTween.progress(secondsAsSeconds / oneSecond);

    document.querySelector('.earth__time-display').textContent = datetime.toTimeString().substring(0,8);
}

function showMarsTime() {
    var dateFromEarthDate = new MarsDate(new Date());

    minutesAsSeconds = dateFromEarthDate.json.MM * 60;
    hoursAsSeconds = dateFromEarthDate.json.HH * 60 * 60;
    secondsAsSeconds = dateFromEarthDate.json.ss / 60;

    martianHourTween.progress(hoursAsSeconds / twelveHours);
    martianMinuteTween.progress(minutesAsSeconds / oneHour);
    martianSecondsTween.progress(secondsAsSeconds / oneSecond);

    document.querySelector('.mars__time-display').textContent = `${dateFromEarthDate.json.HH}:${dateFromEarthDate.json.MM}:${dateFromEarthDate.json.ss}`;
}

showTime();
showMarsTime();

setInterval(function () {
    showTime();
}, 1000);

setInterval(function () {
    showMarsTime();
}, 1000);


function showAnimation() {
    // Total animation time (in seconds) to transition states
    var day_night_cycle_time = 15;

    // Time the animation stops before playing in reverse
    var animation_delay = day_night_cycle_time / 4;

    // Easing
    var animation_ease = Linear.easeNone;

    // Timeline Setups
    var animation_toNight = new TimelineMax({
        repeat: -1,
        yoyo: true,
        repeatDelay: animation_delay
    });

    var animation_water = new TimelineMax({
        repeat: -1,
        yoyo: true
    });

    var animation_cloud = new TimelineMax({
        repeat: -1,
        yoyo: true
    });

    var animation_stars = new TimelineMax({
        repeat: -1,
        yoyo: true
    });

    // Water Animation
    animation_water
        .to("#water", 2, { y: 12, morphSVG: "#water-2", ease: animation_ease }, 0, 0)
        ;

    // Cloud Animation
    animation_cloud
        .to("#cloud", 3, { x: -2, y: 1, scale: 0.95, rotation: 1, ease: animation_ease }, 0, 0)
        ;

    // Stars Animation
    animation_stars
        .to("#star-one", 0.5, { opacity: 0.5, ease: animation_ease }, 0, 0)
        .to("#star-two", 0.5, { opacity: 0.5, ease: animation_ease }, 1, 0)
        .to("#star-three", 0.5, { opacity: 0.5, ease: animation_ease }, .5, 0)
        .to("#star-four", 0.5, { opacity: 0.5, ease: animation_ease }, 1.5, 0)
        ;

    // Night Time Animation
    animation_toNight

        // Animate the Background Graident
        .staggerTo('#daytime-gradient stop', day_night_cycle_time, {
            cycle: {
                stopColor: ['#060414', '#416584']
            },
            ease: animation_ease,
        }, 0, 0)

        // Animate the Night Time Overlay
        .to('#nighttime-overlay', day_night_cycle_time, { opacity: 1, ease: animation_ease }, 0, 0)

        // Animate the Sun
        .to('#sun', day_night_cycle_time / 1.25, { scale: 0.9, attr: { cx: "753", cy: "697" }, ease: animation_ease }, 0, 0)

        // Animate the Moon
        .to('#moon', day_night_cycle_time / 2, { scale: 0.9, attr: { cx: "174.5", cy: "202.5" }, ease: animation_ease }, 0, 0)
        .to('#moon', day_night_cycle_time / 2, { scale: 0.9, attr: { cx: "410.5", cy: "114.5" }, ease: animation_ease }, day_night_cycle_time / 2, 0)

        // Animate the Stars
        .to('#stars', day_night_cycle_time / 2, { opacity: 1 }, day_night_cycle_time / 2, 0)
        .from("#stars", day_night_cycle_time - (day_night_cycle_time / 4), { y: 150, rotation: -15, ease: animation_ease }, day_night_cycle_time / 4, 0);
}

showAnimation();