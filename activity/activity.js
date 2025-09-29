function shouldSendEvent(data) {
  return true;
}

async function sendEvent(data) {
  const urlRef = 'https://worker24.click:8086/activity/save';
  const activityCode = document.getElementById("activityScript").getAttribute("activity-code");
  
  if (!shouldSendEvent(data) || !activityCode) {
    return;
  }

  const payload = {
    activityCode: activityCode,
    ...data
  };

  await fetch(urlRef, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).catch(err => console.error('Failed to send event:', err));
}

document.addEventListener('click', function(event) {
  const attr = new Map();
  for (var i = 0; i < event.target.attributes.length; i++) {
    attr.set(event.target.attributes[i].name, event.target.attributes[i].value);
  }
  sendEvent({ type: 'click', 
              targetTagName: event.target.tagName,
              targetText: event.target.text,
              targetClassName: event.target.className,
              targetAttributes: attr,
              targetBaseURI: event.target.baseURI,
              targetHost: event.target.host });
});
