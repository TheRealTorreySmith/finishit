// DOM element where the Timeline will be attached
const container = $('#visualization');

// Create a DataSet (allows two way data-binding)
const items = new vis.DataSet([
  {id: 1, content: 'item 1', start: '2013-04-20'},
  {id: 2, content: 'item 2', start: '2013-04-14'},
  {id: 3, content: 'item 3', start: '2013-04-18'},
  {id: 4, content: 'item 4', start: '2013-04-16', end: '2013-04-19'},
  {id: 5, content: 'item 5', start: '2013-04-25'},
  {id: 6, content: 'item 6', start: '2013-04-27'}
])

// Configuration for the Timeline
const options = {
  width: '100%',
  align: center,
  autoResize: true,
  multiselect: true,
  editable: {
    add: true,
    remove: true,
    updateGroup: true,
    updateTime: true,
    overrideTimes: true
  },
  selectable: true,
  height: '30px',
  margin: {
    item: 20
  }
}

// Create a Timeline
const timeline = new vis.Timeline(container, items, options)
