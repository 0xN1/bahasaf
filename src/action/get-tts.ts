"use server";

const getTTS = async (text: string, origin: string) => {
  try {
    const data = await fetch(`${origin}/api/tts`, {
      method: "POST",
      body: JSON.stringify({
        text: text,
        pass: process.env.API_KEY,
      }),
    }).then((res) => res.json());

    return data;
  } catch (error) {
    console.log(error);
  }
};

export default getTTS;
