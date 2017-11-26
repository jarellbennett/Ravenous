const clientId= 'UJuwIwtCIhPTM__e41sMkg';
const secret =
 'nGN1wXmtVGKHw1sUs2jRq5bzMOhn6GpPaJnxwsuyX1cIkbB1irAQ5KhxZRa9UJI4';
const accessToken;

const yelp = {
  getAccessToken(){
    if(accessToken){
      return new Promise(resolve=> resolve(accessToken));
    }
    return fetch(
      `https://cors-anywhere.herokuapp.com/api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`
    , {
      method: 'POST',
      body: JSON.stringify({id:'200'})
    }).then(response=> {
      if(response.ok){
        return response.json();
      }
    }).then(jsonResponse => {
      accessToken = jsonResponse.access_token;
    });
  },

  search(term,location,sortBy){
    return Yelp.getAccessToken().then(()=>{
      return fetch(
        `https://cors-anywhere.herokuapp.com/api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`
      ,{
        headers: ({Authorization: `Bearer ${accessToken}`})
      }).then(response=> {
        if(response.ok){
          return response.json();
        }
      }).then(jsonResponse => {
        if(jsonResponse.businesses){
          jsonResponse.businesses.map();
        }
      })
    })
  }
}
