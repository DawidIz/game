console.log('sprite')

const DATA = {
    image : {
        src : './img/body.png',
        width : 320,
        height : 420
    },
    tile : {
        width : 80,
        height : 105
    },
    ANIMATION_TYPE : {
        DEFAULT : 'DEFAULT',
        LEFT : 'LEFT',
        RIGHT : 'RIGHT',
        
    },
    animation : {
        'DEFAULT' : [
            {x:0,y:0,t:200},
            {x:1,y:0,t:200},
            {x:2,y:0,t:200},
            {x:3,y:0,t:200},
        ],
        'LEFT' : [
            {x:0,y:1,t:200},
            {x:1,y:1,t:200},
            {x:2,y:1,t:200},
            {x:3,y:1,t:200},
        ],
        'RIGHT' : [
            {x:0,y:2,t:200},
            {x:1,y:2,t:200},
            {x:2,y:2,t:200},
            {x:3,y:2,t:200},
        ],
        'UP' : [
            {x:0,y:3,t:200},
            {x:1,y:3,t:200},
            {x:2,y:3,t:200},
            {x:3,y:3,t:200},
        ],
    }
}


class Sprite{
    constructor(data = DATA){
        this.data = data
        this.t = Date.now()
        this.dt = 0
        this.current_frame = null
        this.frames = []

        this.image = new Image()
        this.image.src = data.image.src
        this.sprite = document.createElement('canvas')
        this.context = this.sprite.getContext('2d')

        this.setAnimation(data.ANIMATION_TYPE.DEFAULT)
    }

    setAnimation(type){
        this.dt = 0
        this.current_frame = -1
        this.frames = this.data.animation[type]
        this.update()
    }

    update(){
        const time = Date.now()
        if(this.t + this.dt < time){
            this.current_frame = (this.current_frame + 1) % this.frames.length
            const frame = this.frames[this.current_frame]

            this.t = time
            this.dt = frame.t
            const {width,height} = this.data.tile

            this.context.clearRect(0,0,width,height)

            this.context.drawImage(
                this.image,
                frame.x * width,
                frame.y * height,
                width,
                height,
                0,
                0,
                width,
                height
            )
        }
    }
}