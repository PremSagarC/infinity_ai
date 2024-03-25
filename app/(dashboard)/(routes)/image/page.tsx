"use client"
import Heading from '@/components/Heading'
import { Download, ImageIcon, SendHorizontal } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import *  as z from 'zod'

import { amountOptions, formSchema, resolutionOptions } from './constants'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import Empty from '@/components/Empty'
import Loader from '@/components/Loader'
import { cn } from '@/lib/utils'
import { Orbitron } from 'next/font/google'
import { Card, CardFooter } from '@/components/ui/card'
import Image from 'next/image'

const orbitron = Orbitron({
    subsets: ['latin'],
    weight: ['600']
})

const ImagePage = () => {

    const router = useRouter();
    // const proModal = useProModal();

    const [images, setImages] = useState<string[]>([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512"
        }
    })


    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages([]);

            const response = await axios.post("/api/image", values)

            const urls = response.data.map((image: { url: string }) => image.url)

            setImages(urls);
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
                    title="AI Image Generator"
                    description="Generate any images you need."
                    icon={ImageIcon}
                    iconColor='text-[#ff3b94]'
                    bgColor='bg-[#ff3b94]/15'
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
                                    <FormItem className='col-span-12 lg:col-span-6 flex items-center justify-center gap-2'>
                                        <FormControl className='m-0 p-0'>
                                            <Input
                                                className='bg-transparent outline-none focus-visible:ring-0 focus-visible:ring-transparent px-2'
                                                placeholder='A donkey on the back of a horse? 🧐'
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name='amount'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className='col-span-12 lg:col-span-2'>
                                        <Select disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className='text-black outline-none'>
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    amountOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name='resolution'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className='col-span-12 lg:col-span-2'>
                                        <Select disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className='text-black'>
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    resolutionOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                            </SelectContent>
                                        </Select>
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
                            Generating Your Images ...
                        </div>
                    )
                }
                {images.length === 0 && !isLoading && (
                    <div>
                        <Empty
                            label="No Images Generated yet."
                            imageSrc='/noimage.png'
                        />
                    </div>
                )}
                <div className='space-y-3 '>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                        {
                            images.map((src) => (
                                <Card key={src} className='relative rounded-lg overflow-hidden'>
                                    <div className='relative aspect-square'>
                                        <Image src={src} alt='' fill />
                                    </div>
                                    <CardFooter className='p-2'>
                                        <Button variant={'secondary'} className='top-3 rounded-lg bg-black/10 text-blue-600 w-full'
                                            onClick={() => window.open(src)}
                                        >
                                            <Download className='h-5 w-5' />
                                            Download
                                        </Button>
                                    </CardFooter>
                                </Card>

                            ))
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ImagePage