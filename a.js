function initializeContent() {
  giftContainer.style = "display:none";
  instructionText.style = "display:none";
  mainContent.style = "opacity:1;margin-top:0";
  backgroundBlur.style = "opacity:.7";
  wallpaper.style = "transform: scale(1.5);";
}

async function startGreeting() {
  backgroundBlur.style = "opacity:0";
  wallpaper.style = "transform: scale(1);";
  sticker1.style = "display:inline-flex;";
  setTimeout(showSticker, 200);
  setTimeout(displayGreeting, 500);
}

function showSticker() {
  if (currentSticker == 0) { sticker1.src = defaultSticker; }
  if (currentSticker == 1) { sticker1.src = sticker2.src; }
  if (currentSticker == 2) { sticker1.src = sticker3.src; }
  if (currentSticker == 3) { sticker1.src = sticker4.src; }
  if (currentSticker == 4) { sticker1.src = sticker5.src; }
  sticker1.style = "display:inline-flex;opacity:1;transform:scale(1)";
}

function hideSticker() {
  sticker1.style = "display:inline-flex;opacity:1;transition:all .7s ease;transform:scale(.1)";
}

function animateSticker() {
  sticker1.style.animation = "rto .8s infinite alternate";
}

function showMessageBox() {
  messageBox.style = "position:relative;opacity:1;visibility:visible;transform: scale(1);margin-top:0";
  startTypingMainMessage();
  functionState = 1;
}

function hideMessageBox() {
  wallpaper.style = "transform: scale(2);";
  backgroundBlur.style = "opacity:.3";
  messageBox.style = "position:relative;transition:all .7s ease;";
}

function displayGreeting() {
  new TypeIt("#greetingText", {
    strings: ["" + greetingMessage],
    startDelay: 50,
    speed: 40,
    waitUntilVisible: true,
    afterComplete: function () {
      greetingText.innerHTML = greetingMessage;
      setTimeout(showMessageBox, 200);
    },
  }).go();
}

function showActionButton() {
  wallpaper.style = "transform: scale(1);";
  actionButton.style = "opacity:1;transform: scale(1);";
  functionState = 1;
}

document.getElementById("nextButton").onclick = function() {
  if (functionState == 1) { askQuestion(); }
  if (functionState == 2) { proceedToNext(); }
}

async function proceedToNext(){
  await sweetAlertConfirm.fire('Yay!', 'And here comes another birthday surprise for you!', 'success');
  window.location = "./love/index.html";
}

mainMessageText = mainMessage.innerHTML;
mainMessage.innerHTML = "";
function startTypingMainMessage(){
  new TypeIt("#mainMessage", {
    strings: ["" + mainMessageText],
    startDelay: 400,
    speed: 20,
    cursor: false,
    deleteSpeed: 20,
    breakLines: false,
    waitUntilVisible: true,
    lifelike: true,
    afterComplete: function(){
      activateContinuePrompt();
    },
  }).go();
}

continueClickCount = 0;
continueCheckState = 0;
defaultContinueText = continuePrompt.innerHTML;
document.getElementById("messageBox").onclick = function() {
  if (continueClickCount == 1) {
    if (continueCheckState == 1) { setTimeout(showMessage1, 400); }
    if (continueCheckState == 2) { startTypingMessage3(); }
    if (continueCheckState == 3) { startTypingMessage4(); }
    if (continueCheckState == 4) { startTypingMessage5(); }
    if (continueCheckState == 5) { displayGreeting2(); }
    autoTransition();
    continuePrompt.style.opacity = "0";
    continueClickCount = 0;
  }
}

function activateContinuePrompt() {
  continuePrompt.innerHTML = defaultContinueText;
  continuePrompt.style.opacity = ".8";
  continueClickCount = 1;
  continueCheckState += 1;
}

function changeContinuePrompt() {
  continuePrompt.innerHTML = "[ Tap one of the birthday icons! ]";
  continuePrompt.style.opacity = ".8";
}

function autoTransition() {
  mainMessage.style = "opacity:0";
  setTimeout(continueTransition, 400);
}

function continueTransition() {
  mainMessage.style = "opacity:1";
}

function showMessage1() {
  mainMessage.innerHTML = message1.innerHTML;
  iconCollection.style = "position:relative;opacity:1;transform:scale(1);";
}

message2Text = message2.innerHTML;
message3Text = message3.innerHTML;
function showMessage2(){
  wallpaper.style = "transform: scale(1.5);";
  iconCollection.style = "";
  mainMessage.innerHTML = "";
  new TypeIt("#mainMessage", {
    strings: ["" + message2Text, "" + message3Text],
    startDelay: 20,
    speed: 30,
    cursor: true,
    deleteSpeed: 30,
    breakLines: false,
    waitUntilVisible: true,
    lifelike: true,
    afterComplete: function(){
      mainMessage.innerHTML = message3Text;
      setTimeout(showMessage4, 700);
    },
  }).go();
}

message4Text = message4.innerHTML;
message4.innerHTML = "";
function showMessage4(){
  wallpaper.style = "transform: scale(1);";
  hideSticker();
  currentSticker = 2;
  setTimeout(showSticker, 300);
  new TypeIt("#message4", {
    strings: ["" + message4Text],
    startDelay: 1,
    speed: 52,
    cursor: true,
    waitUntilVisible: true,
    lifelike: true,
    afterComplete: function(){
      message4.innerHTML = message4Text;
      setTimeout(showMessage5, 700);
    },
  }).go();
}

message5Text = message5.innerHTML;
message5.innerHTML = "";
function showMessage5(){
  wallpaper.style = "transform: scale(1.5);";
  hideSticker();
  currentSticker = 3;
  setTimeout(showSticker, 300);
  new TypeIt("#message5", {
    strings: ["" + message5Text],
    startDelay: 1,
    speed: 52,
    cursor: true,
    waitUntilVisible: true,
    lifelike: true,
    afterComplete: function(){
      message5.innerHTML = message5Text + " 😊";
      setTimeout(showMessage6, 700);
    },
  }).go();
}

message6Text = message6.innerHTML;
message6.innerHTML = "";
function showMessage6(){
  wallpaper.style = "transform: scale(1);";
  hideSticker();
  currentSticker = 4;
  setTimeout(showSticker, 300);
  new TypeIt("#message6", {
    strings: ["" + message6Text],
    startDelay: 1,
    speed: 52,
    cursor: true,
    waitUntilVisible: true,
    lifelike: true,
    afterComplete: function(){
      message6.innerHTML = message6Text;
      setTimeout(showActionButton, 400);
    },
  }).go();
}

var iconClickCount = 0;
document.getElementById("icon1").onclick = function() { icon1.style = "opacity:0"; iconClickCount += 1; this.onclick = null; checkIconClicks(); }
document.getElementById("icon2").onclick = function() { icon2.style = "opacity:0"; iconClickCount += 1; this.onclick = null; checkIconClicks(); }
document.getElementById("icon3").onclick = function() { icon3.style = "opacity:0"; iconClickCount += 1; this.onclick = null; checkIconClicks(); }
document.getElementById("icon4").onclick = function() { icon4.style = "opacity:0"; iconClickCount += 1; this.onclick = null; checkIconClicks(); }

function checkIconClicks() {
  if (iconClickCount == 4) {
    iconCollection.style = "position:relative;transform:scale(1)";
    hideSticker();
    currentSticker = 1;
    setTimeout(showSticker, 300);
    autoTransition();
    setTimeout(showMessage2, 400);
  }
}