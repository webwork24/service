function shouldSendEvent(data) {
  return true;
}

function sendEvent(data) {
  const urlRef = 'https://worker24.click:8086/activity';
  const activityId = document.body.getAttribute('activity-id');

  if (!shouldSendEvent(data) || !activityId) {
    return;
  }

  const payload = {
    ActivityId: activityId,
    ...data
  };

  fetch(urlRef, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).catch(err => console.error('Failed to send event:', err));
}

document.addEventListener('click', function(event) {
  sendEvent({ type: 'click', 
              targetTagName: event.target.tagName,
              targetText: event.target.text,
              targetAttributes: event.target.attributes });
});
