var express=require('express');
var app=express();
var session=require('express-session')
var bodyparser=require("body-parser");
var express = require('express');
const multer = require('multer');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var fileSystem = require('fs');
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var MongoClient = require('mongodb').MongoClient;
var logger = require('logger').createLogger('development.log'); // logs to a file
//var multer  = require('multer')
//var schedule = require('node-schedule');
//MongoClient.connect("mongodb://localhost:27017/datacreate");
var db=mongoose.connection
app.use(bodyparser.json());
ITTAModels=require('./Models/ITTAModels');
LoginModels=require('./Models/LoginModels');
fileuploader=require('./Models/Fileupload')
usermgtfeeder=require('./Models/usermgtModel')
drivercap=require('./Models/drivercap')
genericfunction=require('./Models/genericfn')
loadingdb=require('./Models/loadingdb')
testdata=require('./Models/Testdata')
regression=require('./Models/regression')
bvf=require('./Models/bvf')
testdatfeeder=require('./Models/testdatafeeder')
app.use(session({secret:"kjhdsfdhguhdsghsdhgsdhgideshigfhsdfihfg",resave:false}))
app.use(express.static(__dirname+"/Login/HTML"))
var expressfilename=__dirname;
var CryptoJS=require('crypto-js');
/////////////////////////////////////////////////////////////////////////////////
var jenkinsjobname1;
var jenkinsdataname1;
var jenkinsurl1;
var jenkinsdatanumber;
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////


app.post('/api/uploadreport', function(req, res) {
  var foldername=req.query.foldernme;
  console.log(foldername);
  var storage = multer.diskStorage({ //multers disk storage settings
      destination: function (req, file, cb) {
          cb(null, './public/uploads/'+foldername)
      },
      filename: function (req, file, cb) {
          // console.log(file);
          var datetimestamp = Date.now();
          cb(null, file.originalname.split('.')[0] + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
      }
  });

  var uploadSingle = multer({ //multer settings
          storage: storage
      }).single('');



    uploadSingle(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
         res.json(req.file);
    })
});

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
app.post('/runjenkinsregression',function(req,res){
  var jenkinsurl =req.body[0];
  var jenkinsjobname=req.body[1];
  var jenkinsjobparam=req.body[2];
  jenkinsjobname1=jenkinsjobname;
  jenkinsurl1=jenkinsurl;
  console.log(jenkinsurl);
  var str_baseurl=jenkinsurl
  logger.info('Jenkins build is started '+jenkinsjobname);
  var jenkins = require('jenkins')({ baseUrl: str_baseurl, crumbIssuer: true });
  if(jenkinsjobparam===null){
    jenkins.job.build('jenkinsjobname', function(err, data) {
      if (err) throw err;
      logger.info('Jenkins build number is '+data);
      console.log('queue item number', data);
      //res.send(data);
    });
  }else{
    jenkins.job.build(jenkinsjobname, function(err, data) {
      if (err) throw err;
      //res.send(data);
      jenkins.job.get(jenkinsjobname, function(err, data1) {
      if (err) throw err;
        //console.log('job', data1.lastBuild.number+1);
        logger.info('Jenkins build number is '+data1.lastBuild.number+1);
        jenkinsdatanumber=data1.lastBuild.number+1;
        jenkinsdataname1=jenkinsdatanumber;
      });
      var sleep = require('thread-sleep');
      var res = sleep(3000);
      let i = 0;
      logger.info('Jenkins executing the task '+jenkinsjobname +' '+ jenkinsdataname1);
       setInterval(vary, 1500);
       logger.info('Jenkins build is completed '+jenkinsjobname +' '+ jenkinsdataname1);
    });
  }
})
var count = 0 , i = 5;
var textvl='';
var vary = function intervalFunc() {
    //console.log(jenkinsdataname1);
    //console.log(jenkinsjobname1);
    count++;
    //console.log(count);

    var jenkins = require('jenkins')({ baseUrl: jenkinsurl1, crumbIssuer: true });
    var log = jenkins.build.logStream(jenkinsjobname1, jenkinsdataname1);
    log.on('data', function(text) {
      //process.stdout.write(text);
      textvl=text;
    });
    log.on('error', function(err) {
      //  console.log('error', err);Finished:
    });
    //console.log(textvl);
    if(textvl.includes('Finished')) {
      clearInterval(this);
    }
}

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
app.post('/logmessage',function(req,res){
fs.readFile('development.log', 'utf8', function (err,data) {
if (err) {
  return console.log(err);
}
//console.log(data);
res.send(data);
});
});
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
app.post('/logmessage',function(req,res){


});

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
app.post('/api/genericfunctioncreate',function(req,res){

  //console.log(req.query.parm1);
  var dbname =req.query.parm1;
  var obj_type =req.query.parm2;
  var obj_parameter =req.query.parm3;
  var obj_tag =req.query.parm4;
  var object_locatordescrip=req.query.parm5;
  var object_fninsertvl=req.query.parm6;
  console.log(object_fninsertvl);
 //regressionname,jenkinsurl,jenkinsjobname,jenkinsjobparam,status,buildtool
  var testdatasearch=genericfunction.addgenericfunction(dbname,obj_type,obj_parameter,obj_tag,object_locatordescrip,object_fninsertvl,function(doc){
      res.send(doc);
  });
});


app.post('/api/searchoncollection',function(req,res){
  var collectionname = req.body[0];
  console.log(collectionname);
  MongoClient.connect("mongodb://localhost:27017/", function(err, db) {
  if (err) throw err;
  var dbo = db.db("transaction");
  dbo.collection(collectionname).find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
    res.send(result)
  });
});
})

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

app.get('/ObjectsDB',function(req,res){
       res.setHeader('Cache-Control', 'no-cache');
	     res.sendFile(__dirname+'/Login/HTML/index.html');
});
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

app.post('/api/searchloadingindicator',function(req,res){
  //console.log(req);
  var testdatasearch=loadingdb.searchloadingfunction('',function(modelslogin){
      res.send(modelslogin);
  });
});
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

app.post('/api/searchcollection',function(req,res){
  MongoClient.connect("mongodb://localhost:27017/").then((client) => {
   const connect = client.db("transaction")
   connect.listCollections().toArray(function(err, names) {
       if(!err) {
           //cosole.log(names)
           res.send(names)
       }
      });
    }).catch((err) => {
       // Printing the error message
       console.log(err.Message);
    })
})
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

app.post('/api/runmvnscript',function(req,res){
        var screen_name = req.body[0];
        console.log(screen_name);
        const python = require('child_process').spawn('C:/Tool/apache-maven-3.8.2-bin/apache-maven-3.8.2/bin/mvn.cmd', ['test', '-f', screen_name]);
        python.stdout.on('data', function (data) {
         console.log('wait for the script to execute................');
         dataToSend = data.toString();
        });
      // in close event we are sure that stream from child process is closed
        python.on('close', (code) => {
          console.log(`child process close all stdio with code ${code}`);
          // send data to browser
          res.send(dataToSend)
        });
});

