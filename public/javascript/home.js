//FUNCTIONS CALLED BY EVENT HANDLERS
const nextButton = () => {
  $('.carousel').carousel('next')
}

const lastButton = () => {
  $('.carousel').carousel('prev')
}

const numButton = (event) => {
  const num = $(event.target)[0].innerHTML
  $('.carousel').carousel('set', num)

}

$('.modal').modal();

// DOCUMENT READY
$(document).ready(() => {
  // EVENT HANDLERS
  $('.dropdown-trigger').dropdown();
  $('.carousel').carousel()
  $('.next').click(nextButton)
  $('.prev').click(lastButton)
  $('.btn-small').click(numButton)

})
