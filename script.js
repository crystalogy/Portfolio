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

window.addEventListener("DOMContentLoaded", () => {
  const ctl = new CollapsibleTimeline("#timeline");
});

class CollapsibleTimeline {
  constructor(el) {
    this.el = document.querySelector(el);

    this.init();
  }
  init() {
    this.el?.addEventListener("click", this.itemAction.bind(this));
  }
  animateItemAction(button, ctrld, contentHeight, shouldCollapse) {
    const expandedClass = "timeline__item-body--expanded";
    const animOptions = {
      duration: 300,
      easing: "cubic-bezier(0.65,0,0.35,1)",
    };

    if (shouldCollapse) {
      button.ariaExpanded = "false";
      ctrld.ariaHidden = "true";
      ctrld.classList.remove(expandedClass);
      animOptions.duration *= 2;
      this.animation = ctrld.animate(
        [
          { height: `${contentHeight}px` },
          { height: `${contentHeight}px` },
          { height: "0px" },
        ],
        animOptions
      );
    } else {
      button.ariaExpanded = "true";
      ctrld.ariaHidden = "false";
      ctrld.classList.add(expandedClass);
      this.animation = ctrld.animate(
        [{ height: "0px" }, { height: `${contentHeight}px` }],
        animOptions
      );
    }
  }
  itemAction(e) {
    const { target } = e;
    const action = target?.getAttribute("data-action");
    const item = target?.getAttribute("data-item");

    if (action) {
      const targetExpanded = action === "expand" ? "false" : "true";
      const buttons = Array.from(
        this.el?.querySelectorAll(`[aria-expanded="${targetExpanded}"]`)
      );
      const wasExpanded = action === "collapse";

      for (let button of buttons) {
        const buttonID = button.getAttribute("data-item");
        const ctrld = this.el?.querySelector(`#item${buttonID}-ctrld`);
        const contentHeight = ctrld.firstElementChild?.offsetHeight;

        this.animateItemAction(button, ctrld, contentHeight, wasExpanded);
      }
    } else if (item) {
      const button = this.el?.querySelector(`[data-item="${item}"]`);
      const expanded = button?.getAttribute("aria-expanded");

      if (!expanded) return;

      const wasExpanded = expanded === "true";
      const ctrld = this.el?.querySelector(`#item${item}-ctrld`);
      const contentHeight = ctrld.firstElementChild?.offsetHeight;

      this.animateItemAction(button, ctrld, contentHeight, wasExpanded);
    }
  }
}
