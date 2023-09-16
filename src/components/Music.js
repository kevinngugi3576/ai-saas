import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REACT_APP_REPLICATE_API_TOKEN,
});

const GenerateMusic = async (userPrompt) => {
  try {
    const body = { prompt: userPrompt }; // Use the user's prompt

    const { prompt } = body;

    const response = await replicate.predict(
      "sepal/audiogen:154b3e5141493cb1b8cec976d9aa90f2b691137e39ad906d2421b74c2a8c52b8",
      {
        input: {
          prompt_a: prompt,
        },
      }
    );

    console.log("Response:", response); // Do something with the response
    return response; // Return the response for further processing if needed
  } catch (error) {
    console.error("[MUSIC_ERROR]", error);
    // Handle the error appropriately
    throw new Error("Failed to generate music"); // Propagate the error
  }
};

export default GenerateMusic;