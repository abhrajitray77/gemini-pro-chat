import { genAI } from "./googleGen";

const query = async (prompt: string, model: string) => {
    //setting up the model
    const modelOb = genAI.getGenerativeModel({model: model});
    //fetching the response
    const res = await modelOb.generateContent(prompt);
  return res.response.text();
};

export default query;