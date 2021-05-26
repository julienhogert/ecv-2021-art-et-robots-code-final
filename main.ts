function stop () {
    maqueen.motorStop(maqueen.Motors.All)
}
input.onButtonPressed(Button.A, function () {
    onoff = !(onoff)
    extinctionallumage()
})
function demitour (vitesse: number) {
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, vitesse)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, vitesse)
}
function extinctionallumage () {
    if (onoff) {
        basic.showIcon(IconNames.Yes)
        strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
        music.setBuiltInSpeakerEnabled(true)
        avancer(30)
    } else {
        stop()
        music.setBuiltInSpeakerEnabled(false)
        basic.showIcon(IconNames.No)
        strip.clear()
    }
    basic.clearScreen()
}
radio.onReceivedString(function (receivedString) {
    if (receivedString == "ON") {
        onoff = true
        extinctionallumage()
    } else if (receivedString == "OFF") {
        onoff = false
        extinctionallumage()
    } else {
    	
    }
})
function avancer (vitesse: number) {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, vitesse)
}
function tourner (direction: number) {
    if (direction > 0) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, vitesse + Math.abs(direction))
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, vitesse - Math.abs(direction))
        basic.showArrow(ArrowNames.West)
    } else {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, vitesse - Math.abs(direction))
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, vitesse + Math.abs(direction))
        basic.showArrow(ArrowNames.East)
    }
}
function test_dessin () {
    for (let index = 0; index < 2; index++) {
        dessiner(true)
        basic.pause(1000)
        dessiner(false)
        basic.pause(1000)
    }
}
function detect (distobstacle: number) {
    if (maqueen.Ultrasonic(PingUnit.Centimeters) <= distobstacle && maqueen.Ultrasonic(PingUnit.Centimeters) > 0) {
        demitour(40)
        basic.showIcon(IconNames.Sad)
        basic.pause(500)
        avancer(vitesse)
        basic.clearScreen()
    }
}
function dessiner (onoff: boolean) {
    dessin_onoff = onoff
    if (dessin_onoff) {
        maqueen.servoRun(maqueen.Servos.S1, pos_dessin_on)
    } else {
        maqueen.servoRun(maqueen.Servos.S1, pos_dessin_off)
    }
}
let dessin_onoff = false
let pos_dessin_off = 0
let pos_dessin_on = 0
let onoff = false
let vitesse = 0
let strip: neopixel.Strip = null
strip = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
vitesse = 80
onoff = true
pos_dessin_on = 90
pos_dessin_off = 60
test_dessin()
extinctionallumage()
basic.forever(function () {
    if (onoff) {
        detect(20)
    }
})
