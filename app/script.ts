import { Types } from "ably/promises";
import * as Ably from "ably/promises";

(async () => {
    console.log("Oh hai! 🖤");

    const optionalClientId = "optionalClientId"; // When not provided in authUrl, a default will be used.
    const ably = new Ably.Realtime.Promise({ authUrl: `/api/ably-token-request?clientId=${optionalClientId}` });
    const channel = ably.channels.get("some-channel-name");

    let latestMessageTime: Date | null = null;

    await channel.subscribe((msg: Types.Message) => {
        console.log("Ably message received", msg);

        // Update latest message time
        latestMessageTime = new Date(msg.timestamp);

        // Ensure the element exists before trying to update it
        const latestTimeElement = document.getElementById("latest-time");
        if (latestTimeElement) {
            latestTimeElement.innerHTML = `Latest message received at: ${latestMessageTime.toLocaleString()}`;
        } else {
            console.warn("Element with ID 'latest-time' not found in the DOM.");
        }

        // Also append the message to the response section
        const responseElement = document.getElementById("response");
        if (responseElement) {
            responseElement.innerHTML += "<br />" + JSON.stringify(msg);
        } else {
            console.warn("Element with ID 'response' not found in the DOM.");
        }
    });

    // Example of publishing a message
    channel.publish("hello-world-message", { message: "Hello world!" });
})();

export {};
