var iframe = document.getElementById('myIframe');

iframe.addEventListener('load', function() {
  var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
  var iframeHeight = iframeDocument.documentElement.scrollHeight;
  iframe.style.height = iframeHeight + 'px';
});
