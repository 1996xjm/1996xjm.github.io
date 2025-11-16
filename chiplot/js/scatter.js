import {XYPlot} from "https://1996xjm.github.io/chiplot/minJS1/XYPlot.min.js"


class ScatterPlot extends XYPlot{

    constructor(defaultLayerTypeArr=[]){
        super(); // 调用父类的constructor(x,y)
        const self = this

        let layerTypeDict = {
            "modify shape and color":function (parms) {
                let {layerType,
                    dataSource,
                    idSuffix,
                    controlData,
                    categoryList,
                    otherData,
                    legendDragData} = parms


                if(!this.datacheck([""])){
                    return null

                }


                controlData  =  {
                    "symbol":{
                        "Color set":{
                            color:{
                                type:"button",
                                value:"",
                                iconClass:"cuIcon-file",
                                event:"chooseColor"
                            }
                        },
                        "symbol type":{

                        },
                        "symbol color":{
                            "switch":{
                                type:"check",
                                value:false,
                                isFresh:true

                            },

                        },
                        "symbol style":{
                            "stroke-width": {
                                type: "seq",
                                value: 1,
                                isSvgAttr: true,
                                scaleStep: 1,
                                min: 0,
                                max: Infinity
                            },
                            "fill-opacity": {
                                type: "seq",
                                value: 1,
                                isSvgAttr: true,
                                scaleStep: 0.01,
                                min: 0,
                                max: 1
                            },
                            "size":{
                                type:"seq",
                                value:40,
                                isSvgAttr:false,
                                scaleStep:1,
                                min:30,
                                max:Infinity
                            }
                        },
                        "Radiation line":{
                            "id":"radiation-line-style",
                            "switch":{
                                type:"check",
                                value:false,
                                isFresh:true

                            },
                            "stroke-as-symbol":{
                                type:"check",
                                value:false,
                                isFresh:true

                            },
                            "stroke":{
                                type:"color",
                                value:"#888888",
                                isSvgAttr:false
                            },
                            "stroke-dash":{
                                type:"check",
                                value:false,
                                isFresh:true

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
                                value:1,
                                isSvgAttr:true,
                                scaleStep:0.01,
                                min:0,
                                max:1
                            }

                        },

                    },
                    "ellipse":{
                        "confidence level":{
                            "level": {
                                type: "seq",
                                value: 0.95,
                                isSvgAttr: false,
                                scaleStep: 0.01,
                                min: 0,
                                max: 1
                            }
                        },
                        "ellipse style":{
                            "switch":{
                                type:"check",
                                value:false,
                                isFresh:true

                            },
                            "fill-opacity": {
                                type: "seq",
                                value: 0.3,
                                isSvgAttr: true,
                                scaleStep: 0.01,
                                min: 0,
                                max: 1
                            },
                            "stroke-as-fill":{
                                type:"check",
                                value:false,
                                isFresh:true

                            },
                            "stroke-dash":{
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
                                value:0,
                                isSvgAttr:true,
                                scaleStep:1,
                                min:0,
                                max:Infinity
                            },
                            "stroke-opacity":{
                                type:"seq",
                                value:1,
                                isSvgAttr:true,
                                scaleStep:0.01,
                                min:0,
                                max:1
                            }
                        }

                    },
                    "permanova":{

                        "Permanova style":{
                            "id":"Permanova-font-style",
                            "switch":{
                                type:"check",
                                value:false,
                                isFresh:true

                            },
                            "round-decimals-R2":{
                                type:"seq",
                                value:4,
                                isSvgAttr:false,
                                scaleStep:1,
                                min:0,
                                max:Infinity
                            },"round-decimals-P":{
                                type:"seq",
                                value:4,
                                isSvgAttr:false,
                                scaleStep:1,
                                min:0,
                                max:Infinity
                            },
                            "fill":{
                                type:"color",
                                value:"#000000",
                                isSvgAttr:true
                            },
                            "font-size":{
                                type:"seq",
                                value:16,
                                isSvgAttr:true,
                                scaleStep:1,
                                min:0,
                                max:Infinity
                            },
                            "font-weight":{
                                type:"opt",
                                optionList:["normal","bold"],
                                value:0,
                                isSvgAttr:true
                            }
                        }

                    },
                    "legend":self.legendObj.getLegendControlData("categoryShapeLegend",idSuffix,cd=>{
                        cd["Legend title"].text.value = dataSource.columns[this.currentChenkedColumns[0]]
                        return cd
                    }),


                }



                let updateFunction  = (dataSource, layer) => {
                    categoryList = dataSource.map(ele=>{
                        return layer ? ele[dataSource.columns[layer.layerDataColumnsIndex[0]]] : ele[dataSource.columns[this.currentChenkedColumns[0]]]
                    }).filter(ele=>ele!=null)

                    categoryList = Array.from(new Set(categoryList));

                    if(layer){
                        layer.categoryList = categoryList
                    }

                    let colorObj = {

                    }

                    let typeObj = {

                    }

                    colorObj.switch = controlData.symbol["symbol color"].switch

                    categoryList.forEach(ele=>{

                        if(ele in controlData.symbol["symbol color"]){
                            colorObj[ele] = controlData.symbol["symbol color"][ele]
                        }else {
                            colorObj[ele] = {
                                type:"color",
                                value:"#cccccc",
                                isSvgAttr:false
                            }
                        }

                        if(ele in controlData.symbol["symbol type"]){
                            typeObj[ele] = controlData.symbol["symbol type"][ele]
                        }else{
                            typeObj[ele] = {
                                type:"opt",
                                optionList:[
                                    "symbolCircle-fill",
                                    "symbolCircle-nofill",
                                    "symbolCross-fill",
                                    "symbolCross-nofill",
                                    "symbolDiamond-fill",
                                    "symbolDiamond-nofill",
                                    "symbolSquare-fill",
                                    "symbolSquare-nofill",
                                    "symbolStar-fill",
                                    "symbolStar-nofill",
                                    "symbolTriangle-fill",
                                    "symbolTriangle-nofill",
                                    "symbolWye-fill",
                                    "symbolWye-nofill",
                                    "symbolDownTriangle-fill",
                                    "symbolDownTriangle-nofill",
                                ],
                                value:0,
                                isSvgAttr:false
                            }
                        }


                    })
                    controlData.symbol["symbol color"] = colorObj
                    controlData.symbol["symbol type"] = typeObj
                }

                updateFunction(dataSource)

                otherData.updateFunction = updateFunction

                if(["basicScatterPlot", "pcoa","pca", "nmds", "cca", "rda"].includes(self.plotType)){
                    let group_tsv = d3.tsvFormat(dataSource, [0,this.currentChenkedColumns[0]].map(i=>dataSource.columns[i]))

                    self.uploadUserData(group_tsv, "xjm", `permanova_group.tsv`).then(d=>{
                        self.getUserFigureData(`/ChiPlot/permanova?fileName=${self.fileName}.tsv`).then(data=>{
                            console.log(data)
                            self.permanova_result = data
                        })
                    })

                    otherData.rSquaredDragData = {x:15,y:30}
                    otherData.pValueDragData = {x:15,y:60}
                }





                return {controlData,
                    categoryList,
                    otherData,
                    legendDragData}

            },
            "change shape only":function (parms) {
                let {
                    layerType,
                    dataSource,
                    idSuffix,
                    controlData,
                    categoryList,
                    otherData,
                    legendDragData
                } = parms

                if(!this.datacheck([""])){
                    return null

                }

                controlData  =  {
                    "symbol":{

                        "symbol type":{

                        },


                    },
                    "legend":self.legendObj.getLegendControlData("categoryShapeLegend",idSuffix,cd=>{
                        cd["Legend title"].text.value = dataSource.columns[this.currentChenkedColumns[0]]
                        return cd
                    }),



                }
                let updateFunction  = (dataSource, layer) => {
                    categoryList = dataSource.map(ele=>{
                        return layer ? ele[dataSource.columns[layer.layerDataColumnsIndex[0]]] : ele[dataSource.columns[this.currentChenkedColumns[0]]]
                    }).filter(ele=>ele!=null)

                    categoryList = Array.from(new Set(categoryList));

                    if(layer){
                        layer.categoryList = categoryList
                    }


                    let typeObj = {

                    }


                    categoryList.forEach(ele=>{



                        if(ele in controlData.symbol["symbol type"]){
                            typeObj[ele] = controlData.symbol["symbol type"][ele]
                        }else{
                            typeObj[ele] = {
                                type:"opt",
                                optionList:[
                                    "symbolCircle-fill",
                                    "symbolCircle-nofill",
                                    "symbolCross-fill",
                                    "symbolCross-nofill",
                                    "symbolDiamond-fill",
                                    "symbolDiamond-nofill",
                                    "symbolSquare-fill",
                                    "symbolSquare-nofill",
                                    "symbolStar-fill",
                                    "symbolStar-nofill",
                                    "symbolTriangle-fill",
                                    "symbolTriangle-nofill",
                                    "symbolWye-fill",
                                    "symbolWye-nofill",
                                    "symbolDownTriangle-fill",
                                    "symbolDownTriangle-nofill",
                                ],
                                value:0,
                                isSvgAttr:false
                            }
                        }


                    })
                    controlData.symbol["symbol type"] = typeObj
                }

                updateFunction(dataSource)

                otherData.updateFunction = updateFunction
                return {controlData,
                    categoryList,
                    otherData,
                    legendDragData}


            },
            "add label": function (parms) {
                let {
                    layerType,
                    dataSource,
                    idSuffix,
                    controlData,
                    categoryList,
                    otherData,
                    legendDragData
                } = parms



                if(!this.datacheck([""])){
                    self.shakeElement(e)
                    return

                }




                controlData  =  {
                    "label" : {
                        "Text style": {
                            "id": `node-label-text-${idSuffix}`,
                            "rotate": {
                                type: "seq",
                                value: 0,
                                isSvgAttr: true,
                                scaleStep: 1,
                                min: -Infinity,
                                max: Infinity

                            },

                            "font-size": {
                                type: "seq",
                                value: 14,
                                isSvgAttr: true,
                                scaleStep: 1,
                                min: 0,
                                max: Infinity

                            },
                            "fill": {
                                type: "color",
                                value: "#000000",
                                isSvgAttr: true
                            },
                            "font-weight": {
                                type: "opt",
                                optionList: ["normal", "bold"],
                                value: 0,
                                isSvgAttr: true
                            },
                            "text-anchor": {
                                type: "opt",
                                optionList: ["start", "middle", "end"],
                                value: 1,
                                isSvgAttr: true
                            },
                            "font-style": {
                                type: "opt",
                                optionList: ["normal", "italic"],
                                value: 0,
                                isSvgAttr: true
                            },
                            "x": {
                                type: "seq",
                                value: 0,
                                isSvgAttr: true,
                                scaleStep: 1,
                                min: -Infinity,
                                max: Infinity

                            },
                            "y": {
                                type: "seq",
                                value: 0,
                                isSvgAttr: true,
                                scaleStep: 1,
                                min: -Infinity,
                                max: Infinity
                            }
                        },
                        "Line style":{
                            "id": `label-line-${idSuffix}`,
                            "switch": {
                                type: "check",
                                value: true,
                                isFresh: true

                            },
                            "stroke": {
                                type: "color",
                                value: "#000000",
                                isSvgAttr: true
                            },
                            "stroke-width": {
                                type: "seq",
                                value: 1,
                                isSvgAttr: true,
                                scaleStep: 1,
                                min: 0,
                                max: Infinity
                            },
                            "stroke-dasharray":{
                                type:"text",
                                value:"",
                                isSvgAttr:true,
                            },
                            "stroke-opacity": {
                                type: "seq",
                                value: 1,
                                isSvgAttr: true,
                                scaleStep: 0.01,
                                min: 0,
                                max: 1
                            },

                        },

                    }

                }
                otherData.labelDragData = {}


                let updateFunction  = (dataSource, layer) => {
                    let labelDragData = {}

                    console.log(otherData.labelDragData)

                    dataSource.forEach(ele=>{
                        let key = ele[dataSource.columns[0]];
                        if(key in otherData.labelDragData){
                            console.log("has key")
                            labelDragData[key] = otherData.labelDragData[key]
                        }else {
                            labelDragData[key] = {
                                x:0,
                                y:-10
                            }
                        }

                    })
                    otherData.labelDragData = labelDragData

                    // if(layer){
                    //     layer.otherData = otherData
                    //     console.log(layer)
                    // }


                }

                updateFunction(dataSource)

                otherData.updateFunction = updateFunction
                return {controlData,
                    categoryList,
                    otherData,
                    legendDragData}


            },
            "top density plot":function (parms) {
                let {layerType,
                    dataSource,
                    idSuffix,
                    controlData,
                    categoryList,
                    otherData,
                    legendDragData} = parms


                if(!this.datacheck([""])){
                    return null

                }


                controlData  =  {
                    "canvas":{
                        "Canvas scale": {
                            "height":{
                                type:"seq",
                                value:200,
                                isSvgAttr:false,
                                scaleStep:1,
                                min:1,
                                max:Infinity
                            },
                            "y":{
                                type:"seq",
                                value:0,
                                isSvgAttr:false,
                                scaleStep:1,
                                min:-Infinity,
                                max:Infinity
                            },
                        }

                    },
                    "xAxis":self.getAxisControlData(idSuffix,"x",AxisControlData=>{
                        AxisControlData.Axis["position-type"].value = 1
                        return AxisControlData
                    }),
                    "yAxis":self.getAxisControlData(idSuffix,"y"),
                    "density":{
                        "Color set":{
                            color:{
                                type:"button",
                                value:"",
                                iconClass:"cuIcon-file",
                                event:"chooseColor"
                            }
                        },
                        "Density color":{
                            "switch":{
                                type:"check",
                                value:false,
                                isFresh:true

                            },
                            "fill":{
                                type:"color",
                                value:"#cccccc",
                                isSvgAttr:true
                            }
                        },
                        "Density style":{
                            "id":`density-path-style-${idSuffix}`,
                            "sample-count":{
                                type:"seq",
                                value:10,
                                isSvgAttr:false,
                                scaleStep:1,
                                min:0,
                                max:Infinity
                            },
                            "fill-opacity":{
                                type:"seq",
                                value:0.6,
                                isSvgAttr:true,
                                scaleStep:0.01,
                                min:0,
                                max:1
                            },
                            "stroke":{
                                type:"color",
                                value:"#000000",
                                isSvgAttr:false
                            },
                            "stroke-as-fill":{
                                type:"check",
                                value:true,
                                isFresh:true

                            },

                            "stroke-width":{
                                type:"seq",
                                value:2,
                                isSvgAttr:true,
                                scaleStep:1,
                                min:0,
                                max:Infinity
                            },
                            "stroke-opacity":{
                                type:"seq",
                                value:1,
                                isSvgAttr:true,
                                scaleStep:0.01,
                                min:0,
                                max:1
                            }
                        },
                    },
                    "legend":self.legendObj.getLegendControlData("categoryShapeLegend",idSuffix,cd=>{
                        cd["Legend title"].text.value = dataSource.columns[this.currentChenkedColumns[0]]
                        return cd
                    }),


                }



                let updateFunction  = (dataSource, layer) => {
                    categoryList = dataSource.map(ele=>{
                        return layer ? ele[dataSource.columns[layer.layerDataColumnsIndex[0]]] : ele[dataSource.columns[this.currentChenkedColumns[0]]]
                    }).filter(ele=>ele!=null)

                    categoryList = Array.from(new Set(categoryList));

                    if(layer){
                        layer.categoryList = categoryList
                    }

                    let colorObj = {

                    }



                    colorObj.switch = controlData.density["Density color"].switch

                    categoryList.forEach(ele=>{

                        if(ele in controlData.density["Density color"]){
                            colorObj[ele] = controlData.density["Density color"][ele]
                        }else {
                            colorObj[ele] = {
                                type:"color",
                                value:"#cccccc",
                                isSvgAttr:false
                            }
                        }




                    })
                    controlData.density["Density color"] = colorObj
                }

                updateFunction(dataSource)

                otherData.updateFunction = updateFunction
                return {controlData,
                    categoryList,
                    otherData,
                    legendDragData}

            },
            "right density plot":function (parms) {
                let {layerType,
                    dataSource,
                    idSuffix,
                    controlData,
                    categoryList,
                    otherData,
                    legendDragData} = parms


                if(!this.datacheck([""])){
                    return null

                }


                controlData  =  {
                    "canvas":{
                        "Canvas scale": {
                            "width":{
                                type:"seq",
                                value:200,
                                isSvgAttr:false,
                                scaleStep:1,
                                min:1,
                                max:Infinity
                            },
                            "x":{
                                type:"seq",
                                value:0,
                                isSvgAttr:false,
                                scaleStep:1,
                                min:-Infinity,
                                max:Infinity
                            },
                        }

                    },
                    "xAxis":self.getAxisControlData(idSuffix,"x",AxisControlData=>{
                        AxisControlData.Axis["position-type"].value = 1
                        return AxisControlData
                    }),
                    "yAxis":self.getAxisControlData(idSuffix,"y"),
                    "density":{
                        "Color set":{
                            color:{
                                type:"button",
                                value:"",
                                iconClass:"cuIcon-file",
                                event:"chooseColor"
                            }
                        },
                        "Density color":{
                            "switch":{
                                type:"check",
                                value:false,
                                isFresh:true

                            },
                            "fill":{
                                type:"color",
                                value:"#cccccc",
                                isSvgAttr:true
                            }
                        },
                        "Density style":{
                            "id":`density-path-style-${idSuffix}`,
                            "sample-count":{
                                type:"seq",
                                value:10,
                                isSvgAttr:false,
                                scaleStep:1,
                                min:0,
                                max:Infinity
                            },
                            "fill-opacity":{
                                type:"seq",
                                value:0.6,
                                isSvgAttr:true,
                                scaleStep:0.01,
                                min:0,
                                max:1
                            },
                            "stroke":{
                                type:"color",
                                value:"#000000",
                                isSvgAttr:false
                            },
                            "stroke-as-fill":{
                                type:"check",
                                value:true,
                                isFresh:true

                            },

                            "stroke-width":{
                                type:"seq",
                                value:2,
                                isSvgAttr:true,
                                scaleStep:1,
                                min:0,
                                max:Infinity
                            },
                            "stroke-opacity":{
                                type:"seq",
                                value:1,
                                isSvgAttr:true,
                                scaleStep:0.01,
                                min:0,
                                max:1
                            }
                        },
                    },
                    "legend":self.legendObj.getLegendControlData("categoryShapeLegend",idSuffix,cd=>{
                        cd["Legend title"].text.value = dataSource.columns[this.currentChenkedColumns[0]]
                        return cd
                    }),


                }



                let updateFunction  = (dataSource, layer) => {
                    categoryList = dataSource.map(ele=>{
                        return layer ? ele[dataSource.columns[layer.layerDataColumnsIndex[0]]] : ele[dataSource.columns[this.currentChenkedColumns[0]]]
                    }).filter(ele=>ele!=null)

                    categoryList = Array.from(new Set(categoryList));

                    if(layer){
                        layer.categoryList = categoryList
                    }

                    let colorObj = {

                    }



                    colorObj.switch = controlData.density["Density color"].switch

                    categoryList.forEach(ele=>{

                        if(ele in controlData.density["Density color"]){
                            colorObj[ele] = controlData.density["Density color"][ele]
                        }else {
                            colorObj[ele] = {
                                type:"color",
                                value:"#cccccc",
                                isSvgAttr:false
                            }
                        }




                    })
                    controlData.density["Density color"] = colorObj
                }

                updateFunction(dataSource)

                otherData.updateFunction = updateFunction
                return {controlData,
                    categoryList,
                    otherData,
                    legendDragData}

            },
            "size of points": function (parms) {
                let {
                    layerType,
                    dataSource,
                    idSuffix,
                    controlData,
                    categoryList,
                    otherData,
                    legendDragData
                } = parms



                if(!this.datacheck(["number"])){
                    self.shakeElement(e)
                    return

                }




                controlData  =  {
                    "point":{
                        "Point size":{
                            "min-value":{
                                type:"seq",
                                value:1,
                                isSvgAttr:true,
                                scaleStep:1,
                                min:0,
                                max:Infinity
                            },
                            "max-value":{
                                type:"seq",
                                value:8,
                                isSvgAttr:true,
                                scaleStep:1,
                                min:0,
                                max:Infinity
                            },

                        },

                    },
                    "legend":self.legendObj.getLegendControlData("baseSizeLegend",cd=>{
                        cd["Legend title"].text.value = "Point Size"
                        return cd
                    })

                }

                let mmv = d3.extent(dataSource, ele=>ele[dataSource.columns[this.currentChenkedColumns[0]]])
                let step = (mmv[1]-mmv[0])/5;

                step = Number(d3.format(".1r")(step))

                controlData["legend"]["Symbol style"]["range-step"].value = step

                return {controlData,
                    categoryList,
                    otherData,
                    legendDragData}


            },
            "gradient color of points": function (parms) {
                let {
                    layerType,
                    dataSource,
                    idSuffix,
                    controlData,
                    categoryList,
                    otherData,
                    legendDragData
                } = parms



                if(!this.datacheck(["number"])){
                    self.shakeElement(e)
                    return

                }




                controlData  =  {
                    "color":{
                        "Color bar":{
                            color:{
                                type:"button",
                                value:"",
                                iconClass:"cuIcon-file",
                                event:"chooseColorBar"
                            },
                            "custom-color":{
                                type:"check",
                                value:false,
                                isFresh:true

                            },
                            "gradient-type": {
                                type: "opt",
                                optionList: ["start-end", "start-middle-end"],
                                value: 0,
                                isSvgAttr: false
                            },
                            "start":{
                                type:"color",
                                value:"#81C7C1",
                                isSvgAttr:false
                            },
                            "middle":{
                                type:"color",
                                value:"#ffffff",
                                isSvgAttr:false
                            },
                            "end":{
                                type:"color",
                                value:"#FC7956",
                                isSvgAttr:false
                            },


                        },

                    },
                    "legend":self.legendObj.getLegendControlData("colorBarLegend",cd=> {
                        cd["Legend title"].text.value = dataSource.columns[this.currentChenkedColumns[0]]
                        return cd
                    })

                }

                let mmv = d3.extent(dataSource, ele=>ele[dataSource.columns[this.currentChenkedColumns[0]]])


                return {controlData,
                    categoryList,
                    otherData,
                    legendDragData}


            },

        }
        defaultLayerTypeArr.forEach(key=>{
            this.layerComponent.addLayerType(key, layerTypeDict[key])
        })



    }

