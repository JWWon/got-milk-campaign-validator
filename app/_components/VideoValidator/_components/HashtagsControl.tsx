import { IndexID, VideoID } from '@/networks'
import useGenerateHashtags from '../_hooks/useGenerateHashtags'
import Section from './Section'
import useGenerateHashtagsForm, { GenerateHashtagsSchema } from '../_hooks/useGenerateHashtagsForm'
import { Textarea } from '@nextui-org/input'
import { Button } from '@nextui-org/button'

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
					<Button fullWidth type="submit" color="default" isDisabled={!isValid} isLoading={generateHashtags.isPending}>
						Generate
					</Button>
				</div>
			</form>
		</Section>
	)
}
