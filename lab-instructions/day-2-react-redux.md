## Redux setup
For this lab we're going to add redux to the Travelerz app you worked with yesterday. Follow the steps below to get redux installed.
1. Install the `react-redux` and `@reduxjs/toolkit` libraries with npm.
2. In the `client` folder, create a folder called `store`
3. Inside the `store` folder, create a file called `store.js` and one called `authReducer.js`. 

# Creating and Providing a store and reducer

## Build the authReducer

We're going to build our authReducer function so that we can provide it to the app and dispatch redux actions where appropriate. 
1. In `authReducer.js`, declare an `initialState` object. It should have properties for `username` and `userId`, which should both be null.
2. Create and export a function called `authReducer`. It should take in two parameters: `state` and `action`. `state` should have a default value of `initialState`. 
3. Create a switch statement that will take in the `type` property of the action object. Give it the following cases:
    - `LOGIN`. This case should update state to have the `userId` and `username` from the action payload. 
    - `LOGOUT`. This case should reset state to it's starting value. 
    - Make sure to include a default case that returns state. 

## Build the store
Now that we have a reducer function, we can set up the redux store. Remember that reducer functions allow us to invoke actions, and the store is what provides redux state to the application.
1. In `store.js`, import `configureStore` from `@reduxjs/toolkit`. Also import the reducer function we just created. 
2. Declare a variable called `store`. Its value should be `configureStore` invoked, with an object passed in. The object should have a `reducer` property. The value of this property should be another object with an `auth` property. The value of the `auth` property should be the reducer we created. 
3. Export the `store` variable as the default export. 

## Provide the store

Now that our store has been created, we need to provide it to the app. Go to `main.jsx` and do the following:
1. Import `Provider` from `react-redux`
2. Import the store variable we just created
3. Scroll down to the bottom where we are rendering the `Router` component. Wrap the `Router` component in the `Provider` component.
4. Pass in a prop to `Provider` called `store`. The value of this prop should be the store variable we created and imported. 

**We have now created and provided a store and a reducer with actions. We can now select values from global state and dispatch redux actions to update global state.**

# Selecting values and dispatching actions

## main.jsx

Currently `main.jsx` has a dummy value for `userId`. This value is being used in multiple conditional renders in the `auth`, `wishlist` and `myDestinations` routes. Update this value to come from redux.
1. Import the `useSelector` hook. 
2. Invoke `useSelector` and pass in a callback function that will return the `userId` on redux state. 

Our conditional renders should now work, but we won't really be able to see it in action until we have some actions set up in other components.

## Auth.jsx

Right now when a user logs in on this page the session is updated in the server, but nothing happens here in the front end. We're going to update `handleFormSubmit` to fix this. 
1. Import the `useDispatch` hook
2. Invoke it and save the function it returns to a variable called `dispatch`.
3. After the request in `handleFormSubmit`, dispatch the `LOGIN` action we created in our reducer. The payload object needs to have a `userId` and `username` property. 

If you have the Redux DevTools extension in Chrome, you can now use it to see the value of redux state updating when the user logs in. The extension can be found here if you don't have it installed: https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd

After the next step, you'll also see the header update when the user logs in. 

## Header.jsx
In this component we're using a dummy `userId` to conditionally render different links in the header if the user is logged in. Update the `userId` to come from redux state. 
1. Import the `useSelector` hook. 
2. Invoke `useSelector` and pass in a callback function that will return the `userId` on redux state. 

There's also a function in here, `handleLogout` that needs to dispatch a redux action. 
1. Import the `useDispatch` hook
2. Invoke `useDispatch` and save the return value to a variable called `dispatch`.
3. After the request in `handleLogout`, dispatch the `LOGOUT` action. This action does not require a payload object. 

Now after you log in, the header should toggle to show links to the wishlist and the user's destinations. 

In addition, if you try to go to `/root/auth` manually, you should be kicked to the home page. This will confirm that we've selected the `userId` correctly in `main.jsx` and our conditionally rendered routes are working. 

## My Destinations

The `MyDestinations.jsx` component doesn't actually use any values from redux, so we don't need to edit any code here. But we'll need to add some destinations while logged in to be able to test the next step successfully. Go to the *My Destinations* page and add at least one destination. 

## Home.jsx

Right now the home page is displaying all destination posts, including the one(s) that we added. Since you don't typically see your own posts on a social media page, we want to filter out any destinations that the user has added themselves. 

You'll see multiple dummy values at the top of Home.jsx. We'll come back to the wishlist in the second half of the lab, but for now we just want to select the `userId` from redux like we've done elsewhere. 
1. Import the `useSelector` hook. 
2. Invoke `useSelector` and pass in a callback function that will return the `userId` on redux state.

Now you shouldn't see your own destination posts. 

