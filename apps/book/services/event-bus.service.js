function createEventEmitter() {
  const listenersMap = {}
  return {
    on(evName, listener) {
      listenersMap[evName] = listenersMap[evName] ? [...listenersMap[evName], listener] : [listener]
      return () => {
        listenersMap[evName] = listenersMap[evName].filter((func) => func !== listener)
      }
    },

    emit(evName, data) {
      if (!listenersMap[evName]) return
      listenersMap[evName].forEach((listener) => listener(data))
    },
  }
}

export const eventBusService = createEventEmitter()
window.evBus = eventBusService

function showUserMsg(msg) {
  eventBusService.emit('show-user-msg', msg)
}

export function showSuccessMsg(txt) {
  showUserMsg({ txt, type: 'success' })
}

export function showErrorMsg(txt) {
  showUserMsg({ txt, type: 'error' })
}

window.showSuccessMsg = showSuccessMsg
window.showErrorMsg = showErrorMsg

const unsubscribe = eventBusService.on('some-event', (data) => {
  console.log('Got some-event:', data)
})

eventBusService.on('some-event', (data) => {
  console.log('Also MEEEEEEE:', data)
})
