(function() {
  function globalId(id) {
    return 'mmDotJsDotOrg_' + id;
  }

  function findElement(id) {
    return document.getElementById(globalId(id));
  }

  function createElement(tag, id, css) {
    var div = document.createElement(tag);
    div.id = globalId(id);
    div.style.cssText = css;
    return div;
  }

  function createDiv(id, css) {
    return createElement('div', id, css);
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
    document.body.appendChild(mask);

    let codeImgHost = createDiv('codeImgHost', `
      padding: 10px;
      box-sizing: border-box;
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

    tip = createElement('a', 'tip', `
      color: #ef64a3;
      font-size: 16px;
      cursor: pointer;
    `);
    tip.text = 'open image in new window';

    let codeImg = createDiv('codeImg', `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    `);

    codeImgHost.appendChild(tip);
    codeImgHost.appendChild(codeImg);
    mask.appendChild(codeImgHost);
  }

  function qrCodeUri() {
    return 'https://chart.googleapis.com/chart?chs=250x250&cht=qr&choe=UTF-8&chl='
      + window.encodeURIComponent(window.location.href);
  }

  function showCodeImg() {
    let subWindow = null;
    findElement('tip').onclick = () => {
      event.stopPropagation();
      subWindow = window.open(qrCodeUri(), 'subWindow', 'width=250,height=247');
    };

    let mask = findElement('mask');
    mask.onclick = function() {
      this.style.display = 'none';
      if (subWindow) {
        subWindow.close();
      }
    };

    let codeImg = findElement('codeImg');
    codeImg.title = window.location.href;
    codeImg.style.backgroundImage = `url(${qrCodeUri()})`;
    mask.style.display = 'block';
  }

  if (!findElement('mask')) {
    initView();
  }

  showCodeImg();
})();
