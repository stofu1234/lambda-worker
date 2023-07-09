export default class LambdaWorker {
  constructor(lambdaScript) {
    const workerScript = `
      self.addEventListener('message', function(e) {

        const lambdaScript = ${lambdaScript.toString()};
        
        let ret = null;
        try {
          ret = lambdaScript(...(e.data));
        } catch(e) {
          ret = e;
        }

        //処理結果を送信
        self.postMessage(ret);
      });
    `;
    
    // WebWorker初期化
    const workerBlob = new Blob([workerScript], { type: 'text/plain' });
    const workerUrl = URL.createObjectURL(workerBlob);
    this.worker = new Worker(workerUrl);
    
    // 処理結果、受信イベント
    const parent = this;
    this.worker.addEventListener('message', function(e) {
      parent.returnPromise = new Promise((resolve, reject) => {
        if(e.data instanceof Error) {
          reject(e.data);
        } else {
          resolve(e.data);
        }
      });
    });
  }
  
  postMessage = (...postData) => {
    this.worker.postMessage(postData);
  }
}

