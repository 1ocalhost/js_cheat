(function() {
  function globalId(id) {
    return 'mmDotJsDotOrg_' + id;
  }

  function findDiv(id) {
    return document.getElementById(globalId(id));
  }

  function createDiv(id, css) {
    var div = document.createElement('div');
    div.id = globalId(id);
    div.style.cssText = css;
    return div;
  }

  function initView() {
    let mask = createDiv('mask', `
      display: none;
      background: rgba(0, 0, 0, 0.5);
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: 2147483646;
    `);
    mask.onclick = function() {
      this.style.display = 'none';
    };
    document.body.appendChild(mask);

    let codeImg = createDiv('codeImg', `
      position: fixed;
      width: 250px;
      height: 250px;
      top: 50%;
      left: 50%;
      margin-left: -125px;
      margin-top: -125px;
      background: #333;
      border-radius: 2px;
      z-index: 2147483647;
    `);
    mask.appendChild(codeImg);
  }

  function showCodeImg() {
    let qrCodeUrl = "https://chart.googleapis.com/chart?chs=250x250&cht=qr&choe=UTF-8&chl="
      + window.encodeURIComponent(window.location.href);

    let mask = findDiv('mask');
    let codeImg = findDiv('codeImg');
    codeImg.title = window.location.href;
    codeImg.style.backgroundImage = 'url(' + qrCodeUrl + ')';
    mask.style.display = 'block';
  }

  if (!findDiv('mask')) {
    initView();
  }

  showCodeImg();
})();
