

class Legend {
    constructor(mainPlot) {
        this.mainPlot = mainPlot
        this.legendControlDataDict = {
            "baseCategoryLegend": function (idSuffix=""){
                return {
                    "Legend": {
                        "switch": {
                            type: "check",
                            value: true,
                            isFresh: true

                        },

                    },
                    "Legend title": {
                        "id": `legend-title-text-${idSuffix}`,
                        "text": {
                            type: "text",
                            value: "ChiPlot",
                            isSvgAttr: false
                        },
                        "font-size": {
                            type: "seq",
                            value: 16,
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
                            value: 1,
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
                            value: -10,
                            isSvgAttr: true,
                            scaleStep: 1,
                            min: -Infinity,
                            max: Infinity
                        }
                    },
                    "Square": {
                        "id": `legend-rect-style-${idSuffix}`,
                        "spacing": {
                            type: "seq",
                            value: 30,
                            isSvgAttr: false,
                            scaleStep: 1,
                            min: 0,
                            max: Infinity
                        },
                        "size": {
                            type: "seq",
                            value: 25,
                            isSvgAttr: false,
                            scaleStep: 1,
                            min: 1,
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
                        "stroke": {
                            type: "color",
                            value: "#000000",
                            isSvgAttr: true
                        },
                        "stroke-width": {
                            type: "seq",
                            value: 0,
                            isSvgAttr: true,
                            scaleStep: 1,
                            min: 0,
                            max: Infinity
                        },
                        "stroke-opacity": {
                            type: "seq",
                            value: 1,
                            isSvgAttr: true,
                            scaleStep: 0.01,
                            min: 0,
                            max: 1
                        }, "rx": {
                            type: "seq",
                            value: 2,
                            isSvgAttr: true,
                            scaleStep: 1,
                            min: 0,
                            max: Infinity
                        },
                        "ry": {
                            type: "seq",
                            value: 2,
                            isSvgAttr: true,
                            scaleStep: 1,
                            min: 0,
                            max: Infinity
                        }
                    },
                    "Text style": {
                        "id": `legend-item-text-${idSuffix}`,

                        "font-size": {
                            type: "seq",
                            value: 16,
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
                            value: 0,
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
                            value: 6,
                            isSvgAttr: true,
                            scaleStep: 1,
                            min: -Infinity,
                            max: Infinity

                        },
                    },
                    "Layout":{
                        "columns":{
                            type:"seq",
                            value:1,
                            isSvgAttr:false,
                            scaleStep:1,
                            min:1,
                            max:Infinity
                        },
                        "spacing":{
                            type:"seq",
                            value:20,
                            isSvgAttr:false,
                            scaleStep:1,
                            min:0,
                            max:Infinity
                        },

                    }

                }
            },
            "categoryBoxLegend": function (idSuffix=""){
                return {
                    "Legend": {
                        "switch": {
                            type: "check",
                            value: true,
                            isFresh: true

                        },

                    },
                    "Legend title": {
                        "id": `legend-title-text-${idSuffix}`,
                        "text": {
                            type: "text",
                            value: "ChiPlot",
                            isSvgAttr: false
                        },
                        "font-size": {
                            type: "seq",
                            value: 16,
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
                            value: 1,
                            isSvgAttr: true
                        },
                        "text-anchor": {
                            type: "opt",
                            optionList: ["start", "middle", "end"],
                            value: 0,
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
                            value: -10,
                            isSvgAttr: true,
                            scaleStep: 1,
                            min: -Infinity,
                            max: Infinity
                        }
                    },
                    "Box style": {
                        "id": `legend-box-style-${idSuffix}`,
                        "spacing": {
                            type: "seq",
                            value: 45,
                            isSvgAttr: false,
                            scaleStep: 1,
                            min: 0,
                            max: Infinity
                        },
                        "size": {
                            type: "seq",
                            value: 25,
                            isSvgAttr: false,
                            scaleStep: 1,
                            min: 1,
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
                        "stroke": {
                            type: "color",
                            value: "#000000",
                            isSvgAttr: false
                        },
                        "stroke-as-box":{
                            type:"check",
                            value:false,
                            isFresh:true

                        },
                        "stroke-width": {
                            type: "seq",
                            value: 1,
                            isSvgAttr: true,
                            scaleStep: 1,
                            min: 0,
                            max: Infinity
                        },
                        "stroke-opacity": {
                            type: "seq",
                            value: 1,
                            isSvgAttr: true,
                            scaleStep: 0.01,
                            min: 0,
                            max: 1
                        }, "rx": {
                            type: "seq",
                            value: 2,
                            isSvgAttr: true,
                            scaleStep: 1,
                            min: 0,
                            max: Infinity
                        },
                        "ry": {
                            type: "seq",
                            value: 2,
                            isSvgAttr: true,
                            scaleStep: 1,
                            min: 0,
                            max: Infinity
                        }
                    },
                    "Text style": {
                        "id": `legend-item-text-${idSuffix}`,

                        "font-size": {
                            type: "seq",
                            value: 16,
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
                            value: 0,
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
                            value: 6,
                            isSvgAttr: true,
                            scaleStep: 1,
                            min: -Infinity,
                            max: Infinity

                        },
                    },
                    "Layout":{
                        "columns":{
                            type:"seq",
                            value:1,
                            isSvgAttr:false,
                            scaleStep:1,
                            min:1,
                            max:Infinity
                        },
                        "spacing":{
                            type:"seq",
                            value:20,
                            isSvgAttr:false,
                            scaleStep:1,
                            min:0,
                            max:Infinity
                        },

                    }

                }
            },
            "categoryShapeLegend":function (idSuffix="") {
                return {
                    "Legend":{
                        "switch":{
                            type:"check",
                            value:true,
                            isFresh:true

                        },

                    },
                    "Legend title":{
                        "id":`legend-title-text-${idSuffix}`,
                        "text":{
                            type:"text",
                            value:"ChiPlot",
                            isSvgAttr:false
                        },
                        "font-size":{
                            type:"seq",
                            value:16,
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
                            value:1,
                            isSvgAttr:true
                        },
                        "text-anchor":{
                            type:"opt",
                            optionList:["start","middle","end"],
                            value:0,
                            isSvgAttr:true
                        },
                        "font-style":{
                            type:"opt",
                            optionList:["normal","italic"],
                            value:0,
                            isSvgAttr:true
                        },
                        "x":{
                            type:"seq",
                            value:0,
                            isSvgAttr:true,
                            scaleStep:1,
                            min:-Infinity,
                            max:Infinity

                        },
                        "y":{
                            type:"seq",
                            value:-15,
                            isSvgAttr:true,
                            scaleStep:1,
                            min:-Infinity,
                            max:Infinity
                        }
                    },
                    "Symbol":{
                        "id":`legend-symbol-path-${idSuffix}`,
                        "spacing":{
                            type:"seq",
                            value:25,
                            isSvgAttr:false,
                            scaleStep:1,
                            min:0,
                            max:Infinity
                        },
                        "size":{
                            type:"seq",
                            value:120,
                            isSvgAttr:false,
                            scaleStep:1,
                            min:1,
                            max:Infinity
                        },
                        "fill-opacity":{
                            type:"seq",
                            value:1,
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
                        "stroke-width":{
                            type:"seq",
                            value:0,
                            isSvgAttr:false,
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
                        },

                    },
                    "Text style":{
                        "id":`legend-item-text-${idSuffix}`,

                        "font-size":{
                            type:"seq",
                            value:16,
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
                            value:0,
                            isSvgAttr:true
                        },
                        "font-style":{
                            type:"opt",
                            optionList:["normal","italic"],
                            value:0,
                            isSvgAttr:true
                        },
                        "x":{
                            type:"seq",
                            value:10,
                            isSvgAttr:true,
                            scaleStep:1,
                            min:-Infinity,
                            max:Infinity

                        },
                    },
                    "Layout":{
                        "columns":{
                            type:"seq",
                            value:1,
                            isSvgAttr:false,
                            scaleStep:1,
                            min:1,
                            max:Infinity
                        },
                        "spacing":{
                            type:"seq",
                            value:20,
                            isSvgAttr:false,
                            scaleStep:1,
                            min:0,
                            max:Infinity
                        },

                    }

                }
            },
            "categoryShapeLineLegend":function (idSuffix="") {
                return {
                    "Legend":{
                        "switch":{
                            type:"check",
                            value:true,
                            isFresh:true

                        },

                    },
                    "Legend title":{
                        "id":`legend-title-text-${idSuffix}`,
                        "text":{
                            type:"text",
                            value:"ChiPlot",
                            isSvgAttr:false
                        },
                        "font-size":{
                            type:"seq",
                            value:16,
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
                            value:1,
                            isSvgAttr:true
                        },
                        "text-anchor":{
                            type:"opt",
                            optionList:["start","middle","end"],
                            value:0,
                            isSvgAttr:true
                        },
                        "font-style":{
                            type:"opt",
                            optionList:["normal","italic"],
                            value:0,
                            isSvgAttr:true
                        },
                        "x":{
                            type:"seq",
                            value:0,
                            isSvgAttr:true,
                            scaleStep:1,
                            min:-Infinity,
                            max:Infinity

                        },
                        "y":{
                            type:"seq",
                            value:-15,
                            isSvgAttr:true,
                            scaleStep:1,
                            min:-Infinity,
                            max:Infinity
                        }
                    },
                    "Symbol":{
                        "id":`legend-symbol-path-${idSuffix}`,
                        "spacing":{
                            type:"seq",
                            value:25,
                            isSvgAttr:false,
                            scaleStep:1,
                            min:0,
                            max:Infinity
                        },
                        "size":{
                            type:"seq",
                            value:120,
                            isSvgAttr:false,
                            scaleStep:1,
                            min:1,
                            max:Infinity
                        },
                        "fill-opacity":{
                            type:"seq",
                            value:1,
                            isSvgAttr:true,
                            scaleStep:0.01,
                            min:0,
                            max:1
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
                        },

                    },
                    "Line style":{
                        "id":`legend-line-style-${idSuffix}`,
                        "stroke-width":{
                            type:"seq",
                            value:4,
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
                        },
                        "stroke-linecap": {
                            type: "opt",
                            optionList: ["butt" , "round" , "square"],
                            value: 1,
                            isSvgAttr: true
                        },
                    },
                    "Text style":{
                        "id":`legend-item-text-${idSuffix}`,

                        "font-size":{
                            type:"seq",
                            value:16,
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
                            value:0,
                            isSvgAttr:true
                        },
                        "font-style":{
                            type:"opt",
                            optionList:["normal","italic"],
                            value:0,
                            isSvgAttr:true
                        },
                        "x":{
                            type:"seq",
                            value:30,
                            isSvgAttr:true,
                            scaleStep:1,
                            min:-Infinity,
                            max:Infinity

                        },
                    },
                    "Layout":{
                        "columns":{
                            type:"seq",
                            value:1,
                            isSvgAttr:false,
                            scaleStep:1,
                            min:1,
                            max:Infinity
                        },
                        "spacing":{
                            type:"seq",
                            value:20,
                            isSvgAttr:false,
                            scaleStep:1,
                            min:0,
                            max:Infinity
                        },

                    }

                }
            },
            "categoryArcLegend":function (idSuffix="") {
                return {
                    "Legend":{
                        "switch":{
                            type:"check",
                            value:true,
                            isFresh:true

                        },

                    },
                    "Legend title":{
                        "id":`legend-title-text-${idSuffix}`,
                        "text":{
                            type:"text",
                            value:"ChiPlot",
                            isSvgAttr:false
                        },
                        "font-size":{
                            type:"seq",
                            value:16,
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
                            value:1,
                            isSvgAttr:true
                        },
                        "text-anchor":{
                            type:"opt",
                            optionList:["start","middle","end"],
                            value:0,
                            isSvgAttr:true
                        },
                        "font-style":{
                            type:"opt",
                            optionList:["normal","italic"],
                            value:0,
                            isSvgAttr:true
                        },
                        "x":{
                            type:"seq",
                            value:0,
                            isSvgAttr:true,
                            scaleStep:1,
                            min:-Infinity,
                            max:Infinity

                        },
                        "y":{
                            type:"seq",
                            value:-15,
                            isSvgAttr:true,
                            scaleStep:1,
                            min:-Infinity,
                            max:Infinity
                        }
                    },
                    "Arc style":{
                        "id":`legend-Arc-path-${idSuffix}`,
                        "spacing":{
                            type:"seq",
                            value:30,
                            isSvgAttr:false,
                            scaleStep:1,
                            min:0,
                            max:Infinity
                        },
                        "size":{
                            type:"seq",
                            value:25,
                            isSvgAttr:false,
                            scaleStep:1,
                            min:1,
                            max:Infinity
                        },
                        "innerRadius":{
                            type:"seq",
                            value:0,
                            isSvgAttr:false,
                            scaleStep:1,
                            min:0,
                            max:Infinity
                        },
                        "stroke":{
                            type:"color",
                            value:"#000000",
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
                        },

                    },
                    "Text style":{
                        "id":`legend-item-text-${idSuffix}`,

                        "font-size":{
                            type:"seq",
                            value:16,
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
                            value:0,
                            isSvgAttr:true
                        },
                        "font-style":{
                            type:"opt",
                            optionList:["normal","italic"],
                            value:0,
                            isSvgAttr:true
                        },
                        "x":{
                            type:"seq",
                            value:10,
                            isSvgAttr:true,
                            scaleStep:1,
                            min:-Infinity,
                            max:Infinity

                        },
                    },
                    "Layout":{
                        "columns":{
                            type:"seq",
                            value:1,
                            isSvgAttr:false,
                            scaleStep:1,
                            min:1,
                            max:Infinity
                        },
                        "spacing":{
                            type:"seq",
                            value:20,
                            isSvgAttr:false,
                            scaleStep:1,
                            min:0,
                            max:Infinity
                        },

                    }

                }
            },
            "colorBarLegend": function (idSuffix="") {
                return {
                    "Legend":{
                        "switch":{
                            type:"check",
                            value:true,
                            isFresh:true

                        },


                    },
                    "Legend title": {
                        "id": `heatmap-color-bar-title-${idSuffix}`,
                        "text": {
                            type: "text",
                            value: "ChiPlot",
                            isSvgAttr: false
                        },
                        "font-size": {
                            type: "seq",
                            value: 14,
                            isSvgAttr: true,
                            scaleStep: 0.5,
                            min: 0,
                            max: Infinity,

                        },
                        "fill": {
                            type: "color",
                            value: "#000000",
                            isSvgAttr: true
                        },
                        "font-weight": {
                            type: "opt",
                            optionList: ["normal", "bold"],
                            value: 1,
                            isSvgAttr: true
                        },
                        "font-style": {
                            type: "opt",
                            optionList: ["normal", "italic"],
                            value: 0,
                            isSvgAttr: true
                        },
                        "text-anchor": {
                            type: "opt",
                            optionList: ["start", "middle", "end"],
                            value: 1,
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
                            value: -10,
                            isSvgAttr: true,
                            scaleStep: 1,
                            min: -Infinity,
                            max: Infinity
                        }
                    },
                    "ColorBar range": {
                        "reverse": {
                            type: "check",
                            value: false,
                            isFresh: true

                        },
                        "max-value": {
                            type: "text",
                            value: "",
                            isSvgAttr: true
                        },
                        "median-value": {
                            type: "text",
                            value: "",
                            isSvgAttr: true
                        },
                        "min-value": {
                            type: "text",
                            value: "",
                            isSvgAttr: true
                        }
                    },
                    "ColorBar style": {
                        "direction": {
                            type: "opt",
                            optionList: ["vertical", "horizontal"],
                            value: 0,
                            isSvgAttr: true
                        },
                        "width": {
                            type: "seq",
                            value: 20,
                            isSvgAttr: true,
                            scaleStep: 1,
                            min: 0,
                            max: Infinity

                        },
                        "height": {
                            type: "seq",
                            value: 200,
                            isSvgAttr: true,
                            scaleStep: 1,
                            min: 0,
                            max: Infinity

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
                    },
                    "Tick style": {
                        "id": `legendQvalue-item-tick-${idSuffix}`,


                        "tick-length": {
                            type: "seq",
                            value: 5,
                            isSvgAttr: false,
                            scaleStep: 1,
                            min: 0,
                            max: Infinity

                        },
                        "stroke": {
                            type: "color",
                            value: "#000000",
                            isSvgAttr: true
                        },
                        "stroke-width":{
                            type:"seq",
                            value:1,
                            isSvgAttr:true,
                            scaleStep:1,
                            min:0,
                            max:Infinity
                        },

                    },
                    "Text style": {
                        "id": `legendQvalue-item-text-${idSuffix}`,
                        "position": {
                            type: "opt",
                            optionList: ["left/bottom", "right/top"],
                            value: 1,
                            isSvgAttr: true
                        },
                        "reverse": {
                            type: "check",
                            value: true,
                            isFresh: true
                        },
                        "tickValues" : {
                            type:"text",
                            value:"",
                            isSvgAttr:true,
                            helpLink:"/static/help_book/XYAxis-like_plot/Axis/Tick.html#tickvalues"
                        },
                        "tickFormat" : {
                            type:"text",
                            value:"",
                            isSvgAttr:true,
                            helpLink:"/static/help_book/XYAxis-like_plot/Axis/Tick.html"
                        },

                        "font-size": {
                            type: "seq",
                            value: 16,
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

                        "font-style": {
                            type: "opt",
                            optionList: ["normal", "italic"],
                            value: 0,
                            isSvgAttr: true
                        },
                        "offset": {
                            type: "seq",
                            value: -6,
                            isSvgAttr: false,
                            scaleStep: 1,
                            min: -Infinity,
                            max: Infinity

                        },
                    },
                }
            },
            "baseSizeLegend":function (idSuffix="") {
                return {
                    "Legend": {
                        "switch": {
                            type: "check",
                            value: true,
                            isFresh: true

                        },

                    },
                    "Legend title":{
                        "id":`legend-title-${idSuffix}`,
                        "text":{
                            type:"text",
                            value:"Size",
                            isSvgAttr:false
                        },
                        "font-size":{
                            type:"seq",
                            value:16,
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
                            value:1,
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
                        "x":{
                            type:"seq",
                            value:0,
                            isSvgAttr:true,
                            scaleStep:1,
                            min:-Infinity,
                            max:Infinity

                        },
                        "y":{
                            type:"seq",
                            value:-25,
                            isSvgAttr:true,
                            scaleStep:1,
                            min:-Infinity,
                            max:Infinity

                        }
                    },
                    "Symbol style":{
                        "id":`legend-circle-${idSuffix}`,
                        "range-step":{
                            type:"seq",
                            value:1,
                            isSvgAttr:false,
                            scaleStep:1,
                            min:0,
                            max:Infinity
                        },
                        "spacing":{
                            type:"seq",
                            value:10,
                            isSvgAttr:false,
                            scaleStep:2,
                            min:0,
                            max:Infinity
                        },
                        "min-value":{
                            type:"text",
                            value:"",
                            isSvgAttr:true
                        },
                        "max-value":{
                            type:"text",
                            value:"",
                            isSvgAttr:true
                        },
                        "fill":{
                            type:"color",
                            value:"#666666",
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
                    },
                    "Background":{
                        "id":`legend-background-rect-style-${idSuffix}`,
                        "switch":{
                            type:"check",
                            value:true,
                            isFresh:true

                        },
                        "fill":{
                            type:"color",
                            value:"#ebebeb",
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
                        "stroke":{
                            type:"color",
                            value:"#666666",
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
                        },
                        "rx":{
                            type:"seq",
                            value:4,
                            isSvgAttr:true,
                            scaleStep:1,
                            min:0,
                            max:Infinity
                        },
                        "ry":{
                            type:"seq",
                            value:4,
                            isSvgAttr:true,
                            scaleStep:1,
                            min:0,
                            max:Infinity
                        }
                    },
                    "Text style":{
                        "id":`legendCount-item-text-${idSuffix}`,
                        "value-format" : {
                            type:"text",
                            value:"",
                            isSvgAttr:false,
                            helpLink:"/static/help_book/XYAxis-like_plot/Axis/Tick.html"
                        },
                        "font-size":{
                            type:"seq",
                            value:16,
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
                            value:0,
                            isSvgAttr:true
                        },
                        "font-style":{
                            type:"opt",
                            optionList:["normal","italic"],
                            value:0,
                            isSvgAttr:true
                        },
                    },

                }
            },
            "baseThicknessLegend":function (idSuffix="") {
                return {
                    "Legend": {
                        "switch": {
                            type: "check",
                            value: true,
                            isFresh: true

                        },

                    },
                    "Legend title":{
                        "id":`legend-title-${idSuffix}`,
                        "text":{
                            type:"text",
                            value:"Thickness",
                            isSvgAttr:false
                        },
                        "font-size":{
                            type:"seq",
                            value:16,
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
                            value:1,
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
                        "x":{
                            type:"seq",
                            value:0,
                            isSvgAttr:true,
                            scaleStep:1,
                            min:-Infinity,
                            max:Infinity

                        },
                        "y":{
                            type:"seq",
                            value:-25,
                            isSvgAttr:true,
                            scaleStep:1,
                            min:-Infinity,
                            max:Infinity

                        }
                    },
                    "Symbol style":{
                        "id":`legend-circle-${idSuffix}`,
                        "range-step":{
                            type:"seq",
                            value:1,
                            isSvgAttr:false,
                            scaleStep:1,
                            min:0,
                            max:Infinity
                        },
                        "spacing":{
                            type:"seq",
                            value:20,
                            isSvgAttr:false,
                            scaleStep:1,
                            min:0,
                            max:Infinity
                        },
                        "min-value":{
                            type:"text",
                            value:"",
                            isSvgAttr:true
                        },
                        "max-value":{
                            type:"text",
                            value:"",
                            isSvgAttr:true
                        },
                        "stroke":{
                            type:"color",
                            value:"#000000",
                            isSvgAttr:true
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
                    "Background":{
                        "id":`legend-background-rect-style-${idSuffix}`,
                        "switch":{
                            type:"check",
                            value:true,
                            isFresh:true

                        },
                        "fill":{
                            type:"color",
                            value:"#ebebeb",
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
                        "stroke":{
                            type:"color",
                            value:"#666666",
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
                        },
                        "rx":{
                            type:"seq",
                            value:4,
                            isSvgAttr:true,
                            scaleStep:1,
                            min:0,
                            max:Infinity
                        },
                        "ry":{
                            type:"seq",
                            value:4,
                            isSvgAttr:true,
                            scaleStep:1,
                            min:0,
                            max:Infinity
                        }
                    },
                    "Text style":{
                        "id":`legendCount-item-text-${idSuffix}`,
                        "value-format" : {
                            type:"text",
                            value:"",
                            isSvgAttr:false,
                            helpLink:"/static/help_book/XYAxis-like_plot/Axis/Tick.html"
                        },
                        "font-size":{
                            type:"seq",
                            value:16,
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
                            value:0,
                            isSvgAttr:true
                        },
                        "font-style":{
                            type:"opt",
                            optionList:["normal","italic"],
                            value:0,
                            isSvgAttr:true
                        },
                    },

                }
            },
            "solidDashLineLegend":function (idSuffix="") {
                return {
                    "Legend": {
                        "switch": {
                            type: "check",
                            value: true,
                            isFresh: true

                        },

                    },
                    "Legend title":{
                        "id":`legend-title-${idSuffix}`,
                        "text":{
                            type:"text",
                            value:"Thickness",
                            isSvgAttr:false
                        },
                        "font-size":{
                            type:"seq",
                            value:16,
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
                            value:1,
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
                        "x":{
                            type:"seq",
                            value:0,
                            isSvgAttr:true,
                            scaleStep:1,
                            min:-Infinity,
                            max:Infinity

                        },
                        "y":{
                            type:"seq",
                            value:-25,
                            isSvgAttr:true,
                            scaleStep:1,
                            min:-Infinity,
                            max:Infinity

                        }
                    },
                    "Symbol style":{
                        "id":`legend-circle-${idSuffix}`,
                        "spacing":{
                            type:"seq",
                            value:20,
                            isSvgAttr:false,
                            scaleStep:1,
                            min:0,
                            max:Infinity
                        },

                        "stroke":{
                            type:"color",
                            value:"#000000",
                            isSvgAttr:true
                        },
                        "stroke-width":{
                            type:"seq",
                            value:2,
                            isSvgAttr:false,
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
                    "Background":{
                        "id":`legend-background-rect-style-${idSuffix}`,
                        "switch":{
                            type:"check",
                            value:true,
                            isFresh:true

                        },
                        "fill":{
                            type:"color",
                            value:"#ebebeb",
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
                        "stroke":{
                            type:"color",
                            value:"#666666",
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
                        },
                        "rx":{
                            type:"seq",
                            value:4,
                            isSvgAttr:true,
                            scaleStep:1,
                            min:0,
                            max:Infinity
                        },
                        "ry":{
                            type:"seq",
                            value:4,
                            isSvgAttr:true,
                            scaleStep:1,
                            min:0,
                            max:Infinity
                        }
                    },
                    "Text style":{
                        "id":`legendCount-item-text-${idSuffix}`,

                        "font-size":{
                            type:"seq",
                            value:16,
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
                            value:0,
                            isSvgAttr:true
                        },
                        "font-style":{
                            type:"opt",
                            optionList:["normal","italic"],
                            value:0,
                            isSvgAttr:true
                        },
                    },

                }
            },

            "categoryBranchesLegend":function (idSuffix="") {
                return {
                    "Legend":{
                        "switch":{
                            type:"check",
                            value:true,
                            isFresh:true

                        },

                    },
                    "Legend title":{
                        "id":`legend-title-text-${idSuffix}`,
                        "text":{
                            type:"text",
                            value:"ChiPlot",
                            isSvgAttr:false
                        },
                        "font-size":{
                            type:"seq",
                            value:16,
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
                            value:1,
                            isSvgAttr:true
                        },
                        "text-anchor":{
                            type:"opt",
                            optionList:["start","middle","end"],
                            value:0,
                            isSvgAttr:true
                        },
                        "font-style":{
                            type:"opt",
                            optionList:["normal","italic"],
                            value:0,
                            isSvgAttr:true
                        },
                        "x":{
                            type:"seq",
                            value:0,
                            isSvgAttr:true,
                            scaleStep:1,
                            min:-Infinity,
                            max:Infinity

                        },
                        "y":{
                            type:"seq",
                            value:-15,
                            isSvgAttr:true,
                            scaleStep:1,
                            min:-Infinity,
                            max:Infinity
                        }
                    },
                    "Symbol":{
                        "id":`legend-symbol-path-${idSuffix}`,
                        "spacing":{
                            type:"seq",
                            value:25,
                            isSvgAttr:false,
                            scaleStep:1,
                            min:0,
                            max:Infinity
                        },
                        "size":{
                            type:"seq",
                            value:120,
                            isSvgAttr:false,
                            scaleStep:1,
                            min:1,
                            max:Infinity
                        },
                        "fill-opacity":{
                            type:"seq",
                            value:1,
                            isSvgAttr:true,
                            scaleStep:0.01,
                            min:0,
                            max:1
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
                        },

                    },
                    "Text style":{
                        "id":`legend-item-text-${idSuffix}`,

                        "font-size":{
                            type:"seq",
                            value:16,
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
                            value:0,
                            isSvgAttr:true
                        },
                        "font-style":{
                            type:"opt",
                            optionList:["normal","italic"],
                            value:0,
                            isSvgAttr:true
                        },
                        "x":{
                            type:"seq",
                            value:10,
                            isSvgAttr:true,
                            scaleStep:1,
                            min:-Infinity,
                            max:Infinity

                        },
                    },
                    "Layout":{
                        "columns":{
                            type:"seq",
                            value:1,
                            isSvgAttr:false,
                            scaleStep:1,
                            min:1,
                            max:Infinity
                        },
                        "spacing":{
                            type:"seq",
                            value:20,
                            isSvgAttr:false,
                            scaleStep:1,
                            min:0,
                            max:Infinity
                        },

                    }

                }
            },
            "categoryLineLegend": function (idSuffix=""){
                return {
                    "Legend": {
                        "switch": {
                            type: "check",
                            value: true,
                            isFresh: true

                        },

                    },
                    "Legend title": {
                        "id": `legend-title-text-${idSuffix}`,
                        "text": {
                            type: "text",
                            value: "ChiPlot",
                            isSvgAttr: false
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
                            value: 1,
                            isSvgAttr: true
                        },
                        "text-anchor": {
                            type: "opt",
                            optionList: ["start", "middle", "end"],
                            value: 0,
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
                            value: -10,
                            isSvgAttr: true,
                            scaleStep: 1,
                            min: -Infinity,
                            max: Infinity
                        }
                    },
                    "Line": {
                        "id": `legend-rect-style-${idSuffix}`,
                        "spacing": {
                            type: "seq",
                            value: 30,
                            isSvgAttr: false,
                            scaleStep: 1,
                            min: 0,
                            max: Infinity
                        },
                        "length": {
                            type: "seq",
                            value: 30,
                            isSvgAttr: false,
                            scaleStep: 1,
                            min: 1,
                            max: Infinity
                        },
                        "stroke-width": {
                            type: "seq",
                            value: 4,
                            isSvgAttr: true,
                            scaleStep: 1,
                            min: 0,
                            max: Infinity
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
                    "Text style": {
                        "id": `legend-item-text-${idSuffix}`,

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
                            value: 0,
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
                            value: 6,
                            isSvgAttr: true,
                            scaleStep: 1,
                            min: -Infinity,
                            max: Infinity

                        },
                    },

                }
            },

        }

    }
    addLayerType(layerType, handleLayerDataFunction){

        this.layerTypeList.push(layerType)
        this.handleLayerDataFunctionDict[layerType] = handleLayerDataFunction

    }
    getLegendControlData(key,...parms){
        if (parms.length == 1){
            return parms[0](this.legendControlDataDict[key]())

        }else{
            return parms[1](this.legendControlDataDict[key](parms[0]))
        }
    }
    getTextWidth(str, fontSize) {

        let T = this.mainPlot.svg.append("text")
            .text(str)
            .attr("font-size",fontSize)
        let result = T.nodes()[0].getBoundingClientRect().width

        T.remove()

        return result;
    }
    getColumnsData(categoryList, columns, fontSize){
        let rows = Math.ceil(categoryList.length/columns)
        let col_data = []
        let translateX = 0

        categoryList.forEach((ele,i)=>{
            let col_index = parseInt(i/rows)
            if(i%rows == 0){
                if(col_index>0){
                    translateX += this.getTextWidth(col_data[col_index-1].maxLengthName,fontSize)
                }
                col_data.push({
                    rowItems:[],
                    maxLengthName:"",
                    translateX:translateX
                })
            }

            col_data[col_index].rowItems.push(ele)
            if(ele.length > col_data[col_index].maxLengthName.length){
                col_data[col_index].maxLengthName = ele
            }


        })
        return col_data
    }
    drawBaseCategoryLegend(legendControlData,
                               categoryList,
                               colorScale,
                               legendDragData,
                           {patternScale,
                           shape="rect"
                           }={}){



        let legend = legendControlData
        if(!legend.Legend.switch.value){
            return
        }
        let columns = legend.Layout.columns.value
        let spacing = legend.Layout.spacing.value
        let col_data = this.getColumnsData(categoryList,columns,legend["Text style"]["font-size"].value)

        console.log(col_data)
        let g = this.mainPlot.zoomG.append('g').data([legendDragData])
            .attr("transform", d=>`translate(${d.x},${d.y})`)
            .attr("text-anchor", "start")
            .call(this.mainPlot.drag())
            .call(g=>{
                let text = g.append('text')
                    .attr("class", legend["Legend title"].id)

                this.mainPlot.renderAttr(text,legend["Legend title"])
                this.mainPlot.renderText(text, legend["Legend title"].text.value)
            })
            .selectAll("col")
            .data(col_data)
            .join("g")
            .attr("transform", (d,i) => `translate(${d.translateX + i * (legend["Square"]["size"].value + spacing)},0)`)
            .selectAll("LegendG1")
            .data(d=>d.rowItems)
            .join("g")
            .attr("transform", (d, i) => `translate(0,${i * legend["Square"]["spacing"].value})`)
            .call(g=>{
                let squareOBJ = legend["Square"]
                let square_G = undefined
                if (shape == "rect"){
                    square_G = g.append("rect")
                        .attr("x", -squareOBJ["size"].value)
                        .attr("width", squareOBJ["size"].value)
                        .attr("height", squareOBJ["size"].value)
                }else {
                    square_G = g.append("circle")
                        .attr("cx", -squareOBJ["size"].value/2)
                        .attr("cy", squareOBJ["size"].value/2)
                        .attr("r", squareOBJ["size"].value/2)
                }


                square_G
                    .attr("class", squareOBJ.id)
                    .attr("fill", d=>colorScale(d))
                    .call(rect=>{
                        if(patternScale){
                            rect.filter(d=> {
                                console.log(patternScale(d))
                                return patternScale(d) != "None"
                            })
                                .clone()
                                .attr("fill",d=>`url(#pattern-${patternScale(d)})`)
                        }
                    })


                this.mainPlot.renderAttr(square_G, squareOBJ)


                let textStyle = legend["Text style"]

                let text_G = g.append("text")
                    .attr("class",textStyle.id)
                    .attr("dy","0.3em")
                    .attr("y",squareOBJ["size"].value/2)
                    .text(d => d);

                this.mainPlot.renderAttr(text_G, textStyle)

            })



    }
    drawCategoryGeneLegend(legendControlData,
                           categoryList,
                           colorScale,
                           legendDragData,
                           {patternScale,
                               shape="rect"
                           }={}){



        let legend = legendControlData
        if(!legend.Legend.switch.value){
            return
        }
        let columns = legend.Layout.columns.value
        let spacing = legend.Layout.spacing.value
        let col_data = this.getColumnsData(categoryList,columns,legend["Text style"]["font-size"].value)

        console.log(col_data)
        let g = this.mainPlot.zoomG.append('g').data([legendDragData])
            .attr("transform", d=>`translate(${d.x},${d.y})`)
            .attr("text-anchor", "start")
            .call(this.mainPlot.drag())
            .call(g=>{
                let text = g.append('text')
                    .attr("class", legend["Legend title"].id)

                this.mainPlot.renderAttr(text,legend["Legend title"])
                this.mainPlot.renderText(text, legend["Legend title"].text.value)
            })
            .selectAll("col")
            .data(col_data)
            .join("g")
            .attr("transform", (d,i) => `translate(${d.translateX + i * (legend["Square"]["size"].value + spacing)},0)`)
            .selectAll("LegendG1")
            .data(d=>d.rowItems)
            .join("g")
            .attr("transform", (d, i) => `translate(0,${i * legend["Square"]["spacing"].value})`)
            .call(g=>{
                let squareOBJ = legend["Square"]
                let w = squareOBJ["size"].value
                let square_G = g.append("path")
                    .attr("d",`M${-w},0L${-w/2},0L0,${w/2}L${-w/2},${w}L${-w},${w}Z`)




                square_G
                    .attr("class", squareOBJ.id)
                    .attr("fill", d=>colorScale(d))
                    .call(rect=>{
                        if(patternScale){
                            rect.filter(d=> {
                                console.log(patternScale(d))
                                return patternScale(d) != "None"
                            })
                                .clone()
                                .attr("fill",d=>`url(#pattern-${patternScale(d)})`)
                        }
                    })


                this.mainPlot.renderAttr(square_G, squareOBJ)


                let textStyle = legend["Text style"]

                let text_G = g.append("text")
                    .attr("class",textStyle.id)
                    .attr("dy","0.3em")
                    .attr("y",squareOBJ["size"].value/2)
                    .text(d => d);

                this.mainPlot.renderAttr(text_G, textStyle)

            })



    }
    drawCategoryBoxLegend(legendControlData, categoryList, colorScale, legendDragData, patternScale){



        let legend = legendControlData
        if(!legend.Legend.switch.value){
            return
        }
        let columns = legend.Layout.columns.value
        let spacing = legend.Layout.spacing.value
        let col_data = this.getColumnsData(categoryList,columns,legend["Text style"]["font-size"].value)

        console.log(col_data)
        let g = this.mainPlot.zoomG.append('g').data([legendDragData])
            .attr("transform", d=>`translate(${d.x},${d.y})`)
            .attr("text-anchor", "start")
            .call(this.mainPlot.drag())
            .call(g=>{
                let text = g.append('text')
                    .attr("class", legend["Legend title"].id)

                this.mainPlot.renderAttr(text,legend["Legend title"])
                this.mainPlot.renderText(text, legend["Legend title"].text.value)
            })
            .selectAll("col")
            .data(col_data)
            .join("g")
            .attr("transform", (d,i) => `translate(${d.translateX + i * (legend["Box style"]["size"].value + spacing)},0)`)
            .selectAll("LegendG1")
            .data(d=>d.rowItems)
            .join("g")
            .attr("transform", (d, i) => `translate(0,${i * legend["Box style"]["spacing"].value})`)
            .call(g=>{
                let squareOBJ = legend["Box style"]
                let square_G = g.append("rect")
                    .attr("class", squareOBJ.id)
                    .attr("x", -squareOBJ["size"].value)
                    .attr("width", squareOBJ["size"].value)
                    .attr("height", squareOBJ["size"].value)
                    .attr("fill", d=>colorScale(d))
                    .call(rect=>{
                        if(patternScale){
                            rect.filter(d=> {
                                console.log(patternScale(d))
                                return patternScale(d) != "None"
                            })
                                .clone()
                                .attr("fill",d=>`url(#pattern-${patternScale(d)})`)
                        }
                        rect.attr("stroke", d=>squareOBJ["stroke-as-box"].value ? colorScale(d) : squareOBJ.stroke.value)
                    })

                let middleLine = g.append("line")
                    .attr("class", squareOBJ.id)
                    .attr("y1",squareOBJ["size"].value/2)
                    .attr("x1",-squareOBJ["size"].value)
                    .attr("y2",squareOBJ["size"].value/2)
                    .attr("stroke", d=>squareOBJ["stroke-as-box"].value ? colorScale(d) : squareOBJ.stroke.value)

                let upLine = g.append("line")
                    .attr("class", squareOBJ.id)
                    .attr("x1",-squareOBJ["size"].value/2)
                    .attr("x2",-squareOBJ["size"].value/2)
                    .attr("y2",-squareOBJ["size"].value/4)
                    .attr("stroke", d=>squareOBJ["stroke-as-box"].value ? colorScale(d) : squareOBJ.stroke.value)

                let downLine = g.append("line")
                    .attr("class", squareOBJ.id)
                    .attr("x1",-squareOBJ["size"].value/2)
                    .attr("x2",-squareOBJ["size"].value/2)
                    .attr("y1",squareOBJ["size"].value)
                    .attr("y2",squareOBJ["size"].value/4*5)
                    .attr("stroke", d=>squareOBJ["stroke-as-box"].value ? colorScale(d) : squareOBJ.stroke.value)

                this.mainPlot.renderAttr(square_G, squareOBJ)
                this.mainPlot.renderAttr(middleLine, squareOBJ)
                this.mainPlot.renderAttr(upLine, squareOBJ)
                this.mainPlot.renderAttr(downLine, squareOBJ)


                let textStyle = legend["Text style"]

                let text_G = g.append("text")
                    .attr("class",textStyle.id)
                    .attr("dy","0.3em")
                    .attr("y",squareOBJ["size"].value/2)
                    .text(d => d);

                this.mainPlot.renderAttr(text_G, textStyle)

            })



    }
    drawCategoryLineLegend(legendControlData, categoryList, colorScale, legendDragData){



        let legend = legendControlData
        if(!legend.Legend.switch.value){
            return
        }
        let g = this.mainPlot.zoomG.append('g').data([legendDragData])
            .attr("transform", d=>`translate(${d.x},${d.y})`)
            .attr("text-anchor", "start")
            .call(this.mainPlot.drag())
            .call(g=>{
                let text = g.append('text')
                    .attr("class", legend["Legend title"].id)

                this.mainPlot.renderAttr(text,legend["Legend title"])
                this.mainPlot.renderText(text, legend["Legend title"].text.value)
            })
            .selectAll("rectG")
            .data(categoryList)
            .join("g")
            .attr("transform", (d, i) => `translate(0,${i * legend["Line"]["spacing"].value})`)
            .call(g=>{
                let squareOBJ = legend["Line"]
                let square_G = g.append("line")
                    .attr("class", squareOBJ.id)
                    .attr("x1", -squareOBJ["length"].value)
                    .attr("stroke", d=>colorScale(d))


                this.mainPlot.renderAttr(square_G, squareOBJ)


                let textStyle = legend["Text style"]

                let text_G = g.append("text")
                    .attr("class",textStyle.id)
                    .attr("dy","0.3em")
                    // .attr("y",squareOBJ["size"].value/2)
                    .text(d => d);

                this.mainPlot.renderAttr(text_G, textStyle)


            })



    }
    drawCategoryBranchesLegend(legendControlData, categoryList, colorScale, legendDragData){



        let legend = legendControlData
        if(!legend.Legend.switch.value){
            return
        }

        let columns = legend.Layout.columns.value
        let spacing = legend.Layout.spacing.value
        let col_data = this.getColumnsData(categoryList,columns,legend["Text style"]["font-size"].value)

        let g = this.mainPlot.zoomG.append('g').data([legendDragData])
            .attr("transform", d=>`translate(${d.x},${d.y})`)
            .attr("text-anchor", "start")
            .call(this.mainPlot.drag())
            .call(g=>{
                let text = g.append('text')
                    .attr("class", legend["Legend title"].id)

                this.mainPlot.renderAttr(text,legend["Legend title"])
                this.mainPlot.renderText(text, legend["Legend title"].text.value)
            })
            .selectAll("col")
            .data(col_data)
            .join("g")
            .attr("transform", (d,i) => `translate(${d.translateX + i * (legend["Symbol"]["size"].value + spacing)},0)`)
            .selectAll("LegendG1")
            .data(d=>d.rowItems)
            .join("g")
            .attr("transform", (d, i) => `translate(0,${i * legend["Symbol"]["spacing"].value})`)
            .call(g=>{
                let squareOBJ = legend["Symbol"]
                // let square_G = g.append("rect")
                //     .attr("class", squareOBJ.id)
                //     .attr("x", -squareOBJ["size"].value)
                //     .attr("width", squareOBJ["size"].value)
                //     .attr("height", squareOBJ["size"].value)
                //     .attr("fill", d=>colorScale(d))

                let w = squareOBJ["size"].value

                g.append("g")
                    .attr("transform", `translate(${-w},0)`)
                    .append("path")
                    .attr("class", squareOBJ.id)
                    .attr("d",`M0,${w/2}L${w/2},${w/2}M${w},${w/6}L${w/2},${w/6}L${w/2},${w/6*5}L${w},${w/6*5}`)
                    .attr("fill","none")
                    .attr("stroke",d=>colorScale(d))
                    .call(P=>{
                        this.mainPlot.renderAttr(P, squareOBJ)
                    })




                let textStyle = legend["Text style"]

                let text_G = g.append("text")
                    .attr("class",textStyle.id)
                    .attr("dy","0.3em")
                    .attr("y",squareOBJ["size"].value/2)
                    .text(d => d);

                this.mainPlot.renderAttr(text_G, textStyle)

            })



    }
    drawCategoryArcLegend(legendControlData, categoryList, colorScale, legendDragData){



        let legend = legendControlData
        if(!legend.Legend.switch.value){
            return
        }

        let columns = legend.Layout.columns.value
        let spacing = legend.Layout.spacing.value
        let col_data = this.getColumnsData(categoryList,columns,legend["Text style"]["font-size"].value)

        let g = this.mainPlot.zoomG.append('g').data([legendDragData])
            .attr("transform", d=>`translate(${d.x},${d.y})`)
            .attr("text-anchor", "start")
            .call(this.mainPlot.drag())
            .call(g=>{
                let text = g.append('text')
                    .attr("class", legend["Legend title"].id)

                this.mainPlot.renderAttr(text,legend["Legend title"])
                this.mainPlot.renderText(text, legend["Legend title"].text.value)
            })
            .selectAll("col")
            .data(col_data)
            .join("g")
            .attr("transform", (d,i) => `translate(${d.translateX + i * (legend["Arc style"]["size"].value + spacing)},0)`)
            .selectAll("LegendG1")
            .data(d=>d.rowItems)
            .join("g")
            .attr("transform", (d, i) => `translate(0,${i * legend["Arc style"]["spacing"].value})`)
            .call(g=>{
                let squareOBJ = legend["Arc style"]
                // let square_G = g.append("rect")
                //     .attr("class", squareOBJ.id)
                //     .attr("x", -squareOBJ["size"].value)
                //     .attr("width", squareOBJ["size"].value)
                //     .attr("height", squareOBJ["size"].value)
                //     .attr("fill", d=>colorScale(d))

                let w = squareOBJ["size"].value
                const arc = d3.arc()
                    .innerRadius(squareOBJ.innerRadius.value)
                    .outerRadius(w)
                    .startAngle(Math.PI/3)
                    .endAngle(Math.PI/3*2)

                g.append("g")
                    .attr("transform", `translate(${-w},${w/2})`)
                    .append("path")
                    .attr("class", squareOBJ.id)
                    .attr("d",arc())
                    .attr("fill",d=>colorScale(d))
                    .call(P=>{
                        this.mainPlot.renderAttr(P, squareOBJ)
                    })




                let textStyle = legend["Text style"]

                let text_G = g.append("text")
                    .attr("class",textStyle.id)
                    .attr("dy","0.3em")
                    .attr("y",w/2)
                    .text(d => d);

                this.mainPlot.renderAttr(text_G, textStyle)

            })



    }
    drawColorBarLegend(legendControlData, minMaxValueArr, colorInterpolate, legendDragData, medianValue){


        if(!legendControlData.Legend.switch.value){
            return
        }
        let mmv = minMaxValueArr
        console.log(mmv)
        let color_stick_list = d3.ticks(mmv[0], mmv[1], 5)
        console.log("color_stick_list",color_stick_list)
        if(color_stick_list[0]>mmv[0]){
            if(mmv[0]<0){

                color_stick_list.unshift(Math.ceil(mmv[0] * 100) / 100)
            }else {
                color_stick_list.unshift(Math.floor(mmv[0] * 100) / 100)

            }


        }
        // if(color_stick_list[color_stick_list.length-1]<mmv[1]){
        //     if(mmv[1]<0){
        //
        //         color_stick_list.unshift(Math.ceil(mmv[1] * 100) / 100)
        //     }else {
        //         color_stick_list.unshift(Math.floor(mmv[1] * 100) / 100)
        //
        //     }
        // }
        if(legendControlData["Text style"].tickValues.value){
            color_stick_list = legendControlData["Text style"].tickValues.value.split(",")
        }
        let colorBarHeight = legendControlData["ColorBar style"].height.value
        let hScale = d3.scaleLinear().domain(mmv).range([0,colorBarHeight])

        if(medianValue != undefined){
            hScale.domain([mmv[0],medianValue,mmv[1]]).range([0,colorBarHeight/2,colorBarHeight])
        }
        if(legendControlData["Text style"].reverse.value){
            hScale.range(hScale.range().reverse())
        }
        let directionObj = legendControlData["ColorBar style"].direction
        let direction = directionObj.optionList[directionObj.value]

        let textPositionObj = legendControlData["Text style"].position
        let textPosition = textPositionObj.optionList[textPositionObj.value]
        let g = this.mainPlot.zoomG.append('g')
            .data([legendDragData])
            .attr("transform", d=>`translate(${d.x},${d.y})`)
            .call(this.mainPlot.drag())
            .call(g=>{

                let image = g.append("image")
                    // .attr("x", marginLeft)
                    // .attr("y", marginTop)
                    .attr("preserveAspectRatio", "none")
                    .attr("xlink:href", d=>{
                        let reverse = legendControlData["ColorBar range"]["reverse"].value;
                        if(legendControlData["Text style"].reverse.value){
                            reverse = !reverse
                        }
                        return this.mainPlot.ramp(direction == "vertical" ? "v":"h",colorInterpolate,256,reverse)
                    })
                    .call(img=>{
                        if(direction == "vertical"){
                            img.attr("width",legendControlData["ColorBar style"].width.value)
                            img.attr("height",legendControlData["ColorBar style"].height.value)
                        }else {
                            img.attr("height",legendControlData["ColorBar style"].width.value)
                            img.attr("width",legendControlData["ColorBar style"].height.value)
                        }

                    })

                g.append("rect")
                    .attr("fill","none")
                    .call(rect=>{
                        if(direction == "vertical"){
                            rect.attr("width",legendControlData["ColorBar style"].width.value)
                            rect.attr("height",legendControlData["ColorBar style"].height.value)
                        }else {
                            rect.attr("height",legendControlData["ColorBar style"].width.value)
                            rect.attr("width",legendControlData["ColorBar style"].height.value)
                        }
                    })
                    .attr("stroke",legendControlData["ColorBar style"].stroke.value)
                    .attr("stroke-width",legendControlData["ColorBar style"]["stroke-width"].value)

                g.append("text")
                    .attr("class",legendControlData["Legend title"].id)
                    .call(T=>{
                        this.mainPlot.renderAttr(T,legendControlData["Legend title"])
                        this.mainPlot.renderText(T, legendControlData["Legend title"].text.value)
                    })

            })
            .selectAll("g")
            .data(color_stick_list)
            .join("g")
            .attr("transform", (d, i) => {
                let tArr = textPosition == "left/bottom" ? [0,legendControlData["ColorBar style"].width.value]:[legendControlData["ColorBar style"].width.value,0]
                return direction == "vertical" ? `translate(${tArr[0]},${hScale(d)})`:`translate(${hScale(d)},${tArr[1]})`
            })
            .call(g=>{
                let factor = textPosition == "left/bottom" ? 1:-1
                let tickLength = legendControlData["Tick style"]["tick-length"].value
                g.append("line")
                    .attr("x2",direction == "vertical" ? -tickLength*factor:0)
                    .attr("y2",direction == "vertical" ? 0: tickLength*factor)
                    .attr("class",legendControlData["Tick style"].id)
                    .call(L=>{
                        this.mainPlot.renderAttr(L, legendControlData["Tick style"])
                    })


                g.append("text")
                    .attr("dy", direction == "vertical" ? "0.3em" : (textPosition == "left/bottom" ? "0.8em":null))
                    .attr("text-anchor", direction == "vertical" ? (textPosition == "left/bottom" ? "end" : "start") : "middle")
                    .text(d => d)
                    .attr("class", legendControlData["Text style"].id)
                    .call(T=>{
                        this.mainPlot.renderAttr(T,legendControlData["Text style"])

                            T.attr("x",direction == "vertical" ? legendControlData["Text style"].offset.value * factor:0)
                            .attr("y",direction == "vertical" ? 0: -legendControlData["Text style"].offset.value * factor)

                        this.mainPlot.valueFormat(T, legendControlData["Text style"]["tickFormat"].value)
                    })
            })

    }
    drawCategoryShapeLegend(legendControlData, categoryList, colorScale, symbolTypeDict, legendDragData){
        let legend = legendControlData;
        if(!legend.Legend.switch.value){
                return
            }

        let columns = legend.Layout.columns.value
        let spacing = legend.Layout.spacing.value
        let col_data = this.getColumnsData(categoryList,columns,legend["Text style"]["font-size"].value)






        let g = this.mainPlot.zoomG.append('g').data([legendDragData])
                .attr("transform", d=>`translate(${d.x},${d.y})`)
                .attr("text-anchor", "start")
                .call(this.mainPlot.drag())
                .call(g=>{
                    let text = g.append('text')
                        .attr("class", legend["Legend title"].id)

                    this.mainPlot.renderAttr(text,legend["Legend title"])
                    this.mainPlot.renderText(text, legend["Legend title"].text.value)
                })
            .selectAll("col")
            .data(col_data)
            .join("g")
            .attr("transform", (d,i) => `translate(${d.translateX + i * (spacing)},0)`)
            .selectAll("LegendG1")
            .data(d=>d.rowItems)
            .join("g")
                .attr("transform", (d, i) => `translate(0,${i * legend["Symbol"]["spacing"].value})`);

        g.append("g")
                .append('path')
                .attr('d',d => {

                    let symbol_type = symbolTypeDict[d].split("-")[0]
                    return d3.symbol().type(d3[symbol_type]).size(legend["Symbol"]["size"].value)()
                })
                .attr('fill',d=>{
                    let isFill = symbolTypeDict[d].split("-")[1]
                    let color = colorScale(d)
                    return isFill == "fill" ? color:"none"
                })
                .attr('stroke',d=> {

                    let isFill = symbolTypeDict[d].split("-")[1]
                    let color = colorScale(d)
                    return isFill == "fill" ? legend["Symbol"].stroke.value:color
                })
            .attr('stroke-width',d=>{
                let isFill = symbolTypeDict[d].split("-")[1]
                let strokeW = legend["Symbol"]["stroke-width"].value;
                if(isFill == "fill"){
                    return strokeW
                }else {
                    return strokeW>1?strokeW:1
                }

            })
                .attr("class", legend["Symbol"].id)
                .call(p=>{
                    this.mainPlot.renderAttr(p, legend["Symbol"])
                })

            // g.call(this.baGuaPath(14,["black","white"]))
            let textStyle = legend["Text style"]

            let text_G = g.append("text")
                .attr("class",textStyle.id)
                .attr("dy","0.3em")
                .text(d => d)
            this.mainPlot.renderAttr(text_G, textStyle)
    }
    drawCategoryShapeLineLegend(legendControlData, categoryList, colorScale, symbolTypeDict, legendDragData, dottedLineDict){
        let legend = legendControlData;
        if(!legend.Legend.switch.value){
            return
        }

        let columns = legend.Layout.columns.value
        let spacing = legend.Layout.spacing.value
        let col_data = this.getColumnsData(categoryList,columns,legend["Text style"]["font-size"].value)






        let g = this.mainPlot.zoomG.append('g').data([legendDragData])
            .attr("transform", d=>`translate(${d.x},${d.y})`)
            .attr("text-anchor", "start")
            .call(this.mainPlot.drag())
            .call(g=>{
                let text = g.append('text')
                    .attr("class", legend["Legend title"].id)

                this.mainPlot.renderAttr(text,legend["Legend title"])
                this.mainPlot.renderText(text, legend["Legend title"].text.value)
            })
            .selectAll("col")
            .data(col_data)
            .join("g")
            .attr("transform", (d,i) => `translate(${d.translateX + i * (spacing)},0)`)
            .selectAll("LegendG1")
            .data(d=>d.rowItems)
            .join("g")
            .attr("transform", (d, i) => `translate(0,${i * legend["Symbol"]["spacing"].value})`);


        g.append("line")
            .attr("x1",-20)
            .attr("x2",20)
            .attr("stroke",d=>colorScale(d))
            .attr('stroke-dasharray',d=> {

                if(dottedLineDict && dottedLineDict[d]){
                    return "6"
                }else {
                    return null
                }

            })
            .attr("class", legend["Line style"].id)
            .call(line=>{
                this.mainPlot.renderAttr(line, legend["Line style"])
            })

        g.append("g")
            .append('path')
            .attr('d',d => {

                let symbol_type = symbolTypeDict[d].split("-")[0]
                return d3.symbol().type(d3[symbol_type]).size(legend["Symbol"]["size"].value)()
            })
            .attr('fill',d=>{
                let isFill = symbolTypeDict[d].split("-")[1]
                let color = colorScale(d)
                return isFill == "fill" ? color:"#ffffff"
            })
            .attr('stroke',d=>colorScale(d))
            .attr("class", legend["Symbol"].id)
            .call(p=>{
                this.mainPlot.renderAttr(p, legend["Symbol"])
            })

        // g.call(this.baGuaPath(14,["black","white"]))
        let textStyle = legend["Text style"]

        let text_G = g.append("text")
            .attr("class",textStyle.id)
            .attr("dy","0.3em")
            .text(d => d)
        this.mainPlot.renderAttr(text_G, textStyle)
    }
    drawBaseSizeLegend(legendControlData, minMaxValueArr, rScale, legendDragData,{symbolType="circle"}={}){
        if(!legendControlData.Legend.switch.value){
            return
        }
        console.log(minMaxValueArr)

        function range(min,max,step){
            if(min == max){
                return [min]
            }
            let arr = []
            let i = 0
            while (true){
                let v = i*step+min;
                if(v.toString().includes(".")){
                    v = Number(v.toFixed(10))
                }
                if(v>max){
                    break
                }else {
                    arr.push(v)
                }
                i++
            }
            return arr
        }

        let maxValue = minMaxValueArr[1]
        let minValue = minMaxValueArr[0]<0?0:minMaxValueArr[0]

        let symbolStyle = legendControlData["Symbol style"];
        if(symbolStyle["max-value"] && symbolStyle["max-value"].value && Number(symbolStyle["max-value"].value) > minMaxValueArr[1]){
            maxValue = Number(symbolStyle["max-value"].value)
        }

        if(symbolStyle["min-value"] && symbolStyle["min-value"].value && Number(symbolStyle["min-value"].value) < maxValue){
            minValue = Number(symbolStyle["min-value"].value)
        }


        let size_list = range( minValue, maxValue, symbolStyle["range-step"].value)
        if(size_list[0]==0){
            size_list = size_list.slice(1)
        }

        console.log(size_list)
        let translateX = 0;

        let padding = symbolStyle["spacing"].value

        let h = 0
        let data = size_list.map(ele=>{
            let a =  {
                value:ele,
                h:h
            }
            h += rScale(ele)*2 + padding
            return a
        })


        let g = this.mainPlot.zoomG.append('g').data([legendDragData])
            .attr("transform", d=>`translate(${d.x},${d.y})`)
            .call(this.mainPlot.drag())
            .call(g=>{
                g.append("text")
                    .attr("class",legendControlData["Legend title"].id)
                    .call(T=>{
                        this.mainPlot.renderAttr(T,legendControlData["Legend title"])
                        this.mainPlot.renderText(T, legendControlData["Legend title"].text.value)
                    })

                if(legendControlData.Background.switch.value){
                    g.append("rect")
                        .attr("x",translateX-rScale(size_list[size_list.length-1])-5)
                        .attr("y", -5)
                        .attr("class",legendControlData.Background.id)
                        .attr("width",rScale(size_list[size_list.length-1])*2+10)
                        .attr("height",h - padding + 10)
                        .call(R=>{
                            this.mainPlot.renderAttr(R, legendControlData.Background)
                        })
                }


            })
            .selectAll("g")
            .data(data)
            .join("g")
            .attr("transform", (d, i) => `translate(0,${d.h})`);


        g.append("g")
            .attr("transform", d=> `translate(${translateX},${rScale(d.value)})`)
            .append("path")
            .attr("d", d=>this.mainPlot.symbolGenerator.getPath(symbolType, rScale(d.value)))
            // .append("circle")
            // .attr("cx", translateX)
            // .attr("cy", d=>rScale(d.value))
            // .attr("r", d=>rScale(d.value))
            .attr("class",symbolStyle.id)
            .call(c=>{
                this.mainPlot.renderAttr(c,symbolStyle)
            })



        g.append("text")
            .attr("x", rScale(rScale.domain()[rScale.domain().length-1]) + translateX + 10)
            .attr("dy", "0.3em")
            .attr("y", d=>rScale(d.value))
            .attr("class", legendControlData["Text style"].id)
            .datum(d=>d.value)
            .text(d => d)
            .call(T=>{
                this.mainPlot.valueFormat(T, legendControlData["Text style"]["value-format"].value)
                this.mainPlot.renderAttr(T,legendControlData["Text style"])
            })


    }
    drawBaseThicknessLegend(legendControlData, minMaxValueArr, widthScale, legendDragData,{symbolType="circle"}={}){
        if(!legendControlData.Legend.switch.value){
            return
        }
        console.log(minMaxValueArr)

        function range(min,max,step){
            if(min == max){
                return [min]
            }
            let arr = []
            let i = 0
            while (true){
                let v = min + i*step;
                if(v.toString().includes(".")){
                    v = Number(v.toFixed(10))
                }
                if(v>max){
                    break
                }else {
                    arr.push(v)
                }
                i++
            }
            return arr
        }

        let maxValue = minMaxValueArr[1]

        let minValue = minMaxValueArr[0]<0?0:minMaxValueArr[0]

        let symbolStyle = legendControlData["Symbol style"];
        if(symbolStyle["max-value"] && symbolStyle["max-value"].value && Number(symbolStyle["max-value"].value) > minMaxValueArr[1]){
            maxValue = Number(symbolStyle["max-value"].value)
        }

        if(symbolStyle["min-value"] && symbolStyle["min-value"].value && Number(symbolStyle["min-value"].value) < maxValue){
            minValue = Number(symbolStyle["min-value"].value)
        }
        let step = symbolStyle["range-step"].value;
        if(step>maxValue-minValue){
            step = (maxValue-minValue)/5
            step = Number(d3.format(".1r")(step))
        }


        let size_list = range( minValue, maxValue, step)
        if(size_list[0]==0){
            size_list = size_list.slice(1)
        }




        console.log(size_list)
        let translateX = 0;
        let lineLength = 36

        let padding = symbolStyle["spacing"].value
        let margin = 15

        let h = 0
        let data = size_list.map(ele=>{
            let a =  {
                value:ele,
                h:h
            }
            h += widthScale(ele) + padding
            return a
        })


        let g = this.mainPlot.zoomG.append('g').data([legendDragData])
            .attr("transform", d=>`translate(${d.x},${d.y})`)
            .call(this.mainPlot.drag())
            .call(g=>{
                g.append("text")
                    .attr("class",legendControlData["Legend title"].id)
                    .call(T=>{
                        this.mainPlot.renderAttr(T,legendControlData["Legend title"])
                        this.mainPlot.renderText(T, legendControlData["Legend title"].text.value)
                    })

                if(legendControlData.Background.switch.value){
                    g.append("rect")
                        .attr("x",-lineLength/2-margin/2)
                        .attr("y", -margin/2)
                        .attr("class",legendControlData.Background.id)
                        .attr("width",lineLength+margin)
                        .attr("height",h - padding + margin)
                        .call(R=>{
                            this.mainPlot.renderAttr(R, legendControlData.Background)
                        })
                }


            })
            .selectAll("g")
            .data(data)
            .join("g")
            .attr("transform", (d, i) => `translate(0,${d.h})`);


        g.append("g")
            .attr("transform", d=> `translate(${translateX},${widthScale(d.value)/2})`)
            .append("line")
            .attr("x1", -lineLength/2)
            .attr("x2", lineLength/2)

            // .append("circle")
            // .attr("cx", translateX)
            // .attr("cy", d=>rScale(d.value))
            // .attr("r", d=>rScale(d.value))
            .attr("class",symbolStyle.id)
            .call(c=>{
                this.mainPlot.renderAttr(c,symbolStyle)
            })
            .attr("stroke-width", d=>widthScale(d.value))
            .attr("stroke-linecap", "round")



        g.append("text")
            .attr("x",  lineLength/2 + translateX + 10)
            .attr("dy", "0.3em")
            .attr("y", d=>widthScale(d.value)/2)
            .attr("class", legendControlData["Text style"].id)
            .datum(d=>d.value)
            .text(d => d)
            .call(T=>{
                this.mainPlot.valueFormat(T, legendControlData["Text style"]["value-format"].value)
                this.mainPlot.renderAttr(T,legendControlData["Text style"])
            })


    }
    drawDiscreteThicknessLegend(legendControlData, valueArr, legendDragData,{symbolType="circle"}={}){
        if(!legendControlData.Legend.switch.value){
            return
        }

        console.log(valueArr)


        let symbolStyle = legendControlData["Symbol style"];





        let translateX = 0;
        let lineLength = 36

        let padding = symbolStyle["spacing"].value

        let margin = 15

        let h = 0
        let data = valueArr.map(ele=>{
            let a =  {
                value:ele.value,
                h:h,
                key:ele.key
            }
            h += ele.value + padding
            return a
        })


        let g = this.mainPlot.zoomG.append('g').data([legendDragData])
            .attr("transform", d=>`translate(${d.x},${d.y})`)
            .call(this.mainPlot.drag())
            .call(g=>{
                g.append("text")
                    .attr("class",legendControlData["Legend title"].id)
                    .call(T=>{
                        this.mainPlot.renderAttr(T,legendControlData["Legend title"])
                        this.mainPlot.renderText(T, legendControlData["Legend title"].text.value)
                    })

                if(legendControlData.Background.switch.value){
                    g.append("rect")
                        .attr("x",-lineLength/2-margin/2)
                        .attr("y", -margin/2)
                        .attr("class",legendControlData.Background.id)
                        .attr("width",lineLength+margin)
                        .attr("height",h - padding + margin)
                        .call(R=>{
                            this.mainPlot.renderAttr(R, legendControlData.Background)
                        })
                }


            })
            .selectAll("g")
            .data(data)
            .join("g")
            .attr("transform", (d, i) => `translate(0,${d.h})`);


        g.append("g")
            .attr("transform", d=> `translate(${translateX},${d.value/2})`)
            .append("line")
            .attr("x1", -lineLength/2)
            .attr("x2", lineLength/2)

            // .append("circle")
            // .attr("cx", translateX)
            // .attr("cy", d=>rScale(d.value))
            // .attr("r", d=>rScale(d.value))
            .attr("class",symbolStyle.id)
            .call(c=>{
                this.mainPlot.renderAttr(c,symbolStyle)
            })
            .attr("stroke-width", d=>d.value)
            .attr("stroke-linecap", "round")



        g.append("text")
            .attr("x",  lineLength/2 + translateX + 10)
            .attr("dy", "0.3em")
            .attr("y", d=>d.value/2)
            .attr("class", legendControlData["Text style"].id)
            // .datum(d=>d.key)
            .text(d => d.key)
            .call(T=>{
                this.mainPlot.renderAttr(T,legendControlData["Text style"])
            })


    }
    drawSolidDashLineLegend(legendControlData, valueArr, legendDragData,{symbolType="circle"}={}){
        if(!legendControlData.Legend.switch.value){
            return
        }

        console.log(valueArr)


        let symbolStyle = legendControlData["Symbol style"];





        let translateX = 0;
        let lineLength = 36
        let margin = 15

        let padding = symbolStyle["spacing"].value

        let h = 0
        let width_value = symbolStyle["stroke-width"].value
        let data = valueArr.map(ele=>{
            let a =  {
                value:width_value,
                h:h,
                key:ele.key,
                type:ele.type
            }
            h += width_value + padding
            return a
        })


        let g = this.mainPlot.zoomG.append('g').data([legendDragData])
            .attr("transform", d=>`translate(${d.x},${d.y})`)
            .call(this.mainPlot.drag())
            .call(g=>{
                g.append("text")
                    .attr("class",legendControlData["Legend title"].id)
                    .call(T=>{
                        this.mainPlot.renderAttr(T,legendControlData["Legend title"])
                        this.mainPlot.renderText(T, legendControlData["Legend title"].text.value)
                    })

                if(legendControlData.Background.switch.value){
                    g.append("rect")
                        .attr("x",-lineLength/2-margin/2)
                        .attr("y", -margin/2)
                        .attr("class",legendControlData.Background.id)
                        .attr("width",lineLength+margin)
                        .attr("height",h - padding + margin)
                        .call(R=>{
                            this.mainPlot.renderAttr(R, legendControlData.Background)
                        })
                }


            })
            .selectAll("g")
            .data(data)
            .join("g")
            .attr("transform", (d, i) => `translate(0,${d.h})`);


        g.append("g")
            .attr("transform", d=> `translate(${translateX},${d.value/2})`)
            .append("line")
            .attr("x1", -lineLength/2)
            .attr("x2", lineLength/2)
            .attr("stroke-dasharray", d=>d.type == "dash" ? "4":null)

            // .append("circle")
            // .attr("cx", translateX)
            // .attr("cy", d=>rScale(d.value))
            // .attr("r", d=>rScale(d.value))
            .attr("class",symbolStyle.id)
            .call(c=>{
                this.mainPlot.renderAttr(c,symbolStyle)
            })
            .attr("stroke-width", d=>d.value)
            .attr("stroke-linecap", "round")



        g.append("text")
            .attr("x",  lineLength/2 + translateX + 10)
            .attr("dy", "0.3em")
            .attr("y", d=>d.value/2)
            .attr("class", legendControlData["Text style"].id)
            // .datum(d=>d.key)
            .text(d => d.key)
            .call(T=>{
                this.mainPlot.renderAttr(T,legendControlData["Text style"])
            })


    }

}






export {Legend}