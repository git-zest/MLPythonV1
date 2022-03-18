var jenkins = require('jenkins')({ baseUrl: 'http://'+'Devops'+':'+'Test123'+'@'+'ec2-3-141-166-202.us-east-2.compute.amazonaws.com:8080', crumbIssuer: true });
jenkins.info(function(err, data1) {
  if(err){
  console.log(err);
  }
  else{
    console.log(data1);
  }
})
