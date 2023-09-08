import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REACT_APP_REPLICATE_API_TOKEN,
});

const model = "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf";
const input = { prompt: "an astronaut riding a horse on mars, hd, dramatic lighting, detailed" };
const output = await replicate.run(model, { input });

console.log(output);
// ['https://replicate.com/api/models/stability-ai/stable-diffusion/files/50fcac81-865d-499e-81ac-49de0cb79264/out-0.png']