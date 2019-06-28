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
class Gauge {
    constructor(selector) {
        this.selector = selector;
    }

    initalizeGauge() {
        const $the = this;
        setInterval(function () {
            $the.changeNum();
        }, 2000);
    }

    changeNum() {
        const randomNum = Math.round(Math.random() * 100);
        const degrees = Math.round((randomNum / 100) * 180);
        const root = document.querySelector(":root");
        let container = document.querySelector(this.selector);
        let title = container.querySelector(".loader__title");
        let currentNumber = title.innerText;

        setInterval(function () {
            if (currentNumber < randomNum) {
                currentNumber++;
                title.innerText = currentNumber;
            } else if (currentNumber > randomNum) {
                currentNumber--;
                title.innerText = currentNumber;
            }
        }, 3);

        root.style.setProperty(`--rotation-${this.selector.replace('.', '')}`, `${degrees}deg`);
    };
}

class Meter {
    constructor(selector) {
        this.selector = selector;
        this.initialPosition = 0;
    }

    initialize() {
        const $the = this;
        setInterval(function () {
            $the.updatePosition();
        }, 1200);
    }

    updatePosition() {
        const container = document.querySelector(this.selector);
        const randomFactor = Math.floor(Math.random() * Math.floor(3)) * 2;
        let indicator = container.querySelector('.meter__indicator');
        let title = container.querySelector('.meter__title');

        if (this.initialPosition < 100) {
            this.initialPosition += randomFactor;
            title.innerText = this.initialPosition;
        } else if (this.initialPosition >= 100) {
            this.initialPosition = 0;
            title.innerText = this.initialPosition;
        }

        indicator.style.setProperty('left', `${this.initialPosition}%`);
    }
}


const gauge1 = new Gauge('.throttle');
const gauge2 = new Gauge('.gas');
const gauge3 = new Gauge('.oxygen');

// gauge1.initalizeGauge();
// gauge2.initalizeGauge();
// gauge3.initalizeGauge();

const meter1 = new Meter('.distance');
// meter1.initialize();


// throttle__tick
// gas__tick
// oxygen__tick
// meter__tick


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

document.getElementById("timeBtn").addEventListener("click", function(){
    alert(`Current time is ${(new Date()).toTimeString()}`);
});

document.getElementById("oxygenBtn").addEventListener("click", function(){
    alert(`Current oxygen level is critical`);
});

document.getElementById("fuelBtn").addEventListener("click", function(){
    alert(`Current fuel is enough for landing`);
});

document.getElementById("speedBtn").addEventListener("click", function(){
    alert(`Current speed is 2000KM/hour`);
});