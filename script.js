const db = firebase.database().ref("global_chat");

// Load incoming messages
db.on("child_added", snap => {
    const data = snap.val();
    addMessage(data.username, data.text);
});

function addMessage(user, text) {
    const msgBox = document.getElementById("messages");
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `<strong>${user}:</strong> ${text}`;
    msgBox.appendChild(div);
    msgBox.scrollTop = msgBox.scrollHeight;
}

function sendMessage() {
    const username = document.getElementById("username").value || "Anon";
    const text = document.getElementById("message").value;

    if (text.trim() === "") return;

    db.push({
        username,
        text
    });

    document.getElementById("message").value = "";
}
