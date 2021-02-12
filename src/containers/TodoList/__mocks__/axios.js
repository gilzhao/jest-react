const mockUndoList = {
  data: [{
    status: 'div',
    value: 'learn jest'
  }],
  success: true
}


export default {
  get(url) {
    if (url === '/undoList.json') {
      return new Promise((resolve, rejcet) => {
        resolve(mockUndoList)
      })
    }
  }
}