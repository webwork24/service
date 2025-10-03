document.addEventListener('click', function(event) {
  sendEvent({ type: 'click', 
              targetTagName: event.target.tagName,
              targetText: event.target.text,
              targetClassName: event.target.className,
              targetAttributes: getAttr(event),
              targetBaseURI: event.target.baseURI,
              targetHost: event.target.host,
              targetOuterHTML: event.target.outerHTML,
              targetOuterText: event.target.outerText,
              targetOrigin: event.target.origin });
});

function getAttr(event) {
  const attr = [];
  for (var i = 0; i < event.target.attributes.length; i++) {
    arry.push([event.target.attributes[i].name, event.target.attributes[i].value]);
  }
  return attr;
}

function sendEvent(data) {
  const urlRef = 'https://worker24.click:8086/activity/save';
  const activityCode = document.getElementById("activityScript").getAttribute("activity-code");
  if (!activityCode) {
    return;
  }
  const payload = {
    activityCode: activityCode,
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
