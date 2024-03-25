"use client"
import Heading from '@/components/Heading'
import { SendHorizontal, VideoIcon } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import *  as z from 'zod'

import { formSchema } from './constants'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import Empty from '@/components/Empty'
import Loader from '@/components/Loader'
import { cn } from '@/lib/utils'
import { Orbitron } from 'next/font/google'

const orbitron = Orbitron({
    subsets: ['latin'],
    weight: ['600']
})

const VideoPage = () => {

    const router = useRouter();
    // const proModal = useProModal();

    const [video, setVideo] = useState<string>()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
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
    }, [video]);

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setVideo(undefined);

            const response = await axios.post("/api/video", values)

            setVideo(response.data[0])
            form.reset()
        } catch (error) {
            // TODO: Open Pro Model
            console.log(error)
        } finally {
            router.refresh();
        }
    };

    return (
        <div className='relative flex flex-col px-2'>
            <div className='pt-2'>
                <Heading
                    title="Video Generator"
                    description="Video Generator suitable to your mood."
                    icon={VideoIcon}
                    iconColor='text-[#ff3800]'
                    bgColor='bg-[#ff3800]/10'
                />
            </div>
            <div className='-mt-2'>
                <div className=''>
                    <Form {...form}>

                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='rounded-lg w-full p-4 px-3 md:px-6 focus-within:shadow-white grid grid-cols-12 gap-1'
                        >

                            <FormField
                                name='prompt'
                                render={({ field }) => (
                                    <FormItem className='col-span-12 lg:col-span-10 flex items-center justify-center gap-2'>
                                        <FormControl className='m-0 p-0'>
                                            <Input
                                                className='bg-transparent outline-none focus-visible:ring-0 focus-visible:ring-transparent px-2'
                                                placeholder='Generate your own music with a prompt🎥'
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className='border col-span-12 lg:col-span-2 flex items-center gap-2 w-full' disabled={isLoading}>
                                <p className=''>Generate</p>
                                <SendHorizontal className='w-5 h-5' />
                            </Button>
                        </form>
                    </Form>
                </div>
                {
                    isLoading && (
                        <div className={cn('flex flex-col items-center justify-center w-full', orbitron.className)}>
                            <Loader />
                            Generating Your Video ...
                        </div>
                    )
                }
                {!video && !isLoading && (
                    <div>
                        <Empty
                            label="No Video Generated yet."
                            imageSrc='/novideo.png'
                        />
                    </div>
                )}
                <div ref={messagesEndRef} />
                {
                    video && (
                        <video controls className='w-full aspect-video my-2 rounded-lg border bg-black'>
                            <source src={video} />
                        </video>
                    )
                }

            </div>
        </div>
    )
}

export default VideoPage