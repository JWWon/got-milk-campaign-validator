import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const generateHashtagsSchema = yup.object({
	hashtag_prompt: yup.string().required()
})

export type GenerateHashtagsSchema = yup.InferType<typeof generateHashtagsSchema>

export default function useGenerateHashtagsForm() {
	return useForm<GenerateHashtagsSchema>({
		resolver: yupResolver(generateHashtagsSchema),
		defaultValues: {
			hashtag_prompt: process.env.NEXT_PUBLIC_GENERATE_HASHTAGS_PROMPT ?? ''
		}
	})
}
