window.initDownloadProgress = function initDownloadProgress() {
  let vscode;
  if(typeof acquireVsCodeApi != 'undefined') {
    vscode = window.vscode = acquireVsCodeApi();
  } else {
    vscode = window.vscode;
  }
  const downloadKiteContainer = document.querySelector('.download-kite');
  const progress = document.querySelector('progress');

  window.addEventListener('message', event => {
    const message = event.data; // The JSON data our extension sent
    switch (message.command) {
      case 'progress':
        const ratio = parseFloat(message.ratio);
        downloadKiteContainer.classList.toggle('hidden', ratio === -1 || ratio === 1);
        if (ratio !== -1) {
          progress.value = Math.round(ratio * 100);
        }
        break;
    }
  });
}

window.submitEvent = function(event) {
  let vscode;
  if(typeof acquireVsCodeApi != 'undefined') {
    vscode = window.vscode = acquireVsCodeApi();
  } else {
    vscode = window.vscode;
  }
  const form = document.querySelector('form');
  const fd = new FormData(form);
  const message = {command: 'event', event};

  for (let a of fd.entries()) {
    message[a[0]] = a[1];
  }

  vscode.postMessage(message);
}
