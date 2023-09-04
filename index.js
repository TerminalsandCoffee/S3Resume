const counter = document.querySelector(".counter-number");

async function updateCounter() {
    let response = await fetch("https://cqt4whz43svt2po7xpt7k3zoni0ortbr.lambda-url.us-east-1.on.aws/");
    let data = await response.json();
    counter.innerHTML = `Views: ${data}`;
}

updateCounter();
