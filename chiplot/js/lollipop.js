import {XYPlot} from "/static/xiaochiPlot/minJS/XYPlot.min.js"


class LollipopPlot extends XYPlot{

    constructor(){
        super([
            "color block of xAxis",
            "color block of yAxis"
        ]); // 调用父类的constructor(x,y)
        const self = this

        let layerTypeDict = {
            "size scale":function (parms) {
                let {layerType,
                    dataSource,
                    idSuffix,
                    controlData,
                    categoryList,
                    otherData,
                    legendDragData} = parms


                if(!this.datacheck(["number"])){
                    return null

                }
                //  获取有数值那一列的列名
                let numColumnName  = dataSource.columns[this.currentChenkedColumns[0]]


                //    计算最大值
                let [minValue,maxValue] = d3.extent(dataSource, row=>row[numColumnName])


                controlData  =  {
                    "lollipop":{
                        "Lollipop size":{
                            "min-radius":{
                                type:"seq",
                                value:4,
                                isSvgAttr:true,
                                scaleStep:1,
                                min:0,
                                max:Infinity
                            },
                            "max-radius":{
                                type:"seq",
                                value:20,
                                isSvgAttr:true,
                                scaleStep:1,
                                min:0,
                                max:Infinity
                            },
                        },

                    },
                    "legend":self.legendObj.getLegendControlData("baseSizeLegend",cd=>{
                        cd["Legend title"].text.value = dataSource.columns[this.currentChenkedColumns[0]]
                        cd.Circle["range-step"].value = Number(d3.format(".1r")((maxValue-minValue)/5))
                        return cd
                    })


                }


                return {controlData,
                    categoryList,
                    otherData,
                    legendDragData}

            },
            "color scale":function (parms) {
                let {layerType,
                    dataSource,
                    idSuffix,
                    controlData,
                    categoryList,
                    otherData,
                    legendDragData} = parms


                if(!this.datacheck(["number"])){
                    return null

                }


                controlData  =  {
                    "lollipop":{
                        "Color bar":{
                            color:{
                                type:"button",
                                value:"",
                                iconClass:"cuIcon-file",
                                event:"chooseColorBar"
                            },


                        },

                    },
                    "legend":self.legendObj.getLegendControlData("colorBarLegend",idSuffix,cd=> {
                        cd["Legend title"].text.value = dataSource.columns[this.currentChenkedColumns[0]]
                        return cd
                    })


                }


                return {controlData,
                    categoryList,
                    otherData,
                    legendDragData}

            },
        }
        for(let key in layerTypeDict){
            this.layerComponent.addLayerType(key, layerTypeDict[key])
        }



    }
    drawSizeScale(){
        const self = this
        let barPlotData = self.layerPlaneData.layerStatistic["size scale"] || []
        if(barPlotData.length>0){
            if(barPlotData[barPlotData.length-1].isShowObj.isShow){
                this.figureData.lollipop["Lollipop style"].r.isSvgAttr = false
                let layer = barPlotData[barPlotData.length-1]
                let dataSource = this.layerDataDict[layer.layerDataFlieKey].dataSource;
                let dataIndex = this.layerDataDict[layer.layerDataFlieKey].dataIndex;

                //  获取有数值那一列的列名
                let numColumnName  = dataSource.columns[layer.layerDataColumnsIndex[0]]


                //    计算最大值
                let [minValue,maxValue] = d3.extent(dataSource, row=>row[numColumnName])



                let rScale = d3.scaleLinear()
                    .domain([minValue,maxValue])
                    .range([layer.controlData.lollipop["Lollipop size"]["min-radius"].value,  layer.controlData.lollipop["Lollipop size"]["max-radius"].value])

                layer.rScale = rScale


                d3.selectAll(`.${this.figureData.lollipop["Lollipop style"].id}`)
                    .filter(d=>dataIndex.has(d.innerScaleKey))
                    .attr("r",d=>{
                        console.log(d)
                        return rScale(Math.abs(dataIndex.get(d.innerScaleKey)[numColumnName]))
                    })
            }else {
                this.figureData.lollipop["Lollipop style"].r.isSvgAttr = true
            }
        }



    }
    drawColorScale(){
        const self = this
        let barPlotData = self.layerPlaneData.layerStatistic["color scale"] || []
        if(barPlotData.length>0 && barPlotData[barPlotData.length-1].isShowObj.isShow){
            let layer = barPlotData[barPlotData.length-1]
            let dataSource = this.layerDataDict[layer.layerDataFlieKey].dataSource;
            let dataIndex = this.layerDataDict[layer.layerDataFlieKey].dataIndex;

            //  获取有数值那一列的列名
            let numColumnName  = dataSource.columns[layer.layerDataColumnsIndex[0]]


            //    计算最大值

            let mmv = d3.extent(dataSource, row=>row[numColumnName])
            let maxValue =  parseFloat(layer.controlData.legend["ColorBar range"]["max-value"].value) || 0
            if(maxValue>mmv[1]){
                mmv[1] = maxValue
            }
            let minValue =  parseFloat(layer.controlData.legend["ColorBar range"]["min-value"].value) || 0
            if(minValue<mmv[0]){
                mmv[0] = minValue
            }
            layer.mmv = mmv

            let legendElement = layer.controlData.legend["ColorBar range"];

            let colorScale =  d3.scaleSequential(layer.controlData.legend["ColorBar range"]["reverse"].value ? [layer.mmv[1],layer.mmv[0]]:layer.mmv, d3[layer.colorInterpolate || "interpolateRdBu"])
            if(layer.controlData.legend["ColorBar range"]["median-value"].value){
                let medianValue = Number(layer.controlData.legend["ColorBar range"]["median-value"].value)
                colorScale = (v)=>{
                    let scale = d3.scaleLinear().domain(
                        layer.controlData.legend["ColorBar range"]["reverse"].value ? [mmv[1],medianValue,mmv[0]]:[mmv[0],medianValue,mmv[1]]
                    ).range([0,0.5,1])
                    return d3[layer.colorInterpolate || "interpolateRdBu"](scale(v))
                }
            }


            d3.selectAll(`.${this.figureData.lollipop["Lollipop style"].id}`)
                .filter(d=>dataIndex.has(d.innerScaleKey))
                .attr("fill",d=>{
                    console.log(d)
                    return colorScale(dataIndex.get(d.innerScaleKey)[numColumnName])
                })
        }


    }


    drawLegend(){

        super.drawLegend()
        let sizeScale = this.layerPlaneData.layerStatistic["size scale"] || []
        if(sizeScale.length>0 && sizeScale[sizeScale.length-1].isShowObj.isShow){
            let layer = sizeScale[sizeScale.length-1]
            this.legendObj.drawBaseSizeLegend(layer.controlData.legend,layer.rScale.domain(),layer.rScale,layer.legendDragData)
        }
        let colorScale = this.layerPlaneData.layerStatistic["color scale"] || []
        if(colorScale.length>0 && colorScale[colorScale.length-1].isShowObj.isShow){
            let layer = colorScale[colorScale.length-1]
            let medianValue = undefined
            if(layer.controlData.legend["ColorBar range"]["median-value"].value) {
                medianValue = Number(layer.controlData.legend["ColorBar range"]["median-value"].value)
            }
            this.legendObj.drawColorBarLegend(
                layer.controlData.legend,
                layer.mmv,
                d3[layer.colorInterpolate || "interpolateRdBu"],
                layer.legendDragData,
                medianValue
            )
        }






    }




}


export {LollipopPlot}