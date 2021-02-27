let len = 0; //number of players
let difficulity = 0; //number of pairs
let k = 0, //current player
    tries,
    matches,
    allTries = 0,
    allMatches = 0,
    minute, hour, second,
    playersInfo, playersCount, parent,
    counter = 0;
let interval;
let allPlayers,
    matchCounter,
    tryCounter;
let showNames = false,
    goOn = true,
    turnedOne = true,
    realMatch = false,
    finished = false;

let randomNames = ["Pippi Langstrumpf", "Ash Ketchum", "Jake Long", "Andy Larkin",
    "Kim Possible", "Ron Stoppable", "Phineas Flynn", "Ferb Fletcher",
    "Patrick Star", "Spongebob Schwammkopf", "Thaddäus Tentakel",
    "Mickey Mouse", "Minnie Mouse", "Cornelius Fillmore", "Ingrid Third",
    "Bibi Blocksberg", "Tina Martin", "Alex von Falkenstein"
]; //default names for players
let openCards = new Array;
let newNames = new Array;
let playerObj = []; //contains all information of a player

//creates textfields for the names of the players
function playerNames(player) {
    this.player = player;
    player = document.info.player.value;
    if (player == "") {
        customAlertBox("Select a number of players!", "got it!");
    } else {
        document.getElementById("hidden").style.display = 'block';
        document.getElementById("names").innerHTML = "";

        switch (player) {
            case "onePlayer":
                len = 1;
                break;
            case "twoPlayer":
                len = 2;
                break;
            case "threePlayer":
                len = 3;
                break;
            case "fourPlayer":
                len = 4;
                break;
        }
        shuffle(randomNames);

        for (let i = 0; i < len; i++) {
            var playersName = document.createElement("INPUT");
            playersName.setAttribute("type", "text");
            playersName.setAttribute("name", "name");
            playersName.setAttribute("id", ("player_" + i));
            playersName.setAttribute("class", "playersName");
            playersName.setAttribute("value", randomNames[i]);

            document.getElementById("names").appendChild(playersName);
            document.getElementById("names").appendChild(document.createElement("BR"));
        }
        showNames = true;
        return len;
    }
}

//check gamesettings and start game
function startGame(player, difficulity) {
    this.player = player;
    this.difficulity = difficulity;
    difficulity = document.info.difficulity.value;
    player = document.info.player.value;
    if (showNames == true && difficulity >= 5) {
        timer();
        console.log("player:", player, "& pairs:", difficulity);
        console.log(playerObj);
        for (i = 0; i < len; i++) {
            if (document.getElementById(("player_") + i).value == "") {
                shuffle(randomNames);
                document.getElementById(("player_") + i).value = randomNames[i];
            }
            newNames[i] = document.getElementById(("player_" + i)).innerHTML;
            newNames[i] = document.getElementById(("player_" + i)).value;
            playerObj[i] = {
                name: document.getElementById(("player_" + i)).value,
                tries: 0,
                matches: 0,
            };
        }
        console.log(playerObj);
        playField(difficulity);
        document.getElementById("Timer").style.display = 'block';
        document.getElementById("matchTry").style.display = 'block';
        document.getElementById("info").style.display = 'none';
        document.getElementById("resetButton").style.display = 'block';
        document.getElementById("pic_title").style.display = 'none';

    } else if (showNames == false && difficulity >= 5) {
        customAlertBox("Press 'OK'!", "got it!");
    } else if (showNames == true && difficulity < 5) {
        customAlertBox("Set a number of pairs!", "got it!");
    } else {
        customAlertBox("Press 'OK' AND set a number of pairs!", "got it!");
    }
}

//start new game by resetting everything
function resetGame(player, difficulity, name) {
    this.player = player;
    this.difficulity = difficulity;
    this.playersName = name;

    showNames = false;
    player = "";
    difficulity = 0;
    allTries = 0;
    allMatches = 0;
    document.getElementById("memoryCards").style.backgroundColor = "rgb(240, 255, 210)";
    document.getElementById("names").innerHTML = "";
    document.getElementById("hidden").style.display = 'none';
    document.getElementById("memoryCards").innerHTML = "";
    document.getElementById("Timer").style.display = 'none';
    document.getElementById("Timer").innerHTML = "";
    document.getElementById("matchTry").style.display = 'none';
    document.getElementById("matchTry").innerHTML = "";
    document.getElementById("currentPlayer").innerHTML = "";
    document.getElementById("info").style.display = 'block';
    document.getElementById("resetButton").style.display = 'none';
    document.getElementById("pic_title").style.display = 'block';
    console.log("new game"); //everything is resetted
}

