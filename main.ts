namespace SpriteKind {
    export const boss = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.boss, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    scene.cameraShake(4, 1000)
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.UntilDone)
    info.changeLifeBy(-2)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (10 <= info.score()) {
        mySprite.startEffect(effects.hearts, 2000)
        music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.UntilDone)
        info.changeScoreBy(-10)
        info.changeLifeBy(1)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 . . . . . . . . 
        . . . . . 2 2 2 2 . . . . . . . 
        . . . . . 2 2 4 2 2 . . . . . . 
        . . . . . 2 2 4 2 2 . . . . . . 
        . . . . . 2 4 5 2 2 . . . . . . 
        . . . . . 2 1 1 5 2 . . . . . . 
        . . . . . 2 5 1 5 2 . . . . . . 
        . . . . . 2 4 5 2 2 . . . . . . 
        . . . . . 2 2 5 2 2 . . . . . . 
        . . . . . . 2 4 2 . . . . . . . 
        . . . . . . 2 4 2 . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . 2 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 0, -150)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
function asteroidLogic (astroid: Sprite) {
    speed = randint(50, 100) + game.runtime() / 1000
    astroid.setVelocity(0, speed)
    astroid.setPosition(randint(3, 150), 0)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.boss, function (sprite, otherSprite) {
    if (bigboiHP == 1) {
        sprites.destroy(otherSprite, effects.disintegrate, 2000)
        sprites.destroy(sprite)
        music.play(music.melodyPlayable(music.magicWand), music.PlaybackMode.UntilDone)
        info.changeScoreBy(5)
        info.changeLifeBy(1)
    } else {
        animation.runMovementAnimation(
        otherSprite,
        animation.animationPresets(animation.shake),
        200,
        false
        )
        bigboiHP += -1
        music.play(music.melodyPlayable(music.thump), music.PlaybackMode.UntilDone)
        sprites.destroy(sprite)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fire, 100)
    sprites.destroy(sprite)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    scene.cameraShake(4, 500)
    music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.UntilDone)
    info.changeLifeBy(-1)
})
let asteroide: Sprite = null
let bigboi: Sprite = null
let bigboiHP = 0
let speed = 0
let projectile: Sprite = null
let mySprite: Sprite = null
mySprite = sprites.create(img`
    ........b........
    .......bbb.......
    .......b2b.......
    .......322.......
    ......32222......
    ......32222......
    .....3211922.....
    .....3119992.....
    .b...3299922...b.
    .b...3222222...b.
    .c..322199222..c.
    .c.32211996222.c.
    33322119999622222
    .222222222222222.
    .222222222222222.
    .e2e2e2e2e2e2e2e.
    ..e2e2e2e2e2e2e..
    ...ccc.....ccc...
    ..bbbbb...bbbbb..
    .................
    `, SpriteKind.Player)
effects.starField.startScreenEffect()
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
mySprite.bottom = 120
info.setLife(3)
game.onUpdateInterval(750 - game.runtime() / 1000, function () {
    if (Math.percentChance(3)) {
        bigboi = sprites.create(img`
            .................111111111111111.................
            ...............11ccccccccccccccc11...............
            .............11ccccccccccccccccccc11.............
            ...........11ccccccccccccccccccccccc11...........
            .........11ccccccccccccccccccccccccccc11.........
            ........1ccccccccccccccccccccccccccccccc1........
            .......1ccccccccccccccccccccccccccccccccc1.......
            ......1ccccccccccccccccccccccccccccccccccc1......
            .....1ccccccccccccccccccccccccccccccccccccc1.....
            ....1cccccccccccccccaaaaaccccccccccccccccccc1....
            ....1ccccccccccccccacccccacccccccccccccccccc1....
            ...1cccccccccccccccacccccaccccccccccccccccccc1...
            ...1cccccccccccccccacccccaccccccccccccccccccc1...
            ..1ccccccccccccccccacccccacccccccccccccccccccc1..
            ..1ccccccccccccccccacccccacccccccccccccccccccc1..
            .1ccccccccccccccccccaaaaacccccccccccccccccccccc1.
            .1ccccccccccccccccccccccccccccccccccccccccccccc1.
            1ccccccccccccccccccccccccccccccccccccccccccccccc1
            1cccaaaccccccccccccccccccccccccccccccccccccccccc1
            1cccacaccccccccccccccccccccccccccccccccccccccccc1
            1cccaaaccccccccccccccccccccccccccccccccccccccccc1
            1ccccccccccccccccccccccccccccccccccccccccccccccc1
            1ccccccccccccccccccccccccccccccccccccccccccccccc1
            1ccccccccccccccccccccccccccccccccccccccccccccccc1
            1ccccccccccccccccccccccccccccccccccccccccccccccc1
            1ccccccccccccccccccccccccccccccccccccccccccccccc1
            1ccccccccccccccccccccccccccccccccccccccccccccccc1
            1cccccccccccccaaaaaaaccccccccccccccccccccccccccc1
            1ccccccccccccacccccccaccccccccccaaaaaccccccccccc1
            1cccccccccccacccccccccaccccccccacccccacccccccccc1
            1ccccccccccacccccccccccacccccccacccccacccccccccc1
            1ccccccccccacccccccccccacccccccacccccacccccccccc1
            .1cccccccccacccccccccccacccccccacccccaccccccccc1.
            .1cccccccccacccccccccccacccccccacccccaccccccccc1.
            ..1ccccccccacccccccccccaccccccccaaaaaccccccccc1..
            ..1ccccccccacccccccccccacccccccccccccccccccccc1..
            ...1cccccccacccccccccccaccccccccccccccccccccc1...
            ...1ccccccccacccccccccacccccccccccccccccccccc1...
            ....1ccccccccacccccccacccccccccccccccccccccc1....
            ....1cccccccccaaaaaaaccccccccccccccccccccccc1....
            .....1ccccccccccccccccccccccccccccccccccccc1.....
            ......1ccccccccccccccccccccccccccccccccccc1......
            .......1ccccccccccccccccccccccccccccccccc1.......
            ........1ccccccccccccccccccccccccccccccc1........
            .........11ccccccccccccccccccccccccccc11.........
            ...........11ccccccccccccccccccccccc11...........
            .............11ccccccccccccccccccc11.............
            ...............11ccccccccccccccc11...............
            .................111111111111111.................
            `, SpriteKind.boss)
        bigboi.setPosition(75, -20)
        bigboi.setVelocity(0, 10)
        bigboi.setFlag(SpriteFlag.AutoDestroy, true)
        bigboiHP = 10
    } else {
        asteroide = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . b b . . 1 1 1 1 1 . . . b . 
            . . b b . 1 b b b b b 1 . . . . 
            . . . . 1 b b b b b b b 1 . . . 
            . . . 1 b b c b b b b b b 1 . . 
            . . 1 b b b b b b c b b b b 1 . 
            . . 1 b b b b b b b b b b b 1 . 
            . . 1 b b c b b b b b b b b 1 . 
            . . 1 b b c c b b b b b b b 1 . 
            . . 1 b b b b b b b b c b b 1 . 
            . . . 1 b b b b b b c c b 1 . . 
            . . . . 1 b b b b b b b 1 . . . 
            . . b b . 1 b b b b b 1 . . b . 
            . . . b . . 1 1 1 1 1 . b b b . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy)
        asteroide.setFlag(SpriteFlag.AutoDestroy, true)
        asteroidLogic(asteroide)
    }
})
