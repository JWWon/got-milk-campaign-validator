import { UseFormReturn } from 'react-hook-form'
import { VideoValidateSchema } from './_hooks/useVideoValidateForm'
import { Switch } from '@nextui-org/switch'
import { Textarea } from '@nextui-org/input'
import { twMerge } from 'tailwind-merge'

interface Props extends UseFormReturn<VideoValidateSchema> {
	className?: string
}

export default function VideoValidateForm({ register, watch, formState: { errors }, className }: Props) {
	return (
		<div className={twMerge('flex w-full flex-col gap-y-3', className)}>
			<Switch {...register('use_prompt')}>Use prompt</Switch>
			{watch('use_prompt') && (
				<Textarea
					{...register('prompt')}
					isRequired
					label="Prompt message"
					description="Prompt should request to decide whether the content matches the condition or not"
					errorMessage={errors.prompt?.message}
				/>
			)}
			<Switch {...register('use_queries')}>Use queries</Switch>
			{watch('use_queries') && (
				<Textarea
					{...register('queries')}
					isRequired
					label="Queries"
					description="Use comma(,) as separator"
					errorMessage={errors.queries?.message}
				/>
			)}
		</div>
	)
}
