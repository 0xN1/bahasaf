import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { text, pass } = await req.json();

  if (!pass) {
    return NextResponse.json({
      status: 400,
      body: {
        message: "invalid request",
      },
    });
  }

  if (pass === process.env.API_KEY) {
    try {
      const res = await fetch(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.GOOGLE_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            voice: {
              languageCode: "ms-MY",
              name: "ms-MY-Standard-A",
              // name: "ms-MY-Wavenet-A", // wavenet is expensive
            },
            input: {
              text: text,
            },
            audioConfig: {
              audioEncoding: "LINEAR16",
            },
          }),
        },
      );
      const data = await res.json();

      return NextResponse.json({
        status: 200,
        body: {
          audioContent: data.audioContent,
        },
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json({
        status: 500,
        body: {
          message: "internal server error",
        },
      });
    }
  } else {
    return NextResponse.json({
      status: 401,
      body: {
        message: "unauthorized",
      },
    });
  }
};
