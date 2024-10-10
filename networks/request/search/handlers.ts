import type { AxiosRequestConfig } from 'axios'
import { getTwelveLabsAPI } from '../_common'
import type {
	GroupBy,
	PageToken,
	SearchV2Params,
	SearchResponseGroupByClip,
	SearchResponseGroupByVideo,
	SearchParams
} from './types'

export async function search<T extends GroupBy = GroupBy.clip>(
	data: SearchParams | PageToken,
	config?: AxiosRequestConfig
) {
	const isDataPageToken = typeof data === 'string'
	return getTwelveLabsAPI().request<T extends GroupBy.clip ? SearchResponseGroupByClip : SearchResponseGroupByVideo>({
		...config,
		method: isDataPageToken ? 'GET' : 'POST',
		url: isDataPageToken ? `/search/${data}` : '/search',
		data: isDataPageToken ? undefined : data
	})
}

export async function searchV2<T extends GroupBy = GroupBy.clip>(
	data: SearchV2Params | PageToken,
	config?: AxiosRequestConfig
) {
	const formData = new FormData()

	if (typeof data === 'object') {
		await Promise.all(
			(Object.keys(data) as Array<keyof typeof data>).map(async (key) => {
				const param = data[key]
				if (Array.isArray(param)) {
					param.forEach((elem) => {
						formData.append(key, elem)
					})
				} else if (param) {
					if (key === 'query_media_file' && typeof param === 'string') {
						try {
							const imageBlob = await fetch(param).then((r) => r.blob())
							formData.append(key, imageBlob)
							// eslint-disable-next-line @typescript-eslint/no-unused-vars
						} catch (e) {
							throw new Error('Fail to load the image, please try with other image')
						}
					} else {
						formData.append(key, String(param))
					}
				}
			})
		)
	}

	const isDataPageToken = typeof data === 'string'
	return getTwelveLabsAPI().request<T extends GroupBy.clip ? SearchResponseGroupByClip : SearchResponseGroupByVideo>({
		...config,
		method: isDataPageToken ? 'GET' : 'POST',
		url: isDataPageToken ? `/search-v2/${data}` : '/search-v2',
		data: isDataPageToken ? undefined : formData
	})
}
