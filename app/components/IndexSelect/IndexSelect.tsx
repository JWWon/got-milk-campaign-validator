'use client'

import { Select, SelectItem, SelectProps } from '@nextui-org/select'
import useIndexes from './_hooks/useIndexes'
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll'
import { useSelectedVideoStore } from '@/app/utils/selectedVideoStore'
import { useShallow } from 'zustand/react/shallow'
import { useEffect, useMemo, useState } from 'react'

type Props = Omit<SelectProps, 'children' | 'items' | 'isLoading' | 'selectionMode' | 'scrollRef' | 'onOpenChange'>

export default function IndexSelect({ ...params }: Props) {
	const { data: indexes, isFetching, hasNextPage, fetchNextPage } = useIndexes()

	const { indexID, setIndexID } = useSelectedVideoStore(
		useShallow((state) => ({
			indexID: state.indexID,
			setIndexID: state.setIndex
		}))
	)
	const indexIDs = useMemo(() => new Set(indexID ? [indexID] : []), [indexID])

	useEffect(() => {
		setIndexID(indexes[0]._id)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const [isOpen, setIsOpen] = useState(false)
	const [, scrollRef] = useInfiniteScroll({
		hasMore: hasNextPage,
		isEnabled: isOpen,
		shouldUseLoader: false,
		onLoadMore: fetchNextPage
	})

	return (
		<Select
			isRequired
			aria-label="Select an index"
			selectionMode="single"
			scrollRef={scrollRef}
			isLoading={isFetching}
			placeholder="Select an index"
			items={indexes}
			onOpenChange={setIsOpen}
			selectedKeys={indexIDs}
			isInvalid={!indexID}
			errorMessage={!indexID ? 'Please select an index' : null}
			onChange={(e) => setIndexID(indexes.find((i) => i._id === e.target.value)?._id)}
			{...params}
		>
			{(index) => (
				<SelectItem key={index._id} className="[&>span]:truncate">
					{index.index_name}
				</SelectItem>
			)}
		</Select>
	)
}
