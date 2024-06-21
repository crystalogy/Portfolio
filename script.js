document.addEventListener("DOMContentLoaded", function () {
  const line1 = document.querySelector(".typewriter-line1");
  const line2 = document.querySelector(".typewriter-line2");

  // Calculate total typing time for line1
  const line1AnimationTime =
    parseFloat(getComputedStyle(line1).animationDuration) * 1000;
  const line1Delay = parseFloat(getComputedStyle(line1).animationDelay) * 1000;
  const totalLine1Time = line1AnimationTime + line1Delay;

  // Set initial state for line2 cursor to be transparent
  line2.style.borderRightColor = "transparent";

  // Set timeout to start line2 cursor animation after line1 finishes typing
  setTimeout(function () {
    line2.style.animation = "blinkTextCursor 500ms steps(44) infinite";
    line2.style.borderRightColor = "rgba(255, 255, 255, 0.75)"; // Make cursor visible
  }, totalLine1Time);

  let handleCopyClick = document.querySelector("#copy-email"); // Ensure this is the correct ID for your copy button

  if (handleCopyClick) {
    // Check if the element exists
    handleCopyClick.addEventListener("click", () => {
      navigator.clipboard.writeText("crystalramos.cmr@gmail.com").then(
        () => {
          alert(`Email copied to clipboard!\ncrystalramos.cmr@gmail.com`);
        },
        (err) => {
          console.error("Could not copy text: ", err);
        }
      );
    });
  }
});

// document.getElementById(
//   "messageDisplayElement"
// ).innerHTML = `Email copied to clipboard!<br>crystalramos.cmr@gmail.com`;
