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
            $('.articles').css('background-position-y', scaleBg + 800);
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

function buildArticleList(articleList,count) {
  var articleListDiv = $("#articlelist").get();
  for(var articleFile in articleList) {
    if(--count<0) return;
    //console.log("Found: " + articleFile + " in article list");
    if(!articleList.hasOwnProperty(articleFile)) continue;
    var articleLink = makeElement("div",{class:"articlelink",id:articleFile.replace(".article","")});
    $(articleListDiv).append(articleLink);
    var articleElement = listArticle(articleFile,articleList[articleFile]);
    $(articleLink).append(articleElement);

    //$(articleElement).click(function() {
    $(articleLink).click(function() {
      var link = $(this).attr("id");
      window.location.href="/articles/" + link;
      /*
      $(".articles").fadeOut(500,function() {
        $.getJSON("/article/" + articleFile.replace(".article",""), function(article) {
          fetchArticle(v,article,$("#article").get());
          $('.article').animatescroll({padding:70});
        });
      });
      */
    });
  }
}

/*
function buildArticleList(articleList) {
  var articleListDiv = $("#articlelist").get();
  articleList.forEach(function(v,i,a) {
    //var articleLink = makeElement("div",{'id':"article_" + i,class:"articlelink"});
    var articleLink = makeElement("a",{'id':"article_" + i,class:"articlelink",href:"/articles/"});
    $(articleListDiv).append(articleLink);
    v = v.replace(".article","");
    $.getJSON("/article/" + v, function(article) {
      var articleElement = listArticle(v,article);
      $(articleLink).append(articleElement);
    })
  });
}
*/

var listArticle = function(fileName,article) {
  if(!article.hasOwnProperty("title")) return;
  //if(!article.hasOwnProperty("content")) return;
  /*
    <div class="media">
      <div class="media-left">
        <a href="#">
          <img class="media-object" src="../img/64x64.png" alt="Calculate Discounts">
        </a>
      </div>
      <div class="media-body">
        <h4 class="media-heading">DynaCalq - The basics</h4>
        <p>Learn how to get up and running ASAP with DynaCalq. Learn how
        to use the universal converter, select your favorite formulas
        and do conversions on any formula.</p>
      </div>
    </div>
  */
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
    //alert("Got article list: " + JSON.stringify(articleList));
    buildArticleList(articleList,5);
  });
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
  interval: 15000
})
