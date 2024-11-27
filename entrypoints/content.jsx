import React from "react";
import ReactDOM from "react-dom/client";
import FloatingButton from "./FloatingButton.jsx";

const urlPattern = new MatchPattern('*://*.x.com/home');
let ui = null;

// Function to handle UI mounting and unmounting
const showUi = (ctx, mount) => {
  if (mount) {
    if (!ui) { // Only mount if not already mounted
      ui = createIntegratedUi(ctx, {
        position: 'inline',
        anchor: 'body',

        onMount: (container) => {
          const root = ReactDOM.createRoot(container);
          root.render(<FloatingButton />);
          return root;
        },

        onRemove: (root) => {
          root.unmount();
        },
      });
      ui.mount();
    }
  } else {
    // Unmount the UI only if it's mounted
    if (ui) {
      ui.remove();
      ui = null;
    }
  }
};

export default defineContentScript({
  matches: ['*://*.x.com/*'],

  main(ctx) {
    console.log("FollowFlow is now activated!")
    // Initially show the button on x.com/home (it's a tweak for Single page applications)
    if(urlPattern.includes(window.location.href)){
      showUi(ctx, true);
    }

    // Event listener to hide or show button on url change
    ctx.addEventListener(window, 'wxt:locationchange', ({ newUrl }) => {
      if (!urlPattern.includes(newUrl)) {
        // Hide the button for other pages of x.com
        showUi(ctx, false);
        console.log('Not on x.com/home, Floating button will not be loaded.');
      } else {
        // Again show the button on navigating x.com/home
        showUi(ctx, true);
      }
    });
  }
});
