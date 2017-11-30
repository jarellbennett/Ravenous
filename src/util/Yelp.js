const clientId= 'UJuwIwtCIhPTM__e41sMkg';
const secret =
 'nGN1wXmtVGKHw1sUs2jRq5bzMOhn6GpPaJnxwsuyX1cIkbB1irAQ5KhxZRa9UJI4';
let accessToken;

const yelp = {
  getAccessToken(){
    if(accessToken){
      return new Promise(resolve=> resolve(accessToken));
    }
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`
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
    return yelp.getAccessToken().then(()=>{
      return fetch(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`
      ,{
        headers: ({Authorization: `Bearer ${accessToken}`})
      }).then(response=> {
        if(response.ok){
          return response.json();
        }
      }).then(jsonResponse => {
        if(jsonResponse.businesses){
          return jsonResponse.businesses.map(business=>({

              id: business.id,
              imageSrc: business.image_url,
              name: business.name,
              address: business.location.address1,
              city: business.location.city,
              state: business.location.state,
              zipCode: business.location.zip_code,
              category: business.categories[0].title,
              rating: business.rating,
              reviewCount: business.review_count


          }));
        }
      });
    });
  }
}

export default yelp;
