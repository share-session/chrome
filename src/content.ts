const loaded = false

function load() {
  if (loaded) {
    return
  }

  const url = "https://cdn.jsdelivr.net/gh/share-session/browser@1.3.0/dist/content.js?e=" + Date.now()

  const script = document.createElement("script")

  const id = "share-session"

  script.id = id
  script.src = url
  script.async = true;
  script.type = "text/javascript"
  script.setAttribute("language", "javascript");

  if (document.getElementById(id)) {
    return;
  }

  document.body.appendChild(script);
}

function tryLoad() {
  if (loaded) {
    return;
  }

  if (!document.body) {
    setTimeout(tryLoad, 1000)
    return
  }

  load();
}

tryLoad()