app.get('/api/returndrivercap',function(req,res){
        //console.log(req);
        var driversessionid = req.query.parm1;
        var driversessionurl = req.query.parm2;
        var testdatasearch=drivercap.addgenericfunction(driversessionid,driversessionurl,function(models){
            res.send(models);
        });
        //res.send('success')
})
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

app.post('/api/runmlmodel',function(req,res){
  //console.log(req);
  var screen_name = req.body[0];
  var url_name = req.body[1];
  var inputfun = req.body[2];
  var existscreennamefun = req.body[3];
  var runindicator = req.body[4];
  console.log(existscreennamefun);
  console.log(screen_name);
  console.log(runindicator);
  if(runindicator=='nonscripts'){
  if(inputfun){
   const python = require('child_process').spawn('C:/Users/Deva/AppData/Local/Programs/Python/Python36/python.exe', ['pythonSelenium_ML_V1/seleniumenvironment.py',screen_name,url_name, existscreennamefun]);
   python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    dataToSend = data.toString();
   });

 // in close event we are sure that stream from child process is closed
   python.on('close', (code) => {
     console.log(`child process close all stdio with code ${code}`);
     // send data to browser
     res.send(dataToSend)
   });
   }
  }
if(runindicator=='scripts'){
  var testdatasearch=drivercap.searchdrivercap('',function(models){
        //res.send(models);
        console.log(models);
        url_name=models[0].driversessionurl
        sessionid=models[0].driversessionid
        console.log(models[0].driversessionid);
  if(inputfun){
   const python = require('child_process').spawn('C:/Users/Deva/AppData/Local/Programs/Python/Python36/python.exe', ['pythonSelenium_ML_V1/seleniumenvironment_Existing.py',screen_name ,url_name, existscreennamefun, sessionid]);
   python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    dataToSend = data.toString();
   });

 // in close event we are sure that stream from child process is closed
   python.on('close', (code) => {
     console.log(`child process close all stdio with code ${code}`);
     // send data to browser
     res.send('dataToSend')
   });
   }
  });
}
});



app.post('/api/viewgenericfunction',function(req,res){
  var testdatasearch=genericfunction.searchgenericfunction('',function(docs){
    res.send(docs);
  });
});


app.post('/api/deletegenericfunction',function(req,res){
  var delregressionid =req.body[0];
  var deleteregression =genericfunction.deletegenericfunction(delregressionid,function(doc){
    res.send(doc);
  });
});




/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

app.post('/addbvfjob',function(req,res){
  var scenario =req.body[0];
  var username =req.body[1];
  var password =req.body[2];
  var bpaccnumber =req.body[3];
  console.log(scenario);
 //regressionname,jenkinsurl,jenkinsjobname,jenkinsjobparam,status,buildtool
  var testdatasearch=bvf.addbvf(scenario,username,password,bpaccnumber,function(doc){
      res.send(doc);
  });
});
/////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

app.post('/viewbvfjob',function(req,res){
  var testdatasearch=bvf.searchbvf('',function(docs){
      res.send(docs);
  });
});

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

app.post('/uploadregression',function(req,res){



})

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

app.post('/downloadregressionreport',function(req,res){
var jenkinsjobname=req.body[0];
const testFolder = './public/uploads/'+jenkinsjobname;
var folderdata = [];
var filefound=false;
console.log(testFolder);
fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    //console.log(file);
    var obj = { foldername: file,folderpath: jenkinsjobname};
    folderdata.push(obj);
    //console.log(obj);
  });
  //console.log(folderdata);
  res.send(folderdata);
});
})
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
app.get('/downloadregreport/:filename/:foldername',function(req,res){
  var filename=req.params.filename;
  console.log(filename);
  var foldername=req.params.foldername;
  var fullfilename='./public/uploads/'+foldername+'/'+filename;
  console.log(fullfilename);
  res.sendFile(path.join(__dirname, '../public/uploads/'+foldername, filename));
  res.sendFile(fullfilename); // Set disposition and send it.
})

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
app.post('/runregression',function(req,res){

  var jenkinsurl=req.body[0];
  var jenkinsjobname=req.body[1];
  var jenkinsjobparam=req.body[2];
  console.log(jenkinsurl);
  console.log(jenkinsjobname);
  console.log(jenkinsjobparam);

})
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

app.post('/usermgtsearch',function(req,res){
  var environment =req.body[0];
  var testdatasearch=usermgtfeeder.searchusermgtdata(environment,function(doc){
      //console.log(doc);
      res.send(doc);
  });
});


app.get('/usermgtpassword/:password',function(req,res){
  var hashcodepassword=req.params.password;
  var bytes  = CryptoJS.AES.decrypt(hashcodepassword, 'secret key 123');
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  //var responsepassword={"password":originalText};
  res.send(originalText);
})


app.get('/usermgtgetusername/:portfolio/:environment',function(req,res){
  var str_portfolio=req.params.portfolio;
  var str_environment=req.params.environment;
  var testdatasearch=usermgtfeeder.srchusermgtdata(str_portfolio,str_environment,function(doc){
    res.json(doc);
  });
})

app.get('/usermgtgetbpmuser/:bpmusername/:environment',function(req,res){
  var str_bpmusername=req.params.bpmusername;
  var str_environment=req.params.environment;
  var testdatasearch=usermgtfeeder.srchbpmusermgtdata(str_bpmusername,str_environment,function(doc){
    res.json(doc);
  });
})

app.get('/usermgtupdatedata/:username/:environment',function(req,res){
  var str_username=req.params.username;
  var str_environment=req.params.environment;
  var testdatasearch=usermgtfeeder.updtusermgtdata(str_username,str_environment,function(doc){
    res.send(doc);
  });
})

app.get('/usermgtremovedata/:strusername/:environment',function(req,res){
  var str_username=req.params.strusername;
  var str_environment=req.params.environment;
  var testdatasearch=usermgtfeeder.rmindicatorusermgtdata(str_username,str_environment,function(doc){
    res.send(doc);
  });
})


app.post('/usermgtcreate',function(req,res){
  var username =req.body[0];
  var password =req.body[1];
  var channel =req.body[2];
  var environment =req.body[3];
  var indicator =req.body[4];
  var comments =req.body[6];
  var portfolio =req.body[5];
  var usermgtfeed=usermgtfeeder.createusermgt(username,password,channel,environment,indicator,portfolio,comments,function(doc1){
      res.send(doc1);
  });
})

app.post('/usermgtdelete',function(req,res){
  var id =req.body[0];
  console.log(id);
  var usermgtfeed=usermgtfeeder.deletetestcase(id,function(doc1){
      res.send(doc1);
  });
})



app.get('/clearfiles',function(req,res){
  var testFolder = __dirname+'/TestScenario/';
  fs.readdir(testFolder, (err, files) => {
  if (err) throw err;
  var filesremovedsuccessfully=0;
  var filesremovedunsuccessfully=0;
  for (const file of files) {
    fs.unlink(path.join(testFolder, file), err => {
      if (err){
        filesremovedunsuccessfully=filesremovedunsuccessfully+1;
      } else{
        filesremovedsuccessfully=filesremovedsuccessfully+1;
      }
    });
  }
  //console.log(filesremovedunsuccessfully+'_'+filesremovedsuccessfully);
  res.send(filesremovedunsuccessfully+'_'+filesremovedsuccessfully);
});
});