//creates playingfield
function playField(difficulity) {
    this.difficulity = difficulity;
    difficulity = document.info.difficulity.value;
    var allCards = new Array;
    var pictures = ["pictures/apfel.png", "pictures/auto.png", "pictures/barfuss.png", "pictures/blaetter.png", "pictures/blume.png",
        "pictures/blume2.png", "pictures/ente.png", "pictures/eule.png", "pictures/fliegenpilz.png", "pictures/frosch.png",
        "pictures/geschenk.png", "pictures/giesskanne.png", "pictures/haus.png", "pictures/herz.png", "pictures/katze.png",
        "pictures/marienkaefer.png", "pictures/regenbogen.png", "pictures/regenschirm.png", "pictures/schmetterling.png",
        "pictures/schneeflocke.png", "pictures/sonne.png", "pictures/stift.png", "pictures/tanne.png", "pictures/wolken.png",
        "pictures/wuerfel.png"
    ]; //used pictures
    var realPictures = shuffle(pictures);
    document.getElementById("memoryCards").style.backgroundColor = "rgb(218, 255, 145)";
    for (let j = 0; j < 2; j++) {
        for (let i = 0; i < difficulity; i++) {
            var cards = document.createElement("DIV");
            cards.addEventListener("click", turnAround);
            allCards[i] = cards;
            allCards[i].setAttribute("value", ("pic_" + i));
            allCards[i].setAttribute("class", "compare");
            document.getElementById("memoryCards").appendChild(allCards[i]);

            var flipCardBack = document.createElement("DIV");
            flipCardBack.setAttribute("class", "flipCardBack");
            var backSide = document.createElement("IMG");
            backSide.src = "pictures/back.png";
            backSide.setAttribute("class", "back");
            flipCardBack.appendChild(backSide);

            var flipCardFront = document.createElement("DIV");
            flipCardFront.setAttribute("class", "flipCardFront");
            var frontSide = document.createElement("IMG");
            frontSide.src = realPictures[i];
            frontSide.setAttribute("class", "front");
            frontSide.setAttribute("name", "front");
            flipCardFront.appendChild(frontSide);

            allCards[i].appendChild(flipCardBack);
            allCards[i].appendChild(flipCardFront);
        }
        shuffle(allCards);
        for (i = 0; i < allCards.length; i++) {
            document.getElementById("memoryCards").appendChild(allCards[i]);
        }
    }
    parent = document.getElementById("matchTry");
    tryCounter = document.createElement("DIV");
    tryCounter.setAttribute("id", "tryCounter");
    matchCounter = document.createElement("DIV");
    matchCounter.setAttribute("id", "matchCounter");
    allPlayers = document.createElement("DIV");
    allPlayers.setAttribute("id", "allPlayers");
    parent.appendChild(tryCounter);
    parent.appendChild(matchCounter);
    parent.appendChild(allPlayers);
}

//shuffle elements of an array
function shuffle(arr) {
    let arrLen = arr.length;
    let temp;
    let index;

    while (arrLen > 0) {
        index = Math.floor(Math.random() * arrLen);
        arrLen--;
        temp = arr[arrLen];
        arr[arrLen] = arr[index];
        arr[index] = temp;
    }
    return arr;
}

//turn cards around by clicking on them
function turnAround(event) {
    openCards[counter] = event.currentTarget;
    var showFront = event.currentTarget.querySelector(".front");
    var hideBack = event.currentTarget.querySelector(".back");
    hideBack.style.display = 'none';
    showFront.style.animationName = 'flipCard';
    showFront.style.animationDuration = '600ms';
    showFront.style.display = 'inline';
    counter++;
    if (counter == 1) {
        openCards[0].querySelector(".front").style.pointerEvents = 'none';
        turnedOne = true;
    } else if (counter == 2) {
        document.getElementById("memoryCards").style.pointerEvents = 'none';
        var firstCard = openCards[0].querySelector(".front").src;
        var secondCard = openCards[1].querySelector(".front").src;
        match(firstCard, secondCard);
        counter = 0;
    }
    whoPlays(newNames, turnedOne);
    tryCounter.innerHTML = "Total tries: " + allTries;
    matchCounter.innerHTML = "Matches found: " + allMatches + "/" + document.info.difficulity.value;
    aboutPlayers();
    console.log("matches:", allMatches, " & tries:", allTries);
    gameOver(allMatches, difficulity, allTries);
}

//check if selected cards match
function match(firstCard, secondCard) {
    if (firstCard == secondCard) {
        openCards[0].querySelector(".front").style.pointerEvents = 'none';
        openCards[1].querySelector(".front").style.pointerEvents = 'none';
        openCards[0].querySelector(".front").style.opacity = 0.7;
        openCards[1].querySelector(".front").style.opacity = 0.7;
        allMatches++;
        turnedOne = true;
        realMatch = true;
        setTimeout(function() {
            document.getElementById("memoryCards").style.pointerEvents = 'auto';
        }, 2000);
        return turnedOne, realMatch, allMatches;
    } else {
        setTimeout(function() {
            for (let i = 0; i < openCards.length; i++) {
                openCards[i].querySelector(".front").style.display = 'none';
                openCards[i].querySelector(".back").style.animationName = 'flipCard';
                openCards[i].querySelector(".back").style.animationDuration = '600ms';
                openCards[i].querySelector(".back").style.display = 'inline';
            }
            document.getElementById("memoryCards").style.pointerEvents = 'auto';
        }, 2000);
        allTries++;
        turnedOne = false;
        realMatch = false;
        return turnedOne, realMatch, allTries;
    }

}

