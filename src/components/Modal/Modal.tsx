import { h, FunctionalComponent, ComponentChildren } from 'preact'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	title?: string
	children: ComponentChildren
	maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
	showCloseButton?: boolean
}

const Modal: FunctionalComponent<ModalProps> = ({
	isOpen,
	onClose,
	title,
	children,
	maxWidth = 'md',
	showCloseButton = true
}) => {
	if (!isOpen) return null

	const maxWidthClasses = {
		sm: 'max-w-sm',
		md: 'max-w-md',
		lg: 'max-w-lg',
		xl: 'max-w-xl',
		'2xl': 'max-w-2xl'
	}

	const handleBackdropClick = (e: Event) => {
		if (e.target === e.currentTarget) {
			onClose()
		}
	}

	return (
		<div
			className="fixed inset-0 bg-opacity-80 backdrop-blur-lg flex items-center justify-center z-50 p-4 animate-fadeIn"
			onClick={handleBackdropClick}
		>
			<div className={`bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full ${maxWidthClasses[maxWidth]} transform transition-all duration-200 animate-scaleIn`}>
				{/* Header */}
				{(title || showCloseButton) && (
					<div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
						{title && (
							<h3 className="text-lg font-semibold text-gray-800 dark:text-white">
								{title}
							</h3>
						)}
						{showCloseButton && (
							<button
								onClick={onClose}
								className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
								aria-label="Close modal"
							>
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						)}
					</div>
				)}

				{/* Content */}
				<div className={title || showCloseButton ? "p-6" : "p-6"}>
					{children}
				</div>
			</div>
		</div>
	)
}

export default Modal