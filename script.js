// import marked from 'marked';

function startNewConversation() {
    const requestOptions = {
        method: 'GET',
        headers: {
            "Authorization": "Bearer ragflow-JkYjZjZjZhNzBiYzExZWZhYmQ4MDI0Mm",
            "Accept": "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
        },
    };



    const apiUrl = 'https://1a70-140-113-113-65.ngrok-free.app/v1/';
    const url = apiUrl + 'api/new_conversation/';
    showLoading();
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const conversationId = data.data.id;
            console.log('New conversation started:', data.data.id);

            // Store the conversation ID for future use
            sessionStorage.setItem('conversation_id', conversationId);

            // Enable the input fields
            document.getElementById('user-input').disabled = false;
            document.querySelector('.chat-input button').disabled = false;
            displayMessage('bot', data.data.message[0].content);
            hideLoading();
        })
        .catch(error => { console.error('Error:', error); hideLoading(); });
}


function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === "") return;

    const conversationId = sessionStorage.getItem('conversation_id');

    const payload = {
        conversation_id: conversationId,
        messages: [{ role: "user", content: userInput }],
        stream: false
    };

    displayMessage('user', userInput);
    document.getElementById('user-input').value = "";
    const apiUrl = 'https://1a70-140-113-113-65.ngrok-free.app/v1/';
    const url = apiUrl + 'api/completion/';
    console.log(JSON.stringify(payload));
    showLoading();

    fetch(url, {
        method: 'POST',
        headers: {
            "Authorization": "Bearer ragflow-JkYjZjZjZhNzBiYzExZWZhYmQ4MDI0Mm",
            "Accept": "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const botResponse = data.data.answer;
            console.log(botResponse);
            displayMessage('bot', botResponse);
            // Clear the input field

            hideLoading();
        })
        .catch(error => { console.error('Error:', error); hideLoading(); });
}


function displayMessage(sender, message) {
    const chatWindow = document.getElementById('chat-window');
    const messageElement = document.createElement('p');
    const formattedText = message
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Replace **text** with <strong>
        .replace(/\n/g, '<br>'); // Replace \n with <br> for line breaks
    messageElement.innerHTML = formattedText;
    messageElement.classList.add(sender === 'bot' ? 'bot-message' : 'user-message');
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Function to show the loader
function showLoading() {
    document.getElementById('loading-indicator').classList.remove('hidden');
}

// Function to hide the loader
function hideLoading() {
    document.getElementById('loading-indicator').classList.add('hidden');
}
