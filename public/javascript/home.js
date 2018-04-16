const nextButton = () => {
  $('.carousel').carousel('next')
}

const lastButton = () => {
  $('.carousel').carousel('prev')
}

$(document).ready(() => {
  $('.dropdown-trigger').dropdown();
  $('.carousel').carousel()
  $('.next').click(nextButton)
  $('.prev').click(lastButton)

})
