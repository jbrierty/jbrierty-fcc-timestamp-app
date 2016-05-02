var http = require('http');
var moment = require('moment');
var url = require('url');

function isUnix(str) {
    return !(isNaN(str));
}

function isNatural(str){
    return moment(str, "MMMM D, YYYY", true).isValid();
} 

function urlPrinter(req, res){
    console.log("a user made a request to " + req.url);
    res.writeHead(200, {"Content-Type": 'text/plain'});
    var urlInput = req.url;
    var usefullImput = urlInput.slice(1);
    usefullImput = usefullImput.split('%20').join(" ")
    
    if(req.url == '/'){
        res.write('Enter a unix timestamp(the number of seconds that have passed since January 1, 1970) or a natural language date in the url.\n');
        res.write('A unix timestamp will show a natural language date,\n');
        res.write('and a natural language date will show a unix timestamp.\n');
        res.write('\n');
        res.write('example 1: jbrierty-fcc-timestamp-app.herokuapp.com/January 1, 2016\n');
        res.write('example 2: jbrierty-fcc-timestamp-app.herokuapp.com/1451606400\n');
    }else if(isUnix(usefullImput)){
        res.write('You entered the unix timestamp '+ usefullImput+ '.');
        var nat = moment(usefullImput, "X").format("MMMM D, YYYY");
        res.write('\nThis converts to the natural date '+ nat + '.');
        res.write('\n{\"unix\":'+ usefullImput +',\"natural\":\"'+ nat +'\"}');
    }else if(isNatural(usefullImput)){
        res.write('You entered the natural date '+ usefullImput+ '.');
        var unix = moment(usefullImput, "MMMM D, YYYY").format("X");
        res.write('\nThis converts to the unix time '+ unix + '.');
        res.write('\n{\"unix\":'+ unix +',\"natural\":\"'+ usefullImput +'\"}');
    }else{
    res.write('You entered '+ usefullImput +"\nYour entry is not in the right format.\n\n");
    res.write('example 1: jbrierty-fcc-timestamp-app.herokuapp.com/January 1, 2016\n');
    res.write('example 2: jbrierty-fcc-timestamp-app.herokuapp.com/1451606400\n');
    }
    res.end();
}

var port = Number(process.env.PORT || 3000)

http.createServer(urlPrinter).listen(port)
console.log('server is now running...')