/*canvas练习-动画demo*/
// let canvas = document.getElementById("myCanvas1");
// let ctx = canvas.getContext("2d");

/*京东大厦-动画demo*/
/*“运动动画”算法思路：初始化“拐弯点”，运动点由起始点出发，进入状态机(switch)，根据方向进入对应的斜线函数（根据公式求出x、y），当运动到“拐弯点”则改变方向；当运动到终点则将“起始点(x,y)设置为(0,0)并改变方向。”*/

/*运动点的位置坐标计算函数*/    ///gai2
// function runLeft(canvas_x, canvas_y, breakPoint_x1, breakPoint_y1, breakPoint_x2, breakPoint_y2){       //bug2:在每个canvas对象中调用该函数时，无法修改对象的坐标值！！

//     canvas_x = canvas_x - 1;
//     canvas_y = (canvas_x - breakPoint_x1) * (breakPoint_y2 - breakPoint_y1) / (breakPoint_x2 - breakPoint_x1) + breakPoint_y1;
//     console.log("坐标x:"+canvas_x,"坐标y:"+canvas_y);
// }
// const runRight = (canvas_x, canvas_y, breakPoint_x1, breakPoint_y1, breakPoint_x2, breakPoint_y2) => {
//     canvas_x = canvas_x + 1;
//     canvas_y = (canvas_x - breakPoint_x1) * (breakPoint_y2 - breakPoint_y1) / (breakPoint_x2 - breakPoint_x1) + breakPoint_y1;
// }
// const runUp = (canvas_x, canvas_y, breakPoint_x1, breakPoint_y1, breakPoint_x2, breakPoint_y2) => {
//     canvas_y = canvas_y - 1;
//     canvas_x = (canvas_y - breakPoint_y1) * (breakPoint_x2 - breakPoint_x1) / (breakPoint_y2 - breakPoint_y1) + breakPoint_x1;
// }


