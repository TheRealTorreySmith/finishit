// GETS AND SETS THE CURRENT DATE AS THE DEFAULT START DATE
const getCurrentDate = () => {
  let today = new Date()
  let dd = today.getDate()
  let mm = today.getMonth()+1
  let yyyy = today.getFullYear()
  if(dd<10) {
      dd = '0'+dd
  }
  if(mm<10) {
      mm = '0'+mm
  }
  today = mm + '/' + dd + '/' + yyyy
  dbToday = yyyy + '-' + mm + '-' + dd
  console.log(today)
  console.log(dbToday)
  $('#start-date').val(today)
}

const changeDefaultStartDate = () => {
  $('#start-date').val('')
}



$(document).ready(() => {
getCurrentDate()
$('#start-date').focus(changeDefaultStartDate)
// $('#start-date').keyup(checkDate)

})
