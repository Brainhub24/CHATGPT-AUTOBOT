/**
 * Sentinel.js Autobot - An Automated Button Clicker
 * Version: 1.0.0
 * Github: www.github.com/Brainhub24/CHATGPT-AUTOBOT
 *
 * DISCLAIMER:
 * This script is provided for educational purposes only and should be used responsibly.
 * Using automated scripts to interact with websites without proper authorization may violate
 * the website's terms of service and can lead to legal consequences. Before using this script,
 * ensure you have the necessary permissions from the website owner.
 *
 * NOTICE:
 * The 'Continue Generate' button may not be available in some countries or regions.
 * In some cases, it may still be available in certain countries.
 * Please join the OpenAI community to discuss this important feature:
 * https://community.openai.com/t/continue-generating-button-gone/310949
 *
 * Use this script at your own risk. The author and OpenAI are not responsible for any misuse,
 * damage, or legal issues caused by the use of this script.
 *
 * Learn more and join the OpenAI community: https://community.openai.com/
 */

// Initialize counter and pressedButtonsQty variables
let counter = 0;
let pressedButtonsQty = 0;

// Constants for Autobot configuration
const VERSION = "1.0.0";
const SCRIPT_NAME = "Sentinel.js - Autobot";
const BANNER_BACKGROUND_COLOR = "rgba(0, 0, 0, 0.6)";
const BANNER_TEXT_COLOR = "white";
const BANNER_FONT_FAMILY = "Arial, sans-serif";
const SCRIPT_NAME_FONT_SIZE = "18px";
const OTHER_TEXT_FONT_SIZE = "14px";
const BANNER_VERTICAL_POSITION = "30px";
const BANNER_HORIZONTAL_POSITION = "30px";
const BANNER_UPDATE_INTERVAL = 2000; // 2 seconds

const BANNER_TITLE = "Autobot Status";
const BANNER_CLICKED_TEXT = "Totally clicked:";
const BANNER_BUTTONS_TEXT = "Button";

// Function to check and click the target button automatically
function checkAndClickButton() {
  // HTML of the target button to find
  const targetButtonHtml = '<button class="btn relative btn-neutral border-0 md:border" as="button"><div class="flex w-full gap-2 items-center justify-center"><svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3 -rotate-180" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polygon points="11 19 2 12 11 5 11 19"></polygon><polygon points="22 19 13 12 22 5 22 19"></polygon></svg>Continue generating</div></button>';

  // Find all button elements in the document
  const buttons = document.getElementsByTagName('button');

  let clickedButton = null;
  // Loop through the buttons to find the target button
  for (const button of buttons) {
    if (button.outerHTML === targetButtonHtml) {
      // Check if the button has not been clicked already
      if (!button.dataset.clicked) {
        clickedButton = button;
        break;
      }
    }
  }

  if (clickedButton) {
    // Mark the button as clicked and trigger the click event
    clickedButton.dataset.clicked = true;
    clickedButton.click();
    counter++;
    pressedButtonsQty++;
    console.log('Button clicked automatically!');
    updateBanner(); // Update the banner to show the current status
  }
}

// Function to update the banner display
function updateBanner() {
  // Get the banner element or create a new one if it doesn't exist
  let banner = document.getElementById('autobot-banner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'autobot-banner';
    banner.style.position = 'fixed';
    banner.style.bottom = BANNER_VERTICAL_POSITION;
    banner.style.right = BANNER_HORIZONTAL_POSITION;
    banner.style.padding = '8px';
    banner.style.backgroundColor = BANNER_BACKGROUND_COLOR;
    banner.style.color = BANNER_TEXT_COLOR;
    banner.style.fontFamily = BANNER_FONT_FAMILY;
    banner.style.display = 'flex';
    banner.style.flexDirection = 'column';
    banner.style.alignItems = 'flex-end'; // Align top text to the right
    document.body.appendChild(banner);
  }

  // Create elements for the top and bottom text content
  const scriptNameText = `${SCRIPT_NAME} ${VERSION}`;
  const scriptNameElement = document.createElement('div');
  scriptNameElement.style.fontSize = SCRIPT_NAME_FONT_SIZE;
  scriptNameElement.textContent = scriptNameText;

  const clickedText = `${BANNER_CLICKED_TEXT} ${pressedButtonsQty} ${pluralize(BANNER_BUTTONS_TEXT, pressedButtonsQty)}`;
  const clickedElement = document.createElement('div');
  clickedElement.style.fontSize = OTHER_TEXT_FONT_SIZE;
  clickedElement.style.textAlign = 'center'; // Center bottom text
  clickedElement.textContent = clickedText;

  // Create a link to the GitHub repo
  const githubLink = document.createElement('a');
  githubLink.href = 'https://github.com/Brainhub24/CHATGPT-AUTOBOT';
  githubLink.textContent = 'GitHub Repo';
  githubLink.style.fontSize = OTHER_TEXT_FONT_SIZE;
  githubLink.style.textDecoration = 'none';
  githubLink.style.color = BANNER_TEXT_COLOR;
  githubLink.style.marginTop = '8px';

  // Clear existing content before updating the banner
  banner.innerHTML = '';
  // Append the elements to the banner
  banner.appendChild(scriptNameElement);
  banner.appendChild(clickedElement);
  banner.appendChild(githubLink);
}

// Function to pluralize a word based on the count
function pluralize(word, count) {
  return count === 1 ? word : `${word}s`;
}

// Execute the initial check for the target button
checkAndClickButton();

// Create an observer to listen for changes in the document body (to detect dynamically loaded buttons)
const observer = new MutationObserver(checkAndClickButton);
observer.observe(document.body, { childList: true, subtree: true });

// Update the banner periodically to reflect the current status
setInterval(updateBanner, BANNER_UPDATE_INTERVAL);