$(function () {
    //“京东大厦demo”动画点初始化
    // const startPoint = {
    //     x: 660, y: 336
    // }
    // const endPoint = {

    // }


    /**
     * 类定义：三条运动水流的定义，采用class有更佳的封装性
     */
    class canvas_Down {     //bug1:用字面量声明
        constructor() {
            this.startPoint = {
                x: 480,
                y: 482
            };
            this.endPoint = {
                x: 110,
                y: 536
            };
            this.location_x = this.startPoint.x;
            this.location_y = this.startPoint.y;
        }

        run() {
            // let r = 3;
            // let arpha = 1;
            // let _y = this.location_y;

            // ctx2.beginPath(); //开始一个新的绘制路径
            // ctx2.save();
            // ctx2.arc(this.location_x, this.location_y, r, 0, Math.PI * 2, true);
            // ctx2.fillStyle = 'rgba(0,223,223,' + arpha + ')';
            // ctx2.fill();
            // ctx2.closePath();
            // _y -= r * 1.5;
            // r -= 0.04;
            // arpha -= 0.02;
            ctx2.beginPath(); //开始一个新的绘制路径
            ctx2.save();
            ctx2.moveTo(this.location_x, this.location_y); //定义直线的起点坐标为(0,0)    
            if (this.location_x <= 110) {
                this.location_x = this.startPoint.x, this.location_y = this.startPoint.y;
                ctx2.moveTo(this.location_x, this.location_y); //重置起点坐标为
            } else {
                //runLeft(this.location_x, this.location_y, this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
                this.location_x = this.location_x - 5;
                this.location_y = (this.location_x - this.startPoint.x) * (this.endPoint.y - this.startPoint.y) / (this.endPoint.x - this.startPoint.x) + this.startPoint.y;
            }

            ctx2.lineTo(this.location_x, this.location_y);
            ctx2.lineCap = 'round';
            ctx2.lineWidth = 4; //设置线段的宽度
            ctx2.strokeStyle = "#66ccff";
            ctx2.stroke(); //沿着坐标点顺序的路径绘制直线
            ctx2.restore();

        }
    }

    class canvas_Left {
        constructor() {
            this.startPoint = {
                x: 90, y: 446
            };
            this.breakPoint = {
                x1: 386, y1: 300,
                x2: 384, y2: 248,
            };
            this.endPoint = {
                x: 90, y: 420
            };
            this.location_x = this.startPoint.x;
            this.location_y = this.startPoint.y;
            this.direction = "right";
        }
        run() {

            ctx2.beginPath(); //开始一个新的绘制路径
            ctx2.save();
            ctx2.moveTo(this.location_x, this.location_y); //定义直线的起点坐标为(0,0)
            switch (this.direction) {
                case 'right':
                    if (this.location_x >= 386) {
                        this.direction = 'up';
                    } else {
                        // runRight(this.canvasUp_x, this.canvasUp_y, this.startPoint.x, this.startPoint.y, this.breakPoint.x1, this.breakPoint.y1);
                        this.location_x = this.location_x + 5;
                        this.location_y = (this.location_x - this.startPoint.x) * (this.breakPoint.y1 - this.startPoint.y) / (this.breakPoint.x1 - this.startPoint.x) + this.startPoint.y;
                    }
                    break;
                case 'up':
                    if (this.location_y <= 248) {
                        this.direction = 'left';
                    } else {
                        // runUp(this.location_x, this.location_y, this.breakPoint.x1, this.breakPoint.y1, this.breakPoint.x2, this.breakPoint.y2);
                        this.location_y = this.location_y - 5;
                        this.location_x = (this.location_y - this.breakPoint.y1) * (this.breakPoint.x2 - this.breakPoint.x1) / (this.breakPoint.y2 - this.breakPoint.y1) + this.breakPoint.x1;
                    }
                    break;
                case 'left':
                    if (this.location_x <= 90) {
                        this.direction = 'right';
                        this.canvasUp_x = this.startPoint.x, this.location_y = this.startPoint.y;
                        ctx2.moveTo(this.location_x, this.location_y); //重置起点坐标为(0,0)
                    } else {
                        // runLeft(this.location_x, this.location_y, this.breakPoint.x2, this.breakPoint.y2, this.endPoint.x, this.endPoint.y);
                        this.location_x = this.location_x - 5;
                        this.location_y = (this.location_x - this.breakPoint.x2) * (this.endPoint.y - this.breakPoint.y2) / (this.endPoint.x - this.breakPoint.x2) + this.breakPoint.y2;
                    }
                    break;
            }
            ctx2.lineTo(this.location_x, this.location_y);
            ctx2.lineCap = 'round';
            ctx2.lineWidth = 4; //设置线段的宽度
            ctx2.strokeStyle = "#66ccff";
            ctx2.stroke(); //沿着坐标点顺序的路径绘制直线
            ctx2.restore();
        }
    }
    class canvas_Right {
        constructor() {
            this.startPoint = {
                x: 660, y: 386
            };
            this.breakPoint = {
                x1: 474, y1: 350,
                x2: 450, y2: 106,
            };
            this.endPoint = {
                x: 620, y: 178
            };
            this.location_x = this.startPoint.x;
            this.location_y = this.startPoint.y;
            this.direction = "left";
        }
        run() {

            ctx2.beginPath(); //开始一个新的绘制路径
            ctx2.save();
            ctx2.moveTo(this.location_x, this.location_y); //定义直线的起点坐标为(0,0)  改
            switch (this.direction) { //gai
                case 'left':
                    if (this.location_x <= 474) {
                        this.direction = 'up';//gai
                    } else {    ///bug:由于外部调用函数，无法修改对象的“坐标位置”，暂时不采用函数封装形式
                        // runLeft.call(this,this.location_x, this.location_y, this.startPoint.x, this.startPoint.y, this.breakPoint.x1, this.breakPoint.y1);
                        this.location_x = this.location_x - 5;
                        this.location_y = (this.location_x - this.startPoint.x) * (this.breakPoint.y1 - this.startPoint.y) / (this.breakPoint.x1 - this.startPoint.x) + this.startPoint.y;
                    }
                    break;
                case 'up':
                    if (this.location_y <= 106) {
                        this.direction = 'right';//
                    } else {    ///gai2
                        // runUp(this.location_x, this.location_y, this.breakPoint.x1, this.breakPoint.y1, this.breakPoint.x2, this.breakPoint.y2);
                        this.location_y = this.location_y - 5;
                        this.location_x = (this.location_y - this.breakPoint.y1) * (this.breakPoint.x2 - this.breakPoint.x1) / (this.breakPoint.y2 - this.breakPoint.y1) + this.breakPoint.x1;
                    }
                    break;
                case 'right':
                    if (this.location_x >= 620) {
                        this.direction = 'left';//
                        this.location_x = this.startPoint.x, this.location_y = this.startPoint.y;//
                        ctx2.moveTo(this.location_x, this.location_y); //重置起点坐标为(0,0)    gai
                    } else {    ///gai2
                        //runRight(this.location_x, this.location_y, this.breakPoint.x2, this.breakPoint.y2, this.endPoint.x, this.endPoint.y);
                        this.location_x = this.location_x + 5;
                        this.location_y = (this.location_x - this.breakPoint.x2) * (this.endPoint.y - this.breakPoint.y2) / (this.endPoint.x - this.breakPoint.x2) + this.breakPoint.y2;
                    }
                    break;
            }
            ctx2.lineTo(this.location_x, this.location_y);//
            ctx2.lineCap = 'round';
            ctx2.lineWidth = 4; //设置线段的宽度
            ctx2.strokeStyle = "#66ccff";
            ctx2.stroke(); //沿着坐标点顺序的路径绘制直线
            ctx2.restore();
        }

    }


    /****动画主程序开始*****/
    let canvas2 = document.getElementById("myCanvas2");
    let ctx2 = canvas2.getContext("2d");
    let canvasLeft = new canvas_Left();
    let canvasDown = new canvas_Down();
    let canvasRight = new canvas_Right();


    const setting = {
        speed: 45,
        radius: 0.6,
    }


    setInterval(function () {

        /*京东大厦--动画demo*/
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        canvasRight.run();
        canvasDown.run();
        canvasLeft.run();

    }, setting.speed);
}) 