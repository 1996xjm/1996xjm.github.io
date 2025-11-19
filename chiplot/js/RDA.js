
import {ScatterPlot} from "/chiplot/js/scatter.js"


class RDAPlot extends ScatterPlot{

    constructor(RDAType="pcoa"){
        super([
            "modify shape and color",
            "change shape only",
            "add label",
            "top density plot",
            "right density plot",
            "size of points",
            "gradient color of points"
        ]);

        this.RDAType = RDAType
        this.plotType = RDAType
        this.styleData.stressTextDragData = {x: 400, y: 100}

        this.creatVueApp()
    }

    init() {
        if(this.pcoaData == null){
            return
        }
        this.zoomG.text("")
        super.init();


        this.xScale = d3.scaleLinear().domain([this.figureData.xAxis.Tick["min-value"].value,this.figureData.xAxis.Tick["max-value"].value]).range([0,this.innerwidth]);
        this.yScale = d3.scaleLinear().domain([this.figureData.yAxis.Tick["max-value"].value,this.figureData.yAxis.Tick["min-value"].value]).range([0,this.innerHeight]);


        this.addAxis()



        this.drawScatter(this.pcoaData.scatterData, this.figureData[this.RDAType])
        this.drawTopDensity(this.pcoaData.scatterData)
        this.drawRightDensity(this.pcoaData.scatterData)
        if(this.RDAType == "nmds"){
            this.drawStressText()
        }

        this.drawTitle()
        this.drawLegend()
        this.setGlobalFontStyle()
    }
    async onLoadNewFile(data, source, fileName) {

        console.log(fileName)
        console.log(data)



        if(source == "local" || source == "originalJsonData"){
            this.fileName = fileName
            this.pcoaData = null




            await this.getUserFigureData("/xiaochi/gettoken")

            //数据检查，不能包含特征全为0的行，特征数要超过1个
            if(data.columns.length<3){
                this.showMessageBox("cuIcon-roundclose",`Feature columns are lower than 2!`,"error")

                return

            }
            let isContainAllZero = false
            let allZeroRowNum = 0
            data.forEach((d,index)=>{
                let sum = 0
                data.columns.slice(1).forEach(key=>{
                    sum += d[key]
                })
                if(sum==0){
                    isContainAllZero = true
                    allZeroRowNum += 1
                }
            })

            if(Array.from(new Set(data.map(d=>d[data.columns[0]]))).length < data.length){
                //id重复
                this.showMessageBox("cuIcon-roundclose",`Found duplicate IDs in 1st columns!`,"error")

                return
            }

            if(isContainAllZero){
                this.showMessageBox("cuIcon-roundclose",`Contain ${allZeroRowNum} row${allZeroRowNum>1?"s":""} with all values are 0!`,"error")

                return
            }

            //要加columns这个参数，才会按这个顺序排列每一列
            await this.uploadUserData(d3.tsvFormat(data, data.columns), "xjm", `${fileName}.tsv`)

            let pcoaData = await this.reDoPCoA()
            this.pcoaData = pcoaData

            if(source == "local"){
                this.styleData.pointTextDragData = {}
                this.pcoaData.scatterData.forEach(d=>{
                    this.styleData.pointTextDragData[d.sample] = {x:0,y:0,name:d.sample}
                })
            }

        }


        if(source == "web") {
            this.pcoaData = data
            let mmvX= d3.extent(this.pcoaData.scatterData, d=>d.PC1)
            let mmvY= d3.extent(this.pcoaData.scatterData, d=>d.PC2)
            this.figureData.xAxis.Tick["min-value"].value = mmvX[0]*1.1
            this.figureData.xAxis.Tick["max-value"].value = mmvX[1]*1.1
            this.figureData.yAxis.Tick["min-value"].value = mmvY[0]*1.1
            this.figureData.yAxis.Tick["max-value"].value = mmvY[1]*1.1
        }











        let axisLavel = {
            "pcoa":"PCo",
            "pca":"PC",
            "nmds":"NMDS",
        }

        if(this.RDAType == "nmds"){
            this.figureData.xAxis.Label.text.value = `${axisLavel[this.RDAType]}1`
            this.figureData.yAxis.Label.text.value = `${axisLavel[this.RDAType]}2`
        }else {
            this.figureData.xAxis.Label.text.value = `${axisLavel[this.RDAType]}1: ${Math.round(this.pcoaData.proportion_explained[0]*10000)/100}%`
            this.figureData.yAxis.Label.text.value = `${axisLavel[this.RDAType]}2: ${Math.round(this.pcoaData.proportion_explained[1]*10000)/100}%`
        }



        if(source == "local"){
            let mmvX= d3.extent(this.pcoaData.scatterData, d=>d.PC1)
            let mmvY= d3.extent(this.pcoaData.scatterData, d=>d.PC2)
            this.figureData.xAxis.Tick["min-value"] = {
                type: "seq",
                value: mmvX[0]*1.1,
                isSvgAttr: false,
                scaleStep: 0.01,
                min: -Infinity,
                max: mmvX[0]
            }
            this.figureData.xAxis.Tick["max-value"] = {
                type: "seq",
                value: mmvX[1]*1.1,
                isSvgAttr: false,
                scaleStep: 0.01,
                min: mmvX[1],
                max: Infinity
            }
            this.figureData.yAxis.Tick["min-value"] = {
                type: "seq",
                value: mmvY[0]*1.1,
                isSvgAttr: false,
                scaleStep: 0.01,
                min: -Infinity,
                max: mmvY[0]
            }
            this.figureData.yAxis.Tick["max-value"] = {
                type: "seq",
                value: mmvY[1]*1.1,
                isSvgAttr: false,
                scaleStep: 0.01,
                min: mmvY[1],
                max: Infinity
            }
            this.Vue.$refs.controlPlane.$data.controlList[0]  =  this.dictToControlList(this.figureData)
        }


        if(source != "originalJsonData"){

            this.init()
        }


    }
    creatVueApp() {
        const self = this

        this.figureData.data["data file"][`${this.RDAType}-result`] =  {
            type: "button",
                value: "",
                event: "viewRDAData",
                isBGGray: false,
                isFresh: false,
                iconClass: "cuIcon-attentionfill"
        }


        this.figureData[this.RDAType]  = {
            "algorithm":{
                "distance": {
                    type:"opt",
                    optionList:[
                        'braycurtis', 'canberra', 'chebyshev', 'cityblock',
                        'correlation', 'cosine', 'euclidean', 'hamming',
                        'jaccard', 'jensenshannon', 'kulsinski', 'mahalanobis', 'matching',
                        'minkowski', 'rogerstanimoto', 'russellrao', 'seuclidean',
                        'sokalmichener', 'sokalsneath', 'sqeuclidean'
                    ],
                    value:0,
                    isSvgAttr:false
                },
                "standardization": {
                    type:"opt",
                    optionList:[
                        "None", "PercentScaler", "StandardScaler", "MinMaxScaler", "MaxAbsScaler", "RobustScaler"
                    ],
                    value:0,
                    isSvgAttr:false
                },
                "std-direction": {
                    type:"opt",
                    optionList:[
                        "column", "row"
                    ],
                    value:0,
                    isSvgAttr:false
                },
                "refresh":{
                    type:"button",
                    value:"",
                    event:"reDoPCoA",
                    isFresh:false,
                    iconClass:"cuIcon-refresh"
                }
            },

            "center line":{
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
                "stroke-opacity": {
                    type: "seq",
                    value: 0.4,
                    isSvgAttr: true,
                    scaleStep: 0.01,
                    min: 0,
                    max: 1
                },

            },
            "point style":{
                "type":{
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
                },
                "fill":{
                    type:"color",
                    value:"#7c8fd2",
                    isSvgAttr:false
                },
                "gradient-color": {
                    type: "check",
                    value: false,
                    isFresh: true

                },
                "stroke-as-fill": {
                    type: "check",
                    value: true,
                    isFresh: true

                },
                "stroke":{
                    type:"color",
                    value:"#000000",
                    isSvgAttr:false
                },
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

            "point text":{
                "id":"point-text-style",
                "switch": {
                    type: "check",
                    value: false,
                    isFresh: true

                },
                "font-size": {
                    type: "seq",
                    value: 14,
                    isSvgAttr: true,
                    scaleStep: 1,
                    min: 0,
                    max: Infinity
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

            "fill": {
                type: "color",
                value: "#000000",
                isSvgAttr: true
            }
                ,"fill-opacity": {
                    type: "seq",
                    value: 0.4,
                    isSvgAttr: true,
                    scaleStep: 0.01,
                    min: 0,
                    max: 1
                },
                "dx": {
                    type: "seq",
                    value: 0,
                    isSvgAttr: true,
                    scaleStep: 1,
                    min: -Infinity,
                    max: Infinity
                },
                "dy": {
                    type: "seq",
                    value: -6,
                    isSvgAttr: true,
                    scaleStep: 1,
                    min: -Infinity,
                    max: Infinity
                }

            },
        }

        if(this.RDAType == "pca"){
            delete this.figureData[this.RDAType]["algorithm"].distance
        }
        if(this.RDAType == "nmds"){
            this.figureData[this.RDAType].algorithm.distance.optionList = ["bray", "euclidean", "manhattan", "canberra", "clark",  "kulczynski", "jaccard", "gower", "altGower", "morisita", "horn", "mountford", "raup", "binomial", "chao", "cao", "mahalanobis", "chisq", "chord", "hellinger", "aitchison"]
            this.figureData[this.RDAType].algorithm.standardization.optionList = ["None", "PercentScaler", "StandardScaler", "MinMaxScaler", "MaxAbsScaler"]
            this.figureData[this.RDAType]["stress"] = {
                "id":"stress-text-style",
                "switch": {
                    type: "check",
                    value: true,
                    isFresh: true

                },
                "font-size": {
                    type: "seq",
                    value: 16,
                    isSvgAttr: true,
                    scaleStep: 1,
                    min: 0,
                    max: Infinity
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
                "fill": {
                    type: "color",
                    value: "#000000",
                    isSvgAttr: true
                },
                "fill-opacity": {
                    type: "seq",
                    value: 1,
                    isSvgAttr: true,
                    scaleStep: 0.01,
                    min: 0,
                    max: 1
                },
            }
        }





        this.figureData.xAxis.Tick.tickSizeOuter.value = true
        this.figureData.yAxis.Tick.tickSizeOuter.value = true
        super.creatVueApp();//数据增加后再调用父方法

        this.handleClickMethods["reDoPCoA"] = function (){
           self.reDoPCoA().then(pcoaData=>{
                self.onLoadNewFile(pcoaData, "web")
            })
        }

        this.handleClickMethods["viewRDAData"] = function (e){
            if(!self.pcoaData){
                self.showMessageBox("cuIcon-roundclose",`No layer data!`,"error")
                self.shakeElement(e)
                return
            }
            let dataArr = [
                {
                    fileName:`${self.RDAType}_result`,
                    type:"tsvStr",
                    fileData: d3.tsvFormat(self.pcoaData.scatterData, self.pcoaData.scatterData.columns)
                },

            ]
            if (self.RDAType == "pca"){
                dataArr.push({
                    fileName:"loading_scores",
                    type:"tsvStr",
                    fileData: self.pcoaData.loadingScores
                })
            }
            window.localStorage.setItem('RDADataArr', JSON.stringify(dataArr));
            window.open(`/static/xiaochiPlot/src/exampleData.html?type=localStorage&source=RDADataArr`)

        }






    }

    drawStressText(){
        if(!this.figureData[this.RDAType]["stress"].switch.value){
            return
        }
        this.zoomG.append("g")
            .data([this.styleData.stressTextDragData])
            .attr("transform", d=>`translate(${d.x},${d.y})`)
            .call(this.drag())
            .append("text")
            .attr("class",this.figureData[this.RDAType]["stress"].id)
            .text(`Stress = ${d3.format(".3r")(this.pcoaData.stress)}`)
            .call(T=>{
                this.renderAttr(T, this.figureData[this.RDAType]["stress"])
            })
    }

    async reDoPCoA(){

        const self = this
        let disObj = self.figureData[self.RDAType].algorithm.distance
        let distance = disObj ? disObj.optionList[disObj.value] : "None"
        let stdObj = self.figureData[self.RDAType].algorithm.standardization
        let standardization = stdObj.optionList[stdObj.value]
        let stdDireObj = self.figureData[self.RDAType].algorithm["std-direction"]
        let stdDirection = stdDireObj.optionList[stdDireObj.value]
        let pcoaData = await self.getUserFigureData(`/ChiPlot/RDA?t=${self.RDAType}&d=${distance}&s=${standardization}&fileName=${self.fileName}.tsv&stdDirection=${stdDirection}`)
        pcoaData.scatterData = d3.tsvParse(pcoaData.scatterData, d3.autoType)
        pcoaData.scatterData.forEach(ele=>{
            //有些人喜欢把id弄成纯数字
            ele["sample"] = ele["sample"].toString()
        })

        return pcoaData
    }








}


export {RDAPlot}