app.post('/testdatasearch',function(req,res){
  var functionality =req.body[0];
  //console.log(functionality);
  var testdatasearch=testdata.searchtestdata(functionality,function(doc){
      //console.log(doc);
      res.send(doc);
  });
});

app.get('/Livereporting',function(req,res){
  if(req.session.user!=null){
       res.setHeader('Cache-Control', 'no-cache');
	     res.sendFile(__dirname+'/Login/HTML/index.html');
	 }else{
      res.redirect('/');
   }
});



app.get('/Testdata',function(req,res){
  if(req.session.user!=null){
       res.setHeader('Cache-Control', 'no-cache');
	     res.sendFile(__dirname+'/Login/HTML/index.html');
	 }else{
      res.redirect('/');
   }
});


app.post('/testdataupdate',function(req,res){
  var id=req.body[0];
  var url=req.body[1];
  var username=req.body[2];
  var password=req.body[3];
  var customernumber=req.body[4];
  var product=req.body[5];
  var pricingoption=req.body[6];
  var odlimit=req.body[7];
  var status=req.body[8];
  var runindicator=req.body[9];
  var functionality=req.body[10];
  var productid=req.body[10];
  var manufacturingid=req.body[11];
  var excel=req.body[12];
  var testdatafeed=testdata.updatetestdata(id,url,username,password,customernumber,product,pricingoption,odlimit,status,runindicator,functionality,productid,manufacturingid,excel,function(doc1){
      res.send(doc1);
  });
});


app.post('/transactionfeeder',function(req,res){
  var transactiondescription=req.body[0];
  console.log(transactiondescription);
  var transactioncode=req.body[1];
  var accountnumber=req.body[2];
  var amount=req.body[3]
  var medium=req.body[4];
  var sendingapplication=req.body[5];
  var testdatafeed=testdatfeeder.createtransaction(transactiondescription,transactioncode,accountnumber,amount,medium,sendingapplication,function(doc1){
      res.send(doc1);
  });
});

app.post('/testdatafeeder',function(req,res){
    var url=req.body[0];
    var username=req.body[1];
    var password=req.body[2];
    var customernumber=req.body[3];
    var product=req.body[4];
    var pricingoption=req.body[5];
    var odlimit=req.body[6];
    var status=req.body[7];
    var runindicator=req.body[8];
    var functionality=req.body[9];
    var productid=req.body[10];
    var manufacturingid=req.body[11];
    var excel=req.body[12];
  if(functionality=='Creditscenarios'){
    var testdatafeed=testdata.createtestdata(url,username,password,customernumber,product,pricingoption,odlimit,status,runindicator,functionality,function(doc1){
        res.send(doc1);
    });
  }else if(functionality=='SAPBS'){
    var testdatafeed=testdata.createtestdataBS(productid,manufacturingid,customernumber,excel,runindicator,functionality,function(doc1){
        res.send(doc1);
    });
  }
});



app.post('/deltransactiondata',function(req,res){
    var id=req.body[0];

    var deltransactiondata=testdatfeeder.deletetestcase(id,function(doc1){
        res.send(doc1);
    });
});



app.post('/deltestdata',function(req,res){
    var id=req.body[0];

    var deltestdata=testdata.deletetestcase(id,function(doc1){
        res.send(doc1);
    });
});

app.post('/uniqueepicname',function(req,res){
    var uniqueepicid=req.body[0];
    var uniqueepic=AddBatch.searchbatchname(uniqueepicid,function(doc1){
      res.send(doc1);
    });
});
app.post('/displayfiles',function(req,res){

  var fileupl=fileuploader.filesinserver('',function(doc1){
    //console.log("file send to front end");
    //console.log(doc1);
    //console.log(doc1);
    res.send(doc1);
  });


	////console.log(fl[i]);
});

app.post('/searchtransactiondata',function(req,res){

  var fileupl=testdatfeeder.searchtestdata('',function(doc1){
    //console.log("file send to front end");
    //console.log(doc1);
    //console.log(doc1);
    res.send(doc1);
  });


	////console.log(fl[i]);
});


app.get('/downloadfile/:filevl(*)',function(req,res,next){
  var testFolder = __dirname+'\\TestScenario\\';
          var filevl1 = req.params.filevl;
        //var filenew = testFolder + req.query.param1;
        //console.log(testFolder+filevl1);
        res.send(testFolder+filevl1);
        //res.sendFile(filenew);
});

app.get('/SwiftMessageSystem',function(req,res){
	if(req.session.user!=null){
       res.setHeader('Cache-Control', 'no-cache');
	     res.sendFile(__dirname+'/Login/HTML/index.html');
	 }else{
      res.redirect('/');
   }
});

