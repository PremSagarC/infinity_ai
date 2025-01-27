import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ChatCompletionMessage } from 'openai/resources/index.mjs';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const instructionMessage: ChatCompletionMessage = {
    role: 'assistant',
    content: "You are a code generator. You must answer only in markdown code snippetes. Use code comments for explainations."
}

export async function POST(req: Request) {
    try {
        const { userId } = auth()
        const body = await req.json()
        const { messages } = body

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        // const url = 'https://api.openai.com/v1/chat/completions'

        if (!openai.apiKey) {
            return new NextResponse("OpenAI API key not configured", { status: 500 })
        }

        if (!messages) {
            return new NextResponse("Messages are required", { status: 400 })
        }

        const response: OpenAI.ChatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [instructionMessage, ...messages]
        })

        return NextResponse.json(response.choices[0].message)


    } catch (error) {
        console.log("[CODE_ERROR]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}