    errorEllipse(stdDevX, stdDevY, cor, center, p) {
        //算法参考网站https://www.xarg.org/2018/04/how-to-plot-a-covariance-error-ellipse/

        //协方差
        let cov = cor * stdDevX * stdDevY
        //协方差矩阵
        let Sigma = [
            [stdDevX * stdDevX, cov],
            [cov, stdDevY * stdDevY]
        ]

        let mu =  center

        p = p || 0.95;

        var s = -2 * Math.log(1 - p);

        var a = Sigma[0][0];
        var b = Sigma[0][1];
        var c = Sigma[1][0];
        var d = Sigma[1][1];

        var tmp = Math.sqrt((a - d) * (a - d) + 4 * b * c);
        var V = [
            [-(tmp - a + d) / (2 * c), (tmp + a - d) / (2 * c)],
            [1, 1]
        ];
        var sqrtD = [
            Math.sqrt(s * (a + d - tmp) / 2),
            Math.sqrt(s * (a + d + tmp) / 2)
        ];

        var norm1 = Math.hypot(V[0][0], 1);
        var norm2 = Math.hypot(V[0][1], 1);
        V[0][0] /= norm1;
        V[1][0] /= norm1;
        V[0][1] /= norm2;
        V[1][1] /= norm2;

        var ndx = sqrtD[0] < sqrtD[1] ? 1 : 0;

        var x1 = mu[0] + V[0][ndx] * sqrtD[ndx];
        var y1 = mu[1] + V[1][ndx] * sqrtD[ndx];

        var x2 = mu[0] + V[0][1 - ndx] * sqrtD[1 - ndx];
        var y2 = mu[1] + V[1][1 - ndx] * sqrtD[1 - ndx];

        console.log(mu[0], mu[1],
            Math.hypot(x1 - mu[0], y1 - mu[1]),
            Math.hypot(x2 - mu[0], y2 - mu[1]),
            Math.atan2(y1 - mu[1], x1 - mu[0]))

        return {
            cx: mu[0],
            cy: mu[1],
            rx: Math.hypot(x1 - mu[0], y1 - mu[1]),
            ry: Math.hypot(x2 - mu[0], y2 - mu[1]),
            orient: (Math.atan2(y1 - mu[1], x1 - mu[0]) * 180 / Math.PI)
        }


    }
    drawScatter(scatterData, figureDatum, isGroup = false){

        if(!scatterData){
            return
        }

        let sampleKeyName = scatterData.columns[0]

        let labelLayerData = this.layerPlaneData.layerStatistic["add label"]
        let symbolData = this.layerPlaneData.layerStatistic["modify shape and color"]
        let shapeData = this.layerPlaneData.layerStatistic["change shape only"]
        let  colorScale = d3.scaleOrdinal()
            .range(this.styleData.currentColorList||["#ccc"])
        if(isGroup){
            colorScale
                .domain(this.categoryArr)

            if(figureDatum["Custom color"]["switch"].value){

                let colorList = this.categoryArr.map(ele=>{
                    return figureDatum["Custom color"][ele].value
                })

                colorScale
                    .range(colorList)
            }
        this.colorScale = colorScale
        }


        let scatterMainG =  this.maingroup.append("g").attr("id","scatterMainG")



        let scatterG = scatterMainG
            .call(g=>{
                let centerLine = figureDatum["center line"]
                if(centerLine.switch.value){

                    g.append("g")
                        .call(g=>{
                            g.append("line")
                                .attr("x1", this.xScale(0))
                                .attr("x2", this.xScale(0))
                                .attr("y2", this.innerHeight)
                                .call(line=>{
                                    this.renderAttr(line, centerLine)
                                })

                            g.append("line")
                                .attr("y1", this.yScale(0))
                                .attr("y2", this.yScale(0))
                                .attr("x2", this.innerwidth)
                                .call(line=>{
                                    this.renderAttr(line, centerLine)
                                })
                        })
                        .lower()



                }
            })
            .selectAll("scatter")
            .data(scatterData)
            .join("g")
            .attr("transform",d=>`translate(${this.xScale(d[scatterData.columns[1]])}, ${this.yScale(d[scatterData.columns[2]])})`)

        let sizeOfPointData = this.layerPlaneData.layerStatistic["size of points"]
        let sizeOfPoint_dataIndex
        let sizeOfPoint_columnsName
        let sizeScale
        if(sizeOfPointData){
            sizeOfPointData.forEach((layer,li)=> {
                if (!layer.isShowObj.isShow) {
                    return
                }


                let dataSource = this.layerDataDict[layer.layerDataFlieKey].dataSource;
                sizeOfPoint_dataIndex = this.layerDataDict[layer.layerDataFlieKey].dataIndex;

                //  获取有数值那一列的列名
                sizeOfPoint_columnsName  = dataSource.columns[layer.layerDataColumnsIndex[0]]


                //    计算最大值
                let [minValue,maxValue] = d3.extent(dataSource, row=>row[sizeOfPoint_columnsName])
                layer.mmv = [minValue,maxValue]

                sizeScale = d3.scaleLinear()
                    .domain([0, minValue, maxValue])
                    .range([
                        0,
                        layer.controlData.point["Point size"]["min-value"].value,
                        layer.controlData.point["Point size"]["max-value"].value,

                    ])
                layer.sizeScale = sizeScale

            })
        }

        console.log(sizeOfPoint_dataIndex)

        let pointStyle = figureDatum["point style"]
        let symbol_type_index = pointStyle["type"].value
        let symbol_type = pointStyle["type"].optionList[symbol_type_index]
        let isFill = symbol_type.split("-")[1]



        let isFillGradientColor = pointStyle["gradient-color"] && pointStyle["gradient-color"].value


        if(isFillGradientColor){
            scatterMainG.append("radialGradient")
                .attr("id", `pure-radialGradient-color`)
                .attr("cx", "50%")
                .attr("cy", "50%")
                .attr("r", "50%")
                .call(gradient => {
                    gradient.append("stop")
                        .attr("offset", "0%")
                        .attr("stop-color", '#ffffff')
                    gradient.append("stop")
                        .attr("offset", "100%")
                        .attr("stop-color", pointStyle.fill.value)
                })
        }



        let pathG = scatterG
            .append('path')
            .attr("d", d=> {
                // console.log(sizeOfPoint_dataIndex.get(d[sampleKeyName]))
                return d3.symbol().type(d3[symbol_type.split("-")[0]]).size(sizeOfPoint_dataIndex ? Math.pow(sizeScale(sizeOfPoint_dataIndex.get(d[sampleKeyName])[sizeOfPoint_columnsName]),2)*Math.PI : pointStyle.size.value)()
            })
            .attr("fill", d=>{
                console.log("lllll89",isGroup)
                return isFill == "fill" ? (isGroup ? colorScale(d[scatterData.columns[3]]):(isFillGradientColor?"url(#pure-radialGradient-color)":pointStyle.fill.value)):"none"
            })
            .attr("stroke", d=>{
                return (isFill == "fill" && !pointStyle["stroke-as-fill"].value) ? pointStyle.stroke.value : (isGroup ? colorScale(d[scatterData.columns[3]]):pointStyle.fill.value)
            })
            .call(path=>{
                this.renderAttr(path,pointStyle)
            })

        if(labelLayerData && labelLayerData.length>0){
            console.log("ll")
            let layer = labelLayerData[0]
            if (!layer.isShowObj.isShow) {
                return
            }
            let dataSource = this.layerDataDict[layer.layerDataFlieKey].dataSource;
            let dataIndex = this.layerDataDict[layer.layerDataFlieKey].dataIndex;

            let columnsName  = dataSource.columns[layer.layerDataColumnsIndex[0]]
            this.maingroup.append("g")
                .selectAll("labelTextG")
                .data(scatterData.filter(d=>dataIndex.has(d[sampleKeyName]) && dataIndex.get(d[sampleKeyName])[columnsName]))
                .join("g")
                .attr("transform",d=>`translate(${this.xScale(d[scatterData.columns[1]])}, ${this.yScale(d[scatterData.columns[2]])})`)
                .call(g=>{
                    let dargParams = {
                        updateElementArr:[{
                            elementClass:layer.controlData.label["Text style"].id,
                            updateAttrs:{
                                "text-anchor":d=>d.x>0?"start":"end"

                            }
                        }]
                    }
                    if(layer.controlData.label["Line style"].switch.value){
                        let line = g.selectAll("labelLine")
                            .data(d=> {
                                let data = layer.otherData.labelDragData[d[sampleKeyName]]
                                return [data]
                            })
                            .join("line")
                            .attr("class",layer.controlData.label["Line style"].id)
                            .attr("x2",d=>d.x>0?(d.x-2) : (d.x+2))
                            .attr("y2",d=>d.y)
                            .attr("stroke-linecap","round")
                            .call(T=>{
                                this.renderAttr(T,layer.controlData.label["Line style"])
                            })

                        dargParams.updateElementArr.push({
                            elementClass:layer.controlData.label["Line style"].id,
                            updateAttrs:{
                                "x2":d=>d.x>0?(d.x-2) : (d.x+2),
                                "y2":d=>d.y
                            }
                        })
                    }

                    g.selectAll("dragG")
                        .data(d=> {
                            let data = layer.otherData.labelDragData[d[sampleKeyName]]
                            data.name = dataIndex.get(d[sampleKeyName])[columnsName]
                            return [data]
                        })
                        .join("g")
                        .attr("transform", d=>`translate(${d.x},${d.y})`)
                        .call(this.drag(dargParams))
                        .append("text")
                        .text(d=>d.name)
                        .attr("class",layer.controlData.label["Text style"].id)
                        .attr("text-anchor", d=>d.x>0?"start":"end")
                        .attr("dy", "0.35em")
                        .call(T=>{
                            this.renderAttr(T,layer.controlData.label["Text style"])
                        })
                })
            // .selectAll("dragG")
                // .data(d=> {
                //     let data = layer.otherData.labelDragData[d[sampleKeyName]]
                //     data.name = dataIndex.get(d[sampleKeyName])[columnsName]
                //     return [data]
                // })
                // .join("g")
                // .attr("transform", d=>`translate(${d.x},${d.y})`)
                // .call(this.drag())
                // .append("text")
                // .text(d=>d.name)
                // .attr("class",layer.controlData.label["Text style"].id)
                // .call(T=>{
                //     this.renderAttr(T,layer.controlData.label["Text style"])
                // })
        }

        if(figureDatum["point text"].switch.value){
            scatterG.selectAll("dragG")
                .data(d=>{
                    return [this.styleData.pointTextDragData[d[sampleKeyName]]]
                })
                .join("g")
                .attr("transform", d=>`translate(${d.x},${d.y})`)
                .call(this.drag())
                .append("text")
                .attr("class", figureDatum["point text"].id)
                .text(d=>d.name)
                .call(T=>{
                    this.renderAttr(T,figureDatum["point text"])
                })
        }




        pathG.append("title")
            .text(d=>`${d[sampleKeyName]}`)


        const line = d3.line()
            .x(d => this.xScale(d[0]))
            .y(d => this.yScale(d[1]))


        if(symbolData){


            symbolData.forEach((layer,li)=> {
                if (!layer.isShowObj.isShow) {
                    return
                }

                let  colorScale = d3.scaleOrdinal()
                    .domain(layer.categoryList)
                    .range(layer.categoryColorList)

                if(layer.controlData.symbol["symbol color"].switch.value){

                    colorScale.range(layer.categoryList.map(k=>layer.controlData.symbol["symbol color"][k].value))
                }

                layer.colorScale = colorScale
                let dataSource = this.layerDataDict[layer.layerDataFlieKey].dataSource;
                let dataIndex = this.layerDataDict[layer.layerDataFlieKey].dataIndex;

                let columnsName  = dataSource.columns[layer.layerDataColumnsIndex[0]]

                for(let i=0;i<scatterData.length;i++){
                    if(!dataIndex.has(scatterData[i][sampleKeyName])){
                        this.showMessageBox("cuIcon-roundclose",`No ID called ${scatterData[i][sampleKeyName]}`,"error")

                        return;
                    }
                }


                if (layer.controlData.symbol["Radiation line"].switch.value){
                    layer.categoryList.forEach(c=>{
                        let pointGroup = scatterData.filter(d=>dataIndex.get(d[sampleKeyName])[columnsName] == c).map(ele=>[ele[scatterData.columns[1]],ele[scatterData.columns[2]]])
                        let xData = pointGroup.map(ele=>this.xScale(ele[0]))
                        let xMean = d3.mean(xData)
                        let yData = pointGroup.map(ele=>this.yScale(ele[1]))
                        let yMean = d3.mean(yData)
                        console.log("pointGroup", pointGroup)
                        scatterMainG.append("g")
                            .lower()
                            .selectAll("Rline")
                            .data(pointGroup)
                            .join("line")
                            .attr("class", layer.controlData.symbol["Radiation line"].id)
                            .attr("x1", xMean)
                            .attr("y1", yMean)
                            .attr("x2", d=>this.xScale(d[0]))
                            .attr("y2", d=>this.yScale(d[1]))
                            .attr("stroke", d=>{
                                if(layer.controlData.symbol["Radiation line"]["stroke-as-symbol"].value){
                                    return colorScale(c)
                                }else {
                                    return layer.controlData.symbol["Radiation line"].stroke.value
                                }
                            })
                            .call(l=>{
                                this.renderAttr(l, layer.controlData.symbol["Radiation line"])
                                if(layer.controlData.symbol["Radiation line"]["stroke-dash"].value){
                                    l.attr("stroke-dasharray", "5,5")
                                }
                            })

                    })
                }





                if(layer.controlData.ellipse["ellipse style"].switch.value){
                    layer.categoryList.forEach(c=>{
                        let pointGroup = scatterData.filter(d=>dataIndex.get(d[sampleKeyName])[columnsName] == c).map(ele=>[ele[scatterData.columns[1]],ele[scatterData.columns[2]]])
                        // let convexHullPoints = hull(pointGroup,10);
                        // let convexHullPoints = d3.polygonHull(pointGroup);

                        // scatterG.append("path").datum(convexHullPoints)
                        //     .attr('d',line)
                        //     .attr('fill',layer.controlData.symbol["symbol color"][c].value)
                        //     .attr('fill-opacity',0.3)
                        //     .lower()





                        let xData = pointGroup.map(ele=>this.xScale(ele[0]))
                        let stdDevX = d3.deviation(xData)//标准差
                        let xMean = d3.mean(xData)

                        let yData = pointGroup.map(ele=>this.yScale(ele[1]))
                        let stdDevY = d3.deviation(yData)
                        let yMean = d3.mean(yData)

                        let cor = jStat.corrcoeff(xData, yData);//相关系数


                        var ellipse90 = this.errorEllipse(stdDevX,  stdDevY, cor, [xMean, yMean], layer.controlData.ellipse["confidence level"].level.value);


                        console.log(ellipse90)




                        scatterMainG.append("ellipse")
                            .attr('rx', ellipse90.rx )
                            .attr('ry', ellipse90.ry)
                            .attr('transform', `translate(${ellipse90.cx},${ellipse90.cy})rotate(${ellipse90.orient})`)
                            .attr('fill',colorScale(c))
                            .lower()
                            .call(e=>{
                                this.renderAttr(e, layer.controlData.ellipse["ellipse style"])

                                if(layer.controlData.ellipse["ellipse style"]["stroke-as-fill"].value){
                                    e.attr("stroke", colorScale(c))
                                }
                                if(layer.controlData.ellipse["ellipse style"]["stroke-dash"].value){
                                    e.attr("stroke-dasharray", "5,5")
                                }
                            })







                    })

                }






                pathG
                    .attr('d',d => {
                        let shapeLayer = layer
                        if(shapeData && shapeData.length>0 && shapeData[0].isShowObj.isShow){

                            shapeLayer = shapeData[0]

                        }
                        let dataIndex = this.layerDataDict[shapeLayer.layerDataFlieKey].dataIndex;
                        let dataSource = this.layerDataDict[shapeLayer.layerDataFlieKey].dataSource;
                        let columnsName  = dataSource.columns[shapeLayer.layerDataColumnsIndex[0]]
                        if(!dataIndex.has(d[sampleKeyName])){
                            return d3.symbol().type(d3.symbolCircle).size(40)()
                        }
                        let category = dataIndex.get(d[sampleKeyName])[columnsName]
                        
                        let symbol_type_index = shapeLayer.controlData.symbol["symbol type"][category].value
                        let symbol_type = shapeLayer.controlData.symbol["symbol type"][category].optionList[symbol_type_index].split("-")[0]

                        return d3.symbol().type(d3[symbol_type]).size(sizeOfPoint_dataIndex ? Math.pow(sizeScale(sizeOfPoint_dataIndex.get(d[sampleKeyName])[sizeOfPoint_columnsName]),2)*Math.PI : layer.controlData.symbol["symbol style"].size.value)()

                    })
                    .attr('fill',d=>{
                        let shapeLayer = layer

                        let dataIndex = this.layerDataDict[shapeLayer.layerDataFlieKey].dataIndex;
                        let dataSource = this.layerDataDict[shapeLayer.layerDataFlieKey].dataSource;
                        let columnsName  = dataSource.columns[shapeLayer.layerDataColumnsIndex[0]]
                        if(!dataIndex.has(d[sampleKeyName])){
                            return "#000"
                        }
                        let category = dataIndex.get(d[sampleKeyName])[columnsName]
                        let symbolElementElement = shapeLayer.controlData.symbol["symbol type"][dataIndex.get(d[sampleKeyName])[columnsName]];
                        let isFill = symbolElementElement.optionList[symbolElementElement.value].split("-")[1]
                        let color = colorScale(category)
                        if(shapeData && shapeData.length>0 && shapeData[0].isShowObj.isShow){

                            let shapeLayer = shapeData[0]
                            let dataIndex = this.layerDataDict[shapeLayer.layerDataFlieKey].dataIndex;
                            let dataSource = this.layerDataDict[shapeLayer.layerDataFlieKey].dataSource;
                            let columnsName  = dataSource.columns[shapeLayer.layerDataColumnsIndex[0]]

                            let symbolElementElement = shapeLayer.controlData.symbol["symbol type"][dataIndex.get(d[sampleKeyName])[columnsName]];
                            isFill = symbolElementElement.optionList[symbolElementElement.value].split("-")[1]


                        }
                        return isFill == "fill" ? color:"none"
                    })
                    .attr('stroke',d=>{
                        if(!dataIndex.has(d[sampleKeyName])){
                            return pointStyle.stroke.value
                        }
                        let category = dataIndex.get(d[sampleKeyName])[columnsName]
                        let color = colorScale(category)
                        return (isFill == "fill" && !pointStyle["stroke-as-fill"].value) ? pointStyle.stroke.value : color
                    })
                    .call(path=>{
                        this.renderAttr(path, layer.controlData.symbol["symbol style"])
                    })





                if(layer.controlData.permanova["Permanova style"].switch.value && this.permanova_result){
                    this.maingroup.append("g")
                        .data([layer.otherData.rSquaredDragData])
                        .attr("transform", d=>`translate(${d.x},${d.y})`)
                        .call(this.drag())
                        .append("text")
                        .call(T=>{

                            T.append("tspan")
                                .text(`R`)
                            T.append("tspan")
                                .text(`2`)
                                .attr("baseline-shift", "super")
                                .attr("font-size", "0.8em")
                            T.append("tspan")
                                .text(` = ${d3.format(`.${layer.controlData.permanova["Permanova style"]["round-decimals-R2"].value}f`)(this.permanova_result.R2)}`)


                        })


                        .attr("class", layer.controlData.permanova["Permanova style"].id)
                        .call(t=>{
                            this.renderAttr(t,layer.controlData.permanova["Permanova style"])
                        })

                    this.maingroup.append("g")
                        .data([layer.otherData.pValueDragData])
                        .attr("transform", d=>`translate(${d.x},${d.y})`)
                        .call(this.drag())
                        .append("text")
                        .text(`P = ${d3.format(`.${layer.controlData.permanova["Permanova style"]["round-decimals-R2"].value}f`)(this.permanova_result.P_value)}`)
                        .attr("class", layer.controlData.permanova["Permanova style"].id)
                        .call(t=>{
                            this.renderAttr(t,layer.controlData.permanova["Permanova style"])
                        })
                }





            })

        }


        if(shapeData && !(symbolData && symbolData.length>0)){
            //只存在形状修改图层的时候
            shapeData.forEach((layer,li)=> {
                if (!layer.isShowObj.isShow) {
                    return
                }
                let shapeLayer = layer
                let dataIndex = this.layerDataDict[shapeLayer.layerDataFlieKey].dataIndex;
                let dataSource = this.layerDataDict[shapeLayer.layerDataFlieKey].dataSource;
                let columnsName  = dataSource.columns[shapeLayer.layerDataColumnsIndex[0]]

                pathG
                    .attr('d',d => {

                        if(!dataIndex.has(d[sampleKeyName])){
                            return d3.symbol().type(d3.symbolCircle).size(40)()
                        }
                        let category = dataIndex.get(d[sampleKeyName])[columnsName]
                        let symbol_type_index = shapeLayer.controlData.symbol["symbol type"][category].value
                        let symbol_type = shapeLayer.controlData.symbol["symbol type"][category].optionList[symbol_type_index].split("-")[0]

                        return d3.symbol().type(d3[symbol_type]).size(sizeOfPoint_dataIndex ? Math.pow(sizeScale(sizeOfPoint_dataIndex.get(d[sampleKeyName])[sizeOfPoint_columnsName]),2)*Math.PI : pointStyle.size.value)()

                    })
                    .attr('fill',d=>{

                        if(!dataIndex.has(d[sampleKeyName])){
                            return "#000"
                        }
                        let category = dataIndex.get(d[sampleKeyName])[columnsName]
                        let symbolElementElement = shapeLayer.controlData.symbol["symbol type"][dataIndex.get(d[sampleKeyName])[columnsName]];
                        let isFill = symbolElementElement.optionList[symbolElementElement.value].split("-")[1]
                        let color = pointStyle.fill.value
                        return isFill == "fill" ? color:"none"
                    })


            })
        }



        let gradientColorOfPointData = this.layerPlaneData.layerStatistic["gradient color of points"] || []
        gradientColorOfPointData.forEach((layer,li)=> {
            if (!layer.isShowObj.isShow) {
                return
            }


            let dataSource = this.layerDataDict[layer.layerDataFlieKey].dataSource;
            let dataIndex = this.layerDataDict[layer.layerDataFlieKey].dataIndex;

            //  获取有数值那一列的列名
            let columnsName  = dataSource.columns[layer.layerDataColumnsIndex[0]]


            //    计算最大值
            let mmv = d3.extent(dataSource, row=>row[columnsName])
            let maxValue =  parseFloat(layer.controlData.legend["ColorBar range"]["max-value"].value) || 0
            if(maxValue>mmv[1]){
                mmv[1] = maxValue
            }
            let minValue =  parseFloat(layer.controlData.legend["ColorBar range"]["min-value"].value) || 0
            if(minValue<mmv[0]){
                mmv[0] = minValue
            }
            layer.mmv = mmv

            layer.customColorInterpolate = d3[layer.colorInterpolate || "interpolateRdBu"]
            let color_controlData = layer.controlData.color;
            if(color_controlData["Color bar"]["custom-color"].value){
                let gradientTypeObj = color_controlData["Color bar"]["gradient-type"]
                let startColor = color_controlData["Color bar"].start.value
                let middleColor = color_controlData["Color bar"].middle.value
                let endColor = color_controlData["Color bar"].end.value
                if(gradientTypeObj.optionList[gradientTypeObj.value] == "start-end"){

                    layer.customColorInterpolate = d3.scaleLinear().domain([0,1]).range([startColor,endColor])
                }else {
                    layer.customColorInterpolate = d3.scaleLinear().domain([0,0.5,1]).range([startColor,middleColor,endColor])
                }
            }
            let colorScale =  d3.scaleSequential(layer.controlData.legend["ColorBar range"]["reverse"].value ? [layer.mmv[1],layer.mmv[0]]:layer.mmv, layer.customColorInterpolate)
            if(layer.controlData.legend["ColorBar range"]["median-value"].value){
                let medianValue = Number(layer.controlData.legend["ColorBar range"]["median-value"].value)
                colorScale = (v)=>{
                    let scale = d3.scaleLinear().domain(
                        layer.controlData.legend["ColorBar range"]["reverse"].value ? [mmv[1],medianValue,mmv[0]]:[mmv[0],medianValue,mmv[1]]
                    ).range([0,0.5,1])
                    return layer.customColorInterpolate(scale(v))
                }
            }


            pathG.attr("fill",d=>{
                let value = dataIndex.get(d[sampleKeyName])[columnsName]
                return colorScale(value)
            })



        })





    }
    addCustomAxis(controlData, maingroup, canvasWidth, canvasHeight, {xScale,yScale}={}){

        if(controlData.background && controlData.background.Background.switch.value){

            maingroup.insert('rect','#maingroup g:nth-child(1)')
                .attr('class',controlData.background.Background.id)
                .attr('width',controlData.canvas["Canvas scale"].width.value)
                .attr('height',canvasHeight)
                .call(rect=>{
                    this.renderAttr(rect, controlData.background.Background)
                })
        }





        let draw = (axisControlData, axisScale, axisType = "x")=> {
            if(!axisControlData.Axis.switch.value){
                return

            }

            let axisDirection;
            let offset = axisControlData.Axis.offset.value

            let positionTypeObj = axisControlData.Axis["position-type"]
            switch (positionTypeObj.optionList[positionTypeObj.value]) {
                case "bottom":
                    axisDirection = "axisBottom"
                    break
                case "top":
                    axisDirection = "axisTop"
                    break
                case "left":
                    axisDirection = "axisLeft"
                    break
                case "right":
                    axisDirection = "axisRight"
                    break

            }

            console.log(axisDirection)



            //创建坐标轴
            const xAxisTick = axisControlData.Tick

            const xAxis = d3[axisDirection](axisScale)
            if(xAxisTick.hasOwnProperty("tickValues") && xAxisTick.tickValues.value){

                xAxis.tickValues(xAxisTick.tickValues.value.split(","))

            }
            if(xAxisTick.hasOwnProperty("tickFormat") && xAxisTick.tickFormat.value){

                xAxis.tickFormat(d3.format(`${xAxisTick.tickFormat.value}`))

            }






            const xAxisGroup = maingroup.append('g')
                .call(xAxis).attr('class',`${axisType}Axis`)
                .attr("font-family",null)
            if(axisType == "x"){

                offset *= axisDirection == "axisBottom"? -1:1
            }else {
                offset *= axisDirection == "axisLeft"? 1:-1
            }

            if(axisDirection == "axisBottom"){
                xAxisGroup.attr('transform',`translate(0,${canvasHeight+offset})`)

            }else if(axisDirection == "axisRight"){
                xAxisGroup.attr('transform',`translate(${canvasWidth+offset},0)`)
            }
            else if(axisDirection == "axisTop"){
                xAxisGroup.attr('transform',`translate(0,${offset})`)
            }else {
                xAxisGroup.attr('transform',`translate(${offset},0)`)
            }






            let textStyle = axisControlData["Text style"]
            xAxisGroup.selectAll(".tick text").remove()
            if(textStyle.switch.value){
                let AxisGroup_tick_text = xAxisGroup.selectAll(".tick")

                    .append("g")
                    .attr("transform", d => {
                        if(axisType == "x"){

                            return `translate(0,${(axisDirection == "axisBottom" ? -1 : 1) * axisControlData["Text style"].offset.value})`
                        }else {
                            return `translate(${(axisDirection == "axisLeft" ? 1 : -1) * axisControlData["Text style"].offset.value},0)`

                        }
                    })
                    .append("text")
                    .text(d=> {
                        if(xAxisTick.hasOwnProperty("tickFormat") && xAxisTick.tickFormat.value){

                            return d3.format(`${xAxisTick.tickFormat.value}`)(d)

                        }
                        return d
                    })
                    .attr("class", textStyle.id)
                    .attr("dy", "0.35em")
                if (xAxisTick.hasOwnProperty("tickFormat") && xAxisTick.tickFormat.value.endsWith("E")){

                    xAxisGroup.selectAll(".tick text")
                        .call(T=>{
                            this.valueFormat(T,xAxisTick.tickFormat.value)

                        })

                }
                this.renderAttr(AxisGroup_tick_text,textStyle)
            }





            // 添加坐标轴
            // y轴标签
            let x_label = xAxisGroup
                .append("g")
                .attr('transform',axisType == "x" ? `translate(${canvasWidth/2},0)` : `translate(0,${canvasHeight/2})rotate(${axisDirection == "axisLeft"?-90:90})`)
                .append('text')
                .attr("class", axisControlData.Label.id)
                .attr('text-anchor','middle')
            // .attr('transform','rotate(-90)')//坐标轴也跟着旋转

            this.renderAttr(x_label,axisControlData.Label)
            this.renderText(x_label, axisControlData.Label.text.value)




            xAxisGroup.selectAll('.tick line')
                .attr("class","tick-line")
                .call(l=>{
                    this.renderAttr(l, xAxisTick)
                })


            if (xAxisTick.hasOwnProperty("tickFormat") && xAxisTick.tickFormat.value.endsWith("E")){

                xAxisGroup.selectAll(".tick text")
                    .call(T=>{
                        this.valueFormat(T,xAxisTick.tickFormat.value)

                    })

            }






            if(axisControlData.Grid && axisControlData.Grid.switch.value){

                let xAxis_grid_line_G = xAxisGroup.selectAll('.tick line')
                    .clone()
                    .attr("class",axisControlData.Grid.id)
                    if(axisType == "x"){
                        xAxis_grid_line_G.attr('y2',(axisDirection == "axisBottom" ? -canvasHeight:canvasHeight) - (offset ? offset:0))
                    }else {
                        xAxis_grid_line_G.attr('x2',(axisDirection == "axisLeft" ? canvasWidth:-canvasWidth) - (offset ? offset:0))
                    }

                this.renderAttr(xAxis_grid_line_G, axisControlData.Grid)
            }

            xAxisGroup.selectAll('.domain')
                .call(l=>{
                    this.renderAttr(l, xAxisTick)
                })
                .raise()

            axisControlData.Tick.removePath.value && xAxisGroup.selectAll(".domain").remove()
            axisControlData.Tick.removeTick.value && xAxisGroup.selectAll(".tick .tick-line").remove()
        }
        if(controlData.xAxis){
            draw(controlData.xAxis, xScale, "x")
        }
        if(controlData.yAxis){
            draw(controlData.yAxis, yScale, "y")
        }




    }
    drawTopDensity(scatterData){
        let topDensitylineData = this.layerPlaneData.layerStatistic["top density plot"]
        if(topDensitylineData){
            let sampleKeyName = scatterData.columns[0]
            let xKeyName = scatterData.columns[1]


            topDensitylineData.forEach((layer,li)=> {
                if (!layer.isShowObj.isShow) {
                    return
                }

                let  colorScale = d3.scaleOrdinal()
                    .domain(layer.categoryList)
                    .range(layer.categoryColorList)

                if(layer.controlData.density["Density color"].switch.value){

                    colorScale.range(layer.categoryList.map(k=>layer.controlData.density["Density color"][k].value))
                }

                layer.colorScale = colorScale
                let dataSource = this.layerDataDict[layer.layerDataFlieKey].dataSource;
                let dataIndex = this.layerDataDict[layer.layerDataFlieKey].dataIndex;

                let columnsName  = dataSource.columns[layer.layerDataColumnsIndex[0]]

                for(let i=0;i<scatterData.length;i++){
                    if(!dataIndex.has(scatterData[i][sampleKeyName])){
                        this.showMessageBox("cuIcon-roundclose",`No ID called ${scatterData[i][sampleKeyName]}`,"error")

                        return;
                    }
                }

                let binData = layer.categoryList.map(category=>{
                    let range = scatterData.filter(d=>dataIndex.get(d[sampleKeyName])[columnsName]==category).map(d=>d[xKeyName]).sort()
                    let mmv =  d3.extent(range)
                    let trimRate = 1/4
                    let MaxMinRange = (mmv[1]-mmv[0])*trimRate
                    let sampleCount = layer.controlData.density["Density style"]["sample-count"].value
                    let binArr = d3.bin()
                        .domain(mmv)
                        .thresholds(d3.range(mmv[0],mmv[1],
                            (mmv[1] - mmv[0])/sampleCount

                        ))(range)
                    binArr.forEach(function (ele){
                        ele.middleValue = (ele.x0 + ele.x1)/2
                        ele.frequency = ele.length
                    })
                    binArr.unshift({
                        middleValue:mmv[0],
                        frequency:0
                    })
                    binArr.push({
                        middleValue:mmv[1],
                        frequency:0
                    })

                    return {
                        name:category,
                        dataArr:range,
                        binArr:binArr
                    }
                })
                console.log(binData)

                let maxFrequency = d3.max(binData, d=>d3.max(d.binArr, d=>d.frequency));
                let canvasHeight = layer.controlData.canvas["Canvas scale"].height.value
                let offset = layer.controlData.canvas["Canvas scale"].y.value
                const densityScale = d3.scaleLinear().domain([maxFrequency,0]).range([0,canvasHeight])
                const area = d3.area()
                    .x((d,i)=>this.xScale(d.middleValue))
                    .y0(0)
                    .y1((d,i)=>-densityScale(d.frequency))

                const line = d3.line()
                    .x((d,i)=>this.xScale(d.middleValue))
                    .y((d,i)=>densityScale(d.frequency)-canvasHeight)
                    .curve(d3.curveBundle.beta(1))

                let mainG = this.maingroup.append("g")
                    .attr("transform",d=>`translate(0,${-canvasHeight+offset})`)

                this.addCustomAxis(layer.controlData, mainG, this.innerwidth, canvasHeight, {xScale:this.xScale,yScale:densityScale})


                    mainG
                    .selectAll("densityGroupG")
                    .data(binData)
                    .join("g")
                    .attr("transform",d=>`translate(0,${canvasHeight})`)
                    .append("path")
                    .attr('fill',d=>colorScale(d.name))
                    .attr('stroke',d=>{
                        if(layer.controlData.density["Density style"]["stroke-as-fill"].value){
                            return colorScale(d.name)
                        }else {
                            return layer.controlData.density["Density style"].stroke.value
                        }

                    })
                    .datum(d=>d.binArr)
                    .attr('d',line)
                    .attr('class',layer.controlData.density["Density style"].id)
                    .call(P=>{
                        this.renderAttr(P, layer.controlData.density["Density style"])
                    })










            })

        }
    }
    drawRightDensity(scatterData){
        let topDensitylineData = this.layerPlaneData.layerStatistic["right density plot"]
        if(topDensitylineData){
            let sampleKeyName = scatterData.columns[0]
            let yKeyName = scatterData.columns[2]


            topDensitylineData.forEach((layer,li)=> {
                if (!layer.isShowObj.isShow) {
                    return
                }

                let  colorScale = d3.scaleOrdinal()
                    .domain(layer.categoryList)
                    .range(layer.categoryColorList)

                if(layer.controlData.density["Density color"].switch.value){

                    colorScale.range(layer.categoryList.map(k=>layer.controlData.density["Density color"][k].value))
                }

                layer.colorScale = colorScale
                let dataSource = this.layerDataDict[layer.layerDataFlieKey].dataSource;
                let dataIndex = this.layerDataDict[layer.layerDataFlieKey].dataIndex;

                let columnsName  = dataSource.columns[layer.layerDataColumnsIndex[0]]

                for(let i=0;i<scatterData.length;i++){
                    if(!dataIndex.has(scatterData[i][sampleKeyName])){
                        this.showMessageBox("cuIcon-roundclose",`No ID called ${scatterData[i][sampleKeyName]}`,"error")

                        return;
                    }
                }

                let binData = layer.categoryList.map(category=>{
                    let range = scatterData.filter(d=>dataIndex.get(d[sampleKeyName])[columnsName]==category).map(d=>d[yKeyName]).sort()
                    let mmv =  d3.extent(range)
                    let sampleCount = layer.controlData.density["Density style"]["sample-count"].value
                    let binArr = d3.bin()
                        .domain(mmv)
                        .thresholds(d3.range(mmv[0],mmv[1],
                            (mmv[1] - mmv[0])/sampleCount

                        ))(range)
                    binArr.forEach(function (ele){
                        ele.middleValue = (ele.x0 + ele.x1)/2
                        ele.frequency = ele.length
                    })
                    binArr.unshift({
                        middleValue:mmv[0],
                        frequency:0
                    })
                    binArr.push({
                        middleValue:mmv[1],
                        frequency:0
                    })

                    return {
                        name:category,
                        dataArr:range,
                        binArr:binArr
                    }
                })
                console.log(binData)

                let maxFrequency = d3.max(binData, d=>d3.max(d.binArr, d=>d.frequency));
                let canvasWidth = layer.controlData.canvas["Canvas scale"].width.value
                let offset = layer.controlData.canvas["Canvas scale"].x.value
                const densityScale = d3.scaleLinear().domain([0,maxFrequency]).range([0,canvasWidth])


                const line = d3.line()
                    .y((d,i)=>this.yScale(d.middleValue))
                    .x((d,i)=>densityScale(d.frequency))
                    .curve(d3.curveBundle.beta(1))

                let mainG = this.maingroup.append("g")
                    .attr("transform",d=>`translate(${this.innerwidth+offset},0)`)

                this.addCustomAxis(layer.controlData, mainG, canvasWidth, this.innerHeight, {xScale:densityScale,yScale:this.yScale})


                mainG
                    .selectAll("densityGroupG")
                    .data(binData)
                    .join("g")
                    // .attr("transform",d=>`translate(${this.innerwidth},0)`)
                    .append("path")
                    .attr('fill',d=>colorScale(d.name))
                    .attr('stroke',d=>{
                        if(layer.controlData.density["Density style"]["stroke-as-fill"].value){
                            return colorScale(d.name)
                        }else {
                            return layer.controlData.density["Density style"].stroke.value
                        }

                    })
                    .datum(d=>d.binArr)
                    .attr('d',line)
                    .attr('class',layer.controlData.density["Density style"].id)
                    .call(P=>{
                        this.renderAttr(P, layer.controlData.density["Density style"])
                    })










            })

        }
    }
    linearRegression(x,y){

        var lr = {};
        var n = y.length;
        var sum_x = 0;
        var sum_y = 0;
        var sum_xy = 0;
        var sum_xx = 0;
        var sum_yy = 0;

        for (var i = 0; i < y.length; i++) {

            sum_x += x[i];
            sum_y += y[i];
            sum_xy += (x[i]*y[i]);
            sum_xx += (x[i]*x[i]);
            sum_yy += (y[i]*y[i]);
        }

        lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
        lr['intercept'] = (sum_y - lr.slope * sum_x)/n;
        lr['r2'] = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);

