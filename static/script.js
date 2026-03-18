

function toggleChat() {
    let box = document.getElementById("chatbox");
    box.style.display = box.style.display === "none" ? "block" : "none";
}

const input = document.getElementById("userInput");
const messages = document.getElementById("messages");

input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        let userText = input.value;
        messages.innerHTML += `<p><b>You:</b> ${userText}</p>`;

        fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userText })
        })
        .then(res => res.json())
        .then(data => {
            messages.innerHTML += `<p><b>Spider AI:</b> ${data.response}</p>`;
            messages.scrollTop = messages.scrollHeight;
        });

        input.value = "";
    }
});
