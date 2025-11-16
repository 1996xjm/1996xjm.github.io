
import {ScatterPlot} from "/static/xiaochiPlot/js/scatter.js"


class CCARDAPlot extends ScatterPlot{

    constructor(RDAType="cca"){
        super([
            "modify shape and color",
            "change shape only",
            "add label",
            "top density plot",
            "right density plot",
            "size of points",
            "gradient color of points",
        ]); // 调用父类的constructor(x,y)


        this.plotType = RDAType

        this.OpenFilePickerOptions.multiple = true



        this.creatVueApp()
    }

    init(initType) {

        this.zoomG.text("")
        super.init();




        this.xScale = d3.scaleLinear().domain([this.figureData.xAxis.Tick["min-value"].value,this.figureData.xAxis.Tick["max-value"].value]).range([0,this.innerwidth]);
        this.yScale = d3.scaleLinear().domain([this.figureData.yAxis.Tick["max-value"].value,this.figureData.yAxis.Tick["min-value"].value]).range([0,this.innerHeight]);

        this.addAxis()

        this.drawScatter(this.scatterData, this.figureData[this.plotType])
        this.drawTopDensity(this.scatterData)
        this.drawRightDensity(this.scatterData)
        this.drawEnvArrow()


        this.drawTitle()
        this.drawLegend()
        this.setGlobalFontStyle()
    }
    async onLoadNewFile(data, source, fileName) {

        console.log(fileName)
        console.log(data)



        if(source == "local" || source == "originalJsonData"){

            if(data.length!=2) {
                this.showMessageBox("cuIcon-roundclose",`Files can not be recognized`,"error")
                return
            }


            let valueArr = [data[0].columns[0], data[1].columns[0]]
            if(valueArr.includes("sample") && valueArr.includes("env")){
                let sampleIndex = valueArr.indexOf("sample");
                let envIndex = valueArr.indexOf("env");

                this.sampleData = data[sampleIndex]
                this.envData = data[envIndex]

                this.fileName = fileName[sampleIndex]
                this.envFileName = fileName[envIndex]

            }else {
                this.showMessageBox("cuIcon-roundclose",`Files can not be recognized`,"error")
                return
            }







            await this.getUserFigureData("/xiaochi/gettoken")

            //数据检查，不能包含特征全为0的行，特征数要超过1个
            if(this.sampleData.length<3){
                this.showMessageBox("cuIcon-roundclose",`Feature columns are lower than 2!`,"error")

                return

            }
            let isContainAllZero = false
            let allZeroRowNum = 0
            this.sampleData.forEach((d,index)=>{
                let sum = 0
                this.sampleData.columns.slice(1).forEach(key=>{
                    sum += d[key]
                })
                if(sum==0){
                    isContainAllZero = true
                    allZeroRowNum += 1
                }
            })

            if(Array.from(new Set(this.sampleData.map(d=>d[this.sampleData.columns[0]]))).length < this.sampleData.length){
                //id重复
                this.showMessageBox("cuIcon-roundclose",`Found duplicate IDs in 1st columns!`,"error")

                return
            }

            if(isContainAllZero){
                this.showMessageBox("cuIcon-roundclose",`Contain ${allZeroRowNum} row${allZeroRowNum>1?"s":""} with all values are 0!`,"error")

                return
            }

            //要加columns这个参数，才会按这个顺序排列每一列
            await this.uploadUserData(d3.tsvFormat(this.sampleData, this.sampleData.columns), "xjm", `${this.fileName}.tsv`)
            await this.uploadUserData(d3.tsvFormat(this.envData, this.envData.columns), "xjm", `${this.envFileName}.tsv`)

            this.CCARDAData = await this.reDoPCoA()




        }

        this.scatterData = this.CCARDAData.scatterData
        this.envData = this.CCARDAData.envData



        let sample_id_key = this.scatterData.columns[0];
        let env_id_key = this.envData.columns[0];








        if(source == "local" || source == "web"){
            this.styleData.envTextDragData = {}
            this.styleData.pointTextDragData = {}
            this.scatterData.forEach(d=>{
                this.styleData.pointTextDragData[d[sample_id_key]] = {x:0,y:0,name:d[sample_id_key]}
            })

            this.envData.forEach(d=>{
                this.styleData.envTextDragData[d[env_id_key]] = {x:0,y:0,name:d[env_id_key]}
            })
        }









        let mmvX= d3.extent(this.scatterData.map(d=>d[this.scatterData.columns[1]]).concat(this.envData.map(d=>d[this.envData.columns[1]])))
        let mmvY= d3.extent(this.scatterData.map(d=>d[this.scatterData.columns[2]]).concat(this.envData.map(d=>d[this.envData.columns[2]])))

        this.mmvX = mmvX


        if(source == "local" || source == "web"){

            this.figureData.xAxis.Tick["min-value"] = {
                type: "seq",
                value: mmvX[0]<0 ? mmvX[0]*1.1:mmvX[0]*0.9,
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
                value: mmvY[0]<0 ? mmvY[0]*1.1:mmvY[0]*0.9,
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
    async reDoPCoA(){

        const self = this
        let stdObj = self.figureData[self.plotType].algorithm["spec-std"]
        let stdMethod = stdObj.optionList[stdObj.value]
        let stdDireObj = self.figureData[self.plotType].algorithm["spec-std-direct"]
        let stdDirection = stdDireObj.optionList[stdDireObj.value]

        let getData = {
            analysisType:self.plotType,
            specFileName:self.fileName+".tsv",
            envFileName:self.envFileName + ".tsv",
            stdMethod:stdMethod,
            stdDirection:stdDirection,

        }

        function objectToQueryString(obj) {
            return Object.keys(obj).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&');
        }

        this.figureData[self.plotType].algorithm["refresh"].isLoading = true
        let CCARDAData;
        try {
            CCARDAData = await self.http.get(`/ChiPlot/CCARDA?${objectToQueryString(getData)}`)

        }catch (error) {
            console.error(error);
            let {status,statusText} = error

            self.showMessageBox("cuIcon-roundclose",`${status}:${statusText},数据格式错误！`,"error")
            this.figureData[self.plotType].algorithm["refresh"].isLoading = false
            return
        }



        this.figureData.xAxis.Label.text.value = `${self.plotType.toUpperCase()}1: ${CCARDAData.EP1}%`
        this.figureData.yAxis.Label.text.value = `${self.plotType.toUpperCase()}2: ${CCARDAData.EP2}%`



        this.figureData[self.plotType].algorithm["refresh"].isLoading = false
        CCARDAData.scatterData = d3.tsvParse(CCARDAData.scatterData, d3.autoType)
        CCARDAData.envData = d3.tsvParse(CCARDAData.envData, d3.autoType)
        CCARDAData.speciesData = d3.tsvParse(CCARDAData.speciesData, d3.autoType)
        CCARDAData.scatterData.forEach(ele=>{
            //有些人喜欢把id弄成纯数字
            ele["sample"] = ele["sample"].toString()
        })
        CCARDAData.envData.forEach(ele=>{
            //有些人喜欢把id弄成纯数字
            ele["env"] = ele["env"].toString()
        })
        CCARDAData.speciesData.forEach(ele=>{
            //有些人喜欢把id弄成纯数字
            ele["species"] = ele["species"].toString()
        })



        return CCARDAData
    }
    creatVueApp() {
        const self = this


        this.figureData.data["data file"][`${this.plotType}-result`] =  {
            type: "button",
            value: "",
            event: "viewRDAData",
            isBGGray: false,
            isFresh: false,
            iconClass: "cuIcon-attentionfill"
        }
        this.figureData[this.plotType]  = {
            "algorithm":{
                "spec-std": {
                    type:"opt",
                    optionList:[
                        "None", "PercentScaler", "StandardScaler", "MinMaxScaler", "MaxAbsScaler"
                    ],
                    value:0,
                    isSvgAttr:false
                },
                "spec-std-direct": {
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
                    value: false,
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


        this.figureData["arrow"]  = {

            "Arrow line":{
                "id":"arrow-line-style",
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
                    value: 1,
                    isSvgAttr: true,
                    scaleStep: 0.01,
                    min: 0,
                    max: 1
                },
                "length-scale": {
                    type: "seq",
                    value: 1,
                    isSvgAttr: false,
                    scaleStep: 1,
                    min: 1,
                    max: Infinity
                },

            },
            "Arrow style":{
                "arrow-scale": {
                    type: "seq",
                    value: 5,
                    isSvgAttr: false,
                    scaleStep: 1,
                    min: 1,
                    max: Infinity
                },
            },
            "Arrow text":{
                "id":"arrow-text-style",

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
                    value: 1,
                    isSvgAttr: true,
                    scaleStep: 0.01,
                    min: 0,
                    max: 1
                },
                "offset": {
                    type: "seq",
                    value: 10,
                    isSvgAttr: false,
                    scaleStep: 1,
                    min: 0,
                    max: Infinity
                },

            },
        }




        this.figureData.xAxis.Grid.switch.value = true
        this.figureData.xAxis.Grid.stroke.value = "#ffffff"
        this.figureData.xAxis.Grid["stroke-opacity"].value = "1"
        this.figureData.yAxis.Grid.switch.value = true
        this.figureData.yAxis.Grid.stroke.value = "#ffffff"
        this.figureData.yAxis.Grid["stroke-opacity"].value = "1"



        this.figureData.xAxis.Tick.removePath.value =  true
        this.figureData.yAxis.Tick.removePath.value =  true
        this.figureData.background.Background.switch.value = true
        super.creatVueApp();//数据增加后再调用父方法



        this.handleClickMethods["reDoPCoA"] = async function (e){


            self.CCARDAData = await self.reDoPCoA()

            self.onLoadNewFile(self.CCARDAData, "web")


        }

        this.handleClickMethods["viewRDAData"] = function (e){
            if(!self.CCARDAData){
                self.showMessageBox("cuIcon-roundclose",`No layer data!`,"error")
                self.shakeElement(e)
                return
            }
            let dataArr = [
                {
                    fileName:`${self.plotType}_sample`,
                    type:"tsvStr",
                    fileData: d3.tsvFormat(self.CCARDAData.scatterData, self.CCARDAData.scatterData.columns)
                },
                {
                    fileName:`${self.plotType}_env`,
                    type:"tsvStr",
                    fileData: d3.tsvFormat(self.CCARDAData.envData, self.CCARDAData.envData.columns)
                }


            ]

            window.localStorage.setItem('RDADataArr', JSON.stringify(dataArr));
            window.open(`/static/xiaochiPlot/src/exampleData.html?type=localStorage&source=RDADataArr`)

        }











    }
    drawEnvArrow(){
        let arrow_style_obj = this.figureData.arrow
        if(!arrow_style_obj["Arrow line"].switch.value){
            return
        }
        let id_key = this.envData.columns[0]
        let x_key = this.envData.columns[1]
        let y_key = this.envData.columns[2]
        let arrow_G = this.maingroup.append("g")
        let scale_factor = arrow_style_obj["Arrow line"]["length-scale"].value

        arrow_G.selectAll("arrow-line")
            .data(this.envData)
            .join("g")
            .call(g=>{



                let arrow_scale = arrow_style_obj["Arrow style"]["arrow-scale"].value;

                let getArrowVector = (endPoint, arrow_scale)=>{
                    let startPoint = { x: this.xScale(0), y: this.yScale(0) };

                    let dx = endPoint.x - startPoint.x;
                    let dy = endPoint.y - startPoint.y;
                    let length = Math.sqrt(dx * dx + dy * dy);
                    // Scale the vector to the desired length
                    // You can adjust the scale factor to change the arrow size

                    let arrowVector = { x: dx / length * arrow_scale, y: dy / length * arrow_scale };
                    return arrowVector
                }

                g.append("line")
                    .attr("x1", this.xScale(0))
                    .attr("y1", this.yScale(0))
                    .attr("x2", d=> {
                        let endPoint = {x:this.xScale(d[x_key]*scale_factor), y:this.yScale(d[y_key]*scale_factor)};
                        let arrowVector = getArrowVector(endPoint, arrow_scale)
                        return endPoint.x - arrowVector.x
                    })
                    .attr("y2", d=> {
                        let endPoint = {x:this.xScale(d[x_key]*scale_factor), y:this.yScale(d[y_key]*scale_factor)};
                        let arrowVector = getArrowVector(endPoint, arrow_scale)
                        return endPoint.y - arrowVector.y
                    })
                    .attr("class", arrow_style_obj["Arrow line"].id)
                    .attr("stroke-linecap", "round")
                    .call(L=>this.renderAttr(L,arrow_style_obj["Arrow line"]))


                g.append("polygon")
                    .attr("points", d=> {


                        let endPoint = {x:this.xScale(d[x_key]*scale_factor), y:this.yScale(d[y_key]*scale_factor)};
                        let arrowVector = getArrowVector(endPoint, arrow_scale)



                        let str = (endPoint.x - arrowVector.x - arrowVector.y) + "," + (endPoint.y - arrowVector.y + arrowVector.x) + " " +
                            (endPoint.x - arrowVector.x + arrowVector.y) + "," + (endPoint.y - arrowVector.y - arrowVector.x) + " " +
                            (endPoint.x) + "," + (endPoint.y)

                        return str
                    })
                    .attr("fill", arrow_style_obj["Arrow line"].stroke.value);


                g.append("g")
                    .attr("transform", d=> {
                        let endPoint = {x:this.xScale(d[x_key]*scale_factor), y:this.yScale(d[y_key]*scale_factor)};
                        let arrowVector = getArrowVector(endPoint, arrow_style_obj["Arrow text"].offset.value)
                        return `translate(${endPoint.x  + arrowVector.x},${endPoint.y  + arrowVector.y})`
                    })
                    .selectAll("dragG")
                    .data(d=>[this.styleData.envTextDragData[d[id_key]]])
                    .join("g")
                    .attr("transform", d=>`translate(${d.x},${d.y})`)
                    .call(this.drag())
                    .append("text")
                    .text(d=>d.name)
                    .attr("text-anchor","middle")
                    .attr("class",arrow_style_obj["Arrow text"].id)
                    .attr("dy","0.35em")
                    .call(T=>this.renderAttr(T,arrow_style_obj["Arrow text"]))


            })


    }

}


export {CCARDAPlot}