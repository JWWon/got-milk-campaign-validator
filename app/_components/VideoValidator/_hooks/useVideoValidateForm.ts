import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const videoValidateSchema = yup.object({
	use_prompt: yup.boolean().required(),
	prompt: yup
		.string()
		.max(1500)
		.when('use_prompt', {
			is: true,
			then: (schema) => schema.required('Type prompt')
		}),
	use_queries: yup.boolean().required(),
	queries: yup.string().when('use_queries', {
		is: true,
		then: (schema) => schema.required('Type queries')
	})
})

export type VideoValidateSchema = yup.InferType<typeof videoValidateSchema>

export default function useVideoValidateForm() {
	return useForm<VideoValidateSchema>({
		resolver: yupResolver(videoValidateSchema),
		defaultValues: {
			use_prompt: true,
			prompt: process.env.NEXT_PUBLIC_VIDEO_VALIDATE_PROMPT ?? '',
			use_queries: false,
			queries: process.env.NEXT_PUBLIC_VIDEO_VALIDATE_QUERIES ?? ''
		}
	})
}
