//极坐标系

import {MainPlot} from "/static/xiaochiPlot/minJS/mainplot.min.js"

class PolarPlot extends MainPlot{
    constructor(){
        super("data file"); // 调用父类的constructor(x,y)

        this.figureData.xAxis = {
            "Text style":{
                "id":"xAxis-tick-text",
                "switch": {
                    type: "check",
                    value: true,
                    isFresh: true

                },
                "rotate": {
                    type: "seq",
                    value: 90,
                    isSvgAttr: false,
                    scaleStep: 1,
                    min: -Infinity,
                    max: Infinity

                },
                "font-size":{
                    type:"seq",
                    value:14,
                    isSvgAttr:true,
                    scaleStep:1,
                    min:0,
                    max:Infinity

                },
                "fill":{
                    type:"color",
                    value:"#000000",
                    isSvgAttr:true
                },
                "font-weight":{
                    type:"opt",
                    optionList:["normal","bold"],
                    value:0,
                    isSvgAttr:true
                },
                "text-anchor":{
                    type:"opt",
                    optionList:["start","middle","end"],
                    value:1,
                    isSvgAttr:true
                },
                "font-style":{
                    type:"opt",
                    optionList:["normal","italic"],
                    value:0,
                    isSvgAttr:true
                },
                "y":{
                    type:"seq",
                    value:20,
                    isSvgAttr:false,
                    scaleStep:1,
                    min:-Infinity,
                    max:Infinity

                }
            },
            // "Tick":{
            //
            //     "removeTick":{
            //         type:"check",
            //         value:false,
            //         isFresh:true
            //
            //     },
            // },
            "Grid":{
                "id":"xAxis-grid-line",
                "switch":{
                    type:"check",
                    value:false,
                    isFresh:true

                },
                "stroke":{
                    type:"color",
                    value:"#000000",
                    isSvgAttr:true
                },
                "stroke-width":{
                    type:"seq",
                    value:1,
                    isSvgAttr:true,
                    scaleStep:1,
                    min:0,
                    max:Infinity
                },
                "stroke-opacity":{
                    type:"seq",
                    value:0.1,
                    isSvgAttr:true,
                    scaleStep:0.01,
                    min:0,
                    max:1
                }
            },
        }



        this.figureData.yAxis = {
            "Text style":{
                "id":"yAxis-tick-text",
                "switch": {
                    type: "check",
                    value: true,
                    isFresh: true

                },
                "rotate":{
                    type:"seq",
                    value:0,
                    isSvgAttr:false,
                    scaleStep:1,
                    min:0,
                    max:360

                },

                "font-size":{
                    type:"seq",
                    value:14,
                    isSvgAttr:true,
                    scaleStep:1,
                    min:0,
                    max:Infinity

                },
                "fill":{
                    type:"color",
                    value:"#000000",
                    isSvgAttr:true
                },
                "font-weight":{
                    type:"opt",
                    optionList:["normal","bold"],
                    value:0,
                    isSvgAttr:true
                },
                "text-anchor":{
                    type:"opt",
                    optionList:["start","middle","end"],
                    value:1,
                    isSvgAttr:true
                },
                "font-style":{
                    type:"opt",
                    optionList:["normal","italic"],
                    value:0,
                    isSvgAttr:true
                },

            },
            "Tick":{


            },
            "Grid":{
                "id":"yAxis-grid-line",

                "switch":{
                    type:"check",
                    value:false,
                    isFresh:true

                },
                "stroke":{
                    type:"color",
                    value:"#000000",
                    isSvgAttr:true
                },
                "stroke-width":{
                    type:"seq",
                    value:1,
                    isSvgAttr:true,
                    scaleStep:1,
                    min:0,
                    max:Infinity
                },
                "stroke-opacity":{
                    type:"seq",
                    value:0.1,
                    isSvgAttr:true,
                    scaleStep:0.01,
                    min:0,
                    max:1
                }
            },


        }


        this.figureData["background"]={
            "Background":{
                "id":"background-rect-style",
                "switch":{
                    type:"check",
                    value:false,
                    isFresh:true

                },
                "fill":{
                    type:"color",
                    value:"#eaeaf1",
                    isSvgAttr:true
                },
                "fill-opacity":{
                    type:"seq",
                    value:1,
                    isSvgAttr:true,
                    scaleStep:0.01,
                    min:0,
                    max:1
                },
            }
        }

    }
    init() {
        super.init();

        this.polarGroup = this.maingroup.append('g')
            .attr("transform",`translate(${this.innerwidth/2},${this.innerHeight/2})`)
    }

