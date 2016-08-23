// toggle visibility for css3 animations
$(document).ready(function() {
	$('header').addClass('visibility');
	$('.carousel-iphone').addClass('visibility');
	$('.payoff h1').addClass('visibility');
	$('.features .col-md-4').addClass('visibility');
	$('.social .col-md-12').addClass('visibility');
});


//iphone carousel animation
$(window).load(function () {
	$('header').addClass("animated fadeIn");
	$('.carousel-iphone').addClass("animated fadeInLeft");
});

// Fixed navbar
$(window).scroll(function () {
  var scrollTop = $(window).scrollTop();
	if (scrollTop > 30) {
		$('.navbar-default').css('display', 'block');
		$('.navbar-default').addClass('fixed-to-top');
	} else {
		$('.navbar-default').removeClass('fixed-to-top');
	}


//animations
	$('.payoff h1').each(function(){

		var imagePos = $(this).offset().top;
		var topOfWindow = $(window).scrollTop();

			if (imagePos < topOfWindow+650) {
				$(this).addClass("animated fadeInLeft");
			}

	});

  /*
	$('.purchase button.app-store').each(function(){

		var imagePos = $(this).offset().top;
		var topOfWindow = $(window).scrollTop();

			if (imagePos < topOfWindow+650) {
				$(this).addClass("animated pulse");
			}

	});
	*/

	$('.features .col-md-4').each(function(){

		var imagePos = $(this).offset().top;
		var topOfWindow = $(window).scrollTop();

			if (imagePos < topOfWindow+650) {
				$(this).addClass("animated flipInX");
			}

	});

	$('.articles .col-md-12').each(function(){

		var imagePos = $(this).offset().top;
		var topOfWindow = $(window).scrollTop();

			if (imagePos < topOfWindow+650) {
				$(this).addClass("animated fadeInLeft");
			}

	});

  /*
	$('.get-it button.app-store').each(function(){

		var imagePos = $(this).offset().top;
		var topOfWindow = $(window).scrollTop();

			if (imagePos < topOfWindow+850) {
				$(this).addClass("animated pulse");
			}

	});
	*/


});


// Parallax Content

function parallax() {
		// Turn parallax scrolling off for iOS devices
  var iOS = false,
      p = navigator.platform;

  if (p === 'iPad' || p === 'iPhone' || p === 'iPod') {
    iOS = true;
  }

  var scaleBg = -$(window).scrollTop() / 3;
  if (iOS === false) {
    $('.payoff').css('background-position-y', scaleBg - 150);
    /* $('.articles').css('background-position-y', scaleBg + 700); */
    $('.articles').css('background-position-y', scaleBg + 1100);
  }
}

function navbar() {
	if ($(window).scrollTop() > 1) {
	    $('#navigation').addClass('show-nav');
	} else {
	    $('#navigation').removeClass('show-nav');
	}

}

function makeElement (element,attributeObj) {
  var element = document.createElement(element);
  if(attributeObj) {
    for(var attrib in attributeObj) {
      if(!attributeObj.hasOwnProperty(attrib)) continue;
      if(attrib=="class") {
        $(element).addClass(attributeObj[attrib]);
        continue;
      }
      $(element).attr(attrib,attributeObj[attrib]);
    }
  }
  return element;
}

var listArticle = function(fileName,article) {
  //console.log(article);
  if(!article.hasOwnProperty("title")) return;
  var mediaBox = makeElement("div",{class:"media"});
  var mediaLeft = makeElement("div",{class:"media-left"});
  $(mediaBox).append(mediaLeft);
  //var mediaLink = makeElement("a",{href:"/article/" + fileName});
  //$(mediaLeft).append(mediaLink);
  //var mediaImage = makeElement("img",{class:"media-object",src:"/img/64x64.png",alt:article.title});
  if(article.hasOwnProperty("categories")) {
    //console.log(article.title + " cat:" + article.categories[0]);
    var mediaImage = makeElement("i",{class:"media-object fa " + icons[article.categories[0]]});
  } else {
    var mediaImage = makeElement("i",{class:"media-object fa " + icons.none});
  }
  $(mediaLeft).append(mediaImage);
  //$(mediaLink).append(mediaImage)
  var mediaBody = makeElement("div",{class:"media-body"});
  $(mediaBox).append(mediaBody);
  var heading = makeElement("h4",{class:"media-heading"});
  $(heading).append(article.title);
  $(mediaBody).append(heading);
  var mediaText = (article.hasOwnProperty("abstract")) ? article["abstract"] : article.content[0];
  var mediaContent = makeElement("p");
  $(mediaContent).append(mediaText);
  $(mediaBody).append(mediaContent);
  return mediaBox;
}

