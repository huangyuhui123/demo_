
import axios from 'axios'


export default class Axios {
    static ajax(options) {
        let loading;
        if(options.data && options.data.isShowloading !==false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block'
        }
        const baseurl = "http://ncact.jinghangapps.com/mediaService"
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseurl,
                timeout: 5000,
                params: (options.data && options.data.params) || ''
                //headers：
                //跨域的话需要传cookie
            }).then((response) => {
                if(options.data && options.data.isShowloading !==false){
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none'
                }
                if (response.status === 200 ) { //服务起返回的状态码
                    const res = response.data
                    /* if (res.code === '0') {// 业务层面定义的code
                        resolve(res)
                    } else {
                        Modal.info({
                            title: "提示",
                            content: res.msg
                        })
                    } */
                    resolve(res)
                } else {
                    reject(response.data)
                }
            })
        })
    }
}