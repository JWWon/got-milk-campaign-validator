declare module 'process' {
	global {
		namespace NodeJS {
			interface ProcessEnv {
				// Required
				readonly NEXT_PUBLIC_TWELVE_LABS_API_KEY: string
				readonly NEXT_PUBLIC_TWELVE_LABS_API_URL: string
				// Optional
				readonly NEXT_PUBLIC_GENERATE_HASHTAGS_PROMPT: string
				readonly NEXT_PUBLIC_VIDEO_VALIDATE_PROMPT: string
				readonly NEXT_PUBLIC_VIDEO_VALIDATE_QUERIES: string
			}
		}
	}
}