        return lr;

    };
    creatVueApp() {
        this.figureData.yAxis.Tick.tickValues = {
            type:"text",
            value:"",
            isSvgAttr:true
        }

        this.figureData.xAxis.Tick.tickValues = {
            type:"text",
            value:"",
            isSvgAttr:true
        }
        return super.creatVueApp();
    }

    drawLegend(){
        //    符号
        let symbolData = this.layerPlaneData.layerStatistic["modify shape and color"]
        if(symbolData){
            symbolData.forEach(layer=>{
                if(!layer.isShowObj.isShow){
                    return
                }
        let symbolTypeDict = {}
                layer.categoryList.map(d=>{
                    let symbolType = layer.controlData.symbol["symbol type"]

                    let symbol_type_index = symbolType[d].value
                    symbolTypeDict[d] = symbolType[d].optionList[symbol_type_index]

                })
                console.log(symbolTypeDict)
                console.log(layer.colorScale.domain())
        this.legendObj.drawCategoryShapeLegend(layer.controlData.legend,layer.colorScale.domain(),layer.colorScale,symbolTypeDict,layer.legendDragData)

            })
        }

        //    形状
        let shapeData = this.layerPlaneData.layerStatistic["change shape only"]
        if(shapeData){
            shapeData.forEach(layer=>{
                if(!layer.isShowObj.isShow){
                    return
                }
                let symbolTypeDict = {}
                layer.categoryList.map(d=>{
                    let symbolType = layer.controlData.symbol["symbol type"]

                    let symbol_type_index = symbolType[d].value
                    symbolTypeDict[d] = symbolType[d].optionList[symbol_type_index]

                })

                console.log(symbolTypeDict)

                this.legendObj.drawCategoryShapeLegend(
                    layer.controlData.legend,
                    layer.categoryList,
                    d3.scaleOrdinal()
                        .range(["#4d4d4d"]),
                    symbolTypeDict,
                    layer.legendDragData)

            })
        }

        //    气泡图
        let bubbleData = this.layerPlaneData.layerStatistic["size of points"]
        if(bubbleData){

            bubbleData.forEach(layer=> {
                console.log(layer)
                if (!layer.isShowObj.isShow) {
                    return
                }
                let legend = layer.controlData.legend

                this.legendObj.drawBaseSizeLegend(legend,layer.mmv,layer.sizeScale,layer.legendDragData,{symbolType:layer.symbolType})



            })


        }

        //    热图
        let gradientColorOfPointsData = this.layerPlaneData.layerStatistic["gradient color of points"]
        if(gradientColorOfPointsData){

            gradientColorOfPointsData.forEach(layer=> {
                console.log(layer)
                if (!layer.isShowObj.isShow) {
                    return
                }
                let medianValue = undefined
                if(layer.controlData.legend["ColorBar range"]["median-value"].value) {
                    medianValue = Number(layer.controlData.legend["ColorBar range"]["median-value"].value)
                }
                this.legendObj.drawColorBarLegend(
                    layer.controlData.legend,
                    layer.mmv,
                    layer.customColorInterpolate,
                    layer.legendDragData,
                    medianValue
                )



            })


        }
    }




}


export {ScatterPlot}