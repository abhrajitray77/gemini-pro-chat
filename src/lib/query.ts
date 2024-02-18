import { genAI } from "./googleGen";

const textQuery = async (prompt: string, model: string) => {
    //setting up the model
    const modelOb = genAI.getGenerativeModel({model: model});
    //fetching the response
    const res = await modelOb.generateContent(prompt);
  return res.response.text();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const imageQuery = async (prompt: string, model: string, imageParts: any) => {
    //setting up the model
    const modelOb = genAI.getGenerativeModel({model: model});
    //fetching the response
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const res = await modelOb.generateContent([prompt, ...imageParts]);
  return res.response.text();
}

export { textQuery, imageQuery };