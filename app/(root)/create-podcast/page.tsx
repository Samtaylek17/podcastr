/** @format */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import GeneratePodcast from '@/components/GeneratePodcast';
import GenerateThumbnail from '@/components/GenerateThumbnail';
import { Loader } from 'lucide-react';
// import { toast } from '@/components/ui/use-toast';

const voiceCategories = ['alloy', 'shimmer', 'nova', 'echo', 'fable', 'onyx'];

const FormSchema = z.object({
	username: z.string().min(2, {
		message: 'Username must be at least 2 characters.',
	}),
});

const CreatePodcast = () => {
	const [voiceType, setVoiceType] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			username: '',
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		// toast({
		// 	title: 'You submitted the following values:',
		// 	description: (
		// 		<pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
		// 			<code className='text-white'>{JSON.stringify(data, null, 2)}</code>
		// 		</pre>
		// 	),
		// });
	}

	return (
		<section className='mt-10 flex flex-col'>
			<h1 className='text-20 font-bold text-white-1'> Create Podcast</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='mt-12 flex w-full flex-col'>
					<div className='flex flex-col gap-[30px] border-b border-black-5 pb-10'>
						<FormField
							control={form.control}
							name='podcastTitle'
							render={({ field }) => (
								<FormItem className='flex flex-col gap-2.5'>
									<FormLabel className='text-16 font-bold text-white-1'>Username</FormLabel>
									<FormControl>
										<Input
											className='input-class focus-visible:ring-orange-1'
											placeholder='JSM Pro Podcast'
											{...field}
										/>
									</FormControl>
									<FormMessage className='text-white-1' />
								</FormItem>
							)}
						/>

						<div className='flex flex-col gap-2.5'>
							<Label className='text-16 font-bold text-white-1'>Select AI Voice</Label>
							<Select onValueChange={(value) => setVoiceType(value)}>
								<SelectTrigger className={cn('text-16 w-full border-none bg-black-1 text-gray-1')}>
									<SelectValue placeholder='Select AI Voice' className='plcaeholder:text-gray-1' />
								</SelectTrigger>
								<SelectContent className='text-16 border-none bg-black-1 font-bold text-white-1 focus:ring-orange-1'>
									{voiceCategories.map((category) => (
										<SelectItem key={category} className='capitalize focus:bg-orange-1' value={category}>
											{category}
										</SelectItem>
									))}
								</SelectContent>
								{voiceType && <audio src={`/${voiceType}.mp3`} autoPlay className='hidden' />}
							</Select>
						</div>

						<FormField
							control={form.control}
							name='podcastDescription'
							render={({ field }) => (
								<FormItem className='flex flex-col gap-2.5'>
									<FormLabel className='text-16 font-bold text-white-1'>Description</FormLabel>
									<FormControl>
										<Textarea
											className='input-class focus-visible:ring-orange-1'
											placeholder='Write a short podcast description'
											{...field}
										/>
									</FormControl>
									<FormMessage className='text-white-1' />
								</FormItem>
							)}
						/>
					</div>
					<div className='flex flex-col pt-10'>
						<GeneratePodcast />

						<GenerateThumbnail />

						<div className='mt-10 w-full'>
							<Button
								type='submit'
								className='text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1'>
								{isSubmitting ? (
									<>
										Submitting
										<Loader size={20} className='animate-spin ml-2' />
									</>
								) : (
									'Submit & Publish Podcast'
								)}
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</section>
	);
};

export default CreatePodcast;
