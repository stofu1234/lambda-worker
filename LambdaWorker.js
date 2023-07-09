export default class LambdaWorker {
  worker = null;
  returnPromise = null;

  constructor(lambdaScript) {
    const workerScript = `
      self.addEventListener('message', function(e) {

        const lambdaScript = ${lambdaScript.toString()};

        const ret = lambdaScript(...(e.data));

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
        resolve(e.data);
      });
    });
  }
  
  postMessage = (...postData) => {
    this.worker.postMessage(postData);
  }
}
