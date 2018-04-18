const getTimeline = () => {
  $.get('/home/:userId/timeline/default')
    .done((result) => {
      // const container = document.getElementById('visual')
      // const items = new vis.DataSet([
      //   {
      //     id: result[0].id,
      //     content: result[0].name,
      //     description: result[0].description
      //   }
      // ])
      console.log(result)
    })
}

$(document).ready(() => {
  // DOM element where the Timeline will be attached

  // Create a DataSet (allows two way data-binding)
  getTimeline()

  // const timeline = new vis.Timeline(container, items, options)
})
