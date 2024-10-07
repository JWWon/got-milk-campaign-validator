'use client'

import React from 'react'
import Section from './Section'
import { Textarea } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import useVideoValidateForm, { VideoValidateSchema } from '../_hooks/useVideoValidateForm'
import { Switch } from '@nextui-org/switch'
import type { IndexID, Video } from '@/networks'
import ValidateStatusChip from '@/app/components/ValidateStatusChip'
import useValidateVideo from '../_hooks/useValidateVideo'
import { toast } from 'react-toastify'

export interface VideoValidatorData {
	prompt?: string
	queries?: string[]
}

interface Props {
	indexID: IndexID
	video: Video
}

export default function VideoValidatorControl({ indexID, video }: Props) {
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors, isValid }
	} = useVideoValidateForm()

	const validateVideo = useValidateVideo(indexID, video._id)

	const onSubmit = ({ prompt, queries, use_prompt, use_queries }: VideoValidateSchema) => {
		if (!prompt && !queries) {
			toast('Please select at least one of validate options', { type: 'warning' })
			return
		}
		return validateVideo.mutateAsync({
			prompt: use_prompt ? prompt : undefined,
			queries: use_queries ? queries?.replace(', ', ',').split(',') : undefined
		})
	}

	return (
		<div className="flex w-full flex-col gap-y-4">
			<Section title="Validation Status">
				<ValidateStatusChip metadata={video.metadata} />
			</Section>
			<Section title="Criteria">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="flex w-full flex-col gap-y-3">
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
						<Button type="submit" color="primary" isDisabled={!isValid} isLoading={validateVideo.isPending}>
							{!video.metadata.status ? 'Validate' : 'Revalidate'}
						</Button>
					</div>
				</form>
			</Section>
		</div>
	)
}
