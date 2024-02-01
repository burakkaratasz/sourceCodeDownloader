document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('downloadButton').addEventListener('click', downloadPageSource);
});

function downloadPageSource() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var siteUrl = tabs[0].url;

    if (!siteUrl) {
      alert('Aktif sekmenin bir URL\'si yok.');
      return;
    }

    //fetch işlemi 
    fetch(siteUrl)
      .then(response => response.text())
      .then(pageSource => {
        var blob = new Blob([pageSource], { type: 'text/plain' });
        var downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `${new URL(siteUrl).href}-${Date.now()}.txt`;
        downloadLink.click();
      })
      .catch(error => {
        alert('Hata oluştu. Lütfen geçerli bir site adresi girin ve tekrar deneyin.');
        console.error(error);
      });
  });
}
