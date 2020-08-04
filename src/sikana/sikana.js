import slugify from 'slugify';

export function getSlug(title) {
  return slugify(title, { lower: true });
}

// Communication with Kolibri frontend:

export function goToContent(node) {
  console.log(`Go to: ${node.title}`);
  const nameSpace = 'customChannelPresentation';
  const event = 'goToContent';
  const data = node.id;
  const message = {
    event,
    data,
    nameSpace,
  };
  window.parent.postMessage(message, '*');
}

export function askChannelInformation(callback) {
  window.addEventListener('message', (event) => {
    // console.log(event);
    if (event.data.event && event.data.nameSpace === 'hashi'
              && event.data.event === 'sendChannelInformation') {
      callback(event.data.data);
    }
  });

  const nameSpace = 'customChannelPresentation';
  const event = 'askChannelInformation';
  const data = null;
  const message = {
    event,
    data,
    nameSpace,
  };
  window.parent.postMessage(message, '*');
}
