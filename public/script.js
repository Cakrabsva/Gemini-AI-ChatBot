const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage('user', userMessage);
  input.value = '';

  // Simulasi dummy balasan bot (placeholder)
  // setTimeout(() => {
  //   appendMessage('bot', 'Gemini is thinking... (this is dummy response)');
  // }, 1000);

  try {
    appendMessage('bot', 'Gemini is thinking...', true)
    const thinkingIndicator = chatBox.lastElementChild

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({prompt: userMessage})
    })

    if(thinkingIndicator && thinkingIndicator.classList.contains('AiThinking')) {
      thinkingIndicator.remove()
    }

    if(!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `HTTP error! status ${response.status}`)
    }
    const data = await response.json()

    if(data.output) {
      appendMessage('bot', data.output)

    } else {
      appendMessage('bot', 'Sorry, I could not get a response')
    }

  } catch (err) {
    console.log(err)
    const thinkingIndicator = chatBox.querySelector('.AiThinking')
    if (thinkingIndicator) {
      thinkingIndicator.remove()
    }
    appendMessage(`Error: ${err.message}`, 'error')
    }
});

function appendMessage(sender, dataOutput, isThinking = false) {
  // const msg = document.createElement('div');
  // msg.classList.add('message', sender);
  // if (isThinking) {
  //   msg.classList.add('thinking')
  // }
  // msg.textContent = text;
  // chatBox.appendChild(msg);
  // chatBox.scrollTop = chatBox.scrollHeight;
  const msg = document.createElement('div');
  if (isThinking) {
    msg.classList.add('AiThinking')
    setTimeout(() => {
      msg.innerHTML = `<div class="message ${sender} thinking">${dataOutput}</div>`
  }, 500);
    
  } else {
    msg.innerHTML = `<div class="message ${sender}">${dataOutput}</div>`
  }
  
  
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

