document.getElementById("reset-session").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = tabs[0].url;

    if (!url || url.startsWith("chrome://") || url.startsWith("about://")) {
      alert("This extension cannot run on chrome:// or about:// pages.");
      return;
    }

    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: clearSessionData,
    });
  });
});

function clearSessionData() {
  document.cookie.split(";").forEach(cookie => {
    const [name] = cookie.split("=");
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  });

  sessionStorage.clear();

  localStorage.clear();

  location.reload();
}

