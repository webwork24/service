document.addEventListener('click', async function(event) {
  const userInfo = await getUserInfo();
  await sendEvent({ type: 'click', 
              targetTagName: event.target.tagName,
              targetText: event.target.text,
              targetClassName: event.target.className,
              targetAttributes: await getAttr(event),
              targetBaseURI: event.target.baseURI,
              targetHost: event.target.host,
              targetOuterHTML: event.target.outerHTML,
              targetOuterText: event.target.outerText,
              targetOrigin: event.target.origin,
              ip: userInfo.ip,
              region: userInfo.region,
              country: userInfo.country,
              countryCode: userInfo.country_code,
              city: userInfo.city,
              userAgent: userInfo.userAgent});
});

async function getAttr(event) {
  const attr = [];
  for (var i = 0; i < event.target.attributes.length; i++) {
    attr.push([event.target.attributes[i].name, event.target.attributes[i].value]);
  }
  return attr;
}

async function sendEvent(data) {
  console.log(data);
  const urlRef = 'https://worker24.click:8086/activity/save';
  const activityCode = document.getElementById("activityScript").getAttribute("activity-code");
  if (!activityCode || !shouldSendEvent(data)) {
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

async function getUserInfo() {
  const userAgent = navigator.userAgent;

  const response = await fetch('https://ipwho.is/');
  const data = await response.json();

  const userInfo = {
    ip: data.ip,
    region: data.region,
    country: data.country,
    countryCode: data.country_code,
    city: data.city,
    userAgent: userAgent
  };

  console.log(userInfo);
  return userInfo;
}

async function shouldSendEvent(data) {
  return true;
}
