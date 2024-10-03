import type { Video, VideoID } from '../../schema/video'
import { PageParam, PageResponse } from '../_common'

export interface VideoListParams extends PageParam {
	_id?: VideoID
	filename?: string
	duration?: string
	fps?: number
	width?: number
	height?: number
	size?: number
	created_at?: string
	updated_at?: string
	indexed_at?: string
}

export type VideoResponse = Video

export type VideoListResponse = PageResponse<Omit<VideoResponse, 'hls'>, { total_duration?: number }>

export interface UpdateVideoParams {
	video_title?: string
	metadata?: { [key: string]: string | number | boolean | undefined }
}
