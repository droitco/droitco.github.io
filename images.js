(function () {
  function asData(t) {
    t = String(t || "").replace(/\s+/g, "");
    if (t.indexOf("/9j/") === 0) return "data:image/jpeg;base64," + t;
    return null;
  }
  async function load(url) {
    try {
      var r = await fetch(url);
      if (!r.ok) return null;
      return asData(await r.text());
    } catch (e) {
      return null;
    }
  }
  document.querySelectorAll("img").forEach(function (img) {
    var src = img.getAttribute("src") || "";
    if (src.indexOf("img/") !== 0) return;
    load(src).then(function (data) {
      if (data) img.src = data;
    });
  });
  var hero = document.querySelector(".hero-photo");
  if (hero) {
    load("img/clearspace-aerial.jpg").then(function (data) {
      if (data) hero.style.backgroundImage = 'url("' + data + '")';
    });
  }
})();
