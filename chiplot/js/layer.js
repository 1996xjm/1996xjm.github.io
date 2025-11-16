let layer_component_T = `<div id="data-layer-container">
        <div id="layer-container-header" class="xiaochi-background">
            <div id="hide-layer-container-btn" :class="{'cuIcon-unfold': isDataLayerContainerShow,'cuIcon-fold':!isDataLayerContainerShow}"  @click="hideLayerContainer"></div>
            <span>Layer Data</span>
        </div>
        <div id="load-data-box">
            <div class="layer-files-box">
                <div class="layer-file-row-box" v-for="(ldf,ldfi) in layerDataFlieList">
                    <input style="margin-left: 10px;cursor: pointer;"  type="checkbox" :value="ldf.fileKey" v-model="currentLayerDataFlieKey" @change="selectLayerFile(ldf.fileKey,$event)">
                   <div class="layer-file-row-icon-box">
                       <img style="height: 26px;" :src="'/static/xiaochiPlot/img/icon/'+ ldf.fileType +'.png'">
                   </div>
                   <div class="layer-file-row-name-box">{{ldf.fileName}}</div>
                    <div class="layer-row-icon-box cuIcon-upload"  @click="addLayerDataFile(ldf.fileKey)"></div>
                    <div class="layer-row-icon-box cuIcon-deletefill"  @click="deleteLayerDataFile(ldf.fileKey)"></div>
                </div>
            </div>
            <div class="btn-row-box">
            
                <div class="mybutton-hover mybutton cuIcon-roundadd" @click="addLayerDataFile()"></div>
                <div class="mybutton-hover mybutton cuIcon-attentionfill" @click="viewMetaData()"></div>
                <div class="mybutton-hover mybutton cuIcon-delete" @click="deleteLayerDataFile()"></div>

            </div>
        </div>
        <div id="layer-title-box" class="xiaochi-background">Layers</div>
        <div id="layer-box">
            <div class="layer-row-box" v-for="(l,li) in layerList" :style="{backgroundColor: l.selected ? 'silver':'white'}">
                <div v-show="li != currentEditingLayerIndex" class="layer-row-name-box" @mouseover="showLayerInformationHoverBox($event,l)" @mouseleave="hideLayerInformationHoverBox(l)" @click="selectLayer(l)">{{l.layerName}}</div>
                <input style="flex: 1;height: 30px;" v-show="li == currentEditingLayerIndex" type="text" v-model="l.layerName" @keyup.enter="layerNameInputBlur(li)" @blur="layerNameInputBlur(li)">
                <div class="layer-row-icon-box cuIcon-edit"  @click="changeLayerName($event,li)"></div>
                <div class="layer-row-icon-box cuIcon-deletefill"  @click="deleteLayer(l,li)"></div>
                <div class="layer-row-icon-box cuIcon-attentionfill" :class="{'cuIcon-attentionfill':l.isShowObj.isShow,'cuIcon-attention':!l.isShowObj.isShow,'text-gray':!l.isShowObj.isShow,'text-orange':l.isShowObj.isShow}" @click="hideLayer(l,$event)"></div>

            </div>





        </div>
        <div id="add-layer-btn"  class="cuIcon-roundaddfill animation-" :class="{'text-gray':!isLoadedLayerData,'text-orange':isLoadedLayerData}" @click="addDataLyer($event)"></div>
    </div>
    <div id="layer-data-choose-box" v-show="isLayerDataChooseBoxShow">
        <div id="layer-data-choose-title-box">
            <div class="mybutton cuIcon-close" @click="hideLayerDataChooseBox"></div>
        </div>
        <div style="display: flex;justify-content: left;width: 96%;">
            <button class="mybutton" style="background-color: rgb(102, 194, 165); width: 85px; height: 30px;">Layer type:</button>
            <select style="margin-left: 10px;"    v-model="layerTypeIndex" @change="selectLayerType($event)">
                <option :value="index" v-for="(op,index) in layerTypeList">{{op}}</option>
            </select>
            <button @click="selectAllColumns" class="mybutton cuIcon-roundcheckfill" style="background-color: rgb(102, 194, 165); width: 100px; height: 30px;margin-left: 10px;">Select all</button>
            <button @click="deselectAllColumns" class="mybutton cuIcon-roundclosefill" style="background-color: #999999; width: 110px; height: 30px;margin-left: 10px;">Deselect all</button>
        </div>
        <div id="layer-data-table-box">
            <table class="data-choose">
                <tbody>
                <tr>
                    <th v-for="(col,i) in layerData.columns">{{col.name}}
                        <input v-if="i!=0"  type="checkbox" :value="i" v-model="currentChenkedColumns" >
                    </th>
                </tr>
                <tr v-for="row in layerData">
                    <td v-for="col in layerData.columns">{{row[col.name]}}</td>

                </tr>

                </tbody></table>
        </div>
        <div class="layer-data-choose-btn-box">
            <div class="mybutton" style="width: 70px;height: 40px;line-height: 40px;" @click="addDataLyerSubmit($event)">Add</div>
        </div>
    </div>
    <div id="yes-or-no-message-box" v-show="isYesOrNoMessageBoxShow">
        <div class="title-box" >
        <h5 class="modal-title" id="exampleModalLabel">{{YesOrNoMessageObj.title}}</h5>
            <div class="mybutton cuIcon-close" @click="hideYesOrNoMessageBox"></div>
        </div>
        <div class="middle-contain-box" style="flex: 1;align-items: center;display: flex;flex-direction: column;justify-content: center;padding: 15px;" v-html="YesOrNoMessageObj.content">
        
        </div>
        <div class="choose-btn-box">
            <div class="mybutton" style="width: 70px;height: 40px;line-height: 40px;" @click="YesOrNoMessageObj.yesFun($event)">{{YesOrNoMessageObj.yesText}}</div>
        </div>
    </div>
     <div class="mybutton cuIcon-edit" id="hideLayerContainer-toogle" @click="hideLayerContainer($event)" style="position: fixed;bottom: 60px;left:20px; "></div>
    <div class="myModal" v-show="isShowModal"></div>
<div id="layer-information-hover-box" v-show="isShowLayerInformationHoverBox" :style="{top: layerInformationHoverBoxClientY + 'px', left: layerInformationHoverBoxClientX  + 'px'}">
<div style="height: 30px;text-align: center;line-height: 30px;color: white;border-top-left-radius: 4px;border-top-right-radius: 4px;background-color: #8da0cb;" >{{layerInformationHoverBoxTitle}}</div>
<table>
<tbody>
<tr v-for="item in layerInformationHoverBoxDataArr">
<td>{{item.key}}:</td>
<td>{{item.value}}</td>
</tr>
</tbody>
</table>
</div>
`