function formatContent(contentArray,contentElement) {
  //var returnString = "";
  for(par in contentArray) {
    p = makeElement("p");
    $(p).append(contentArray[par]);
    $(contentElement).append(p)
    //returnString += "<p>" + contentArray[p] + "</p>";
  }
  //return returnString;
}

function fetchArticle(article,containerElement) {
  if(!article.hasOwnProperty("title")) return;
  var arrowUp = makeElement("div",{class:"circle"});
  var arrow = makeElement("i",{class:"fa fa-arrow-up"});
  $(arrowUp).append(arrow);
  $(arrowUp).click(function() {
    window.location.href="/articles/";
    /*
    $("#article").empty();
    $(".articles").fadeIn(300,function() {
      $('.articles').animatescroll({padding:70});
    });
    */
  });
  $(containerElement).append(arrowUp);
  var articleTitle = makeElement("div",{class:"title"});
  $(articleTitle).append(article.title);
  $(containerElement).append(articleTitle);

  if(article.hasOwnProperty("abstract")) {
    var articleAbstract = makeElement("div",{class:"abstract"});
    $(articleAbstract).append(article.abstract);
    $(containerElement).append(articleAbstract);
  }

  var articleMetaData = makeElement("div",{class:"metadata"});
  $(containerElement).append(articleMetaData);
  for(var attrib in article) {
    if(!article.hasOwnProperty(attrib)) continue;
    if(attrib=="title" || attrib=="content" || attrib=="abstract") continue;
    var metaData = makeElement("div");
    articleMetaDataLabel = makeElement("span",{id:attrib,class:"articleattribute"});
    $(articleMetaDataLabel).append(attrib);
    $(metaData).append(articleMetaDataLabel);
    $(metaData).append(article[attrib]);
    $(articleMetaData).append(metaData);
  }

  if(article.hasOwnProperty("content")) {
    var articleContent = makeElement("div",{class:"content"});
    $(articleContent).append(formatContent(article.content,articleContent));
    $(containerElement).append(articleContent);
  }
}

function buildArticleList(articleList) {
  var articleListDiv = $("#articlelist").get();
  for(var articleFile in articleList) {
    //console.log("Found: " + articleFile + " in article list");
    if(!articleList.hasOwnProperty(articleFile)) continue;
    var articleLink = makeElement("div",{class:"articlelink col-xs-12 col-sm-6 col-md-4",id:articleFile.replace(".article","")});
    $(articleListDiv).append(articleLink);
    var articleElement = listArticle(articleFile,articleList[articleFile]);
    $(articleLink).append(articleElement);

    $(articleLink).click(function() {
      var articleId = $(this).attr("id");
      window.location.href="/articles/" + articleId;
      //followArticleLink(link)
      /*
      $(".articles").fadeOut(500,function() {
        $.getJSON("/article/" + link, function(article) {
          fetchArticle(article,$("#article").get());
          $('.article').animatescroll({padding:70});
        });
      });
      */
    });
  }
}

function followArticleLink(articleId) {
  //var link = $(this).attr("id");
  $(".articles").fadeOut(500,function() {
    //window.location.href="/articles/" + articleId;
    $.getJSON("/article/" + articleId, function(article) {
      fetchArticle(article,$("#article").get());
      $('.article').animatescroll({padding:70});
    });
  });
}

icons = {
  none:"fa-calculator",
  general:"fa-calculator",
  conversion:"fa-compress",
  health:"fa-heartbeat",
  entertainment:"fa-coffee",
  food:"fa-cutlery",
  geometry:"fa-cube",
  lifestyle:"fa-glass",
  money:"fa-money",
  shopping:"fa-shopping-cart",
  sports:"golf_course",
  time:"fa-clock-o",
  travel:"fa-train",
  electrical:"fa-bolt",
  favorites:"fa-heart"
}

$(document).ready(function () {
	var browserWidth = $(window).width();
	if (browserWidth > 560){
		$(window).scroll(function() {
			parallax();
			//navbar();
		});
	}

  $.getJSON("/index/",function(articleList) {
    buildArticleList(articleList);
  });
  if(pageCmd!="getList") {
    followArticleLink(pageCmd);
  }
});


$(window).resize(function () {
	var browserWidth = $(window).width();
	if (browserWidth > 560){
		$(window).scroll(function() {
			parallax();
			navbar();
		});
	}
});


// Phone Header Carousel
$('header .carousel').carousel({
  interval: 5000
})

// Phone Features Carousel
$('.detail .carousel').carousel({
  interval: 5000
})
