 var asyncAdd =(a,b)=>{
   return new Promise((resolve,reject)=>{
     setTimeout(()=>{
       if(typeof a ==='number'&&typeof b === 'number'){
         resolve(a + b);
       }
       else{
         reject('Argument must be number');
       }
     },1500);
   });
 };


 asyncAdd(8,11).then((result)=>{
   console.log(`Result: ${result}`);
   return asyncAdd(result,34);
}).then((result)=>{
   console.log('Result of the addition should be 46',result);
 }).catch((errorMessage)=>{
   console.log(errorMessage);
 });

// var somePromise = new Promise((resolve,reject)=>{
//   setTimeout(()=>{
//       //resolve('Hey It worked!');
//       reject('Unable to fulfill promise');
//   },2500);
// });
//
// somePromise.then((message)=>{
//   console.log('Success: ',message);
// },(errorMessage)=>{
//   console.log('Error:',errorMessage);
// });
