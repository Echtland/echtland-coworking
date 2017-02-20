export default function fitText(element) {
  const $this        = $(element),
        container    = $this.parent(),
        data         = $this.data(),
        baseFontSize =  parseInt($this.css('font-size')),
        minFontSize  = data.fittextMin ? (baseFontSize * data.fittextMin) : baseFontSize,
        maxFontSize  = data.fittextMax ? (baseFontSize * data.fittextMax) : Number.POSITIVE_INFINITY

  console.log(data)

  let text = $this.html()

  $this.html(`<span>${text}</span>`)
  text = $this.find('span:visible:first')

  let fontSize = minFontSize

  const resizer = () => {
    console.log(fontSize < maxFontSize)

    while (text.width() > container.width() && fontSize > minFontSize) {
      text.css('font-size', fontSize)
      fontSize = fontSize - 1
    }

    while (text.width() < container.width() && fontSize < maxFontSize) {
      text.css('font-size', fontSize)
      fontSize = fontSize + 1
    }

    $this.html(text)
  }

  resizer()

  $(window).on('resize.fittext orientationchange.fittext', resizer)
}

$.fn.fitText = function() {
  return this.each(function() {
    fitText(this)
  })
}
