# Hello World

This app has been designed to be a LockerDome App at it's most simple, and its designed to empower you to learn by playing.

There are a few helper files that any starting LD Apper would benefit from.

1. app_platform.js: This is a mini-glossary of the privileged postMessage calls you can make, as well as a library to simplify serving content into an iframe on our site.

2. api_ops: This is a mini-glossary of our api calls, as well as a library to simplify making the api calls down to a simple function-callback pattern. It relies on api_request being in the same directory as it.

3. api_request: If you are new to NodeJS, or if you haven't written an app for LockerDome before, this is a useful file because it handles many of the basic elements of sending an api call to us.

## API Calls and databasing

There are 4 primary api calls with enough control to be simple, and enough abstraction to stay powerful. These api calls must always be made from your server, as they require a private app_token that authorizes every action involving your app.

Every api call has the following required fields:

 * app_id : The id of your app. This should be returned from the update_website_app call.
 * app_secret : The secret returned from the create_app_secret_key call.
    
This forms the basis of how we identify and authenticate your app in our database.
    
Other common field definitions:     
  * id: The signature of this content. This is how we look it up in our database, so don't lose it!  
  * created_by: Who is creating this content? - Must be a valid user account_id  
  * text: Brief description of this content - String  
  * thumb_url: A url to a preview image of this piece of content. - String  
  * name: The formal name for a piece of content. - String  
  * app_data: This is where we give you the reins. It is essentially an empty json object hooked up to redis, which you are able to rig up with your own data model. Pretty sweet, right?

Additional api calls :

  * app_create_content : Create a single piece of content using our database.   
    Additional optional fields: created_by, app_data, text, thumb_url, name
    Success returns: {status: true, result: {common fields} }
    
  * app_fetch_content : Fetches a single piece of content using our database.   
    Additional required fields: id
    Success returns: {status: true, result: {common fields} }
    
  * app_update_content : Updates a single piece of content using our database.   
    Additional required fields: id
    Additional optional fields: app_id, app_data, text, thumb_url, name
    Success returns: {status: true, result: {common fields} }
    
  * app_destroy_content : Destroys a single piece of your content using our database.   
    Additional required fields: id
    Success returns: {status: true}
    
  * app_fetch_user_content : Get a list of your content that was created by some user account.   
    Additional required fields: created_by
    Success returns: {status: true, result: [user_content{common fields}] }
