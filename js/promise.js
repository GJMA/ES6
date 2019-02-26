const app = new Vue({
  el: '#app',
  data: {
    list: [
    ]
  },
  mounted () {
    // this.getJSON('/json/data.json').then(function (res) {
    //   return res
    // }).then(function (res) {
    //   console.log(res)
    // }, err => {
    //   console.log(err)
    // })
    this.getJSON("/json/data.json").then(function(json) {
      console.log(json)
      return json;
    }).then(function(post) {
      console.log(post)
      // ...
    });
    // this.callChaining()
  },
  methods: {
    loadImage () {
    },
    loadImageAsync (url) {
      return new Promise((resolve, reject) => {
        const image = new Image()

        image.onload = () => {
          resolve(image)
        }
        image.onerror = () => {
          reject(new Error('err'))
        }
        image.src = url
      }) 
    },
    getJSON (url) {
      const promise = new Promise( function (resolve, reject) {
        const handle = function () {
          if (this.readyState !== 4) {
            return
          }
          if (this.status === 200) {
            resolve(this.response)
          } else {
            reject(new Error(this.statusText))
          }
        }

        const client = new XMLHttpRequest()
        client.open('GET', url)
        client.onreadystatechange = handle
        client.responseType = 'json'
        client.setRequestHeader('Accept', 'application/json')
        client.send()
      })
      return promise
    },
    // 链式调用
    callChaining () {
      const p1 = new Promise(function (resolve, reject) {
        setTimeout(() => resolve(new Error('fail')), 3000)
      })
      
      const p2 = new Promise(function (resolve, reject){
        setTimeout(() => resolve(p1), 1000)
      })

      p2
        .then(res => console.log(res))
        .catch(error => console.log(error))
    }
  }
})