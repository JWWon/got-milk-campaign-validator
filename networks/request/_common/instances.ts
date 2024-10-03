import axios, { AxiosInstance } from 'axios'

let twelveLabsAPI: AxiosInstance | undefined
export function getTwelveLabsAPI() {
	if (!twelveLabsAPI)
		twelveLabsAPI = axios.create({
			baseURL: process.env.NEXT_PUBLIC_TWELVE_LABS_API_URL,
			headers: {
				'x-api-key': process.env.NEXT_PUBLIC_TWELVE_LABS_API_KEY
			}
		})
	return twelveLabsAPI
}

let internalAPI: AxiosInstance | undefined
export function getInternalAPI() {
	if (!internalAPI) {
		internalAPI = axios.create({ baseURL: '/api' })
	}
	return internalAPI
}
