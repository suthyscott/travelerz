# Setup
1. Run `npm i`
2. Create a `.env` file using the format in `.envExample`, inserting your own values. 
3. Run `npm run dev`. After a moment, you should see this message in your console: `Your database has been seeded. Kill the terminal, comment out the sequelize.sync line with {force: true} in the main.js and comment in the other sequelize.sync line, then restart the server.`. Follow the instructions and restart the app. You should now see `Server is listening on port [YOURPORT]...`
4. The app should now be ready to code in. 

# Components and pages. 

As you go through the lab today, you'll reverse engineer the code in this app to create a full project plan. The MVP is already created for this app and can be viewed in the file `MVP.md`. Only some of the app's features are currently functional. We'll need to implement redux to get the remaining features working. 

Throughout the labs this week we'll add technologies to the app to make it fully functional. The following descriptions will help you become familiar with this starting code and build out a project plan. You'll notice a lot of similarities to the demo project, but some differences too.

### main.jsx
- Our routes are set up in the `Router` component
    - `auth` is the page with our authentication form. We have a ternary set up in here so that if there is already a `userId` (meaning someone is logged in) they can't access this page and will be routed to the home page. 
    - `home` has a loader to get all destinations. We'll use this data on the home page. 
    - `wishlist` has a condition so that it can only be accessed if there's a user logged in.  
    - `myDestinations` is restricted just like `wishlist` is. It's loader makes a request to an endpoint that uses the `userId` on session. This one gets the destinations that the current user has posted. 
    - `destination/:destId` has a loader that will use the `destId` off of params to request the data for a single destination. 
- We have a dummy `userId` at the top of `Router`. We need this dummy value because we have several conditionals that depend on there being a `userId` in this file, but we don't have a way to give it an actual value until we implement redux tomorrow. 
- There is a `useEffect` that invokes `handleCheckUser` when the site is refreshed or when `userId` updates. After we've implemented redux, we'll use the result of this request to make sure our auth info and the items on the user's wishlist are set back on global state when the page refreshes. 

### Auth.jsx 
- The authentication form is pretty straightforward and allows a user to toggle between registering and logging in. The main thing to note here is what happens after the axios request in the `handleFormSubmit` function.
- `handleFormSubmit` will send a request to register or login the user and upon successful authentication it will set the user's data on session.
- Right now we're just console.logging the response, but what we'll need to do is implement some redux functionality so that we actually set the user's data on global state. That way it will be available all across the app.

### Home.jsx and DestCard.jsx
- We are pull a list of all destinations from the loader. We also have two state values that will be used to filter the destinations by their name and/or description, based on the user's input. See the inputs and the 2nd and 3rd `.filters` in the `render`. 
- `userId` and `wishlist` are currently dummy values. These will be replaced with real values once we set up redux.
    - `userId` is being used in the first filter to filter out the user's own destination posts. Since this is a social media site, we don't want users seeing their own posts if they're logged in. If the id is null, all the destinations will appear. 
    - `wishlist` is being used to create an array called `wishlistIds` that holds all the ids of destinations that are already in the user's wishlist. In the `.map` where we're rendering the destinations using `DestCard.jsx`, we're passing in a prop called `isInWishlist` that needs to be true or false. We'll check to see if each destination's id is in the `wishlistIds` array, and if it is we'll pass in `true`. Otherwise we'll pass in false. We won't be able to see this in action until redux is implemented, but ultimately this will allow us to show the user which destinations they've already wishlisted. 
- `DestCard.jsx` receives the destination's info as a prop and renders it. It also receives `isInWishlist` as a prop. More on how this is being used below
    - `userId` is a dummy value here, and just like in `Home.jsx` we'll connect this to redux eventually so we have an actual value. 
    - We're using `userId` and `isInWishlist` for a nested conditional render. If we don't have a `userId` we won't render either any buttons below the image, but if we do have a `userId` we'll display one of two buttons. `Remove From Wishlist` will show up if the item is already in the user's wishlist. `Add to Wishlist` will display if it's not. This feature won't be functional until we implement redux. 
    - `handleAddToWishlist` and `handleRemoveFromWishlist` will send requests to add or remove an item from the user's wishlist on the session. In both functions, we'll need to trigger a redux action after the request to update the wishlist we'll hold on global state. 

### DestDetails.jsx
- We're pulling the `dest` object from the loader and rendering the data
- `wishlist` is currently dummy data but will come from redux. Just like in `Home.jsx` we're creating a another array called `wishlistIds` that will have all the ids of destinations already in the user's wishlist. We're using this array in a conditional render to show the `Remove From Wishlist` button if the user has already wishlisted the destination, or `Add to Wishlist` if not. 
- Just like in `DestCard.jsx`, `handleAddToWishlist` and `handleRemoveFromWishlist` will send requests to add or remove an item from the user's wishlist on the session. In both functions, we'll need to trigger a redux action after the request to update the wishlist we'll hold on global state. 

### MyDestinations.jsx and UserDestCard.jsx
- This component contains a form and state values for the user to post a new destination. 
- It also pulls the user's destinations from the loader and renders them using `UserDestCard.jsx` and a `.map`. 
- `UserDestCard` renders the destination's data with the same format and styling that `DestCard.jsx` does. We could have re-used the `DestCard.jsx` component for this, but that component will be connected to redux and uses values from global state. This impacts the rendering efficiency, which will dive into tomorrow. So we created this simpler component to render the user's destinations without needed to worry about global state values. 
- Unlike most of the app, none of the code on this page will change when we implement redux. However, we won't be able to see the full page until we have a valid `userId` in `main.jsx` and `Header.jsx`, since these components control access to this component. 

### Header.jsx
- This component has a dummy `userId` that is being used in a conditional render. If there is a `userId` that means a user is logged in, and we'll display links to their destinations page and wishlist. Otherwise we'll display an invitation to login. You can toggle this yourself if you want to see it in action by giving `userId` a value of any integer. We'll change this value to come from redux tomorrow. 
- `handleLogout` fires a request to wipe the session in the server. Once we implement redux we'll trigger an action to remove the user's data from global state after this request. 

### Wishlist.jsx 
- We have a dummy wishlist array that will eventually come from redux. 
- We map over the wishlist and render each item using `DestCard.jsx`, the same child component we used in `Home.jsx`. As long as we pass in `false` as the value for the  `isInWishlist` prop, the destinations should show up with the `Remove From Wishlist` button. 


That is an overview of the front end of the app. 