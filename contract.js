  function goToCanvas() {
    document.body.innerHTML = `
      <div class="canvas">
        <img id="contractImage" src="assets/contract.png" onclick="swapImage()" />
      </div>
    `;
  }

  function popUp(){
    const canvas = document.querySelector(".canvas");


    const popup = document.createElement("div");
    popup.classList.add("popup");

  
    popup.innerHTML = `
      <h2>Contract Agreement</h2>
      <p>This agreement confirms the terms of the deal presented to you.</p>
      <ol>
        <li>term 1</li>
        <li>term 2</li>
        <li>term 3</li>
      </ol>
      <p>By continuing, you acknowledge that you have reviewed the conditions shown.</p>
      <br><br>
      <p><strong>Signature:</strong> ____________________</p>
    `;

    canvas.appendChild(popup);


    setTimeout(() => {
      popup.classList.add("active");
    }, 50);
  }

  function swapImage() {
    const img = document.getElementById("contractImage");
    img.src = "assets/presented.png";
    img.onclick = null;

    setTimeout(popUp, 300);
  }
