import { TwelveLabs } from "twelvelabs-js";

const client = new TwelveLabs({
  apiKey: process.env.NEXT_PUBLIC_TWELVE_LABS_API_KEY,
});

export default client;
