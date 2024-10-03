import { TwelveLabs } from 'twelvelabs-js'

let client: TwelveLabs | undefined
export function getTwelveLabs() {
	if (!client) {
		client = new TwelveLabs({
			apiKey: process.env.NEXT_PUBLIC_TWELVE_LABS_API_KEY
		})
	}
	return client
}
