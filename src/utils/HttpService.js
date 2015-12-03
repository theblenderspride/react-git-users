
class HttpService {

  constructor() {
     this.httpRequest = new XMLHttpRequest();
  }

  send(config) {
    this.httpRequest.onreadystatechange = function() {
        if (this.httpRequest.readyState == XMLHttpRequest.DONE ) {
           if(this.httpRequest.status == 200){
               config.success(JSON.parse(this.httpRequest.responseText));
           }
           else if(this.httpRequest.status == 400) {
             config.error(this.httpRequest, this.httpRequest.status);
             console.log('There was an error 400')
           }
           else {
               console.log('something else other than 200 was returned')
           }
        }
    }

    this.httpRequest.onreadystatechange = this.httpRequest.onreadystatechange.bind(this);
    this.httpRequest.open(config.method, config.url, config.success);
    this.httpRequest.send();
  }

  get(config) {
    config.method = "GET";
    this.send(config);
  }

  post(config) {
    config.method = "POST";
    this.send(config);
  }


}

export default HttpService;
