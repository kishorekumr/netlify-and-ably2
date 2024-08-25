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

        // Display the latest message time on the web page
        document.getElementById("latest-time").innerHTML = `Latest message received at: ${latestMessageTime.toLocaleString()}`;

        // Also append the message to the response section
        document.getElementById("response").innerHTML += "<br />" + JSON.stringify(msg);
    });

    // Example of publishing a message
    channel.publish("hello-world-message", { message: "Hello world!" });
})();

export {};
