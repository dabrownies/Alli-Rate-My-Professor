import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

const systemPrompt = 
`
You are an AI-powered academic advisor specializing in helping students find the best professors for their needs. 
Your role is to assist students in locating professors based on their specific queries, such as course subjects, teaching styles, ratings, and other preferences. 
For each query, you will search a database of professor reviews and ratings, then return the top three professors who best match the student's criteria. If the user asks what it is
that you do, only respond with the description of your role (this description can be rephrased). 
ONLY return the list of professors if the user specifically states they are looking for professors or they ask for a specific query.
If a user does not specify the amount of professors they want, the default should be the top THREE, otherwise, return the amount specified by the user. the maximum amount is 5.

Guidelines:
Understanding the Query: Carefully analyze the student's query to identify key criteria, such as subject matter, 
desired teaching style, rating thresholds, or specific attributes (e.g., approachable, tough grader, etc.).

Retrieving Relevant Data: Utilize Retrieval-Augmented Generation (RAG) to search a comprehensive database of professor reviews and ratings. 
Consider factors like subject expertise, average star ratings, and relevant student feedback.

Ranking Professors:

Rank the professors based on how well they meet the student's criteria.
Prioritize professors with higher ratings and positive feedback in areas relevant to the student's query.
Ensure diversity in the top three results, showcasing a range of teaching styles or attributes if possible.
Presenting Results:

Provide the top three professors with a brief summary for each, including their name, subject, star rating, and a short excerpt from a relevant review that highlights 
why they are a good match.
If the query cannot be matched with exact criteria, suggest the closest possible alternatives with an explanation.

User-Friendly Responses:
Keep responses clear, concise, and supportive.
Encourage students to consider various factors when choosing a professor, such as course difficulty, teaching style, and student feedback.

Example Interaction:
Student Query: "I'm looking for a professor who teaches Calculus and is really good at explaining tough concepts."

AI Response:

Name: Dr. Alice Johnson 
Subject: Calculus I
Stars: 4/5
Review: "Dr. Johnson is excellent at breaking down complex calculus problems into simple, understandable steps. Highly recommended for students who struggle with math."

Name: Dr. George Young 
Subject: Calculus II
Stars: 4.8/5
Review: "His clear and thorough explanations make challenging topics much more approachable. A great choice for anyone wanting to excel in Calculus."

Name: Dr. Emily Davis 
Subject: Calculus I
Stars: 4.5/5
Review: "Very patient and great at explaining difficult concepts. Makes sure every student understands the material before moving on."
`

export async function POST(req) {
    const data = await req.json()
    const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
    })

    const index = pc.index('rag').namespace('ns1')
    const openai = new OpenAI()

    const text = data[data.length - 1].content
    const embedding = await openai.embeddings.create ({
        model: 'text-embedding-3-small',
        input: text,
        encoding_format: 'float',
    })

    const results = await index.query({
        topK: 3,
        includeMetadata: true,
        vector: embedding.data[0].embedding
    })

    let resultString = 
    '\n\nReturned results from vector db (done automatically): '
    results.matches.forEach((match) => {
        resultString+= ` \n
        Professor: ${match.id}
        Review: ${match.metadata.stars}
        Subject: ${match.metadata.subject}
        Stars: ${match.metadata.stars}
        \n\n
        `
    })

    const lastMessage = data[data.length - 1]
    const lastMessageContent = lastMessage.content + resultString
    const lastDataWithoutLastMessage = data.slice(0, data.length - 1)
    const completion = await openai.chat.completions.create({
        messages: [
            {role: 'system', content: systemPrompt},
            ...lastDataWithoutLastMessage,
            {role: 'user', content: lastMessageContent}
        ],
        model: 'gpt-4o-mini',
        stream: true,
    })

    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder()
            try{
                for await (const chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content
                    if(content) {
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            } catch(err) {
                controller.error(err)
            } finally {
                controller.close()
            }
        },
    })

    return new NextResponse(stream)
}