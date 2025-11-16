

const QRCode_T = `<div id="qrCode-out-box">
    <div id="hand-box" v-show="isShowHandBox">
        <div id="hand-title" style="text-align: center;">Subscribe</div>
        <div id="hand-title" style="text-align: center;"></div>
        <img id="hand-imgbox" src="/static/icon/hand.png" alt="">
    </div>

    <div id="qrCode-img-box">
        <div class="qrCode-img-item-box" v-show="!isShowHandBox">
            <div id="qrcode-title" style="text-align: center;" v-html="QRCodeDataList[QRCodeDataIndex].title"></div>
            <img v-if="QRCodeDataList[QRCodeDataIndex].imgUrl" id="qrcode-imgUrl" :src="QRCodeDataList[QRCodeDataIndex].imgUrl" alt="">
        </div>

    </div>
    <div id="qrCode-box">
    
    <section v-for="(qr,index) in QRCodeDataList">
     <div  class="qrCode-item-box" @mouseenter="showQRCode(index)" @mouseleave="hideQRCode()">
            <img v-if="!qr.webUrl" :src="qr.icon" alt="">
            
            <a  v-if="qr.webUrl" :href="qr.webUrl" target="_blank">
            <img :src="qr.icon" alt="">
            </a>

        </div>
</section>

   
       
    </div>

</div>
`
const cookie_law_T = `<transition><div v-show="show" class="Cookie Cookie--bottom Cookie--dark-lime--rounded"><div class="Cookie__content">
      We use cookies to ensure you get the best experience on our website.
    </div> <div class="Cookie__button" @click="accept">Got it!</div></div></transition>`
class FooterQRCode{
    constructor(mainPlot) {
this.mainPlot = mainPlot
this.createQRCodeApp()
    }
    createQRCodeApp(){
        const self = this
        //底部二维码app
        Vue.createApp({})
            .component("qrcode-box", {
                data() {
                    return {
                        QRCodeDataIndex: 0,
                        isShowHandBox: true,
                        QRCodeDataList: [
                            {
                                title: "To index page",
                                webUrl: self.mainPlot.plotType.includes("Tree") ?"/tvbot.html" : "/",
                                icon: "/static/icon/index.png"
                            },
                            // {
                            //     title: `绘图咨询<span style="color: red;">10元/次</span><br>介意勿扰`,
                            //     imgUrl: "/static/images/wechatqrCode.jpg",
                            //     icon: "/static/icon/wechat.png"
                            // },
                            {
                                title: "Bilibili",
                                webUrl: "https://space.bilibili.com/30493771",
                                icon: "/static/icon/bilibili.png"
                            }, {
                                title: "WeChat official account",
                                imgUrl: "/static/images/gzh_qrcode.jpg",
                                icon: "/static/icon/gzh.png"
                            },
                        ]
                    }
                },
                methods: {
                    showQRCode: function (index) {
                        this.QRCodeDataIndex = index
                        this.isShowHandBox = false
                    },
                    hideQRCode: function () {
                        this.isShowHandBox = true
                    }
                },
                template: QRCode_T
            })
            .component("cookie-law-box", {
                data() {
                    return {
                        show: false,
                    }
                },
                mounted () {
                    let isAccepted = window.localStorage.getItem("cookie:accepted")
                    console.log("mounted",isAccepted)
                    if(isAccepted == null){
                        this.show = true
                    }
                },
                methods: {
                    accept: function () {
                        console.log("accept")
                        this.show = false
                        window.localStorage.setItem("cookie:accepted", true)
                    },

                },
                template: cookie_law_T
            })
            .mount(`#qrcode-app`)
    }
}


export {FooterQRCode}