class LayerComponent {
    constructor(mainPlot, layerTypeList=[]) {
        this.mainPlot = mainPlot
        this.layerTypeList = layerTypeList
        this.handleLayerDataFunctionDict = {}
    }
    addLayerType(layerType, handleLayerDataFunction){

        this.layerTypeList.push(layerType)
        this.handleLayerDataFunctionDict[layerType] = handleLayerDataFunction

    }
    createVUELayerComponent(){
        const mainPlot = this.mainPlot
        const self = this
        mainPlot.layerDataDict = {}

        let layer_component =  {
            data() {
                return {
                    "layerData":[],
                    "currentChenkedColumns":[],
                    "layerList":[],
                    "layerDataFlieList":[],
                    "currentLayerDataFlieKey":[],
                    "layerStatistic":{},
                    "isLayerDataChooseBoxShow":false,
                    "layerInformationHoverBoxDataArr":[{key:"Branch length",value:100},{key:"Branch length",value:100},{key:"Branch length",value:100}],
                    "layerInformationHoverBoxTitle":"Layer information",
                    "isYesOrNoMessageBoxShow":false,
                    "isDataLayerContainerShow":false,
                    "isAnimationShake":false,
                    "isLoadedLayerData":false,
                    "isShowModal":false,
                    "isShowLayerInformationHoverBox":false,
                    "layerInformationHoverBoxClientX":20,
                    "layerInformationHoverBoxClientY":20,
                    "currentEditingLayerIndex":-1,
                    "layerTypeList":self.layerTypeList,
                    "YesOrNoMessageObj" : {
                        title:"Notification",
                        content:"If you use this figure in your article, please cite our website address: https://www.chiplot.online/",
                        yesFun: e=> {

                        }
                    },
                    dataSource: null,
                    layerTypeIndex:0
                }
            },
            methods:{
                async addLayerDataFile(fileKey){

                    let fileList = await mainPlot.fileManager.openFile(mainPlot.OpenFilePickerOptions)
                    // let data = await self.creatD3Data(fileList[0])



                    let d3_data = await mainPlot.creatD3Data(fileList[0])
                    let fileName = fileList[0].name;
                    if(fileName.slice(fileName.lastIndexOf(".") + 1).toLowerCase() == "xml"){
                        //处理不同xml
                        console.log(d3_data)
                        let options = ["MEME"]
                        let optionsStr = ""
                        options.forEach((ele,i)=>{
                            optionsStr += `<option value="${i}">${ele}</option>`
                        })
                        mainPlot.showYesOrNoMessageBox(
                            "Notification",
                            `choose a xml file source:<select id="xml-file-source-type" style="width: 80px;">
${optionsStr}
</select>`,
                            ()=>{
                                let selectedIndex = d3.select("#xml-file-source-type").node().selectedIndex
                                let sourceType = options[selectedIndex]
                                console.log(sourceType)
                                if(sourceType == "MEME"){
                                    d3_data = this.parseMEMExml(d3_data)
                                    console.log(fileKey)
                                    this.handleLayerDataFile(d3_data, fileName, fileKey)
                                }
                            }
                        )
                    }else {
                        console.log(fileName)
                        if(!d3_data.columns){
                            console.log("file type err")
                            mainPlot.showMessageBox("cuIcon-roundclose","File format error!!!","error")
                            return
                        }
                        this.handleLayerDataFile(d3_data, fileName, fileKey)
                    }









                },
                parseMEMExml(xml){

                    let motif_data_dict = {}

                    let xmlData = d3.select(xml);
                    xmlData.selectAll("sequence").nodes().forEach(node=>{


                        motif_data_dict[node.attributes.id.value] = {
                            sequence_id: node.attributes.name.value,
                            length: Number(node.attributes[2].nodeValue),
                        }


                    })

                    let motif_arr = xmlData.selectAll("motif");
                    let motif_length_dict = {}
                    let columns = []
                    motif_arr.nodes().forEach(motif=>{
                        let motif_length = Number(motif.attributes.width.value)
                        let motif_id = motif.attributes.id.value
                        columns.push(motif_id)
                        motif_length_dict[motif_id] = motif_length
                        let motif_meta = {
                            id:motif_id,
                            name:motif.attributes.name.value,
                            width:Number(motif.attributes.width.value),
                            p_value:Number(motif.attributes.p_value.value),
                            e_value:Number(motif.attributes.e_value.value),

                        }
                        d3.select(motif).selectAll("contributing_site").nodes().forEach(contributing_site=>{
                            let sequence_id = contributing_site.attributes.sequence_id.value
                            let start = Number(contributing_site.attributes.position.value)
                            let pvalue = Number(contributing_site.attributes.pvalue.value)
                            let items = {
                                start:start+1,
                                end:start + motif_length_dict[motif_id],
                                pvalue:pvalue
                            };
                            if(motif_id in motif_data_dict[sequence_id]){
                                motif_data_dict[sequence_id][motif_id]["contributing_sites"].push(items)
                            }else {

                                motif_data_dict[sequence_id][motif_id] = {
                                    contributing_sites:[items],
                                    motif_meta:motif_meta
                                }
                            }
                        })

                    })

                    console.log(motif_data_dict)




                    xmlData.selectAll("scanned_sites").nodes().forEach(node=>{
                        let seq_id = node.attributes.sequence_id.value;
                        d3.select(node).selectAll("scanned_site").nodes().forEach(m=>{
                            let motif_id = m.attributes.motif_id.value
                            let start = Number(m.attributes.position.value)
                            let pvalue = Number(m.attributes.pvalue.value)
                            let item = {

                                start:start+1,
                                end:start + motif_length_dict[motif_id],
                                pvalue:pvalue
                            }

                            console.log(seq_id, motif_id)

                            if(motif_id in motif_data_dict[seq_id]){
                                if("scanned_sites" in motif_data_dict[seq_id][motif_id]){
                                    motif_data_dict[seq_id][motif_id]["scanned_sites"].push(item)
                                }else {

                                    motif_data_dict[seq_id][motif_id]["scanned_sites"] = [item]

                                }
                            }else {
                                motif_data_dict[seq_id][motif_id] = {
                                    "scanned_sites" : [item],
                                    "contributing_sites":[]
                                }
                            }


                        })
                    })

                    // “contributing_sites_and_scanned_sites

                    for(let seq_id in motif_data_dict){
                        for(let column_id in motif_data_dict[seq_id]){
                            if(column_id.startsWith("motif")){
                                let scanned_sites = motif_data_dict[seq_id][column_id]["scanned_sites"] || []
                                let contributing_sites = motif_data_dict[seq_id][column_id]["contributing_sites"]
                                console.log(scanned_sites)
                                console.log(contributing_sites)
                                const mergedArr = [...scanned_sites, ...contributing_sites].reduce((acc, cur) => {
                                    const index = acc.findIndex(item => item.start === cur.start && item.end === cur.end);
                                    if (index === -1) {
                                        acc.push(cur);
                                    } else {
                                        acc[index] = cur;
                                    }
                                    return acc;
                                }, []);
                                console.log(mergedArr)
                                motif_data_dict[seq_id][column_id]["contributing_sites_and_scanned_sites"] = mergedArr
                            }
                        }
                    }


                    console.log(motif_data_dict)
                    console.log(motif_length_dict)

                    let d3_data = []

                    for(let seq_id in motif_data_dict){
                        columns.forEach(col=>{
                            if(col in motif_data_dict[seq_id]){
                                motif_data_dict[seq_id][col] = JSON.stringify(motif_data_dict[seq_id][col])
                            }else {
                                motif_data_dict[seq_id][col] = null
                            }
                        })
                        d3_data.push(motif_data_dict[seq_id])
                    }

                    d3_data.columns = ["sequence_id", "length"].concat(columns)

                    console.log(d3_data)

                    return d3_data





                },
                deleteLayerDataFile(fileKey){



                    console.log(this.currentLayerDataFlieKey)

                    if(this.currentLayerDataFlieKey.length == 0){
                        return
                    }

                    fileKey = fileKey || this.currentLayerDataFlieKey[0]

                    let index = this.layerDataFlieList.findIndex(ele=>ele.fileKey==fileKey)
                    console.log(index)
                    this.layerDataFlieList.splice(index,1)

                    //    删除相关图层
                    let layerToBeDeleteArr = []
                    this.layerList.forEach(l=>{
                        console.log(l)
                        console.log(fileKey)
                        if(l.layerDataFlieKey == fileKey){
                            layerToBeDeleteArr.push(l)
                        }
                    })
                    // 删除后导致index乱了，连续两个删不掉, 不能在上面直接删
                    layerToBeDeleteArr.forEach(l=>{
                        this.deleteLayer(l)
                    })
                    // 因为上面每删掉一次会刷新一次，如果一个文件有多个图层，就会报错，所以要等上面全部删完，下面的再删掉
                    delete mainPlot.layerDataDict[fileKey]

                    if(this.layerDataFlieList.length == 0){
                        this.isLoadedLayerData = false
                        //修改文件选择
                        this.currentLayerDataFlieKey = []
                    }else if(this.currentLayerDataFlieKey[0] == fileKey){
                        // this.currentLayerDataFlieKey[0] = this.layerDataFlieList[0].fileKey
                        this.selectLayerFile(this.layerDataFlieList[0].fileKey)
                    }



                },
                viewMetaData(){
                    if(this.layerDataFlieList.length==0){
                        mainPlot.showMessageBox("cuIcon-roundclose",`No layer data!`,"error")
                        // this.shakeElement(e)
                        return
                    }
                    let metaDataArr = []
                    this.layerDataFlieList.forEach(lf=>{
                        let layerData = mainPlot.layerDataDict[lf.fileKey].dataSource
                        let metaDataObj = {
                            fileName:lf.fileName,
                            type:layerData.columns ?  "tsvStr" : "text",
                            fileData: layerData.columns ? d3.tsvFormat(layerData, layerData.columns) : layerData
                        }

                        metaDataArr.push(metaDataObj)

                    })

                    window.localStorage.setItem('metaDataArr', JSON.stringify(metaDataArr));
                    window.open(`/static/xiaochiPlot/src/exampleData.html?type=localStorage&source=metaDataArr`)

                },
                handleLayerDataFile(d3Data, fileName="", fileKey){




                    let col = d3Data.columns
                    const hasDuplicates = col.filter((item, index) => col.indexOf(item) !== index).length > 0;
                    if(hasDuplicates){
                        mainPlot.showMessageBox("cuIcon-roundclose","Duplicate names in first row!","error")

                        return;
                    }
                    d3Data =  d3.filter(d3Data,d=>d[d3Data.columns[0]] != null)
                    d3Data.columns = col

                    //有些人的id列可能是数字,或者有空格
                    d3Data.forEach(ele=>{
                        ele[d3Data.columns[0]] = ele[d3Data.columns[0]].toString().trim()
                    })

                    if(typeof fileKey == "string"){
                        //    更新数据

                        console.log("更新数据")

                        if(fileKey != fileName.replaceAll(" ", "_")){
                            mainPlot.showMessageBox("cuIcon-roundclose","File name must be the same!!!","error")
                            return
                        }

                        try {
                            mainPlot.layerDataDict[fileKey] = {
                                dataSource:d3Data,
                                dataIndex:d3.index(d3Data,ele=>ele[d3Data.columns[0]])
                            }
                        }
                        catch (e){
                            mainPlot.showMessageBox("cuIcon-roundclose","Duplicate IDs in first column!","error")

                            return;
                        }
                        this.layerList.forEach(l=>{
                            console.log("l.layerDataFlieKey",l,l.layerDataFlieKey,fileKey)

                            if(l.layerDataFlieKey == fileKey){
                                //更新图层控制属性
                                let layerData = this.layerStatistic[l.layerType][l.layerStatisticIndex]
                                console.log(layerData)
                                if(layerData.otherData.updateFunction){
                                    layerData.otherData.updateFunction(d3Data, layerData)
                                }
                            }
                        })
                        if(fileKey == this.currentLayerDataFlieKey[0]){
                            this.selectLayerFile(fileKey)
                        }
                        mainPlot.showMessageBox("cuIcon-roundcheck","File updated!","success")
                        mainPlot.init()
                        console.log(this.layerDataFlieList)
                        return;
                    }

                    fileKey = fileName.replaceAll(" ", "_");

                    if(fileKey in mainPlot.layerDataDict){
                        console.log("file name duplicate")
                        mainPlot.showMessageBox("cuIcon-roundclose","File name duplicate!!!","error")
                        return

                    }



                    console.log(fileName)
                    console.log(d3Data)

                    try {
                        this.dataSource = d3.index(d3Data,ele=>ele[d3Data.columns[0]])
                        let fileType = "txt"
                        if(fileName.lastIndexOf(".")!=-1){
                            let suffix = fileName.slice(fileName.lastIndexOf(".")+1).toLowerCase()

                            switch (suffix){
                                case "tsv":
                                    fileType = "tsv"
                                    break
                                case "csv":
                                    fileType = "csv"
                                    break
                                case "xlsx":
                                    fileType = "excel"
                                    break
                                case "xls":
                                    fileType = "excel"
                                    break
                                case "xml":
                                    fileType = "xml"
                                    break
                            }
                        }
                        this.layerDataFlieList.push({
                            fileName:fileName,
                            fileType:fileType,
                            fileKey: fileKey
                        })
                        mainPlot.layerDataDict[fileKey] = {
                            dataSource:d3Data,
                            dataIndex:d3.index(d3Data,ele=>ele[d3Data.columns[0]])
                        }

                    }catch (e) {
                        console.log(e)
                        mainPlot.showMessageBox("cuIcon-roundclose","ID duplicate!","error")

                        return;
                    }
                    this.isLoadedLayerData = true

                    if(this.layerDataFlieList.length == 1){
                        this.currentLayerDataFlieKey = [this.layerDataFlieList[0].fileKey]
                        mainPlot.layerData = d3Data
                        this.selectLayerFile(this.layerDataFlieList[0].fileKey)

                    }

                    mainPlot.showMessageBox("cuIcon-roundcheck","File added!","success")

                },
                selectLayerFile(fileKey){
                    console.log(fileKey)
                    console.log(mainPlot.layerDataDict)
                    //  清空选择列
                    this.currentChenkedColumns = []
                    this.currentLayerDataFlieKey = [fileKey]
                    let d3Data = mainPlot.layerDataDict[fileKey].dataSource
                    let part_data = d3Data.slice(0,10)
                    let newColumns = []
                    d3Data.columns.forEach(ele=>{
                        newColumns.push({
                            name:ele,
                            type:typeof d3Data[0][ele]
                        })
                    })

                    part_data.columns = newColumns
                    this.layerData = part_data
                },
                hideLayerDataChooseBox(){
                    d3.select("#layer-data-choose-box")
                        .style("top","200px")
                        .transition()
                        .ease(d3.easeQuadInOut)
                        .duration(400)
                        .style("top","-300px")
                    setTimeout(function () {
                        this.isLayerDataChooseBoxShow = false

                    },500)

                    this.isShowModal = false
                },
                hideYesOrNoMessageBox(){
                    d3.select("#yes-or-no-message-box")
                        .style("top","200px")
                        .transition()
                        .ease(d3.easeQuadInOut)
                        .duration(400)
                        .style("top","-400px")
                    setTimeout(function () {
                        this.isLayerDataChooseBoxShow = false

                    },500)

                    this.isShowModal = false
                },
                showLayerInformationHoverBox(e,l){
                    console.log(e,l)
                    this.layerInformationHoverBoxClientX = e.clientX + 20
                    this.layerInformationHoverBoxClientY = e.clientY
                    this.isShowLayerInformationHoverBox = true
                    this.layerInformationHoverBoxTitle = "Layer information"

                    this.layerInformationHoverBoxDataArr = [
                        {
                            "key":"Dataset layer type",
                            "value":l.layerType
                        },
                        {
                            "key":"Data file name",
                            "value":l.layerDataFlieKey
                        },
                        {
                            "key":"Columns used",
                            "value":l.layerDataColumns.map(ele=>mainPlot.layerDataDict[l.layerDataFlieKey].dataSource.columns[ele]).join(", ")
                        },
                    ]

                },
                hideLayerInformationHoverBox(l){
                    this.isShowLayerInformationHoverBox = false
                },
                deleteLayer(l, li){
                    console.log(l.layerStatisticIndex)
                    console.log(li)
                    li = li || this.layerList.findIndex(ele=>ele==l)
                    let index = 0
                    //解决删除后index错乱
                    this.layerList.forEach(ele=>{
                        if(ele.layerType == l.layerType){
                            if(index > l.layerStatisticIndex){
                                ele.layerStatisticIndex -= 1
                            }
                            index++
                        }
                    })
                    this.layerList.splice(li,1)
                    this.layerStatistic[l.layerType].splice(l.layerStatisticIndex,1)
                    mainPlot.Vue.$refs.controlPlane.$data.controlList[1] = []
                    mainPlot.init()
                },
                layerNameInputBlur(li){
                    this.currentEditingLayerIndex = -1
                },
                changeLayerName(e, li){

                    console.log(e)
                    this.currentEditingLayerIndex = li
                    setTimeout(function () {
                        e.target.parentNode.children[1].focus()
                    },100)


                },
                addDataLyer(e){
                    console.log(90)

                    if(!this.isLoadedLayerData){
                        console.log("noupload data")
                        mainPlot.showMessageBox("cuIcon-roundclose","No uploaded layer data!","error")

                        mainPlot.shakeElement(e)
                        return
                    }
                    this.isLayerDataChooseBoxShow = true
                    this.isShowModal = true
                    d3.select("#layer-data-choose-box")
                        .style("top","-300px")
                        .transition()
                        .ease(d3.easeQuadInOut)
                        .duration(400)
                        .style("top","200px")
                },
                selectAllColumns(){

                    this.currentChenkedColumns = d3.range(this.layerData.columns.length).slice(1)

                },
                deselectAllColumns(){

                    this.currentChenkedColumns = []

                },

                selectColumns(col,e){
                    let isChecked = e.target.checked
                    console.log(col,isChecked)
                    if(isChecked){

                        this.currentChenkedColumns.push(col)
                    }else {
                        this.currentChenkedColumns.splice(this.currentChenkedColumns.indexOf(col),1)
                    }
                    console.log(this.currentChenkedColumns)

                },
                datacheck(typeArr){
                    let bool = true
                    if(this.noDataCheck){
                        //更新json数据 就不需要检查
                        return bool
                    }
                    if(this.currentChenkedColumns.length>typeArr.length){
                        console.log("too much data")
                        mainPlot.showMessageBox("cuIcon-roundclose",`More than ${typeArr.length} column selected!`,"error")


                        return false;
                    }
                    if(this.currentChenkedColumns.length<typeArr.length){
                        console.log("not enough data")
                        mainPlot.showMessageBox("cuIcon-roundclose",`Less than ${typeArr.length} column selected!`,"error")


                        return false;
                    }
                    typeArr.forEach((type,i)=>{
                        //null 的type类型是object
                        console.log(this.layerData.columns, this.currentChenkedColumns[i])
                        if(type != "" && this.layerData.columns[this.currentChenkedColumns[i]].type != "object" && this.layerData.columns[this.currentChenkedColumns[i]].type != type){
                            console.log(this.layerData.columns[this.currentChenkedColumns[i]].type)
                            console.log(`col is not ${type}`)
                            mainPlot.showMessageBox("cuIcon-roundclose",`Column selected ${i+1} is not ${type}!`,"error")

                            bool = false
                        }
                    })

                    return bool
                },

                addDataLyerSubmit(e,layerStatistic, layerListItem){
                    let layerType = this.layerTypeList[this.layerTypeIndex]
                    let categoryList =  []
                    let controlData = {}
                    let otherData = {}
                    let legendDragData = {x:mainPlot.marginLeft+mainPlot.innerwidth+60,y:100}

                    if(layerStatistic){
                        this.currentChenkedColumns = layerStatistic.layerDataColumnsIndex
                        layerType = layerListItem.layerType
                        this.noDataCheck = true
                    }else {
                        this.noDataCheck = false
                    }

                    if(this.currentChenkedColumns.length==0){
                        console.log("no DATA select")
                        mainPlot.showMessageBox("cuIcon-roundclose","No columns selected!","error")
                        mainPlot.shakeElement(e)

                    }else {


                        if(!this.layerStatistic.hasOwnProperty(layerType)){
                            this.layerStatistic[layerType] = []
                        }

                        let idSuffix = `${layerType.replaceAll(" ","-")}-${this.layerStatistic[layerType].length}`
                        let dataSource = mainPlot.layerDataDict[layerStatistic?layerListItem.layerDataFlieKey:this.currentLayerDataFlieKey[0]].dataSource;




                        //检查选择的数据规范不
                        let handleRes = self.handleLayerDataFunctionDict[layerType].call(this,
                            {layerType, dataSource, idSuffix,
                                controlData,
                                categoryList,
                                otherData,
                                legendDragData})

                        if(!handleRes){
                            mainPlot.shakeElement(e)
                            return
                        }

                        ({controlData,
                            categoryList,
                            otherData,
                            legendDragData} = handleRes)



                        if(layerStatistic){

                            mainPlot.updateControlData(layerStatistic.controlData, controlData)

                            layerStatistic.controlData = controlData
                            if(otherData.updateFunction){
                                //函数没有办法保存到json里面 这里要更新回来
                                layerStatistic.otherData.updateFunction = otherData.updateFunction
                            }

                            this.layerStatistic[layerType].push(layerStatistic)


                            this.layerList.push({
                                    layerType: layerType,
                                    layerDataColumns: this.currentChenkedColumns,
                                    isShowObj: layerStatistic.isShowObj,
                                    layerName: layerListItem.layerName,
                                    layerStatisticIndex: this.layerStatistic[layerType].length - 1,
                                    layerDataFlieKey:layerListItem.layerDataFlieKey
                                }
                            )

                            this.currentChenkedColumns=[]

                            mainPlot.init()

                            return;
                        }


                        this.addLayerStatistic(categoryList, controlData, otherData, legendDragData)
                    }
                },

                addLayerStatistic(categoryList, controlData, otherData, legendDragData={x:0,y:10}, layerType, isShowObj, categoryColorList){
                    layerType = layerType || this.layerTypeList[this.layerTypeIndex]
                    isShowObj = isShowObj || {
                        isShow:true
                    }

                    categoryColorList = categoryColorList || d3.quantize( d3.interpolateWarm,categoryList.length)

                    this.layerStatistic[layerType].push( {
                        layerDataColumnsIndex:this.currentChenkedColumns,
                        layerDataFlieKey:this.currentLayerDataFlieKey[0],
                        isShowObj:isShowObj,
                        categoryList:categoryList,
                        categoryColorList:categoryColorList,
                        controlData:controlData,
                        colorInterpolate:null,
                        isUseColorGradient:false,
                        legendDragData:legendDragData,
                        otherData:otherData
                    })


                    this.layerList.push({
                            layerType: layerType,
                            layerDataColumns: this.currentChenkedColumns,
                            isShowObj: isShowObj,
                            layerName: layerType,
                            layerStatisticIndex: this.layerStatistic[layerType].length - 1,
                            layerDataFlieKey:this.currentLayerDataFlieKey[0],
                        }
                    )


                    this.currentChenkedColumns=[]

                    mainPlot.init()
                    // this.isLayerDataChooseBoxShow = false
                    this.isShowModal = false
                    // 取消checkbox的选择
                    d3.selectAll("table.data-choose input").nodes().forEach(ele=>{
                        ele.checked = false
                    })


                    d3.select("#layer-data-choose-box")
                        .transition()
                        .ease(d3.easeQuadInOut)
                        .duration(400)
                        .style("top","-300px")
                },
                hideLayerContainer(e){
                    console.log(90,e)
                    if(this.isDataLayerContainerShow){
                        d3.select("#data-layer-container")
                            .transition()
                            .duration(400)
                            .style("left","-305px")
                        d3.select("#svg-div").transition()
                            .duration(400).style("left","0px")
                        d3.select("#eagleMapContainer").transition()
                            .duration(400).style("left","0px")

                        d3.select("#add-layer-btn").transition()
                            .duration(400).style("left","-280px")

                        d3.select("#hideLayerContainer-toogle").transition()
                            .duration(400).style("left","20px")
                        this.isDataLayerContainerShow = false
                    }else {
                        d3.select("#data-layer-container")
                            .transition()
                            .duration(400)
                            .style("left","0px")

                        d3.select("#svg-div").transition()
                            .duration(400).style("left","300px")

                        d3.select("#eagleMapContainer").transition()
                            .duration(400).style("left","300px")

                        d3.select("#add-layer-btn").transition()
                            .duration(400).style("left","20px")

                        d3.select("#hideLayerContainer-toogle").transition()
                            .duration(400).style("left","320px")

                        this.isDataLayerContainerShow = true

                    }

                },
                selectLayerType(e){
                    console.log(this.layerTypeIndex)
                },
                hideLayer(l,e){
                    console.log(l,e)
                    l.isShowObj.isShow = !l.isShowObj.isShow
                    mainPlot.init()
                },
                selectLayer(l,li){

                    this.layerList.forEach(ele=>{
                        ele.selected = false
                    })
                    l.selected = true

                    let controlData =this.layerStatistic[l.layerType][l.layerStatisticIndex].controlData

                    if(controlData){
                        let layerTabIndex = mainPlot.Vue.$refs.controlPlane.$data.navHList.length - 1
                        mainPlot.Vue.$refs.controlPlane.$data.controlList[layerTabIndex] = mainPlot.dictToControlList(controlData)
                        mainPlot.Vue.$refs.controlPlane.$data.hTabIndex = layerTabIndex
                        mainPlot.appData.controlDataList[layerTabIndex] = controlData
                        mainPlot.Vue.$data.currentControlListIndex = layerTabIndex
                    }
                    mainPlot.currentLayerType = l.layerType
                    mainPlot.currentLayerStatisticIndex = l.layerStatisticIndex





                }
            },
            template: layer_component_T,
        }

        return layer_component
    }
}






export {LayerComponent}