//show current player and save information in related object
function whoPlays(newNames, turnedOne) {
    this.newNames = newNames;
    this.turnedOne = turnedOne;
    let currentPlayer = newNames[k];
    if (turnedOne == true) {
        currentPlayer = newNames[k];
        if (realMatch == true) {
            playerObj[k].matches = playerObj[k].matches + 1;
            realMatch = false;
        }
    } else if (turnedOne == false) {
        playerObj[k].tries = playerObj[k].tries + 1;
        k = k + 1;
        currentPlayer = newNames[k];
    }
    if (k == newNames.length) {
        k = 0;
        currentPlayer = newNames[k];
    }
    setTimeout(function() {
        document.getElementById("currentPlayer").innerHTML = "current player: " + currentPlayer;
    }, 2000);
}

//show information about current player
function aboutPlayers() {
    allPlayers.innerHTML = "";
    allPlayers.style.border = '0.03em solid black';
    Object.keys(playerObj).forEach(key => {
        playersInfo = document.createElement("DIV");
        playersInfo.setAttribute("class", "nameInfo");
        allPlayers.appendChild(playersInfo);
        playersInfo.innerHTML = playerObj[key].name + ": " +
            "tries: " + playerObj[key].tries + " matches: " + playerObj[key].matches;
    })
}

//check if all matches are found; show winner, etc.
function gameOver(allMatches, difficulity, allTries) {
    this.allMatches = allMatches;
    this.difficulity = difficulity;
    difficulity = document.info.difficulity.value;
    this.allTries = allTries;
    console.log(playerObj);
    var mostMatches = 0,
        winner;
    if (allMatches == difficulity) {
        for (let i = 0; i < len; i++) {
            if (playerObj[i].matches >= mostMatches) {
                mostMatches = playerObj[i].matches;
                winner = playerObj[i].name;
            }
        }
        clearInterval(interval);
        finished = true;
        let confirmBoxMessage = "GAME OVER!" + '<br>' + '<br>' + "Congratulations " + winner + "!" + '<br>' + winner + " got " +
            mostMatches + " matches." + '<br>' + '<br>' + "Total tries: " + allTries + '<br>' +
            "Time: " + hour + ":" + minute + ":" + second;
        customAlertBox(confirmBoxMessage, "new game");
    }
}

//timecounter for game
function timer() {
    minute = 00;
    second = 00;
    hour = 00;
    interval = setInterval(function() {
        if (hour > 0) {
            if (hour < 10) {
                if (minute < 10) {
                    document.getElementById("Timer").innerHTML = "Playtime: 0" + hour + ":0" + minute + ":" + second;
                    if (second < 10) {
                        document.getElementById("Timer").innerHTML = "Playtime: 0" + hour + ":0" + minute + ":0" + second;
                    }
                } else if (second < 10) {
                    document.getElementById("Timer").innerHTML = "Playtime: " + minute + ":0" + second;
                }
            } else {
                if (minute < 10) {
                    document.getElementById("Timer").innerHTML = "Playtime: 0" + hour + ":0" + minute + ":" + second;
                    if (second < 10) {
                        document.getElementById("Timer").innerHTML = "Playtime: 0" + hour + ":0" + minute + ":0" + second;
                    }
                } else if (second < 10) {
                    document.getElementById("Timer").innerHTML = "Playtime: " + minute + ":0" + second;
                }
            }

        } else {
            if (minute < 10) {
                document.getElementById("Timer").innerHTML = "Playtime: 0" + minute + ":" + second;
                if (second < 10) {
                    document.getElementById("Timer").innerHTML = "Playtime: 0" + minute + ":0" + second;
                }
            } else if (second < 10) {
                document.getElementById("Timer").innerHTML = "Playtime: " + minute + ":0" + second;
            }
        }
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}

//like a normal alert-box but much more individual
function customAlertBox(message, buttonText) {
    this.message = message;
    this.buttonText = buttonText;
    let confirmBox = document.getElementById("confirmBox");
    let boxMessage = document.getElementById("boxMessage");
    let boxButton = document.getElementById("boxButton");
    boxMessage.innerHTML = message;
    boxButton.value = buttonText;

    confirmBox.style.display = 'block';
    confirmBox.style.zIndex = '1';

    boxButton.addEventListener("click", function() {
        confirmBox.style.display = 'none';
        confirmBox.style.zIndex = '2';
        if (finished == true) {
            setTimeout(function() {
                resetGame(player, difficulity, name);
                finished = false;
            }, 2200);
        }
    });
}