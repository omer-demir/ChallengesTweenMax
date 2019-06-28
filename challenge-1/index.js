// Create Interplanetary Transport System Interface (ITSI).
// The in-flight interface can track the progress of the journey and other factors, like:
// Ships parameters    Fuel
//                     Throttle
//                     Speed
//                     Acceleration (G-force)

// Ships environment   Gravity
//                     Distance traveled
//                     Atmosphere
// Supplies            Food
//                     Water
// Metrics             Gravity converter
//                     Mars miles to earth miles converter
setTimeout(function () {
    TweenMax.to('#meter__tick', 20, {
        rotation: "360_cw",
        ease: Linear.easeNone,
        repeat: -1
    });
    TweenMax.to('#throttle__tick', 2, {
        rotation: "90_cw",
        ease: Linear.easeNone,
        repeat: -1
    });
    TweenMax.to('#gas__tick', 2, {
        rotation: "35_cw",
        ease: Linear.easeNone,
        repeat: -1
    });
    TweenMax.to('#oxygen__tick', 2, {
        rotation: "45_cw",
        ease: Linear.easeNone,
        repeat: -1
    });

}, 1000);

TweenMax.set('#meter__tick', {
    transformOrigin: "20% 78%"
});
TweenMax.set('#throttle__tick', {
    transformOrigin: "70% 60%"
});
TweenMax.set('#gas__tick', {
    transformOrigin: "20% 75%"
});
TweenMax.set('#oxygen__tick', {
    transformOrigin: "60% 80%"
});

document.getElementById("timeBtn").addEventListener("click", function () {
    alert(`Current time is ${(new Date()).toTimeString()}`);
});

document.getElementById("oxygenBtn").addEventListener("click", function () {
    alert(`Current oxygen level is critical`);
});

document.getElementById("fuelBtn").addEventListener("click", function () {
    alert(`Current fuel is enough for landing`);
});

document.getElementById("speedBtn").addEventListener("click", function () {
    alert(`Current speed is 2000KM/hour`);
});

document.getElementById('runSpaceTravel').addEventListener("click", function () {
    TweenLite.to('#space__travel', 10, { autoAlpha: 1, display: 'block' });
    TweenLite.from("#spaceship", 10, { scale: 0.3, ease: Circ.easeOut });
    TweenLite.to("#spaceship", 10, { x: 1720, opacity: 1, scale: 1.5, ease: Circ.easeOut });
});

