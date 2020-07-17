
import React from 'react';
import _ from 'lodash';

export default class MagicCanvas extends React.Component {

  constructor(props) {
    super(props);
    this.loadImage = this.loadImage.bind(this);
    this.drawImage = this.drawImage.bind(this);
    this.drawCanvas = this.drawCanvas.bind(this);
    this.drawShapes = this.drawShapes.bind(this);
    this.drawShapeByAction = this.drawShapeByAction.bind(this);
    this.handleEvents = this.handleEvents.bind(this);
    this.populateUrl = this.populateUrl.bind(this);
  }

  componentDidUpdate() {
    this.drawCanvas();
    this.handleEvents();
    this.drawShapes();
  }

  tools = [];

  drawCanvas() {
    // Draw main canvas
    let top = this.props.canvas.main.top;
    let left = this.props.canvas.main.left;
    let width = this.mainCanvas.width;
    let height = this.mainCanvas.height;

    const ctx = this.mainCanvas.getContext("2d");
    //ctx.save();
    ctx.beginPath();
    ctx.clearRect(left, top, width, height);
    ctx.fillStyle = this.props.canvas.main.fillStyle;
    ctx.fillRect(left, top, width, height);
    //ctx.restore();

    // Draw toolbar canvas
    top = this.props.canvas.toolbar.toolbarCanvas.top;
    left = this.props.canvas.toolbar.toolbarCanvas.left;
    width = this.toolbarCanvas.width - left;
    height = this.toolbarCanvas.height - top;

    const tbCtx = this.toolbarCanvas.getContext("2d");
    //tbCtx.save();
    tbCtx.beginPath();
    tbCtx.clearRect(left, top, width, height);
    tbCtx.fillStyle = this.props.canvas.toolbar.toolbarCanvas.fillStyle;
    tbCtx.fillRect(left, top, width, height);
    tbCtx.strokeStyle = this.props.canvas.toolbar.toolbarCanvas.strokeStyle;
    tbCtx.strokeRect(left, top, width, height);
    //tbCtx.restore();

    // Draw tools
    if (this.props.canvas.toolbar.tools) {
      const d = 35; // distance
      const l = 25; // left
      let t = 35; // top
      this.props.canvas.toolbar.tools.forEach(tool => {
        const w = parseInt(tool.width);
        const h = parseInt(tool.height);        
        const options = {
          id: tool.id,
          url: this.populateUrl(tool.url),
          x: l,
          y: t,
          w: w,
          h: h
        };
        this.drawImage(options, tbCtx);
        t += h + d;
        this.tools.push(options);
      });
    }     
  };

  populateUrl = (url) => {
    let pub = 'public';
    
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {      
      // Development environment,
      // need to add-in public to url
      if(url && url.indexOf(pub) !== 0)
        return pub + '/' + url;

    } else {
      // Production environment
      if(url && url.indexOf(pub) === 0)
        return url.slice(pub.length);
    }
    return url;
  };

