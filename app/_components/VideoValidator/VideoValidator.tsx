'use client'

import VideoValidateForm, { useVideoValidateForm, VideoValidateSchema } from '@/app/components/VideoValidateForm'
import { Button } from '@nextui-org/button'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal'
import React, { Suspense } from 'react'
import { toast } from 'react-toastify'
import useValidateVideos from '../VideoPanel/_hooks/useValidateVideo'
import { useSelectedVideoStore } from '@/app/utils/selectedVideoStore'
import useVideos from '../VideoSelect/_hooks/useVideos'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { IndexID } from '@/networks'

function VideoValidator({ indexID }: { indexID: IndexID }) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	const form = useVideoValidateForm()
	const { data: videos } = useVideos(indexID!)
	const validateVideos = useValidateVideos(
		indexID!,
		videos.map(({ _id }) => _id)
	)

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
		<>
			<Button color="primary" isDisabled={!indexID} onPress={onOpen} type="button">
				Validate all videos
			</Button>
			<Modal scrollBehavior="inside" isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<ModalHeader>Validate all videos</ModalHeader>
							<ModalBody>
								<VideoValidateForm {...form} />
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									Close
								</Button>
								<Button type="submit" color="primary" isDisabled={!form.formState.isValid} onPress={onClose}>
									Validate all
								</Button>
							</ModalFooter>
						</form>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}

export default function VideoValidatorWithFallback() {
	const { reset } = useQueryErrorResetBoundary()
	const indexID = useSelectedVideoStore((state) => state.indexID)

	if (!indexID) return null

	return (
		<Suspense>
			<ErrorBoundary
				onReset={reset}
				fallbackRender={({ resetErrorBoundary }) => (
					<Button fullWidth onClick={resetErrorBoundary}>
						Click to retry
					</Button>
				)}
			>
				<VideoValidator indexID={indexID} />
			</ErrorBoundary>
		</Suspense>
	)
}
