'use client'

import { Chip } from '@nextui-org/chip'
import React from 'react'
import type { Video } from 'twelvelabs-js'
import Section from './Section'
import { Textarea } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import useVideoValidateForm, { VideoValidateSchema } from '../_hooks/useVideoValidateForm'
import { Switch } from '@nextui-org/switch'

export interface VideoValidatorData {
	prompt?: string
	queries?: string[]
}

interface Props {
	video: Video
	onSubmit: (data: VideoValidatorData) => void
}

export default function VideoValidatorControl({ video, onSubmit }: Props) {
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors, isValid }
	} = useVideoValidateForm()

	const onRawSubmit = ({ prompt, queries }: VideoValidateSchema) =>
		onSubmit({ prompt, queries: queries?.replace(', ', ',').split(',') })

	return (
		<div className="flex w-full flex-col gap-y-4">
			<Section title="Validation Status">
				{video.metadata.status === 'matched' && <Chip color="success">Matched</Chip>}
				{video.metadata.status === 'not_matched' && <Chip color="success">Not Matched</Chip>}
				{!video.metadata.status && <Chip color="warning">Processing</Chip>}
			</Section>
			<Section title="Criteria">
				<form onSubmit={handleSubmit(onRawSubmit)}>
					<div className="flex w-full flex-col gap-y-3">
						<Switch {...register('use_prompt')}>Use prompt</Switch>
						{watch('use_prompt') && (
							<Textarea
								{...register('prompt')}
								isRequired
								label="Prompt message"
								description="Prompt should request to return boolean value only"
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
						<Button type="submit" color="primary" isDisabled={!isValid}>
							{!video.metadata.status ? 'Validate' : 'Revalidate'}
						</Button>
					</div>
				</form>
			</Section>
		</div>
	)
}
