import axios from 'axios';
import QS from 'qs';
import {Message, MessageBox, Loading} from 'element-ui'
import router from '../../router'

console.log(process.env);

let adminBaseURL = ''; //后台基础接口地址
let carBaseURL = ''; // 车型库接口地址
let tmBaseUrl = ''; // 钛马接口地址、暂时没用先放着
if(process.env.NODE_ENV === 'development'){
  adminBaseURL = 'http://dev.admin.700e.com/admin';
  carBaseURL = 'http://dev.admin.700e.com/cardata';
  tmBaseUrl = 'http://dev.700e.com';
  // adminBaseURL = 'http://118.25.36.139:8085';
  // carBaseURL = 'http://118.25.36.139:8085/cardata';
  // tmBaseUrl = 'http://118.25.36.139:8085';
  // adminBaseURL = 'http://192.168.8.149:8085';
}else if(process.env.NODE_ENV === 'production'){
  adminBaseURL = 'http://admin.700e.com/admin';
  carBaseURL = 'http://admin.700e.com/cardata';
  tmBaseUrl = 'http://www.700e.com';
}else if(process.env.NODE_ENV === 'test'){
  adminBaseURL = 'http://test.admin.700e.com/admin';
  carBaseURL = 'http://test.admin.700e.com/cardata';
  tmBaseUrl = 'http://test.700e.com';
}

//设置超时时间
axios.defaults.timeout = 60000;
axios.defaults.withCredentials = true;


let loadingInstance = ''; //设置请求缓冲

axios.interceptors.request.use((request) => {
  loadingInstance = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  if (request.url.indexOf('/login') === -1) {
    request.headers['a-token'] = sessionStorage.getItem('aToken') || ''
  }
  return request;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 切换接口地址
function baseUrlChange(url){
  if(url === 'car'){
    axios.defaults.baseURL = carBaseURL;
  }else if(url === 'tm'){
    axios.defaults.baseURL = tmBaseUrl;
    downLoad.defaults.baseURL = tmBaseUrl;
  }else{
    axios.defaults.baseURL = adminBaseURL;
    downLoad.defaults.baseURL = adminBaseURL;
  }
}

/*
* 封装get请求
* */
function get(url, params, baseUrl){
  return new Promise((resolve, reject) => {
    baseUrlChange(baseUrl);
    axios.get(url, params).then(res => {
      resolve(res.data)
    })
  })
}

/*
* 封装post请求
* 不序列化参数的请求
* */
function post(url, params, baseUrl){
  return new Promise((resolve, reject) => {
    baseUrlChange(baseUrl);
    // post请求需要使用QS序列化参数errors[0].field
    axios.post(url, params).then(res => {
      resolve(res.data)
    })
  })
}
/*
* 封装post请求
* 序列化参数的请求
* */
function post02(url, params, baseUrl){
  return new Promise((resolve, reject) => {
    baseUrlChange(baseUrl);
    // post请求需要使用QS序列化参数errors[0].field
    axios.post(url, QS.stringify(params)).then(res => {
      resolve(res.data)
    })
  })
}
/*
* 封装put请求
* */
function put(url, params, baseUrl){
  return new Promise((resolve, reject) => {
    baseUrlChange(baseUrl);
    axios.put(url, params).then(res => {
      resolve(res.data)
    })
  })
}

/*
* 封装Delete请求
* */
function Delete(url, params, baseUrl){
  return new Promise((resolve, reject) => {
    baseUrlChange(baseUrl);
    axios.delete(url, params).then(res => {
      resolve(res.data)
    })
  })
}


/*
* 响应拦截
* 在这里判断提示失败的原因
* */
axios.interceptors.response.use(
  response => {
    // 走到这里说明请求成功了
    // if(response.status === 200){
    //   console.log(Promise.resolve(response));
    //   return Promise.resolve(response)
    // }else{
    //   return Promise.reject(response)
    // }

    // 视情况而定，本项目需要判断status参数为success时才是成功的状态, 否则提示错误信息
    // console.log(response);
    // 关闭loding缓冲
    setTimeout(() => {
      loadingInstance.close();
    });
    if(response.data.status ==='success'){
      // 如果是从登陆页来的，先保存token
      if (response.config.url.indexOf('/login') !== -1) {
        sessionStorage.setItem('aToken', response.headers['a-token'])
      }
      return Promise.resolve(response)
    }else{
      // response.data.errmsg 这个判断条件是车型库的接口返回数据
      // console.log(response)
      if(response.data.message){
        Message.error(response.data.message);
      }else{
        Message.error(`${response.data.errors[0].errmsg}`);
      }

      return Promise.reject(response);
    }


  },
  error => {
    // console.log(error.response)
    // 关闭loding缓冲
    setTimeout(() => {
      loadingInstance.close();
    });
    if(error.response){
      switch (error.response.status) {
        case 400:
          Message.error('请求失败');
          break;
        case 500:
          Message.error('服务异常');
          break;
        case 502:
          Message.error('网络错误');
          break;
        case 504:
          Message.error('网络超时');
          break;
        default:
          console.log(error.response)
          if(error.response.data.errors[0].errcode === '403'){
            Message.warning('登陆超时，请重新登陆！');
            router.push({path: '/login'});
          }else{
            Message.error(error.response.data.errors[0].errmsg);
          }
          break
      }


    }
    return Promise.reject(error.response);

  }

  );


// 创建下载实例
const downLoad = axios.create({
  // 请求超时时间
  timeout: 60000,
  responseType: 'blob'
});
downLoad.interceptors.request.use((request) => {
  loadingInstance = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  if (request.url.indexOf('/login') === -1) {
    request.headers['a-token'] = sessionStorage.getItem('aToken') || ''
  }
  return request;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
downLoad.interceptors.response.use(
  response => {
    // 走到这里说明请求成功了
    // if(response.status === 200){
    //   console.log(Promise.resolve(response));
    //   return Promise.resolve(response)
    // }else{
    //   return Promise.reject(response)
    // }

    // 视情况而定，本项目需要判断status参数为success时才是成功的状态, 否则提示错误信息
    // console.log(response);
    // 关闭loding缓冲
    setTimeout(() => {
      loadingInstance.close();
    });
    return Promise.resolve(response)


  },
  error => {
    // console.log(error.response)
    // 关闭loding缓冲
    setTimeout(() => {
      loadingInstance.close();
    });
    if(error.response){
      switch (error.response.status) {
        case 400:
          Message.error('请求失败');
          break;
        case 500:
          Message.error('服务异常');
          break;
        case 502:
          Message.error('网络错误');
          break;
        case 504:
          Message.error('网络超时');
          break;
        default:
          console.log(error.response)
          if(error.response.data.errors[0].errcode === '403'){
            Message.warning('登陆超时，请重新登陆！');
            router.push({path: '/login'});
          }else{
            Message.error(error.response.data.errors[0].errmsg);
          }
          break
      }


    }
    return Promise.reject(error.response);

  }
);
function downLoadFile (url, params, baseUrl) {
  return new Promise((resolve) => {
    baseUrlChange(baseUrl);
    downLoad.post(url, params).then(res => {
      // 200
      resolve(res)
    });
  })
}
/*
* 封装post请求
* 序列化参数的请求
* */
function downPrivateBucketFile(url, params, baseUrl){
  return new Promise((resolve) => {
    baseUrlChange(baseUrl);
    downLoad.get(url, {params: params}).then(res => {
      // 200
      resolve(res)
    });
  })
}

export default {
  get, post, post02, Delete, put, downLoadFile, downPrivateBucketFile
}
