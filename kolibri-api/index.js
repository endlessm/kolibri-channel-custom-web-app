// Communication with Kolibri frontend:

export async function getThumbnail(node) {
  return new Promise((resolve) => {
    window.addEventListener('message', function waitThumb(event) {
      if (event.data.event && event.data.nameSpace === 'hashi'
                && event.data.event === 'sendThumbnail'
                && event.data.data.id === node.id) {
        window.removeEventListener('message', waitThumb, false);
        resolve(event.data.data.thumbnail);
      }
    }, false);

    const nameSpace = 'customChannelPresentation';
    const event = 'getThumbnail';
    const data = node.id;
    const message = {
      event,
      data,
      nameSpace,
    };
    window.parent.postMessage(message, '*');
  });
}

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

export function askChannelInformation(callback, options = {}) {
  window.addEventListener('message', function waitInformation(event) {
    if (event.data.event && event.data.nameSpace === 'hashi'
              && event.data.event === 'sendChannelInformation') {
      window.removeEventListener('message', waitInformation, false);
      callback(event.data.data);
    }
  }, false);

  const nameSpace = 'customChannelPresentation';
  const event = 'askChannelInformation';
  const data = JSON.stringify(options);
  const message = {
    event,
    data,
    nameSpace,
  };
  window.parent.postMessage(message, '*');
}
