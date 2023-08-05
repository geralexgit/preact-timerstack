export interface ISendPush {
	title?: string
	message?: string
	clickCallback?: () => void
	icon?: string
}

export function sendNotification(data) {
	if (data == undefined || !data) {
		return false
	}
	var title = data.title === undefined ? 'Notification' : data.title
	var clickCallback = data?.clickCallback
	var message = data.message === undefined ? 'null' : data.message
	var icon =
		data.icon === undefined
			? 'https://cdn2.iconfinder.com/data/icons/mixed-rounded-flat-icon/512/megaphone-64.png'
			: data.icon
	var sendNotification = function () {
		var notification = new Notification(title, {
			icon: icon,
			body: message,
		})
		// if (clickCallback !== undefined) {
		notification.onclick = function () {
			clickCallback && clickCallback()
			notification.close()
		}
		// }
	}

	if (!window.Notification) {
		return false
	} else {
		if (Notification.permission === 'default') {
			Notification.requestPermission(function (p) {
				if (p !== 'denied') {
					sendNotification()
				}
			})
		} else {
			sendNotification()
		}
	}
}
// example
// sendNotification({
// 	title: 'New Notification',
// 	message: 'Your message goes here',
// 	icon: 'https://cdn2.iconfinder.com/data/icons/mixed-rounded-flat-icon/512/megaphone-64.png',
// 	clickCallback: function () {
// 		alert('do something when clicked on notification')
// 	},
// })
