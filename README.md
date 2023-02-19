# SSE-Demo-App-FullStack-With-2-Clients

## How to setup

1. run `node index.` in main directory (or nodemon if you want to make changes and easily show them).
2. cd in to sse_react_client and run `npm start`
3. open up index.html in browser or with an extension such as live server.
4. Observe both clients side by side and see that they are displaying the same information. You can see the event sources in the browser dev tools by going to the network tab, finding the network request, and clicking event sources, and every 4ms a new request is made, but the database only updates every 1 second, so you only see a change in the value every 1 second.
