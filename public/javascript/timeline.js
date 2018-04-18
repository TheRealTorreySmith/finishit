const getTimeline = () => {
  $.get('/home/:userId/timeline/default')
    .done((result) => {
      console.log(result)
      // DOM element where the Timeline will be attached
      const container = document.getElementById('visual')
      // Create object of events needed to populate timeline
      const filteredData = result.filter(x => x.id === 1)
      const dataArr = []
      const optionsArr = []
      for (let i = 0; i < filteredData.length; i++) {
        dataArr.push({
          id: i,
          content: result[i].name,
          description: result[i].description,
          start: result[i].start,
          end: result[i].end
        })
      }
      // Create a DataSet (allows two way data-binding)
      const items = new vis.DataSet(dataArr)

      // Create an options object that gives customized options to timeline
      const options = {
        template: (item, element, data) => {
          return `<p class="vis-title">${item.content}</p><br><p>${item.description}</p>`
        },
        zoomable: result[0].zoomable,
        timeAxis: result[0].timeAxis,
        orientation: result[0].orientation
      }
      const timeline = new vis.Timeline(container, items, options)
    })
}

$(document).ready(() => {

  getTimeline()

})
