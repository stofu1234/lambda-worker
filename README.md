# lambda-worker
A wrapper library that can easily call WebWorker with Lambda as an argument
## Getting Started
#### 1. install this library
```
# npm i lambda-worker
```
#### 2. import this library
```
# import LambdaWorker from 'LambdaWorker';
```
#### 3. run ssample code in browser
```
# lambdaWorker = new LambdaWorker((a) => { return a*a; });
# lambdaWorker.postMessage(2);
# await lambdaWorker.returnPromise;
=> 4
# lambdaWorker = new LambdaWorker((a) => { throw new Error('test error!') });
# lambdaWorker.postMessage(2);
=> VM**:** Uncaught (in promise) Error: test error!
```
