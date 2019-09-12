console.log('map')

const TXT = [
    {id : 'grass', color: 'green'},
    {id : 'water', color: 'blue'},
]

const MAP_OPTIONS = {
    tile : {
        width : 20,
        height : 20
    },

    size : {
        cols : 40,
        rows : 30
    }
}


class Map{
    constructor(){

        this.cols = MAP_OPTIONS.size.cols
        this.rows = MAP_OPTIONS.size.rows

        this.tile_w = MAP_OPTIONS.tile.width
        this.tile_h = MAP_OPTIONS.tile.height

        this.width = this.cols * this.tile_w
        this.height = this.rows * this.tile_h

        this.map_canvas = document.createElement('canvas')
        this.map_canvas.height = this.height
        this.map_canvas.width = this.width
        this.map_ctx = this.map_canvas.getContext('2d')

        this.map_tiles = []
        
        this.map_ctx.fillRect(0,0,this.width,this.height)

        this.random_map()

    }

    random_map(){
        const tiles = this.cols * this.rows
        const t = TXT.length
        for(let i = 0; i < tiles ; i++){
            let n = Math.floor(Math.random() * t)
            this.map_tiles.push(n)
        }
        this.generate_map()
    }

    generate_map(){
        for(let row = 0; row < this.rows; row++){
            for(let col = 0; col < this.cols ; col++){
                let id = row * this.cols + col
                this.map_ctx.fillStyle = TXT[this.map_tiles[id]].color

                let x = col * this.tile_w
                let y = row * this.tile_h
                let w = x + this.tile_w
                let h = y + this.tile_h

                this.map_ctx.fillRect(x,y,w,h)
            }
        }
    }
}