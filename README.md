# Hello World

This app has been designed to be a LockerDome App at it's most simple, and its designed to empower you to learn by playing.

There are a few helper files that any starting LD Apper would benefit from.

1. **app\_platform.js**: This is a mini-glossary of the privileged postMessage calls you can make, as well as a library to simplify serving content into an iframe on our site.

2. **api\_ops**: This is a mini-glossary of our api calls, as well as a library to simplify making the api calls down to a simple function-callback pattern. It relies on api_request being in the same directory as it.

3. **api\_request**: If you are new to NodeJS, or if you haven't written an app for LockerDome before, this is a useful file because it handles many of the basic elements of sending an api call to us.

## API Calls and databasing

There are 4 primary api calls with enough control to be simple, and enough abstraction to stay powerful. These api calls must always be made from your server, as they require a private app_token that authorizes every action involving your app.

Every api call has the following required fields:

  * **app_id**: The id of your app. This should be returned from the update\_website\_app call.
  * **app_secret**: The secret returned from the create\_app\_secret_key call.
    
This forms the basis of how we identify and authenticate your app in our database.
    
#### Common field definitions:  

  * **id**: The signature of this content. This is how we look it up in our database, so don't lose it!  
  * **created_by**: Who is creating this content? - Must be a valid user account_id  
  * **text**: Brief description of this content - String  
  * **thumb\_url**: A url to a preview image of this piece of content. - String  
  * **name**: The formal name for a piece of content. - String  
  * **app\_data**: This is where we give you the reins. It is essentially an empty json object hooked up to redis, which you are able to rig up with your own data model. Pretty sweet, right?

#### Primary api calls:    

  * **app\_create\_content**: Create a single piece of content using our database.   
    Additional optional fields: created\_by, app\_data, text, thumb\_url, name   
    Success returns: {status: true, result: {common fields} }   
    
  * **app\_fetch\_content**: Fetches a single piece of content using our database.   
    Additional required fields: id   
    Success returns: {status: true, result: {common fields} }   
    
  * **app\_update\_content**: Updates a single piece of content using our database.   
    Additional required fields: id   
    Additional optional fields: app_id, app_data, text, thumb_url, name   
    Success returns: {status: true, result: {common fields} }   
    
  * **app\_destroy\_content**: Destroys a single piece of your content using our database.   
    Additional required fields: id   
    Success returns: {status: true}   

## Hooking your app up to our site:    
    
Let's assume your site is www.foo.com
    
 * **Request an app token**:    
Make a request to appsplayground.v3.lockerdome.com/api/create\_app\_secret\_key    
    Required fields: None;    
    Success returns: { secret\_key: hashstring, encrypted\_secret\_key: hashstring }    
    Notes: The secret key is important as it will authenticate your calls.    
    The encrypted secret key is important as it will identify your app url.    
    
 * **Create an app description on your site**:    
We look a json object at this relative url on yourdomain.com/lockerdome\_app\_data.json    
    ````
    {
      name: Your app name - "Foo",
      ui-url: Absolute url that the iframe we open will point to - "www.foo.com/LDapp",
      encrypted\_app\_secret: the same field returned from create\_app\_secret\_key
    }
    ````
    
 * **Tell us to check your site for an app**:    
Make a request to appsplayground.v3.lockerdome.com/api/update\_website\_app    
    
    Required fields: { Domain: www.foo.com; }    
    Success returns: { app_id: The ID of your app }    
        
And it's finished! Any time we see an external link to your site, we'll load an iframe pointing to your app, with a url parameter in the querystring naming the URL that the link originally pointed to.    
    
