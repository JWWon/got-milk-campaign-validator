import type { AxiosRequestConfig } from 'axios'
import { getTwelveLabsAPI } from '../_common'
import type { IndexListParam, IndexListResponse } from './types'

export function retrieveIndexList(params?: IndexListParam, config?: AxiosRequestConfig) {
	return getTwelveLabsAPI().get<IndexListResponse>('/indexes', { ...config, params })
}
