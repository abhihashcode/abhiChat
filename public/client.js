const socket = io();
let userName;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message__area");

do {
  userName = prompt("Please Enter Your Name :");
} while (!userName);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    user: userName,
    message: message.trim(),
  };
  // console.log(message);
  //Append message
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollToBottom();

  //send to server
  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markup = `
      <h4>${msg.user}</h4>
      <p>${msg.message}</p>
    `;
  // console.log(msg.user);

  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

//Receive message

socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollToBottom();
});

//scroll to bottom

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
