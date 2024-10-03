import type { VideoID } from '../../schema/video'

export interface GenerateParams {
	video_id: VideoID
	prompt: string
	/**
	 * Randomness of the generated output.
	 * @min 0
	 * @max 1
	 * @default 0.7
	 */
	temperature?: number
	/**
	 * @default false
	 */
	stream?: boolean
}

export interface GenerateResponse {
	id: string
	data: string
}

export enum GistType {
	TOPIC = 'topic',
	HASHTAG = 'hashtag',
	TITLE = 'title'
}

export interface GistParams<T extends GistType[] = []> {
	video_id: VideoID
	types: T
}

export interface GistResponse {
	id: string
	topics: string[]
	hashtags: string[] | null
	title: string
}