## DestCard.jsx
This component also has a dummy `userId` that is being used in a conditional render. If there's no user logged in, there shouldn't be an option to add a destination to a wishlist. But now that our redux auth is working, we want this button to be visible. 
1. Import the `useSelector` hook. 
2. Invoke `useSelector` and pass in a callback function that will return the `userId` on redux state.

An `Add to Wishlist` button should now become visible on each of the destination cards.

## Bonus feature
We have a `username` on state, but we're not currently using it anywhere in the app. Find a suitable location to display the username and select it from redux.


# Adding a second reducer

We now have a functioning auth reducer set up and working. Often an auth reducer will be the only global state you need. But in this case we want to handle the user's wishlist on global state as well. The session in the server is already keeping track of the user's wishlist, but having it on global state ensures immediate access anywhere in our front end. 

## wishlistReducer
1. In your `store` folder, create a file called `wishlistReducer.js`. 
2. In `wishlistReducer.js`, declare `initialState`. This should be an empty array. 
3. Declare and export a function called `wishlistReducer`. This function should take in `state` and `action` as parameters. `state` should have a default value of `initialState`
4. Build a switch statement that takes in the type property of the action object as its parameter. Create the follwing cases:
    - `ADD_TO_WISHLIST` should return a new state array with the action payload object added to the existing values. 
    - `REMOVE_FROM_WISHLIST` should find the index of the item we're trying to remove using the `id` property of the payload object. Then use that index to remove the item from the wishlist array and return the updated wishlist array. 
    - `UPDATE_WISHLIST` should just return the entire payload property. This case will fire when the page refreshes, and it's purpose is to replace the entire wishlist array. 
    - Always make sure to have a default case that returns state. 

## store.js
1. Import the `wishlistReducer` we just made into `store.js`
2. In the `reducer` object, add a second property on the same level as `auth`. Call it `wishlist` and give it a value of the reducer we just created. 

Our global state is now an object with `auth` and `wishlist` properties. 

## Home.jsx
Head back to `Home.jsx`. We're going to update the `wishlist` dummy value.
1. We already have `useSelector` imported
2. Invoke `useSelector` and pass in a callback function that will return the `wishlist` value from redux state

You'll notice we have a `wishlistIds` variable that is created by mapping over the `wishlist` array and returning all the ids of the destiniations inside it. We're using this when we render `DestCard.jsx` to determine if each destination is already in the user's wishlist and display the add or remove buttons accordingly. 

**It's important to note that we're using two different selectors to access values from two different reducers here. This may seem redundant, but it prevents unecessary re-renders and is the recommended practice for selecting from multiple datasets on redux.**

## DestCard.jsx
We can now update the `handleAddToWishlist` and `handleRemoveFromWishlist` functions to update the wishlist on redux
1. Import the `useDispatch` hook
2. Invoke `useDispatch` and save the function it returns to a variable called `dispatch`. 
3. After the request in `handleAddToWishlist`, dispatch the `ADD_TO_WISHLIST` action and pass in `res.data` as the payload.
4. After the request in `handleRemoveFromWishlist`, dispatch the `REMOVE_FROM_WISHLIST` action. The payload should be the `id` of the destination object on props. 

## DestDetails.jsx
This component uses the same actions that `DestCard.jsx` did, and also uses `wishlist` in the same way `Home.jsx` did. 
1. Import the `useSelector` and `useDispatch` hooks
2. Invoke `useSelector` and pass in a callback function that will return the `wishlist` value from redux state
3. Invoke `useDispatch` and save the function it returns to a variable called `dispatch`. 
4. After the request in `handleAddToWishlist`, dispatch the `ADD_TO_WISHLIST` action and pass in `res.data` as the payload.
5. After the request in `handleRemoveFromWishlist`, dispatch the `REMOVE_FROM_WISHLIST` action. The payload should be the `id` of the destination object that's coming from the loader. 

The buttons should now toggle between add and remove, and should dispatch the appropriate redux actions. 

## Wishlist.jsx
We're going to update the dummy `wishlist` in this component. 
1. Import the `useSelector` hook
2. Invoke `useSelector` and pass in a callback function that will return the `wishlist` value from redux state

You should now see all the destinations in your wishlist, with the option to remove them. 


## main.jsx
All our redux actions and values should now be functioning as expected. Until you refresh the page. Redux state gets reset back to the initial values when the page refreshes, so we lose all our data. However, the session in the server persists through a page refresh, so all we need to do is dispatch redux actions to update the `auth` and `wishlist` with data from the session whenever the page refreshes. There's already a function for this called `handleCheckUser` in `main.jsx`
1. After the request in `handleCheckUser`, check to see if there's a `userId` in the response data. This will tell us if there's a user on the session.
2. If there is a `userId`, we'll dispatch the `LOGIN` and `UPDATE_WISHLIST` actions, passing in the appropriate data from the response. 


You did it! All redux functionality should now be complete, and should persist even through a page refresh. 