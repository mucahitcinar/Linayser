import { Bard } from "googlebard";

let cookies = `__Secure-1PSID=WwiIFWlB9TYfHZKemJKASPnzn2dypG-CvIVu41EOmO5AcJKKFx3dCwhGFOXcytCRmulQvQ.`;
let bot = new Bard(cookies);
let conversationId = "some_random_id"; // optional: to make it remember the conversation


let prompt=`my skills are nodejs expressjs react nextjs and i want to be a backend developer,draw me a roadmap,
tell me which courses i can use,tell me which websites can help,give me youtube channels.Give response as a
parsable JSON file,but this JSON file must be very detailed,like add links of courses`
let deneme=async()=>
{
    let response = await bot.ask(prompt,conversationId); // conversationId is optional
    console.log(response);
}   



deneme()
