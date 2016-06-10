// Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', {fields: "id,about,age_range,picture,bio,birthday,context,email,first_name,gender,hometown,link,location,middle_name,name,timezone,website,work"}, function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + ' This is from unroot HTML!    Your birthday is ' + response.birthday + '!' + '<br />' +'<TABLE><TR><TD> Id </TD><TD>'+response.id+'</TD></TR><TR> <TD> Birthday </TD> <TD>'+response.birthday+'</TD> </TR><TR> <TD> Email </TD> <TD>'+response.email+'</TD> </TR> <TR> <TD> Gender </TD> <TD>'+response.gender+'</TD> </TR></TABLE> <br />'; 
      });

    var getPosts = function (response) {
      console.log('SUccesful API call for reading feed!');
      if (response && !response.error) {
        var post_count = response.data.length;
        var i;
        console.log(response);
        document.getElementById('posts').innerHTML = ' API succesfully called.' + '<br /> '+ ' The no. of posts are ' + post_count + '<br /> <br />';

        for(i=0;i<post_count;i++)
        {
          document.getElementById('list').innerHTML += response.data[i].message +'<br />'+response.data[i].story +'<br /> <br />';
          console.log(i+ "object printed");
          FB.api("/"+response.data[i].id+"/likes","POST",
          function (response1) {
            console.log("called");
            console.log(response);
            console.log(response1);
            document.getElementById('list').innerHTML += response.data[i].message;
            if (response1 && !response1.error) {
              console.log("object number" + i + response1);
              /* handle the result */
            
            } 
          }
          ); 

      }
    }
  }

    /* make the API call */
    FB.api('/me/feed', {'limit' : '0'} , getPosts);
    }