import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "welthTracker",
  name: "Welth",
  retryFunction: async (attempt: number) => ({
    delay: Math.pow(2, attempt) * 1000,
  }),
});
