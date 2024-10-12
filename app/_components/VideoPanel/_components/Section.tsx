export default function Section({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<div className="flex flex-col gap-y-2">
			<p className="text-lg font-semibold capitalize">{title}</p>
			{children}
		</div>
	)
}
