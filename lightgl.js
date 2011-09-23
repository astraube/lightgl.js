/*
 * lightgl.js
 * http://github.com/evanw/lightgl.js/
 *
 * Copyright 2011 Evan Wallace
 * Released under the MIT license
 */
(function(){function w(b){window.handleError&&window.handleError(b);throw b;}function y(b){return new Vector((b&1)*2-1,(b&2)-1,(b&4)/2-1)}window.onload=function(){function b(f){mouseX=f.pageX;mouseY=f.pageY;for(var k=gl.canvas;k;k=k.offsetParent){mouseX-=k.offsetLeft;mouseY-=k.offsetTop}deltaMouseX=mouseX-h;deltaMouseY=mouseY-g;h=mouseX;g=mouseY;f.preventDefault()}function c(f){switch(f){case 8:return"BACKSPACE";case 9:return"TAB";case 13:return"ENTER";case 16:return"SHIFT";case 27:return"ESCAPE";
case 32:return"SPACE";case 37:return"LEFT";case 38:return"UP";case 39:return"RIGHT";case 40:return"DOWN"}return f>=65&&f<=90?String.fromCharCode(f):f}function a(){var f=new Date;if(gl.autoDraw){window.update&&window.update((f-z)/1E3);window.draw&&window.draw();C(a)}else setTimeout(a,100);z=f}var d=document.createElement("canvas");d.width=800;d.height=600;window.gl=null;try{gl=d.getContext("webgl")}catch(e){}try{gl=gl||d.getContext("experimental-webgl")}catch(i){}gl||w("WebGL not supported");window.LEFT_BUTTON=
1;window.MIDDLE_BUTTON=2;window.RIGHT_BUTTON=4;window.mouseX=window.mouseY=window.deltaMouseX=window.deltaMouseY=0;window.mouseButton=window.mouseButtons=0;window.mouseDragging=false;var h=0,g=0;gl.canvas.onmousedown=function(f){b(f);mouseDragging=true;mouseButton=1<<f.which-1;mouseButtons|=mouseButton;window.mousePressed&&window.mousePressed()};document.onmousemove=function(f){b(f);if(!mouseDragging&&window.mouseMoved)window.mouseMoved();else mouseDragging&&window.mouseDragged&&window.mouseDragged()};
document.onmouseup=function(f){b(f);mouseDragging=false;mouseButton=1<<f.which-1;mouseButtons&=~mouseButton;window.mouseReleased&&window.mouseReleased()};gl.canvas.oncontextmenu=function(f){f.preventDefault()};window.onblur=function(){mouseDragging=false;mouseButtons=0;keys={}};window.key=null;window.keys={};document.onkeydown=function(f){if(!f.altKey&&!f.ctrlKey&&!f.metaKey){key=c(f.keyCode);keys[key]=true;window.keyPressed&&window.keyPressed()}};document.onkeyup=function(f){if(!f.altKey&&!f.ctrlKey&&
!f.metaKey){key=c(f.keyCode);keys[key]=false;window.keyReleased&&window.keyReleased()}};gl.fullscreen=function(f){f=f||{};var k=f.paddingTop||0,m=f.paddingLeft||0,o=f.paddingRight||0,s=f.paddingBottom||0;document.body.appendChild(gl.canvas);gl.canvas.style.position="absolute";gl.canvas.style.left=m+"px";gl.canvas.style.top=k+"px";window.onresize=function(){gl.canvas.width=window.innerWidth-m-o;gl.canvas.height=window.innerHeight-k-s;gl.viewport(0,0,gl.canvas.width,gl.canvas.height);if(f.camera||!("camera"in
f)){gl.matrixMode(gl.PROJECTION);gl.loadIdentity();gl.perspective(f.fov||45,gl.canvas.width/gl.canvas.height,f.near||0.1,f.far||1E3);gl.matrixMode(gl.MODELVIEW)}A&&draw()};window.onresize()};gl.MODELVIEW=305397761;gl.PROJECTION=305397762;var j=new Matrix,n=new Matrix;gl.modelviewMatrix=new Matrix;gl.projectionMatrix=new Matrix;var l=[],r=[],t,u;gl.matrixMode=function(f){switch(f){case gl.MODELVIEW:t="modelviewMatrix";u=l;break;case gl.PROJECTION:t="projectionMatrix";u=r;break;default:w("invalid matrix mode "+
f)}};gl.loadIdentity=function(){Matrix.identity(gl[t])};gl.loadMatrix=function(f){f=f.m;for(var k=gl[t].m,m=0;m<16;m++)k[m]=f[m]};gl.multMatrix=function(f){gl.loadMatrix(Matrix.multiply(gl[t],f,n))};gl.perspective=function(f,k,m,o){gl.multMatrix(Matrix.perspective(f,k,m,o,j))};gl.frustum=function(f,k,m,o,s,p){gl.multMatrix(Matrix.frustum(f,k,m,o,s,p,j))};gl.ortho=function(f,k,m,o,s,p){gl.multMatrix(Matrix.ortho(f,k,m,o,s,p,j))};gl.scale=function(f,k,m){gl.multMatrix(Matrix.scale(f,k,m,j))};gl.translate=
function(f,k,m){gl.multMatrix(Matrix.translate(f,k,m,j))};gl.rotate=function(f,k,m,o){gl.multMatrix(Matrix.rotate(f,k,m,o,j))};gl.lookAt=function(f,k,m,o,s,p,D,E,F){gl.multMatrix(Matrix.lookAt(f,k,m,o,s,p,D,E,F,j))};gl.pushMatrix=function(){u.push(Array.prototype.slice.call(gl[t].m))};gl.popMatrix=function(){gl[t].m=u.pop()};gl.project=function(f,k,m,o,s,p){o=o||gl.modelviewMatrix;s=s||gl.projectionMatrix;p=p||gl.getParameter(gl.VIEWPORT);f=s.transformPoint(o.transformPoint(new Vector(f,k,m)));return new Vector(p[0]+
p[2]*(f.x*0.5+0.5),p[1]+p[3]*(f.y*0.5+0.5),f.z*0.5+0.5)};gl.unProject=function(f,k,m,o,s,p){o=o||gl.modelviewMatrix;s=s||gl.projectionMatrix;p=p||gl.getParameter(gl.VIEWPORT);f=new Vector((f-p[0])/p[2]*2-1,(k-p[1])/p[3]*2-1,m*2-1);return Matrix.inverse(Matrix.multiply(s,o,j),n).transformPoint(f)};gl.matrixMode(gl.MODELVIEW);var q={mesh:new Mesh({normals:false,coords:false,triangles:false}),mode:-1,color:new Vector(1,1,1),pointSize:1,shader:new Shader("uniform float pointSize;attribute vec3 color;varying vec3 c;void main(){c=color;gl_Position=gl_ModelViewProjectionMatrix*vec4(gl_Vertex,1.0);gl_PointSize=pointSize;}",
"varying vec3 c;void main(){gl_FragColor=vec4(c,1.0);}")};q.mesh.addVertexBuffer("colors","color");gl.pointSize=function(f){q.pointSize=f};gl.begin=function(f){if(q.mode!=-1)throw"mismatched gl.begin() and gl.end() calls";q.mode=f;q.mesh.vertices=[];q.mesh.colors=[]};gl.color=function(f,k,m){q.color=arguments.length==1?f.toArray():[f,k,m]};gl.vertex=function(f,k,m){q.mesh.colors.push(q.color);q.mesh.vertices.push(arguments.length==1?
f.toArray():[f,k,m])};gl.end=function(){if(q.mode==-1)throw"mismatched gl.begin() and gl.end() calls";q.mesh.compile();q.shader.uniforms({pointSize:q.pointSize}).draw(q.mesh,q.mode);q.mode=-1};gl.clearColor(0,0,0,1);gl.enable(gl.DEPTH_TEST);var C=window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(f){setTimeout(f,1E3/60)},z=new Date;gl.autoDraw=true;var A=false;window.setup&&window.setup();A=true;a()};var G=typeof Float32Array!="undefined";Matrix=function(){var b=Array.prototype.concat.apply([],
arguments);b.length||(b=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);this.m=G?new Float32Array(b):b};Matrix.prototype.inverse=function(){return Matrix.inverse(this,new Matrix)};Matrix.prototype.transpose=function(){return Matrix.transpose(this,new Matrix)};Matrix.prototype.multiply=function(b){return Matrix.multiply(this,b,new Matrix)};Matrix.prototype.transformPoint=function(b){var c=this.m;return(new Vector(c[0]*b.x+c[1]*b.y+c[2]*b.z+c[3],c[4]*b.x+c[5]*b.y+c[6]*b.z+c[7],c[8]*b.x+c[9]*b.y+c[10]*b.z+c[11])).divide(c[12]*
b.x+c[13]*b.y+c[14]*b.z+c[15])};Matrix.prototype.transformVector=function(b){var c=this.m;return new Vector(c[0]*b.x+c[1]*b.y+c[2]*b.z,c[4]*b.x+c[5]*b.y+c[6]*b.z,c[8]*b.x+c[9]*b.y+c[10]*b.z)};Matrix.inverse=function(b,c){c=c||new Matrix;var a=b.m,d=c.m;d[0]=a[5]*a[10]*a[15]-a[5]*a[14]*a[11]-a[6]*a[9]*a[15]+a[6]*a[13]*a[11]+a[7]*a[9]*a[14]-a[7]*a[13]*a[10];d[1]=-a[1]*a[10]*a[15]+a[1]*a[14]*a[11]+a[2]*a[9]*a[15]-a[2]*a[13]*a[11]-a[3]*a[9]*a[14]+a[3]*a[13]*a[10];d[2]=a[1]*a[6]*a[15]-a[1]*a[14]*a[7]-
a[2]*a[5]*a[15]+a[2]*a[13]*a[7]+a[3]*a[5]*a[14]-a[3]*a[13]*a[6];d[3]=-a[1]*a[6]*a[11]+a[1]*a[10]*a[7]+a[2]*a[5]*a[11]-a[2]*a[9]*a[7]-a[3]*a[5]*a[10]+a[3]*a[9]*a[6];d[4]=-a[4]*a[10]*a[15]+a[4]*a[14]*a[11]+a[6]*a[8]*a[15]-a[6]*a[12]*a[11]-a[7]*a[8]*a[14]+a[7]*a[12]*a[10];d[5]=a[0]*a[10]*a[15]-a[0]*a[14]*a[11]-a[2]*a[8]*a[15]+a[2]*a[12]*a[11]+a[3]*a[8]*a[14]-a[3]*a[12]*a[10];d[6]=-a[0]*a[6]*a[15]+a[0]*a[14]*a[7]+a[2]*a[4]*a[15]-a[2]*a[12]*a[7]-a[3]*a[4]*a[14]+a[3]*a[12]*a[6];d[7]=a[0]*a[6]*a[11]-a[0]*
a[10]*a[7]-a[2]*a[4]*a[11]+a[2]*a[8]*a[7]+a[3]*a[4]*a[10]-a[3]*a[8]*a[6];d[8]=a[4]*a[9]*a[15]-a[4]*a[13]*a[11]-a[5]*a[8]*a[15]+a[5]*a[12]*a[11]+a[7]*a[8]*a[13]-a[7]*a[12]*a[9];d[9]=-a[0]*a[9]*a[15]+a[0]*a[13]*a[11]+a[1]*a[8]*a[15]-a[1]*a[12]*a[11]-a[3]*a[8]*a[13]+a[3]*a[12]*a[9];d[10]=a[0]*a[5]*a[15]-a[0]*a[13]*a[7]-a[1]*a[4]*a[15]+a[1]*a[12]*a[7]+a[3]*a[4]*a[13]-a[3]*a[12]*a[5];d[11]=-a[0]*a[5]*a[11]+a[0]*a[9]*a[7]+a[1]*a[4]*a[11]-a[1]*a[8]*a[7]-a[3]*a[4]*a[9]+a[3]*a[8]*a[5];d[12]=-a[4]*a[9]*a[14]+
a[4]*a[13]*a[10]+a[5]*a[8]*a[14]-a[5]*a[12]*a[10]-a[6]*a[8]*a[13]+a[6]*a[12]*a[9];d[13]=a[0]*a[9]*a[14]-a[0]*a[13]*a[10]-a[1]*a[8]*a[14]+a[1]*a[12]*a[10]+a[2]*a[8]*a[13]-a[2]*a[12]*a[9];d[14]=-a[0]*a[5]*a[14]+a[0]*a[13]*a[6]+a[1]*a[4]*a[14]-a[1]*a[12]*a[6]-a[2]*a[4]*a[13]+a[2]*a[12]*a[5];d[15]=a[0]*a[5]*a[10]-a[0]*a[9]*a[6]-a[1]*a[4]*a[10]+a[1]*a[8]*a[6]+a[2]*a[4]*a[9]-a[2]*a[8]*a[5];a=a[0]*d[0]+a[1]*d[4]+a[2]*d[8]+a[3]*d[12];for(var e=0;e<16;e++)d[e]/=a;return c};Matrix.transpose=function(b,c){c=
c||new Matrix;var a=b.m,d=c.m;d[0]=a[0];d[1]=a[4];d[2]=a[8];d[3]=a[12];d[4]=a[1];d[5]=a[5];d[6]=a[9];d[7]=a[13];d[8]=a[2];d[9]=a[6];d[10]=a[10];d[10]=a[14];d[12]=a[3];d[13]=a[7];d[14]=a[11];d[15]=a[15];return c};Matrix.multiply=function(b,c,a){a=a||new Matrix;b=b.m;c=c.m;var d=a.m;d[0]=b[0]*c[0]+b[1]*c[4]+b[2]*c[8]+b[3]*c[12];d[1]=b[0]*c[1]+b[1]*c[5]+b[2]*c[9]+b[3]*c[13];d[2]=b[0]*c[2]+b[1]*c[6]+b[2]*c[10]+b[3]*c[14];d[3]=b[0]*c[3]+b[1]*c[7]+b[2]*c[11]+b[3]*c[15];d[4]=b[4]*c[0]+b[5]*c[4]+b[6]*c[8]+
b[7]*c[12];d[5]=b[4]*c[1]+b[5]*c[5]+b[6]*c[9]+b[7]*c[13];d[6]=b[4]*c[2]+b[5]*c[6]+b[6]*c[10]+b[7]*c[14];d[7]=b[4]*c[3]+b[5]*c[7]+b[6]*c[11]+b[7]*c[15];d[8]=b[8]*c[0]+b[9]*c[4]+b[10]*c[8]+b[11]*c[12];d[9]=b[8]*c[1]+b[9]*c[5]+b[10]*c[9]+b[11]*c[13];d[10]=b[8]*c[2]+b[9]*c[6]+b[10]*c[10]+b[11]*c[14];d[11]=b[8]*c[3]+b[9]*c[7]+b[10]*c[11]+b[11]*c[15];d[12]=b[12]*c[0]+b[13]*c[4]+b[14]*c[8]+b[15]*c[12];d[13]=b[12]*c[1]+b[13]*c[5]+b[14]*c[9]+b[15]*c[13];d[14]=b[12]*c[2]+b[13]*c[6]+b[14]*c[10]+b[15]*c[14];
d[15]=b[12]*c[3]+b[13]*c[7]+b[14]*c[11]+b[15]*c[15];return a};Matrix.identity=function(b){b=b||new Matrix;var c=b.m;c[0]=c[5]=c[10]=c[15]=1;c[1]=c[2]=c[3]=c[4]=c[6]=c[7]=c[8]=c[9]=c[11]=c[12]=c[13]=c[14]=0;return b};Matrix.perspective=function(b,c,a,d,e){b=Math.tan(b*Math.PI/360)*a;c=b*c;return Matrix.frustum(-c,c,-b,b,a,d,e)};Matrix.frustum=function(b,c,a,d,e,i,h){h=h||new Matrix;var g=h.m;g[0]=2*e/(c-b);g[1]=0;g[2]=(c+b)/(c-b);g[3]=0;g[4]=0;g[5]=2*e/(d-a);g[6]=(d+a)/(d-a);g[7]=0;g[8]=0;g[9]=0;g[10]=
-(i+e)/(i-e);g[11]=-2*i*e/(i-e);g[12]=0;g[13]=0;g[14]=-1;g[15]=0;return h};Matrix.ortho=function(b,c,a,d,e,i,h){h=h||new Matrix;var g=h.m;g[0]=2/(c-b);g[1]=0;g[2]=0;g[3]=(c+b)/(c-b);g[4]=0;g[5]=2/(d-a);g[6]=0;g[7]=(d+a)/(d-a);g[8]=0;g[9]=0;g[10]=-2/(i-e);g[11]=(i+e)/(i-e);g[12]=0;g[13]=0;g[14]=0;g[15]=1;return h};Matrix.scale=function(b,c,a,d){d=d||new Matrix;var e=d.m;e[0]=b;e[1]=0;e[2]=0;e[3]=0;e[4]=0;e[5]=c;e[6]=0;e[7]=0;e[8]=0;e[9]=0;e[10]=a;e[11]=0;e[12]=0;e[13]=0;e[14]=0;e[15]=1;return d};Matrix.translate=
function(b,c,a,d){d=d||new Matrix;var e=d.m;e[0]=1;e[1]=0;e[2]=0;e[3]=b;e[4]=0;e[5]=1;e[6]=0;e[7]=c;e[8]=0;e[9]=0;e[10]=1;e[11]=a;e[12]=0;e[13]=0;e[14]=0;e[15]=1;return d};Matrix.rotate=function(b,c,a,d,e){if(!b||!c&&!a&&!d)return Matrix.identity(e);e=e||new Matrix;var i=e.m,h=Math.sqrt(c*c+a*a+d*d);b*=Math.PI/180;c/=h;a/=h;d/=h;h=Math.cos(b);b=Math.sin(b);var g=1-h;i[0]=c*c*g+h;i[1]=c*a*g-d*b;i[2]=c*d*g+a*b;i[3]=0;i[4]=a*c*g+d*b;i[5]=a*a*g+h;i[6]=a*d*g-c*b;i[7]=0;i[8]=d*c*g-a*b;i[9]=d*a*g+c*b;i[10]=
d*d*g+h;i[11]=0;i[12]=0;i[13]=0;i[14]=0;i[15]=1;return e};Matrix.lookAt=function(b,c,a,d,e,i,h,g,j,n){n=n||new Matrix;var l=n.m;b=new Vector(b,c,a);d=new Vector(d,e,i);g=new Vector(h,g,j);h=b.subtract(d).unit();g=g.cross(h).unit();j=h.cross(g).unit();l[0]=g.x;l[1]=g.y;l[2]=g.z;l[3]=-g.dot(b);l[4]=j.x;l[5]=j.y;l[6]=j.z;l[7]=-j.dot(b);l[8]=h.x;l[9]=h.y;l[10]=h.z;l[11]=-h.dot(b);l[12]=0;l[13]=0;l[14]=0;l[15]=1;return n};Indexer=function(){this.unique=[];this.indices=[];this.map={}};Indexer.prototype.add=
function(b){var c=JSON.stringify(b);if(!(c in this.map)){this.map[c]=this.unique.length;this.unique.push(b)}return this.map[c]};Buffer=function(b,c){this.buffer=null;this.target=b;this.type=c;this.data=[]};Buffer.prototype.compile=function(b){for(var c=[],a=0;a<this.data.length;a+=1E4)c=Array.prototype.concat.apply(c,this.data.slice(a,a+1E4));if(c.length){this.buffer=this.buffer||gl.createBuffer();this.buffer.length=c.length;this.buffer.spacing=c.length/this.data.length;gl.bindBuffer(this.target,
this.buffer);gl.bufferData(this.target,new this.type(c),b||gl.STATIC_DRAW)}};Mesh=function(b){b=b||{};this.vertexBuffers={};this.indexBuffers={};this.addVertexBuffer("vertices","gl_Vertex");if(!("coords"in b)||b.coords)this.addVertexBuffer("coords","gl_TexCoord");if(!("normals"in b)||b.normals)this.addVertexBuffer("normals","gl_Normal");if(!("triangles"in b)||b.triangles)this.addIndexBuffer("triangles");b.lines&&this.addIndexBuffer("lines")};Mesh.prototype.addVertexBuffer=function(b,c){(this.vertexBuffers[c]=
new Buffer(gl.ARRAY_BUFFER,Float32Array)).name=b;this[b]=[]};Mesh.prototype.addIndexBuffer=function(b){this.indexBuffers[b]=new Buffer(gl.ELEMENT_ARRAY_BUFFER,Int16Array);this[b]=[]};Mesh.prototype.compile=function(){for(var b in this.vertexBuffers){var c=this.vertexBuffers[b];c.data=this[c.name];c.compile()}for(var a in this.indexBuffers){c=this.indexBuffers[a];c.data=this[a];c.compile()}};Mesh.prototype.transform=function(b){this.vertices=this.vertices.map(function(a){return b.transformPoint(Vector.fromArray(a)).toArray()});
if(this.normals){var c=b.inverse().transpose();this.normals=this.normals.map(function(a){return c.transformVector(Vector.fromArray(a)).unit().toArray()})}this.compile();return this};Mesh.prototype.computeNormals=function(){this.normals||this.addVertexBuffer("normals","gl_Normal");for(var b=0;b<this.vertices.length;b++)this.normals[b]=new Vector;for(b=0;b<this.triangles.length;b++){var c=this.triangles[b],a=Vector.fromArray(this.vertices[c[0]]),d=Vector.fromArray(this.vertices[c[1]]),e=Vector.fromArray(this.vertices[c[2]]);
a=d.subtract(a).cross(e.subtract(a)).unit();this.normals[c[0]]=this.normals[c[0]].add(a);this.normals[c[1]]=this.normals[c[1]].add(a);this.normals[c[2]]=this.normals[c[2]].add(a)}for(b=0;b<this.vertices.length;b++)this.normals[b]=this.normals[b].unit().toArray();this.compile();return this};Mesh.prototype.computeWireframe=function(){for(var b=new Indexer,c=0;c<this.triangles.length;c++)for(var a=this.triangles[c],d=0;d<a.length;d++){var e=a[d],i=a[(d+1)%a.length];b.add([Math.min(e,i),Math.max(e,i)])}this.lines||
this.addIndexBuffer("lines");this.lines=b.unique;this.compile();return this};Mesh.prototype.getAABB=function(){var b={min:new Vector(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE)};b.max=b.min.negative();for(var c=0;c<this.vertices.length;c++){var a=Vector.fromArray(this.vertices[c]);b.min=Vector.min(b.min,a);b.max=Vector.max(b.max,a)}return b};Mesh.prototype.getBoundingSphere=function(){var b=this.getAABB();b={center:b.min.add(b.max).divide(2),radius:0};for(var c=0;c<this.vertices.length;c++)b.radius=
Math.max(b.radius,Vector.fromArray(this.vertices[c]).subtract(b.center).length());return b};Mesh.plane=function(b,c,a){a=new Mesh(a);b=b||1;c=c||1;for(var d=0;d<=c;d++)for(var e=d/c,i=0;i<=b;i++){var h=i/b;a.vertices.push([2*h-1,2*e-1,0]);a.coords&&a.coords.push([h,e]);a.normals&&a.normals.push([0,0,1]);if(i<b&&d<c){h=i+d*(b+1);a.triangles.push([h,h+1,h+b+1]);a.triangles.push([h+b+1,h+1,h+b+2])}}a.compile();return a};var B=[[0,4,2,6,-1,0,0],[1,3,5,7,+1,0,0],[0,1,4,5,0,-1,0],[2,6,3,7,0,+1,0],[0,2,
1,3,0,0,-1],[4,5,6,7,0,0,+1]];Mesh.cube=function(b){b=new Mesh(b);for(var c=0;c<B.length;c++){for(var a=B[c],d=c*4,e=0;e<4;e++){b.vertices.push(y(a[e]).toArray());b.coords&&b.coords.push([e&1,(e&2)/2]);b.normals&&b.normals.push([a[4],a[5],a[6]])}b.triangles.push([d,d+1,d+2]);b.triangles.push([d+2,d+1,d+3])}b.compile();return b};Mesh.sphere=function(b,c){var a=new Mesh(c),d=new Indexer;b=b||6;for(var e=0;e<8;e++)for(var i=y(e),h=i.x*i.y*i.z>0,g=[],j=0;j<=b;j++){for(var n=0;j+n<=b;n++){var l=j/b,r=
n/b,t=(b-j-n)/b;r={vertex:(new Vector(l+(l-l*l)/2,r+(r-r*r)/2,t+(t-t*t)/2)).unit().multiply(i).toArray()};if(a.coords)r.coord=i.y>0?[1-l,t]:[t,1-l];g.push(d.add(r))}if(j>0)for(n=0;j+n<=b;n++){l=(j-1)*(b+1)+(j-1-(j-1)*(j-1))/2+n;r=j*(b+1)+(j-j*j)/2+n;a.triangles.push(h?[g[l],g[r],g[l+1]]:[g[l],g[l+1],g[r]]);j+n<b&&a.triangles.push(h?[g[r],g[r+1],g[l+1]]:[g[r],g[l+1],g[r+1]])}}a.vertices=d.unique.map(function(u){return u.vertex});if(a.coords)a.coords=d.unique.map(function(u){return u.coord});if(a.normals)a.normals=
a.vertices;a.compile();return a};Mesh.load=function(b,c){c=c||{};if(!b.coords)c.coords=false;if(!b.normals)c.normals=false;var a=new Mesh(c);a.vertices=b.vertices;if(a.coords)a.coords=b.coords;if(a.normals)a.normals=b.normals;a.triangles=b.triangles||[];a.lines=b.lines||[];a.compile();return a};HitTest=function(b,c,a){this.t=arguments.length?b:Number.MAX_VALUE;this.hit=c;this.normal=a};HitTest.prototype.mergeWith=function(b){if(b.t>0&&b.t<this.t){this.t=b.t;this.hit=b.hit;this.normal=b.normal}};Raytracer=
function(){var b=gl.getParameter(gl.VIEWPORT),c=gl.modelviewMatrix.m,a=new Vector(c[0],c[4],c[8]),d=new Vector(c[1],c[5],c[9]),e=new Vector(c[2],c[6],c[10]);c=new Vector(c[3],c[7],c[11]);this.eye=new Vector(-c.dot(a),-c.dot(d),-c.dot(e));a=b[0];d=a+b[2];e=b[1];c=e+b[3];this.ray00=gl.unProject(a,e,1).subtract(this.eye);this.ray10=gl.unProject(d,e,1).subtract(this.eye);this.ray01=gl.unProject(a,c,1).subtract(this.eye);this.ray11=gl.unProject(d,c,1).subtract(this.eye);this.viewport=b};Raytracer.prototype.getRayForPixel=
function(b,c){b=(b-this.viewport[0])/this.viewport[2];c=1-(c-this.viewport[1])/this.viewport[3];var a=Vector.lerp(this.ray00,this.ray10,b),d=Vector.lerp(this.ray01,this.ray11,b);return Vector.lerp(a,d,c).unit()};Raytracer.hitTestBox=function(b,c,a,d){var e=a.subtract(b).divide(c),i=d.subtract(b).divide(c),h=Vector.min(e,i);e=Vector.max(e,i);h=h.max();e=e.min();if(h>0&&h<e){b=b.add(c.multiply(h));a=a.add(1.0E-6);d=d.subtract(1.0E-6);return new HitTest(h,b,new Vector((b.x>d.x)-(b.x<a.x),(b.y>d.y)-(b.y<
a.y),(b.z>d.z)-(b.z<a.z)))}return null};Raytracer.hitTestSphere=function(b,c,a,d){var e=b.subtract(a),i=c.dot(c),h=2*c.dot(e);e=e.dot(e)-d*d;e=h*h-4*i*e;if(e>0){i=(-h-Math.sqrt(e))/(2*i);b=b.add(c.multiply(i));return new HitTest(i,b,b.subtract(a).divide(d))}return null};Raytracer.hitTestTriangle=function(b,c,a,d,e){var i=d.subtract(a),h=e.subtract(a);e=i.cross(h).unit();d=e.dot(a.subtract(b)).divide(e.dot(c));if(d>0){b=b.add(c.multiply(d));var g=b.subtract(a);a=h.dot(h);c=h.dot(i);h=h.dot(g);var j=
i.dot(i);i=i.dot(g);g=a*j-c*c;j=(j*h-c*i)/g;i=(a*i-c*h)/g;if(j>=0&&i>=0&&j+i<=1)return new HitTest(d,b,e)}return null};Shader=function(b,c){function a(h,g,j){for(;(result=h.exec(g))!=null;)j(result)}function d(h,g){var j=/^((\s*\/\/.*\n|\s*#extension.*\n)+)[^]*$/.exec(g);g=j?j[1]+h+g.substr(j[1].length):h+g;a(/\bgl_\w+\b/g,h,function(n){g=g.replace(RegExp(n,"g"),"_"+n)});return g}function e(h,g){var j=gl.createShader(h);gl.shaderSource(j,g);gl.compileShader(j);gl.getShaderParameter(j,gl.COMPILE_STATUS)||
w("compile error: "+gl.getShaderInfoLog(j));return j}b=d("attribute vec3 gl_Vertex;attribute vec2 gl_TexCoord;attribute vec3 gl_Normal;uniform mat4 gl_ModelViewMatrix;uniform mat4 gl_ProjectionMatrix;uniform mat4 gl_ModelViewProjectionMatrix;",b);c=d("precision highp float;uniform mat4 gl_ModelViewMatrix;uniform mat4 gl_ProjectionMatrix;uniform mat4 gl_ModelViewProjectionMatrix;",c);this.program=gl.createProgram();
gl.attachShader(this.program,e(gl.VERTEX_SHADER,b));gl.attachShader(this.program,e(gl.FRAGMENT_SHADER,c));gl.linkProgram(this.program);gl.getProgramParameter(this.program,gl.LINK_STATUS)||w("link error: "+gl.getProgramInfoLog(this.program));this.attributes={};var i={};a(/uniform\s+sampler(1D|2D|3D|Cube)\s+(\w+)\s*;/g,b+c,function(h){i[h[2]]=1});this.isSampler=i;this.needsMVP=(b+c).indexOf("gl_ModelViewProjectionMatrix")!=-1};Shader.prototype.uniforms=function(b){gl.useProgram(this.program);for(var c in b){var a=
gl.getUniformLocation(this.program,c);if(a){var d=b[c];if(d instanceof Vector)d=[d.x,d.y,d.z];else if(d instanceof Matrix)d=d.m;var e=Object.prototype.toString.call(d);if(e=="[object Array]"||e=="[object Float32Array]")switch(d.length){case 1:gl.uniform1fv(a,new Float32Array(d));break;case 2:gl.uniform2fv(a,new Float32Array(d));break;case 3:gl.uniform3fv(a,new Float32Array(d));break;case 4:gl.uniform4fv(a,new Float32Array(d));break;case 9:gl.uniformMatrix3fv(a,false,new Float32Array([d[0],d[3],d[6],
d[1],d[4],d[7],d[2],d[5],d[8]]));break;case 16:gl.uniformMatrix4fv(a,false,new Float32Array([d[0],d[4],d[8],d[12],d[1],d[5],d[9],d[13],d[2],d[6],d[10],d[14],d[3],d[7],d[11],d[15]]));break;default:w("don't know how to load uniform \""+c+'" of length '+d.length)}else Object.prototype.toString.call(d)=="[object Number]"?(this.isSampler[c]?gl.uniform1i:gl.uniform1f).call(gl,a,d):w('attempted to set uniform "'+c+'" to invalid value '+d)}}return this};Shader.prototype.draw=function(b,c){this.drawBuffers(b.vertexBuffers,
b.indexBuffers[c==gl.LINES?"lines":"triangles"],arguments.length<2?gl.TRIANGLES:c)};Shader.prototype.drawBuffers=function(b,c,a){this.uniforms({_gl_ModelViewMatrix:gl.modelviewMatrix,_gl_ProjectionMatrix:gl.projectionMatrix});this.needsMVP&&this.uniforms({_gl_ModelViewProjectionMatrix:gl.projectionMatrix.multiply(gl.modelviewMatrix)});var d=0,e;for(e in b){var i=b[e],h=this.attributes[e]||gl.getAttribLocation(this.program,e.replace(/^gl_/,"_gl_"));if(h!=-1){this.attributes[e]=h;gl.bindBuffer(gl.ARRAY_BUFFER,
i.buffer);gl.enableVertexAttribArray(h);gl.vertexAttribPointer(h,i.buffer.spacing,gl.FLOAT,false,0,0);d=i.buffer.length/i.buffer.spacing}}for(e in this.attributes)e in b||gl.disableVertexAttribArray(this.attributes[e]);if(c){gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,c.buffer);gl.drawElements(a,c.buffer.length,gl.UNSIGNED_SHORT,0)}else gl.drawArrays(a,0,d);return this};Texture=function(b,c,a){a=a||{};this.id=gl.createTexture();this.width=b;this.height=c;this.format=a.format||gl.RGBA;this.type=a.type||
gl.UNSIGNED_BYTE;gl.bindTexture(gl.TEXTURE_2D,this.id);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,1);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,a.filter||a.magFilter||gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,a.filter||a.minFilter||gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,a.wrap||a.wrapS||gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,a.wrap||a.wrapT||gl.CLAMP_TO_EDGE);gl.texImage2D(gl.TEXTURE_2D,0,this.format,b,c,0,this.format,this.type,
null)};Texture.prototype.bind=function(b){gl.activeTexture(gl.TEXTURE0+(b||0));gl.bindTexture(gl.TEXTURE_2D,this.id)};Texture.prototype.unbind=function(b){gl.activeTexture(gl.TEXTURE0+(b||0));gl.bindTexture(gl.TEXTURE_2D,null)};var x,v;Texture.prototype.drawTo=function(b){var c=gl.getParameter(gl.VIEWPORT);x=x||gl.createFramebuffer();v=v||gl.createRenderbuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,x);gl.bindRenderbuffer(gl.RENDERBUFFER,v);if(this.width!=v.width||this.height!=v.height){v.width=this.width;
v.height=this.height;gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_COMPONENT16,this.width,this.height)}gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,this.id,0);gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.RENDERBUFFER,v);gl.viewport(0,0,this.width,this.height);b();gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.bindRenderbuffer(gl.RENDERBUFFER,null);gl.viewport(c[0],c[1],c[2],c[3])};Texture.prototype.swapWith=function(b){var c;c=b.id;b.id=this.id;this.id=
c;c=b.width;b.width=this.width;this.width=c;c=b.height;b.height=this.height;this.height=c};Texture.fromImage=function(b,c){c=c||{};var a=new Texture(b.width,b.height,c);gl.texImage2D(gl.TEXTURE_2D,0,a.format,a.format,a.type,b);c.minFilter&&c.minFilter!=gl.NEAREST&&c.minFilter!=gl.LINEAR&&gl.generateMipmap(gl.TEXTURE_2D);return a};Vector=function(b,c,a){this.x=b||0;this.y=c||0;this.z=a||0};Vector.prototype.negative=function(){return new Vector(-this.x,-this.y,-this.z)};Vector.prototype.add=function(b){return b instanceof
Vector?new Vector(this.x+b.x,this.y+b.y,this.z+b.z):new Vector(this.x+b,this.y+b,this.z+b)};Vector.prototype.subtract=function(b){return b instanceof Vector?new Vector(this.x-b.x,this.y-b.y,this.z-b.z):new Vector(this.x-b,this.y-b,this.z-b)};Vector.prototype.multiply=function(b){return b instanceof Vector?new Vector(this.x*b.x,this.y*b.y,this.z*b.z):new Vector(this.x*b,this.y*b,this.z*b)};Vector.prototype.divide=function(b){return b instanceof Vector?new Vector(this.x/b.x,this.y/b.y,this.z/b.z):new Vector(this.x/
b,this.y/b,this.z/b)};Vector.prototype.equals=function(b){return this.x==b.x&&this.y==b.y&&this.z==b.z};Vector.prototype.dot=function(b){return this.x*b.x+this.y*b.y+this.z*b.z};Vector.prototype.cross=function(b){return new Vector(this.y*b.z-this.z*b.y,this.z*b.x-this.x*b.z,this.x*b.y-this.y*b.x)};Vector.prototype.length=function(){return Math.sqrt(this.dot(this))};Vector.prototype.unit=function(){return this.divide(this.length())};Vector.prototype.min=function(){return Math.min(Math.min(this.x,this.y),
this.z)};Vector.prototype.max=function(){return Math.max(Math.max(this.x,this.y),this.z)};Vector.prototype.toAngles=function(){return{theta:Math.atan2(this.z,this.x),phi:Math.asin(this.y/this.length())}};Vector.prototype.toArray=function(b){return[this.x,this.y,this.z].slice(0,b||3)};Vector.prototype.clone=function(){return new Vector(this.x,this.y,this.z)};Vector.prototype.init=function(b,c,a){this.x=b;this.y=c;this.z=a;return this};Vector.negative=function(b,c){c.x=-b.x;c.y=-b.y;c.z=-b.z;return c};
Vector.add=function(b,c,a){if(c instanceof Vector){a.x=b.x+c.x;a.y=b.y+c.y;a.z=b.z+c.z}else{a.x=b.x+c;a.y=b.y+c;a.z=b.z+c}return a};Vector.subtract=function(b,c,a){if(c instanceof Vector){a.x=b.x-c.x;a.y=b.y-c.y;a.z=b.z-c.z}else{a.x=b.x-c;a.y=b.y-c;a.z=b.z-c}return a};Vector.multiply=function(b,c,a){if(c instanceof Vector){a.x=b.x*c.x;a.y=b.y*c.y;a.z=b.z*c.z}else{a.x=b.x*c;a.y=b.y*c;a.z=b.z*c}return a};Vector.divide=function(b,c,a){if(c instanceof Vector){a.x=b.x/c.x;a.y=b.y/c.y;a.z=b.z/c.z}else{a.x=
b.x/c;a.y=b.y/c;a.z=b.z/c}return a};Vector.cross=function(b,c,a){a.x=b.y*c.z-b.z*c.y;a.y=b.z*c.x-b.x*c.z;a.z=b.x*c.y-b.y*c.x;return a};Vector.unit=function(b,c){var a=b.length();c.x=b.x/a;c.y=b.y/a;c.z=b.z/a;return c};Vector.fromAngles=function(b,c){return new Vector(Math.cos(b)*Math.cos(c),Math.sin(c),Math.sin(b)*Math.cos(c))};Vector.randomDirection=function(){return Vector.fromAngles(Math.random()*Math.PI*2,Math.asin(Math.random()*2-1))};Vector.min=function(b,c){return new Vector(Math.min(b.x,c.x),
Math.min(b.y,c.y),Math.min(b.z,c.z))};Vector.max=function(b,c){return new Vector(Math.max(b.x,c.x),Math.max(b.y,c.y),Math.max(b.z,c.z))};Vector.lerp=function(b,c,a){return c.subtract(b).multiply(a).add(b)};Vector.fromArray=function(b){return new Vector(b[0],b[1],b[2])}})();
