import { IndexID, VideoID } from '@/networks'
import useGenerateHashtags from '../_hooks/useGenerateHashtags'
import Section from './Section'
import useGenerateHashtagsForm, { GenerateHashtagsSchema } from '../_hooks/useGenerateHashtagsForm'
import { Textarea } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { GistType } from '@/networks/request/generate/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import generateGist from '../_actions/generateGist'
import { toast } from 'react-toastify'

interface Props {
	indexID: IndexID
	videoID: VideoID
}

export default function HashtagsControl({ indexID, videoID }: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid }
	} = useGenerateHashtagsForm()

	const generateHashtags = useGenerateHashtags(indexID, videoID)

	const onSubmit = ({ hashtag_prompt }: GenerateHashtagsSchema) => {
		return generateHashtags.mutateAsync(hashtag_prompt)
	}

	const queryClient = useQueryClient()
	const reset = useMutation<void, AxiosError>({
		mutationFn() {
			return generateGist(indexID, videoID, [GistType.HASHTAG])
		},
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['video', indexID, videoID] })
		},
		onError(error) {
			if (error.status === 429) {
				toast('Daily generate usage exceeded 😢')
			}
		}
	})

	return (
		<Section title="Generate hashtags">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex w-full flex-col gap-y-3">
					<Textarea
						{...register('hashtag_prompt')}
						isRequired
						label="Hashtag prompt"
						description="Write prompt for describe criterions of hashtags."
						errorMessage={errors.hashtag_prompt?.message}
					/>
					<Button
						fullWidth
						type="submit"
						color="default"
						isDisabled={!isValid || reset.isPending}
						isLoading={generateHashtags.isPending}
					>
						Generate
					</Button>
				</div>
			</form>
			<Button
				fullWidth
				type="button"
				color="warning"
				className="mt-2"
				onClick={() => reset.mutate()}
				isDisabled={generateHashtags.isPending}
				isLoading={reset.isPending}
			>
				Reset hashtags
			</Button>
		</Section>
	)
}