app.post('/batchfilecreator',function(req,res){
  if(req.session.user!=null){
	  //console.log(req.body[1]);
    if(req.body[0]==='SSVS_Collections'){
       var account=req.body[1];
       var n=0;
       var body='';
       var totalamount=0;
       var footer2='';
       var datefld=req.body[2];
       var datefldnw=req.body[2].toString().substr(2, 6);
       var header='SB'+datefld+'SAP CLCTN SSVS EA3A\n';
       for(i=0;i<account.length;i++){
         var accountnumber=account[i].accountnumber
         var amountfld=account[i].amount
         var amountf=account[i].amount
         //console.log(accountnumber.length);
         for(j=1;j<14;j++){
           if(accountnumber.length==13){

           }else{
             accountnumber='0'+accountnumber;
          }
        }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          for(jd=1;jd<16;jd++){
            if(amountfld.length==15){

            }else{
              amountfld='0'+amountfld;
           }
         }
         totalamount=parseInt(totalamount)+parseInt(amountf);
         if(i==0){
           body=header+'SD0010000000000D001805'+accountnumber+'MTR                                           '+amountfld+'DEV1 CLCTN ACS SREGN '+datefldnw+'   N\n';
         }else{
           body=body+'SD0010000000000D001805'+accountnumber+'MTR                                           '+amountfld+'DEV1 CLCTN ACS SREGN '+datefldnw+'   N\n'
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
         ////console.log(amountfld);

     }
     var footer =body+'SC001SAP TESTing                   C0002050000330074091DEV1 CLCTN SAP TEST1\n'
     for(d=1;d<31;d++){
       if(totalamount.length==30){

       }else{
         totalamount='0'+totalamount;
      }
    }
	 }
   footer2=footer+'ST00000000000005001'+totalamount

 }

 else if(req.body[0]==='SSVS_Payments'){
    var account=req.body[1];
    var n=0;
    var body='';
    var totalamount=0;
    var footer2='';
    var datefld=req.body[2];
    var datefldnw=req.body[2].toString().substr(2, 6);
    var header='SB'+datefld+'SAP PYMNT  SSVS EA3A  \n';
    for(i=0;i<account.length;i++){
      var accountnumber=account[i].accountnumber
      var amountfld=account[i].amount
      var amountf=account[i].amount
      //console.log(accountnumber.length);
      for(j=1;j<14;j++){
        if(accountnumber.length==13){

        }else{
          accountnumber='0'+accountnumber;
       }
     }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
       for(jd=1;jd<16;jd++){
         if(amountfld.length==15){

         }else{
           amountfld='0'+amountfld;
        }
      }
      totalamount=parseInt(totalamount)+parseInt(amountf);
      if(i==0){
        body=header+'SD0010000000000C001805'+accountnumber+'MTR                                           '+amountfld+' ETB SREGN  '+datefldnw+'            N\n';
      }else{
        body=body+'SD0010000000000C001805'+accountnumber+'MTR                                           '+amountfld+' ETB SREGN  '+datefldnw+'            N\n'
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////console.log(amountfld);

  }
  var footer =body+'SC001SAP TESTing                   D0002050000000394122SAP1 TEST PYMNT1\n'
  for(d=1;d<31;d++){
    if(totalamount.length==30){

    }else{
      totalamount='0'+totalamount;
   }
 }
}
footer2=footer+'ST00000000000005001'+totalamount

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////SDPS J///////////////////////////////////////////////////////

else if(req.body[0]==='SDPS_J_Payments'){
   var account=req.body[1];
   var n=0;
   var body='';
   var totalamount=0;
   var footer2='';
   var datefld=req.body[2];
   var datefldnw=req.body[2].toString().substr(2, 6);
   var header='*SDP9GENERAL PETROLEUM INSTALL               '+datefld+'Y        SDPS J SAP     +810         01LIVE\n';
   for(i=0;i<account.length;i++){
     var accountnumber=account[i].accountnumber
     var amountfld=account[i].amount
     var amountf=account[i].amount
     //console.log(accountnumber.length);
     for(j=1;j<20;j++){
       if(accountnumber.length==19){

       }else{
         accountnumber='0'+accountnumber;
      }
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      for(jd=1;jd<12;jd++){
        if(amountfld.length==11){

        }else{
          amountfld='0'+amountfld;
       }
     }
     totalamount=parseInt(totalamount)+parseInt(amountf);
     if(i==0){
       body=header+'2SDP9005841SS00001'+accountnumber+' 1'+amountfld+'  SDPS ETB REF     2          LGCY1SD J'+datefldnw+'\n';
     }else{
       body=body+'2SDP9005841SS00001'+accountnumber+' 1'+amountfld+'  SDPS ETB REF     2          LGCY1SD J'+datefldnw+'\n'
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////console.log(amountfld);

 }
 var footer =body;
 for(d=1;d<14;d++){
   if(totalamount.length==13){

   }else{
     totalamount='0'+totalamount;
  }
}
}
footer2=footer+'2SDP9T                              '+totalamount

}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////SDPS G///////////////////////////////////////////////////////

else if(req.body[0]==='SDPS_G_Payments'){
   var account=req.body[1];
   var n=0;
   var body='';
   var totalamount=0;
   var footer2='';
   var datefld=req.body[2];
   var datefldnw=req.body[2].toString().substr(2, 6);
   var header='*SD13GENERAL PETROLEUM INSTALL               '+datefld+'Y        SDPS G SAP     +810         01LIVE\n';
   for(i=0;i<account.length;i++){
     var accountnumber=account[i].accountnumber
     var amountfld=account[i].amount
     var amountf=account[i].amount
     //console.log(accountnumber.length);
     for(j=1;j<20;j++){
       if(accountnumber.length==19){

       }else{
         accountnumber='0'+accountnumber;
      }
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      for(jd=1;jd<12;jd++){
        if(amountfld.length==11){

        }else{
          amountfld='0'+amountfld;
       }
     }
     totalamount=parseInt(totalamount)+parseInt(amountf);
     if(i==0){
       body=header+'2SD13005841SS00001'+accountnumber+' 1'+amountfld+'  SDPS regrsn test 1          BPASREGNG'+datefldnw+'\n';
     }else{
       body=body+'2SD13005841SS00001'+accountnumber+' 1'+amountfld+'  SDPS regrsn test 1          BPASREGNG'+datefldnw+'\n'
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////console.log(amountfld);

 }
 var footer =body;
 for(d=1;d<14;d++){
   if(totalamount.length==13){

   }else{
     totalamount='0'+totalamount;
  }
}
}
footer2=footer+'2SD13T                              '+totalamount

}





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////SDPS G///////////////////////////////////////////////////////

else if(req.body[0]==='SDPS_F_Payments'){
   var account=req.body[1];
   var n=0;
   var body='';
   var totalamount=0;
   var footer2='';
   var datefld=req.body[2];
   var datefldnw=req.body[2].toString().substr(2, 6);
   var header='*SD10GENERAL PETROLEUM INSTALL               '+datefld+'Y        SD F F SAP     +810         01LIVE\n';
   for(i=0;i<account.length;i++){
     var accountnumber=account[i].accountnumber
     var amountfld=account[i].amount
     var amountf=account[i].amount
     //console.log(accountnumber.length);
     for(j=1;j<20;j++){
       if(accountnumber.length==19){

       }else{
         accountnumber='0'+accountnumber;
      }
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      for(jd=1;jd<12;jd++){
        if(amountfld.length==11){

        }else{
          amountfld='0'+amountfld;
       }
     }
     totalamount=parseInt(totalamount)+parseInt(amountf);
     if(i==0){
       body=header+'2SD10005841SS00001'+accountnumber+' 1'+amountfld+'  SD F Regrsn test 2          SUMONEACF'+datefldnw+'\n';
     }else{
       body=body+'2SD10005841SS00001'+accountnumber+' 1'+amountfld+'  SD F Regrsn test 2          SUMONEACF'+datefldnw+'\n'
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////console.log(amountfld);

 }
 var footer =body;
 for(d=1;d<14;d++){
   if(totalamount.length==13){

   }else{
     totalamount='0'+totalamount;
  }
}
}
footer2=footer+'2SD10T                              '+totalamount

}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////Naedo Collection///////////////////////////////////////////////////////

else if(req.body[0]==='NAEDO'){
   var account=req.body[1];
   var n=0;
   var body='';
   var totalamount=0;
   var totalacctnumber=0;
   var footer2='';
   var datefld=req.body[2];
   var datefldnw=req.body[2].toString().substr(2, 6);
   var header='021001000000005025002'+datefldnw+datefldnw+'1000018000180ADO\n'+'045025'+datefldnw+datefldnw+datefldnw+datefldnw+'0000010240NADREQ\n';
   for(i=0;i<account.length;i++){
     var accountnumber=account[i].accountnumber
     var amountfld=account[i].amount
     var amountf=account[i].amount
     //console.log(accountnumber.length);
     for(j=1;j<12;j++){
       if(accountnumber.length==11){

       }else{
         accountnumber='0'+accountnumber;
      }
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      for(jd=1;jd<12;jd++){
        if(amountfld.length==11){

        }else{
          amountfld='0'+amountfld;
       }
     }
     totalacctnumber=parseInt(totalacctnumber)+parseInt(accountnumber);
     uqfld=i;
     for(uq=1;uq<9;uq++){
       if(uqfld.length==8){

       }else{
         uqfld='0'+uqfld;
      }
     }

     for(uq=1;uq<13;uq++){
       if(totalacctnumber.length==12){

       }else{
         totalacctnumber='0'+totalacctnumber;
      }
     }


     if(i==0){
       body=header+'55000205000003941225025000001051001'+accountnumber+'1'+amountfld+datefldnw+'130   BUS ONLINE'+uqfld+datefldnw+datefldnw+' ACLTREGN                     00000000000000000000                13\n';
     }else{
       body=body+'55000205000003941225025000001051001'+accountnumber+'1'+amountfld+datefldnw+'130   BUS ONLINE'+uqfld+datefldnw+datefldnw+' ACLTREGN                     00000000000000000000                13\n';
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////console.log(amountfld);

 }


}
 var footer =body+'92502500000100000'+datefldnw+datefldnw+'1000001000001000001000000000040000000200005'+totalacctnumber+'\n';
footer2=footer+'941001000000005025002'+datefldnw+datefldnw+'1000118000180ADO       000000000039000001';

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////SDPS G///////////////////////////////////////////////////////

else if(req.body[0]==='EFTS_Payments'){
   var account=req.body[1];
   var n=0;
   var body='';
   var totalamount=0;
   var footer2='';
   var datefld=req.body[2];
   var datefldnw=req.body[2].toString().substr(2, 6);
   var header='*KOSIENDEAVOUR FINANCE PTY LTD               '+datefld+'Y        DevBR3         +610         01LIVE\n';
   for(i=0;i<account.length;i++){
     var accountnumber=account[i].accountnumber
     var amountfld=account[i].amount
     var amountf=account[i].amount
     //console.log(accountnumber.length);
     for(j=1;j<20;j++){
       if(accountnumber.length==19){

       }else{
         accountnumber='0'+accountnumber;
      }
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      for(jd=1;jd<12;jd++){
        if(amountfld.length==11){

        }else{
          amountfld='0'+amountfld;
       }
     }
     totalamount=parseInt(totalamount)+parseInt(amountf);
     if(i==0){
       body=header+'2KOSI004605SS00001'+accountnumber+' 1'+amountfld+'       2ACB                   ACLTREGRN'+datefldnw+'\n';
     }else{
       body=body+'2KOSI004605SS00001'+accountnumber+' 1'+amountfld+'       2ACB                   ACLTREGRN'+datefldnw+'\n'
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////console.log(amountfld);

 }
 var footer =body;
 for(d=1;d<14;d++){
   if(totalamount.length==13){

   }else{
     totalamount='0'+totalamount;
  }
}
}
footer2=footer+'2KOSIT                              '+totalamount

}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////EFTS_Collections///////////////////////////////////////////////////////

else if(req.body[0]==='EFTS_Collections'){
   var account=req.body[1];
   var n=0;
   var body='';
   var totalamount=0;
   var totalaccount=0;
   var footer2='';
   var datefld=req.body[2];
   var datefldnw=req.body[2].toString().substr(2, 6);
   var header='*KAAAAFRICAN LIFE                            '+datefld+'Y        06MAY          -210         01LIVE\n';
   for(i=0;i<account.length;i++){
     var accountnumber=account[i].accountnumber
     var amountfld=account[i].amount
     var amountf=account[i].amount
     //console.log(accountnumber.length);
     for(j=1;j<20;j++){
       if(accountnumber.length==19){

       }else{
         accountnumber='0'+accountnumber;
      }
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      for(jd=1;jd<12;jd++){
        if(amountfld.length==11){

        }else{
          amountfld='0'+amountfld;
       }
     }
     totalamount=parseInt(totalamount)+parseInt(amountf);

     if(i==0){
       body=header+'2KAAA004605SS00001'+accountnumber+' 1'+amountfld+'  BUILD4eftpay                ACLTREGNG'+datefldnw+'\n';
     }else{
       body=body+'2KAAA004605SS00001'+accountnumber+' 1'+amountfld+'  BUILD4eftpay                ACLTREGNG'+datefldnw+'\n'
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////console.log(amountfld);

 }
 var footer =body;
 for(d=1;d<14;d++){
   if(totalamount.length==13){

   }else{
     totalamount='0'+totalamount;
  }
}
}
footer2=footer+'2KAAAT                              '+totalamount

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////BEFT_Collections///////////////////////////////////////////////////////

else if(req.body[0]==='BEFT_Collections'){
   var account=req.body[1];
   var n=0;
   var body='';
   var totalamount=0;
   var totalaccount=0;
   var footer2='';
   var datefld=req.body[2];
   var datefldnw=req.body[2].toString().substr(2, 6);
   var header='021001000000015012004413'+datefldnw+'0108004418000180MAGTAPE\n'+'04713613'+datefldnw+datefldnw+datefldnw+'01080000010159ONE DAY\n';
   for(i=0;i<account.length;i++){
     var accountnumber=account[i].accountnumber
     var amountfld=account[i].amount
     var amountf=account[i].amount
     //console.log(accountnumber.length);
     for(j=1;j<12;j++){
       if(accountnumber.length==11){

       }else{
         accountnumber='0'+accountnumber;
      }
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      for(jd=1;jd<12;jd++){
        if(amountfld.length==11){

        }else{
          amountfld='0'+amountfld;
       }
     }
     totalamount=parseInt(totalamount)+parseInt(amountf);
     totalaccount=parseInt(totalaccount)+parseInt(accountnumber);
     if(i==0){
       body=header+'50000205000003941227136000002004605'+accountnumber+'1'+amountfld+datefldnw+'210000BUS ONLINE ACSSREGN NT '+datefldnw+'                               00000000000000000000                21\n';
     }else{
       body=body+'50000205000003941227136000002004605'+accountnumber+'1'+amountfld+datefldnw+'210000BUS ONLINE ACSSREGN NT '+datefldnw+'                               00000000000000000000                21\n';
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////console.log(amountfld);

 }

// var footer =body;

}


for(d=1;d<12;d++){
  if(totalamount.length==11){

  }else{
    totalamount='0'+totalamount;
 }
}
body1=body+'52000205000003941227136000006000205000003941221'+totalamount+datefldnw+'210000BUS ONLINE 0824  CLCTN '+datefldnw+'  sap2 ACCOUNT                                         			  21\n';

totalaccount=totalaccount+394122
for(d=1;d<13;d++){
  if(totalaccount.length==12){

  }else{
    totalaccount='0'+totalaccount;
 }
body2=body1+'927136000001000006'+datefldnw+datefldnw+'000006000006000001000000006031000000005995'+totalaccount+'\n';

footer2=body2+'9410010000000171360044'+datefldnw+datefldnw+'00418000180MAGTAPE   000002000004400003';

}
}

////////////////////////////////////////////////////////////////////BEFT_Collections///////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////BEFT_Collections///////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////BEFT_Collections///////////////////////////////////////////////////////


else if(req.body[0]==='BEFT_Payments'){
   var account=req.body[1];
   var n=0;
   var body='';
   var totalamount=0;
   var totalaccount=0;
   var footer2='';
   var datefld=req.body[2];
   var datefldnw=req.body[2].toString().substr(2, 6);
   var header='0210010000000171360044'+datefldnw+datefldnw+'004418000180MAGTAPE\n'+'047136131211'+datefldnw+datefldnw+datefldnw+'0000010159ONE DAY\n';
   for(i=0;i<account.length;i++){
     var accountnumber=account[i].accountnumber
     var amountfld=account[i].amount
     var amountf=account[i].amount
     //console.log(accountnumber.length);
     for(j=1;j<12;j++){
       if(accountnumber.length==11){

       }else{
         accountnumber='0'+accountnumber;
      }
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      for(jd=1;jd<12;jd++){
        if(amountfld.length==11){

        }else{
          amountfld='0'+amountfld;
       }
     }
     totalamount=parseInt(totalamount)+parseInt(amountf);
     totalaccount=parseInt(totalaccount)+parseInt(accountnumber);
     if(i==0){
       body=header+'10000205000003941227136000001004605'+accountnumber+'1'+amountfld+datefldnw+'610000BUS ONLINE ACSSLOCK NT '+datefldnw+'                                00000000000000000000               21\n';
     }else{
       body=body+'10000205000003941227136000001004605'+accountnumber+'1'+amountfld+datefldnw+'610000BUS ONLINE ACSSLOCK NT '+datefldnw+'                                00000000000000000000               21\n';
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ////console.log(amountfld);

 }

// var footer =body;

}


for(d=1;d<12;d++){
  if(totalamount.length==11){

  }else{
    totalamount='0'+totalamount;
 }
}
body1=body+'12000205000003941227136000007000205000003941221'+totalamount+datefldnw+'610000BUS ONLINE AP03OCTD    BEFT   BUSONLINE  sap2 ACCOUNT                                           21\n';

totalaccount=totalaccount+394122
for(d=1;d<13;d++){
  if(totalaccount.length==12){

  }else{
    totalaccount='0'+totalaccount;
 }
body2=body1+'927136000001000003181009'+datefldnw+'000002000002000001000000000015300000000005'+totalaccount+'\n';

footer2=body2+'9410010000000171360044'+datefldnw+datefldnw+'00418000180MAGTAPE   000002000004400003';

}

}


 //console.log(footer2);
 res.send(footer2);

}
else{
  window.location.pathname = '/new'
}
});

function cleanInt(x) {
    x = Number(x);
    return x >= 0 ? Math.floor(x) : Math.ceil(x);
}

app.get('/Batchfile',function(req,res){
	if(req.session.user!=null){
	     res.sendFile(__dirname+'/Login/HTML/index.html');
	 }
   else{
      res.redirect('/');
   }
});

app.get('/Transaction',function(req,res){
  	if(req.session.user!=null){
	     res.sendFile(__dirname+'/Login/HTML/index.html');
     }
     else{
        res.redirect('/');
     }
});

app.get('/Contact',function(req,res){
  if(req.session.user!=null){
       res.sendFile(__dirname+'/Login/HTML/index.html');
   }
   else{
      res.redirect('/');
   }
});

app.get('/Jiraupload',function(req,res){
  if(req.session.user!=null){
       res.sendFile(__dirname+'/Login/HTML/index.html');
   }
   else{
      res.redirect('/');
   }
});

app.get('/Addbatch',function(req,res){
  if(req.session.user!=null){
    res.setHeader('Cache-Control', 'no-cache');
       res.sendFile(__dirname+'/Login/HTML/index.html');
   }
   else{
      res.redirect('/');
   }
});

app.get('/BVf',function(req,res){

  if(req.session.user!=null){
       res.setHeader('Cache-Control', 'no-cache');
	     res.sendFile(__dirname+'/Login/HTML/index.html');
	 }else{
      res.redirect('/');
   }

});


app.post('/logout',function(req,res){
  if(req.session.user!=null){
      req.session.user=null
      //console.log(req.session.user);
      res.setHeader('Cache-Control', 'no-cache');
      res.redirect('/');
  }
  else{
     res.redirect('/');
  }
});


app.post('/swiftmsg',function(req,res){
if(req.session.user!=null){
	var msgtype=req.body[0];
	var RefNum=req.body[1];
	var PostingDate=req.body[2];
	var Accountnum=req.body[3];
	var Currencycode=req.body[4];
	var Amount=req.body[5];
	var FeeAmount=req.body[6];
	var subdropdown=req.body[7];
    var ToAccountnum=req.body[8];

	//console.log( msgtype + subdropdown + ToAccountnum +'  '+ToAccountnum);
	if(msgtype=='ITTA'){
		fs.readFile(__dirname+'\\Swiftmsg\\ITTA.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);
		});
	}
	else if((msgtype=='ITrade')&&(subdropdown=='ITT_MT103')){
		fs.readFile(__dirname+'\\Swiftmsg\\MT103_itrade.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='ITrade')&&(subdropdown=='ExportLC_MT700')){
		fs.readFile(__dirname+'\\Swiftmsg\\MT700_export lc.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='RTGS')&&(subdropdown=='103 Siress')){
		fs.readFile(__dirname+'\\Swiftmsg\\RTGS\\103 Siress.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='RTGS')&&(subdropdown=='103 Siress to Local')){
		fs.readFile(__dirname+'\\Swiftmsg\\RTGS\\103 Siress to Local.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='RTGS')&&(subdropdown=='202 Cover inward')){
		fs.readFile(__dirname+'\\Swiftmsg\\RTGS\\202 Cover inward.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='RTGS')&&(subdropdown=='202 DTROF')){
		fs.readFile(__dirname+'\\Swiftmsg\\RTGS\\202 DTROF.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='RTGS')&&(subdropdown=='103 Atomatically routed to ZAPS')){
		fs.readFile(__dirname+'\\Swiftmsg\\RTGS\\103 Atomatically routed to ZAPS.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='RTGS')&&(subdropdown=='103 Delete')){
		fs.readFile(__dirname+'\\Swiftmsg\\RTGS\\103 Delete.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='RTGS')&&(subdropdown=='202 Manually routed to ZAPS')){
		fs.readFile(__dirname+'\\Swiftmsg\\RTGS\\202 Manually routed to ZAPS.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='RTGS')&&(subdropdown=='103 Routed to AMH')){
		fs.readFile(__dirname+'\\Swiftmsg\\RTGS\\103 Routed to AMH.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='RTGS')&&(subdropdown=='PCH Cancel 900')){
		fs.readFile(__dirname+'\\Swiftmsg\\RTGS\\PCH Cancel 900.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='RTGS')&&(subdropdown=='PCH Cancel910')){
		fs.readFile(__dirname+'\\Swiftmsg\\RTGS\\PCH Cancel 910.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}



	else if((msgtype=='RTGS')&&(subdropdown=='103 50F field Siress')){
		fs.readFile(__dirname+'\\Swiftmsg\\RTGS\\103 50F field Siress.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='RTGS')&&(subdropdown=='103 50K/A field Siress')){
		fs.readFile(__dirname+'\\Swiftmsg\\RTGS\\103 50K_A field Siress.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}

   else if((msgtype=='RTGS')&&(subdropdown=='103 Credit Locks')){
		fs.readFile(__dirname+'\\Swiftmsg\\RTGS\\103 Credit Locks.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='RTGS')&&(subdropdown=='103 Debit Locks')){
		fs.readFile(__dirname+'\\Swiftmsg\\RTGS\\103 Debit Locks.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='RTGS')&&(subdropdown=='202 Inward')){
		fs.readFile(__dirname+'\\Swiftmsg\\RTGS\\202 Inward.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='RTGS')&&(subdropdown=='202 COV/Outward')){
		fs.readFile(__dirname+'\\Swiftmsg\\RTGS\\202 COV_Outward.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}


	else if((msgtype=='ZAPS')&&(subdropdown=='101 Transaction')){
		fs.readFile(__dirname+'\\Swiftmsg\\ZAP Automation\\101 Transaction.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='ZAPS')&&(subdropdown=='102 Multiple credits')){
		fs.readFile(__dirname+'\\Swiftmsg\\ZAP Automation\\102 Multiple credits.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='ZAPS')&&(subdropdown=='103 Cancellation')){
		fs.readFile(__dirname+'\\Swiftmsg\\ZAP Automation\\103 Cancellation.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='ZAPS')&&(subdropdown=='103 Current to local')){
		fs.readFile(__dirname+'\\Swiftmsg\\ZAP Automation\\103 Current to local.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='ZAPS')&&(subdropdown=='103 Debit from Local account')){
		fs.readFile(__dirname+'\\Swiftmsg\\ZAP Automation\\103 Debit from Local account.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='ZAPS')&&(subdropdown=='103 DTROF Return')){
		fs.readFile(__dirname+'\\Swiftmsg\\ZAP Automation\\103 DTROF Return.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='ZAPS')&&(subdropdown=='103 DTROF')){
		fs.readFile(__dirname+'\\Swiftmsg\\ZAP Automation\\103 DTROF.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='ZAPS')&&(subdropdown=='103 Invalid to valid SAP and 103 Beneficiary charge')){
		fs.readFile(__dirname+'\\Swiftmsg\\ZAP Automation\\103 Invalid to valid SAP and 103 Beneficiary charge.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='ZAPS')&&(subdropdown=='103 Shared charge')){
		fs.readFile(__dirname+'\\Swiftmsg\\ZAP Automation\\103 Shared charge.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='ZAPS')&&(subdropdown=='103 Siress to Current')){
		fs.readFile(__dirname+'\\Swiftmsg\\ZAP Automation\\103 Siress to Current.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='ZAPS')&&(subdropdown=='103 Siress to local')){
		fs.readFile(__dirname+'\\Swiftmsg\\ZAP Automation\\103 Siress to local.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='ZAPS')&&(subdropdown=='103 Siress to Vostro')){
		fs.readFile(__dirname+'\\Swiftmsg\\ZAP Automation\\103 Siress to Vostro.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='ZAPS')&&(subdropdown=='103 Vostro to local')){
		fs.readFile(__dirname+'\\Swiftmsg\\ZAP Automation\\103 Vostro to local.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='ZAPS')&&(subdropdown=='103 Vostro to Siress')){
		fs.readFile(__dirname+'\\Swiftmsg\\ZAP Automation\\103 Vostro to Siress.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='ZAPS')&&(subdropdown=='200 Transaction')){
		fs.readFile(__dirname+'\\Swiftmsg\\ZAP Automation\\200 Transaction.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='ZAPS')&&(subdropdown=='202 Cancellation')){
		fs.readFile(__dirname+'\\Swiftmsg\\ZAP Automation\\202 Cancellation.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='ZAPS')&&(subdropdown=='202 CLS Payment')){
		fs.readFile(__dirname+'\\Swiftmsg\\ZAP Automation\\202 CLS Payment.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='ZAPS')&&(subdropdown=='202 Cover inward')){
		fs.readFile(__dirname+'\\Swiftmsg\\ZAP Automation\\202 Cover inward.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);
		});
	}
	else if((msgtype=='ZAPS')&&(subdropdown=='202 Cover outward')){
		fs.readFile(__dirname+'\\Swiftmsg\\ZAP Automation\\202 Cover outward.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='ZAPS')&&(subdropdown=='202 Inward')){
		fs.readFile(__dirname+'\\Swiftmsg\\ZAP Automation\\202 Inward.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='ZAPS')&&(subdropdown=='202 Outward')){
		fs.readFile(__dirname+'\\Swiftmsg\\ZAP Automation\\202 Outward.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='ZAPS')&&(subdropdown=='103 Credit locks our charge')){
		fs.readFile(__dirname+'\\Swiftmsg\\ZAP Automation\\103 Credit locks our charge.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
	else if((msgtype=='ZAPS')&&(subdropdown=='103 Vostro Current Debit locks Overdrafts')){
		fs.readFile(__dirname+'\\Swiftmsg\\ZAP Automation\\103 Vostro Current Debit locks Overdrafts.txt', 'utf8', function(err, data) {
		  if (err) throw err;
		  ////console.log('OK: ' + 'C:\\Users\\c705781\\Documents\\My Received Files\\MT103_itrade.txt');
		  //console.log(data);
		  res.send(data);

		});
	}
}else{
   res.redirect('/');
}


});

app.post('/uniquerefnumber',function(req,res){
		var uniquerefnumber=req.body[0];
		var Postingdate=null;
		var search=ITTAModels.searchmessage(uniquerefnumber,Postingdate,function(doc){
			////console.log(doc);
			res.send(doc)
		});

});





app.post('/Transactionalmessage',function(req,res){
	Username=req.body[0];
	reference=req.body[1];
	Message=req.body[2];
    postingdate=req.body[3];
	Responsefeild=req.body[4];
	var loginvalue=ITTAModels.setmessage(Username,reference,Message,Responsefeild,postingdate,function(modelslogin){
						//console.log(modelslogin);
						if(modelslogin==='Pass'){
							res.send('Pass')
							//res.send('Pass');
						}else if(modelslogin==='DB Fail'){
							res.send('DB Fail');
						}else{
							res.send('Fail');
						}
						////console.log('My Life');
			});
});


app.post('/ITTASearch',function(req,res){
	RefNumber=req.body[0];
	Postingdate=req.body[1];
	//console.log(RefNumber + ' ' + Postingdate);
	var search=ITTAModels.searchmessage(RefNumber,Postingdate,function(doc){
		////console.log(doc);
		res.send(doc)
	});
});


app.post('/Mq',function(req,res){
							Message=req.body[0];
							let childProcess = require('child_process').spawn(
							      'java', ['-jar', 'MQ.jar',Message]
							);
							childProcess.stdout.on('data', function(data) {
							    //console.log(data.toString());
							    res.send(data.toString());
							});
							childProcess.stderr.on('data', function (data) {
							    //console.log(data.toString());
							    res.send('Fail');
							});
});















app.get('/customersearch', function (req,res){

MongoClient.connect("mongodb://localhost:27017/datacreate", function(err, db) {
	var collection = db.collection('logins');
 	collection.find().toArray(function(err, docs){
    //console.log("retrieved records:");
    //console.log(docs);
    db.close();
    res.json(docs);
});
});
});



app.post('/login', function (req,res){
	////console.log(req.body[0])
	var Password=req.body[0];
	var credentials=req.body;
	if(req.body[0]===null){

	}else{
						if(req.body[0]==='Photo#1'){
              req.session.user='Business VF'
							res.send('Pass');
						}
			       else{
							res.send('Fail');
						}
	}
});


app.post('/decryptvalue', function(req,res){
  const Cryptr = require('cryptr');
  const cryptr = new Cryptr('mykey');
    var strvalue=req.body[0];
    //console.log(strvalue);
    var strret=cryptr.decrypt(strvalue)
    res.send(strret)
})

app.post('/encryptvalue', function(req,res){
  const Cryptr = require('cryptr');
  const cryptr = new Cryptr('mykey');
    var strvalue=req.body[0];
    //console.log(strvalue);
    var strret=cryptr.encrypt(strvalue)
    res.send(strret)
})
/////////////////////////////////////////////////////////////////////////////////

app.get('/getdecryptvalue/:encryptedvalues', function(req,res){

  const Cryptr = require('cryptr');
  const cryptr = new Cryptr('mykey');
    var strvalue=req.params.encryptedvalues;
    //console.log(strvalue);
    var strret=cryptr.decrypt(strvalue)
    var jsonval=[{"prkey":strret}]
    console.log(jsonval)
    res.send(jsonval)
})

/////////////////////////////////////////////////////////////////////////////////

app.post('/updatebvfjob',function(req,res){
  var regressionid=req.body[0];
  var scenario =req.body[1];
  var username =req.body[2];
  var password =req.body[3];
  var bpaccnumber =req.body[4];

  var testdatasearch=bvf.updatebvf(regressionid,scenario,username,password,bpaccnumber,function(doc){
    console.log(doc)
    res.send(doc);
});

});

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

app.get('/searchbvfjob/:scenario',function(req,res){
  var scenario=req.params.scenario;
  console.log(scenario)
  var bvfscenario=bvf.searchbvfscript(scenario,function(doc){
    console.log(doc)
    res.send(doc);
});

});

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.post('/deletebvf',function(req,res){
  var delregressionid =req.body[0];
  var deleteregression =bvf.deletebvf(delregressionid,function(doc){
    res.send(doc);
  });
});

app.post('/registration', function (req,res){
	//console.log(req);
	var Username=req.body[0];
	var Password=req.body[1];
	var credentials=req.body;
	if(req.body[0]===null){

	}else{
		try{
			var loginvalue=LoginModels.setLogin(Username,Password,function(models){
						//console.log(models);
						if(models==='Pass'){
							res.send('Pass');
						}else{
							res.send('Fail');
						}
			});

		}
		catch(err){
			res.send('Fail');
		}
	}
});


app.post('/Passwordreset', function (req,res){
	//console.log(req);
	var Username=req.body[0];
	var Password=req.body[1];
	var credentials=req.body;
	if(req.body[0]===null){

	}else{
		try{
			var loginvalue=LoginModels.updateLogin(Username,Password,function(models){
						//console.log(models);
						if(models==='Pass'){
							res.send('Pass');
						}else{
							res.send('Fail');
						}
			});

		}
		catch(err){
			res.send('Fail');
		}
	}
});


app.post('/BRI', function (req,res){
	//console.log(req);
	var Environment=req.body[0];
	var BriNumber=req.body[1];
	var ProductCat=req.body[2];
	var ProductArea=req.body[3];
	if(req.body[0]===null && req.body[1]===null){

	}else{
		var Homepagevalue=homepageModels.GetBri(Environment,BriNumber,ProductCat,ProductArea,function(doc){
			//console.log(doc);
			req.clear;
			res.send(doc);
		});
	}
});




app.post('/AccountArrear', function (req,res){
	//console.log(req);
	var Environment=req.body[0];
	if(req.body[0]===null){
    //////////////////////////////////////////////////////////////////////////////


	}else{
		var Homepagevalue1=AccountArrearModel.GetAccountArrear(Environment,function(doc){
			//console.log(doc);
			res.send(doc);
		});
	}
});




////////////////////////////////////////////////////////////////////////////////////
app.post('/Addbatchvalue', function (req,res){
	////console.log(req);
	var batchname=req.body[0];
  //console.log(req.body[0]);
  //console.log(req.body[1]);
  var batchdate=req.body[1];
	if(req.body[0]===null){

	}else{
    completionindctor='N'
    if(batchdate===null){
       var d=new Date();
       month = '' + (d.getMonth() + 1),
       day = '' + d.getDate(),
       year = d.getFullYear();

      batchdate=year+'-'+month+'-'+day;
      completionindctor='Y'
    }

    //console.log(batchdate);
    var AddBatchvalue=AddBatch.addbatchvl(batchname,batchdate,function(doc){
    //console.log(doc);
    res.send(doc);
    });
  }

});




app.post('/BRItable', function (req,res){
	//console.log(req);
	var lockedvalue=req.body[0];

	if(req.body[0]===null && req.body[1]===null){

	}else{
		var Homepagevalue=homepageModels.Britablelocker(lockedvalue,req.session.user,function(doc){
			//console.log(doc);
			res.send(doc);
		});
	}
});



const multerConfig = {

  //specify diskStorage (another option is memory)
  storage: multer.diskStorage({

    //specify destination
    destination: function(req, file, next){
      next(null, './TestScenario');
    },

    //specify the filename to be unique
    filename: function(req, file, next){
      //console.log(file);
      next(null, file.originalname );
    }
  }),

  // filter out and prevent non-image files.
  fileFilter: function(req, file, next){
        if(!file){
          next();
        }

      // only permit image mimetypes
      const image = file.mimetype.startsWith('');
      if(image){
        //console.log('Excel uploaded');

        next(null, true);
      }else{
        //console.log("file not supported")
        //TODO:  A better message response to user on failure.
        return next();
      }
  }
};




app.post('/uploadfile', multer(multerConfig).single('xlsattachment'),function(req, res){
    //console.log(req);
    res.send('File Uploaded successfully Complete! <a href="/Addbatch">try again</a>');
}

);

app.get('/usermanagementadd', function (req,res){
  var username=req.body[0];
  var password=req.body[1];
  var channel=req.body[2];
  var environment=req.body[3];
  var indicator=req.body[4];

  if(req.body[0]===null && req.body[1]===null){

  }else{
    var fnUsermanagement=Usermanagement.createusermgt(username,password,channel,environment,indicator,function(doc){
      console.log(doc);
      res.send(doc);
    });
  }
});

app.get('/usermanagementupdate', function (req,res){

});

app.get('/usermanagementfinder', function (req,res){

});


app.listen(8082);

console.log('8082');

console.log("Server started");
