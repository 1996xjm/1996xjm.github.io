class FileManager {
    constructor() {
    }
    async openFile(OpenFilePickerOptions = {"multiple":false}){

        let accept = []
        console.log(OpenFilePickerOptions)
        if(OpenFilePickerOptions.types){
            OpenFilePickerOptions.types.forEach(t=>{
                for(let key in t.accept){
                    accept = accept.concat(t.accept[key])

                }
            })
        }




        function oldOpen(){
            return new Promise((resolve, reject) => {
                let input = document.createElement("input")
                input.type = "file"
                if(OpenFilePickerOptions.multiple){
                    input.multiple = "multiple"
                }
                if(OpenFilePickerOptions.types){
                    input.accept = accept.join(",")
                }
                input.addEventListener("change", e => {
                    //适配safari浏览器
                    let fileList = e.target ? e.target.files : e.path[0].files
                    resolve(fileList)

                })


                input.click()
            })
        }


            //检查有没有本地文件操作API
            if(window.showOpenFilePicker){
                console.log("本地文件操作API正常")
                let fileHandleList = await window.showOpenFilePicker(OpenFilePickerOptions);
                let fileList = []


                for(let i=0;i<fileHandleList.length;i++){
                    let file =  await fileHandleList[i].getFile()
                    fileList.push(file)
                }

                return fileList

            }
            else {
                return await oldOpen()
            }




    }
    saveBlobToFile(content,fileName){
        let reader = new FileReader();

        reader.readAsDataURL(content);
        reader.onload = function (e) {

            let el = document.createElement('a')
            //链接赋值
            el.href = e.target.result
            el.download = fileName
            //必须点击否则不会下载

            el.click()
        }
    }
    readExcel(file,multiSheet=false) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                let workbook = XLSX.read(data, {type: 'binary'});
                console.log("excel-book",workbook)
                let sheetDataArr = []
                workbook.SheetNames.forEach(sheetName=>{

                    let csvString = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName])

                    if(csvString.startsWith(",")){
                        //    有些人第一列不填id
                        csvString = "sample_id" + csvString
                    }
                    //$2 代表第二个括号内容，去掉空行、空列
                    csvString = csvString.replace(/(,+)(\n)/g,"$2")
                    //去掉结尾连续换行
                    csvString = csvString.replace(/\n+$/g,"\n")

                    sheetDataArr.push({
                        sheetName:sheetName,
                        d3Data:d3.csvParse(csvString, d3.autoType)
                    })
                })



                multiSheet ? resolve(sheetDataArr) : resolve(sheetDataArr[0].d3Data)


            }
            reader.readAsBinaryString(file);
        })
    }
    creatD3Data(file) {
        console.log(file)
        let d3_file_reader = null
        let url = window.webkitURL.createObjectURL(file)





        switch (file.name.slice(file.name.lastIndexOf(".") + 1)) {
            case "tsv":
                d3_file_reader = d3.tsv(url, d3.autoType)
                break;
            case "csv":
                d3_file_reader = d3.csv(url, d3.autoType)
                break;
            case "json":
                d3_file_reader = d3.json(url)
                break;
            case "xlsx":
                d3_file_reader = this.readExcel(file)

                break;
            case "xls":
                //旧版excel
                d3_file_reader = this.readExcel(file)
                break;



            default:
                d3_file_reader = d3.text(url)

        }

        return d3_file_reader

    }

}

export {FileManager}