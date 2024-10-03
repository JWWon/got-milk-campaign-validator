import type { AxiosRequestConfig } from 'axios'
import { getTwelveLabsAPI } from '../_common'
import type { GenerateParams, GenerateResponse, GistParams, GistResponse, GistType } from './types'

type PartialGistResponse<T extends GistType[]> = T extends GistType.HASHTAG[]
	? Pick<GistResponse, 'id' | 'hashtags'>
	: T extends GistType.TITLE[]
		? Pick<GistResponse, 'id' | 'title'>
		: T extends GistType.TOPIC[]
			? Pick<GistResponse, 'id' | 'topics'>
			: T extends (GistType.HASHTAG | GistType.TITLE)[]
				? Pick<GistResponse, 'id' | 'hashtags' | 'title'>
				: T extends (GistType.HASHTAG | GistType.TOPIC)[]
					? Pick<GistResponse, 'id' | 'hashtags' | 'topics'>
					: T extends (GistType.TITLE | GistType.TOPIC)[]
						? Pick<GistResponse, 'id' | 'title' | 'topics'>
						: GistResponse

export function gist<T extends GistType[] = []>(data: GistParams<T>, config?: AxiosRequestConfig) {
	return getTwelveLabsAPI().post<PartialGistResponse<T>>('/gist', data, config)
}

export function generate(data: GenerateParams, config?: AxiosRequestConfig) {
	return getTwelveLabsAPI().post<GenerateResponse>('/generate', data, config)
}
