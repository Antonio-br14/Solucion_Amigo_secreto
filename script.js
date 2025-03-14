let participants = [];
let assignments = {};

function addParticipant() {
    let name = document.getElementById("nameInput").value.trim();
    if (name && !participants.includes(name)) {
        participants.push(name);
        document.getElementById("participantsList").innerHTML += `<li>${name}</li>`;
        document.getElementById("nameInput").value = "";
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function assignSecretSanta() {
    if (participants.length < 2) {
        alert("Se necesitan al menos 2 participantes");
        return;
    }
    let shuffled = [...participants];
    shuffle(shuffled);
    for (let i = 0; i < participants.length; i++) {
        assignments[participants[i]] = shuffled[i];
    }
    displayResults();
}

function displayResults() {
    let resultList = document.getElementById("resultList");
    let resultsTitle = document.getElementById("resultsTitle");
    resultList.innerHTML = "";
    participants.forEach(name => {
        resultList.innerHTML += `<li onclick="reveal('${name}', this)">${name}</li>`;
    });
    resultList.classList.remove("hidden");
    resultsTitle.classList.remove("hidden");
}

function reveal(name, element) {
    let assignedName = assignments[name];
    showMessage(`${name}, tu amigo secreto es: ${assignedName}`);
    element.remove();
}

function showMessage(message) {
    let messageBox = document.getElementById("messageBox");
    messageBox.textContent = message;
    messageBox.classList.remove("hidden");
    setTimeout(() => {
        messageBox.classList.add("hidden");
    }, 3000);
}