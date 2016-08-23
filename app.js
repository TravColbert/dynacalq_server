/*eslint-env node*/

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var app = express();
var fs = require('fs');
var fallbackPort = 3000;
var appHome = "/opt/dynacalq_server/";
var articleStore = appHome + "articles/";
//var result = "";
var stubs = {header:"", footer:""};
var getStub = function(filePath, variable) {
  fs.readFile(filePath, function(err,content) {
    if(err) {
      console.log(err);
      return;
    }
    stubs[variable] = content;
  });
}
var getHeader = function(filePath) {
  getStub(filePath,"header");
}
var getFooter = function(filePath) {
  getStub(filePath,"footer");
}

var getArticle = function(filePath,formatFunction,res) {
  fs.readFile(filePath, function(err, content) {
    if(err) {
      console.log(err);
      res.send({});
      return;
    };
    if(typeof formatFunction!=="function") return;
    var article = JSON.parse(content);
    res.send(article);
    //result = formatFunction(filePath,article);
    //res.send(stubs.header + returnString + stubs.footer);
  });
}
var getArticleData = function(filePath, fieldArray) {
  var article = JSON.parse(fs.readFileSync(filePath,{encoding:"utf8"}));
  var newArticle = {};
  for(var prop in article) {
    if(article.hasOwnProperty(prop)) {
      if(fieldArray.indexOf(prop)!=-1) {
        newArticle[prop] = article[prop];
      }
    }
  }
  return newArticle;
}
var showArticle = function(filePath,article) {
  var metadata;
  var returnString = "<section class=\"article\"><div class=\"container\">";
  for(var attrib in article) {
    if(!article.hasOwnProperty(attrib)) continue;
    metadata = (attrib!="title" && attrib!="content") ? "metadata" : "";
    returnString += "<div class=\"" + attrib + " " + metadata + "\"><span id=\"" + attrib + "\" class=\"articleattribute\">" + attrib + "</span>";
    if(attrib=="content") {
      returnString += formatContent(article[attrib]);
    } else {
      returnString += article[attrib];
    }
    returnString += "</div>";
  }
  returnString += "</div></section>";

  return returnString;
}
var getArticleIndex = function(filePath,res) {
  fs.readdir(filePath,function(err,files) {
    if(err) {
      res.send([]);
      return;
    }
    res.send(files);
  })
}
var getArticleList = function(filePath,res) {
  var dirList = fs.readdirSync(filePath);
  var fileList = {};
  var fileCount = dirList.length-1;
  //var returnString = "";
  dirList.forEach(function(v,i,a) {  // Value, Index, Array
    if(v.split('.').pop()!="article") return;
    //console.log(v.split('.').pop());
    fileList[v] = getArticleData(articleStore + v, ["title","date","article_version","for_formula","categories","abstract"]);
    if(i==fileCount) {
      res.send(JSON.stringify(fileList));
    }
  });
}
getHeader(appHome + "header.html");
getFooter(appHome + "footer.html");
getStub(appHome + "mainsection.html","mainsection");
getStub(appHome + "articlelist.html","articlelist");

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

app.get('/index/',function(req,res) {
  getArticleList(articleStore,res);
});

app.get('/article/:articleId', function(req, res) {
  console.log("Fetching article: " + req.params.articleId);
  getArticle(articleStore + req.params.articleId + ".article", showArticle, res);
});

app.get('/articles/', function(req, res) {
  var pageCmd;
  pageCmd = "<script>var pageCmd='getList'</script>";
  res.send(stubs.header + stubs.mainsection + stubs.articlelist + pageCmd + stubs.footer);
});

app.get('/articles/:articleId', function(req, res) {
  var pageCmd;
  pageCmd = "<script>var pageCmd='" + req.params.articleId + "'</script>";
  res.send(stubs.header + stubs.mainsection + stubs.articlelist + pageCmd + stubs.footer);
});

// start server on the specified port and binding host
app.listen(fallbackPort, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting");
});
