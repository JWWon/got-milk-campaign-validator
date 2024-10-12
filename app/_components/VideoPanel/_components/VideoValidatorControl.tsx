'use client'

import React from 'react'
import Section from './Section'
import { Button } from '@nextui-org/button'
import type { IndexID, Video } from '@/networks'
import ValidateStatusChip from '@/app/components/ValidateStatusChip'
import useValidateVideos from '../_hooks/useValidateVideo'
import { toast } from 'react-toastify'
import VideoValidateForm, { useVideoValidateForm, VideoValidateSchema } from '@/app/components/VideoValidateForm'

export interface VideoValidatorData {
	prompt?: string
	queries?: string[]
}

interface Props {
	indexID: IndexID
	video: Video
}

export default function VideoValidatorControl({ indexID, video }: Props) {
	const form = useVideoValidateForm()

	const validateVideos = useValidateVideos(indexID, [video._id])

	const onSubmit = ({ prompt, queries, use_prompt, use_queries }: VideoValidateSchema) => {
		if (!prompt && !queries) {
			toast('Please select at least one of validate options', { type: 'warning' })
			return
		}
		return validateVideos.mutateAsync({
			prompt: use_prompt ? prompt : undefined,
			queries: use_queries ? queries?.split(/,[,\s]*/g) : undefined
		})
	}

	return (
		<div className="flex w-full flex-col gap-y-4">
			<Section title="Validation Status">
				<ValidateStatusChip metadata={video.metadata} />
			</Section>
			<Section title="Criteria">
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<VideoValidateForm {...form} />
					<Button
						fullWidth
						type="submit"
						color="primary"
						isDisabled={!form.formState.isValid}
						isLoading={validateVideos.isPending}
						className="mt-3"
					>
						Validate video
					</Button>
				</form>
			</Section>
		</div>
	)
}