    addAxis(yGridType="arc", innerRadius=0){
        if(this.figureData.background.Background.switch.value){

            let arc = d3.arc()
                .innerRadius(innerRadius)
                .outerRadius(this.outerRadius)
                .startAngle(0)
                .endAngle(Math.PI*2)

            this.backgroundG = this.polarGroup
                .append("g")

            this.backgroundG
                .append("path")
                .attr("d", arc())
                .attr('class',this.figureData.background.Background.id)
                .call(rect=>{
                    this.renderAttr(rect, this.figureData.background.Background)
                })


        }
        let xAxis = g => g
            .call(g => g.selectAll("g")
                .data(this.xScale.domain())
                .enter()
                .append("g")
                .attr("transform", d => `
          rotate(${((this.xScale(d) + (this.plotType == "radarPlot" ? 0: this.xScale.bandwidth() / 2)) * 180 / Math.PI - 90)})
          translate(${this.outerRadius + this.figureData.xAxis["Text style"].y.value},0)
        `)

                .call(g => {


                    if(this.figureData.xAxis["Text style"].switch.value){
                        g.append("text")
                            .attr("class", this.figureData.xAxis["Text style"].id)
                            .attr("transform", d => {

                                if(this.plotType == "radarPlot"){

                                    return `rotate(${-((this.xScale(d) + (this.plotType == "radarPlot" ? 0 : this.xScale.bandwidth() / 2)) * 180 / Math.PI - 90)})`


                                }else {

                                    return (this.xScale(d) + ( this.xScale.bandwidth() / 2) ) < Math.PI
                                        ? `rotate(${this.figureData.xAxis["Text style"].rotate.value})`
                                        : `rotate(${this.figureData.xAxis["Text style"].rotate.value-180})`
                                }

                            })
                            .attr("dy","0.35em")
                            .text(d => d)
                            .call(T=>{
                                if(this.plotType == "radarPlot"){
                                    T.attr("text-anchor",d=>this.xScale(d)<Math.PI ? "start":"end")
                                }
                                this.renderAttr(T, this.figureData.xAxis["Text style"])
                            })
                    }

                    }
                ))
            .call(g=>{

                let gridObj = this.figureData.xAxis.Grid

                console.log(this.plotType)


                if (gridObj.switch.value){
                    //x轴网格
                    g.selectAll("gridG")
                        .data(this.xScale.domain())
                        .enter()
                        .append("g")
                        .attr("transform", d => `
          rotate(${((this.xScale(d) + (this.plotType == "radarPlot" ? 0 : this.xScale.bandwidth() / 2)) * 180 / Math.PI - 90)})
          translate(${0},0)`)
                        .call(g => g.append("line")
                            .attr("x2", this.outerRadius)
                            .attr("x1", this.innerRadius)
                            .attr("class", this.figureData.xAxis.Grid.id)
                            .call(line=>this.renderAttr(line,this.figureData.xAxis.Grid)))
                }


            })


        const yAxisTick = this.figureData.yAxis.Tick
        let tickValues = this.yScale.ticks().slice(1,-1)
        if(yAxisTick.hasOwnProperty("tickValues") && yAxisTick.tickValues.value){
            tickValues = yAxisTick.tickValues.value.split(",")


        }


        let yAxis = g => g

            .call(g=>{

                g.selectAll("circleG")
                    .data(tickValues)
                    .join("g")
                    .attr("transform", d => `rotate(${this.figureData.yAxis["Text style"].rotate.value})`)
                    .call(g => {
                        let gridObj = this.figureData.yAxis.Grid

                        if(gridObj.switch.value){
                            //y轴网格

                            if (yGridType == "line"){
                                let line = d3.lineRadial()
                                    .radius(d => d.radius)
                                    .angle(d => d.angle)

                                g.append("path")
                                    .attr("d",d=> {
                                        let lineData = this.xScale.domain().map(key=>{
                                            return{
                                                angle:this.xScale(key) + (this.plotType == "radarPlot" ? 0 : this.xScale.bandwidth() / 2),
                                                radius:this.yScale(d)
                                            }
                                        })
                                        return line(lineData) + "Z"
                                    })
                                    .attr("fill", "none")
                                    .attr("class", gridObj.id)
                                    .call(cirle=>this.renderAttr(cirle,gridObj))
                            }else {
                                g.append("circle")
                                    .attr("r", this.yScale)
                                    .attr("fill", "none")
                                    .attr("class", gridObj.id)
                                    .call(cirle=>this.renderAttr(cirle,gridObj))
                            }

                        }




                        if(this.figureData.yAxis["Text style"].switch.value){
                            g.append("text")
                                .attr("y", d => -this.yScale(d))
                                .attr("dy", "0.35em")
                                .attr("class", this.figureData.yAxis["Text style"].id)
                                .text(d=>d)
                                .call(T=>{
                                    this.renderAttr(T, this.figureData.yAxis["Text style"])
                                })
                        }




                    })




            })


        const xAxisGroup = this.polarGroup.append('g')
            .call(xAxis).attr('id','xAxis');

        const yAxisGroup = this.polarGroup.append('g')
            .call(yAxis).attr('id','yAxis');

    }



}

export {
    PolarPlot
}