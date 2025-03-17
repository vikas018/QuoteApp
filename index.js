async function fetchQuote() {
  const quoteElement = document.getElementById('quote')
  const authorElement = document.getElementById('author')

  quoteElement.textContent = 'Loading...'

  const QUOTE_URL = 'https://api.freeapi.app/api/v1/public/quotes/quote/random'

  try {
    const response = await fetch(QUOTE_URL);
    const resJSON = await response.json();
    quoteElement.textContent = resJSON.data.content
    authorElement.textContent = resJSON.data.author
  } catch (error) {
    console.error("Error fetching quote:", error);
  }
}

fetchQuote()

let currentBgImage = ""; // Store the image as a data URL

async function bgImgChange() {
  const imageUrl = `https://picsum.photos/1920/1080?random=${Math.random()}`;
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const reader = new FileReader();

    reader.onloadend = function () {
      currentBgImage = reader.result;
      document.querySelector(".container").style.backgroundImage = `url('${currentBgImage}')`;
    };

    reader.readAsDataURL(blob);
  } catch (error) {
    console.error("Error fetching image:", error);
  }
}

bgImgChange();

function copiedQuote() {
  const quote = document.getElementById('quote').textContent
  const author = document.getElementById('author').textContent
  return `${quote} - ${author}`
}

function shareOnTwitter() {
  const tweetText = copiedQuote()
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
  
  window.open(twitterUrl, "_blank");
}

function copyQuote() {
  navigator.clipboard.writeText(copiedQuote())
    .then(() => showToast('Quote Copied...!!!'))
    .catch(() => console.error('Error in copying text'))
}

function showToast(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
    notification.textContent = '';
  }, 2000);
}

function exportQuote() {
  const quoteSection = document.querySelector(".container");
  html2canvas(quoteSection, { scale: 2, useCORS: true })
  .then((canvas) => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/jpg");
    link.download = "quote.jpg";
    link.click();
  })
}
