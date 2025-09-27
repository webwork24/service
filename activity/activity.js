function shouldSendEvent(data) {
  if (data.type === 'click' || data.type === 'keydown' || data.type === 'init') {
    return true;
  }
  return false;
}

function sendEvent(data) {
  const activityId = document.body.getAttribute('activity-id');

  if (!shouldSendEvent(data)) {
    return;
  }

  const payload = {
    ActivityId: activityId,
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
