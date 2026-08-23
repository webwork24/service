document.addEventListener('DOMContentLoaded', async function() {
    const activityCode = document
        .getElementById("activityScript")
        .getAttribute("activity-code");

    if (!activityCode) {
        return;
    }

    const ipInfo = await getIpInfo();
    const userInfo = await getUserInfo(ipInfo);

    await sendEvent({
        type: 'page_open',
        targetBaseURI: window.location.href,
        targetHost: window.location.host,
        targetOrigin: window.location.origin,

        ip: userInfo.ip,
        region: userInfo.region,
        country: userInfo.country,
        countryCode: userInfo.country_code,
        city: userInfo.city,
        userAgent: userInfo.userAgent
    }, activityCode);
});

document.addEventListener('click', async function(event) {
  
  const activityCode = document.getElementById("activityScript").getAttribute("activity-code");
  if (!activityCode || !needSendEvent(event)) {
    return;
  }
  const ipInfo = await getIpInfo();
  const userInfo = await getUserInfo(ipInfo);
  
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
              userAgent: userInfo.userAgent}, activityCode);
});

function getAttr(event) {
  const attr = [];
  for (var i = 0; i < event.target.attributes.length; i++) {
    attr.push([event.target.attributes[i].name, event.target.attributes[i].value]);
  }
  return attr;
}

function sendEvent(data, activityCode) {

  const urlRef = 'https://activity.worker24.click/activity/save';
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

async function getIpInfo() {
  const response = await fetch('https://scvqvhrdhwo46okrnera2u7p7m0svkrs.lambda-url.eu-central-1.on.aws');
  const data = await response.json();

  const ipInfo = {
    ip: data.ip
  };

  console.log(ipInfo);
  return ipInfo;
}

async function getUserInfo(ipInfo) {
  const userAgent = navigator.userAgent;

  const response = await fetch(
    `https://activity.worker24.click/ipinfo?ip=${encodeURIComponent(ipInfo.ip)}`
  );
  const data = await response.json();

  const userInfo = {
    ip: data.ip,
    region: data.region,
    country: data.country_name,
    countryCode: data.country_code,
    city: data.city,
    userAgent: userAgent
  };

  console.log(userInfo);
  return userInfo;
}

function needSendEvent(event) {
  const activityScript = document.getElementById("activityScript");
  const activityAccess = activityScript.hasAttribute("activity-access") 
      ? activityScript.getAttribute("activity-access") 
      : "full access";  // "no access"
  const nodeWithRuleExcept = traverseToRoot(event.target);
  
  if (activityAccess == "no access") {
      return nodeWithRuleExcept.hasAttribute("activity-access-rule-exception")
          && nodeWithRuleExcept.getAttribute("activity-access-rule-exception") == "true" ? true : false;
  }
  return nodeWithRuleExcept.hasAttribute("activity-access-rule-exception")
      && nodeWithRuleExcept.getAttribute("activity-access-rule-exception") == "true" ? false : true;
}

function traverseToRoot(node) {
  let current = node;
  while (current.parentNode && current.parentNode.attributes) {
    console.log(current.nodeName);
    if (current.hasAttribute("activity-access-rule-exception")) {
        return current;
    }
    current = current.parentNode;
  }
  return current;
}
