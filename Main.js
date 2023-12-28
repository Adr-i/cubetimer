const MOVES = ["U", "D", "R", "L", "F", "B", "U'", "D'", "R'", "L'", "F'", "B'", "U2", "D2", "R2", "L2", "F2", "B2"];
const CUBES = [];
let CURRENT_CUBE = "";
let MILLISECONDS = 0;
let SECONDS = 0;
let TIMER_ACTIVE = false;
let TIMER;
let START_TIME;
let FINISH_TIME;

function RandomInteger(Minimum, Maximum) {
    return Math.floor(Math.random() * (Maximum - Minimum + 1)) + Minimum;
}

document.querySelector("#cubeinput").addEventListener("keypress", function(e) {

    let element = document.querySelector("#cubeinput");

    var real = false;

    if (e.key === "Enter") {
      if (!CUBES[element.value]) {
        CUBES[element.value] = [];
        CUBES[element.value]["TIMES"] = [];

        if (CURRENT_CUBE == "") {
            CURRENT_CUBE = element.value;
        }

        real = true
        updateCubeSelector(element.value);
      }
    }

    if (real) {
        element.value = "";
    }
});

function updateCubeSelector(e) {
    let element = document.querySelector("#cubelist");
    let newOption = document.createElement("option");
    newOption.innerHTML = e;
    newOption.value = e;
    element.appendChild(newOption);
}

document.querySelector("#removeselectedcube").addEventListener("click", function() {
    let cubelist = document.querySelector("#cubelist");
    if (CURRENT_CUBE != "") {
        CUBES.splice(CUBES.indexOf(CURRENT_CUBE), 1);

        for (let i = 0; i < cubelist.children.length; i++) {
            if (cubelist.children[i].innerHTML == CURRENT_CUBE) {
                cubelist.children[i].remove();
            }
        }

        CURRENT_CUBE = "";

        document.querySelector("#a3").innerHTML = "Average of 3: ?";
        document.querySelector("#a5").innerHTML = "Average of 5: ?";
        document.querySelector("#a7").innerHTML = "Average of 7: ?";
        document.querySelector("#a10").innerHTML = "Average of 10: ?";
    }
})

function updateTime() {
    MILLISECONDS += 10;

    if (MILLISECONDS >= 1000) {
        SECONDS += 1;
        MILLISECONDS -= 1000;
    }

    document.querySelector("#time").innerHTML = ((Date.now() - START_TIME) / 1000) + " Seconds";
}

window.addEventListener("keypress", function(e) {
    if (e.key == " ") {
        if (CURRENT_CUBE != "") {
            if (TIMER_ACTIVE) {

                updateTime();
                clearInterval(TIMER);
                TIMER_ACTIVE = false;
                CUBES[CURRENT_CUBE]["TIMES"].unshift((Date.now() - START_TIME) / 1000)

                let newTimeElement = document.createElement("p");
                newTimeElement.innerHTML = ((Date.now() - START_TIME) / 1000) + " Seconds";
                document.querySelector(".times").insertBefore(newTimeElement, document.querySelector(".times").firstChild);

                if (document.querySelector(".times").children.length > 12) {
                    document.querySelector(".times").removeChild(document.querySelector(".times").lastChild);
                }

                MILLISECONDS = 0;
                SECONDS = 0;

                var tim = CUBES[CURRENT_CUBE]["TIMES"];

                if (CUBES[CURRENT_CUBE]["TIMES"].length >= 3) {
                    document.querySelector("#a3").innerHTML = "Average of 3: " + ((tim[0] + tim[1] + tim[2]) / 3).toFixed(3) + " Seconds";
                }
                if (CUBES[CURRENT_CUBE]["TIMES"].length >= 5) {
                    document.querySelector("#a5").innerHTML = "Average of 5: " + ((tim[0] + tim[1] + tim[2] + tim[3] + tim[4]) / 5).toFixed(3) + " Seconds";
                }
                if (CUBES[CURRENT_CUBE]["TIMES"].length >= 7) {
                    document.querySelector("#a7").innerHTML = "Average of 7: " + ((tim[0] + tim[1] + tim[2] + tim[3] + tim[4] + tim[5] + tim[6]) / 7).toFixed(3) + " Seconds";
                }
                if (CUBES[CURRENT_CUBE]["TIMES"].length >= 10) {
                    document.querySelector("#a10").innerHTML = "Average of 10: " + ((tim[0] + tim[1] + tim[2] + tim[3] + tim[4] + tim[5] + tim[6] + tim[7] + tim[8] + tim[9]) / 10).toFixed(3) + " Seconds";
                }

            } else {
                START_TIME = Date.now();
                TIMER = setInterval(updateTime, 10);
                TIMER_ACTIVE = true
            }
        }
    }
})

document.querySelector("#cubelist").addEventListener("change", function() {
    CURRENT_CUBE = document.querySelector("#cubelist").value;

    document.querySelector("#time").innerHTML = "0 Seconds";

    document.querySelector(".times").innerHTML = "";

    var tim = CUBES[CURRENT_CUBE]["TIMES"];

    for (let i = 0; i < 12; i++) {
        if (tim[11  -i]) {
            var newthing = document.createElement("p");
            newthing.innerHTML = tim[11-i] + " Seconds";
            document.querySelector(".times").appendChild(newthing);
        }
        
    }


    if (CUBES[CURRENT_CUBE]["TIMES"].length >= 3) {
        document.querySelector("#a3").innerHTML = "Average of 3: " + ((tim[0] + tim[1] + tim[2]) / 3).toFixed(3) + " Seconds";
    } else {
        document.querySelector("#a3").innerHTML = "Average of 3: ?";
    }
    if (CUBES[CURRENT_CUBE]["TIMES"].length >= 5) {
        document.querySelector("#a5").innerHTML = "Average of 5: " + ((tim[0] + tim[1] + tim[2] + tim[3] + tim[4]) / 5).toFixed(3) + " Seconds";
    } else {
        document.querySelector("#a5").innerHTML = "Average of 5: ?";
    }
    if (CUBES[CURRENT_CUBE]["TIMES"].length >= 7) {
        document.querySelector("#a7").innerHTML = "Average of 7: " + ((tim[0] + tim[1] + tim[2] + tim[3] + tim[4] + tim[5] + tim[6]) / 7).toFixed(3) + " Seconds";
    } else {
        document.querySelector("#a7").innerHTML = "Average of 7: ?";
    }
    if (CUBES[CURRENT_CUBE]["TIMES"].length >= 10) {
        document.querySelector("#a10").innerHTML = "Average of 10: " + ((tim[0] + tim[1] + tim[2] + tim[3] + tim[4] + tim[5] + tim[6] + tim[7] + tim[8] + tim[9]) / 10).toFixed(3) + " Seconds";
    } else {
        document.querySelector("#a10").innerHTML = "Average of 10: ?";
    }
});

document.querySelector("#scramblebtn").addEventListener("click", function() {
    var lastgen = "";
    var scramble = "";
    if (document.querySelector("#nummov").value > 0) {
        for (let i = 0; i < document.querySelector("#nummov").value; i++) {
            var gen = MOVES[RandomInteger(0, MOVES.length - 1)] + " ";


            if (i > 0) {
                if (lastgen == gen) {
                    while (lastgen == gen) {
                        gen = MOVES[RandomInteger(0, MOVES.length - 1)] + " ";
                    }
                }
                scramble += gen;
            } else {
                scramble += gen;
                lastgen = gen;
            }
        }
    }

    document.querySelector("#scramble").innerHTML = scramble;
})