import {copyKey, type CopyMessages} from "./copy";
// Interactive UI needs only this small subset; case-study prose stays on the server.
export const clientCopy = [
  "Home", "About", "Projects", "Speaking", "Writing", "Book", "Resume", "Contact",
  "Primary navigation", "Language", "Mobile navigation", "Menu", "SKatalyst AI · Private Beta",
  "Switch to light mode", "Switch to dark mode", "Name", "Email", "Subject", "Message", "Website",
  "Sending...", "Send Message", "Message received.", "Your message has been sent.",
  "The request could not be read.", "Please reload the page and try again.",
  "Please check the highlighted information.", "Email is temporarily unavailable.",
  "Please wait a moment before trying again.", "Your message could not be sent. Please try again later.",
  "The form could not be validated. Please reload the page and try again.",
  "Enter at least 2 characters.", "Enter at least 10 characters.", "Enter no more than 100 characters.",
  "Enter no more than 160 characters.", "Enter no more than 254 characters.", "Enter no more than 5000 characters.",
  "Enter your email address.", "Enter a valid email address.", "Invalid source page.",
  "Ground", "What you were built on", "Frame", "Beliefs that hold the weight", "Wiring", "Emotional circuitry",
  "Rooms", "Patterns lived every day", "Facade", "The self shown outside", "Living Blueprint layers",
  "Sinda Khenine conference reel poster", "Sinda Khenine conference reel",
  "Your browser cannot play this video.", "Your browser cannot play this video. Use the static poster image instead.",
  "Static image shown because reduced motion is enabled.",
] as const;
export function clientMessages(messages: CopyMessages) {
  return Object.fromEntries(clientCopy.map(text => [copyKey(text), messages[copyKey(text)] ?? text]));
}
