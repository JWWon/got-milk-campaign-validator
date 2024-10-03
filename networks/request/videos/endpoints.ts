import type { IndexID, VideoID } from '@/networks/schema'
import { getTwelveLabsAPI } from '../_common'
import type { UpdateVideoParams, VideoListParams, VideoListResponse, VideoResponse } from './types'
import type { AxiosRequestConfig } from 'axios'

export function retrieveVideoList(indexID: IndexID, params?: VideoListParams, config?: AxiosRequestConfig) {
	return getTwelveLabsAPI().get<VideoListResponse>(`/indexes/${indexID}/videos`, { ...config, params })
}

export function retrieveVideo(indexID: IndexID, videoID: VideoID, config?: AxiosRequestConfig) {
	return getTwelveLabsAPI().get<VideoResponse>(`/indexes/${indexID}/videos/${videoID}`, config)
}

export function updateVideo(indexID: IndexID, videoID: VideoID, data: UpdateVideoParams, config?: AxiosRequestConfig) {
	return getTwelveLabsAPI().put<void>(`/indexes/${indexID}/videos/${videoID}`, data, config)
}
