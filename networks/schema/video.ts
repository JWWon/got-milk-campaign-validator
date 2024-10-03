import type { CommonSchema } from './common'

export type VideoID = string & { __brand: 'video_id' }

export interface Video extends CommonSchema<VideoID> {
	/**
	 * Date format
	 */
	indexed_at: string
	metadata: {
		duration: number
		filename: string
		width: number
		height: number
		[key: string]: string | number | boolean | undefined
	}
	hls?: {
		video_url: string
		thumbnail_urls: string[]
		status: 'COMPLETE' | 'ERROR' | 'CANCELED'
		updated_at?: string
	}
}
