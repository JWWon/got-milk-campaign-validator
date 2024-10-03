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

	const { index, setIndex } = useSelectedVideoStore(
		useShallow((state) => ({
			index: state.index,
			setIndex: state.setIndex
		}))
	)
	const indexIDs = useMemo(() => new Set(index?.id ? [index.id] : []), [index?.id])

	useEffect(() => {
		setIndex(indexes[0])
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
			isInvalid={!index}
			errorMessage={!index ? 'Please select an index' : null}
			onChange={(e) => setIndex(indexes.find((i) => i.id === e.target.value))}
			{...params}
		>
			{(index) => (
				<SelectItem key={index.id} className="[&>span]:truncate">
					{index.name}
				</SelectItem>
			)}
		</Select>
	)
}
