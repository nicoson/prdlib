let APIHOST = 'http://0.0.0.0:3000';
// let APIHOST = 'http://115.231.110.62';
// let APIHOST = '';

// let isEditor = sessionStorage.isEditor == undefined ? false : (sessionStorage.isEditor == 'true' ? true : false);

// if(sessionStorage.islogin == undefined || sessionStorage.islogin != 'true') {
//     location.href = '/index.html';
// } else {
//     document.querySelector('section').removeAttribute('class');
// }
let CONFIG = {};
if(typeof(TOKEN) != 'undefined') {
    let App = {
        Bucket: "atlab-demo",
        //  account: ai-private@qiniu.com
        AK: "9x3px3ZihoMl2zwwT_igOCZ4Kti6q21Mi324EjWy",
        SK: "IJRdkEHEjF6OSUTmcFhsLxa66gQsCoqN68CfKS9S",
        domain: "http://psvar37zm.bkt.clouddn.com/"
    }
    
    let tk = new TOKEN();
    
    let token = tk.genToken(App.AK, App.SK, App.Bucket);
    // console.log(token);
        
    let config = {
        useCdnDomain: true,
        region: qiniu.region.z0
    };
        
    let putExtra = {
        fname: "",
        params: {},
        mimeType: null
    };
    
    CONFIG = {
        token: token,
        putExtra: putExtra, 
        config: config,
        app: App
    };
}


// initiate navbar
let page = {
    home:         '图片内容审核',
    object:         '场景物体识别',
    weixinweibo:    '微信微博',
    // // 'ocr-ctpn':     '长文本',
    ocr:            '通用OCR',
    // // idcard:         '身份证识别',
    idcardsari:     '身份证',
    bankcard:       '银行卡',
    // vat:            '增值税发票',
    tuso:           '以图搜图',
    faceso:         '人像检索',
    soso:           '结构化检索',
    face:           '人脸检测',
    // // search:         '涉暴信息(检测)',
    // // facecount:      '涉政信息'
};
let navbartmp = '';
for(let i in page) {
    navbartmp += `<a href="/${i}.html" ${location.pathname.indexOf(i+'.html')>0?'class="wa-home-nav-selected"':''} target="_self">${page[i]}</a>`;
}
document.querySelector("#wa_home_navbar").innerHTML = navbartmp;
document.querySelector("#wa_common_brand").innerHTML = `<img src="/imgs/logo.png" alt=""><p>闪马智能实验室</p>`;
document.querySelector("footer").innerHTML = `<p>@copy right reserved by Supremind</p>`;