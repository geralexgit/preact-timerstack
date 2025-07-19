import { h, FunctionalComponent } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { useStoreon } from 'storeon/preact'
import { TimerList } from '../../store/storeTypes'
import Modal from '../Modal/Modal'

const SavedTimerLists: FunctionalComponent = () => {
	const { timers, dispatch } = useStoreon('timers')
	const [savedLists, setSavedLists] = useState<TimerList[]>([])
	const [showSaveDialog, setShowSaveDialog] = useState(false)
	const [saveListName, setSaveListName] = useState('')
	const [showLoadDialog, setShowLoadDialog] = useState(false)

	// Load saved lists from localStorage
	const loadSavedLists = () => {
		const saved = JSON.parse(localStorage.getItem('savedTimerLists') || '[]')
		setSavedLists(saved)
	}

	useEffect(() => {
		loadSavedLists()
	}, [])

	const handleSaveList = (e: Event) => {
		e.preventDefault()
		if (!saveListName.trim()) return
		
		dispatch('timer/saveList', { name: saveListName.trim() })
		setSaveListName('')
		setShowSaveDialog(false)
		loadSavedLists() // Refresh the list
	}

	const handleLoadList = (timerList: TimerList) => {
		dispatch('timer/loadList', timerList)
		setShowLoadDialog(false)
	}

	const handleDeleteList = (listId: string) => {
		if (confirm('Are you sure you want to delete this timer list?')) {
			dispatch('timer/deleteList', listId)
			loadSavedLists() // Refresh the list
		}
	}

	const handleExportList = (timerList: TimerList) => {
		const dataStr = JSON.stringify(timerList, null, 2)
		const dataBlob = new Blob([dataStr], { type: 'application/json' })
		const url = URL.createObjectURL(dataBlob)
		
		const link = document.createElement('a')
		link.href = url
		link.download = `${timerList.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_timers.json`
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
		URL.revokeObjectURL(url)
	}

	const handleExportAll = () => {
		const exportData = {
			exportedAt: Date.now(),
			version: '1.0',
			lists: savedLists
		}
		
		const dataStr = JSON.stringify(exportData, null, 2)
		const dataBlob = new Blob([dataStr], { type: 'application/json' })
		const url = URL.createObjectURL(dataBlob)
		
		const link = document.createElement('a')
		link.href = url
		link.download = `timer_lists_backup_${new Date().toISOString().split('T')[0]}.json`
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
		URL.revokeObjectURL(url)
	}

	const handleImportFile = (event: Event) => {
		const file = (event.target as HTMLInputElement).files?.[0]
		if (!file) return

		const reader = new FileReader()
		reader.onload = (e) => {
			try {
				const content = e.target?.result as string
				const data = JSON.parse(content)
				
				// Check if it's a single timer list or multiple lists
				if (data.lists && Array.isArray(data.lists)) {
					// Multiple lists export format
					const validLists = data.lists.filter(list => 
						list.id && list.name && Array.isArray(list.timers)
					)
					
					if (validLists.length === 0) {
						alert('No valid timer lists found in the file.')
						return
					}
					
					// Add imported lists to localStorage
					const existingSavedLists = JSON.parse(localStorage.getItem('savedTimerLists') || '[]')
					const updatedLists = [...existingSavedLists]
					
					validLists.forEach(importedList => {
						// Generate new ID to avoid conflicts
						const newList = {
							...importedList,
							id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
							name: `${importedList.name} (Imported)`
						}
						updatedLists.push(newList)
					})
					
					localStorage.setItem('savedTimerLists', JSON.stringify(updatedLists))
					loadSavedLists()
					alert(`Successfully imported ${validLists.length} timer list(s)!`)
					
				} else if (data.id && data.name && Array.isArray(data.timers)) {
					// Single timer list format
					const existingSavedLists = JSON.parse(localStorage.getItem('savedTimerLists') || '[]')
					const newList = {
						...data,
						id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
						name: `${data.name} (Imported)`,
						createdAt: Date.now()
					}
					
					existingSavedLists.push(newList)
					localStorage.setItem('savedTimerLists', JSON.stringify(existingSavedLists))
					loadSavedLists()
					alert('Timer list imported successfully!')
					
				} else {
					alert('Invalid file format. Please select a valid timer list file.')
				}
			} catch (error) {
				alert('Error reading file. Please make sure it\'s a valid JSON file.')
				console.error('Import error:', error)
			}
		}
		
		reader.readAsText(file)
		// Reset the input
		;(event.target as HTMLInputElement).value = ''
	}



	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60)
		const secs = seconds % 60
		return `${mins}:${secs.toString().padStart(2, '0')}`
	}

	const getTotalDuration = (timerList: TimerList) => {
		return timerList.timers.reduce((total, timer) => total + timer.duration, 0)
	}

	return (
		<div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
					💾 Saved Timer Lists
				</h2>
				<div className="flex flex-wrap gap-2">
					<button
						onClick={() => setShowSaveDialog(true)}
						disabled={timers.length === 0}
						className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
					>
						💾 Save Current
					</button>
					<button
						onClick={() => setShowLoadDialog(true)}
						disabled={savedLists.length === 0}
						className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
					>
						📂 Load List
					</button>
					<button
						onClick={handleExportAll}
						disabled={savedLists.length === 0}
						className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
						title="Export all lists as backup file"
					>
						📤 Export All
					</button>
					<label className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">
						📥 Import File
						<input
							type="file"
							accept=".json"
							onChange={handleImportFile}
							className="hidden"
						/>
					</label>
				</div>
			</div>

			{/* Save Dialog */}
			<Modal
				isOpen={showSaveDialog}
				onClose={() => {
					setShowSaveDialog(false)
					setSaveListName('')
				}}
				title="Save Timer List"
				maxWidth="md"
			>
				<form onSubmit={handleSaveList}>
					<input
						type="text"
						value={saveListName}
						onInput={(e) => setSaveListName((e.target as HTMLInputElement).value)}
						placeholder="Enter list name..."
						className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 mb-4"
						required
						autoFocus
					/>
					<div className="flex space-x-3">
						<button
							type="submit"
							className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
						>
							Save
						</button>
						<button
							type="button"
							onClick={() => {
								setShowSaveDialog(false)
								setSaveListName('')
							}}
							className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
						>
							Cancel
						</button>
					</div>
				</form>
			</Modal>

			{/* Load Dialog */}
			<Modal
				isOpen={showLoadDialog}
				onClose={() => setShowLoadDialog(false)}
				title="Load Timer List"
				maxWidth="2xl"
			>
				<div className="max-h-96 overflow-y-auto">
					{savedLists.length === 0 ? (
						<p className="text-gray-500 dark:text-gray-400 text-center py-8">
							No saved timer lists found.
						</p>
					) : (
						<div className="space-y-3">
							{savedLists.map((timerList) => (
								<div key={timerList.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex items-center justify-between">
									<div className="flex-1">
										<h4 className="font-medium text-gray-800 dark:text-white">
											{timerList.name}
										</h4>
										<p className="text-sm text-gray-500 dark:text-gray-400">
											{timerList.timers.length} timers • {formatTime(getTotalDuration(timerList))} total
										</p>
										<p className="text-xs text-gray-400 dark:text-gray-500">
											Saved {new Date(timerList.createdAt).toLocaleDateString()}
										</p>
									</div>
									<div className="flex space-x-2">
										<button
											onClick={() => handleLoadList(timerList)}
											className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
										>
											Load
										</button>
										<button
											onClick={() => handleExportList(timerList)}
											className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
											title="Export this list as file"
										>
											📤
										</button>
										<button
											onClick={() => handleDeleteList(timerList.id)}
											className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
										>
											Delete
										</button>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</Modal>

			{/* Quick Stats */}
			<div className="text-sm text-gray-500 dark:text-gray-400">
				{savedLists.length === 0 ? (
					<p>No saved timer lists yet. Save your current timers to reuse them later!</p>
				) : (
					<p>{savedLists.length} saved timer list{savedLists.length !== 1 ? 's' : ''}</p>
				)}
			</div>
		</div>
	)
}

export default SavedTimerLists