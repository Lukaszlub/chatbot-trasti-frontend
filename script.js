document.addEventListener('DOMContentLoaded', function () {
  const chatWindow = document.getElementById('chat-window');
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');

  // Wyślij wiadomość po kliknięciu lub naciśnięciu Enter
  sendBtn.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage('user', message);
    userInput.value = '';
    userInput.focus();

    fetch("https://twoj-backend.onrender.com/ask", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question: message })
    })
      .then(response => response.json())
      .then(data => {
        const reply = data.answer || data.response || 'Brak odpowiedzi od bota.';
        appendMessage('bot', reply);
      })
      .catch(error => {
        console.error('Błąd podczas pobierania odpowiedzi:', error);
        appendMessage('bot', '⚠️ Wystąpił błąd po stronie serwera.');
      });
  }

  function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.innerText = text;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
});
