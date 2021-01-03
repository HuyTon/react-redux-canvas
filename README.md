# react-redux-canvas
A web application using React, Redux and Canvas API.

# Features
Given the canvas, user can draw 3 basic type of shapes: circle, rectangle and trigangle.
User can use the toolbar in the right handside panel:
- Scissor: Drag the scissor icon into the shape, this will split the targeted shape into 2 pieces.
- Glue: Drag the glue icon into the shape, this will glue the target shaped which is splited by the scissor tool.
- Eraser: Remove the shape from the canvas.

The dimention of the canvas and the list of toolbar will be defined in a json returned by the backend api.
You are free to design the format of the json file.
Note: Not allow to use any library for the canvas. Only can use standard Canvas API: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

# Install packages and run demo
npm install\
npm start

# For testing
npm test

# Demo pictures

![canvas0](https://user-images.githubusercontent.com/29830442/87759801-70da3700-c841-11ea-8bc3-960e77c3ae3e.png)

![canvas1](https://user-images.githubusercontent.com/29830442/87759832-7c2d6280-c841-11ea-8fb4-f3830b8fe668.png)

![canvas2](https://user-images.githubusercontent.com/29830442/87759844-80598000-c841-11ea-92fb-e0392ac4f1be.png)
