"use client"
import Heading from '@/components/Heading'
import { Code, SendHorizontal } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import ReactMarkdown from 'react-markdown'
import axios from 'axios'

import *  as z from 'zod'
import { formSchema } from './constants'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { ChatCompletionMessage } from 'openai/resources/index.mjs'
import Empty from '@/components/Empty'
import Loader from '@/components/Loader'
import { cn } from '@/lib/utils'
import { BotAvatar } from '@/components/BotAvatar'
import UserAvatar from '@/components/UserAvatar'
import { Orbitron } from 'next/font/google'

const orbitron = Orbitron({
    subsets: ['latin'],
    weight: ['600']
})


const CodePage = () => {

    const router = useRouter();
    // const proModal = useProModal();
    const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    })

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();

        // Optional: If you want to observe changes in the chat container to adjust scroll
        const observer = new MutationObserver(scrollToBottom);
        const config = { childList: true, subtree: true };
        messagesEndRef.current && observer.observe(messagesEndRef.current, config);

        return () => observer.disconnect();
    }, [messages]);

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: ChatCompletionMessage = {
                role: 'user' as any,
                content: values.prompt,
            }
            const newMessages = [...messages, userMessage]
            const response = await axios.post("/api/code", {
                messages: newMessages,
            })
            setMessages((current) => [...current, userMessage, response.data])

            form.reset()
        } catch (error) {
            // TODO: Open Pro Model
            console.log(error)
        } finally {
            router.refresh();
        }
    };


    return (
        <div className='relative flex flex-col justify-between h-screen p-4'> {/* Adjusted this line */}
            <div>
                <div>
                    <Heading
                        title="Code Generation"
                        description='Intelligent code generating AI model.'
                        icon={Code}
                        iconColor='text-[#578fff]'
                        bgColor='bg-[#578fff]/20'
                    />

                </div>
            </div>
            <div className='px-1 mb-5'> {/* Added margin-bottom here */}
                <div className='space-y-3 '>
                    {messages.length === 0 && !isLoading && (
                        <div>
                            <Empty
                                label="Any coding questions for me? 😊"
                                imageSrc='/nocode.png'
                            />
                        </div>
                    )}
                    <div className='flex flex-col gap-y-4 pb-3'>
                        {
                            messages.map((message) => (
                                <div key={message.role} className={cn('p-2 w-full flex items-start gap-x-4 rounded-md',
                                    message.role === 'assistant' ? 'bg-transparent text-white' : 'bg-white text-black'
                                )}>
                                    {message.role === "assistant" ? <BotAvatar /> : <UserAvatar />}
                                    <ReactMarkdown
                                        components={{
                                            pre: ({ node, ...props }) => (
                                                <div className='scroll-body overflow-auto w-full my-2 bg-black/90 p-2 rounded-lg'>
                                                    <pre {...props} />
                                                </div>
                                            ),
                                            code: ({ node, ...props }) => (
                                                <code className='underline bg-[#4d4d4d] font-extrabold text-white rounded-lg px-1' {...props} />
                                            )
                                        }}
                                        className='text-sm overflow-x-hidden leading-7'
                                    >
                                        {message.content || ""}
                                    </ReactMarkdown>
                                </div>
                            ))
                        }
                        <div ref={messagesEndRef} />
                    </div>
                    {
                        isLoading && (
                            <div className={cn('flex flex-col items-center justify-center w-full tracking-widest', orbitron.className)}>
                                <Loader />
                                Thinking...
                            </div>
                        )
                    }
                </div>

                <div className='border-t-[1px] border-[#5b5b5b]'>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='rounded-lg w-full p-4 px-3 md:px-6 focus-within:shadow-white grid grid-cols-12 gap-2'
                        >
                            <FormField
                                name='prompt'
                                render={({ field }) => (
                                    <FormItem className='col-span-12 lg:col-span-10 flex items-center justify-center gap-2'>
                                        <FormControl className='m-0 p-0'>
                                            <Input
                                                className='bg-transparent outline-none focus-visible:ring-0 focus-visible:ring-transparent px-2'
                                                placeholder='I can solve your coding problems. Ask away? 👨‍💻'
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className='border col-span-12 lg:col-span-1 flex items-center gap-2 w-full' disabled={isLoading}>
                                <p className='lg:hidden'>Generate</p>
                                <SendHorizontal className='w-5 h-5' />
                            </Button>
                        </form>
                    </Form>
                </div>

            </div>
        </div>
    )
}

export default CodePage