  loadImage = (id, url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.id = id;
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`load ${url} fail`));
      img.src = url;      
    });
  };

  drawImage = async (options, ctx) => {
    // Must be make a copy of original object
    const newOptions = Object.assign({}, options);
    return this.loadImage(newOptions.id, newOptions.url).then(img => {
      ctx.drawImage(img, newOptions.x, newOptions.y, newOptions.w, newOptions.h);
    });
  };

  handleEvents() {
    const ctx = this.toolbarCanvas.getContext("2d");
    var offsetX = this.mainCanvas.offsetLeft;
    var offsetY = this.mainCanvas.offsetTop;
    var tbOffsetX = this.toolbarCanvas.offsetLeft;
    var tbOffsetY = this.toolbarCanvas.offsetTop;
    var isDragging = false;
    var selectedTool = {};

    // TOOLBAR CANVAS REGISTER EVENTS
    this.toolbarCanvas.onmousedown = (e) => {  
      let mouseX = parseInt(e.clientX - tbOffsetX);
      let mouseY = parseInt(e.clientY - tbOffsetY);

      // Reset selected tool
      selectedTool = {};
      for (var i = 0; i < this.tools.length; i++) {
        var tool = this.tools[i];
        if (mouseX >= tool.x && mouseX <= tool.x + tool.w
          && mouseY >= tool.y && mouseY <= tool.y + tool.h) {
          selectedTool = tool;
        }
      }
      // set the drag flag
      isDragging = true;
    }

    this.toolbarCanvas.onmouseup = (e) => {
      this.toolbarCanvas.style.cursor = 'move';
      this.mainDiv.style.cursor = 'default';
      isDragging = false; 
    }

    this.toolbarCanvas.onmouseout = (e) => {
    }

    this.toolbarCanvas.onmousemove = (e) => {
      // Tell the browser we're handling this event
      e.preventDefault();
      e.stopPropagation();

      if(!_.isEmpty(selectedTool) && isDragging) {        
        const url = "url('" + selectedTool.url + "'), auto";
        this.toolbarCanvas.style.cursor = url;
        this.mainDiv.style.cursor = url;       
      }
    }    

    // MAIN CANVAS REGISTER EVENTS
    this.mainCanvas.onmouseup = (e) => {
      let mouseX = parseInt(e.clientX - offsetX);
      let mouseY = parseInt(e.clientY - offsetY);

      if (!_.isEmpty(selectedTool) && isDragging) {
        this.props.shapes.forEach(shape => {
          switch (shape.id) {
            case 1: // Circle
              if (mouseX >= shape.x - shape.r 
                && mouseX <= shape.x + shape.r
                && mouseY >= shape.y - shape.r 
                && mouseY <= shape.y + shape.r) {
                if (shape.active)
                  this.drawShapeByAction(selectedTool.id, shape.id);
              }
              break;
            case 2: // Triangle
              if (mouseX >= shape.points.b.x
                && mouseX <= shape.points.c.x
                && mouseY >= shape.points.a.y
                && mouseY <= shape.points.b.y) {
                if (shape.active)
                  this.drawShapeByAction(selectedTool.id, shape.id);
              }
              break;
            case 3: // Rectangle
              if (mouseX >= shape.x
                && mouseX <= shape.x + shape.width
                && mouseY >= shape.y
                && mouseY <= shape.y + shape.height) {
                if (shape.active)
                  this.drawShapeByAction(selectedTool.id, shape.id);
              }
              break;
          }         
        });

        // Reset values
        this.toolbarCanvas.style.cursor = 'move';
        this.mainDiv.style.cursor = 'default';
        selectedTool = {};
        isDragging = false;
      }             
    }         
  }

  drawShapes() {
    if (this.props.shapes) {
      
      const ctx = this.mainCanvas.getContext("2d");

      this.props.shapes.forEach(shape => {
        if(shape.active) {
          const distance = 10;
          
          switch(shape.name){
            case "circle":
              ctx.beginPath();
              ctx.fillStyle = shape.fillStyle;
              ctx.strokeStyle = shape.strokeStyle;   
              ctx.lineWidth = 2;  

              if (shape.fullShape) { // Draw full shape 
                ctx.arc(shape.x, shape.y, shape.r, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
              }
              else { // Draw two semi circles
                // Draw the first semi circle
                ctx.arc(shape.x, shape.y, shape.r, 0.5 * Math.PI, 1.5 * Math.PI);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();                

                // Draw the second semi circle
                const newX = parseInt(shape.x) + parseInt(shape.r);
                ctx.moveTo(newX, shape.y);
                ctx.arc(newX, shape.y, shape.r, 1.5 * Math.PI, 0.5 * Math.PI);
                ctx.closePath(); // This command must before fill and stroke
                ctx.fill();
                ctx.stroke();               
              }
              break;
            case "rectangle":
              ctx.beginPath();
              ctx.fillStyle = shape.fillStyle;
              ctx.strokeStyle = shape.strokeStyle;
              ctx.lineWidth = 2;

              if (shape.fullShape) { // Draw full shape                
                ctx.fillRect(shape.x, shape.y, shape.width, shape.height);                
                ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
              }
              else { // the shape is being cutted a half
                // Draw the first rectangle
                const w =  Math.floor(shape.width / 2);               
                ctx.fillRect(shape.x, shape.y, w, shape.height);                            
                ctx.strokeRect(shape.x, shape.y, w, shape.height);
                
                // Draw the second rectangle
                const newX = parseInt(shape.x) + 2 * distance + w;
                ctx.fillRect(newX, shape.y, w, shape.height);
                ctx.strokeRect(newX, shape.y, w, shape.height);
              }
              break;
            case "triangle":
              ctx.beginPath();
              ctx.fillStyle = shape.fillStyle; 
              ctx.strokeStyle = shape.strokeStyle;
              ctx.lineWidth = 2;

              if (shape.fullShape) { // Draw full shape 
                ctx.moveTo(shape.points.a.x, shape.points.a.y); // Point A
                ctx.lineTo(shape.points.b.x, shape.points.b.y); // Point B
                ctx.lineTo(shape.points.c.x, shape.points.c.y); // Point C
                ctx.closePath(); // Join C & A               
                ctx.fill();
                ctx.stroke();
              }
              else { // Draw two semi triangles
                // Draw the first semi triangle
                ctx.moveTo(shape.points.a.x, shape.points.a.y); // Point A
                ctx.lineTo(shape.points.b.x, shape.points.b.y); // Point B
                ctx.lineTo(shape.points.a.x, shape.points.c.y); // Point C
                ctx.closePath(); // Join C & A               
                ctx.fill();
                ctx.stroke();

                // Draw the second semi triangle
                const newX1 = parseInt(shape.points.a.x) + distance;
                const newX2 = parseInt(shape.points.c.x) + distance; 
                ctx.moveTo(newX1, shape.points.a.y); // Point A
                ctx.lineTo(newX1, shape.points.b.y); // Point B
                ctx.lineTo(newX2, shape.points.c.y); // Point C
                ctx.closePath(); // Join C & A               
                ctx.fill();
                ctx.stroke();
              }
              break;
          }          
        }
      });
    }
  }

  drawShapeByAction(toolId, shapeId) {
    switch(toolId) {
      case 1: // Scissor
        this.props.drawSemiShape(shapeId);
        break;
      case 2: // Eraser
        this.props.removeShape(shapeId);
        break;
      case 3: // Glue
        this.props.drawFullShape(shapeId);
        break;
    }
  }

  render() {
    return (
      <div className='canvas-container' ref={(cv) => this.mainDiv = cv}>
        <div className='canvas'>
          <canvas
            id='mainCanvas'
            ref={(cv) => this.mainCanvas = cv}
            width={this.props.canvas.main.width}
            height={this.props.canvas.main.height}>
          </canvas>
        </div>
        <div className='canvas'>
          <canvas
            id='toolbarCanvas'
            className='grabbable-canvas'
            ref={(cv) => this.toolbarCanvas = cv}
            width={this.props.canvas.toolbar.toolbarCanvas ?
              this.props.canvas.toolbar.toolbarCanvas.width : 0}
            height={this.props.canvas.toolbar.toolbarCanvas ?
              this.props.canvas.toolbar.toolbarCanvas.height : 0}>
          </canvas>
        </div>       
      </div >
    );
  }
}
