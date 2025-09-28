function shouldSendEvent(data) {
  return true;
}

function sendEvent(data) {
  const urlRef = 'https://worker24.click:8086/activity/save';
  const activityCode = document.getElementById("activityScript").getAttribute("activity-code");
  
  if (!shouldSendEvent(data) || !activityCode) {
    return;
  }

  const payload = {
    ActivityCode: activityCode,
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
              targetClassName: event.target.className,
              targetAttributes: event.target.attributes,
              targetBaseURI: event.target.baseURI,
              targetHost: event.target.host });
});
