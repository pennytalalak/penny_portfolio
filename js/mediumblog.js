$(function () {
    var $content = $('#jsonContent');
    var data = {
    rss_url: 'https://medium.com/feed/path2code'
    };
    $.get('https://api.rss2json.com/v1/api.json', data, function (response) {
    if (response.status == 'ok') {
    var output = '';
    $.each(response.items, function (k, item) {
    var visibleSm;
    if(k < 12){
    visibleSm = '';
    } else {
    visibleSm = ' visible-sm';
    }
    output += '<div class="col-md-4 col-sm-4 col-xs-12' + visibleSm + '">';
    output += '<div class="blog-post"><header>';
    output += '<h4 class="date">' + $.format.date(item.pubDate, "dd<br>MMM") + "</h4>";
    var tagIndex = item.description.indexOf('<img'); // Find where the img tag starts
    var srcIndex = item.description.substring(tagIndex).indexOf('src=') + tagIndex; // Find where the src attribute starts
    var srcStart = srcIndex + 5; // Find where the actual image URL starts; 5 for the length of 'src="'
    var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart; // Find where the URL ends
    var src = item.description.substring(srcStart, srcEnd); // Extract just the URL
    output += '<div class="blog-element blog-content"><a href="'+ item.link + '" target="_blank"><img class="img-responsive" src="' + src + '" width="360px" height="240px"/></a></div></header>';
    output += '<div class="blog-content"><h4><a href="'+ item.link + '" target="_blank">' + item.title + '</a></h4>';
    output += '<div class="post-meta"><span>By ' + item.author + '</span></div>';
    var yourString = item.description.replace(/<img[^>]*>/g,"");
    var maxLength = 120 // maximum number of characters to extract
    //trim the string to the maximum length
    var trimmedString = yourString.substr(0, maxLength);
    //re-trim if we are in the middle of a word
    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
    output += '<p>' + trimmedString + '...</p>';
    output += '</div></div></div>';
    return k < 12;
    });
    $content.html(output);
    }
    });
    });
    
