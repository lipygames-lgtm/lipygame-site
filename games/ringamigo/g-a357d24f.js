(()=>{var rf=0,ch=1,sf=2;var sr=1,of=2,es=3,jn=0,Jt=1,hn=2,Kn=0,ts=1,lh=2,hh=3,uh=4,af=5;var or=100,cf=101,lf=102,hf=103,uf=104,df=200,ff=201,pf=202,mf=203,dh=204,fh=205,gf=206,bf=207,xf=208,vf=209,_f=210,yf=211,Mf=212,Sf=213,Ef=214,ga=0,ba=1,xa=2,Lr=3,va=4,_a=5,ya=6,Ma=7,Ja=0,Tf=1,wf=2,Dn=0,ph=1,mh=2,gh=3,fo=4,bh=5,xh=6,vh=7,Kl="attached",Af="detached",_h=300,Li=301,ar=302,Ya=303,Za=304,po=306,Ei=1e3,Mn=1001,Dr=1002,Lt=1003,$a=1004;var cr=1005;var Dt=1006,ns=1007;var Nn=1008;var un=1009,yh=1010,Mh=1011,is=1012,Qa=1013,Un=1014,xn=1015,On=1016,ec=1017,tc=1018,rs=1020,Sh=35902,Eh=35899,Th=1021,wh=1022,vn=1023,Vn=1026,Di=1027,nc=1028,ic=1029,Ni=1030,rc=1031;var sc=1033,mo=33776,go=33777,bo=33778,xo=33779,oc=35840,ac=35841,cc=35842,lc=35843,hc=36196,uc=37492,dc=37496,fc=37488,pc=37489,vo=37490,mc=37491,gc=37808,bc=37809,xc=37810,vc=37811,_c=37812,yc=37813,Mc=37814,Sc=37815,Ec=37816,Tc=37817,wc=37818,Ac=37819,Rc=37820,Cc=37821,Pc=36492,Ic=36494,Fc=36495,Lc=36283,Dc=36284,_o=36285,Nc=36286,Uc=2200,Rf=2201,Cf=2202,Ji=2300,Yi=2301,fa=2302,Jl=2303,qi=2400,Xi=2401,Fs=2402,Oc=2500,Pf=2501,Ah=0,yo=1,ss=2,If=3200;var Mo=0,Ff=1,fi="",wt="srgb",sn="srgb-linear",Ls="linear",dt="srgb";var pa=7680;var Lf=519,Df=512,Nf=513,Uf=514,Bc=515,Of=516,Bf=517,kc=518,kf=519,Rh=35044,Ch=35048;var Ph="300 es",In=2e3,Nr=2001;function Xm(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function jm(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Ur(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function zf(){let i=Ur("canvas");return i.style.display="block",i}var dd={},Or=null;function Ds(...i){let e="THREE."+i.shift();Or?Or("log",e,...i):console.log(e,...i)}function Gf(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Pe(...i){i=Gf(i);let e="THREE."+i.shift();if(Or)Or("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Be(...i){i=Gf(i);let e="THREE."+i.shift();if(Or)Or("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Ki(...i){let e=i.join(" ");e in dd||(dd[e]=!0,Pe(...i))}function Hf(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}var Vf={[ga]:ba,[xa]:ya,[va]:Ma,[Lr]:_a,[ba]:ga,[ya]:xa,[Ma]:va,[_a]:Lr},Fn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}},Zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],fd=1234567,Rs=Math.PI/180,Zi=180/Math.PI;function Sn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Zt[i&255]+Zt[i>>8&255]+Zt[i>>16&255]+Zt[i>>24&255]+"-"+Zt[e&255]+Zt[e>>8&255]+"-"+Zt[e>>16&15|64]+Zt[e>>24&255]+"-"+Zt[t&63|128]+Zt[t>>8&255]+"-"+Zt[t>>16&255]+Zt[t>>24&255]+Zt[n&255]+Zt[n>>8&255]+Zt[n>>16&255]+Zt[n>>24&255]).toLowerCase()}function Ze(i,e,t){return Math.max(e,Math.min(t,i))}function Ih(i,e){return(i%e+e)%e}function Km(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function Jm(i,e,t){return i!==e?(t-i)/(e-i):0}function Cs(i,e,t){return(1-t)*i+t*e}function Ym(i,e,t,n){return Cs(i,e,1-Math.exp(-t*n))}function Zm(i,e=1){return e-Math.abs(Ih(i,e*2)-e)}function $m(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Qm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function eg(i,e){return i+Math.floor(Math.random()*(e-i+1))}function tg(i,e){return i+Math.random()*(e-i)}function ng(i){return i*(.5-Math.random())}function ig(i){i!==void 0&&(fd=i);let e=fd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function rg(i){return i*Rs}function sg(i){return i*Zi}function og(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function ag(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function cg(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function lg(i,e,t,n,r){let s=Math.cos,o=Math.sin,a=s(t/2),c=o(t/2),l=s((e+n)/2),h=o((e+n)/2),u=s((e-n)/2),d=o((e-n)/2),f=s((n-e)/2),g=o((n-e)/2);switch(r){case"XYX":i.set(a*h,c*u,c*d,a*l);break;case"YZY":i.set(c*d,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*d,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*f,a*l);break;case"YXY":i.set(c*f,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*f,a*h,a*l);break;default:Pe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Pn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function pt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var So={DEG2RAD:Rs,RAD2DEG:Zi,generateUUID:Sn,clamp:Ze,euclideanModulo:Ih,mapLinear:Km,inverseLerp:Jm,lerp:Cs,damp:Ym,pingpong:Zm,smoothstep:$m,smootherstep:Qm,randInt:eg,randFloat:tg,randFloatSpread:ng,seededRandom:ig,degToRad:rg,radToDeg:sg,isPowerOfTwo:og,ceilPowerOfTwo:ag,floorPowerOfTwo:cg,setQuaternionFromProperEuler:lg,normalize:pt,denormalize:Pn},Oh=class Oh{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*r+e.x,this.y=s*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Oh.prototype.isVector2=!0;var ce=Oh,Ht=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,o,a){let c=n[r+0],l=n[r+1],h=n[r+2],u=n[r+3],d=s[o+0],f=s[o+1],g=s[o+2],_=s[o+3];if(u!==_||c!==d||l!==f||h!==g){let m=c*d+l*f+h*g+u*_;m<0&&(d=-d,f=-f,g=-g,_=-_,m=-m);let p=1-a;if(m<.9995){let M=Math.acos(m),T=Math.sin(M);p=Math.sin(p*M)/T,a=Math.sin(a*M)/T,c=c*p+d*a,l=l*p+f*a,h=h*p+g*a,u=u*p+_*a}else{c=c*p+d*a,l=l*p+f*a,h=h*p+g*a,u=u*p+_*a;let M=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=M,l*=M,h*=M,u*=M}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,s,o){let a=n[r],c=n[r+1],l=n[r+2],h=n[r+3],u=s[o],d=s[o+1],f=s[o+2],g=s[o+3];return e[t]=a*g+h*u+c*f-l*d,e[t+1]=c*g+h*d+l*u-a*f,e[t+2]=l*g+h*f+a*d-c*u,e[t+3]=h*g-a*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(r/2),u=a(s/2),d=c(n/2),f=c(r/2),g=c(s/2);switch(o){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:Pe("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(s-l)*f,this._z=(o-r)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(r+o)/f,this._z=(s+l)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(s-l)/f,this._x=(r+o)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-r)/f,this._x=(s+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ze(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+r*l-s*c,this._y=r*h+o*c+s*a-n*l,this._z=s*h+o*l+n*c-r*a,this._w=o*h-n*a-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,r=-r,s=-s,o=-o,a=-a);let c=1-t;if(a<.9995){let l=Math.acos(a),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Bh=class Bh{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(pd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(pd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*r-a*n),h=2*(a*t-s*r),u=2*(s*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-s*u,this.z=r+c*u+s*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=r*c-s*a,this.y=s*o-n*c,this.z=n*a-r*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return yl.copy(this).projectOnVector(e),this.sub(yl)}reflect(e){return this.sub(yl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Bh.prototype.isVector3=!0;var P=Bh,yl=new P,pd=new Ht,kh=class kh{constructor(e,t,n,r,s,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,c,l)}set(e,t,n,r,s,o,a,c,l){let h=this.elements;return h[0]=e,h[1]=r,h[2]=a,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=r[0],m=r[3],p=r[6],M=r[1],T=r[4],x=r[7],S=r[2],E=r[5],R=r[8];return s[0]=o*_+a*M+c*S,s[3]=o*m+a*T+c*E,s[6]=o*p+a*x+c*R,s[1]=l*_+h*M+u*S,s[4]=l*m+h*T+u*E,s[7]=l*p+h*x+u*R,s[2]=d*_+f*M+g*S,s[5]=d*m+f*T+g*E,s[8]=d*p+f*x+g*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*s*h+n*a*c+r*s*l-r*o*c}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,d=a*c-h*s,f=l*s-o*c,g=t*u+n*d+r*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return e[0]=u*_,e[1]=(r*l-h*n)*_,e[2]=(a*n-r*o)*_,e[3]=d*_,e[4]=(h*t-r*c)*_,e[5]=(r*s-a*t)*_,e[6]=f*_,e[7]=(n*c-l*t)*_,e[8]=(o*t-n*s)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,o,a){let c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-r*l,r*c,-r*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return Ki("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ml.makeScale(e,t)),this}rotate(e){return Ki("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ml.makeRotation(-e)),this}translate(e,t){return Ki("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ml.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};kh.prototype.isMatrix3=!0;var We=kh,Ml=new We,md=new We().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),gd=new We().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function hg(){let i={enabled:!0,workingColorSpace:sn,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===dt&&(r.r=oi(r.r),r.g=oi(r.g),r.b=oi(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===dt&&(r.r=Fr(r.r),r.g=Fr(r.g),r.b=Fr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===fi?Ls:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Ki("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Ki("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[sn]:{primaries:e,whitePoint:n,transfer:Ls,toXYZ:md,fromXYZ:gd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:wt},outputColorSpaceConfig:{drawingBufferColorSpace:wt}},[wt]:{primaries:e,whitePoint:n,transfer:dt,toXYZ:md,fromXYZ:gd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:wt}}}),i}var Ye=hg();function oi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Fr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var xr,Sa=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{xr===void 0&&(xr=Ur("canvas")),xr.width=e.width,xr.height=e.height;let r=xr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=xr}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Ur("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=oi(s[o]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(oi(t[n]/255)*255):t[n]=oi(t[n]);return{data:t,width:e.width,height:e.height}}else return Pe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},ug=0,Br=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:ug++}),this.uuid=Sn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Sl(r[o].image)):s.push(Sl(r[o]))}else s=Sl(r);n.url=s}return t||(e.images[this.uuid]=n),n}};function Sl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Sa.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Pe("Texture: Unable to serialize Texture."),{})}var dg=0,El=new P,Vt=class i extends Fn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Mn,r=Mn,s=Dt,o=Nn,a=vn,c=un,l=i.DEFAULT_ANISOTROPY,h=fi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:dg++}),this.uuid=Sn(),this.name="",this.source=new Br(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ce(0,0),this.repeat=new ce(1,1),this.center=new ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(El).x}get height(){return this.source.getSize(El).y}get depth(){return this.source.getSize(El).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Pe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Pe(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==_h)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ei:e.x=e.x-Math.floor(e.x);break;case Mn:e.x=e.x<0?0:1;break;case Dr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ei:e.y=e.y-Math.floor(e.y);break;case Mn:e.y=e.y<0?0:1;break;case Dr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Vt.DEFAULT_IMAGE=null;Vt.DEFAULT_MAPPING=_h;Vt.DEFAULT_ANISOTROPY=1;var zh=class zh{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let T=(l+1)/2,x=(f+1)/2,S=(p+1)/2,E=(h+d)/4,R=(u+_)/4,v=(g+m)/4;return T>x&&T>S?T<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(T),r=E/n,s=R/n):x>S?x<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),n=E/r,s=v/r):S<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(S),n=R/s,r=v/s),this.set(n,r,s,t),this}let M=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-_)/M,this.z=(d-h)/M,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this.w=Ze(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this.w=Ze(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};zh.prototype.isVector4=!0;var mt=zh,Ea=class extends Fn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Dt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new mt(0,0,e,t),this.scissorTest=!1,this.viewport=new mt(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:n.depth},s=new Vt(r),o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Dt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new Br(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},an=class extends Ea{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Ns=class extends Vt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=Mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ta=class extends Vt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=Mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Ka=class Ka{constructor(e,t,n,r,s,o,a,c,l,h,u,d,f,g,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,c,l,h,u,d,f,g,_,m)}set(e,t,n,r,s,o,a,c,l,h,u,d,f,g,_,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ka().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/vr.setFromMatrixColumn(e,0).length(),s=1/vr.setFromMatrixColumn(e,1).length(),o=1/vr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(r),l=Math.sin(r),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){let d=o*h,f=o*u,g=a*h,_=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+g*l,t[5]=d-_*l,t[9]=-a*c,t[2]=_-d*l,t[6]=g+f*l,t[10]=o*c}else if(e.order==="YXZ"){let d=c*h,f=c*u,g=l*h,_=l*u;t[0]=d+_*a,t[4]=g*a-f,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=_+d*a,t[10]=o*c}else if(e.order==="ZXY"){let d=c*h,f=c*u,g=l*h,_=l*u;t[0]=d-_*a,t[4]=-o*u,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let d=o*h,f=o*u,g=a*h,_=a*u;t[0]=c*h,t[4]=g*l-f,t[8]=d*l+_,t[1]=c*u,t[5]=_*l+d,t[9]=f*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let d=o*c,f=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=_-d*u,t[8]=g*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=f*u+g,t[10]=d-_*u}else if(e.order==="XZY"){let d=o*c,f=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+_,t[5]=o*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(fg,e,pg)}lookAt(e,t,n){let r=this.elements;return dn.subVectors(e,t),dn.lengthSq()===0&&(dn.z=1),dn.normalize(),bi.crossVectors(n,dn),bi.lengthSq()===0&&(Math.abs(n.z)===1?dn.x+=1e-4:dn.z+=1e-4,dn.normalize(),bi.crossVectors(n,dn)),bi.normalize(),zo.crossVectors(dn,bi),r[0]=bi.x,r[4]=zo.x,r[8]=dn.x,r[1]=bi.y,r[5]=zo.y,r[9]=dn.y,r[2]=bi.z,r[6]=zo.z,r[10]=dn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],M=n[3],T=n[7],x=n[11],S=n[15],E=r[0],R=r[4],v=r[8],w=r[12],C=r[1],F=r[5],U=r[9],B=r[13],L=r[2],k=r[6],q=r[10],W=r[14],ie=r[3],X=r[7],$=r[11],te=r[15];return s[0]=o*E+a*C+c*L+l*ie,s[4]=o*R+a*F+c*k+l*X,s[8]=o*v+a*U+c*q+l*$,s[12]=o*w+a*B+c*W+l*te,s[1]=h*E+u*C+d*L+f*ie,s[5]=h*R+u*F+d*k+f*X,s[9]=h*v+u*U+d*q+f*$,s[13]=h*w+u*B+d*W+f*te,s[2]=g*E+_*C+m*L+p*ie,s[6]=g*R+_*F+m*k+p*X,s[10]=g*v+_*U+m*q+p*$,s[14]=g*w+_*B+m*W+p*te,s[3]=M*E+T*C+x*L+S*ie,s[7]=M*R+T*F+x*k+S*X,s[11]=M*v+T*U+x*q+S*$,s[15]=M*w+T*B+x*W+S*te,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15],M=c*f-l*d,T=a*f-l*u,x=a*d-c*u,S=o*f-l*h,E=o*d-c*h,R=o*u-a*h;return t*(_*M-m*T+p*x)-n*(g*M-m*S+p*E)+r*(g*T-_*S+p*R)-s*(g*x-_*E+m*R)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[1],o=e[5],a=e[9],c=e[2],l=e[6],h=e[10];return t*(o*h-a*l)-n*(s*h-a*c)+r*(s*l-o*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],M=t*a-n*o,T=t*c-r*o,x=t*l-s*o,S=n*c-r*a,E=n*l-s*a,R=r*l-s*c,v=h*_-u*g,w=h*m-d*g,C=h*p-f*g,F=u*m-d*_,U=u*p-f*_,B=d*p-f*m,L=M*B-T*U+x*F+S*C-E*w+R*v;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let k=1/L;return e[0]=(a*B-c*U+l*F)*k,e[1]=(r*U-n*B-s*F)*k,e[2]=(_*R-m*E+p*S)*k,e[3]=(d*E-u*R-f*S)*k,e[4]=(c*C-o*B-l*w)*k,e[5]=(t*B-r*C+s*w)*k,e[6]=(m*x-g*R-p*T)*k,e[7]=(h*R-d*x+f*T)*k,e[8]=(o*U-a*C+l*v)*k,e[9]=(n*C-t*U-s*v)*k,e[10]=(g*E-_*x+p*M)*k,e[11]=(u*x-h*E-f*M)*k,e[12]=(a*w-o*F-c*v)*k,e[13]=(t*F-n*w+r*v)*k,e[14]=(_*T-g*S-m*M)*k,e[15]=(h*S-u*T+d*M)*k,this}scale(e){let t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),s=1-n,o=e.x,a=e.y,c=e.z,l=s*o,h=s*a;return this.set(l*o+n,l*a-r*c,l*c+r*a,0,l*a+r*c,h*a+n,h*c-r*o,0,l*c-r*a,h*c+r*o,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,o){return this.set(1,n,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,h=o+o,u=a+a,d=s*l,f=s*h,g=s*u,_=o*h,m=o*u,p=a*u,M=c*l,T=c*h,x=c*u,S=n.x,E=n.y,R=n.z;return r[0]=(1-(_+p))*S,r[1]=(f+x)*S,r[2]=(g-T)*S,r[3]=0,r[4]=(f-x)*E,r[5]=(1-(d+p))*E,r[6]=(m+M)*E,r[7]=0,r[8]=(g+T)*R,r[9]=(m-M)*R,r[10]=(1-(d+_))*R,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let o=vr.set(r[0],r[1],r[2]).length(),a=vr.set(r[4],r[5],r[6]).length(),c=vr.set(r[8],r[9],r[10]).length();s<0&&(o=-o),An.copy(this);let l=1/o,h=1/a,u=1/c;return An.elements[0]*=l,An.elements[1]*=l,An.elements[2]*=l,An.elements[4]*=h,An.elements[5]*=h,An.elements[6]*=h,An.elements[8]*=u,An.elements[9]*=u,An.elements[10]*=u,t.setFromRotationMatrix(An),n.x=o,n.y=a,n.z=c,this}makePerspective(e,t,n,r,s,o,a=In,c=!1){let l=this.elements,h=2*s/(t-e),u=2*s/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),g,_;if(c)g=s/(o-s),_=o*s/(o-s);else if(a===In)g=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===Nr)g=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,o,a=In,c=!1){let l=this.elements,h=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),g,_;if(c)g=1/(o-s),_=o/(o-s);else if(a===In)g=-2/(o-s),_=-(o+s)/(o-s);else if(a===Nr)g=-1/(o-s),_=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Ka.prototype.isMatrix4=!0;var Ve=Ka,vr=new P,An=new Ve,fg=new P(0,0,0),pg=new P(1,1,1),bi=new P,zo=new P,dn=new P,bd=new Ve,xd=new Ht,En=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],h=r[9],u=r[2],d=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(Ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ze(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ze(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Ze(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ze(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Pe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return bd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(bd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return xd.setFromEuler(this),this.setFromQuaternion(xd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};En.DEFAULT_ORDER="XYZ";var kr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},mg=0,vd=new P,_r=new Ht,ei=new Ve,Go=new P,vs=new P,gg=new P,bg=new Ht,_d=new P(1,0,0),yd=new P(0,1,0),Md=new P(0,0,1),Sd={type:"added"},xg={type:"removed"},yr={type:"childadded",child:null},Tl={type:"childremoved",child:null},Et=class i extends Fn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:mg++}),this.uuid=Sn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new P,t=new En,n=new Ht,r=new P(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ve},normalMatrix:{value:new We}}),this.matrix=new Ve,this.matrixWorld=new Ve,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new kr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return _r.setFromAxisAngle(e,t),this.quaternion.multiply(_r),this}rotateOnWorldAxis(e,t){return _r.setFromAxisAngle(e,t),this.quaternion.premultiply(_r),this}rotateX(e){return this.rotateOnAxis(_d,e)}rotateY(e){return this.rotateOnAxis(yd,e)}rotateZ(e){return this.rotateOnAxis(Md,e)}translateOnAxis(e,t){return vd.copy(e).applyQuaternion(this.quaternion),this.position.add(vd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(_d,e)}translateY(e){return this.translateOnAxis(yd,e)}translateZ(e){return this.translateOnAxis(Md,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ei.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Go.copy(e):Go.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),vs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ei.lookAt(vs,Go,this.up):ei.lookAt(Go,vs,this.up),this.quaternion.setFromRotationMatrix(ei),r&&(ei.extractRotation(r.matrixWorld),_r.setFromRotationMatrix(ei),this.quaternion.premultiply(_r.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Be("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Sd),yr.child=e,this.dispatchEvent(yr),yr.child=null):Be("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(xg),Tl.child=e,this.dispatchEvent(Tl),Tl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ei.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ei.multiply(e.parent.matrixWorld)),e.applyMatrix4(ei),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Sd),yr.child=e,this.dispatchEvent(yr),yr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vs,e,gg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vs,bg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];s(e.shapes,u)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(e.materials,this.material[c]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];r.animations.push(s(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=r,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Et.DEFAULT_UP=new P(0,1,0);Et.DEFAULT_MATRIX_AUTO_UPDATE=!0;Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ut=class extends Et{constructor(){super(),this.isGroup=!0,this.type="Group"}},vg={type:"move"},zr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ut,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ut,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ut,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let _ of e.hand.values()){let m=t.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(vg)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new ut;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Wf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},xi={h:0,s:0,l:0},Ho={h:0,s:0,l:0};function wl(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Ee=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=wt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ye.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Ye.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ye.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Ye.workingColorSpace){if(e=Ih(e,1),t=Ze(t,0,1),n=Ze(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=wl(o,s,e+1/3),this.g=wl(o,s,e),this.b=wl(o,s,e-1/3)}return Ye.colorSpaceToWorking(this,r),this}setStyle(e,t=wt){function n(s){s!==void 0&&parseFloat(s)<1&&Pe("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Pe("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);Pe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=wt){let n=Wf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Pe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=oi(e.r),this.g=oi(e.g),this.b=oi(e.b),this}copyLinearToSRGB(e){return this.r=Fr(e.r),this.g=Fr(e.g),this.b=Fr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=wt){return Ye.workingToColorSpace($t.copy(this),e),Math.round(Ze($t.r*255,0,255))*65536+Math.round(Ze($t.g*255,0,255))*256+Math.round(Ze($t.b*255,0,255))}getHexString(e=wt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ye.workingColorSpace){Ye.workingToColorSpace($t.copy(this),t);let n=$t.r,r=$t.g,s=$t.b,o=Math.max(n,r,s),a=Math.min(n,r,s),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(r-s)/u+(r<s?6:0);break;case r:c=(s-n)/u+2;break;case s:c=(n-r)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Ye.workingColorSpace){return Ye.workingToColorSpace($t.copy(this),t),e.r=$t.r,e.g=$t.g,e.b=$t.b,e}getStyle(e=wt){Ye.workingToColorSpace($t.copy(this),e);let t=$t.r,n=$t.g,r=$t.b;return e!==wt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(xi),this.setHSL(xi.h+e,xi.s+t,xi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(xi),e.getHSL(Ho);let n=Cs(xi.h,Ho.h,t),r=Cs(xi.s,Ho.s,t),s=Cs(xi.l,Ho.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},$t=new Ee;Ee.NAMES=Wf;var Us=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ee(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Os=class extends Et{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new En,this.environmentIntensity=1,this.environmentRotation=new En,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Rn=new P,ti=new P,Al=new P,ni=new P,Mr=new P,Sr=new P,Ed=new P,Rl=new P,Cl=new P,Pl=new P,Il=new mt,Fl=new mt,Ll=new mt,Si=class i{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Rn.subVectors(e,t),r.cross(Rn);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Rn.subVectors(r,t),ti.subVectors(n,t),Al.subVectors(e,t);let o=Rn.dot(Rn),a=Rn.dot(ti),c=Rn.dot(Al),l=ti.dot(ti),h=ti.dot(Al),u=o*l-a*a;if(u===0)return s.set(0,0,0),null;let d=1/u,f=(l*c-a*h)*d,g=(o*h-a*c)*d;return s.set(1-f-g,g,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,ni)===null?!1:ni.x>=0&&ni.y>=0&&ni.x+ni.y<=1}static getInterpolation(e,t,n,r,s,o,a,c){return this.getBarycoord(e,t,n,r,ni)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,ni.x),c.addScaledVector(o,ni.y),c.addScaledVector(a,ni.z),c)}static getInterpolatedAttribute(e,t,n,r,s,o){return Il.setScalar(0),Fl.setScalar(0),Ll.setScalar(0),Il.fromBufferAttribute(e,t),Fl.fromBufferAttribute(e,n),Ll.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Il,s.x),o.addScaledVector(Fl,s.y),o.addScaledVector(Ll,s.z),o}static isFrontFacing(e,t,n,r){return Rn.subVectors(n,t),ti.subVectors(e,t),Rn.cross(ti).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Rn.subVectors(this.c,this.b),ti.subVectors(this.a,this.b),Rn.cross(ti).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,s=this.c,o,a;Mr.subVectors(r,n),Sr.subVectors(s,n),Rl.subVectors(e,n);let c=Mr.dot(Rl),l=Sr.dot(Rl);if(c<=0&&l<=0)return t.copy(n);Cl.subVectors(e,r);let h=Mr.dot(Cl),u=Sr.dot(Cl);if(h>=0&&u<=h)return t.copy(r);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(Mr,o);Pl.subVectors(e,s);let f=Mr.dot(Pl),g=Sr.dot(Pl);if(g>=0&&f<=g)return t.copy(s);let _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(Sr,a);let m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return Ed.subVectors(s,r),a=(u-h)/(u-h+(f-g)),t.copy(r).addScaledVector(Ed,a);let p=1/(m+_+d);return o=_*p,a=d*p,t.copy(n).addScaledVector(Mr,o).addScaledVector(Sr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Kt=class{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Cn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Cn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Cn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Cn):Cn.fromBufferAttribute(s,o),Cn.applyMatrix4(e.matrixWorld),this.expandByPoint(Cn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Vo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Vo.copy(n.boundingBox)),Vo.applyMatrix4(e.matrixWorld),this.union(Vo)}let r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Cn),Cn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(_s),Wo.subVectors(this.max,_s),Er.subVectors(e.a,_s),Tr.subVectors(e.b,_s),wr.subVectors(e.c,_s),vi.subVectors(Tr,Er),_i.subVectors(wr,Tr),Gi.subVectors(Er,wr);let t=[0,-vi.z,vi.y,0,-_i.z,_i.y,0,-Gi.z,Gi.y,vi.z,0,-vi.x,_i.z,0,-_i.x,Gi.z,0,-Gi.x,-vi.y,vi.x,0,-_i.y,_i.x,0,-Gi.y,Gi.x,0];return!Dl(t,Er,Tr,wr,Wo)||(t=[1,0,0,0,1,0,0,0,1],!Dl(t,Er,Tr,wr,Wo))?!1:(qo.crossVectors(vi,_i),t=[qo.x,qo.y,qo.z],Dl(t,Er,Tr,wr,Wo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Cn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Cn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ii[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ii[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ii[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ii[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ii[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ii[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ii[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ii[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ii),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ii=[new P,new P,new P,new P,new P,new P,new P,new P],Cn=new P,Vo=new Kt,Er=new P,Tr=new P,wr=new P,vi=new P,_i=new P,Gi=new P,_s=new P,Wo=new P,qo=new P,Hi=new P;function Dl(i,e,t,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){Hi.fromArray(i,s);let a=r.x*Math.abs(Hi.x)+r.y*Math.abs(Hi.y)+r.z*Math.abs(Hi.z),c=e.dot(Hi),l=t.dot(Hi),h=n.dot(Hi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var kt=new P,Xo=new ce,_g=0,Ft=class extends Fn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:_g++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Rh,this.updateRanges=[],this.gpuType=xn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Xo.fromBufferAttribute(this,t),Xo.applyMatrix3(e),this.setXY(t,Xo.x,Xo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix3(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix4(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyNormalMatrix(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.transformDirection(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Pn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=pt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Pn(t,this.array)),t}setX(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Pn(t,this.array)),t}setY(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Pn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Pn(t,this.array)),t}setW(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),r=pt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),r=pt(r,this.array),s=pt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var Bs=class extends Ft{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var ks=class extends Ft{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var it=class extends Ft{constructor(e,t,n){super(new Float32Array(e),t,n)}},yg=new Kt,ys=new P,Nl=new P,cn=class{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):yg.setFromPoints(e).getCenter(n);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ys.subVectors(e,this.center);let t=ys.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(ys,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Nl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ys.copy(e.center).add(Nl)),this.expandByPoint(ys.copy(e.center).sub(Nl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Mg=0,yn=new Ve,Ul=new Et,Ar=new P,fn=new Kt,Ms=new Kt,Xt=new P,Tt=class i extends Fn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Mg++}),this.uuid=Sn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Xm(e)?ks:Bs)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new We().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return yn.makeRotationFromQuaternion(e),this.applyMatrix4(yn),this}rotateX(e){return yn.makeRotationX(e),this.applyMatrix4(yn),this}rotateY(e){return yn.makeRotationY(e),this.applyMatrix4(yn),this}rotateZ(e){return yn.makeRotationZ(e),this.applyMatrix4(yn),this}translate(e,t,n){return yn.makeTranslation(e,t,n),this.applyMatrix4(yn),this}scale(e,t,n){return yn.makeScale(e,t,n),this.applyMatrix4(yn),this}lookAt(e){return Ul.lookAt(e),Ul.updateMatrix(),this.applyMatrix4(Ul.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ar).negate(),this.translate(Ar.x,Ar.y,Ar.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let r=0,s=e.length;r<s;r++){let o=e[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new it(n,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Pe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Kt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Be("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let s=t[n];fn.setFromBufferAttribute(s),this.morphTargetsRelative?(Xt.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(Xt),Xt.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(Xt)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Be('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new cn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Be("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){let n=this.boundingSphere.center;if(fn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){let a=t[s];Ms.setFromBufferAttribute(a),this.morphTargetsRelative?(Xt.addVectors(fn.min,Ms.min),fn.expandByPoint(Xt),Xt.addVectors(fn.max,Ms.max),fn.expandByPoint(Xt)):(fn.expandByPoint(Ms.min),fn.expandByPoint(Ms.max))}fn.getCenter(n);let r=0;for(let s=0,o=e.count;s<o;s++)Xt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Xt));if(t)for(let s=0,o=t.length;s<o;s++){let a=t[s],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Xt.fromBufferAttribute(a,l),c&&(Ar.fromBufferAttribute(e,l),Xt.add(Ar)),r=Math.max(r,n.distanceToSquared(Xt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Be('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Be("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,r=t.normal,s=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new Ft(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],c=[];for(let v=0;v<n.count;v++)a[v]=new P,c[v]=new P;let l=new P,h=new P,u=new P,d=new ce,f=new ce,g=new ce,_=new P,m=new P;function p(v,w,C){l.fromBufferAttribute(n,v),h.fromBufferAttribute(n,w),u.fromBufferAttribute(n,C),d.fromBufferAttribute(s,v),f.fromBufferAttribute(s,w),g.fromBufferAttribute(s,C),h.sub(l),u.sub(l),f.sub(d),g.sub(d);let F=1/(f.x*g.y-g.x*f.y);isFinite(F)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(F),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(F),a[v].add(_),a[w].add(_),a[C].add(_),c[v].add(m),c[w].add(m),c[C].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let v=0,w=M.length;v<w;++v){let C=M[v],F=C.start,U=C.count;for(let B=F,L=F+U;B<L;B+=3)p(e.getX(B+0),e.getX(B+1),e.getX(B+2))}let T=new P,x=new P,S=new P,E=new P;function R(v){S.fromBufferAttribute(r,v),E.copy(S);let w=a[v];T.copy(w),T.sub(S.multiplyScalar(S.dot(w))).normalize(),x.crossVectors(E,w);let F=x.dot(c[v])<0?-1:1;o.setXYZW(v,T.x,T.y,T.z,F)}for(let v=0,w=M.length;v<w;++v){let C=M[v],F=C.start,U=C.count;for(let B=F,L=F+U;B<L;B+=3)R(e.getX(B+0)),R(e.getX(B+1)),R(e.getX(B+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Ft(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let r=new P,s=new P,o=new P,a=new P,c=new P,l=new P,h=new P,u=new P;if(e)for(let d=0,f=e.count;d<f;d+=3){let g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Xt.fromBufferAttribute(e,t),Xt.normalize(),e.setXYZ(t,Xt.x,Xt.y,Xt.z)}toNonIndexed(){function e(a,c){let l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h),f=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?f=c[_]*a.data.stride+a.offset:f=c[_]*h;for(let p=0;p<h;p++)d[g++]=l[f++]}return new Ft(d,h,u)}if(this.index===null)return Pe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let a in r){let c=r[a],l=e(c,n);t.setAttribute(a,l)}let s=this.morphAttributes;for(let a in s){let c=[],l=s[a];for(let h=0,u=l.length;h<u;h++){let d=l[h],f=e(d,n);c.push(f)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let r={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(r[c]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let l in r){let h=r[l];this.setAttribute(l,h.clone(t))}let s=e.morphAttributes;for(let l in s){let h=[],u=s[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Gr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Rh,this.updateRanges=[],this.version=0,this.uuid=Sn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Sn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Sn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},rn=new P,Hr=class i{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)rn.fromBufferAttribute(this,t),rn.applyMatrix4(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)rn.fromBufferAttribute(this,t),rn.applyNormalMatrix(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)rn.fromBufferAttribute(this,t),rn.transformDirection(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Pn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=pt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Pn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Pn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Pn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Pn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),r=pt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),n=pt(n,this.array),r=pt(r,this.array),s=pt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){Ds("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Ft(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Ds("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Ol=new P,Sg=new P,Eg=new We,pn=class{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Ol.subVectors(n,t).cross(Sg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Ol),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(r,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Eg.getNormalMatrix(e),r=this.coplanarPoint(Ol).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Tg=0,on=class extends Fn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Tg++}),this.uuid=Sn(),this.name="",this.type="Material",this.blending=ts,this.side=jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=dh,this.blendDst=fh,this.blendEquation=or,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ee(0,0,0),this.blendAlpha=0,this.depthFunc=Lr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Lf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=pa,this.stencilZFail=pa,this.stencilZPass=pa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Pe(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Pe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){let o=[];for(let a in s){let c=s[a];delete c.metadata,o.push(c)}return o}if(t){let s=r(e.textures),o=r(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ee().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new pn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ce().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ce().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var ri=new P,Bl=new P,jo=new P,Ko=new P,Ti=class{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ri)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ri.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ri.copy(this.origin).addScaledVector(this.direction,t),ri.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Bl.copy(e).add(t).multiplyScalar(.5),jo.copy(t).sub(e).normalize(),Ko.copy(this.origin).sub(Bl);let s=e.distanceTo(t)*.5,o=-this.direction.dot(jo),a=Ko.dot(this.direction),c=-Ko.dot(jo),l=Ko.lengthSq(),h=Math.abs(1-o*o),u,d,f,g;if(h>0)if(u=o*c-a,d=o*a-c,g=s*h,u>=0)if(d>=-g)if(d<=g){let _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-o*s+a)),d=u>0?-s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-s,-c),s),f=d*(d+2*c)+l):(u=Math.max(0,-(o*s+a)),d=u>0?s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l);else d=o>0?-s:s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Bl).addScaledVector(jo,d),f}intersectSphere(e,t){if(e.radius<0)return null;ri.subVectors(e.center,this.origin);let n=ri.dot(this.direction),r=ri.dot(ri)-n*n,s=e.radius*e.radius;if(r>s)return null;let o=Math.sqrt(s-r),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,r=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,r=(e.min.x-d.x)*l),h>=0?(s=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),u>=0?(a=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||a>r)||((a>n||n!==n)&&(n=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,ri)!==null}intersectTriangle(e,t,n,r,s){let o=this.origin,a=this.direction,c=a.x,l=a.y,h=a.z,u=e.x-o.x,d=e.y-o.y,f=e.z-o.z,g=t.x-o.x,_=t.y-o.y,m=t.z-o.z,p=n.x-o.x,M=n.y-o.y,T=n.z-o.z,x=Math.abs(c),S=Math.abs(l),E=Math.abs(h),R,v,w,C,F,U,B,L,k,q,W,ie;if(x>=S&&x>=E?(w=c,U=u,k=g,ie=p,c>=0?(R=l,v=h,C=d,F=f,B=_,L=m,q=M,W=T):(R=h,v=l,C=f,F=d,B=m,L=_,q=T,W=M)):S>=E?(w=l,U=d,k=_,ie=M,l>=0?(R=h,v=c,C=f,F=u,B=m,L=g,q=T,W=p):(R=c,v=h,C=u,F=f,B=g,L=m,q=p,W=T)):(w=h,U=f,k=m,ie=T,h>=0?(R=c,v=l,C=u,F=d,B=g,L=_,q=p,W=M):(R=l,v=c,C=d,F=u,B=_,L=g,q=M,W=p)),w===0)return null;let X=R/w,$=v/w,te=1/w,Ie=C-X*U,Te=F-$*U,ot=B-X*k,Qe=L-$*k,rt=q-X*ie,J=W-$*ie,Q=rt*Qe-J*ot,be=Ie*J-Te*rt,ke=ot*Te-Qe*Ie;if(r){if(Q<0||be<0||ke<0)return null}else if((Q<0||be<0||ke<0)&&(Q>0||be>0||ke>0))return null;let ye=Q+be+ke;if(ye===0)return null;let Ge=te*(Q*U+be*k+ke*ie);return(ye>0?Ge<0:Ge>0)?null:this.at(Ge/ye,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},jt=class extends on{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.combine=Ja,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Td=new Ve,Vi=new Ti,Jo=new cn,wd=new P,Yo=new P,Zo=new P,$o=new P,kl=new P,Qo=new P,Ad=new P,ea=new P,ze=class extends Et{constructor(e=new Tt,t=new jt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(s&&a){Qo.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let h=a[c],u=s[c];h!==0&&(kl.fromBufferAttribute(u,e),o?Qo.addScaledVector(kl,h):Qo.addScaledVector(kl.sub(t),h))}t.add(Qo)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Jo.copy(n.boundingSphere),Jo.applyMatrix4(s),Vi.copy(e.ray).recast(e.near),!(Jo.containsPoint(Vi.origin)===!1&&(Vi.intersectSphere(Jo,wd)===null||Vi.origin.distanceToSquared(wd)>(e.far-e.near)**2))&&(Td.copy(s).invert(),Vi.copy(e.ray).applyMatrix4(Td),!(n.boundingBox!==null&&Vi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Vi)))}_computeIntersections(e,t,n){let r,s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){let m=d[g],p=o[m.materialIndex],M=Math.max(m.start,f.start),T=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let x=M,S=T;x<S;x+=3){let E=a.getX(x),R=a.getX(x+1),v=a.getX(x+2);r=ta(this,p,e,n,l,h,u,E,R,v),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){let M=a.getX(m),T=a.getX(m+1),x=a.getX(m+2);r=ta(this,o,e,n,l,h,u,M,T,x),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){let m=d[g],p=o[m.materialIndex],M=Math.max(m.start,f.start),T=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let x=M,S=T;x<S;x+=3){let E=x,R=x+1,v=x+2;r=ta(this,p,e,n,l,h,u,E,R,v),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){let M=m,T=m+1,x=m+2;r=ta(this,o,e,n,l,h,u,M,T,x),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}};function wg(i,e,t,n,r,s,o,a){let c;if(e.side===Jt?c=n.intersectTriangle(o,s,r,!0,a):c=n.intersectTriangle(r,s,o,e.side===jn,a),c===null)return null;ea.copy(a),ea.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(ea);return l<t.near||l>t.far?null:{distance:l,point:ea.clone(),object:i}}function ta(i,e,t,n,r,s,o,a,c,l){i.getVertexPosition(a,Yo),i.getVertexPosition(c,Zo),i.getVertexPosition(l,$o);let h=wg(i,e,t,n,Yo,Zo,$o,Ad);if(h){let u=new P;Si.getBarycoord(Ad,Yo,Zo,$o,u),r&&(h.uv=Si.getInterpolatedAttribute(r,a,c,l,u,new ce)),s&&(h.uv1=Si.getInterpolatedAttribute(s,a,c,l,u,new ce)),o&&(h.normal=Si.getInterpolatedAttribute(o,a,c,l,u,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:c,c:l,normal:new P,materialIndex:0};Si.getNormal(Yo,Zo,$o,d.normal),h.face=d,h.barycoord=u}return h}var Ss=new mt,Rd=new mt,Cd=new mt,Ag=new mt,Pd=new Ve,na=new P,zl=new cn,Id=new Ve,Gl=new Ti,zs=class extends ze{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Kl,this.bindMatrix=new Ve,this.bindMatrixInverse=new Ve,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Kt),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,na),this.boundingBox.expandByPoint(na)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new cn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,na),this.boundingSphere.expandByPoint(na)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),zl.copy(this.boundingSphere),zl.applyMatrix4(r),e.ray.intersectsSphere(zl)!==!1&&(Id.copy(r).invert(),Gl.copy(e.ray).applyMatrix4(Id),!(this.boundingBox!==null&&Gl.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Gl)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new mt,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Kl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Af?this.bindMatrixInverse.copy(this.bindMatrix).invert():Pe("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,r=this.geometry;Rd.fromBufferAttribute(r.attributes.skinIndex,e),Cd.fromBufferAttribute(r.attributes.skinWeight,e),t.isVector4?(Ss.copy(t),t.set(0,0,0,0)):(Ss.set(...t,1),t.set(0,0,0)),Ss.applyMatrix4(this.bindMatrix);for(let s=0;s<4;s++){let o=Cd.getComponent(s);if(o!==0){let a=Rd.getComponent(s);Pd.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Ag.copy(Ss).applyMatrix4(Pd),o)}}return t.isVector4&&(t.w=Ss.w),t.applyMatrix4(this.bindMatrixInverse)}},Vr=class extends Et{constructor(){super(),this.isBone=!0,this.type="Bone"}},Wr=class extends Vt{constructor(e=null,t=1,n=1,r,s,o,a,c,l=Lt,h=Lt,u,d){super(null,o,a,c,l,h,r,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Fd=new Ve,Rg=new Ve,Gs=class i{constructor(e=[],t=[]){this.uuid=Sn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Pe("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,r=this.bones.length;n<r;n++)this.boneInverses.push(new Ve)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ve;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let s=0,o=e.length;s<o;s++){let a=e[s]?e[s].matrixWorld:Rg;Fd.multiplyMatrices(a,t[s]),Fd.toArray(n,s*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Wr(t,e,e,vn,xn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){let s=e.bones[n],o=t[s];o===void 0&&(Pe("Skeleton: No bone found with UUID:",s),o=new Vr),this.bones.push(o),this.boneInverses.push(new Ve().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let r=0,s=t.length;r<s;r++){let o=t[r];e.bones.push(o.uuid);let a=n[r];e.boneInverses.push(a.toArray())}return e}},ai=class extends Ft{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Rr=new Ve,Ld=new Ve,ia=[],Dd=new Kt,Cg=new Ve,Es=new ze,Ts=new cn,$i=class extends ze{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ai(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,Cg)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Kt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Rr),Dd.copy(e.boundingBox).applyMatrix4(Rr),this.boundingBox.union(Dd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new cn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Rr),Ts.copy(e.boundingSphere).applyMatrix4(Rr),this.boundingSphere.union(Ts)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=r[o+a]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Es.geometry=this.geometry,Es.material=this.material,Es.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ts.copy(this.boundingSphere),Ts.applyMatrix4(n),e.ray.intersectsSphere(Ts)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Rr),Ld.multiplyMatrices(n,Rr),Es.matrixWorld=Ld,Es.raycast(e,ia);for(let o=0,a=ia.length;o<a;o++){let c=ia[o];c.instanceId=s,c.object=this,t.push(c)}ia.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new ai(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Wr(new Float32Array(r*this.count),r,this.count,nc,xn));let s=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=r*e;return s[c]=a,s.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Wi=new cn,Pg=new ce(.5,.5),ra=new P,qr=class{constructor(e=new pn,t=new pn,n=new pn,r=new pn,s=new pn,o=new pn){this.planes=[e,t,n,r,s,o]}set(e,t,n,r,s,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=In,n=!1){let r=this.planes,s=e.elements,o=s[0],a=s[1],c=s[2],l=s[3],h=s[4],u=s[5],d=s[6],f=s[7],g=s[8],_=s[9],m=s[10],p=s[11],M=s[12],T=s[13],x=s[14],S=s[15];if(r[0].setComponents(l-o,f-h,p-g,S-M).normalize(),r[1].setComponents(l+o,f+h,p+g,S+M).normalize(),r[2].setComponents(l+a,f+u,p+_,S+T).normalize(),r[3].setComponents(l-a,f-u,p-_,S-T).normalize(),n)r[4].setComponents(c,d,m,x).normalize(),r[5].setComponents(l-c,f-d,p-m,S-x).normalize();else if(r[4].setComponents(l-c,f-d,p-m,S-x).normalize(),t===In)r[5].setComponents(l+c,f+d,p+m,S+x).normalize();else if(t===Nr)r[5].setComponents(c,d,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Wi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Wi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Wi)}intersectsSprite(e){Wi.center.set(0,0,0);let t=Pg.distanceTo(e.center);return Wi.radius=.7071067811865476+t,Wi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Wi)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(ra.x=r.normal.x>0?e.max.x:e.min.x,ra.y=r.normal.y>0?e.max.y:e.min.y,ra.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ra)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Xr=class extends on{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ee(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},wa=new P,Aa=new P,Nd=new Ve,ws=new Ti,sa=new cn,Hl=new P,Ud=new P,Qi=class extends Et{constructor(e=new Tt,t=new Xr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)wa.fromBufferAttribute(t,r-1),Aa.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=wa.distanceTo(Aa);e.setAttribute("lineDistance",new it(n,1))}else Pe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),sa.copy(n.boundingSphere),sa.applyMatrix4(r),sa.radius+=s,e.ray.intersectsSphere(sa)===!1)return;Nd.copy(r).invert(),ws.copy(e.ray).applyMatrix4(Nd);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=f,m=g-1;_<m;_+=l){let p=h.getX(_),M=h.getX(_+1),T=oa(this,e,ws,c,p,M,_);T&&t.push(T)}if(this.isLineLoop){let _=h.getX(g-1),m=h.getX(f),p=oa(this,e,ws,c,_,m,g-1);p&&t.push(p)}}else{let f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let _=f,m=g-1;_<m;_+=l){let p=oa(this,e,ws,c,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){let _=oa(this,e,ws,c,g-1,f,g-1);_&&t.push(_)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function oa(i,e,t,n,r,s,o){let a=i.geometry.attributes.position;if(wa.fromBufferAttribute(a,r),Aa.fromBufferAttribute(a,s),t.distanceSqToSegment(wa,Aa,Hl,Ud)>n)return;Hl.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(Hl);if(!(l<e.near||l>e.far))return{distance:l,point:Ud.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var Od=new P,Bd=new P,Hs=class extends Qi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)Od.fromBufferAttribute(t,r),Bd.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Od.distanceTo(Bd);e.setAttribute("lineDistance",new it(n,1))}else Pe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Vs=class extends Qi{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},wi=class extends on{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ee(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},kd=new Ve,Yl=new Ti,aa=new cn,ca=new P,er=class extends Et{constructor(e=new Tt,t=new wi){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),aa.copy(n.boundingSphere),aa.applyMatrix4(r),aa.radius+=s,e.ray.intersectsSphere(aa)===!1)return;kd.copy(r).invert(),Yl.copy(e.ray).applyMatrix4(kd);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){let d=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let g=d,_=f;g<_;g++){let m=l.getX(g);ca.fromBufferAttribute(u,m),zd(ca,m,c,r,e,t,this)}}else{let d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,_=f;g<_;g++)ca.fromBufferAttribute(u,g),zd(ca,g,c,r,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function zd(i,e,t,n,r,s,o){let a=Yl.distanceSqToPoint(i);if(a<t){let c=new P;Yl.closestPointToPoint(i,c),c.applyMatrix4(n);let l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var Ws=class extends Vt{constructor(e=[],t=Li,n,r,s,o,a,c,l,h){super(e,t,n,r,s,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},tr=class extends Vt{constructor(e,t,n,r,s,o,a,c,l){super(e,t,n,r,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Ai=class extends Vt{constructor(e,t,n=Un,r,s,o,a=Lt,c=Lt,l,h=Vn,u=1){if(h!==Vn&&h!==Di)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:u};super(d,r,s,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Br(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Ra=class extends Ai{constructor(e,t=Un,n=Li,r,s,o=Lt,a=Lt,c,l=Vn){let h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,r,s,o,a,c,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},qs=class extends Vt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Ri=class i extends Tt{constructor(e=1,t=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};let a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);let c=[],l=[],h=[],u=[],d=0,f=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,r,o,2),g("x","z","y",1,-1,e,n,-t,r,o,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new it(l,3)),this.setAttribute("normal",new it(h,3)),this.setAttribute("uv",new it(u,2));function g(_,m,p,M,T,x,S,E,R,v,w){let C=x/R,F=S/v,U=x/2,B=S/2,L=E/2,k=R+1,q=v+1,W=0,ie=0,X=new P;for(let $=0;$<q;$++){let te=$*F-B;for(let Ie=0;Ie<k;Ie++){let Te=Ie*C-U;X[_]=Te*M,X[m]=te*T,X[p]=L,l.push(X.x,X.y,X.z),X[_]=0,X[m]=0,X[p]=E>0?1:-1,h.push(X.x,X.y,X.z),u.push(Ie/R),u.push(1-$/v),W+=1}}for(let $=0;$<v;$++)for(let te=0;te<R;te++){let Ie=d+te+k*$,Te=d+te+k*($+1),ot=d+(te+1)+k*($+1),Qe=d+(te+1)+k*$;c.push(Ie,Te,Qe),c.push(Te,ot,Qe),ie+=6}a.addGroup(f,ie,w),f+=ie,d+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},Xs=class i extends Tt{constructor(e=1,t=1,n=4,r=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:r,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),r=Math.max(3,Math.floor(r)),s=Math.max(1,Math.floor(s));let o=[],a=[],c=[],l=[],h=t/2,u=Math.PI/2*e,d=t,f=2*u+d,g=n*2+s,_=r+1,m=new P,p=new P;for(let M=0;M<=g;M++){let T=0,x=0,S=0,E=0;if(M<=n){let w=M/n,C=w*Math.PI/2;x=-h-e*Math.cos(C),S=e*Math.sin(C),E=-e*Math.cos(C),T=w*u}else if(M<=n+s){let w=(M-n)/s;x=-h+w*t,S=e,E=0,T=u+w*d}else{let w=(M-n-s)/n,C=w*Math.PI/2;x=h+e*Math.sin(C),S=e*Math.cos(C),E=e*Math.sin(C),T=u+d+w*u}let R=Math.max(0,Math.min(1,T/f)),v=0;M===0?v=.5/r:M===g&&(v=-.5/r);for(let w=0;w<=r;w++){let C=w/r,F=C*Math.PI*2,U=Math.sin(F),B=Math.cos(F);p.x=-S*B,p.y=x,p.z=S*U,a.push(p.x,p.y,p.z),m.set(-S*B,E,S*U),m.normalize(),c.push(m.x,m.y,m.z),l.push(C+v,R)}if(M>0){let w=(M-1)*_;for(let C=0;C<r;C++){let F=w+C,U=w+C+1,B=M*_+C,L=M*_+C+1;o.push(F,U,B),o.push(U,L,B)}}}this.setIndex(o),this.setAttribute("position",new it(a,3)),this.setAttribute("normal",new it(c,3)),this.setAttribute("uv",new it(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},js=class i extends Tt{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let s=[],o=[],a=[],c=[],l=new P,h=new ce;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let f=n+u/t*r;l.x=e*Math.cos(f),l.y=e*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new it(o,3)),this.setAttribute("normal",new it(a,3)),this.setAttribute("uv",new it(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Ci=class i extends Tt{constructor(e=1,t=1,n=1,r=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};let l=this;r=Math.floor(r),s=Math.floor(s);let h=[],u=[],d=[],f=[],g=0,_=[],m=n/2,p=0;M(),o===!1&&(e>0&&T(!0),t>0&&T(!1)),this.setIndex(h),this.setAttribute("position",new it(u,3)),this.setAttribute("normal",new it(d,3)),this.setAttribute("uv",new it(f,2));function M(){let x=new P,S=new P,E=0,R=(t-e)/n;for(let v=0;v<=s;v++){let w=[],C=v/s,F=C*(t-e)+e;for(let U=0;U<=r;U++){let B=U/r,L=B*c+a,k=Math.sin(L),q=Math.cos(L);S.x=F*k,S.y=-C*n+m,S.z=F*q,u.push(S.x,S.y,S.z),x.set(k,R,q).normalize(),d.push(x.x,x.y,x.z),f.push(B,1-C),w.push(g++)}_.push(w)}for(let v=0;v<r;v++)for(let w=0;w<s;w++){let C=_[w][v],F=_[w+1][v],U=_[w+1][v+1],B=_[w][v+1];(e>0||w!==0)&&(h.push(C,F,B),E+=3),(t>0||w!==s-1)&&(h.push(F,U,B),E+=3)}l.addGroup(p,E,0),p+=E}function T(x){let S=g,E=new ce,R=new P,v=0,w=x===!0?e:t,C=x===!0?1:-1;for(let U=1;U<=r;U++)u.push(0,m*C,0),d.push(0,C,0),f.push(.5,.5),g++;let F=g;for(let U=0;U<=r;U++){let L=U/r*c+a,k=Math.cos(L),q=Math.sin(L);R.x=w*q,R.y=m*C,R.z=w*k,u.push(R.x,R.y,R.z),d.push(0,C,0),E.x=k*.5+.5,E.y=q*.5*C+.5,f.push(E.x,E.y),g++}for(let U=0;U<r;U++){let B=S+U,L=F+U;x===!0?h.push(L,L+1,B):h.push(L+1,L,B),v+=3}l.addGroup(p,v,x===!0?1:2),p+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Pi=class i extends Ci{constructor(e=1,t=1,n=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,n,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var mn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Pe("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,s=n.length,o;t?o=t:o=e*n[s-1];let a=0,c=s-1,l;for(;a<=c;)if(r=Math.floor(a+(c-a)/2),l=n[r]-o,l<0)a=r+1;else if(l>0)c=r-1;else{c=r;break}if(r=c,n[r]===o)return r/(s-1);let h=n[r],d=n[r+1]-h,f=(o-h)/d;return(r+f)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let o=this.getPoint(r),a=this.getPoint(s),c=t||(o.isVector2?new ce:new P);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new P,r=[],s=[],o=[],a=new P,c=new Ve;for(let f=0;f<=e;f++){let g=f/e;r[f]=this.getTangentAt(g,new P)}s[0]=new P,o[0]=new P;let l=Number.MAX_VALUE,h=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(r[f-1],r[f]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(Ze(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(c.makeRotationAxis(a,g))}o[f].crossVectors(r[f],s[f])}if(t===!0){let f=Math.acos(Ze(s[0].dot(s[e]),-1,1));f/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(f=-f);for(let g=1;g<=e;g++)s[g].applyMatrix4(c.makeRotationAxis(r[g],f*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},jr=class extends mn{constructor(e=0,t=0,n=1,r=1,s=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new ce){let n=t,r=Math.PI*2,s=this.aEndAngle-this.aStartAngle,o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);let a=this.aStartAngle+e*s,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Ca=class extends jr{constructor(e,t,n,r,s,o){super(e,t,n,n,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Fh(){let i=0,e=0,t=0,n=0;function r(s,o,a,c){i=s,e=a,t=-3*s+3*o-2*a-c,n=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,l){r(o,a,l*(a-s),l*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,l,h,u){let d=(o-s)/l-(a-s)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,f*=h,r(o,a,d,f)},calc:function(s){let o=s*s,a=o*s;return i+e*s+t*o+n*a}}}var Gd=new P,Hd=new P,Vl=new Fh,Wl=new Fh,ql=new Fh,Pa=class extends mn{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new P){let n=t,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let l,h;this.closed||a>0?l=r[(a-1)%s]:(Hd.subVectors(r[0],r[1]).add(r[0]),l=Hd);let u=r[a%s],d=r[(a+1)%s];if(this.closed||a+2<s?h=r[(a+2)%s]:(Gd.subVectors(r[s-1],r[s-2]).add(r[s-1]),h=Gd),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Vl.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,g,_,m),Wl.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,g,_,m),ql.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(Vl.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),Wl.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),ql.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(Vl.calc(c),Wl.calc(c),ql.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new P().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Vd(i,e,t,n,r){let s=(n-e)*.5,o=(r-t)*.5,a=i*i,c=i*a;return(2*t-2*n+s+o)*c+(-3*t+3*n-2*s-o)*a+s*i+t}function Ig(i,e){let t=1-i;return t*t*e}function Fg(i,e){return 2*(1-i)*i*e}function Lg(i,e){return i*i*e}function Ps(i,e,t,n){return Ig(i,e)+Fg(i,t)+Lg(i,n)}function Dg(i,e){let t=1-i;return t*t*t*e}function Ng(i,e){let t=1-i;return 3*t*t*i*e}function Ug(i,e){return 3*(1-i)*i*i*e}function Og(i,e){return i*i*i*e}function Is(i,e,t,n,r){return Dg(i,e)+Ng(i,t)+Ug(i,n)+Og(i,r)}var Ks=class extends mn{constructor(e=new ce,t=new ce,n=new ce,r=new ce){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new ce){let n=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Is(e,r.x,s.x,o.x,a.x),Is(e,r.y,s.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ia=class extends mn{constructor(e=new P,t=new P,n=new P,r=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new P){let n=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Is(e,r.x,s.x,o.x,a.x),Is(e,r.y,s.y,o.y,a.y),Is(e,r.z,s.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Js=class extends mn{constructor(e=new ce,t=new ce){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ce){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ce){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Fa=class extends mn{constructor(e=new P,t=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new P){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new P){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ys=class extends mn{constructor(e=new ce,t=new ce,n=new ce){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ce){let n=t,r=this.v0,s=this.v1,o=this.v2;return n.set(Ps(e,r.x,s.x,o.x),Ps(e,r.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},La=class extends mn{constructor(e=new P,t=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new P){let n=t,r=this.v0,s=this.v1,o=this.v2;return n.set(Ps(e,r.x,s.x,o.x),Ps(e,r.y,s.y,o.y),Ps(e,r.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Zs=class extends mn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ce){let n=t,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,c=r[o===0?o:o-1],l=r[o],h=r[o>r.length-2?r.length-1:o+1],u=r[o>r.length-3?r.length-1:o+2];return n.set(Vd(a,c.x,l.x,h.x,u.x),Vd(a,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new ce().fromArray(r))}return this}},Zl=Object.freeze({__proto__:null,ArcCurve:Ca,CatmullRomCurve3:Pa,CubicBezierCurve:Ks,CubicBezierCurve3:Ia,EllipseCurve:jr,LineCurve:Js,LineCurve3:Fa,QuadraticBezierCurve:Ys,QuadraticBezierCurve3:La,SplineCurve:Zs}),Da=class extends mn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Zl[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),s=0;for(;s<r.length;){if(r[s]>=n){let o=r[s]-n,a=this.curves[s],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,s=this.curves;r<s.length;r++){let o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(new Zl[r.type]().fromJSON(r))}return this}},$s=class extends Da{constructor(e){super(),this.type="Path",this.currentPoint=new ce,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Js(this.currentPoint.clone(),new ce(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let s=new Ys(this.currentPoint.clone(),new ce(e,t),new ce(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,o){let a=new Ks(this.currentPoint.clone(),new ce(e,t),new ce(n,r),new ce(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Zs(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,r,s,o),this}absarc(e,t,n,r,s,o){return this.absellipse(e,t,n,n,r,s,o),this}ellipse(e,t,n,r,s,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,r,s,o,a,c),this}absellipse(e,t,n,r,s,o,a,c){let l=new jr(e,t,n,r,s,o,a,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Kr=class extends $s{constructor(e){super(e),this.uuid=Sn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(new $s().fromJSON(r))}return this}};function Bg(i,e,t=2){let n=e&&e.length,r=n?e[0]*t:i.length,s=qf(i,0,r,t,!0),o=[];if(!s||s.next===s.prev)return o;let a,c,l;if(n&&(s=Vg(i,e,s,t)),i.length>80*t){a=i[0],c=i[1];let h=a,u=c;for(let d=t;d<r;d+=t){let f=i[d],g=i[d+1];f<a&&(a=f),g<c&&(c=g),f>h&&(h=f),g>u&&(u=g)}l=Math.max(h-a,u-c),l=l!==0?32767/l:0}return Qs(s,o,t,a,c,l,0),o}function qf(i,e,t,n,r){let s;if(r===e0(i,e,t,n)>0)for(let o=e;o<t;o+=n)s=Wd(o/n|0,i[o],i[o+1],s);else for(let o=t-n;o>=e;o-=n)s=Wd(o/n|0,i[o],i[o+1],s);return s&&Jr(s,s.next)&&(to(s),s=s.next),s}function nr(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Jr(t,t.next)||At(t.prev,t,t.next)===0)){if(to(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Qs(i,e,t,n,r,s,o){if(!i)return;!o&&s&&Kg(i,n,r,s);let a=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(s?zg(i,n,r,s):kg(i)){e.push(c.i,i.i,l.i),to(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=Gg(nr(i),e),Qs(i,e,t,n,r,s,2)):o===2&&Hg(i,e,t,n,r,s):Qs(nr(i),e,t,n,r,s,1);break}}}function kg(i){let e=i.prev,t=i,n=i.next;if(At(e,t,n)>=0)return!1;let r=e.x,s=t.x,o=n.x,a=e.y,c=t.y,l=n.y,h=Math.min(r,s,o),u=Math.min(a,c,l),d=Math.max(r,s,o),f=Math.max(a,c,l),g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&As(r,a,s,c,o,l,g.x,g.y)&&At(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function zg(i,e,t,n){let r=i.prev,s=i,o=i.next;if(At(r,s,o)>=0)return!1;let a=r.x,c=s.x,l=o.x,h=r.y,u=s.y,d=o.y,f=Math.min(a,c,l),g=Math.min(h,u,d),_=Math.max(a,c,l),m=Math.max(h,u,d),p=$l(f,g,e,t,n),M=$l(_,m,e,t,n),T=i.prevZ,x=i.nextZ;for(;T&&T.z>=p&&x&&x.z<=M;){if(T.x>=f&&T.x<=_&&T.y>=g&&T.y<=m&&T!==r&&T!==o&&As(a,h,c,u,l,d,T.x,T.y)&&At(T.prev,T,T.next)>=0||(T=T.prevZ,x.x>=f&&x.x<=_&&x.y>=g&&x.y<=m&&x!==r&&x!==o&&As(a,h,c,u,l,d,x.x,x.y)&&At(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;T&&T.z>=p;){if(T.x>=f&&T.x<=_&&T.y>=g&&T.y<=m&&T!==r&&T!==o&&As(a,h,c,u,l,d,T.x,T.y)&&At(T.prev,T,T.next)>=0)return!1;T=T.prevZ}for(;x&&x.z<=M;){if(x.x>=f&&x.x<=_&&x.y>=g&&x.y<=m&&x!==r&&x!==o&&As(a,h,c,u,l,d,x.x,x.y)&&At(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Gg(i,e){let t=i;do{let n=t.prev,r=t.next.next;!Jr(n,r)&&jf(n,t,t.next,r)&&eo(n,r)&&eo(r,n)&&(e.push(n.i,t.i,r.i),to(t),to(t.next),t=i=r),t=t.next}while(t!==i);return nr(t)}function Hg(i,e,t,n,r,s){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Zg(o,a)){let c=Kf(o,a);o=nr(o,o.next),c=nr(c,c.next),Qs(o,e,t,n,r,s,0),Qs(c,e,t,n,r,s,0);return}a=a.next}o=o.next}while(o!==i)}function Vg(i,e,t,n){let r=[];for(let s=0,o=e.length;s<o;s++){let a=e[s]*n,c=s<o-1?e[s+1]*n:i.length,l=qf(i,a,c,n,!1);l===l.next&&(l.steiner=!0),r.push(Yg(l))}r.sort(Wg);for(let s=0;s<r.length;s++)t=qg(r[s],t);return t}function Wg(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=n-r}return t}function qg(i,e){let t=Xg(i,e);if(!t)return e;let n=Kf(t,i);return nr(n,n.next),nr(t,t.next)}function Xg(i,e){let t=e,n=i.x,r=i.y,s=-1/0,o;if(Jr(i,t))return t;do{if(Jr(i,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){let u=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>s&&(s=u,o=t.x<t.next.x?t:t.next,u===n))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,c=o.x,l=o.y,h=1/0;t=o;do{if(n>=t.x&&t.x>=c&&n!==t.x&&Xf(r<l?n:s,r,c,l,r<l?s:n,r,t.x,t.y)){let u=Math.abs(r-t.y)/(n-t.x);eo(t,i)&&(u<h||u===h&&(t.x>o.x||t.x===o.x&&jg(o,t)))&&(o=t,h=u)}t=t.next}while(t!==a);return o}function jg(i,e){return At(i.prev,i,e.prev)<0&&At(e.next,i,i.next)<0}function Kg(i,e,t,n){let r=i;do r.z===0&&(r.z=$l(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,Jg(r)}function Jg(i){let e,t=1;do{let n=i,r;i=null;let s=null;for(e=0;n;){e++;let o=n,a=0;for(let l=0;l<t&&(a++,o=o.nextZ,!!o);l++);let c=t;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(r=n,n=n.nextZ,a--):(r=o,o=o.nextZ,c--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;n=o}s.nextZ=null,t*=2}while(e>1);return i}function $l(i,e,t,n,r){return i=(i-t)*r|0,e=(e-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Yg(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Xf(i,e,t,n,r,s,o,a){return(r-o)*(e-a)>=(i-o)*(s-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(s-a)>=(r-o)*(n-a)}function As(i,e,t,n,r,s,o,a){return!(i===o&&e===a)&&Xf(i,e,t,n,r,s,o,a)}function Zg(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!$g(i,e)&&(eo(i,e)&&eo(e,i)&&Qg(i,e)&&(At(i.prev,i,e.prev)||At(i,e.prev,e))||Jr(i,e)&&At(i.prev,i,i.next)>0&&At(e.prev,e,e.next)>0)}function At(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Jr(i,e){return i.x===e.x&&i.y===e.y}function jf(i,e,t,n){let r=ha(At(i,e,t)),s=ha(At(i,e,n)),o=ha(At(t,n,i)),a=ha(At(t,n,e));return!!(r!==s&&o!==a||r===0&&la(i,t,e)||s===0&&la(i,n,e)||o===0&&la(t,i,n)||a===0&&la(t,e,n))}function la(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function ha(i){return i>0?1:i<0?-1:0}function $g(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&jf(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function eo(i,e){return At(i.prev,i,i.next)<0?At(i,e,i.next)>=0&&At(i,i.prev,e)>=0:At(i,e,i.prev)<0||At(i,i.next,e)<0}function Qg(i,e){let t=i,n=!1,r=(i.x+e.x)/2,s=(i.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Kf(i,e){let t=Ql(i.i,i.x,i.y),n=Ql(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Wd(i,e,t,n){let r=Ql(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function to(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Ql(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function e0(i,e,t,n){let r=0;for(let s=e,o=t-n;s<t;s+=n)r+=(i[o]-i[s])*(i[s+1]+i[o+1]),o=s;return r}var eh=class{static triangulate(e,t,n=2){return Bg(e,t,n)}},ji=class i{static area(e){let t=e.length,n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],r=[],s=[];qd(e),Xd(n,e);let o=e.length;t.forEach(qd);for(let c=0;c<t.length;c++)r.push(o),o+=t[c].length,Xd(n,t[c]);let a=eh.triangulate(n,r);for(let c=0;c<a.length;c+=3)s.push(a.slice(c,c+3));return s}};function qd(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Xd(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var no=class i extends Tt{constructor(e=new Kr([new ce(.5,.5),new ce(-.5,.5),new ce(-.5,-.5),new ce(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],s=[];for(let a=0,c=e.length;a<c;a++){let l=e[a];o(l)}this.setAttribute("position",new it(r,3)),this.setAttribute("uv",new it(s,2)),this.computeVertexNormals();function o(a){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3,p=t.extrudePath,M=t.UVGenerator!==void 0?t.UVGenerator:t0,T,x=!1,S,E,R,v;if(p){T=p.getSpacedPoints(h),x=!0,d=!1;let ee=p.isCatmullRomCurve3?p.closed:!1;S=p.computeFrenetFrames(h,ee),E=new P,R=new P,v=new P}d||(m=0,f=0,g=0,_=0);let w=a.extractPoints(l),C=w.shape,F=w.holes;if(!ji.isClockWise(C)){C=C.reverse();for(let ee=0,re=F.length;ee<re;ee++){let se=F[ee];ji.isClockWise(se)&&(F[ee]=se.reverse())}}function B(ee){let se=10000000000000001e-36,oe=ee[0];for(let he=1;he<=ee.length;he++){let Ue=he%ee.length,Ne=ee[Ue],He=Ne.x-oe.x,qe=Ne.y-oe.y,I=He*He+qe*qe,ct=Math.max(Math.abs(Ne.x),Math.abs(Ne.y),Math.abs(oe.x),Math.abs(oe.y)),et=se*ct*ct;if(I<=et){ee.splice(Ue,1),he--;continue}oe=Ne}}B(C),F.forEach(B);let L=F.length,k=C;for(let ee=0;ee<L;ee++){let re=F[ee];C=C.concat(re)}function q(ee,re,se){return re||Be("ExtrudeGeometry: vec does not exist"),ee.clone().addScaledVector(re,se)}let W=C.length;function ie(ee,re,se){let oe,he,Ue,Ne=ee.x-re.x,He=ee.y-re.y,qe=se.x-ee.x,I=se.y-ee.y,ct=Ne*Ne+He*He,et=Ne*I-He*qe;if(Math.abs(et)>Number.EPSILON){let A=Math.sqrt(ct),b=Math.sqrt(qe*qe+I*I),O=re.x-He/A,H=re.y+Ne/A,j=se.x-I/b,ae=se.y+qe/b,le=((j-O)*I-(ae-H)*qe)/(Ne*I-He*qe);oe=O+Ne*le-ee.x,he=H+He*le-ee.y;let K=oe*oe+he*he;if(K<=2)return new ce(oe,he);Ue=Math.sqrt(K/2)}else{let A=!1;Ne>Number.EPSILON?qe>Number.EPSILON&&(A=!0):Ne<-Number.EPSILON?qe<-Number.EPSILON&&(A=!0):Math.sign(He)===Math.sign(I)&&(A=!0),A?(oe=-He,he=Ne,Ue=Math.sqrt(ct)):(oe=Ne,he=He,Ue=Math.sqrt(ct/2))}return new ce(oe/Ue,he/Ue)}let X=[];for(let ee=0,re=k.length,se=re-1,oe=ee+1;ee<re;ee++,se++,oe++)se===re&&(se=0),oe===re&&(oe=0),X[ee]=ie(k[ee],k[se],k[oe]);let $=[],te,Ie=X.concat();for(let ee=0,re=L;ee<re;ee++){let se=F[ee];te=[];for(let oe=0,he=se.length,Ue=he-1,Ne=oe+1;oe<he;oe++,Ue++,Ne++)Ue===he&&(Ue=0),Ne===he&&(Ne=0),te[oe]=ie(se[oe],se[Ue],se[Ne]);$.push(te),Ie=Ie.concat(te)}let Te;if(m===0)Te=ji.triangulateShape(k,F);else{let ee=[],re=[];for(let se=0;se<m;se++){let oe=se/m,he=f*Math.cos(oe*Math.PI/2),Ue=g*Math.sin(oe*Math.PI/2)+_;for(let Ne=0,He=k.length;Ne<He;Ne++){let qe=q(k[Ne],X[Ne],Ue);be(qe.x,qe.y,-he),oe===0&&ee.push(qe)}for(let Ne=0,He=L;Ne<He;Ne++){let qe=F[Ne];te=$[Ne];let I=[];for(let ct=0,et=qe.length;ct<et;ct++){let A=q(qe[ct],te[ct],Ue);be(A.x,A.y,-he),oe===0&&I.push(A)}oe===0&&re.push(I)}}Te=ji.triangulateShape(ee,re)}let ot=Te.length,Qe=g+_;for(let ee=0;ee<W;ee++){let re=d?q(C[ee],Ie[ee],Qe):C[ee];x?(R.copy(S.normals[0]).multiplyScalar(re.x),E.copy(S.binormals[0]).multiplyScalar(re.y),v.copy(T[0]).add(R).add(E),be(v.x,v.y,v.z)):be(re.x,re.y,0)}for(let ee=1;ee<=h;ee++)for(let re=0;re<W;re++){let se=d?q(C[re],Ie[re],Qe):C[re];x?(R.copy(S.normals[ee]).multiplyScalar(se.x),E.copy(S.binormals[ee]).multiplyScalar(se.y),v.copy(T[ee]).add(R).add(E),be(v.x,v.y,v.z)):be(se.x,se.y,u/h*ee)}for(let ee=m-1;ee>=0;ee--){let re=ee/m,se=f*Math.cos(re*Math.PI/2),oe=g*Math.sin(re*Math.PI/2)+_;for(let he=0,Ue=k.length;he<Ue;he++){let Ne=q(k[he],X[he],oe);be(Ne.x,Ne.y,u+se)}for(let he=0,Ue=F.length;he<Ue;he++){let Ne=F[he];te=$[he];for(let He=0,qe=Ne.length;He<qe;He++){let I=q(Ne[He],te[He],oe);x?be(I.x,I.y+T[h-1].y,T[h-1].x+se):be(I.x,I.y,u+se)}}}rt(),J();function rt(){let ee=r.length/3;if(d){let re=0,se=W*re;for(let oe=0;oe<ot;oe++){let he=Te[oe];ke(he[2]+se,he[1]+se,he[0]+se)}re=h+m*2,se=W*re;for(let oe=0;oe<ot;oe++){let he=Te[oe];ke(he[0]+se,he[1]+se,he[2]+se)}}else{for(let re=0;re<ot;re++){let se=Te[re];ke(se[2],se[1],se[0])}for(let re=0;re<ot;re++){let se=Te[re];ke(se[0]+W*h,se[1]+W*h,se[2]+W*h)}}n.addGroup(ee,r.length/3-ee,0)}function J(){let ee=r.length/3,re=0;Q(k,re),re+=k.length;for(let se=0,oe=F.length;se<oe;se++){let he=F[se];Q(he,re),re+=he.length}n.addGroup(ee,r.length/3-ee,1)}function Q(ee,re){let se=ee.length;for(;--se>=0;){let oe=se,he=se-1;he<0&&(he=ee.length-1);for(let Ue=0,Ne=h+m*2;Ue<Ne;Ue++){let He=W*Ue,qe=W*(Ue+1),I=re+oe+He,ct=re+he+He,et=re+he+qe,A=re+oe+qe;ye(I,ct,et,A)}}}function be(ee,re,se){c.push(ee),c.push(re),c.push(se)}function ke(ee,re,se){Ge(ee),Ge(re),Ge(se);let oe=r.length/3,he=M.generateTopUV(n,r,oe-3,oe-2,oe-1);ft(he[0]),ft(he[1]),ft(he[2])}function ye(ee,re,se,oe){Ge(ee),Ge(re),Ge(oe),Ge(re),Ge(se),Ge(oe);let he=r.length/3,Ue=M.generateSideWallUV(n,r,he-6,he-3,he-2,he-1);ft(Ue[0]),ft(Ue[1]),ft(Ue[3]),ft(Ue[1]),ft(Ue[2]),ft(Ue[3])}function Ge(ee){r.push(c[ee*3+0]),r.push(c[ee*3+1]),r.push(c[ee*3+2])}function ft(ee){s.push(ee.x),s.push(ee.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return n0(t,n,e)}static fromJSON(e,t){let n=[];for(let s=0,o=e.shapes.length;s<o;s++){let a=t[e.shapes[s]];n.push(a)}let r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new Zl[r.type]().fromJSON(r)),new i(n,e.options)}},t0={generateTopUV:function(i,e,t,n,r){let s=e[t*3],o=e[t*3+1],a=e[n*3],c=e[n*3+1],l=e[r*3],h=e[r*3+1];return[new ce(s,o),new ce(a,c),new ce(l,h)]},generateSideWallUV:function(i,e,t,n,r,s){let o=e[t*3],a=e[t*3+1],c=e[t*3+2],l=e[n*3],h=e[n*3+1],u=e[n*3+2],d=e[r*3],f=e[r*3+1],g=e[r*3+2],_=e[s*3],m=e[s*3+1],p=e[s*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new ce(o,1-c),new ce(l,1-u),new ce(d,1-g),new ce(_,1-p)]:[new ce(a,1-c),new ce(h,1-u),new ce(f,1-g),new ce(m,1-p)]}};function n0(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,r=i.length;n<r;n++){let s=i[n];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Ln=class i extends Tt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let s=e/2,o=t/2,a=Math.floor(n),c=Math.floor(r),l=a+1,h=c+1,u=e/a,d=t/c,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){let M=p*d-o;for(let T=0;T<l;T++){let x=T*u-s;g.push(x,-M,0),_.push(0,0,1),m.push(T/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let M=0;M<a;M++){let T=M+l*p,x=M+l*(p+1),S=M+1+l*(p+1),E=M+1+l*p;f.push(T,x,E),f.push(x,S,E)}this.setIndex(f),this.setAttribute("position",new it(g,3)),this.setAttribute("normal",new it(_,3)),this.setAttribute("uv",new it(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var gn=class i extends Tt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new P,d=new P,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){let M=[],T=p/n,x=o+T*a,S=e*Math.cos(x),E=Math.sqrt(e*e-S*S),R=0;p===0&&o===0?R=.5/t:p===n&&c===Math.PI&&(R=-.5/t);for(let v=0;v<=t;v++){let w=v/t,C=r+w*s;u.x=-E*Math.cos(C),u.y=S,u.z=E*Math.sin(C),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(w+R,1-T),M.push(l++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<t;M++){let T=h[p][M+1],x=h[p][M],S=h[p+1][M],E=h[p+1][M+1];(p!==0||o>0)&&f.push(T,x,E),(p!==n-1||c<Math.PI)&&f.push(x,S,E)}this.setIndex(f),this.setAttribute("position",new it(g,3)),this.setAttribute("normal",new it(_,3)),this.setAttribute("uv",new it(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var bn=class i extends Tt{constructor(e=1,t=.4,n=12,r=48,s=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s,thetaStart:o,thetaLength:a},n=Math.floor(n),r=Math.floor(r);let c=[],l=[],h=[],u=[],d=new P,f=new P,g=new P;for(let _=0;_<=n;_++){let m=o+_/n*a;for(let p=0;p<=r;p++){let M=p/r*s;f.x=(e+t*Math.cos(m))*Math.cos(M),f.y=(e+t*Math.cos(m))*Math.sin(M),f.z=t*Math.sin(m),l.push(f.x,f.y,f.z),d.x=e*Math.cos(M),d.y=e*Math.sin(M),g.subVectors(f,d).normalize(),h.push(g.x,g.y,g.z),u.push(p/r),u.push(_/n)}}for(let _=1;_<=n;_++)for(let m=1;m<=r;m++){let p=(r+1)*_+m-1,M=(r+1)*(_-1)+m-1,T=(r+1)*(_-1)+m,x=(r+1)*_+m;c.push(p,M,x),c.push(M,T,x)}this.setIndex(c),this.setAttribute("position",new it(l,3)),this.setAttribute("normal",new it(h,3)),this.setAttribute("uv",new it(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};function lr(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];if(jd(r))r.isRenderTargetTexture?(Pe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(jd(r[0])){let s=[];for(let o=0,a=r.length;o<a;o++)s[o]=r[o].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function en(i){let e={};for(let t=0;t<i.length;t++){let n=lr(i[t]);for(let r in n)e[r]=n[r]}return e}function jd(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function i0(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Lh(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ye.workingColorSpace}var zc={clone:lr,merge:en},r0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,s0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Qt=class extends on{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=r0,this.fragmentShader=s0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=lr(e.uniforms),this.uniformsGroups=i0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=t[r.value]||null;break;case"c":this.uniforms[n].value=new Ee().setHex(r.value);break;case"v2":this.uniforms[n].value=new ce().fromArray(r.value);break;case"v3":this.uniforms[n].value=new P().fromArray(r.value);break;case"v4":this.uniforms[n].value=new mt().fromArray(r.value);break;case"m3":this.uniforms[n].value=new We().fromArray(r.value);break;case"m4":this.uniforms[n].value=new Ve().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Na=class extends Qt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Pt=class extends on{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ee(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Mo,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Nt=class extends Pt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ce(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ze(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ee(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ee(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ee(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Yr=class extends on{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Mo,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.combine=Ja,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ua=class extends on{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=If,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Oa=class extends on{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Mi(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function ma(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}function o0(i){function e(r,s){return i[r]-i[s]}let t=i.length,n=new Array(t);for(let r=0;r!==t;++r)n[r]=r;return n.sort(e),n}function Kd(i,e,t){let n=i.length,r=new i.constructor(n);for(let s=0,o=0;o!==n;++s){let a=t[s]*e;for(let c=0;c!==e;++c)r[o++]=i[a+c]}return r}function a0(i,e,t,n){let r=1,s=i[0];for(;s!==void 0&&s[n]===void 0;)s=i[r++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push(...o)),s=i[r++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=i[r++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=i[r++];while(s!==void 0)}var Wn=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],s=t[n-1];e:{t:{let o;n:{i:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=r,r=t[++n],e<r)break t}o=t.length;break n}if(!(e>=s)){let a=t[1];e<a&&(n=2,s=a);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(r=s,s=t[--n-1],e>=s)break t}o=n,n=0;break n}break e}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ba=class extends Wn{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:qi,endingEnd:qi}}intervalChanged_(e,t,n){let r=this.parameterPositions,s=e-2,o=e+1,a=r[s],c=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case Xi:s=e,a=2*t-n;break;case Fs:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Xi:o=e,c=2*n-t;break;case Fs:o=1,c=n+r[1]-r[0];break;default:o=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(e,t,n,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(r-t),_=g*g,m=_*g,p=-d*m+2*d*_-d*g,M=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,T=(-1-f)*m+(1.5+f)*_+.5*g,x=f*m-f*_;for(let S=0;S!==a;++S)s[S]=p*o[h+S]+M*o[l+S]+T*o[c+S]+x*o[u+S];return s}},io=class extends Wn{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(r-t),u=1-h;for(let d=0;d!==a;++d)s[d]=o[l+d]*u+o[c+d]*h;return s}},ka=class extends Wn{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},za=class extends Wn{interpolate_(e,t,n,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this.inTangents,u=this.outTangents;if(!h||!u){let g=(n-t)/(r-t),_=1-g;for(let m=0;m!==a;++m)s[m]=o[l+m]*_+o[c+m]*g;return s}let d=a*2,f=e-1;for(let g=0;g!==a;++g){let _=o[l+g],m=o[c+g],p=f*d+g*2,M=u[p],T=u[p+1],x=e*d+g*2,S=h[x],E=h[x+1],R=l0(n,t,M,S,r);s[g]=Jf(R,_,T,E,m)}return s}};function Jf(i,e,t,n,r){let s=1-i;return s*s*s*e+3*s*s*i*t+3*s*i*i*n+i*i*i*r}function c0(i,e,t,n,r){let s=1-i;return 3*s*s*(t-e)+6*s*i*(n-t)+3*i*i*(r-n)}function l0(i,e,t,n,r){let s=(i-e)/(r-e);for(let o=0;o<8;o++){let a=Jf(s,e,t,n,r)-i;if(Math.abs(a)<1e-10)break;let c=c0(s,e,t,n,r);if(Math.abs(c)<1e-10)break;s=Math.max(0,Math.min(1,s-a/c))}return s}var ln=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Mi(t,this.TimeBufferType),this.values=Mi(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Mi(e.times,Array),values:Mi(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r),ma(e.settings)&&(n.settings={inTangents:Mi(e.settings.inTangents,Array),outTangents:Mi(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new ka(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new io(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ba(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new za(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ji:t=this.InterpolantFactoryMethodDiscrete;break;case Yi:t=this.InterpolantFactoryMethodLinear;break;case fa:t=this.InterpolantFactoryMethodSmooth;break;case Jl:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Pe("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ji;case this.InterpolantFactoryMethodLinear:return Yi;case this.InterpolantFactoryMethodSmooth:return fa;case this.InterpolantFactoryMethodBezier:return Jl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;ma(this.settings)&&(Jd(this.settings.inTangents,e),Jd(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,s=0,o=r-1;for(;s!==r&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Be("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,s=n.length;s===0&&(Be("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){Be("KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){Be("KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(r!==void 0&&jm(r))for(let a=0,c=r.length;a!==c;++a){let l=r[a];if(isNaN(l)){Be("KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===fa,s=e.length-1,o=1;for(let a=1;a<s;++a){let c=!1,l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(r)c=!0;else{let u=a*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){let _=t[u+g];if(_!==t[d+g]||_!==t[f+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,ma(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Jd(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}ln.prototype.ValueTypeName="";ln.prototype.TimeBufferType=Float32Array;ln.prototype.ValueBufferType=Float32Array;ln.prototype.DefaultInterpolation=Yi;var ci=class extends ln{constructor(e,t,n){super(e,t,n)}};ci.prototype.ValueTypeName="bool";ci.prototype.ValueBufferType=Array;ci.prototype.DefaultInterpolation=Ji;ci.prototype.InterpolantFactoryMethodLinear=void 0;ci.prototype.InterpolantFactoryMethodSmooth=void 0;var ro=class extends ln{constructor(e,t,n,r){super(e,t,n,r)}};ro.prototype.ValueTypeName="color";var li=class extends ln{constructor(e,t,n,r){super(e,t,n,r)}};li.prototype.ValueTypeName="number";var Ga=class extends Wn{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(r-t),l=e*a;for(let h=l+a;l!==h;l+=4)Ht.slerpFlat(s,0,o,l-a,o,l,c);return s}},qn=class extends ln{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Ga(this.times,this.values,this.getValueSize(),e)}};qn.prototype.ValueTypeName="quaternion";qn.prototype.InterpolantFactoryMethodSmooth=void 0;var hi=class extends ln{constructor(e,t,n){super(e,t,n)}};hi.prototype.ValueTypeName="string";hi.prototype.ValueBufferType=Array;hi.prototype.DefaultInterpolation=Ji;hi.prototype.InterpolantFactoryMethodLinear=void 0;hi.prototype.InterpolantFactoryMethodSmooth=void 0;var ui=class extends ln{constructor(e,t,n,r){super(e,t,n,r)}};ui.prototype.ValueTypeName="vector";var Ii=class{constructor(e="",t=-1,n=[],r=Oc){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=Sn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,r=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(u0(n[o]).scale(r));let s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){let t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,o=n.length;s!==o;++s)t.push(ln.toJSON(n[s]));return r}static CreateFromMorphTargetSequence(e,t,n,r){let s=t.length,o=[];for(let a=0;a<s;a++){let c=[],l=[];c.push((a+s-1)%s,a,(a+1)%s),l.push(0,1,0);let h=o0(c);c=Kd(c,1,h),l=Kd(l,1,h),!r&&c[0]===0&&(c.push(s),l.push(l[0])),o.push(new li(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let r=e;n=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<n.length;r++)if(n[r].name===t)return n[r];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let r={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){let l=e[a],h=l.name.match(s);if(h&&h.length>1){let u=h[1],d=r[u];d||(r[u]=d=[]),d.push(l)}}let o=[];for(let a in r)o.push(this.CreateFromMorphTargetSequence(a,r[a],t,n));return o}resetDuration(){let e=this.tracks,t=0;for(let n=0,r=e.length;n!==r;++n){let s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function h0(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return li;case"vector":case"vector2":case"vector3":case"vector4":return ui;case"color":return ro;case"quaternion":return qn;case"bool":case"boolean":return ci;case"string":return hi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function u0(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=h0(i.type);if(i.times===void 0){let n=[],r=[];a0(i.keys,n,r,"value"),i.times=n,i.values=r}let t;return e.parse!==void 0?t=e.parse(i):t=new e(i.name,i.times,i.values,i.interpolation),ma(i.settings)&&(t.settings={inTangents:Mi(i.settings.inTangents,Float32Array),outTangents:Mi(i.settings.outTangents,Float32Array)}),t}var Hn={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(Yd(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!Yd(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function Yd(i){try{let e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var Ha=class{constructor(e,t,n){let r=this,s=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,s===!1&&r.onStart!==void 0&&r.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,r.onProgress!==void 0&&r.onProgress(h,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let f=l[u],g=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Yf=new Ha,Xn=class{constructor(e){this.manager=e!==void 0?e:Yf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Xn.DEFAULT_MATERIAL_NAME="__DEFAULT";var si={},th=class extends Error{constructor(e,t){super(e),this.response=t}},Zr=class extends Xn{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=Hn.get(`file:${e}`);if(s!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0);return}if(si[e]!==void 0){si[e].push({onLoad:t,onProgress:n,onError:r});return}si[e]=[],si[e].push({onLoad:t,onProgress:n,onError:r});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Pe("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=si[e],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0,_=0,m=new ReadableStream({start(p){M();function M(){u.read().then(({done:T,value:x})=>{if(T)p.close();else{_+=x.byteLength;let S=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let E=0,R=h.length;E<R;E++){let v=h[E];v.onProgress&&v.onProgress(S)}p.enqueue(x),M()}},T=>{p.error(T)})}}});return new Response(m)}else throw new th(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a==="")return l.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(g=>f.decode(g))}}}).then(l=>{Hn.add(`file:${e}`,l);let h=si[e];delete si[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onLoad&&f.onLoad(l)}}).catch(l=>{let h=si[e];if(h===void 0)throw this.manager.itemError(e),l;delete si[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Cr=new WeakMap,Va=class extends Xn{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,o=Hn.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);else{let u=Cr.get(o);u===void 0&&(u=[],Cr.set(o,u)),u.push({onLoad:t,onError:r})}return o}let a=Ur("img");function c(){h(),t&&t(this);let u=Cr.get(this)||[];for(let d=0;d<u.length;d++){let f=u[d];f.onLoad&&f.onLoad(this)}Cr.delete(this),s.manager.itemEnd(e)}function l(u){h(),r&&r(u),Hn.remove(`image:${e}`);let d=Cr.get(this)||[];for(let f=0;f<d.length;f++){let g=d[f];g.onError&&g.onError(u)}Cr.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Hn.add(`image:${e}`,a),s.manager.itemStart(e),a.src=e,a}};var so=class extends Xn{constructor(e){super(e)}load(e,t,n,r){let s=new Vt,o=new Va(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,r),s}},ir=class extends Et{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ee(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},oo=class extends ir{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ee(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Xl=new Ve,Zd=new P,$d=new P,$r=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ce(512,512),this.mapType=un,this.map=null,this.mapPass=null,this.matrix=new Ve,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new qr,this._frameExtents=new ce(1,1),this._viewportCount=1,this._viewports=[new mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Zd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Zd),$d.setFromMatrixPosition(e.target.matrixWorld),t.lookAt($d),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Xl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Xl,e.coordinateSystem,e.reversedDepth);let s=this._frameExtents,o=r?r.z/s.x:1,a=r?r.w/s.y:1,c=r?r.x/s.x:0,l=r?r.y/s.y:0;e.coordinateSystem===Nr||e.reversedDepth?t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),t.multiply(Xl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},ua=new P,da=new Ht,Gn=new P,ao=class extends Et{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ve,this.projectionMatrix=new Ve,this.projectionMatrixInverse=new Ve,this.coordinateSystem=In,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ua,da,Gn),Gn.x===1&&Gn.y===1&&Gn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ua,da,Gn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(ua,da,Gn),Gn.x===1&&Gn.y===1&&Gn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ua,da,Gn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},yi=new P,Qd=new ce,ef=new ce,zt=class extends ao{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Zi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Rs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Zi*2*Math.atan(Math.tan(Rs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){yi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(yi.x,yi.y).multiplyScalar(-e/yi.z),yi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(yi.x,yi.y).multiplyScalar(-e/yi.z)}getViewSize(e,t){return this.getViewBounds(e,Qd,ef),t.subVectors(ef,Qd)}setViewOffset(e,t,n,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Rs*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,t-=o.offsetY*n/l,r*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},nh=class extends $r{constructor(){super(new zt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Zi*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},co=class extends ir{constructor(e,t,n=0,r=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.target=new Et,this.distance=n,this.angle=r,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new nh}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},ih=class extends $r{constructor(){super(new zt(90,1,.5,500)),this.isPointLightShadow=!0}},lo=class extends ir{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new ih}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Fi=class extends ao{constructor(e=-1,t=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-e,o=n+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},rh=class extends $r{constructor(){super(new Fi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},rr=class extends ir{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.target=new Et,this.shadow=new rh}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var di=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var jl=new WeakMap,ho=class extends Xn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Pe("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Pe("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,o=Hn.get(`image-bitmap:${e}`);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(l=>{jl.has(o)===!0?(r&&r(jl.get(o)),s.manager.itemError(e),s.manager.itemEnd(e)):(t&&t(l),s.manager.itemEnd(e))});return}setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);return}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},s.options,{colorSpaceConversion:"none"}))}).then(function(l){return Hn.add(`image-bitmap:${e}`,l),t&&t(l),s.manager.itemEnd(e),l}).catch(function(l){r&&r(l),jl.set(c,l),Hn.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});Hn.add(`image-bitmap:${e}`,c),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Pr=-90,Ir=1,Wa=class extends Et{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new zt(Pr,Ir,e,t);r.layers=this.layers,this.add(r);let s=new zt(Pr,Ir,e,t);s.layers=this.layers,this.add(s);let o=new zt(Pr,Ir,e,t);o.layers=this.layers,this.add(o);let a=new zt(Pr,Ir,e,t);a.layers=this.layers,this.add(a);let c=new zt(Pr,Ir,e,t);c.layers=this.layers,this.add(c);let l=new zt(Pr,Ir,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,s,o,a,c]=t;for(let l of t)this.remove(l);if(e===In)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Nr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},qa=class extends zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Xa=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let r,s,o;switch(t){case"quaternion":r=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":r=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:r=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=r,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,r=this.valueSize,s=e*r+r,o=this.cumulativeWeight;if(o===0){for(let a=0;a!==r;++a)n[s+a]=n[a];o=t}else{o+=t;let a=t/o;this._mixBufferRegion(n,s,0,a,r)}this.cumulativeWeight=o}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,r=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,r,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,r=e*t+t,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){let c=t*this._origIndex;this._mixBufferRegion(n,r,c,1-s,t)}o>0&&this._mixBufferRegionAdditive(n,r,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){a.setValue(n,r);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,r=n*this._origIndex;e.getValue(t,r);for(let s=n,o=r;s!==o;++s)t[s]=t[r+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,r,s){if(r>=.5)for(let o=0;o!==s;++o)e[t+o]=e[n+o]}_slerp(e,t,n,r){Ht.slerpFlat(e,t,e,t,e,n,r)}_slerpAdditive(e,t,n,r,s){let o=this._workIndex*s;Ht.multiplyQuaternionsFlat(e,o,e,t,e,n),Ht.slerpFlat(e,t,e,t,e,o,r)}_lerp(e,t,n,r,s){let o=1-r;for(let a=0;a!==s;++a){let c=t+a;e[c]=e[c]*o+e[n+a]*r}}_lerpAdditive(e,t,n,r,s){for(let o=0;o!==s;++o){let a=t+o;e[a]=e[a]+e[n+o]*r}}},Dh="\\[\\]\\.:\\/",d0=new RegExp("["+Dh+"]","g"),Nh="[^"+Dh+"]",f0="[^"+Dh.replace("\\.","")+"]",p0=/((?:WC+[\/:])*)/.source.replace("WC",Nh),m0=/(WCOD+)?/.source.replace("WCOD",f0),g0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Nh),b0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Nh),x0=new RegExp("^"+p0+m0+g0+b0+"$"),v0=["material","materials","bones","map"],sh=class{constructor(e,t,n){let r=n||bt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},bt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(d0,"")}static parseTrackName(e){let t=x0.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);v0.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let o=0;o<s.length;o++){let a=s[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Pe("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){Be("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Be("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Be("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Be("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Be("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Be("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){Be("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[r];if(o===void 0){let l=t.nodeName;Be("PropertyBinding: Trying to update property for track: "+l+"."+r+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){Be("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Be("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};bt.Composite=sh;bt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};bt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};bt.prototype.GetterByBindingType=[bt.prototype._getValue_direct,bt.prototype._getValue_array,bt.prototype._getValue_arrayElement,bt.prototype._getValue_toArray];bt.prototype.SetterByBindingTypeAndVersioning=[[bt.prototype._setValue_direct,bt.prototype._setValue_direct_setNeedsUpdate,bt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[bt.prototype._setValue_array,bt.prototype._setValue_array_setNeedsUpdate,bt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[bt.prototype._setValue_arrayElement,bt.prototype._setValue_arrayElement_setNeedsUpdate,bt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[bt.prototype._setValue_fromArray,bt.prototype._setValue_fromArray_setNeedsUpdate,bt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var ja=class{constructor(e,t,n=null,r=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=r;let s=t.tracks,o=s.length,a=new Array(o),c={endingStart:qi,endingEnd:qi};for(let l=0;l!==o;++l){let h=s[l].createInterpolant(null);a[l]=h,h.settings=c}this._interpolantSettings=c,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._restoreTimeScale=null,this._weightInterpolant=null,this.loop=Rf,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){let r=this._clip.duration,s=e._clip.duration,o=s/r,a=r/s;e._restoreTimeScale=e.timeScale,this._restoreTimeScale=this.timeScale,e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let r=this._mixer,s=r.time,o=this.timeScale,a=this._timeScaleInterpolant;a===null&&(a=r._lendControlInterpolant(),this._timeScaleInterpolant=a);let c=a.parameterPositions,l=a.sampleValues;return c[0]=s,c[1]=s+n,l[0]=e/o,l[1]=t/o,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this._restoreTimeScale=null,this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,r){if(!this.enabled){this._updateWeight(e);return}let s=this._startTime;if(s!==null){let c=(e-s)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);let o=this._updateTime(t),a=this._updateWeight(e);if(a>0){let c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case Pf:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(o),l[h].accumulateAdditive(a);break;case Oc:default:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(o),l[h].accumulate(r,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let r=n.evaluate(e)[0];t*=r,e>n.parameterPositions[1]&&(this.stopFading(),r===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let r=n.evaluate(e)[0];t*=r,e>n.parameterPositions[1]&&(t===0?this.paused=!0:(this._restoreTimeScale!==null&&(t=this._restoreTimeScale),this.timeScale=t),this.stopWarping())}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,r=this.time+e,s=this._loopCount,o=n===Cf;if(e===0)return s===-1?r:o&&(s&1)===1?t-r:r;if(n===Uc){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(r>=t)r=t;else if(r<0)r=0;else{this.time=r;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),r>=t||r<0){let a=Math.floor(r/t);r-=t*a,s+=Math.abs(a);let c=this.repetitions-s;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,r=e>0?t:0,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){let l=e<0;this._setEndings(l,!l,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=r,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this._loopCount=s,this.time=r;if(o&&(s&1)===1)return t-r}return r}_setEndings(e,t,n){let r=this._interpolantSettings;n?(r.endingStart=Xi,r.endingEnd=Xi):(e?r.endingStart=this.zeroSlopeAtStart?Xi:qi:r.endingStart=Fs,t?r.endingEnd=this.zeroSlopeAtEnd?Xi:qi:r.endingEnd=Fs)}_scheduleFading(e,t,n){let r=this._mixer,s=r.time,o=this._weightInterpolant;o===null&&(o=r._lendControlInterpolant(),this._weightInterpolant=o);let a=o.parameterPositions,c=o.sampleValues;return a[0]=s,c[0]=t,a[1]=s+e,c[1]=n,this}},_0=new Float32Array(1),Qr=class extends Fn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){let n=e._localRoot||this._root,r=e._clip.tracks,s=r.length,o=e._propertyBindings,a=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName,h=l[c];h===void 0&&(h={},l[c]=h);for(let u=0;u!==s;++u){let d=r[u],f=d.name,g=h[f];if(g!==void 0)++g.referenceCount,o[u]=g;else{if(g=o[u],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,c,f));continue}let _=t&&t._propertyBindings[u].binding.parsedPath;g=new Xa(bt.create(n,f,_),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,c,f),o[u]=g}a[u].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,r=e._clip.uuid,s=this._actionsByClip[r];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,r,n)}let t=e._propertyBindings;for(let n=0,r=t.length;n!==r;++n){let s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,r=t.length;n!==r;++n){let s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let r=this._actions,s=this._actionsByClip,o=s[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=o;else{let a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=r.length,r.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],r=e._cacheIndex;n._cacheIndex=r,t[r]=n,t.pop(),e._cacheIndex=null;let s=e._clip.uuid,o=this._actionsByClip,a=o[s],c=a.knownActions,l=c[c.length-1],h=e._byClipCacheIndex;l._byClipCacheIndex=h,c[h]=l,c.pop(),e._byClipCacheIndex=null;let u=a.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],c.length===0&&delete o[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,r=t.length;n!==r;++n){let s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,r=this._nActiveActions++,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,r=--this._nActiveActions,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){let r=this._bindingsByRootAndName,s=this._bindings,o=r[t];o===void 0&&(o={},r[t]=o),o[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,r=n.rootNode.uuid,s=n.path,o=this._bindingsByRootAndName,a=o[r],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete a[s],Object.keys(a).length===0&&delete o[r]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,r=this._nActiveBindings++,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,r=--this._nActiveBindings,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new io(new Float32Array(2),new Float32Array(2),1,_0),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,r=--this._nActiveControlInterpolants,s=t[r];e.__cacheIndex=r,t[r]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){let r=t||this._root,s=r.uuid,o=typeof e=="string"?Ii.findByName(r,e):e,a=o!==null?o.uuid:e,c=this._actionsByClip[a],l=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Oc),c!==void 0){let u=c.actionByRoot[s];if(u!==void 0&&u.blendMode===n)return u;l=c.knownActions[0],o===null&&(o=l._clip)}if(o===null)return null;let h=new ja(this,o,t,n);return this._bindAction(h,l),this._addInactiveAction(h,a,s),h}existingAction(e,t){let n=t||this._root,r=n.uuid,s=typeof e=="string"?Ii.findByName(n,e):e,o=s?s.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[r]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,r=this.time+=e,s=Math.sign(e),o=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(r,e,s,o);let a=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)a[l].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,r=this._actionsByClip,s=r[n];if(s!==void 0){let o=s.knownActions;for(let a=0,c=o.length;a!==c;++a){let l=o[a];this._deactivateAction(l);let h=l._cacheIndex,u=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(l)}delete r[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let o in n){let a=n[o].actionByRoot,c=a[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}let r=this._bindingsByRootAndName,s=r[t];if(s!==void 0)for(let o in s){let a=s[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};var tf=new Ve,uo=class{constructor(e,t,n=0,r=1/0){this.ray=new Ti(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new kr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Be("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return tf.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(tf),this}intersectObject(e,t=!0,n=[]){return oh(e,this,n,t),n.sort(nf),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)oh(e[r],this,n,t);return n.sort(nf),n}};function nf(i,e){return i.distance-e.distance}function oh(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){let s=i.children;for(let o=0,a=s.length;o<a;o++)oh(s[o],e,t,!0)}}var Gh=class Gh{constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}};Gh.prototype.isMatrix2=!0;var ah=Gh;function Uh(i,e,t,n){let r=y0(n);switch(t){case Th:return i*e;case nc:return i*e/r.components*r.byteLength;case ic:return i*e/r.components*r.byteLength;case Ni:return i*e*2/r.components*r.byteLength;case rc:return i*e*2/r.components*r.byteLength;case wh:return i*e*3/r.components*r.byteLength;case vn:return i*e*4/r.components*r.byteLength;case sc:return i*e*4/r.components*r.byteLength;case mo:case go:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case bo:case xo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ac:case lc:return Math.max(i,16)*Math.max(e,8)/4;case oc:case cc:return Math.max(i,8)*Math.max(e,8)/2;case hc:case uc:case fc:case pc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case dc:case vo:case mc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case gc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case bc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case xc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case vc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case _c:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case yc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Mc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Sc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Ec:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Tc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case wc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ac:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Rc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Cc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Pc:case Ic:case Fc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Lc:case Dc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case _o:case Nc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function y0(i){switch(i){case un:case yh:return{byteLength:1,components:1};case is:case Mh:case On:return{byteLength:2,components:1};case ec:case tc:return{byteLength:2,components:4};case Un:case Qa:case xn:return{byteLength:4,components:1};case Sh:case Eh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Pe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function xp(){let i=null,e=!1,t=null,n=null;function r(s,o){n=i.requestAnimationFrame(r),t(s,o)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function E0(i){let e=new WeakMap;function t(a,c){let l=a.array,h=a.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){let h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){let g=u[d],_=u[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){let _=u[f];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}var T0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,w0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,A0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,R0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,C0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,P0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,I0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,F0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,L0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,D0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,N0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,U0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,O0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,B0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,k0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,z0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,G0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,H0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,V0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,W0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,q0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,X0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,j0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,K0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,J0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Y0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Z0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Q0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,eb=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,tb="gl_FragColor = linearToOutputTexel( gl_FragColor );",nb=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ib=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,rb=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,sb=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ob=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ab=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,cb=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,lb=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,hb=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ub=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,db=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,fb=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,pb=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,mb=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,gb=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,bb=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,xb=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,vb=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,_b=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,yb=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Mb=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Sb=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Eb=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Tb=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,wb=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ab=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Rb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Cb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Pb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ib=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Fb=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Lb=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Db=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Nb=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ub=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ob=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Bb=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,kb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,zb=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Gb=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Hb=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vb=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Wb=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,qb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Kb=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Jb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Yb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Zb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,$b=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Qb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ex=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,tx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,nx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ix=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,rx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,sx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ox=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ax=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,cx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,lx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,hx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ux=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,dx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,fx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,px=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,mx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,gx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,bx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,xx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,vx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,_x=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,yx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Mx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Sx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ex=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Tx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,wx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ax=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Px=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ix=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Fx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Lx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Dx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Nx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ux=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ox=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Bx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,kx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,zx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Hx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Wx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Xx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,jx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Kx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Yx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$x=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,ev=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,iv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,rv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Je={alphahash_fragment:T0,alphahash_pars_fragment:w0,alphamap_fragment:A0,alphamap_pars_fragment:R0,alphatest_fragment:C0,alphatest_pars_fragment:P0,aomap_fragment:I0,aomap_pars_fragment:F0,batching_pars_vertex:L0,batching_vertex:D0,begin_vertex:N0,beginnormal_vertex:U0,bsdfs:O0,iridescence_fragment:B0,bumpmap_pars_fragment:k0,clipping_planes_fragment:z0,clipping_planes_pars_fragment:G0,clipping_planes_pars_vertex:H0,clipping_planes_vertex:V0,color_fragment:W0,color_pars_fragment:q0,color_pars_vertex:X0,color_vertex:j0,common:K0,cube_uv_reflection_fragment:J0,defaultnormal_vertex:Y0,displacementmap_pars_vertex:Z0,displacementmap_vertex:$0,emissivemap_fragment:Q0,emissivemap_pars_fragment:eb,colorspace_fragment:tb,colorspace_pars_fragment:nb,envmap_fragment:ib,envmap_common_pars_fragment:rb,envmap_pars_fragment:sb,envmap_pars_vertex:ob,envmap_physical_pars_fragment:bb,envmap_vertex:ab,fog_vertex:cb,fog_pars_vertex:lb,fog_fragment:hb,fog_pars_fragment:ub,gradientmap_pars_fragment:db,lightmap_pars_fragment:fb,lights_lambert_fragment:pb,lights_lambert_pars_fragment:mb,lights_pars_begin:gb,lights_toon_fragment:xb,lights_toon_pars_fragment:vb,lights_phong_fragment:_b,lights_phong_pars_fragment:yb,lights_physical_fragment:Mb,lights_physical_pars_fragment:Sb,lights_fragment_begin:Eb,lights_fragment_maps:Tb,lights_fragment_end:wb,lightprobes_pars_fragment:Ab,logdepthbuf_fragment:Rb,logdepthbuf_pars_fragment:Cb,logdepthbuf_pars_vertex:Pb,logdepthbuf_vertex:Ib,map_fragment:Fb,map_pars_fragment:Lb,map_particle_fragment:Db,map_particle_pars_fragment:Nb,metalnessmap_fragment:Ub,metalnessmap_pars_fragment:Ob,morphinstance_vertex:Bb,morphcolor_vertex:kb,morphnormal_vertex:zb,morphtarget_pars_vertex:Gb,morphtarget_vertex:Hb,normal_fragment_begin:Vb,normal_fragment_maps:Wb,normal_pars_fragment:qb,normal_pars_vertex:Xb,normal_vertex:jb,normalmap_pars_fragment:Kb,clearcoat_normal_fragment_begin:Jb,clearcoat_normal_fragment_maps:Yb,clearcoat_pars_fragment:Zb,iridescence_pars_fragment:$b,opaque_fragment:Qb,packing:ex,premultiplied_alpha_fragment:tx,project_vertex:nx,dithering_fragment:ix,dithering_pars_fragment:rx,roughnessmap_fragment:sx,roughnessmap_pars_fragment:ox,shadowmap_pars_fragment:ax,shadowmap_pars_vertex:cx,shadowmap_vertex:lx,shadowmask_pars_fragment:hx,skinbase_vertex:ux,skinning_pars_vertex:dx,skinning_vertex:fx,skinnormal_vertex:px,specularmap_fragment:mx,specularmap_pars_fragment:gx,tonemapping_fragment:bx,tonemapping_pars_fragment:xx,transmission_fragment:vx,transmission_pars_fragment:_x,uv_pars_fragment:yx,uv_pars_vertex:Mx,uv_vertex:Sx,worldpos_vertex:Ex,background_vert:Tx,background_frag:wx,backgroundCube_vert:Ax,backgroundCube_frag:Rx,cube_vert:Cx,cube_frag:Px,depth_vert:Ix,depth_frag:Fx,distance_vert:Lx,distance_frag:Dx,equirect_vert:Nx,equirect_frag:Ux,linedashed_vert:Ox,linedashed_frag:Bx,meshbasic_vert:kx,meshbasic_frag:zx,meshlambert_vert:Gx,meshlambert_frag:Hx,meshmatcap_vert:Vx,meshmatcap_frag:Wx,meshnormal_vert:qx,meshnormal_frag:Xx,meshphong_vert:jx,meshphong_frag:Kx,meshphysical_vert:Jx,meshphysical_frag:Yx,meshtoon_vert:Zx,meshtoon_frag:$x,points_vert:Qx,points_frag:ev,shadow_vert:tv,shadow_frag:nv,sprite_vert:iv,sprite_frag:rv},me={common:{diffuse:{value:new Ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new P},probesMax:{value:new P},probesResolution:{value:new P}},points:{diffuse:{value:new Ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new Ee(16777215)},opacity:{value:1},center:{value:new ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},Yn={basic:{uniforms:en([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:Je.meshbasic_vert,fragmentShader:Je.meshbasic_frag},lambert:{uniforms:en([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Ee(0)},envMapIntensity:{value:1}}]),vertexShader:Je.meshlambert_vert,fragmentShader:Je.meshlambert_frag},phong:{uniforms:en([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Ee(0)},specular:{value:new Ee(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Je.meshphong_vert,fragmentShader:Je.meshphong_frag},standard:{uniforms:en([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new Ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag},toon:{uniforms:en([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new Ee(0)}}]),vertexShader:Je.meshtoon_vert,fragmentShader:Je.meshtoon_frag},matcap:{uniforms:en([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:Je.meshmatcap_vert,fragmentShader:Je.meshmatcap_frag},points:{uniforms:en([me.points,me.fog]),vertexShader:Je.points_vert,fragmentShader:Je.points_frag},dashed:{uniforms:en([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Je.linedashed_vert,fragmentShader:Je.linedashed_frag},depth:{uniforms:en([me.common,me.displacementmap]),vertexShader:Je.depth_vert,fragmentShader:Je.depth_frag},normal:{uniforms:en([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:Je.meshnormal_vert,fragmentShader:Je.meshnormal_frag},sprite:{uniforms:en([me.sprite,me.fog]),vertexShader:Je.sprite_vert,fragmentShader:Je.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Je.background_vert,fragmentShader:Je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:Je.backgroundCube_vert,fragmentShader:Je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Je.cube_vert,fragmentShader:Je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Je.equirect_vert,fragmentShader:Je.equirect_frag},distance:{uniforms:en([me.common,me.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Je.distance_vert,fragmentShader:Je.distance_frag},shadow:{uniforms:en([me.lights,me.fog,{color:{value:new Ee(0)},opacity:{value:1}}]),vertexShader:Je.shadow_vert,fragmentShader:Je.shadow_frag}};Yn.physical={uniforms:en([Yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new Ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new Ee(0)},specularColor:{value:new Ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag};var Gc={r:0,b:0,g:0},sv=new Ve,vp=new We;vp.set(-1,0,0,0,1,0,0,0,1);function ov(i,e,t,n,r,s){let o=new Ee(0),a=r===!0?0:1,c,l,h=null,u=0,d=null;function f(M){let T=M.isScene===!0?M.background:null;if(T&&T.isTexture){let x=M.backgroundBlurriness>0;T=e.get(T,x)}return T}function g(M){let T=!1,x=f(M);x===null?m(o,a):x&&x.isColor&&(m(x,1),T=!0);let S=i.xr.getEnvironmentBlendMode();S==="additive"?t.buffers.color.setClear(0,0,0,1,s):S==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||T)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(M,T){let x=f(T);x&&(x.isCubeTexture||x.mapping===po)?(l===void 0&&(l=new ze(new Ri(1,1,1),new Qt({name:"BackgroundCubeMaterial",uniforms:lr(Yn.backgroundCube.uniforms),vertexShader:Yn.backgroundCube.vertexShader,fragmentShader:Yn.backgroundCube.fragmentShader,side:Jt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(S,E,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=x,l.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(sv.makeRotationFromEuler(T.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(vp),l.material.toneMapped=Ye.getTransfer(x.colorSpace)!==dt,(h!==x||u!==x.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=x,u=x.version,d=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new ze(new Ln(2,2),new Qt({name:"BackgroundMaterial",uniforms:lr(Yn.background.uniforms),vertexShader:Yn.background.vertexShader,fragmentShader:Yn.background.fragmentShader,side:jn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=Ye.getTransfer(x.colorSpace)!==dt,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||u!==x.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,h=x,u=x.version,d=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function m(M,T){M.getRGB(Gc,Lh(i)),t.buffers.color.setClear(Gc.r,Gc.g,Gc.b,T,s)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,T=1){o.set(M),a=T,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(M){a=M,m(o,a)},render:g,addToRenderList:_,dispose:p}}function av(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=d(null),s=r,o=!1;function a(F,U,B,L,k){let q=!1,W=u(F,L,B,U);s!==W&&(s=W,l(s.object)),q=f(F,L,B,k),q&&g(F,L,B,k),k!==null&&e.update(k,i.ELEMENT_ARRAY_BUFFER),(q||o)&&(o=!1,x(F,U,B,L),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function c(){return i.createVertexArray()}function l(F){return i.bindVertexArray(F)}function h(F){return i.deleteVertexArray(F)}function u(F,U,B,L){let k=L.wireframe===!0,q=n[U.id];q===void 0&&(q={},n[U.id]=q);let W=F.isInstancedMesh===!0?F.id:0,ie=q[W];ie===void 0&&(ie={},q[W]=ie);let X=ie[B.id];X===void 0&&(X={},ie[B.id]=X);let $=X[k];return $===void 0&&($=d(c()),X[k]=$),$}function d(F){let U=[],B=[],L=[];for(let k=0;k<t;k++)U[k]=0,B[k]=0,L[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:B,attributeDivisors:L,object:F,attributes:{},index:null}}function f(F,U,B,L){let k=s.attributes,q=U.attributes,W=0,ie=B.getAttributes();for(let X in ie)if(ie[X].location>=0){let te=k[X],Ie=q[X];if(Ie===void 0&&(X==="instanceMatrix"&&F.instanceMatrix&&(Ie=F.instanceMatrix),X==="instanceColor"&&F.instanceColor&&(Ie=F.instanceColor)),te===void 0||te.attribute!==Ie||Ie&&te.data!==Ie.data)return!0;W++}return s.attributesNum!==W||s.index!==L}function g(F,U,B,L){let k={},q=U.attributes,W=0,ie=B.getAttributes();for(let X in ie)if(ie[X].location>=0){let te=q[X];te===void 0&&(X==="instanceMatrix"&&F.instanceMatrix&&(te=F.instanceMatrix),X==="instanceColor"&&F.instanceColor&&(te=F.instanceColor));let Ie={};Ie.attribute=te,te&&te.data&&(Ie.data=te.data),k[X]=Ie,W++}s.attributes=k,s.attributesNum=W,s.index=L}function _(){let F=s.newAttributes;for(let U=0,B=F.length;U<B;U++)F[U]=0}function m(F){p(F,0)}function p(F,U){let B=s.newAttributes,L=s.enabledAttributes,k=s.attributeDivisors;B[F]=1,L[F]===0&&(i.enableVertexAttribArray(F),L[F]=1),k[F]!==U&&(i.vertexAttribDivisor(F,U),k[F]=U)}function M(){let F=s.newAttributes,U=s.enabledAttributes;for(let B=0,L=U.length;B<L;B++)U[B]!==F[B]&&(i.disableVertexAttribArray(B),U[B]=0)}function T(F,U,B,L,k,q,W){W===!0?i.vertexAttribIPointer(F,U,B,k,q):i.vertexAttribPointer(F,U,B,L,k,q)}function x(F,U,B,L){_();let k=L.attributes,q=B.getAttributes(),W=U.defaultAttributeValues;for(let ie in q){let X=q[ie];if(X.location>=0){let $=k[ie];if($===void 0&&(ie==="instanceMatrix"&&F.instanceMatrix&&($=F.instanceMatrix),ie==="instanceColor"&&F.instanceColor&&($=F.instanceColor)),$!==void 0){let te=$.normalized,Ie=$.itemSize,Te=e.get($);if(Te===void 0)continue;let ot=Te.buffer,Qe=Te.type,rt=Te.bytesPerElement,J=Qe===i.INT||Qe===i.UNSIGNED_INT||$.gpuType===Qa;if($.isInterleavedBufferAttribute){let Q=$.data,be=Q.stride,ke=$.offset;if(Q.isInstancedInterleavedBuffer){for(let ye=0;ye<X.locationSize;ye++)p(X.location+ye,Q.meshPerAttribute);F.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let ye=0;ye<X.locationSize;ye++)m(X.location+ye);i.bindBuffer(i.ARRAY_BUFFER,ot);for(let ye=0;ye<X.locationSize;ye++)T(X.location+ye,Ie/X.locationSize,Qe,te,be*rt,(ke+Ie/X.locationSize*ye)*rt,J)}else{if($.isInstancedBufferAttribute){for(let Q=0;Q<X.locationSize;Q++)p(X.location+Q,$.meshPerAttribute);F.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let Q=0;Q<X.locationSize;Q++)m(X.location+Q);i.bindBuffer(i.ARRAY_BUFFER,ot);for(let Q=0;Q<X.locationSize;Q++)T(X.location+Q,Ie/X.locationSize,Qe,te,Ie*rt,Ie/X.locationSize*Q*rt,J)}}else if(W!==void 0){let te=W[ie];if(te!==void 0)switch(te.length){case 2:i.vertexAttrib2fv(X.location,te);break;case 3:i.vertexAttrib3fv(X.location,te);break;case 4:i.vertexAttrib4fv(X.location,te);break;default:i.vertexAttrib1fv(X.location,te)}}}}M()}function S(){w();for(let F in n){let U=n[F];for(let B in U){let L=U[B];for(let k in L){let q=L[k];for(let W in q)h(q[W].object),delete q[W];delete L[k]}}delete n[F]}}function E(F){if(n[F.id]===void 0)return;let U=n[F.id];for(let B in U){let L=U[B];for(let k in L){let q=L[k];for(let W in q)h(q[W].object),delete q[W];delete L[k]}}delete n[F.id]}function R(F){for(let U in n){let B=n[U];for(let L in B){let k=B[L];if(k[F.id]===void 0)continue;let q=k[F.id];for(let W in q)h(q[W].object),delete q[W];delete k[F.id]}}}function v(F){for(let U in n){let B=n[U],L=F.isInstancedMesh===!0?F.id:0,k=B[L];if(k!==void 0){for(let q in k){let W=k[q];for(let ie in W)h(W[ie].object),delete W[ie];delete k[q]}delete B[L],Object.keys(B).length===0&&delete n[U]}}}function w(){C(),o=!0,s!==r&&(s=r,l(s.object))}function C(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:w,resetDefaultState:C,dispose:S,releaseStatesOfGeometry:E,releaseStatesOfObject:v,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function cv(i,e,t){let n;function r(c){n=c}function s(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function o(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),t.update(l,n,h))}function a(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let d=0;for(let f=0;f<h;f++)d+=l[f];t.update(d,n,1)}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a}function lv(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(R){return!(R!==vn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){let v=R===On&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==un&&R!==xn&&!v&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(Pe("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Pe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),T=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:T,maxFragmentUniforms:x,maxSamples:S,samples:E}}function hv(i){let e=this,t=null,n=0,r=!1,s=!1,o=new pn,a=new We,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||r;return r=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!r||g===null||g.length===0||s&&!m)s?h(null):l();else{let M=s?0:n,T=M*4,x=p.clippingState||null;c.value=x,x=h(g,d,T,f);for(let S=0;S!==T;++S)x[S]=t[S];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){let _=u!==null?u.length:0,m=null;if(_!==0){if(m=c.value,g!==!0||m===null){let p=f+_*4,M=d.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let T=0,x=f;T!==_;++T,x+=4)o.copy(u[T]).applyMatrix4(M,a),o.normal.toArray(m,x),m[x+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}var as=4,uv=6,dv=20,fv=256,Eo=new Fi,Zf=new Ee,Hh=null,Vh=0,Wh=0,qh=!1,pv=new P,hr=new P,Vc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){let{size:o=256,position:a=pv}=s;Hh=this._renderer.getRenderTarget(),Vh=this._renderer.getActiveCubeFace(),Wh=this._renderer.getActiveMipmapLevel(),qh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,r,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ep(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Qf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Hh,Vh,Wh),this._renderer.xr.enabled=qh,e.scissorTest=!1,os(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Li||e.mapping===ar?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Hh=this._renderer.getRenderTarget(),Vh=this._renderer.getActiveCubeFace(),Wh=this._renderer.getActiveMipmapLevel(),qh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Dt,minFilter:Dt,generateMipmaps:!1,type:On,format:vn,colorSpace:sn,depthBuffer:!1},r=$f(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$f(e,t,n);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=mv(s)),this._blurMaterial=bv(s,e,t),this._ggxMaterial=gv(s,e,t)}return r}_compileMaterial(e){let t=new ze(new Tt,e);this._renderer.compile(t,Eo)}_sceneToCubeUV(e,t,n,r,s){let c=new zt(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Zf),u.toneMapping=Dn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(r),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ze(new Ri,new jt({name:"PMREM.Background",side:Jt,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,m=_.material,p=!1,M=e.background;M?M.isColor&&(m.color.copy(M),e.background=null,p=!0):(m.color.copy(Zf),p=!0);for(let T=0;T<6;T++){let x=T%3;x===0?(c.up.set(0,l[T],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+h[T],s.y,s.z)):x===1?(c.up.set(0,0,l[T]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+h[T],s.z)):(c.up.set(0,l[T],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+h[T]));let S=this._cubeSize;os(r,x*S,T>2?S:0,S,S),u.setRenderTarget(r),p&&u.render(_,c),u.render(e,c)}u.toneMapping=f,u.autoClear=d,e.background=M}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===Li||e.mapping===ar;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ep()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Qf());let s=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;let a=s.uniforms;a.envMap.value=e;let c=this._cubeSize;os(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Eo)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let c=o.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(l*l-h*h),d=l*1.25,f=u*d,{_lodMax:g}=this,_=this._sizeLods[n],m=3*_*(n>g-as?n-g+as:0),p=4*(this._cubeSize-_);c.envMap.value=e.texture,c.roughness.value=f,c.mipInt.value=g-t,os(s,m,p,3*_,2*_),r.setRenderTarget(s),r.render(a,Eo),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=g-n,os(e,m,p,3*_,2*_),r.setRenderTarget(e),r.render(a,Eo)}_blur(e,t,n,r){let s=this._pingPongRenderTarget,o=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,n,o),this._blurPass(s,e,n,n,o)}_blurPass(e,t,n,r,s){let o=this._renderer,a=this._blurMaterial,c=this._lodMeshes[r];c.material=a;let l=a.uniforms;l.envMap.value=e.texture,l.sigma.value=s,l.mipInt.value=this._lodMax-n;let h=this._sizeLods[r],u=3*h*(r>this._lodMax-as?r-this._lodMax+as:0),d=4*(this._cubeSize-h);os(t,u,d,3*h,2*h),o.setRenderTarget(t),o.render(c,Eo)}};function mv(i){let e=[],t=[],n=i,r=i-as+1+uv;for(let s=0;s<r;s++){let o=Math.pow(2,n);e.push(o);let a=1/(o-2),c=-a,l=1+a,h=[c,c,l,c,l,l,c,c,l,l,c,l],u=6,d=6,f=3,g=new Float32Array(f*d*u),_=new Float32Array(f*d*u);for(let p=0;p<u;p++){let M=p%3*2/3-1,T=p>2?0:-1,x=[M,T,0,M+2/3,T,0,M+2/3,T+1,0,M,T,0,M+2/3,T+1,0,M,T+1,0];g.set(x,f*d*p);for(let S=0;S<d;S++){let E=h[S*2]*2-1,R=h[S*2+1]*2-1;p===0?hr.set(1,R,E):p===1?hr.set(-E,1,-R):p===2?hr.set(-E,R,1):p===3?hr.set(-1,R,-E):p===4?hr.set(-E,-1,R):hr.set(E,R,-1),hr.toArray(_,(p*d+S)*f)}}let m=new Tt;m.setAttribute("position",new Ft(g,f)),m.setAttribute("outputDirection",new Ft(_,f)),t.push(new ze(m,null)),n>as&&n--}return{lodMeshes:t,sizeLods:e}}function $f(i,e,t){let n=new an(i,e,t);return n.texture.mapping=po,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function os(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function gv(i,e,t){return new Qt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:fv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Xc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// 
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Kn,depthTest:!1,depthWrite:!1})}function bv(i,e,t){return new Qt({name:"SphericalGaussianBlur",defines:{SAMPLES:dv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Xc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Kn,depthTest:!1,depthWrite:!1})}function Qf(){return new Qt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Xc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Kn,depthTest:!1,depthWrite:!1})}function ep(){return new Qt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Xc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Kn,depthTest:!1,depthWrite:!1})}function Xc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Wc=class extends an{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Ws(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ri(5,5,5),s=new Qt({name:"CubemapFromEquirect",uniforms:lr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Jt,blending:Kn});s.uniforms.tEquirect.value=t;let o=new ze(r,s),a=t.minFilter;return t.minFilter===Nn&&(t.minFilter=Dt),new Wa(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(s)}};function xv(i){let e=new WeakMap,t=new WeakMap,n=null;function r(d,f=!1){return d==null?null:f?o(d):s(d)}function s(d){if(d&&d.isTexture){let f=d.mapping;if(f===Ya||f===Za)if(e.has(d)){let g=e.get(d).texture;return a(g,d.mapping)}else{let g=d.image;if(g&&g.height>0){let _=new Wc(g.height);return _.fromEquirectangularTexture(i,d),e.set(d,_),d.addEventListener("dispose",l),a(_.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture){let f=d.mapping,g=f===Ya||f===Za,_=f===Li||f===ar;if(g||_){let m=t.get(d),p=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==p)return n===null&&(n=new Vc(i)),m=g?n.fromEquirectangular(d,m):n.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),m.texture;if(m!==void 0)return m.texture;{let M=d.image;return g&&M&&M.height>0||_&&M&&c(M)?(n===null&&(n=new Vc(i)),m=g?n.fromEquirectangular(d):n.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),d.addEventListener("dispose",h),m.texture):null}}}return d}function a(d,f){return f===Ya?d.mapping=Li:f===Za&&(d.mapping=ar),d}function c(d){let f=0,g=6;for(let _=0;_<g;_++)d[_]!==void 0&&f++;return f===g}function l(d){let f=d.target;f.removeEventListener("dispose",l);let g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function h(d){let f=d.target;f.removeEventListener("dispose",h);let g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:u}}function vv(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let r=t(n);return r===null&&Ki("WebGLRenderer: "+n+" extension not supported."),r}}}function _v(i,e,t,n){let r={},s=new WeakMap;function o(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete r[d.id];let f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,t.memory.geometries++),d}function c(u){let d=u.attributes;for(let f in d)e.update(d[f],i.ARRAY_BUFFER)}function l(u){let d=[],f=u.index,g=u.attributes.position,_=0;if(g===void 0)return;if(f!==null){let M=f.array;_=f.version;for(let T=0,x=M.length;T<x;T+=3){let S=M[T+0],E=M[T+1],R=M[T+2];d.push(S,E,E,R,R,S)}}else{let M=g.array;_=g.version;for(let T=0,x=M.length/3-1;T<x;T+=3){let S=T+0,E=T+1,R=T+2;d.push(S,E,E,R,R,S)}}let m=new(g.count>=65535?ks:Bs)(d,1);m.version=_;let p=s.get(u);p&&e.remove(p),s.set(u,m)}function h(u){let d=s.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return s.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function yv(i,e,t){let n;function r(u){n=u}let s,o;function a(u){s=u.type,o=u.bytesPerElement}function c(u,d){i.drawElements(n,d,s,u*o),t.update(d,n,1)}function l(u,d,f){f!==0&&(i.drawElementsInstanced(n,d,s,u*o,f),t.update(d,n,f))}function h(u,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,u,0,f);let _=0;for(let m=0;m<f;m++)_+=d[m];t.update(_,n,1)}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function Mv(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(s/3);break;case i.LINES:t.lines+=a*(s/2);break;case i.LINE_STRIP:t.lines+=a*(s-1);break;case i.LINE_LOOP:t.lines+=a*s;break;case i.POINTS:t.points+=a*s;break;default:Be("WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Sv(i,e,t){let n=new WeakMap,r=new mt;function s(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let w=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",w)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],M=a.morphAttributes.color||[],T=0;f===!0&&(T=1),g===!0&&(T=2),_===!0&&(T=3);let x=a.attributes.position.count*T,S=1;x>e.maxTextureSize&&(S=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let E=new Float32Array(x*S*4*u),R=new Ns(E,x,S,u);R.type=xn,R.needsUpdate=!0;let v=T*4;for(let C=0;C<u;C++){let F=m[C],U=p[C],B=M[C],L=x*S*4*C;for(let k=0;k<F.count;k++){let q=k*v;f===!0&&(r.fromBufferAttribute(F,k),E[L+q+0]=r.x,E[L+q+1]=r.y,E[L+q+2]=r.z,E[L+q+3]=0),g===!0&&(r.fromBufferAttribute(U,k),E[L+q+4]=r.x,E[L+q+5]=r.y,E[L+q+6]=r.z,E[L+q+7]=0),_===!0&&(r.fromBufferAttribute(B,k),E[L+q+8]=r.x,E[L+q+9]=r.y,E[L+q+10]=r.z,E[L+q+11]=B.itemSize===4?r.w:1)}}d={count:u,texture:R,size:new ce(x,S)},n.set(a,d),a.addEventListener("dispose",w)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let f=0;for(let _=0;_<l.length;_++)f+=l[_];let g=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:s}}function Ev(i,e,t,n,r){let s=new WeakMap;function o(l){let h=r.render.frame,u=l.geometry,d=e.get(l,u);if(s.get(d)!==h&&(e.update(d),s.set(d,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==h&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,h))),l.isSkinnedMesh){let f=l.skeleton;s.get(f)!==h&&(f.update(),s.set(f,h))}return d}function a(){s=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:a}}var Tv={[ph]:"LINEAR_TONE_MAPPING",[mh]:"REINHARD_TONE_MAPPING",[gh]:"CINEON_TONE_MAPPING",[fo]:"ACES_FILMIC_TONE_MAPPING",[xh]:"AGX_TONE_MAPPING",[vh]:"NEUTRAL_TONE_MAPPING",[bh]:"CUSTOM_TONE_MAPPING"};function wv(i,e,t,n,r,s){let o=new an(e,t,{type:i,depthBuffer:r,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,c=null,l=new Tt;l.setAttribute("position",new it([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new it([0,2,0,0,2,0],2));let h=new Na({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new ze(l,h),d=new Fi(-1,1,1,-1,0,1),f=null,g=null,_=!1,m,p=null,M=[],T=!1;this.setSize=function(x,S){o.setSize(x,S),a!==null&&a.setSize(x,S),c!==null&&c.setSize(x,S);for(let E=0;E<M.length;E++){let R=M[E];R.setSize&&R.setSize(x,S)}},this.setEffects=function(x){M=x,T=M.length>0&&M[0].isRenderPass===!0;let S=o.width,E=o.height;M.length>0&&a===null&&(a=new an(S,E,{type:On,depthBuffer:!1,stencilBuffer:!1}),c=new an(S,E,{type:On,depthBuffer:!1,stencilBuffer:!1}));for(let R=0;R<M.length;R++){let v=M[R];v.setSize&&v.setSize(S,E)}},this.begin=function(x,S){if(_||x.toneMapping===Dn&&M.length===0)return!1;if(p=S,S!==null){let E=S.width,R=S.height;(o.width!==E||o.height!==R)&&this.setSize(E,R)}return T===!1&&x.setRenderTarget(o),m=x.toneMapping,x.toneMapping=Dn,!0},this.hasRenderPass=function(){return T},this.end=function(x,S){x.toneMapping=m,_=!0;let E=o,R=a;for(let v=0;v<M.length;v++){let w=M[v];w.enabled!==!1&&(w.render(x,R,E,S),w.needsSwap!==!1&&(E=R,R=R===a?c:a))}if(f!==x.outputColorSpace||g!==x.toneMapping){f=x.outputColorSpace,g=x.toneMapping,h.defines={},Ye.getTransfer(f)===dt&&(h.defines.SRGB_TRANSFER="");let v=Tv[g];v&&(h.defines[v]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=E.texture,x.setRenderTarget(p),x.render(u,d),p=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}var _p=new Vt,Kh=new Ai(1,1),yp=new Ns,Mp=new Ta,Sp=new Ws,tp=[],np=[],ip=new Float32Array(16),rp=new Float32Array(9),sp=new Float32Array(4);function ls(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,s=tp[r];if(s===void 0&&(s=new Float32Array(r),tp[r]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(s,a)}return s}function Wt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function qt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function jc(i,e){let t=np[e];t===void 0&&(t=new Int32Array(e),np[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Av(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Rv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;i.uniform2fv(this.addr,e),qt(t,e)}}function Cv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Wt(t,e))return;i.uniform3fv(this.addr,e),qt(t,e)}}function Pv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;i.uniform4fv(this.addr,e),qt(t,e)}}function Iv(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),qt(t,e)}else{if(Wt(t,n))return;sp.set(n),i.uniformMatrix2fv(this.addr,!1,sp),qt(t,n)}}function Fv(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),qt(t,e)}else{if(Wt(t,n))return;rp.set(n),i.uniformMatrix3fv(this.addr,!1,rp),qt(t,n)}}function Lv(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),qt(t,e)}else{if(Wt(t,n))return;ip.set(n),i.uniformMatrix4fv(this.addr,!1,ip),qt(t,n)}}function Dv(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Nv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;i.uniform2iv(this.addr,e),qt(t,e)}}function Uv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Wt(t,e))return;i.uniform3iv(this.addr,e),qt(t,e)}}function Ov(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;i.uniform4iv(this.addr,e),qt(t,e)}}function Bv(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function kv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;i.uniform2uiv(this.addr,e),qt(t,e)}}function zv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Wt(t,e))return;i.uniform3uiv(this.addr,e),qt(t,e)}}function Gv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;i.uniform4uiv(this.addr,e),qt(t,e)}}function Hv(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Kh.compareFunction=t.isReversedDepthBuffer()?kc:Bc,s=Kh):s=_p,t.setTexture2D(e||s,r)}function Vv(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Mp,r)}function Wv(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Sp,r)}function qv(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||yp,r)}function Xv(i){switch(i){case 5126:return Av;case 35664:return Rv;case 35665:return Cv;case 35666:return Pv;case 35674:return Iv;case 35675:return Fv;case 35676:return Lv;case 5124:case 35670:return Dv;case 35667:case 35671:return Nv;case 35668:case 35672:return Uv;case 35669:case 35673:return Ov;case 5125:return Bv;case 36294:return kv;case 36295:return zv;case 36296:return Gv;case 35678:case 36198:case 36298:case 36306:case 35682:return Hv;case 35679:case 36299:case 36307:return Vv;case 35680:case 36300:case 36308:case 36293:return Wv;case 36289:case 36303:case 36311:case 36292:return qv}}function jv(i,e){i.uniform1fv(this.addr,e)}function Kv(i,e){let t=ls(e,this.size,2);i.uniform2fv(this.addr,t)}function Jv(i,e){let t=ls(e,this.size,3);i.uniform3fv(this.addr,t)}function Yv(i,e){let t=ls(e,this.size,4);i.uniform4fv(this.addr,t)}function Zv(i,e){let t=ls(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function $v(i,e){let t=ls(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Qv(i,e){let t=ls(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function e_(i,e){i.uniform1iv(this.addr,e)}function t_(i,e){i.uniform2iv(this.addr,e)}function n_(i,e){i.uniform3iv(this.addr,e)}function i_(i,e){i.uniform4iv(this.addr,e)}function r_(i,e){i.uniform1uiv(this.addr,e)}function s_(i,e){i.uniform2uiv(this.addr,e)}function o_(i,e){i.uniform3uiv(this.addr,e)}function a_(i,e){i.uniform4uiv(this.addr,e)}function c_(i,e,t){let n=this.cache,r=e.length,s=jc(t,r);Wt(n,s)||(i.uniform1iv(this.addr,s),qt(n,s));let o;this.type===i.SAMPLER_2D_SHADOW?o=Kh:o=_p;for(let a=0;a!==r;++a)t.setTexture2D(e[a]||o,s[a])}function l_(i,e,t){let n=this.cache,r=e.length,s=jc(t,r);Wt(n,s)||(i.uniform1iv(this.addr,s),qt(n,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Mp,s[o])}function h_(i,e,t){let n=this.cache,r=e.length,s=jc(t,r);Wt(n,s)||(i.uniform1iv(this.addr,s),qt(n,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Sp,s[o])}function u_(i,e,t){let n=this.cache,r=e.length,s=jc(t,r);Wt(n,s)||(i.uniform1iv(this.addr,s),qt(n,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||yp,s[o])}function d_(i){switch(i){case 5126:return jv;case 35664:return Kv;case 35665:return Jv;case 35666:return Yv;case 35674:return Zv;case 35675:return $v;case 35676:return Qv;case 5124:case 35670:return e_;case 35667:case 35671:return t_;case 35668:case 35672:return n_;case 35669:case 35673:return i_;case 5125:return r_;case 36294:return s_;case 36295:return o_;case 36296:return a_;case 35678:case 36198:case 36298:case 36306:case 35682:return c_;case 35679:case 36299:case 36307:return l_;case 35680:case 36300:case 36308:case 36293:return h_;case 36289:case 36303:case 36311:case 36292:return u_}}var Jh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Xv(t.type)}},Yh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=d_(t.type)}},Zh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let s=0,o=r.length;s!==o;++s){let a=r[s];a.setValue(e,t[a.id],n)}}},Xh=/(\w+)(\])?(\[|\.)?/g;function op(i,e){i.seq.push(e),i.map[e.id]=e}function f_(i,e,t){let n=i.name,r=n.length;for(Xh.lastIndex=0;;){let s=Xh.exec(n),o=Xh.lastIndex,a=s[1],c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){op(t,l===void 0?new Jh(a,i,e):new Yh(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new Zh(a),op(t,u)),t=u}}}var cs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=e.getActiveUniform(t,o),c=e.getUniformLocation(t,a.name);f_(a,c,this)}let r=[],s=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):s.push(o);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){let s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,o=t.length;s!==o;++s){let a=t[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,s=e.length;r!==s;++r){let o=e[r];o.id in t&&n.push(o)}return n}};function ap(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var p_=37297,m_=0;function g_(i,e){let t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var cp=new We;function b_(i){Ye._getMatrix(cp,Ye.workingColorSpace,i);let e=`mat3( ${cp.elements.map(t=>t.toFixed(4))} )`;switch(Ye.getTransfer(i)){case Ls:return[e,"LinearTransferOETF"];case dt:return[e,"sRGBTransferOETF"];default:return Pe("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function lp(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";let o=/ERROR: 0:(\d+)/.exec(s);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+g_(i.getShaderSource(e),a)}else return s}function x_(i,e){let t=b_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var v_={[ph]:"Linear",[mh]:"Reinhard",[gh]:"Cineon",[fo]:"ACESFilmic",[xh]:"AgX",[vh]:"Neutral",[bh]:"Custom"};function __(i,e){let t=v_[e];return t===void 0?(Pe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Hc=new P;function y_(){Ye.getLuminanceCoefficients(Hc);let i=Hc.x.toFixed(4),e=Hc.y.toFixed(4),t=Hc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function M_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(wo).join(`
`)}function S_(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function E_(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let s=i.getActiveAttrib(e,r),o=s.name,a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function wo(i){return i!==""}function hp(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function up(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var T_=/^[ \t]*#include +<([\w\d./]+)>/gm;function $h(i){return i.replace(T_,A_)}var w_=new Map;function A_(i,e){let t=Je[e];if(t===void 0){let n=w_.get(e);if(n!==void 0)t=Je[n],Pe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return $h(t)}var R_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function dp(i){return i.replace(R_,C_)}function C_(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function fp(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var P_={[sr]:"SHADOWMAP_TYPE_PCF",[es]:"SHADOWMAP_TYPE_VSM"};function I_(i){return P_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var F_={[Li]:"ENVMAP_TYPE_CUBE",[ar]:"ENVMAP_TYPE_CUBE",[po]:"ENVMAP_TYPE_CUBE_UV"};function L_(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":F_[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var D_={[ar]:"ENVMAP_MODE_REFRACTION"};function N_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":D_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var U_={[Ja]:"ENVMAP_BLENDING_MULTIPLY",[Tf]:"ENVMAP_BLENDING_MIX",[wf]:"ENVMAP_BLENDING_ADD"};function O_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":U_[i.combine]||"ENVMAP_BLENDING_NONE"}function B_(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function k_(i,e,t,n){let r=i.getContext(),s=t.defines,o=t.vertexShader,a=t.fragmentShader,c=I_(t),l=L_(t),h=N_(t),u=O_(t),d=B_(t),f=M_(t),g=S_(s),_=r.createProgram(),m,p,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(wo).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(wo).join(`
`),p.length>0&&(p+=`
`)):(m=[fp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(wo).join(`
`),p=[fp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Dn?"#define TONE_MAPPING":"",t.toneMapping!==Dn?Je.tonemapping_pars_fragment:"",t.toneMapping!==Dn?__("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Je.colorspace_pars_fragment,x_("linearToOutputTexel",t.outputColorSpace),y_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(wo).join(`
`)),o=$h(o),o=hp(o,t),o=up(o,t),a=$h(a),a=hp(a,t),a=up(a,t),o=dp(o),a=dp(a),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Ph?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ph?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let T=M+m+o,x=M+p+a,S=ap(r,r.VERTEX_SHADER,T),E=ap(r,r.FRAGMENT_SHADER,x);r.attachShader(_,S),r.attachShader(_,E),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function R(F){if(i.debug.checkShaderErrors){let U=r.getProgramInfoLog(_)||"",B=r.getShaderInfoLog(S)||"",L=r.getShaderInfoLog(E)||"",k=U.trim(),q=B.trim(),W=L.trim(),ie=!0,X=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(ie=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,S,E);else{let $=lp(r,S,"vertex"),te=lp(r,E,"fragment");Be("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+k+`
`+$+`
`+te)}else k!==""?Pe("WebGLProgram: Program Info Log:",k):(q===""||W==="")&&(X=!1);X&&(F.diagnostics={runnable:ie,programLog:k,vertexShader:{log:q,prefix:m},fragmentShader:{log:W,prefix:p}})}r.deleteShader(S),r.deleteShader(E),v=new cs(r,_),w=E_(r,_)}let v;this.getUniforms=function(){return v===void 0&&R(this),v};let w;this.getAttributes=function(){return w===void 0&&R(this),w};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=r.getProgramParameter(_,p_)),C},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=m_++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=S,this.fragmentShader=E,this}var z_=0,Qh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new eu(e),t.set(e,n)),n}},eu=class{constructor(e){this.id=z_++,this.code=e,this.usedTimes=0}};function G_(i){return i===Ni||i===vo||i===_o}function H_(i,e,t,n,r,s){let o=new kr,a=new Qh,c=new Set,l=[],h=new Map,u=n.logarithmicDepthBuffer,d=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return c.add(v),v===0?"uv":`uv${v}`}function _(v,w,C,F,U,B){let L=F.fog,k=U.geometry,q=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?F.environment:null,W=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,ie=e.get(v.envMap||q,W),X=ie&&ie.mapping===po?ie.image.height:null,$=f[v.type];v.precision!==null&&(d=n.getMaxPrecision(v.precision),d!==v.precision&&Pe("WebGLProgram.getParameters:",v.precision,"not supported, using",d,"instead."));let te=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,Ie=te!==void 0?te.length:0,Te=0;k.morphAttributes.position!==void 0&&(Te=1),k.morphAttributes.normal!==void 0&&(Te=2),k.morphAttributes.color!==void 0&&(Te=3);let ot,Qe,rt,J;if($){let yt=Yn[$];ot=yt.vertexShader,Qe=yt.fragmentShader}else{ot=v.vertexShader,Qe=v.fragmentShader;let yt=a.getVertexShaderStage(v),lt=a.getFragmentShaderStage(v);a.update(v,yt,lt),rt=yt.id,J=lt.id}let Q=i.getRenderTarget(),be=i.state.buffers.depth.getReversed(),ke=U.isInstancedMesh===!0,ye=U.isBatchedMesh===!0,Ge=!!v.map,ft=!!v.matcap,ee=!!ie,re=!!v.aoMap,se=!!v.lightMap,oe=!!v.bumpMap&&v.wireframe===!1,he=!!v.normalMap,Ue=!!v.displacementMap,Ne=!!v.emissiveMap,He=!!v.metalnessMap,qe=!!v.roughnessMap,I=v.anisotropy>0,ct=v.clearcoat>0,et=v.dispersion>0,A=v.retroreflectivity>0,b=v.iridescence>0,O=v.sheen>0,H=v.transmission>0,j=I&&!!v.anisotropyMap,ae=ct&&!!v.clearcoatMap,le=ct&&!!v.clearcoatNormalMap,K=ct&&!!v.clearcoatRoughnessMap,Z=b&&!!v.iridescenceMap,ue=b&&!!v.iridescenceThicknessMap,Fe=O&&!!v.sheenColorMap,ge=O&&!!v.sheenRoughnessMap,de=!!v.specularMap,Le=!!v.specularColorMap,Oe=!!v.specularIntensityMap,je=H&&!!v.transmissionMap,N=H&&!!v.thicknessMap,fe=!!v.gradientMap,Y=!!v.alphaMap,pe=v.alphaTest>0,_e=!!v.alphaHash,ne=!!v.extensions,De=Dn;v.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(De=i.toneMapping);let Re={shaderID:$,shaderType:v.type,shaderName:v.name,vertexShader:ot,fragmentShader:Qe,defines:v.defines,customVertexShaderID:rt,customFragmentShaderID:J,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:d,batching:ye,batchingColor:ye&&U._colorsTexture!==null,instancing:ke,instancingColor:ke&&U.instanceColor!==null,instancingMorph:ke&&U.morphTexture!==null,outputColorSpace:Q===null?i.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:Ye.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:Ge,matcap:ft,envMap:ee,envMapMode:ee&&ie.mapping,envMapCubeUVHeight:X,aoMap:re,lightMap:se,bumpMap:oe,normalMap:he,displacementMap:Ue,emissiveMap:Ne,normalMapObjectSpace:he&&v.normalMapType===Ff,normalMapTangentSpace:he&&v.normalMapType===Mo,packedNormalMap:he&&v.normalMapType===Mo&&G_(v.normalMap.format),metalnessMap:He,roughnessMap:qe,anisotropy:I,anisotropyMap:j,clearcoat:ct,clearcoatMap:ae,clearcoatNormalMap:le,clearcoatRoughnessMap:K,dispersion:et,retroreflection:A,iridescence:b,iridescenceMap:Z,iridescenceThicknessMap:ue,sheen:O,sheenColorMap:Fe,sheenRoughnessMap:ge,specularMap:de,specularColorMap:Le,specularIntensityMap:Oe,transmission:H,transmissionMap:je,thicknessMap:N,gradientMap:fe,opaque:v.transparent===!1&&v.blending===ts&&v.alphaToCoverage===!1,alphaMap:Y,alphaTest:pe,alphaHash:_e,combine:v.combine,mapUv:Ge&&g(v.map.channel),aoMapUv:re&&g(v.aoMap.channel),lightMapUv:se&&g(v.lightMap.channel),bumpMapUv:oe&&g(v.bumpMap.channel),normalMapUv:he&&g(v.normalMap.channel),displacementMapUv:Ue&&g(v.displacementMap.channel),emissiveMapUv:Ne&&g(v.emissiveMap.channel),metalnessMapUv:He&&g(v.metalnessMap.channel),roughnessMapUv:qe&&g(v.roughnessMap.channel),anisotropyMapUv:j&&g(v.anisotropyMap.channel),clearcoatMapUv:ae&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:le&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:K&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Z&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:ue&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:Fe&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:ge&&g(v.sheenRoughnessMap.channel),specularMapUv:de&&g(v.specularMap.channel),specularColorMapUv:Le&&g(v.specularColorMap.channel),specularIntensityMapUv:Oe&&g(v.specularIntensityMap.channel),transmissionMapUv:je&&g(v.transmissionMap.channel),thicknessMapUv:N&&g(v.thicknessMap.channel),alphaMapUv:Y&&g(v.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(he||I),vertexNormals:!!k.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!k.attributes.uv&&(Ge||Y),fog:!!L,useFog:v.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||k.attributes.normal===void 0&&he===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:be,skinning:U.isSkinnedMesh===!0,hasPositionAttribute:k.attributes.position!==void 0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:Ie,morphTextureStride:Te,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:B.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:De,decodeVideoTexture:Ge&&v.map.isVideoTexture===!0&&Ye.getTransfer(v.map.colorSpace)===dt,decodeVideoTextureEmissive:Ne&&v.emissiveMap.isVideoTexture===!0&&Ye.getTransfer(v.emissiveMap.colorSpace)===dt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===hn,flipSided:v.side===Jt,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:ne&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ne&&v.extensions.multiDraw===!0||ye)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Re.vertexUv1s=c.has(1),Re.vertexUv2s=c.has(2),Re.vertexUv3s=c.has(3),c.clear(),Re}function m(v){let w=[];if(v.shaderID?w.push(v.shaderID):(w.push(v.customVertexShaderID),w.push(v.customFragmentShaderID)),v.defines!==void 0)for(let C in v.defines)w.push(C),w.push(v.defines[C]);return v.isRawShaderMaterial===!1&&(p(w,v),M(w,v),w.push(i.outputColorSpace)),w.push(v.customProgramCacheKey),w.join()}function p(v,w){v.push(w.precision),v.push(w.outputColorSpace),v.push(w.envMapMode),v.push(w.envMapCubeUVHeight),v.push(w.mapUv),v.push(w.alphaMapUv),v.push(w.lightMapUv),v.push(w.aoMapUv),v.push(w.bumpMapUv),v.push(w.normalMapUv),v.push(w.displacementMapUv),v.push(w.emissiveMapUv),v.push(w.metalnessMapUv),v.push(w.roughnessMapUv),v.push(w.anisotropyMapUv),v.push(w.clearcoatMapUv),v.push(w.clearcoatNormalMapUv),v.push(w.clearcoatRoughnessMapUv),v.push(w.iridescenceMapUv),v.push(w.iridescenceThicknessMapUv),v.push(w.sheenColorMapUv),v.push(w.sheenRoughnessMapUv),v.push(w.specularMapUv),v.push(w.specularColorMapUv),v.push(w.specularIntensityMapUv),v.push(w.transmissionMapUv),v.push(w.thicknessMapUv),v.push(w.combine),v.push(w.fogExp2),v.push(w.sizeAttenuation),v.push(w.morphTargetsCount),v.push(w.morphAttributeCount),v.push(w.numSunLights),v.push(w.numDirLights),v.push(w.numPointLights),v.push(w.numSpotLights),v.push(w.numSpotLightMaps),v.push(w.numHemiLights),v.push(w.numRectAreaLights),v.push(w.numSunLightShadows),v.push(w.numDirLightShadows),v.push(w.numPointLightShadows),v.push(w.numSpotLightShadows),v.push(w.numSpotLightShadowsWithMaps),v.push(w.numLightProbes),v.push(w.shadowMapType),v.push(w.toneMapping),v.push(w.numClippingPlanes),v.push(w.numClipIntersection),v.push(w.depthPacking)}function M(v,w){o.disableAll(),w.instancing&&o.enable(0),w.instancingColor&&o.enable(1),w.instancingMorph&&o.enable(2),w.matcap&&o.enable(3),w.envMap&&o.enable(4),w.normalMapObjectSpace&&o.enable(5),w.normalMapTangentSpace&&o.enable(6),w.clearcoat&&o.enable(7),w.iridescence&&o.enable(8),w.alphaTest&&o.enable(9),w.vertexColors&&o.enable(10),w.vertexAlphas&&o.enable(11),w.vertexUv1s&&o.enable(12),w.vertexUv2s&&o.enable(13),w.vertexUv3s&&o.enable(14),w.vertexTangents&&o.enable(15),w.anisotropy&&o.enable(16),w.alphaHash&&o.enable(17),w.batching&&o.enable(18),w.dispersion&&o.enable(19),w.retroreflection&&o.enable(24),w.batchingColor&&o.enable(20),w.gradientMap&&o.enable(21),w.packedNormalMap&&o.enable(22),w.vertexNormals&&o.enable(23),v.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.reversedDepthBuffer&&o.enable(4),w.skinning&&o.enable(5),w.morphTargets&&o.enable(6),w.morphNormals&&o.enable(7),w.morphColors&&o.enable(8),w.premultipliedAlpha&&o.enable(9),w.shadowMapEnabled&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),w.decodeVideoTextureEmissive&&o.enable(20),w.alphaToCoverage&&o.enable(21),w.numLightProbeGrids>0&&o.enable(22),w.hasPositionAttribute&&o.enable(23),v.push(o.mask)}function T(v){let w=f[v.type],C;if(w){let F=Yn[w];C=zc.clone(F.uniforms)}else C=v.uniforms;return C}function x(v,w){let C=h.get(w);return C!==void 0?++C.usedTimes:(C=new k_(i,w,v,r),l.push(C),h.set(w,C)),C}function S(v){if(--v.usedTimes===0){let w=l.indexOf(v);l[w]=l[l.length-1],l.pop(),h.delete(v.cacheKey),v.destroy()}}function E(v){a.remove(v)}function R(){a.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:T,acquireProgram:x,releaseProgram:S,releaseShaderCache:E,programs:l,dispose:R}}function V_(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,c){i.get(o)[a]=c}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function W_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function pp(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function mp(){let i=[],e=0,t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function o(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function a(d,f,g,_,m,p){let M=i[e];return M===void 0?(M={id:d.id,object:d,geometry:f,material:g,materialVariant:o(d),groupOrder:_,renderOrder:d.renderOrder,z:m,group:p},i[e]=M):(M.id=d.id,M.object=d,M.geometry=f,M.material=g,M.materialVariant=o(d),M.groupOrder=_,M.renderOrder=d.renderOrder,M.z=m,M.group=p),e++,M}function c(d,f,g,_,m,p,M){M.reversedDepth===!0&&(m=-m);let T=a(d,f,g,_,m,p);g.transmission>0?n.push(T):g.transparent===!0?r.push(T):t.push(T)}function l(d,f,g,_,m,p){let M=a(d,f,g,_,m,p);g.transmission>0?n.unshift(M):g.transparent===!0?r.unshift(M):t.unshift(M)}function h(d,f){t.length>1&&t.sort(d||W_),n.length>1&&n.sort(f||pp),r.length>1&&r.sort(f||pp)}function u(){for(let d=e,f=i.length;d<f;d++){let g=i[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:c,unshift:l,finish:u,sort:h}}function q_(){let i=new WeakMap;function e(n,r){let s=i.get(n),o;return s===void 0?(o=new mp,i.set(n,[o])):r>=s.length?(o=new mp,s.push(o)):o=s[r],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function X_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new P,color:new Ee};break;case"SpotLight":t={position:new P,direction:new P,color:new Ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new Ee,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new Ee,groundColor:new Ee};break;case"RectAreaLight":t={color:new Ee,position:new P,halfWidth:new P,halfHeight:new P};break}return i[e.id]=t,t}}}function j_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var K_=0;function J_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Y_(i){let e=new X_,t=j_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new P);let r=new P,s=new Ve,o=new Ve;function a(l){let h=0,u=0,d=0;for(let U=0;U<9;U++)n.probe[U].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,M=0,T=0,x=0,S=0,E=0,R=0,v=0,w=0,C=0;l.sort(J_);for(let U=0,B=l.length;U<B;U++){let L=l[U],k=L.color,q=L.intensity,W=L.distance,ie=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===Ni?ie=L.shadow.map.texture:ie=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=k.r*q,u+=k.g*q,d+=k.b*q;else if(L.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(L.sh.coefficients[X],q);C++}else if(L.isSunLight){let X=e.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let $=L.shadow,te=t.get(L);te.shadowIntensity=$.intensity,te.shadowBias=$.bias,te.shadowNormalBias=$.normalBias,te.shadowRadius=$.radius,te.shadowMapSize.copy($.mapSize).multiply($.getFrameExtents()),n.sunShadow[g]=te,n.sunShadowMap[g]=ie;let Ie=$.getViewportCount();for(let Te=0;Te<Ie;Te++)n.sunShadowMatrix[_+Te]=$.getMatrix(Te),n.sunShadowCascade[_+Te]=$._cascadeData[Te];_+=Ie,g++}n.sun[f]=X,f++}else if(L.isDirectionalLight){let X=e.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let $=L.shadow,te=t.get(L);te.shadowIntensity=$.intensity,te.shadowBias=$.bias,te.shadowNormalBias=$.normalBias,te.shadowRadius=$.radius,te.shadowMapSize=$.mapSize,n.directionalShadow[m]=te,n.directionalShadowMap[m]=ie,n.directionalShadowMatrix[m]=L.shadow.matrix,S++}n.directional[m]=X,m++}else if(L.isSpotLight){let X=e.get(L);X.position.setFromMatrixPosition(L.matrixWorld),X.color.copy(k).multiplyScalar(q),X.distance=W,X.coneCos=Math.cos(L.angle),X.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),X.decay=L.decay,n.spot[M]=X;let $=L.shadow;if(L.map&&(n.spotLightMap[v]=L.map,v++,$.updateMatrices(L),L.castShadow&&w++),n.spotLightMatrix[M]=$.matrix,L.castShadow){let te=t.get(L);te.shadowIntensity=$.intensity,te.shadowBias=$.bias,te.shadowNormalBias=$.normalBias,te.shadowRadius=$.radius,te.shadowMapSize=$.mapSize,n.spotShadow[M]=te,n.spotShadowMap[M]=ie,R++}M++}else if(L.isRectAreaLight){let X=e.get(L);X.color.copy(k).multiplyScalar(q),X.halfWidth.set(L.width*.5,0,0),X.halfHeight.set(0,L.height*.5,0),n.rectArea[T]=X,T++}else if(L.isPointLight){let X=e.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),X.distance=L.distance,X.decay=L.decay,L.castShadow){let $=L.shadow,te=t.get(L);te.shadowIntensity=$.intensity,te.shadowBias=$.bias,te.shadowNormalBias=$.normalBias,te.shadowRadius=$.radius,te.shadowMapSize=$.mapSize,te.shadowCameraNear=$.camera.near,te.shadowCameraFar=$.camera.far,n.pointShadow[p]=te,n.pointShadowMap[p]=ie,n.pointShadowMatrix[p]=L.shadow.matrix,E++}n.point[p]=X,p++}else if(L.isHemisphereLight){let X=e.get(L);X.skyColor.copy(L.color).multiplyScalar(q),X.groundColor.copy(L.groundColor).multiplyScalar(q),n.hemi[x]=X,x++}}T>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=me.LTC_FLOAT_1,n.rectAreaLTC2=me.LTC_FLOAT_2):(n.rectAreaLTC1=me.LTC_HALF_1,n.rectAreaLTC2=me.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let F=n.hash;(F.sunLength!==f||F.directionalLength!==m||F.pointLength!==p||F.spotLength!==M||F.rectAreaLength!==T||F.hemiLength!==x||F.numSunShadows!==g||F.numDirectionalShadows!==S||F.numPointShadows!==E||F.numSpotShadows!==R||F.numSpotMaps!==v||F.numLightProbes!==C)&&(n.sun.length=f,n.directional.length=m,n.spot.length=M,n.rectArea.length=T,n.point.length=p,n.hemi.length=x,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.directionalShadowMatrix.length=S,n.pointShadow.length=E,n.pointShadowMap.length=E,n.pointShadowMatrix.length=E,n.spotShadow.length=R,n.spotShadowMap.length=R,n.spotLightMatrix.length=R+v-w,n.spotLightMap.length=v,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=C,F.sunLength=f,F.directionalLength=m,F.pointLength=p,F.spotLength=M,F.rectAreaLength=T,F.hemiLength=x,F.numSunShadows=g,F.numDirectionalShadows=S,F.numPointShadows=E,F.numSpotShadows=R,F.numSpotMaps=v,F.numLightProbes=C,n.version=K_++)}function c(l,h){let u=0,d=0,f=0,g=0,_=0,m=0,p=h.matrixWorldInverse;for(let M=0,T=l.length;M<T;M++){let x=l[M];if(x.isSunLight){let S=n.sun[u];S.direction.setFromMatrixPosition(x.matrixWorld),S.direction.transformDirection(p),u++}else if(x.isDirectionalLight){let S=n.directional[d];S.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(p),d++}else if(x.isSpotLight){let S=n.spot[g];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(p),S.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(p),g++}else if(x.isRectAreaLight){let S=n.rectArea[_];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(p),o.identity(),s.copy(x.matrixWorld),s.premultiply(p),o.extractRotation(s),S.halfWidth.set(x.width*.5,0,0),S.halfHeight.set(0,x.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),_++}else if(x.isPointLight){let S=n.point[f];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(p),f++}else if(x.isHemisphereLight){let S=n.hemi[m];S.direction.setFromMatrixPosition(x.matrixWorld),S.direction.transformDirection(p),m++}}}return{setup:a,setupView:c,state:n}}function gp(i){let e=new Y_(i),t=[],n=[],r=[];function s(d){u.camera=d,t.length=0,n.length=0,r.length=0}function o(d){t.push(d)}function a(d){n.push(d)}function c(d){r.push(d)}function l(){e.setup(t)}function h(d){e.setupView(t,d)}let u={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:u,setupLights:l,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function Z_(i){let e=new WeakMap;function t(r,s=0){let o=e.get(r),a;return o===void 0?(a=new gp(i),e.set(r,[a])):s>=o.length?(a=new gp(i),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var $_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Q_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,ey=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],ty=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],bp=new Ve,To=new P,jh=new P;function ny(i,e,t){let n=new qr,r=new ce,s=new ce,o=new mt,a=new Ua,c=new Oa,l={},h=t.maxTextureSize,u={[jn]:Jt,[Jt]:jn,[hn]:hn},d=new Qt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ce},radius:{value:4}},vertexShader:$_,fragmentShader:Q_}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new Tt;g.setAttribute("position",new Ft(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new ze(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=sr;let p=this.type;this.render=function(E,R,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===of&&(Pe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=sr);let w=i.getRenderTarget(),C=i.getActiveCubeFace(),F=i.getActiveMipmapLevel(),U=i.state;U.setBlending(Kn),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let B=p!==this.type;B&&R.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(k=>k.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,k=E.length;L<k;L++){let q=E[L],W=q.shadow;if(W===void 0){Pe("WebGLShadowMap:",q,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;r.copy(W.mapSize);let ie=W.getFrameExtents();r.multiply(ie),s.copy(W.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/ie.x),r.x=s.x*ie.x,W.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/ie.y),r.y=s.y*ie.y,W.mapSize.y=s.y));let X=i.state.buffers.depth.getReversed();if(W.camera._reversedDepth=X,W.map===null||B===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===es){if(q.isPointLight){Pe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new an(r.x,r.y,{format:Ni,type:On,minFilter:Dt,magFilter:Dt,generateMipmaps:!1}),W.map.texture.name=q.name+".shadowMap",W.map.depthTexture=new Ai(r.x,r.y,xn),W.map.depthTexture.name=q.name+".shadowMapDepth",W.map.depthTexture.format=Vn,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Lt,W.map.depthTexture.magFilter=Lt}else q.isPointLight?(W.map=new Wc(r.x),W.map.depthTexture=new Ra(r.x,Un)):(W.map=new an(r.x,r.y),W.map.depthTexture=new Ai(r.x,r.y,Un)),W.map.depthTexture.name=q.name+".shadowMap",W.map.depthTexture.format=Vn,this.type===sr?(W.map.depthTexture.compareFunction=X?kc:Bc,W.map.depthTexture.minFilter=Dt,W.map.depthTexture.magFilter=Dt):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Lt,W.map.depthTexture.magFilter=Lt);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==r.x||W.map.height!==r.y)&&W.map.setSize(r.x,r.y);let $=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();q.isPointLight!==!0&&W.updateMatrices(q,v);for(let te=0;te<$;te++){let Ie=W.getCamera(te);if(q.isPointLight){let Te=W.camera,ot=W.matrix,Qe=q.distance||Te.far;Qe!==Te.far&&(Te.far=Qe,Te.updateProjectionMatrix()),To.setFromMatrixPosition(q.matrixWorld),Te.position.copy(To),jh.copy(Te.position),jh.add(ey[te]),Te.up.copy(ty[te]),Te.lookAt(jh),Te.updateMatrixWorld(),ot.makeTranslation(-To.x,-To.y,-To.z),bp.multiplyMatrices(Te.projectionMatrix,Te.matrixWorldInverse),W._frustum.setFromProjectionMatrix(bp,Te.coordinateSystem,Te.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)i.setRenderTarget(W.map,te),i.clear();else{te===0&&(i.setRenderTarget(W.map),i.clear());let Te=W.getViewport(te);o.set(s.x*Te.x,s.y*Te.y,s.x*Te.z,s.y*Te.w),U.viewport(o)}n=W.getFrustum(te),x(R,v,Ie,q,this.type)}W.isPointLightShadow!==!0&&this.type===es&&M(W,v),W.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(w,C,F)};function M(E,R){let v=e.update(_);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null?E.mapPass=new an(r.x,r.y,{format:Ni,type:On}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),d.uniforms.shadow_pass.value=E.map.depthTexture,d.uniforms.resolution.value.set(E.map.width,E.map.height),d.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(R,null,v,d,_,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value.set(E.map.width,E.map.height),f.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(R,null,v,f,_,null)}function T(E,R,v,w){let C=null,F=v.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(F!==void 0)C=F;else if(C=v.isPointLight===!0?c:a,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let U=C.uuid,B=R.uuid,L=l[U];L===void 0&&(L={},l[U]=L);let k=L[B];k===void 0&&(k=C.clone(),L[B]=k,R.addEventListener("dispose",S)),C=k}if(C.visible=R.visible,C.wireframe=R.wireframe,w===es?C.side=R.shadowSide!==null?R.shadowSide:R.side:C.side=R.shadowSide!==null?R.shadowSide:u[R.side],C.alphaMap=R.alphaMap,C.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,C.map=R.map,C.clipShadows=R.clipShadows,C.clippingPlanes=R.clippingPlanes,C.clipIntersection=R.clipIntersection,C.displacementMap=R.displacementMap,C.displacementScale=R.displacementScale,C.displacementBias=R.displacementBias,C.wireframeLinewidth=R.wireframeLinewidth,C.linewidth=R.linewidth,v.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let U=i.properties.get(C);U.light=v}return C}function x(E,R,v,w,C){if(E.visible===!1)return;if(E.layers.test(R.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&C===es)&&(!E.frustumCulled||E.intersectsFrustum(n))){E.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,E.matrixWorld);let B=e.update(E),L=E.material;if(Array.isArray(L)){let k=B.groups;for(let q=0,W=k.length;q<W;q++){let ie=k[q],X=L[ie.materialIndex];if(X&&X.visible){let $=T(E,X,w,C);E.onBeforeShadow(i,E,R,v,B,$,ie),i.renderBufferDirect(v,null,B,$,E,ie),E.onAfterShadow(i,E,R,v,B,$,ie)}}}else if(L.visible){let k=T(E,L,w,C);E.onBeforeShadow(i,E,R,v,B,k,null),i.renderBufferDirect(v,null,B,k,E,null),E.onAfterShadow(i,E,R,v,B,k,null)}}let U=E.children;for(let B=0,L=U.length;B<L;B++)x(U[B],R,v,w,C)}function S(E){E.target.removeEventListener("dispose",S);for(let v in l){let w=l[v],C=E.target.uuid;C in w&&(w[C].dispose(),delete w[C])}}}function iy(i,e){function t(){let N=!1,fe=new mt,Y=null,pe=new mt(0,0,0,0);return{setMask:function(_e){Y!==_e&&!N&&(i.colorMask(_e,_e,_e,_e),Y=_e)},setLocked:function(_e){N=_e},setClear:function(_e,ne,De,Re,yt){yt===!0&&(_e*=Re,ne*=Re,De*=Re),fe.set(_e,ne,De,Re),pe.equals(fe)===!1&&(i.clearColor(_e,ne,De,Re),pe.copy(fe))},reset:function(){N=!1,Y=null,pe.set(-1,0,0,0)}}}function n(){let N=!1,fe=!1,Y=null,pe=null,_e=null;return{setReversed:function(ne){if(fe!==ne){let De=e.get("EXT_clip_control");ne?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT),fe=ne;let Re=_e;_e=null,this.setClear(Re)}},getReversed:function(){return fe},setTest:function(ne){ne?Q(i.DEPTH_TEST):be(i.DEPTH_TEST)},setMask:function(ne){Y!==ne&&!N&&(i.depthMask(ne),Y=ne)},setFunc:function(ne){if(fe&&(ne=Vf[ne]),pe!==ne){switch(ne){case ga:i.depthFunc(i.NEVER);break;case ba:i.depthFunc(i.ALWAYS);break;case xa:i.depthFunc(i.LESS);break;case Lr:i.depthFunc(i.LEQUAL);break;case va:i.depthFunc(i.EQUAL);break;case _a:i.depthFunc(i.GEQUAL);break;case ya:i.depthFunc(i.GREATER);break;case Ma:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}pe=ne}},setLocked:function(ne){N=ne},setClear:function(ne){_e!==ne&&(_e=ne,fe&&(ne=1-ne),i.clearDepth(ne))},reset:function(){N=!1,Y=null,pe=null,_e=null,fe=!1}}}function r(){let N=!1,fe=null,Y=null,pe=null,_e=null,ne=null,De=null,Re=null,yt=null;return{setTest:function(lt){N||(lt?Q(i.STENCIL_TEST):be(i.STENCIL_TEST))},setMask:function(lt){fe!==lt&&!N&&(i.stencilMask(lt),fe=lt)},setFunc:function(lt,wn,kn){(Y!==lt||pe!==wn||_e!==kn)&&(i.stencilFunc(lt,wn,kn),Y=lt,pe=wn,_e=kn)},setOp:function(lt,wn,kn){(ne!==lt||De!==wn||Re!==kn)&&(i.stencilOp(lt,wn,kn),ne=lt,De=wn,Re=kn)},setLocked:function(lt){N=lt},setClear:function(lt){yt!==lt&&(i.clearStencil(lt),yt=lt)},reset:function(){N=!1,fe=null,Y=null,pe=null,_e=null,ne=null,De=null,Re=null,yt=null}}}let s=new t,o=new n,a=new r,c=new WeakMap,l=new WeakMap,h={},u={},d={},f=new WeakMap,g=[],_=null,m=!1,p=null,M=null,T=null,x=null,S=null,E=null,R=null,v=new Ee(0,0,0),w=0,C=!1,F=null,U=null,B=null,L=null,k=null,q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,ie=0,X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(X)[1]),W=ie>=1):X.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),W=ie>=2);let $=null,te={},Ie=i.getParameter(i.SCISSOR_BOX),Te=i.getParameter(i.VIEWPORT),ot=new mt().fromArray(Ie),Qe=new mt().fromArray(Te);function rt(N,fe,Y,pe){let _e=new Uint8Array(4),ne=i.createTexture();i.bindTexture(N,ne),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let De=0;De<Y;De++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(fe,0,i.RGBA,1,1,pe,0,i.RGBA,i.UNSIGNED_BYTE,_e):i.texImage2D(fe+De,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,_e);return ne}let J={};J[i.TEXTURE_2D]=rt(i.TEXTURE_2D,i.TEXTURE_2D,1),J[i.TEXTURE_CUBE_MAP]=rt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[i.TEXTURE_2D_ARRAY]=rt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),J[i.TEXTURE_3D]=rt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Q(i.DEPTH_TEST),o.setFunc(Lr),oe(!1),he(ch),Q(i.CULL_FACE),re(Kn);function Q(N){h[N]!==!0&&(i.enable(N),h[N]=!0)}function be(N){h[N]!==!1&&(i.disable(N),h[N]=!1)}function ke(N,fe){return d[N]!==fe?(i.bindFramebuffer(N,fe),d[N]=fe,N===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=fe),N===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=fe),!0):!1}function ye(N,fe){let Y=g,pe=!1;if(N){Y=f.get(fe),Y===void 0&&(Y=[],f.set(fe,Y));let _e=N.textures;if(Y.length!==_e.length||Y[0]!==i.COLOR_ATTACHMENT0){for(let ne=0,De=_e.length;ne<De;ne++)Y[ne]=i.COLOR_ATTACHMENT0+ne;Y.length=_e.length,pe=!0}}else Y[0]!==i.BACK&&(Y[0]=i.BACK,pe=!0);pe&&i.drawBuffers(Y)}function Ge(N){return _!==N?(i.useProgram(N),_=N,!0):!1}let ft={[or]:i.FUNC_ADD,[cf]:i.FUNC_SUBTRACT,[lf]:i.FUNC_REVERSE_SUBTRACT};ft[hf]=i.MIN,ft[uf]=i.MAX;let ee={[df]:i.ZERO,[ff]:i.ONE,[pf]:i.SRC_COLOR,[dh]:i.SRC_ALPHA,[_f]:i.SRC_ALPHA_SATURATE,[xf]:i.DST_COLOR,[gf]:i.DST_ALPHA,[mf]:i.ONE_MINUS_SRC_COLOR,[fh]:i.ONE_MINUS_SRC_ALPHA,[vf]:i.ONE_MINUS_DST_COLOR,[bf]:i.ONE_MINUS_DST_ALPHA,[yf]:i.CONSTANT_COLOR,[Mf]:i.ONE_MINUS_CONSTANT_COLOR,[Sf]:i.CONSTANT_ALPHA,[Ef]:i.ONE_MINUS_CONSTANT_ALPHA};function re(N,fe,Y,pe,_e,ne,De,Re,yt,lt){if(N===Kn){m===!0&&(be(i.BLEND),m=!1);return}if(m===!1&&(Q(i.BLEND),m=!0),N!==af){if(N!==p||lt!==C){if((M!==or||S!==or)&&(i.blendEquation(i.FUNC_ADD),M=or,S=or),lt)switch(N){case ts:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case lh:i.blendFunc(i.ONE,i.ONE);break;case hh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case uh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Be("WebGLState: Invalid blending: ",N);break}else switch(N){case ts:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case lh:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case hh:Be("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case uh:Be("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Be("WebGLState: Invalid blending: ",N);break}T=null,x=null,E=null,R=null,v.set(0,0,0),w=0,p=N,C=lt}return}_e=_e||fe,ne=ne||Y,De=De||pe,(fe!==M||_e!==S)&&(i.blendEquationSeparate(ft[fe],ft[_e]),M=fe,S=_e),(Y!==T||pe!==x||ne!==E||De!==R)&&(i.blendFuncSeparate(ee[Y],ee[pe],ee[ne],ee[De]),T=Y,x=pe,E=ne,R=De),(Re.equals(v)===!1||yt!==w)&&(i.blendColor(Re.r,Re.g,Re.b,yt),v.copy(Re),w=yt),p=N,C=!1}function se(N,fe){N.side===hn?be(i.CULL_FACE):Q(i.CULL_FACE);let Y=N.side===Jt;fe&&(Y=!Y),oe(Y),N.blending===ts&&N.transparent===!1?re(Kn):re(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),s.setMask(N.colorWrite);let pe=N.stencilWrite;a.setTest(pe),pe&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Ne(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?Q(i.SAMPLE_ALPHA_TO_COVERAGE):be(i.SAMPLE_ALPHA_TO_COVERAGE)}function oe(N){F!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),F=N)}function he(N){N!==rf?(Q(i.CULL_FACE),N!==U&&(N===ch?i.cullFace(i.BACK):N===sf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):be(i.CULL_FACE),U=N}function Ue(N){N!==B&&(W&&i.lineWidth(N),B=N)}function Ne(N,fe,Y){N?(Q(i.POLYGON_OFFSET_FILL),(L!==fe||k!==Y)&&(L=fe,k=Y,o.getReversed()&&(fe=-fe),i.polygonOffset(fe,Y))):be(i.POLYGON_OFFSET_FILL)}function He(N){N?Q(i.SCISSOR_TEST):be(i.SCISSOR_TEST)}function qe(N){N===void 0&&(N=i.TEXTURE0+q-1),$!==N&&(i.activeTexture(N),$=N)}function I(N,fe,Y){Y===void 0&&($===null?Y=i.TEXTURE0+q-1:Y=$);let pe=te[Y];pe===void 0&&(pe={type:void 0,texture:void 0},te[Y]=pe),(pe.type!==N||pe.texture!==fe)&&($!==Y&&(i.activeTexture(Y),$=Y),i.bindTexture(N,fe||J[N]),pe.type=N,pe.texture=fe)}function ct(){let N=te[$];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function et(){try{i.compressedTexImage2D(...arguments)}catch(N){Be("WebGLState:",N)}}function A(){try{i.compressedTexImage3D(...arguments)}catch(N){Be("WebGLState:",N)}}function b(){try{i.texSubImage2D(...arguments)}catch(N){Be("WebGLState:",N)}}function O(){try{i.texSubImage3D(...arguments)}catch(N){Be("WebGLState:",N)}}function H(){try{i.compressedTexSubImage2D(...arguments)}catch(N){Be("WebGLState:",N)}}function j(){try{i.compressedTexSubImage3D(...arguments)}catch(N){Be("WebGLState:",N)}}function ae(){try{i.texStorage2D(...arguments)}catch(N){Be("WebGLState:",N)}}function le(){try{i.texStorage3D(...arguments)}catch(N){Be("WebGLState:",N)}}function K(){try{i.texImage2D(...arguments)}catch(N){Be("WebGLState:",N)}}function Z(){try{i.texImage3D(...arguments)}catch(N){Be("WebGLState:",N)}}function ue(N){return u[N]!==void 0?u[N]:i.getParameter(N)}function Fe(N,fe){u[N]!==fe&&(i.pixelStorei(N,fe),u[N]=fe)}function ge(N){ot.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),ot.copy(N))}function de(N){Qe.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),Qe.copy(N))}function Le(N,fe){let Y=l.get(fe);Y===void 0&&(Y=new WeakMap,l.set(fe,Y));let pe=Y.get(N);pe===void 0&&(pe=i.getUniformBlockIndex(fe,N.name),Y.set(N,pe))}function Oe(N,fe){let pe=l.get(fe).get(N);c.get(fe)!==pe&&(i.uniformBlockBinding(fe,pe,N.__bindingPointIndex),c.set(fe,pe))}function je(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},$=null,te={},d={},f=new WeakMap,g=[],_=null,m=!1,p=null,M=null,T=null,x=null,S=null,E=null,R=null,v=new Ee(0,0,0),w=0,C=!1,F=null,U=null,B=null,L=null,k=null,ot.set(0,0,i.canvas.width,i.canvas.height),Qe.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:Q,disable:be,bindFramebuffer:ke,drawBuffers:ye,useProgram:Ge,setBlending:re,setMaterial:se,setFlipSided:oe,setCullFace:he,setLineWidth:Ue,setPolygonOffset:Ne,setScissorTest:He,activeTexture:qe,bindTexture:I,unbindTexture:ct,compressedTexImage2D:et,compressedTexImage3D:A,texImage2D:K,texImage3D:Z,pixelStorei:Fe,getParameter:ue,updateUBOMapping:Le,uniformBlockBinding:Oe,texStorage2D:ae,texStorage3D:le,texSubImage2D:b,texSubImage3D:O,compressedTexSubImage2D:H,compressedTexSubImage3D:j,scissor:ge,viewport:de,reset:je}}function ry(i,e,t,n,r,s,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ce,h=new WeakMap,u=new Set,d,f=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(A,b){return g?new OffscreenCanvas(A,b):Ur("canvas")}function m(A,b,O){let H=1,j=et(A);if((j.width>O||j.height>O)&&(H=O/Math.max(j.width,j.height)),H<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let ae=Math.floor(H*j.width),le=Math.floor(H*j.height);d===void 0&&(d=_(ae,le));let K=b?_(ae,le):d;return K.width=ae,K.height=le,K.getContext("2d").drawImage(A,0,0,ae,le),Pe("WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+ae+"x"+le+")."),K}else return"data"in A&&Pe("WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),A;return A}function p(A){return A.generateMipmaps}function M(A){i.generateMipmap(A)}function T(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(A,b,O,H,j,ae=!1){if(A!==null){if(i[A]!==void 0)return i[A];Pe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let le;H&&(le=e.get("EXT_texture_norm16"),le||Pe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let K=b;if(b===i.RED&&(O===i.FLOAT&&(K=i.R32F),O===i.HALF_FLOAT&&(K=i.R16F),O===i.UNSIGNED_BYTE&&(K=i.R8),O===i.UNSIGNED_SHORT&&le&&(K=le.R16_EXT),O===i.SHORT&&le&&(K=le.R16_SNORM_EXT)),b===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(K=i.R8UI),O===i.UNSIGNED_SHORT&&(K=i.R16UI),O===i.UNSIGNED_INT&&(K=i.R32UI),O===i.BYTE&&(K=i.R8I),O===i.SHORT&&(K=i.R16I),O===i.INT&&(K=i.R32I)),b===i.RG&&(O===i.FLOAT&&(K=i.RG32F),O===i.HALF_FLOAT&&(K=i.RG16F),O===i.UNSIGNED_BYTE&&(K=i.RG8),O===i.UNSIGNED_SHORT&&le&&(K=le.RG16_EXT),O===i.SHORT&&le&&(K=le.RG16_SNORM_EXT)),b===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&(K=i.RG8UI),O===i.UNSIGNED_SHORT&&(K=i.RG16UI),O===i.UNSIGNED_INT&&(K=i.RG32UI),O===i.BYTE&&(K=i.RG8I),O===i.SHORT&&(K=i.RG16I),O===i.INT&&(K=i.RG32I)),b===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&(K=i.RGB8UI),O===i.UNSIGNED_SHORT&&(K=i.RGB16UI),O===i.UNSIGNED_INT&&(K=i.RGB32UI),O===i.BYTE&&(K=i.RGB8I),O===i.SHORT&&(K=i.RGB16I),O===i.INT&&(K=i.RGB32I)),b===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),O===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),O===i.UNSIGNED_INT&&(K=i.RGBA32UI),O===i.BYTE&&(K=i.RGBA8I),O===i.SHORT&&(K=i.RGBA16I),O===i.INT&&(K=i.RGBA32I)),b===i.RGB&&(O===i.UNSIGNED_SHORT&&le&&(K=le.RGB16_EXT),O===i.SHORT&&le&&(K=le.RGB16_SNORM_EXT),O===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),O===i.UNSIGNED_INT_10F_11F_11F_REV&&(K=i.R11F_G11F_B10F)),b===i.RGBA){let Z=ae?Ls:Ye.getTransfer(j);O===i.FLOAT&&(K=i.RGBA32F),O===i.HALF_FLOAT&&(K=i.RGBA16F),O===i.UNSIGNED_BYTE&&(K=Z===dt?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT&&le&&(K=le.RGBA16_EXT),O===i.SHORT&&le&&(K=le.RGBA16_SNORM_EXT),O===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function S(A,b){let O;return A?b===null||b===Un||b===rs?O=i.DEPTH24_STENCIL8:b===xn?O=i.DEPTH32F_STENCIL8:b===is&&(O=i.DEPTH24_STENCIL8,Pe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Un||b===rs?O=i.DEPTH_COMPONENT24:b===xn?O=i.DEPTH_COMPONENT32F:b===is&&(O=i.DEPTH_COMPONENT16),O}function E(A,b){return p(A)===!0||A.isFramebufferTexture&&A.minFilter!==Lt&&A.minFilter!==Dt?Math.log2(Math.max(b.width,b.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?b.mipmaps.length:1}function R(A){let b=A.target;b.removeEventListener("dispose",R),w(b),b.isVideoTexture&&h.delete(b),b.isHTMLTexture&&u.delete(b)}function v(A){let b=A.target;b.removeEventListener("dispose",v),F(b)}function w(A){let b=n.get(A);if(b.__webglInit===void 0)return;let O=A.source,H=f.get(O);if(H){let j=H[b.__cacheKey];j.usedTimes--,j.usedTimes===0&&C(A),Object.keys(H).length===0&&f.delete(O)}n.remove(A)}function C(A){let b=n.get(A);i.deleteTexture(b.__webglTexture);let O=A.source,H=f.get(O);delete H[b.__cacheKey],o.memory.textures--}function F(A){let b=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(b.__webglFramebuffer[H]))for(let j=0;j<b.__webglFramebuffer[H].length;j++)i.deleteFramebuffer(b.__webglFramebuffer[H][j]);else i.deleteFramebuffer(b.__webglFramebuffer[H]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[H])}else{if(Array.isArray(b.__webglFramebuffer))for(let H=0;H<b.__webglFramebuffer.length;H++)i.deleteFramebuffer(b.__webglFramebuffer[H]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let H=0;H<b.__webglColorRenderbuffer.length;H++)b.__webglColorRenderbuffer[H]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[H]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let O=A.textures;for(let H=0,j=O.length;H<j;H++){let ae=n.get(O[H]);ae.__webglTexture&&(i.deleteTexture(ae.__webglTexture),o.memory.textures--),n.remove(O[H])}n.remove(A)}let U=0;function B(){U=0}function L(){return U}function k(A){U=A}function q(){let A=U;return A>=r.maxTextures&&Pe("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+r.maxTextures),U+=1,A}function W(A){let b=[];return b.push(A.wrapS),b.push(A.wrapT),b.push(A.wrapR||0),b.push(A.magFilter),b.push(A.minFilter),b.push(A.anisotropy),b.push(A.internalFormat),b.push(A.format),b.push(A.type),b.push(A.generateMipmaps),b.push(A.premultiplyAlpha),b.push(A.flipY),b.push(A.unpackAlignment),b.push(A.colorSpace),b.join()}function ie(A,b){let O=n.get(A);if(A.isVideoTexture&&I(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&O.__version!==A.version){let H=A.image;if(H===null)Pe("WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)Pe("WebGLRenderer: Texture marked for update but image is incomplete");else{be(O,A,b);return}}else A.isExternalTexture&&(O.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+b)}function X(A,b){let O=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){be(O,A,b);return}else A.isExternalTexture&&(O.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+b)}function $(A,b){let O=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){be(O,A,b);return}t.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+b)}function te(A,b){let O=n.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&O.__version!==A.version){ke(O,A,b);return}t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+b)}let Ie={[Ei]:i.REPEAT,[Mn]:i.CLAMP_TO_EDGE,[Dr]:i.MIRRORED_REPEAT},Te={[Lt]:i.NEAREST,[$a]:i.NEAREST_MIPMAP_NEAREST,[cr]:i.NEAREST_MIPMAP_LINEAR,[Dt]:i.LINEAR,[ns]:i.LINEAR_MIPMAP_NEAREST,[Nn]:i.LINEAR_MIPMAP_LINEAR},ot={[Df]:i.NEVER,[kf]:i.ALWAYS,[Nf]:i.LESS,[Bc]:i.LEQUAL,[Uf]:i.EQUAL,[kc]:i.GEQUAL,[Of]:i.GREATER,[Bf]:i.NOTEQUAL};function Qe(A,b){if(b.type===xn&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===Dt||b.magFilter===ns||b.magFilter===cr||b.magFilter===Nn||b.minFilter===Dt||b.minFilter===ns||b.minFilter===cr||b.minFilter===Nn)&&Pe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,Ie[b.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,Ie[b.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,Ie[b.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,Te[b.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,Te[b.minFilter]),b.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,ot[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Lt||b.minFilter!==cr&&b.minFilter!==Nn||b.type===xn&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){let O=e.get("EXT_texture_filter_anisotropic");i.texParameterf(A,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,r.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function rt(A,b){let O=!1;A.__webglInit===void 0&&(A.__webglInit=!0,b.addEventListener("dispose",R));let H=b.source,j=f.get(H);j===void 0&&(j={},f.set(H,j));let ae=W(b);if(ae!==A.__cacheKey){j[ae]===void 0&&(j[ae]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,O=!0),j[ae].usedTimes++;let le=j[A.__cacheKey];le!==void 0&&(j[A.__cacheKey].usedTimes--,le.usedTimes===0&&C(b)),A.__cacheKey=ae,A.__webglTexture=j[ae].texture}return O}function J(A,b,O){return Math.floor(Math.floor(A/O)/b)}function Q(A,b,O,H){let ae=A.updateRanges;if(ae.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,b.width,b.height,O,H,b.data);else{ae.sort((Fe,ge)=>Fe.start-ge.start);let le=0;for(let Fe=1;Fe<ae.length;Fe++){let ge=ae[le],de=ae[Fe],Le=ge.start+ge.count,Oe=J(de.start,b.width,4),je=J(ge.start,b.width,4);de.start<=Le+1&&Oe===je&&J(de.start+de.count-1,b.width,4)===Oe?ge.count=Math.max(ge.count,de.start+de.count-ge.start):(++le,ae[le]=de)}ae.length=le+1;let K=t.getParameter(i.UNPACK_ROW_LENGTH),Z=t.getParameter(i.UNPACK_SKIP_PIXELS),ue=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,b.width);for(let Fe=0,ge=ae.length;Fe<ge;Fe++){let de=ae[Fe],Le=Math.floor(de.start/4),Oe=Math.ceil(de.count/4),je=Le%b.width,N=Math.floor(Le/b.width),fe=Oe,Y=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,je),t.pixelStorei(i.UNPACK_SKIP_ROWS,N),t.texSubImage2D(i.TEXTURE_2D,0,je,N,fe,Y,O,H,b.data)}A.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,K),t.pixelStorei(i.UNPACK_SKIP_PIXELS,Z),t.pixelStorei(i.UNPACK_SKIP_ROWS,ue)}}function be(A,b,O){let H=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(H=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(H=i.TEXTURE_3D);let j=rt(A,b),ae=b.source;t.bindTexture(H,A.__webglTexture,i.TEXTURE0+O);let le=n.get(ae);if(ae.version!==le.__version||j===!0){if(t.activeTexture(i.TEXTURE0+O),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){let Y=Ye.getPrimaries(Ye.workingColorSpace),pe=b.colorSpace===fi?null:Ye.getPrimaries(b.colorSpace),_e=b.colorSpace===fi||Y===pe?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e)}t.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment);let Z=m(b.image,!1,r.maxTextureSize);Z=ct(b,Z);let ue=s.convert(b.format,b.colorSpace),Fe=s.convert(b.type),ge=x(b.internalFormat,ue,Fe,b.normalized,b.colorSpace,b.isVideoTexture);Qe(H,b);let de,Le=b.mipmaps,Oe=b.isVideoTexture!==!0,je=le.__version===void 0||j===!0,N=ae.dataReady,fe=E(b,Z);if(b.isDepthTexture)ge=S(b.format===Di,b.type),je&&(Oe?t.texStorage2D(i.TEXTURE_2D,1,ge,Z.width,Z.height):t.texImage2D(i.TEXTURE_2D,0,ge,Z.width,Z.height,0,ue,Fe,null));else if(b.isDataTexture)if(Le.length>0){Oe&&je&&t.texStorage2D(i.TEXTURE_2D,fe,ge,Le[0].width,Le[0].height);for(let Y=0,pe=Le.length;Y<pe;Y++)de=Le[Y],Oe?N&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,de.width,de.height,ue,Fe,de.data):t.texImage2D(i.TEXTURE_2D,Y,ge,de.width,de.height,0,ue,Fe,de.data);b.generateMipmaps=!1}else Oe?(je&&t.texStorage2D(i.TEXTURE_2D,fe,ge,Z.width,Z.height),N&&Q(b,Z,ue,Fe)):t.texImage2D(i.TEXTURE_2D,0,ge,Z.width,Z.height,0,ue,Fe,Z.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Oe&&je&&t.texStorage3D(i.TEXTURE_2D_ARRAY,fe,ge,Le[0].width,Le[0].height,Z.depth);for(let Y=0,pe=Le.length;Y<pe;Y++)if(de=Le[Y],b.format!==vn)if(ue!==null)if(Oe){if(N)if(b.layerUpdates.size>0){let _e=Uh(de.width,de.height,b.format,b.type);for(let ne of b.layerUpdates){let De=de.data.subarray(ne*_e/de.data.BYTES_PER_ELEMENT,(ne+1)*_e/de.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,ne,de.width,de.height,1,ue,De)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,de.width,de.height,Z.depth,ue,de.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Y,ge,de.width,de.height,Z.depth,0,de.data,0,0);else Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Oe?N&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,de.width,de.height,Z.depth,ue,Fe,de.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Y,ge,de.width,de.height,Z.depth,0,ue,Fe,de.data);b.layerUpdates.size>0&&b.clearLayerUpdates()}else{Oe&&je&&t.texStorage2D(i.TEXTURE_2D,fe,ge,Le[0].width,Le[0].height);for(let Y=0,pe=Le.length;Y<pe;Y++)de=Le[Y],b.format!==vn?ue!==null?Oe?N&&t.compressedTexSubImage2D(i.TEXTURE_2D,Y,0,0,de.width,de.height,ue,de.data):t.compressedTexImage2D(i.TEXTURE_2D,Y,ge,de.width,de.height,0,de.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?N&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,de.width,de.height,ue,Fe,de.data):t.texImage2D(i.TEXTURE_2D,Y,ge,de.width,de.height,0,ue,Fe,de.data)}else if(b.isDataArrayTexture)if(Oe){if(je&&t.texStorage3D(i.TEXTURE_2D_ARRAY,fe,ge,Z.width,Z.height,Z.depth),N)if(b.layerUpdates.size>0){let Y=Uh(Z.width,Z.height,b.format,b.type);for(let pe of b.layerUpdates){let _e=Z.data.subarray(pe*Y/Z.data.BYTES_PER_ELEMENT,(pe+1)*Y/Z.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,pe,Z.width,Z.height,1,ue,Fe,_e)}b.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,ue,Fe,Z.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ge,Z.width,Z.height,Z.depth,0,ue,Fe,Z.data);else if(b.isData3DTexture)Oe?(je&&t.texStorage3D(i.TEXTURE_3D,fe,ge,Z.width,Z.height,Z.depth),N&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,ue,Fe,Z.data)):t.texImage3D(i.TEXTURE_3D,0,ge,Z.width,Z.height,Z.depth,0,ue,Fe,Z.data);else if(b.isFramebufferTexture){if(je)if(Oe)t.texStorage2D(i.TEXTURE_2D,fe,ge,Z.width,Z.height);else{let Y=Z.width,pe=Z.height;for(let _e=0;_e<fe;_e++)t.texImage2D(i.TEXTURE_2D,_e,ge,Y,pe,0,ue,Fe,null),Y>>=1,pe>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in i){let Y=i.canvas;if(Y.hasAttribute("layoutsubtree")||Y.setAttribute("layoutsubtree","true"),Z.parentNode!==Y){Y.appendChild(Z),u.add(b),Y.onpaint=pe=>{let _e=pe.changedElements;for(let ne of u)_e.includes(ne.image)&&(ne.needsUpdate=!0)},Y.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,Z);else{let _e=i.RGBA,ne=i.RGBA,De=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,_e,ne,De,Z)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Le.length>0){if(Oe&&je){let Y=et(Le[0]);t.texStorage2D(i.TEXTURE_2D,fe,ge,Y.width,Y.height)}for(let Y=0,pe=Le.length;Y<pe;Y++)de=Le[Y],Oe?N&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,ue,Fe,de):t.texImage2D(i.TEXTURE_2D,Y,ge,ue,Fe,de);b.generateMipmaps=!1}else if(Oe){if(je){let Y=et(Z);t.texStorage2D(i.TEXTURE_2D,fe,ge,Y.width,Y.height)}N&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ue,Fe,Z)}else t.texImage2D(i.TEXTURE_2D,0,ge,ue,Fe,Z);p(b)&&M(H),le.__version=ae.version,b.onUpdate&&b.onUpdate(b)}A.__version=b.version}function ke(A,b,O){if(b.image.length!==6)return;let H=rt(A,b),j=b.source;t.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+O);let ae=n.get(j);if(j.version!==ae.__version||H===!0){t.activeTexture(i.TEXTURE0+O);let le=Ye.getPrimaries(Ye.workingColorSpace),K=b.colorSpace===fi?null:Ye.getPrimaries(b.colorSpace),Z=b.colorSpace===fi||le===K?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);let ue=b.isCompressedTexture||b.image[0].isCompressedTexture,Fe=b.image[0]&&b.image[0].isDataTexture,ge=[];for(let ne=0;ne<6;ne++)!ue&&!Fe?ge[ne]=m(b.image[ne],!0,r.maxCubemapSize):ge[ne]=Fe?b.image[ne].image:b.image[ne],ge[ne]=ct(b,ge[ne]);let de=ge[0],Le=s.convert(b.format,b.colorSpace),Oe=s.convert(b.type),je=x(b.internalFormat,Le,Oe,b.normalized,b.colorSpace),N=b.isVideoTexture!==!0,fe=ae.__version===void 0||H===!0,Y=j.dataReady,pe=E(b,de);Qe(i.TEXTURE_CUBE_MAP,b);let _e;if(ue){N&&fe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,je,de.width,de.height);for(let ne=0;ne<6;ne++){_e=ge[ne].mipmaps;for(let De=0;De<_e.length;De++){let Re=_e[De];b.format!==vn?Le!==null?N?Y&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,De,0,0,Re.width,Re.height,Le,Re.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,De,je,Re.width,Re.height,0,Re.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,De,0,0,Re.width,Re.height,Le,Oe,Re.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,De,je,Re.width,Re.height,0,Le,Oe,Re.data)}}}else{if(_e=b.mipmaps,N&&fe){_e.length>0&&pe++;let ne=et(ge[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,je,ne.width,ne.height)}for(let ne=0;ne<6;ne++)if(Fe){N?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,ge[ne].width,ge[ne].height,Le,Oe,ge[ne].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,je,ge[ne].width,ge[ne].height,0,Le,Oe,ge[ne].data);for(let De=0;De<_e.length;De++){let yt=_e[De].image[ne].image;N?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,De+1,0,0,yt.width,yt.height,Le,Oe,yt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,De+1,je,yt.width,yt.height,0,Le,Oe,yt.data)}}else{N?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Le,Oe,ge[ne]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,je,Le,Oe,ge[ne]);for(let De=0;De<_e.length;De++){let Re=_e[De];N?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,De+1,0,0,Le,Oe,Re.image[ne]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,De+1,je,Le,Oe,Re.image[ne])}}}p(b)&&M(i.TEXTURE_CUBE_MAP),ae.__version=j.version,b.onUpdate&&b.onUpdate(b)}A.__version=b.version}function ye(A,b,O,H,j,ae){let le=s.convert(O.format,O.colorSpace),K=s.convert(O.type),Z=x(O.internalFormat,le,K,O.normalized,O.colorSpace),ue=n.get(b),Fe=n.get(O);if(Fe.__renderTarget=b,!ue.__hasExternalTextures){let ge=Math.max(1,b.width>>ae),de=Math.max(1,b.height>>ae);j===i.TEXTURE_3D||j===i.TEXTURE_2D_ARRAY?t.texImage3D(j,ae,Z,ge,de,b.depth,0,le,K,null):t.texImage2D(j,ae,Z,ge,de,0,le,K,null)}t.bindFramebuffer(i.FRAMEBUFFER,A),qe(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,H,j,Fe.__webglTexture,0,He(b)):(j===i.TEXTURE_2D||j>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,H,j,Fe.__webglTexture,ae),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ge(A,b,O){if(i.bindRenderbuffer(i.RENDERBUFFER,A),b.depthBuffer){let H=b.depthTexture,j=H&&H.isDepthTexture?H.type:null,ae=S(b.stencilBuffer,j),le=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;qe(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,He(b),ae,b.width,b.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,He(b),ae,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,ae,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,le,i.RENDERBUFFER,A)}else{let H=b.textures;for(let j=0;j<H.length;j++){let ae=H[j],le=s.convert(ae.format,ae.colorSpace),K=s.convert(ae.type),Z=x(ae.internalFormat,le,K,ae.normalized,ae.colorSpace);qe(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,He(b),Z,b.width,b.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,He(b),Z,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,Z,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ft(A,b,O){let H=b.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,A),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let j=n.get(b.depthTexture);if(j.__renderTarget=b,(!j.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),H){if(j.__webglInit===void 0&&(j.__webglInit=!0,b.depthTexture.addEventListener("dispose",R)),j.__webglTexture===void 0){j.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),Qe(i.TEXTURE_CUBE_MAP,b.depthTexture);let ue=s.convert(b.depthTexture.format),Fe=s.convert(b.depthTexture.type),ge;b.depthTexture.format===Vn?ge=i.DEPTH_COMPONENT24:b.depthTexture.format===Di&&(ge=i.DEPTH24_STENCIL8);for(let de=0;de<6;de++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,ge,b.width,b.height,0,ue,Fe,null)}}else ie(b.depthTexture,0);let ae=j.__webglTexture,le=He(b),K=H?i.TEXTURE_CUBE_MAP_POSITIVE_X+O:i.TEXTURE_2D,Z=b.depthTexture.format===Di?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(b.depthTexture.format===Vn)qe(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,K,ae,0,le):i.framebufferTexture2D(i.FRAMEBUFFER,Z,K,ae,0);else if(b.depthTexture.format===Di)qe(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,K,ae,0,le):i.framebufferTexture2D(i.FRAMEBUFFER,Z,K,ae,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ee(A){let b=n.get(A),O=A.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==A.depthTexture){let H=A.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),H){let j=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,H.removeEventListener("dispose",j)};H.addEventListener("dispose",j),b.__depthDisposeCallback=j}b.__boundDepthTexture=H}if(A.depthTexture&&!b.__autoAllocateDepthBuffer)if(O)for(let H=0;H<6;H++)ft(b.__webglFramebuffer[H],A,H);else{let H=A.texture.mipmaps;H&&H.length>0?ft(b.__webglFramebuffer[0],A,0):ft(b.__webglFramebuffer,A,0)}else if(O){b.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[H]),b.__webglDepthbuffer[H]===void 0)b.__webglDepthbuffer[H]=i.createRenderbuffer(),Ge(b.__webglDepthbuffer[H],A,!1);else{let j=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=b.__webglDepthbuffer[H];i.bindRenderbuffer(i.RENDERBUFFER,ae),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,ae)}}else{let H=A.texture.mipmaps;if(H&&H.length>0?t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),Ge(b.__webglDepthbuffer,A,!1);else{let j=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ae),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,ae)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function re(A,b,O){let H=n.get(A);b!==void 0&&ye(H.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&ee(A)}function se(A){let b=A.texture,O=n.get(A),H=n.get(b);A.addEventListener("dispose",v);let j=A.textures,ae=A.isWebGLCubeRenderTarget===!0,le=j.length>1;if(le||(H.__webglTexture===void 0&&(H.__webglTexture=i.createTexture()),H.__version=b.version,o.memory.textures++),ae){O.__webglFramebuffer=[];for(let K=0;K<6;K++)if(b.mipmaps&&b.mipmaps.length>0){O.__webglFramebuffer[K]=[];for(let Z=0;Z<b.mipmaps.length;Z++)O.__webglFramebuffer[K][Z]=i.createFramebuffer()}else O.__webglFramebuffer[K]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){O.__webglFramebuffer=[];for(let K=0;K<b.mipmaps.length;K++)O.__webglFramebuffer[K]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(le)for(let K=0,Z=j.length;K<Z;K++){let ue=n.get(j[K]);ue.__webglTexture===void 0&&(ue.__webglTexture=i.createTexture(),o.memory.textures++)}if(A.samples>0&&qe(A)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let K=0;K<j.length;K++){let Z=j[K];O.__webglColorRenderbuffer[K]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[K]);let ue=s.convert(Z.format,Z.colorSpace),Fe=s.convert(Z.type),ge=x(Z.internalFormat,ue,Fe,Z.normalized,Z.colorSpace,A.isXRRenderTarget===!0),de=He(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,de,ge,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+K,i.RENDERBUFFER,O.__webglColorRenderbuffer[K])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),Ge(O.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ae){t.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture),Qe(i.TEXTURE_CUBE_MAP,b);for(let K=0;K<6;K++)if(b.mipmaps&&b.mipmaps.length>0)for(let Z=0;Z<b.mipmaps.length;Z++)ye(O.__webglFramebuffer[K][Z],A,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Z);else ye(O.__webglFramebuffer[K],A,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);p(b)&&M(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(le){for(let K=0,Z=j.length;K<Z;K++){let ue=j[K],Fe=n.get(ue),ge=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ge=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ge,Fe.__webglTexture),Qe(ge,ue),ye(O.__webglFramebuffer,A,ue,i.COLOR_ATTACHMENT0+K,ge,0),p(ue)&&M(ge)}t.unbindTexture()}else{let K=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(K=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(K,H.__webglTexture),Qe(K,b),b.mipmaps&&b.mipmaps.length>0)for(let Z=0;Z<b.mipmaps.length;Z++)ye(O.__webglFramebuffer[Z],A,b,i.COLOR_ATTACHMENT0,K,Z);else ye(O.__webglFramebuffer,A,b,i.COLOR_ATTACHMENT0,K,0);p(b)&&M(K),t.unbindTexture()}A.depthBuffer&&ee(A)}function oe(A){let b=A.textures;for(let O=0,H=b.length;O<H;O++){let j=b[O];if(p(j)){let ae=T(A),le=n.get(j).__webglTexture;t.bindTexture(ae,le),M(ae),t.unbindTexture()}}}let he=[],Ue=[];function Ne(A){if(A.samples>0){if(qe(A)===!1){let b=A.textures,O=A.width,H=A.height,j=i.COLOR_BUFFER_BIT,ae=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=n.get(A),K=b.length>1;if(K)for(let ue=0;ue<b.length;ue++)t.bindFramebuffer(i.FRAMEBUFFER,le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,le.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,le.__webglMultisampledFramebuffer);let Z=A.texture.mipmaps;Z&&Z.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglFramebuffer);for(let ue=0;ue<b.length;ue++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(j|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(j|=i.STENCIL_BUFFER_BIT)),K){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,le.__webglColorRenderbuffer[ue]);let Fe=n.get(b[ue]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Fe,0)}i.blitFramebuffer(0,0,O,H,0,0,O,H,j,i.NEAREST),c===!0&&(he.length=0,Ue.length=0,he.push(i.COLOR_ATTACHMENT0+ue),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&(he.push(ae),Ue.push(ae),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ue)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,he))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),K)for(let ue=0;ue<b.length;ue++){t.bindFramebuffer(i.FRAMEBUFFER,le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,le.__webglColorRenderbuffer[ue]);let Fe=n.get(b[ue]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,le.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.TEXTURE_2D,Fe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&c){let b=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function He(A){return Math.min(r.maxSamples,A.samples)}function qe(A){let b=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function I(A){let b=o.render.frame;h.get(A)!==b&&(h.set(A,b),A.update())}function ct(A,b){let O=A.colorSpace,H=A.format,j=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||O!==sn&&O!==fi&&(Ye.getTransfer(O)===dt?(H!==vn||j!==un)&&Pe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Be("WebGLTextures: Unsupported texture color space:",O)),b}function et(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=q,this.resetTextureUnits=B,this.getTextureUnits=L,this.setTextureUnits=k,this.setTexture2D=ie,this.setTexture2DArray=X,this.setTexture3D=$,this.setTextureCube=te,this.rebindTextures=re,this.setupRenderTarget=se,this.updateRenderTargetMipmap=oe,this.updateMultisampleRenderTarget=Ne,this.setupDepthRenderbuffer=ee,this.setupFrameBufferTexture=ye,this.useMultisampledRTT=qe,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function sy(i,e){function t(n,r=fi){let s,o=Ye.getTransfer(r);if(n===un)return i.UNSIGNED_BYTE;if(n===ec)return i.UNSIGNED_SHORT_4_4_4_4;if(n===tc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Sh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Eh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===yh)return i.BYTE;if(n===Mh)return i.SHORT;if(n===is)return i.UNSIGNED_SHORT;if(n===Qa)return i.INT;if(n===Un)return i.UNSIGNED_INT;if(n===xn)return i.FLOAT;if(n===On)return i.HALF_FLOAT;if(n===Th)return i.ALPHA;if(n===wh)return i.RGB;if(n===vn)return i.RGBA;if(n===Vn)return i.DEPTH_COMPONENT;if(n===Di)return i.DEPTH_STENCIL;if(n===nc)return i.RED;if(n===ic)return i.RED_INTEGER;if(n===Ni)return i.RG;if(n===rc)return i.RG_INTEGER;if(n===sc)return i.RGBA_INTEGER;if(n===mo||n===go||n===bo||n===xo)if(o===dt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===mo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===go)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===bo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===xo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===mo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===go)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===bo)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===xo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===oc||n===ac||n===cc||n===lc)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===oc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ac)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===cc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===lc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===hc||n===uc||n===dc||n===fc||n===pc||n===vo||n===mc)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===hc||n===uc)return o===dt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===dc)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===fc)return s.COMPRESSED_R11_EAC;if(n===pc)return s.COMPRESSED_SIGNED_R11_EAC;if(n===vo)return s.COMPRESSED_RG11_EAC;if(n===mc)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===gc||n===bc||n===xc||n===vc||n===_c||n===yc||n===Mc||n===Sc||n===Ec||n===Tc||n===wc||n===Ac||n===Rc||n===Cc)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===gc)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===bc)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===xc)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===vc)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===_c)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===yc)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Mc)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Sc)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ec)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Tc)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===wc)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ac)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Rc)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Cc)return o===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Pc||n===Ic||n===Fc)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Pc)return o===dt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ic)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Fc)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Lc||n===Dc||n===_o||n===Nc)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Lc)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Dc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===_o)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Nc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===rs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var oy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ay=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,tu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new qs(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Qt({vertexShader:oy,fragmentShader:ay,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ze(new Ln(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},nu=class extends Fn{constructor(e,t){super();let n=this,r=null,s=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null,_=typeof XRWebGLBinding<"u",m=new tu,p={},M=t.getContextAttributes(),T=null,x=null,S=[],E=[],R=new ce,v=null,w=null,C=new zt;C.viewport=new mt;let F=new zt;F.viewport=new mt;let U=[C,F],B=new qa,L=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let Q=S[J];return Q===void 0&&(Q=new zr,S[J]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(J){let Q=S[J];return Q===void 0&&(Q=new zr,S[J]=Q),Q.getGripSpace()},this.getHand=function(J){let Q=S[J];return Q===void 0&&(Q=new zr,S[J]=Q),Q.getHandSpace()};function q(J){let Q=E.indexOf(J.inputSource);if(Q===-1)return;let be=S[Q];be!==void 0&&(be.update(J.inputSource,J.frame,l||o),be.dispatchEvent({type:J.type,data:J.inputSource}))}function W(){r.removeEventListener("select",q),r.removeEventListener("selectstart",q),r.removeEventListener("selectend",q),r.removeEventListener("squeeze",q),r.removeEventListener("squeezestart",q),r.removeEventListener("squeezeend",q),r.removeEventListener("end",W),r.removeEventListener("inputsourceschange",ie);for(let J=0;J<S.length;J++){let Q=E[J];Q!==null&&(E[J]=null,S[J].disconnect(Q))}L=null,k=null,m.reset();for(let J in p)delete p[J];if(e.setRenderTarget(T),f=null,d=null,u=null,r=null,x=null,rt.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(R.width,R.height,!1),w!==null){let J=w.camera;J.fov=w.fov,J.zoom=w.zoom,J.updateProjectionMatrix(),w=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){s=J,n.isPresenting===!0&&Pe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){a=J,n.isPresenting===!0&&Pe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(J){l=J},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(J){if(r=J,r!==null){if(T=e.getRenderTarget(),r.addEventListener("select",q),r.addEventListener("selectstart",q),r.addEventListener("selectend",q),r.addEventListener("squeeze",q),r.addEventListener("squeezestart",q),r.addEventListener("squeezeend",q),r.addEventListener("end",W),r.addEventListener("inputsourceschange",ie),M.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(R),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let be=null,ke=null,ye=null;M.depth&&(ye=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,be=M.stencil?Di:Vn,ke=M.stencil?rs:Un);let Ge={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(Ge),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new an(d.textureWidth,d.textureHeight,{format:vn,type:un,depthTexture:new Ai(d.textureWidth,d.textureHeight,ke,void 0,void 0,void 0,void 0,void 0,void 0,be),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let be={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,be),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new an(f.framebufferWidth,f.framebufferHeight,{format:vn,type:un,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),rt.setContext(r),rt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ie(J){for(let Q=0;Q<J.removed.length;Q++){let be=J.removed[Q],ke=E.indexOf(be);ke>=0&&(E[ke]=null,S[ke].disconnect(be))}for(let Q=0;Q<J.added.length;Q++){let be=J.added[Q],ke=E.indexOf(be);if(ke===-1){for(let Ge=0;Ge<S.length;Ge++)if(Ge>=E.length){E.push(be),ke=Ge;break}else if(E[Ge]===null){E[Ge]=be,ke=Ge;break}if(ke===-1)break}let ye=S[ke];ye&&ye.connect(be)}}let X=new P,$=new P;function te(J,Q,be){X.setFromMatrixPosition(Q.matrixWorld),$.setFromMatrixPosition(be.matrixWorld);let ke=X.distanceTo($),ye=Q.projectionMatrix.elements,Ge=be.projectionMatrix.elements,ft=ye[14]/(ye[10]-1),ee=ye[14]/(ye[10]+1),re=(ye[9]+1)/ye[5],se=(ye[9]-1)/ye[5],oe=(ye[8]-1)/ye[0],he=(Ge[8]+1)/Ge[0],Ue=ft*oe,Ne=ft*he,He=ke/(-oe+he),qe=He*-oe;if(Q.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(qe),J.translateZ(He),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),ye[10]===-1)J.projectionMatrix.copy(Q.projectionMatrix),J.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{let I=ft+He,ct=ee+He,et=Ue-qe,A=Ne+(ke-qe),b=re*ee/ct*I,O=se*ee/ct*I;J.projectionMatrix.makePerspective(et,A,b,O,I,ct),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function Ie(J,Q){Q===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(Q.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(r===null)return;let Q=J.near,be=J.far;m.texture!==null&&(m.depthNear>0&&(Q=m.depthNear),m.depthFar>0&&(be=m.depthFar)),B.near=F.near=C.near=Q,B.far=F.far=C.far=be,(L!==B.near||k!==B.far)&&(r.updateRenderState({depthNear:B.near,depthFar:B.far}),L=B.near,k=B.far),B.layers.mask=J.layers.mask|6,C.layers.mask=B.layers.mask&-5,F.layers.mask=B.layers.mask&-3;let ke=J.parent,ye=B.cameras;Ie(B,ke);for(let Ge=0;Ge<ye.length;Ge++)Ie(ye[Ge],ke);ye.length===2?te(B,C,F):B.projectionMatrix.copy(C.projectionMatrix),w===null&&J.isPerspectiveCamera&&(w={camera:J,fov:J.fov,zoom:J.zoom}),Te(J,B,ke)};function Te(J,Q,be){be===null?J.matrix.copy(Q.matrixWorld):(J.matrix.copy(be.matrixWorld),J.matrix.invert(),J.matrix.multiply(Q.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(Q.projectionMatrix),J.projectionMatrixInverse.copy(Q.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Zi*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(J){c=J,d!==null&&(d.fixedFoveation=J),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=J)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(B)},this.getCameraTexture=function(J){return p[J]};let ot=null;function Qe(J,Q){if(h=Q.getViewerPose(l||o),g=Q,h!==null){let be=h.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let ke=!1;be.length!==B.cameras.length&&(B.cameras.length=0,ke=!0);for(let ee=0;ee<be.length;ee++){let re=be[ee],se=null;if(f!==null)se=f.getViewport(re);else{let he=u.getViewSubImage(d,re);se=he.viewport,ee===0&&(e.setRenderTargetTextures(x,he.colorTexture,he.depthStencilTexture),e.setRenderTarget(x))}let oe=U[ee];oe===void 0&&(oe=new zt,oe.layers.enable(ee),oe.viewport=new mt,U[ee]=oe),oe.matrix.fromArray(re.transform.matrix),oe.matrix.decompose(oe.position,oe.quaternion,oe.scale),oe.projectionMatrix.fromArray(re.projectionMatrix),oe.projectionMatrixInverse.copy(oe.projectionMatrix).invert(),oe.viewport.set(se.x,se.y,se.width,se.height),ee===0&&(B.matrix.copy(oe.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),ke===!0&&B.cameras.push(oe)}let ye=r.enabledFeatures;if(ye&&ye.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){u=n.getBinding();let ee=u.getDepthInformation(be[0]);ee&&ee.isValid&&ee.texture&&m.init(ee,r.renderState)}if(ye&&ye.includes("camera-access")&&_){e.state.unbindTexture(),u=n.getBinding();for(let ee=0;ee<be.length;ee++){let re=be[ee].camera;if(re){let se=p[re];se||(se=new qs,p[re]=se);let oe=u.getCameraImage(re);se.sourceTexture=oe}}}}for(let be=0;be<S.length;be++){let ke=E[be],ye=S[be];ke!==null&&ye!==void 0&&ye.update(ke,Q,l||o)}ot&&ot(J,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),g=null}let rt=new xp;rt.setAnimationLoop(Qe),this.setAnimationLoop=function(J){ot=J},this.dispose=function(){}}},cy=new Ve,Ep=new We;Ep.set(-1,0,0,0,1,0,0,0,1);function ly(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Lh(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,M,T,x){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?s(m,p):p.isMeshLambertMaterial?(s(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(m,p),u(m,p)):p.isMeshPhongMaterial?(s(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,x)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,M,T):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Jt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Jt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let M=e.get(p),T=M.envMap,x=M.envMapRotation;T&&(m.envMap.value=T,m.envMapRotation.value.setFromMatrix4(cy.makeRotationFromEuler(x)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Ep),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,M,T){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=T*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Jt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let M=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function hy(i,e,t,n){let r={},s={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,S){let E=S.program;n.uniformBlockBinding(x,E)}function l(x,S){let E=r[x.id];E===void 0&&(m(x),E=h(x),r[x.id]=E,x.addEventListener("dispose",M));let R=S.program;n.updateUBOMapping(x,R);let v=e.render.frame;s[x.id]!==v&&(d(x),s[x.id]=v)}function h(x){let S=u();x.__bindingPointIndex=S;let E=i.createBuffer(),R=x.__size,v=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,R,v),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,E),E}function u(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return Be("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){let S=r[x.id],E=x.uniforms,R=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let v=0,w=E.length;v<w;v++){let C=E[v];if(Array.isArray(C))for(let F=0,U=C.length;F<U;F++)f(C[F],v,F,R);else f(C,v,0,R)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(x,S,E,R){if(_(x,S,E,R)===!0){let v=x.__offset,w=x.value;if(Array.isArray(w)){let C=0;for(let F=0;F<w.length;F++){let U=w[F],B=p(U);g(U,x.__data,C),typeof U!="number"&&typeof U!="boolean"&&!U.isMatrix3&&!ArrayBuffer.isView(U)&&(C+=B.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(w,x.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,v,x.__data)}}function g(x,S,E){typeof x=="number"||typeof x=="boolean"?S[0]=x:x.isMatrix3?(S[0]=x.elements[0],S[1]=x.elements[1],S[2]=x.elements[2],S[3]=0,S[4]=x.elements[3],S[5]=x.elements[4],S[6]=x.elements[5],S[7]=0,S[8]=x.elements[6],S[9]=x.elements[7],S[10]=x.elements[8],S[11]=0):ArrayBuffer.isView(x)?S.set(new x.constructor(x.buffer,x.byteOffset,S.length)):x.toArray(S,E)}function _(x,S,E,R){let v=x.value,w=S+"_"+E;if(R[w]===void 0)return typeof v=="number"||typeof v=="boolean"?R[w]=v:ArrayBuffer.isView(v)?R[w]=v.slice():R[w]=v.clone(),!0;{let C=R[w];if(typeof v=="number"||typeof v=="boolean"){if(C!==v)return R[w]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(C.equals(v)===!1)return C.copy(v),!0}}return!1}function m(x){let S=x.uniforms,E=0,R=16;for(let w=0,C=S.length;w<C;w++){let F=Array.isArray(S[w])?S[w]:[S[w]];for(let U=0,B=F.length;U<B;U++){let L=F[U],k=Array.isArray(L.value)?L.value:[L.value];for(let q=0,W=k.length;q<W;q++){let ie=k[q],X=p(ie),$=E%R,te=$%X.boundary,Ie=$+te;E+=te,Ie!==0&&R-Ie<X.storage&&(E+=R-Ie),L.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=E,E+=X.storage}}}let v=E%R;return v>0&&(E+=R-v),x.__size=E,x.__cache={},this}function p(x){let S={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(S.boundary=4,S.storage=4):x.isVector2?(S.boundary=8,S.storage=8):x.isVector3||x.isColor?(S.boundary=16,S.storage=12):x.isVector4?(S.boundary=16,S.storage=16):x.isMatrix3?(S.boundary=48,S.storage=48):x.isMatrix4?(S.boundary=64,S.storage=64):x.isTexture?Pe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(S.boundary=16,S.storage=x.byteLength):Pe("WebGLRenderer: Unsupported uniform value type.",x),S}function M(x){let S=x.target;S.removeEventListener("dispose",M);let E=o.indexOf(S.__bindingPointIndex);o.splice(E,1),i.deleteBuffer(r[S.id]),delete r[S.id],delete s[S.id]}function T(){for(let x in r)i.deleteBuffer(r[x]);o=[],r={},s={}}return{bind:c,update:l,dispose:T}}var uy=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Jn=null;function dy(){return Jn===null&&(Jn=new Wr(uy,16,16,Ni,On),Jn.name="DFG_LUT",Jn.minFilter=Dt,Jn.magFilter=Dt,Jn.wrapS=Mn,Jn.wrapT=Mn,Jn.generateMipmaps=!1,Jn.needsUpdate=!0),Jn}var qc=class{constructor(e={}){let{canvas:t=zf(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=un}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=o;let _=f,m=new Set([sc,rc,ic]),p=new Set([un,Un,is,rs,ec,tc]),M=new Uint32Array(4),T=new Int32Array(4),x=new P,S=null,E=null,R=[],v=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Dn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let C=this,F=!1,U=null,B=null,L=null,k=null;this._outputColorSpace=wt;let q=0,W=0,ie=null,X=-1,$=null,te=new mt,Ie=new mt,Te=null,ot=new Ee(0),Qe=0,rt=t.width,J=t.height,Q=1,be=null,ke=null,ye=new mt(0,0,rt,J),Ge=new mt(0,0,rt,J),ft=!1,ee=new qr,re=!1,se=!1,oe=new Ve,he=new P,Ue=new mt,Ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},He=!1;function qe(){return ie===null?Q:1}let I=n;function ct(y,D){return t.getContext(y,D)}let et,A,b,O,H,j,ae,le,K,Z,ue,Fe,ge,de,Le,Oe,je,N,fe,Y,pe,_e,ne;try{let y={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",yt,!1),t.addEventListener("webglcontextrestored",lt,!1),t.addEventListener("webglcontextcreationerror",wn,!1),I===null){let D="webgl2";if(I=ct(D,y),I===null)throw ct(D)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}De()}catch(y){throw t.removeEventListener("webglcontextlost",yt,!1),t.removeEventListener("webglcontextrestored",lt,!1),t.removeEventListener("webglcontextcreationerror",wn,!1),Be("WebGLRenderer: "+y.message),y}function De(){et=new vv(I),et.init(),pe=new sy(I,et),A=new lv(I,et,e,pe),b=new iy(I,et),A.reversedDepthBuffer&&d&&b.buffers.depth.setReversed(!0),B=I.createFramebuffer(),L=I.createFramebuffer(),k=I.createFramebuffer(),O=new Mv(I),H=new V_,j=new ry(I,et,b,H,A,pe,O),ae=new xv(C),le=new E0(I),_e=new av(I,le),K=new _v(I,le,O,_e),Z=new Ev(I,K,le,_e,O),N=new Sv(I,A,j),Le=new hv(H),ue=new H_(C,ae,et,A,_e,Le),Fe=new ly(C,H),ge=new q_,de=new Z_(et),je=new ov(C,ae,b,Z,g,c),Oe=new ny(C,Z,A),ne=new hy(I,O,A,b),fe=new cv(I,et,O),Y=new yv(I,et,O),O.programs=ue.programs,C.capabilities=A,C.extensions=et,C.properties=H,C.renderLists=ge,C.shadowMap=Oe,C.state=b,C.info=O}_!==un&&(w=new wv(_,t.width,t.height,a,r,s));let Re=new nu(C,I);this.xr=Re,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let y=et.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){let y=et.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(y){y!==void 0&&(Q=y,this.setSize(rt,J,!1))},this.getSize=function(y){return y.set(rt,J)},this.setSize=function(y,D,V=!0){if(Re.isPresenting){Pe("WebGLRenderer: Can't change size while VR device is presenting.");return}rt=y,J=D,t.width=Math.floor(y*Q),t.height=Math.floor(D*Q),V===!0&&(t.style.width=y+"px",t.style.height=D+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,y,D)},this.getDrawingBufferSize=function(y){return y.set(rt*Q,J*Q).floor()},this.setDrawingBufferSize=function(y,D,V){rt=y,J=D,Q=V,t.width=Math.floor(y*V),t.height=Math.floor(D*V),this.setViewport(0,0,y,D)},this.setEffects=function(y){if(_===un){Be("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let D=0;D<y.length;D++)if(y[D].isOutputPass===!0){Pe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(te)},this.getViewport=function(y){return y.copy(ye)},this.setViewport=function(y,D,V,z){y.isVector4?ye.set(y.x,y.y,y.z,y.w):ye.set(y,D,V,z),b.viewport(te.copy(ye).multiplyScalar(Q).round())},this.getScissor=function(y){return y.copy(Ge)},this.setScissor=function(y,D,V,z){y.isVector4?Ge.set(y.x,y.y,y.z,y.w):Ge.set(y,D,V,z),b.scissor(Ie.copy(Ge).multiplyScalar(Q).round())},this.getScissorTest=function(){return ft},this.setScissorTest=function(y){b.setScissorTest(ft=y)},this.setOpaqueSort=function(y){be=y},this.setTransparentSort=function(y){ke=y},this.getClearColor=function(y){return y.copy(je.getClearColor())},this.setClearColor=function(){je.setClearColor(...arguments)},this.getClearAlpha=function(){return je.getClearAlpha()},this.setClearAlpha=function(){je.setClearAlpha(...arguments)},this.clear=function(y=!0,D=!0,V=!0){let z=0;if(y){let G=!1;if(ie!==null){let ve=ie.texture.format;G=m.has(ve)}if(G){let ve=ie.texture.type,Se=p.has(ve),xe=je.getClearColor(),we=je.getClearAlpha(),Ce=xe.r,Ke=xe.g,tt=xe.b;Se?(M[0]=Ce,M[1]=Ke,M[2]=tt,M[3]=we,I.clearBufferuiv(I.COLOR,0,M)):(T[0]=Ce,T[1]=Ke,T[2]=tt,T[3]=we,I.clearBufferiv(I.COLOR,0,T))}else z|=I.COLOR_BUFFER_BIT}D&&(z|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),V&&(z|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&I.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),U=y},this.dispose=function(){t.removeEventListener("webglcontextlost",yt,!1),t.removeEventListener("webglcontextrestored",lt,!1),t.removeEventListener("webglcontextcreationerror",wn,!1),je.dispose(),ge.dispose(),de.dispose(),H.dispose(),ae.dispose(),Z.dispose(),_e.dispose(),ne.dispose(),ue.dispose(),Re.dispose(),Re.removeEventListener("sessionstart",id),Re.removeEventListener("sessionend",rd),zi.stop()};function yt(y){y.preventDefault(),Ds("WebGLRenderer: Context Lost."),F=!0}function lt(){Ds("WebGLRenderer: Context Restored."),F=!1;let y=O.autoReset,D=Oe.enabled,V=Oe.autoUpdate,z=Oe.needsUpdate,G=Oe.type;De(),O.autoReset=y,Oe.enabled=D,Oe.autoUpdate=V,Oe.needsUpdate=z,Oe.type=G}function wn(y){Be("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function kn(y){let D=y.target;D.removeEventListener("dispose",kn),km(D)}function km(y){zm(y),H.remove(y)}function zm(y){let D=H.get(y).programs;D!==void 0&&(D.forEach(function(V){ue.releaseProgram(V)}),y.isShaderMaterial&&ue.releaseShaderCache(y))}this.renderBufferDirect=function(y,D,V,z,G,ve){D===null&&(D=Ne);let Se=G.isMesh&&G.matrixWorld.determinantAffine()<0,xe=Vm(y,D,V,z,G);b.setMaterial(z,Se);let we=V.index,Ce=1;if(z.wireframe===!0){if(we=K.getWireframeAttribute(V),we===void 0)return;Ce=2}let Ke=V.drawRange,tt=V.attributes.position,Ae=Ke.start*Ce,ht=(Ke.start+Ke.count)*Ce;ve!==null&&(Ae=Math.max(Ae,ve.start*Ce),ht=Math.min(ht,(ve.start+ve.count)*Ce)),we!==null?(Ae=Math.max(Ae,0),ht=Math.min(ht,we.count)):tt!=null&&(Ae=Math.max(Ae,0),ht=Math.min(ht,tt.count));let Bt=ht-Ae;if(Bt<0||Bt===1/0)return;_e.setup(G,z,xe,V,we);let St,vt=fe;if(we!==null&&(St=le.get(we),vt=Y,vt.setIndex(St)),G.isMesh)z.wireframe===!0?(b.setLineWidth(z.wireframeLinewidth*qe()),vt.setMode(I.LINES)):vt.setMode(I.TRIANGLES);else if(G.isLine){let Yt=z.linewidth;Yt===void 0&&(Yt=1),b.setLineWidth(Yt*qe()),G.isLineSegments?vt.setMode(I.LINES):G.isLineLoop?vt.setMode(I.LINE_LOOP):vt.setMode(I.LINE_STRIP)}else G.isPoints?vt.setMode(I.POINTS):G.isSprite&&vt.setMode(I.TRIANGLES);if(G.isBatchedMesh)if(et.get("WEBGL_multi_draw"))vt.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{let Yt=G._multiDrawStarts,Me=G._multiDrawCounts,nn=G._multiDrawCount,st=we?le.get(we).bytesPerElement:1,_n=H.get(z).currentProgram.getUniforms();for(let zn=0;zn<nn;zn++)_n.setValue(I,"_gl_DrawID",zn),vt.render(Yt[zn]/st,Me[zn])}else if(G.isInstancedMesh)vt.renderInstances(Ae,Bt,G.count);else if(V.isInstancedBufferGeometry){let Yt=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Me=Math.min(V.instanceCount,Yt);vt.renderInstances(Ae,Bt,Me)}else vt.render(Ae,Bt)};function nd(y,D,V,z){U!==null&&y.isNodeMaterial&&U.setObject(z,y),re===!0&&Le.setState(y,V,!1),y.transparent===!0&&y.side===hn&&y.forceSinglePass===!1?(y.side=Jt,y.needsUpdate=!0,ko(y,D,z),y.side=jn,y.needsUpdate=!0,ko(y,D,z),y.side=hn):ko(y,D,z)}this.compile=function(y,D,V=null){V===null&&(V=y),U!==null&&U.renderStart(y,D,V),E=de.get(V),E.init(D),v.push(E),V.traverseVisible(function(G){G.isLight&&G.layers.test(D.layers)&&(E.pushLight(G),G.castShadow&&E.pushShadow(G))}),y!==V&&y.traverseVisible(function(G){G.isLight&&G.layers.test(D.layers)&&(E.pushLight(G),G.castShadow&&E.pushShadow(G))}),E.setupLights(),U!==null&&U.updateLights(E.state.lightsArray),se=this.localClippingEnabled,re=Le.init(this.clippingPlanes,se),re===!0&&Le.setGlobalState(this.clippingPlanes,D),U!==null&&Oe.render(E.state.shadowsArray,V,D);let z=new Set;return y.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;let ve=G.material;if(ve)if(Array.isArray(ve))for(let Se=0;Se<ve.length;Se++){let xe=ve[Se];nd(xe,V,D,G),z.add(xe)}else nd(ve,V,D,G),z.add(ve)}),E=v.pop(),U!==null&&U.renderEnd(),z},this.compileAsync=function(y,D,V=null){let z=this.compile(y,D,V);return new Promise(G=>{function ve(){if(z.forEach(function(Se){let we=H.get(Se).currentProgram;(we===void 0||we.isReady())&&z.delete(Se)}),z.size===0){G(y);return}setTimeout(ve,10)}et.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let vl=null;function Gm(y){vl&&vl(y)}function id(){zi.stop()}function rd(){zi.start()}let zi=new xp;zi.setAnimationLoop(Gm),typeof self<"u"&&zi.setContext(self),this.setAnimationLoop=function(y){vl=y,Re.setAnimationLoop(y),y===null?zi.stop():zi.start()},Re.addEventListener("sessionstart",id),Re.addEventListener("sessionend",rd),this.render=function(y,D){if(D!==void 0&&D.isCamera!==!0){Be("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;U!==null&&U.renderStart(y,D);let V=Re.enabled===!0&&Re.isPresenting===!0,z=w!==null&&(ie===null||V)&&w.begin(C,ie);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Re.enabled===!0&&Re.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Re.cameraAutoUpdate===!0&&Re.updateCamera(D),D=Re.getCamera()),y.isScene===!0&&y.onBeforeRender(C,y,D,ie),E=de.get(y,v.length),E.init(D),E.state.textureUnits=j.getTextureUnits(),v.push(E),oe.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),ee.setFromProjectionMatrix(oe,In,D.reversedDepth),se=this.localClippingEnabled,re=Le.init(this.clippingPlanes,se),S=ge.get(y,R.length),S.init(),R.push(S),Re.enabled===!0&&Re.isPresenting===!0){let Se=C.xr.getDepthSensingMesh();Se!==null&&_l(Se,D,-1/0,C.sortObjects)}_l(y,D,0,C.sortObjects),S.finish(),U!==null&&U.updateLights(E.state.lightsArray),C.sortObjects===!0&&S.sort(be,ke),He=Re.enabled===!1||Re.isPresenting===!1||Re.hasDepthSensing()===!1,He&&je.addToRenderList(S,y),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),re===!0&&Le.beginShadows();let G=E.state.shadowsArray;if(Oe.render(G,y,D),re===!0&&Le.endShadows(),(z&&w.hasRenderPass())===!1){let Se=S.opaque,xe=S.transmissive;if(E.setupLights(),D.isArrayCamera){let we=D.cameras;if(xe.length>0)for(let Ce=0,Ke=we.length;Ce<Ke;Ce++){let tt=we[Ce];od(Se,xe,y,tt)}He&&je.render(y);for(let Ce=0,Ke=we.length;Ce<Ke;Ce++){let tt=we[Ce];sd(S,y,tt,tt.viewport)}}else xe.length>0&&od(Se,xe,y,D),He&&je.render(y),sd(S,y,D)}ie!==null&&W===0&&(j.updateMultisampleRenderTarget(ie),j.updateRenderTargetMipmap(ie)),z&&w.end(C),y.isScene===!0&&y.onAfterRender(C,y,D),_e.resetDefaultState(),X=-1,$=null,v.pop(),v.length>0?(E=v[v.length-1],j.setTextureUnits(E.state.textureUnits),re===!0&&Le.setGlobalState(C.clippingPlanes,E.state.camera)):E=null,R.pop(),R.length>0?S=R[R.length-1]:S=null,U!==null&&U.renderEnd()};function _l(y,D,V,z){if(y.visible===!1)return;if(y.layers.test(D.layers)){if(y.isGroup)V=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(D);else if(y.isLightProbeGrid)E.pushLightProbeGrid(y);else if(y.isLight)E.pushLight(y),y.castShadow&&E.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||y.intersectsFrustum(ee)){z&&Ue.setFromMatrixPosition(y.matrixWorld).applyMatrix4(oe);let Se=Z.update(y),xe=y.material;xe.visible&&S.push(y,Se,xe,V,Ue.z,null,D)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||y.intersectsFrustum(ee))){let Se=Z.update(y),xe=y.material;if(z&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Ue.copy(y.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),Ue.copy(Se.boundingSphere.center)),Ue.applyMatrix4(y.matrixWorld).applyMatrix4(oe)),Array.isArray(xe)){let we=Se.groups;for(let Ce=0,Ke=we.length;Ce<Ke;Ce++){let tt=we[Ce],Ae=xe[tt.materialIndex];Ae&&Ae.visible&&S.push(y,Se,Ae,V,Ue.z,tt,D)}}else xe.visible&&S.push(y,Se,xe,V,Ue.z,null,D)}}let ve=y.children;for(let Se=0,xe=ve.length;Se<xe;Se++)_l(ve[Se],D,V,z)}function sd(y,D,V,z){let{opaque:G,transmissive:ve,transparent:Se}=y;E.setupLightsView(V),re===!0&&Le.setGlobalState(C.clippingPlanes,V),z&&b.viewport(te.copy(z)),G.length>0&&Bo(G,D,V),ve.length>0&&Bo(ve,D,V),Se.length>0&&Bo(Se,D,V),b.buffers.depth.setTest(!0),b.buffers.depth.setMask(!0),b.buffers.color.setMask(!0),b.setPolygonOffset(!1)}function od(y,D,V,z){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[z.id]===void 0){let Ae=et.has("EXT_color_buffer_half_float")||et.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[z.id]=new an(1,1,{generateMipmaps:!0,type:Ae?On:un,minFilter:Nn,samples:Math.max(4,A.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ye.workingColorSpace})}let ve=E.state.transmissionRenderTarget[z.id],Se=z.viewport||te;ve.setSize(Se.z*C.transmissionResolutionScale,Se.w*C.transmissionResolutionScale);let xe=C.getRenderTarget(),we=C.getActiveCubeFace(),Ce=C.getActiveMipmapLevel();C.setRenderTarget(ve),C.getClearColor(ot),Qe=C.getClearAlpha(),Qe<1&&C.setClearColor(16777215,.5),C.clear(),He&&je.render(V);let Ke=C.toneMapping;C.toneMapping=Dn;let tt=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),E.setupLightsView(z),re===!0&&Le.setGlobalState(C.clippingPlanes,z),Bo(y,V,z),j.updateMultisampleRenderTarget(ve),j.updateRenderTargetMipmap(ve),et.has("WEBGL_multisampled_render_to_texture")===!1){let Ae=!1;for(let ht=0,Bt=D.length;ht<Bt;ht++){let St=D[ht],{object:vt,geometry:Yt,material:Me,group:nn}=St;if(Me.side===hn&&vt.layers.test(z.layers)){let st=Me.side;Me.side=Jt,Me.needsUpdate=!0,ad(vt,V,z,Yt,Me,nn),Me.side=st,Me.needsUpdate=!0,Ae=!0}}Ae===!0&&(j.updateMultisampleRenderTarget(ve),j.updateRenderTargetMipmap(ve))}C.setRenderTarget(xe,we,Ce),C.setClearColor(ot,Qe),tt!==void 0&&(z.viewport=tt),C.toneMapping=Ke}function Bo(y,D,V){let z=D.isScene===!0?D.overrideMaterial:null;for(let G=0,ve=y.length;G<ve;G++){let Se=y[G],{object:xe,geometry:we,group:Ce}=Se,Ke=Se.material;Ke.allowOverride===!0&&z!==null&&(Ke=z),xe.layers.test(V.layers)&&ad(xe,D,V,we,Ke,Ce)}}function ad(y,D,V,z,G,ve){U!==null&&G.isNodeMaterial&&U.setObject(y,G),y.onBeforeRender(C,D,V,z,G,ve),y.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),G.onBeforeRender(C,D,V,z,y,ve),G.transparent===!0&&G.side===hn&&G.forceSinglePass===!1?(G.side=Jt,G.needsUpdate=!0,C.renderBufferDirect(V,D,z,G,y,ve),G.side=jn,G.needsUpdate=!0,C.renderBufferDirect(V,D,z,G,y,ve),G.side=hn):C.renderBufferDirect(V,D,z,G,y,ve),y.onAfterRender(C,D,V,z,G,ve)}function ko(y,D,V){D.isScene!==!0&&(D=Ne);let z=H.get(y),G=E.state.lights,ve=E.state.shadowsArray,Se=G.state.version,xe=ue.getParameters(y,G.state,ve,D,V,E.state.lightProbeGridArray),we=ue.getProgramCacheKey(xe),Ce=z.programs;z.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?D.environment:null,z.fog=D.fog;let Ke=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;z.envMap=ae.get(y.envMap||z.environment,Ke),z.envMapRotation=z.environment!==null&&y.envMap===null?D.environmentRotation:y.envMapRotation,Ce===void 0&&(y.addEventListener("dispose",kn),Ce=new Map,z.programs=Ce);let tt=Ce.get(we);if(tt!==void 0){if(z.currentProgram===tt&&z.lightsStateVersion===Se)return ld(y,xe),tt}else xe.uniforms=ue.getUniforms(y),U!==null&&y.isNodeMaterial&&U.build(y,V,xe),y.onBeforeCompile(xe,C),tt=ue.acquireProgram(xe,we),Ce.set(we,tt),z.uniforms=xe.uniforms;let Ae=z.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Ae.clippingPlanes=Le.uniform),ld(y,xe),z.needsLights=qm(y),z.lightsStateVersion=Se,z.needsLights&&(Ae.ambientLightColor.value=G.state.ambient,Ae.lightProbe.value=G.state.probe,Ae.sunLights.value=G.state.sun,Ae.sunLightShadows.value=G.state.sunShadow,Ae.directionalLights.value=G.state.directional,Ae.directionalLightShadows.value=G.state.directionalShadow,Ae.spotLights.value=G.state.spot,Ae.spotLightShadows.value=G.state.spotShadow,Ae.rectAreaLights.value=G.state.rectArea,Ae.ltc_1.value=G.state.rectAreaLTC1,Ae.ltc_2.value=G.state.rectAreaLTC2,Ae.pointLights.value=G.state.point,Ae.pointLightShadows.value=G.state.pointShadow,Ae.hemisphereLights.value=G.state.hemi,Ae.sunShadowMatrix.value=G.state.sunShadowMatrix,Ae.sunShadowCascade.value=G.state.sunShadowCascade,Ae.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Ae.spotLightMatrix.value=G.state.spotLightMatrix,Ae.spotLightMap.value=G.state.spotLightMap,Ae.pointShadowMatrix.value=G.state.pointShadowMatrix),z.lightProbeGrid=E.state.lightProbeGridArray.length>0,z.currentProgram=tt,z.uniformsList=null,tt}function cd(y){if(y.uniformsList===null){let D=y.currentProgram.getUniforms();y.uniformsList=cs.seqWithValue(D.seq,y.uniforms)}return y.uniformsList}function ld(y,D){let V=H.get(y);V.outputColorSpace=D.outputColorSpace,V.batching=D.batching,V.batchingColor=D.batchingColor,V.instancing=D.instancing,V.instancingColor=D.instancingColor,V.instancingMorph=D.instancingMorph,V.skinning=D.skinning,V.morphTargets=D.morphTargets,V.morphNormals=D.morphNormals,V.morphColors=D.morphColors,V.morphTargetsCount=D.morphTargetsCount,V.numClippingPlanes=D.numClippingPlanes,V.numIntersection=D.numClipIntersection,V.vertexAlphas=D.vertexAlphas,V.vertexTangents=D.vertexTangents,V.toneMapping=D.toneMapping}function Hm(y,D){if(y.length===0)return null;if(y.length===1)return y[0].texture!==null?y[0]:null;x.setFromMatrixPosition(D.matrixWorld);for(let V=0,z=y.length;V<z;V++){let G=y[V];if(G.texture!==null&&G.boundingBox.containsPoint(x))return G}return null}function Vm(y,D,V,z,G){D.isScene!==!0&&(D=Ne),j.resetTextureUnits();let ve=D.fog,Se=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?D.environment:null,xe=ie===null?C.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:Ye.workingColorSpace,we=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,Ce=ae.get(z.envMap||Se,we),Ke=z.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,tt=!!V.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Ae=!!V.morphAttributes.position,ht=!!V.morphAttributes.normal,Bt=!!V.morphAttributes.color,St=Dn;z.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(St=C.toneMapping);let vt=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Yt=vt!==void 0?vt.length:0,Me=H.get(z),nn=E.state.lights;if(re===!0&&(se===!0||y!==$)){let Mt=y===$&&z.id===X;Le.setState(z,y,Mt)}let st=!1;z.version===Me.__version?(Me.needsLights&&Me.lightsStateVersion!==nn.state.version||Me.outputColorSpace!==xe||G.isBatchedMesh&&Me.batching===!1||!G.isBatchedMesh&&Me.batching===!0||G.isBatchedMesh&&Me.batchingColor===!0&&G._colorsTexture===null||G.isBatchedMesh&&Me.batchingColor===!1&&G._colorsTexture!==null||G.isInstancedMesh&&Me.instancing===!1||!G.isInstancedMesh&&Me.instancing===!0||G.isSkinnedMesh&&Me.skinning===!1||!G.isSkinnedMesh&&Me.skinning===!0||G.isInstancedMesh&&Me.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Me.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Me.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Me.instancingMorph===!1&&G.morphTexture!==null||Me.envMap!==Ce||z.fog===!0&&Me.fog!==ve||Me.numClippingPlanes!==void 0&&(Me.numClippingPlanes!==Le.numPlanes||Me.numIntersection!==Le.numIntersection)||Me.vertexAlphas!==Ke||Me.vertexTangents!==tt||Me.morphTargets!==Ae||Me.morphNormals!==ht||Me.morphColors!==Bt||Me.toneMapping!==St||Me.morphTargetsCount!==Yt||!!Me.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(st=!0):(st=!0,Me.__version=z.version);let _n=Me.currentProgram;st===!0&&(_n=ko(z,D,G),U&&z.isNodeMaterial&&U.onUpdateProgram(z,_n,Me));let zn=!1,pi=!1,gr=!1,gt=_n.getUniforms(),It=Me.uniforms;if(b.useProgram(_n.program)&&(zn=!0,pi=!0,gr=!0),z.id!==X&&(X=z.id,pi=!0),Me.needsLights){let Mt=Hm(E.state.lightProbeGridArray,G);Me.lightProbeGrid!==Mt&&(Me.lightProbeGrid=Mt,pi=!0)}if(zn||$!==y){b.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),gt.setValue(I,"projectionMatrix",y.projectionMatrix),gt.setValue(I,"viewMatrix",y.matrixWorldInverse);let gi=gt.map.cameraPosition;gi!==void 0&&gi.setValue(I,he.setFromMatrixPosition(y.matrixWorld)),A.logarithmicDepthBuffer&&gt.setValue(I,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&gt.setValue(I,"isOrthographic",y.isOrthographicCamera===!0),$!==y&&($=y,pi=!0,gr=!0)}if(Me.needsLights&&(nn.state.sunShadowMap.length>0&&gt.setValue(I,"sunShadowMap",nn.state.sunShadowMap,j),nn.state.directionalShadowMap.length>0&&gt.setValue(I,"directionalShadowMap",nn.state.directionalShadowMap,j),nn.state.spotShadowMap.length>0&&gt.setValue(I,"spotShadowMap",nn.state.spotShadowMap,j),nn.state.pointShadowMap.length>0&&gt.setValue(I,"pointShadowMap",nn.state.pointShadowMap,j)),G.isSkinnedMesh){gt.setOptional(I,G,"bindMatrix"),gt.setOptional(I,G,"bindMatrixInverse");let Mt=G.skeleton;Mt&&(Mt.boneTexture===null&&Mt.computeBoneTexture(),gt.setValue(I,"boneTexture",Mt.boneTexture,j))}G.isBatchedMesh&&(gt.setOptional(I,G,"batchingTexture"),gt.setValue(I,"batchingTexture",G._matricesTexture,j),gt.setOptional(I,G,"batchingIdTexture"),gt.setValue(I,"batchingIdTexture",G._indirectTexture,j),gt.setOptional(I,G,"batchingColorTexture"),G._colorsTexture!==null&&gt.setValue(I,"batchingColorTexture",G._colorsTexture,j));let mi=V.morphAttributes;if((mi.position!==void 0||mi.normal!==void 0||mi.color!==void 0)&&N.update(G,V,_n),(pi||Me.receiveShadow!==G.receiveShadow)&&(Me.receiveShadow=G.receiveShadow,gt.setValue(I,"receiveShadow",G.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&D.environment!==null&&(It.envMapIntensity.value=D.environmentIntensity),It.dfgLUT!==void 0&&(It.dfgLUT.value=dy()),pi){if(gt.setValue(I,"toneMappingExposure",C.toneMappingExposure),Me.needsLights&&Wm(It,gr),ve&&z.fog===!0&&Fe.refreshFogUniforms(It,ve),Fe.refreshMaterialUniforms(It,z,Q,J,E.state.transmissionRenderTarget[y.id]),Me.needsLights&&Me.lightProbeGrid){let Mt=Me.lightProbeGrid;It.probesSH.value=Mt.texture,It.probesMin.value.copy(Mt.boundingBox.min),It.probesMax.value.copy(Mt.boundingBox.max),It.probesResolution.value.copy(Mt.resolution)}cs.upload(I,cd(Me),It,j)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(cs.upload(I,cd(Me),It,j),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&gt.setValue(I,"center",G.center),gt.setValue(I,"modelViewMatrix",G.modelViewMatrix),gt.setValue(I,"normalMatrix",G.normalMatrix),gt.setValue(I,"modelMatrix",G.matrixWorld),z.uniformsGroups!==void 0){let Mt=z.uniformsGroups;for(let gi=0,br=Mt.length;gi<br;gi++){let ud=Mt[gi];ne.update(ud,_n),ne.bind(ud,_n)}}return _n}function Wm(y,D){y.ambientLightColor.needsUpdate=D,y.lightProbe.needsUpdate=D,y.sunLights.needsUpdate=D,y.sunLightShadows.needsUpdate=D,y.directionalLights.needsUpdate=D,y.directionalLightShadows.needsUpdate=D,y.pointLights.needsUpdate=D,y.pointLightShadows.needsUpdate=D,y.spotLights.needsUpdate=D,y.spotLightShadows.needsUpdate=D,y.rectAreaLights.needsUpdate=D,y.hemisphereLights.needsUpdate=D}function qm(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return ie},this.setRenderTargetTextures=function(y,D,V){let z=H.get(y);z.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),H.get(y.texture).__webglTexture=D,H.get(y.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:V,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,D){let V=H.get(y);V.__webglFramebuffer=D,V.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(y,D=0,V=0){ie=y,q=D,W=V;let z=null,G=!1,ve=!1;if(y){let xe=H.get(y);if(xe.__useDefaultFramebuffer!==void 0){b.bindFramebuffer(I.FRAMEBUFFER,xe.__webglFramebuffer),te.copy(y.viewport),Ie.copy(y.scissor),Te=y.scissorTest,b.viewport(te),b.scissor(Ie),b.setScissorTest(Te),X=-1;return}else if(xe.__webglFramebuffer===void 0)j.setupRenderTarget(y);else if(xe.__hasExternalTextures)j.rebindTextures(y,H.get(y.texture).__webglTexture,H.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){let Ke=y.depthTexture;if(xe.__boundDepthTexture!==Ke){if(Ke!==null&&H.has(Ke)&&(y.width!==Ke.image.width||y.height!==Ke.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");j.setupDepthRenderbuffer(y)}}let we=y.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(ve=!0);let Ce=H.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Ce[D])?z=Ce[D][V]:z=Ce[D],G=!0):y.samples>0&&j.useMultisampledRTT(y)===!1?z=H.get(y).__webglMultisampledFramebuffer:Array.isArray(Ce)?z=Ce[V]:z=Ce,te.copy(y.viewport),Ie.copy(y.scissor),Te=y.scissorTest}else te.copy(ye).multiplyScalar(Q).floor(),Ie.copy(Ge).multiplyScalar(Q).floor(),Te=ft;if(V!==0&&(z=B),b.bindFramebuffer(I.FRAMEBUFFER,z)&&b.drawBuffers(y,z),b.viewport(te),b.scissor(Ie),b.setScissorTest(Te),G){let xe=H.get(y.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+D,xe.__webglTexture,V)}else if(ve){let xe=D;for(let we=0;we<y.textures.length;we++){let Ce=H.get(y.textures[we]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+we,Ce.__webglTexture,V,xe)}}else if(y!==null&&V!==0){let xe=H.get(y.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,xe.__webglTexture,V)}X=-1};function hd(y){let D=H.get(y);return(D.__readFormat!==y.format||D.__readType!==y.type)&&(D.__readFormat=y.format,D.__readType=y.type,D.__formatReadable=A.textureFormatReadable(y.format),D.__typeReadable=A.textureTypeReadable(y.type)),D}this.readRenderTargetPixels=function(y,D,V,z,G,ve,Se,xe=0){if(!(y&&y.isWebGLRenderTarget)){Be("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=H.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Se!==void 0&&(we=we[Se]),we){b.bindFramebuffer(I.FRAMEBUFFER,we);try{let Ce=y.textures[xe],Ke=Ce.format,tt=Ce.type;y.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+xe);let Ae=hd(Ce);if(Ae.__formatReadable===!1){Be("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ae.__typeReadable===!1){Be("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=y.width-z&&V>=0&&V<=y.height-G&&I.readPixels(D,V,z,G,pe.convert(Ke),pe.convert(tt),ve)}finally{let Ce=ie!==null?H.get(ie).__webglFramebuffer:null;b.bindFramebuffer(I.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(y,D,V,z,G,ve,Se,xe=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=H.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Se!==void 0&&(we=we[Se]),we)if(D>=0&&D<=y.width-z&&V>=0&&V<=y.height-G){b.bindFramebuffer(I.FRAMEBUFFER,we);let Ce=y.textures[xe],Ke=Ce.format,tt=Ce.type;y.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+xe);let Ae=hd(Ce);if(Ae.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ae.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ht=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,ht),I.bufferData(I.PIXEL_PACK_BUFFER,ve.byteLength,I.STREAM_READ),I.readPixels(D,V,z,G,pe.convert(Ke),pe.convert(tt),0),I.bindBuffer(I.PIXEL_PACK_BUFFER,null);let Bt=ie!==null?H.get(ie).__webglFramebuffer:null;b.bindFramebuffer(I.FRAMEBUFFER,Bt);let St=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Hf(I,St,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,ht),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ve),I.bindBuffer(I.PIXEL_PACK_BUFFER,null),I.deleteBuffer(ht),I.deleteSync(St),ve}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,D=null,V=0){let z=Math.pow(2,-V),G=Math.floor(y.image.width*z),ve=Math.floor(y.image.height*z),Se=D!==null?D.x:0,xe=D!==null?D.y:0;j.setTexture2D(y,0),I.copyTexSubImage2D(I.TEXTURE_2D,V,0,0,Se,xe,G,ve),b.unbindTexture()},this.copyTextureToTexture=function(y,D,V=null,z=null,G=0,ve=0){let Se,xe,we,Ce,Ke,tt,Ae,ht,Bt,St=y.isCompressedTexture?y.mipmaps[ve]:y.image;if(V!==null)Se=V.max.x-V.min.x,xe=V.max.y-V.min.y,we=V.isBox3?V.max.z-V.min.z:1,Ce=V.min.x,Ke=V.min.y,tt=V.isBox3?V.min.z:0;else{let It=Math.pow(2,-G);Se=Math.floor(St.width*It),xe=Math.floor(St.height*It),y.isDataArrayTexture?we=St.depth:y.isData3DTexture?we=Math.floor(St.depth*It):we=1,Ce=0,Ke=0,tt=0}z!==null?(Ae=z.x,ht=z.y,Bt=z.z):(Ae=0,ht=0,Bt=0);let vt=pe.convert(D.format),Yt=pe.convert(D.type),Me;D.isData3DTexture?(j.setTexture3D(D,0),Me=I.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(j.setTexture2DArray(D,0),Me=I.TEXTURE_2D_ARRAY):(j.setTexture2D(D,0),Me=I.TEXTURE_2D),b.activeTexture(I.TEXTURE0),b.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,D.flipY),b.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),b.pixelStorei(I.UNPACK_ALIGNMENT,D.unpackAlignment);let nn=b.getParameter(I.UNPACK_ROW_LENGTH),st=b.getParameter(I.UNPACK_IMAGE_HEIGHT),_n=b.getParameter(I.UNPACK_SKIP_PIXELS),zn=b.getParameter(I.UNPACK_SKIP_ROWS),pi=b.getParameter(I.UNPACK_SKIP_IMAGES);b.pixelStorei(I.UNPACK_ROW_LENGTH,St.width),b.pixelStorei(I.UNPACK_IMAGE_HEIGHT,St.height),b.pixelStorei(I.UNPACK_SKIP_PIXELS,Ce),b.pixelStorei(I.UNPACK_SKIP_ROWS,Ke),b.pixelStorei(I.UNPACK_SKIP_IMAGES,tt);let gr=y.isDataArrayTexture||y.isData3DTexture,gt=D.isDataArrayTexture||D.isData3DTexture;if(y.isDepthTexture){let It=H.get(y),mi=H.get(D),Mt=H.get(It.__renderTarget),gi=H.get(mi.__renderTarget);b.bindFramebuffer(I.READ_FRAMEBUFFER,Mt.__webglFramebuffer),b.bindFramebuffer(I.DRAW_FRAMEBUFFER,gi.__webglFramebuffer);for(let br=0;br<we;br++)gr&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,H.get(y).__webglTexture,G,tt+br),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,H.get(D).__webglTexture,ve,Bt+br)),I.blitFramebuffer(Ce,Ke,Se,xe,Ae,ht,Se,xe,I.DEPTH_BUFFER_BIT,I.NEAREST);b.bindFramebuffer(I.READ_FRAMEBUFFER,null),b.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(G!==0||y.isRenderTargetTexture||H.has(y)){let It=H.get(y),mi=H.get(D);b.bindFramebuffer(I.READ_FRAMEBUFFER,L),b.bindFramebuffer(I.DRAW_FRAMEBUFFER,k);for(let Mt=0;Mt<we;Mt++)gr?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,It.__webglTexture,G,tt+Mt):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,It.__webglTexture,G),gt?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,mi.__webglTexture,ve,Bt+Mt):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,mi.__webglTexture,ve),G!==0?I.blitFramebuffer(Ce,Ke,Se,xe,Ae,ht,Se,xe,I.COLOR_BUFFER_BIT,I.NEAREST):gt?I.copyTexSubImage3D(Me,ve,Ae,ht,Bt+Mt,Ce,Ke,Se,xe):I.copyTexSubImage2D(Me,ve,Ae,ht,Ce,Ke,Se,xe);b.bindFramebuffer(I.READ_FRAMEBUFFER,null),b.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else gt?y.isDataTexture||y.isData3DTexture?I.texSubImage3D(Me,ve,Ae,ht,Bt,Se,xe,we,vt,Yt,St.data):D.isCompressedArrayTexture?I.compressedTexSubImage3D(Me,ve,Ae,ht,Bt,Se,xe,we,vt,St.data):I.texSubImage3D(Me,ve,Ae,ht,Bt,Se,xe,we,vt,Yt,St):y.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,ve,Ae,ht,Se,xe,vt,Yt,St.data):y.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,ve,Ae,ht,St.width,St.height,vt,St.data):I.texSubImage2D(I.TEXTURE_2D,ve,Ae,ht,Se,xe,vt,Yt,St);b.pixelStorei(I.UNPACK_ROW_LENGTH,nn),b.pixelStorei(I.UNPACK_IMAGE_HEIGHT,st),b.pixelStorei(I.UNPACK_SKIP_PIXELS,_n),b.pixelStorei(I.UNPACK_SKIP_ROWS,zn),b.pixelStorei(I.UNPACK_SKIP_IMAGES,pi),ve===0&&D.generateMipmaps&&I.generateMipmap(Me),b.unbindTexture()},this.initRenderTarget=function(y){H.get(y).__webglFramebuffer===void 0&&j.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?j.setTextureCube(y,0):y.isData3DTexture?j.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?j.setTexture2DArray(y,0):j.setTexture2D(y,0),b.unbindTexture()},this.resetState=function(){q=0,W=0,ie=null,b.reset(),_e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return In}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ye._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ye._getUnpackColorSpace()}};function iu(i,e){if(e===Ah)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===ss||e===yo){let t=i.getIndex();if(t===null){let s=[],o=i.getAttribute("position");if(o!==void 0){for(let a=0;a<o.count;a++)s.push(a);i.setIndex(s),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,r=[];if(e===ss)for(let s=1;s<=n;s++)r.push(t.getX(0)),r.push(t.getX(s)),r.push(t.getX(s+1));else for(let s=0;s<n;s++)s%2===0?(r.push(t.getX(s)),r.push(t.getX(s+1)),r.push(t.getX(s+2))):(r.push(t.getX(s+2)),r.push(t.getX(s+1)),r.push(t.getX(s)));return r.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),i.setIndex(r),i.clearGroups(),i}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}function Tp(i){let e=new Map,t=new Map,n=i.clone();return wp(i,n,function(r,s){e.set(s,r),t.set(r,s)}),n.traverse(function(r){if(!r.isSkinnedMesh)return;let s=r,o=e.get(r),a=o.skeleton.bones;s.skeleton=o.skeleton.clone(),s.bindMatrix.copy(o.bindMatrix),s.skeleton.bones=a.map(function(c){return t.get(c)}),s.bind(s.skeleton,s.bindMatrix)}),n}function wp(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)wp(i.children[n],e.children[n],t)}var Jc=class extends Xn{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new hu(t)}),this.register(function(t){return new uu(t)}),this.register(function(t){return new _u(t)}),this.register(function(t){return new yu(t)}),this.register(function(t){return new Mu(t)}),this.register(function(t){return new fu(t)}),this.register(function(t){return new pu(t)}),this.register(function(t){return new mu(t)}),this.register(function(t){return new gu(t)}),this.register(function(t){return new lu(t)}),this.register(function(t){return new bu(t)}),this.register(function(t){return new du(t)}),this.register(function(t){return new vu(t)}),this.register(function(t){return new xu(t)}),this.register(function(t){return new au(t)}),this.register(function(t){return new Yc(t,$e.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Yc(t,$e.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new Su(t)})}load(e,t,n,r){let s=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let l=di.extractUrlBase(e);o=di.resolveURL(l,this.path)}else o=di.extractUrlBase(e);this.manager.itemStart(e);let a=function(l){r?r(l):console.error(l),s.manager.itemError(e),s.manager.itemEnd(e)},c=new Zr(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{s.parse(l,o,function(h){t(h),s.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let s,o={},a={},c=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Ip){try{o[$e.KHR_BINARY_GLTF]=new Eu(e)}catch(u){r&&r(u);return}s=JSON.parse(o[$e.KHR_BINARY_GLTF].content)}else s=JSON.parse(c.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new Iu(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){let u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case $e.KHR_MATERIALS_UNLIT:o[u]=new cu;break;case $e.KHR_DRACO_MESH_COMPRESSION:o[u]=new Tu(s,this.dracoLoader);break;case $e.KHR_TEXTURE_TRANSFORM:o[u]=new wu;break;case $e.KHR_MESH_QUANTIZATION:o[u]=new Au;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,r)}parseAsync(e,t){let n=this;return new Promise(function(r,s){n.parse(e,t,r,s)})}};function fy(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}function Ut(i,e,t){let n=i.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var $e={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},au=class{constructor(e){this.parser=e,this.name=$e.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){let s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,r=t.cache.get(n);if(r)return r;let s=t.json,c=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e],l,h=new Ee(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],sn);let u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new rr(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new lo(h),l.distance=u;break;case"spot":l=new co(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),Zn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),r=Promise.resolve(l),t.cache.add(n,r),r}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}},cu=class{constructor(){this.name=$e.KHR_MATERIALS_UNLIT}getMaterialType(){return jt}extendParams(e,t,n){let r=[];e.color=new Ee(1,1,1),e.opacity=1;let s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){let o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],sn),e.opacity=o[3]}s.baseColorTexture!==void 0&&r.push(n.assignTexture(e,"map",s.baseColorTexture,wt))}return Promise.all(r)}},lu=class{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=Ut(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},hu=class{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Ut(this.parser,e,this.name)!==null?Nt:null}extendMaterialParams(e,t){let n=Ut(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&r.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(r.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let s=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ce(s,s)}return Promise.all(r)}},uu=class{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Ut(this.parser,e,this.name)!==null?Nt:null}extendMaterialParams(e,t){let n=Ut(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},du=class{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Ut(this.parser,e,this.name)!==null?Nt:null}extendMaterialParams(e,t){let n=Ut(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&r.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(r)}},fu=class{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_SHEEN}getMaterialType(e){return Ut(this.parser,e,this.name)!==null?Nt:null}extendMaterialParams(e,t){let n=Ut(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];if(t.sheenColor=new Ee(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let s=n.sheenColorFactor;t.sheenColor.setRGB(s[0],s[1],s[2],sn)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&r.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,wt)),n.sheenRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(r)}},pu=class{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Ut(this.parser,e,this.name)!==null?Nt:null}extendMaterialParams(e,t){let n=Ut(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&r.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(r)}},mu=class{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_VOLUME}getMaterialType(e){return Ut(this.parser,e,this.name)!==null?Nt:null}extendMaterialParams(e,t){let n=Ut(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let s=n.attenuationColor||[1,1,1];return t.attenuationColor=new Ee().setRGB(s[0],s[1],s[2],sn),Promise.all(r)}},gu=class{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_IOR}getMaterialType(e){return Ut(this.parser,e,this.name)!==null?Nt:null}extendMaterialParams(e,t){let n=Ut(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},bu=class{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Ut(this.parser,e,this.name)!==null?Nt:null}extendMaterialParams(e,t){let n=Ut(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&r.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let s=n.specularColorFactor||[1,1,1];return t.specularColor=new Ee().setRGB(s[0],s[1],s[2],sn),n.specularColorTexture!==void 0&&r.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,wt)),Promise.all(r)}},xu=class{constructor(e){this.parser=e,this.name=$e.EXT_MATERIALS_BUMP}getMaterialType(e){return Ut(this.parser,e,this.name)!==null?Nt:null}extendMaterialParams(e,t){let n=Ut(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&r.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(r)}},vu=class{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Ut(this.parser,e,this.name)!==null?Nt:null}extendMaterialParams(e,t){let n=Ut(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&r.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(r)}},_u=class{constructor(e){this.parser=e,this.name=$e.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;let s=r.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}},yu=class{constructor(e){this.parser=e,this.name=$e.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,r=n.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;let o=s.extensions[t],a=r.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(e,o.source,c)}},Mu=class{constructor(e){this.parser=e,this.name=$e.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,r=n.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;let o=s.extensions[t],a=r.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(e,o.source,c)}},Yc=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let r=n.extensions[this.name],s=this.parser.getDependency("buffer",r.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){let c=r.byteOffset||0,l=r.byteLength||0,h=r.count,u=r.byteStride,d=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,r.mode,r.filter).then(function(f){return f.buffer}):o.ready.then(function(){let f=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(f),h,u,d,r.mode,r.filter),f})})}else return null}},Su=class{constructor(e){this.name=$e.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let r=t.meshes[n.mesh];for(let l of r.primitives)if(l.mode!==Tn.TRIANGLES&&l.mode!==Tn.TRIANGLE_STRIP&&l.mode!==Tn.TRIANGLE_FAN&&l.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],c={};for(let l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{let h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,f=[];for(let g of u){let _=new Ve,m=new P,p=new Ht,M=new P(1,1,1),T=new $i(g.geometry,g.material,d);for(let S=0;S<d;S++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,S),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,S),c.SCALE&&M.fromBufferAttribute(c.SCALE,S),T.setMatrixAt(S,_.compose(m,p,M));let x=null;for(let S in c)if(S==="_COLOR_0"){let E=c[S];T.instanceColor=new ai(E.array,E.itemSize,E.normalized)}else if(S!=="TRANSLATION"&&S!=="ROTATION"&&S!=="SCALE"){if(x===null){let R=T.geometry;x=new Tt,x.name=R.name;for(let v in R.attributes)x.setAttribute(v,R.attributes[v]);for(let v in R.morphAttributes)x.morphAttributes[v]=R.morphAttributes[v];R.index!==null&&x.setIndex(R.index),x.morphTargetsRelative=R.morphTargetsRelative;for(let v of R.groups)x.addGroup(v.start,v.count,v.materialIndex);R.boundingBox!==null&&(x.boundingBox=R.boundingBox.clone()),R.boundingSphere!==null&&(x.boundingSphere=R.boundingSphere.clone()),x.drawRange.start=R.drawRange.start,x.drawRange.count=R.drawRange.count,x.userData=Object.assign({},R.userData),T.geometry=x}let E=c[S];x.setAttribute(S,new ai(E.array,E.itemSize,E.normalized))}Et.prototype.copy.call(T,g),this.parser.assignFinalMaterial(T),f.push(T)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}},Ip="glTF",Ao=12,Ap={JSON:1313821514,BIN:5130562},Eu=class{constructor(e){this.name=$e.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Ao),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Ip)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let r=this.header.length-Ao,s=new DataView(e,Ao),o=0;for(;o<r;){let a=s.getUint32(o,!0);o+=4;let c=s.getUint32(o,!0);if(o+=4,c===Ap.JSON){let l=new Uint8Array(e,Ao+o,a);this.content=n.decode(l)}else if(c===Ap.BIN){let l=Ao+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Tu=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=$e.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,r=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(let h in o){let u=Cu[h]||h.toLowerCase();a[u]=o[h]}for(let h in e.attributes){let u=Cu[h]||h.toLowerCase();if(o[h]!==void 0){let d=n.accessors[e.attributes[h]],f=hs[d.componentType];l[u]=f.name,c[u]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,d){r.decodeDracoFile(h,function(f){for(let g in f.attributes){let _=f.attributes[g],m=c[g];m!==void 0&&(_.normalized=m)}u(f)},a,l,sn,d)})})}},wu=class{constructor(){this.name=$e.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let n=Math.cos(e.rotation),r=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*r,e.offset.x,-e.repeat.x*r,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},Au=class{constructor(){this.name=$e.KHR_MESH_QUANTIZATION}},Zc=class extends Wn{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r*3+r;for(let o=0;o!==r;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=r-t,u=(n-t)/h,d=u*u,f=d*u,g=e*l,_=g-l,m=-2*f+3*d,p=f-d,M=1-m,T=p-d+u;for(let x=0;x!==a;x++){let S=o[_+x+a],E=o[_+x+c]*h,R=o[g+x+a],v=o[g+x]*h;s[x]=M*S+T*E+m*R+p*v}return s}},py=new Ht,Ru=class extends Zc{interpolate_(e,t,n,r){let s=super.interpolate_(e,t,n,r);return py.fromArray(s).normalize().toArray(s),s}},Tn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},hs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Rp={9728:Lt,9729:Dt,9984:$a,9985:ns,9986:cr,9987:Nn},Cp={33071:Mn,33648:Dr,10497:Ei},ru={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Cu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ui={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},my={CUBICSPLINE:void 0,LINEAR:Yi,STEP:Ji},su={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function gy(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new Pt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:jn})),i.DefaultMaterial}function ur(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Zn(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function by(i,e,t){let n=!1,r=!1,s=!1;for(let l=0,h=e.length;l<h;l++){let u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(r=!0),u.COLOR_0!==void 0&&(s=!0),n&&r&&s)break}if(!n&&!r&&!s)return Promise.resolve(i);let o=[],a=[],c=[];for(let l=0,h=e.length;l<h;l++){let u=e[l];if(n){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;o.push(d)}if(r){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;a.push(d)}if(s){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;c.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){let h=l[0],u=l[1],d=l[2];return n&&(i.morphAttributes.position=h),r&&(i.morphAttributes.normal=u),s&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function xy(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,r=t.length;n<r;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function vy(i){let e,t=i.extensions&&i.extensions[$e.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+ou(t.attributes):e=i.indices+":"+ou(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,r=i.targets.length;n<r;n++)e+=":"+ou(i.targets[n]);return e}function ou(i){let e="",t=Object.keys(i).sort();for(let n=0,r=t.length;n<r;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Pu(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function _y(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var yy=new Ve,Iu=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new fy,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=-1,s=!1,o=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let c=a.match(/Version\/(\d+)/);r=n&&c?parseInt(c[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&r<17||s&&o<98?this.textureLoader=new so(this.options.manager):this.textureLoader=new ho(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Zr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,r=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][r.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:r.asset,parser:n,userData:{}};return ur(s,a,r),Zn(a,r),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(let c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let r=0,s=t.length;r<s;r++){let o=t[r].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let r=0,s=e.length;r<s;r++){let o=e[r];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let r=n.clone(),s=(o,a)=>{let c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(let[l,h]of o.children.entries())s(h,a.children[l])};return s(n,r),r.name+="_instance_"+e.uses[t]++,r}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let r=e(t[n]);if(r)return r}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let r=0;r<t.length;r++){let s=e(t[r]);s&&n.push(s)}return n}getDependency(e,t){let n=e+":"+t,r=this.cache.get(n);if(!r){switch(e){case"scene":r=this.loadScene(t);break;case"node":r=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":r=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":r=this.loadAccessor(t);break;case"bufferView":r=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":r=this.loadBuffer(t);break;case"material":r=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":r=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":r=this.loadSkin(t);break;case"animation":r=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!r)throw new Error("Unknown type: "+e);break}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,r=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(r.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[$e.KHR_BINARY_GLTF].body);let r=this.options;return new Promise(function(s,o){n.load(di.resolveURL(t.uri,r.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let r=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+r)})}loadAccessor(e){let t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){let o=ru[r.type],a=hs[r.componentType],c=r.normalized===!0,l=new a(r.count*o);return Promise.resolve(new Ft(l,o,c))}let s=[];return r.bufferView!==void 0?s.push(this.getDependency("bufferView",r.bufferView)):s.push(null),r.sparse!==void 0&&(s.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(s).then(function(o){let a=o[0],c=ru[r.type],l=hs[r.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=r.byteOffset||0,f=r.bufferView!==void 0?n.bufferViews[r.bufferView].byteStride:void 0,g=r.normalized===!0,_,m;if(f&&f!==u){let p=Math.floor(d/f),M="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+p+":"+r.count,T=t.cache.get(M);T||(_=new l(a,p*f,r.count*f/h),T=new Gr(_,f/h),t.cache.add(M,T)),m=new Hr(T,c,d%f/h,g)}else a===null?_=new l(r.count*c):_=new l(a,d,r.count*c),m=new Ft(_,c,g);if(r.sparse!==void 0){let p=ru.SCALAR,M=hs[r.sparse.indices.componentType],T=r.sparse.indices.byteOffset||0,x=r.sparse.values.byteOffset||0,S=new M(o[1],T,r.sparse.count*p),E=new l(o[2],x,r.sparse.count*c);a!==null&&(m=new Ft(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let R=0,v=S.length;R<v;R++){let w=S[R];if(m.setX(w,E[R*c]),c>=2&&m.setY(w,E[R*c+1]),c>=3&&m.setZ(w,E[R*c+2]),c>=4&&m.setW(w,E[R*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){let t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s],a=this.textureLoader;if(o.uri){let c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){let r=this,s=this.json,o=s.textures[e],a=s.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);let d=(s.samplers||{})[o.sampler]||{};return h.magFilter=Rp[d.magFilter]||Dt,h.minFilter=Rp[d.minFilter]||Nn,h.wrapS=Cp[d.wrapS]||Ei,h.wrapT=Cp[d.wrapT]||Ei,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Lt&&h.minFilter!==Dt,r.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,r=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let o=r.images[e],a=self.URL||self.webkitURL,c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(u){l=!0;let d=new Blob([u],{type:o.mimeType});return c=a.createObjectURL(d),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(c).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){let m=new Vt(_);m.needsUpdate=!0,d(m)}),t.load(di.resolveURL(u,s.path),g,void 0,f)})}).then(function(u){return l===!0&&a.revokeObjectURL(c),Zn(u,o),u.userData.mimeType=o.mimeType||_y(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,r){let s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[$e.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[$e.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=s.associations.get(o);o=s.extensions[$e.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,c)}}return r!==void 0&&(o.colorSpace=r),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,r=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new wi,on.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Xr,on.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(r||s||o){let a="ClonedMaterial:"+n.uuid+":";r&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),s&&(c.vertexColors=!0),o&&(c.flatShading=!0),r&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Pt}loadMaterial(e){let t=this,n=this.json,r=this.extensions,s=n.materials[e],o,a={},c=s.extensions||{},l=[];if(c[$e.KHR_MATERIALS_UNLIT]){let u=r[$e.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),l.push(u.extendParams(a,s,t))}else{let u=s.pbrMetallicRoughness||{};if(a.color=new Ee(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],sn),a.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",u.baseColorTexture,wt)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=hn);let h=s.alphaMode||su.OPAQUE;if(h===su.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===su.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==jt&&(l.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new ce(1,1),s.normalTexture.scale!==void 0)){let u=s.normalTexture.scale;a.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&o!==jt&&(l.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==jt){let u=s.emissiveFactor;a.emissive=new Ee().setRGB(u[0],u[1],u[2],sn)}return s.emissiveTexture!==void 0&&o!==jt&&l.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,wt)),Promise.all(l).then(function(){let u=new o(a);return s.name&&(u.name=s.name),Zn(u,s),t.associations.set(u,{materials:e}),s.extensions&&ur(r,u,s),u})}createUniqueName(e){let t=bt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,r=this.primitiveCache;function s(a){return n[$e.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return Pp(c,a,t)})}let o=[];for(let a=0,c=e.length;a<c;a++){let l=e[a],h=vy(l),u=r[h];if(u)o.push(u.promise);else{let d;l.extensions&&l.extensions[$e.KHR_DRACO_MESH_COMPRESSION]?d=s(l):d=Pp(new Tt,l,t),l.mode===Tn.TRIANGLE_STRIP?d=d.then(f=>iu(f,yo)):l.mode===Tn.TRIANGLE_FAN&&(d=d.then(f=>iu(f,ss))),r[h]={primitive:l,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,r=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let c=0,l=o.length;c<l;c++){let h=o[c].material===void 0?gy(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(async function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let f=0,g=h.length;f<g;f++){let _=h[f],m=o[f],p,M=l[f];if(m.mode===Tn.TRIANGLES||m.mode===Tn.TRIANGLE_STRIP||m.mode===Tn.TRIANGLE_FAN||m.mode===void 0){let T=s.isSkinnedMesh===!0,x=_.hasAttribute("skinIndex")&&_.hasAttribute("skinWeight");T&&x===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),p=T&&x?new zs(_,M):new ze(_,M),p.isSkinnedMesh===!0&&p.normalizeSkinWeights()}else if(m.mode===Tn.LINES)p=new Hs(_,M);else if(m.mode===Tn.LINE_STRIP)p=new Qi(_,M);else if(m.mode===Tn.LINE_LOOP)p=new Vs(_,M);else if(m.mode===Tn.POINTS)p=new er(_,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&xy(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),Zn(p,s),m.extensions&&ur(r,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return s.extensions&&ur(r,u[0],s),u[0];let d=new ut;s.extensions&&ur(r,d,s),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t,n=this.json.cameras[e],r=n[n.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new zt(So.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type==="orthographic"&&(t=new Fi(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Zn(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let r=0,s=t.joints.length;r<s;r++)n.push(this._loadNodeShallow(t.joints[r]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(r){let s=r.pop(),o=r,a=[],c=[];for(let l=0,h=o.length;l<h;l++){let u=o[l];if(u){a.push(u);let d=new Ve;s!==null&&d.fromArray(s.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Gs(a,c)})}loadAnimation(e){let t=this.json,n=this,r=t.animations[e],s=r.name?r.name:"animation_"+e,o=[],a=[],c=[],l=[],h=[];for(let u=0,d=r.channels.length;u<d;u++){let f=r.channels[u],g=r.samplers[f.sampler],_=f.target,m=_.node,p=r.parameters!==void 0?r.parameters[g.input]:g.input,M=r.parameters!==void 0?r.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",M)),l.push(g),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){let d=u[0],f=u[1],g=u[2],_=u[3],m=u[4],p=[];for(let T=0,x=d.length;T<x;T++){let S=d[T],E=f[T],R=g[T],v=_[T],w=m[T];if(S===void 0)continue;S.updateMatrix&&S.updateMatrix();let C=n._createAnimationTracks(S,E,R,v,w);if(C)for(let F=0;F<C.length;F++)p.push(C[F])}let M=new Ii(s,void 0,p);return Zn(M,r),M})}createNodeMesh(e){let t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency("mesh",r.mesh).then(function(s){let o=n._getNodeRef(n.meshCache,r.mesh,s);return r.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=r.weights.length;c<l;c++)a.morphTargetInfluences[c]=r.weights[c]}),o})}loadNode(e){let t=this.json,n=this,r=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=r.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));let c=r.skin===void 0?Promise.resolve(null):n.getDependency("skin",r.skin);return Promise.all([s,Promise.all(o),c]).then(function(l){let h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,yy)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);if(h.userData.pivot!==void 0&&u.length>0){let f=h.userData.pivot,g=u[0];h.pivot=new P().fromArray(f),h.position.x-=f[0],h.position.y-=f[1],h.position.z-=f[2],g.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let s=t.nodes[e],o=s.name?r.createUniqueName(s.name):"",a=[],c=r._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),s.camera!==void 0&&a.push(r.getDependency("camera",s.camera).then(function(l){return r._getNodeRef(r.cameraCache,s.camera,l)})),r._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let h;if(s.isBone===!0?h=new Vr:l.length>1?h=new ut:l.length===1?h=l[0]:h=new Et,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(s.name&&(h.userData.name=s.name,h.name=o),Zn(h,s),s.extensions&&ur(n,h,s),s.matrix!==void 0){let u=new Ve;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);if(!r.associations.has(h))r.associations.set(h,{});else if(s.mesh!==void 0&&r.meshCache.refs[s.mesh]>1){let u=r.associations.get(h);r.associations.set(h,{...u})}return r.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],r=this,s=new ut;n.name&&(s.name=r.createUniqueName(n.name)),Zn(s,n),n.extensions&&ur(t,s,n);let o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(r.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,u=c.length;h<u;h++){let d=c[h];d.parent!==null?s.add(Tp(d)):s.add(d)}let l=h=>{let u=new Map;for(let[d,f]of r.associations)(d instanceof on||d instanceof Vt)&&u.set(d,f);return h.traverse(d=>{let f=r.associations.get(d);f!=null&&u.set(d,f)}),u};return r.associations=l(s),s})}_createAnimationTracks(e,t,n,r,s){let o=[],a=e.name?e.name:e.uuid,c=[];function l(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}Ui[s.path]===Ui.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(a);let h;switch(Ui[s.path]){case Ui.weights:h=li;break;case Ui.rotation:h=qn;break;case Ui.translation:case Ui.scale:h=ui;break;default:switch(n.itemSize){case 1:h=li;break;case 2:case 3:default:h=ui;break}break}let u=r.interpolation!==void 0?my[r.interpolation]:Yi,d=this._getArrayFromAccessor(n);for(let f=0,g=c.length;f<g;f++){let _=new h(c[f]+"."+Ui[s.path],t.array,d,u);r.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),o.push(_)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Pu(t.constructor),r=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)r[s]=t[s]*n;t=r}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let r=this instanceof qn?Ru:Zc;return new r(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function My(i,e,t){let n=e.attributes,r=new Kt;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(r.set(new P(c[0],c[1],c[2]),new P(l[0],l[1],l[2])),a.normalized){let h=Pu(hs[a.componentType]);r.min.multiplyScalar(h),r.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let s=e.targets;if(s!==void 0){let a=new P,c=new P;for(let l=0,h=s.length;l<h;l++){let u=s[l];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){let _=Pu(hs[d.componentType]);c.multiplyScalar(_)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(a)}i.boundingBox=r;let o=new cn;r.getCenter(o.center),o.radius=r.min.distanceTo(r.max)/2,i.boundingSphere=o}function Pp(i,e,t){let n=e.attributes,r=[];function s(o,a){return t.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(let o in n){let a=Cu[o]||o.toLowerCase();a in i.attributes||r.push(s(n[o],a))}if(e.indices!==void 0&&!i.index){let o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});r.push(o)}return Ye.workingColorSpace!==sn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ye.workingColorSpace}" not supported.`),Zn(i,e),My(i,e,t),Promise.all(r).then(function(){return e.targets!==void 0?by(i,e.targets,t):i})}var Fp=(function(){var i="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuixkbeeeddddillviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WboY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbrl79IV9Rbwq:VZkdbk:XYi5ud9:du8Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaicefhxcj;abad9Uc;WFbGcjdadca0EhmaialfgPar9Rgoadfhsavaoadz:jjjjbgzceVhHcbhOdndninaeaO9nmeaPax9RaD6mdamaeaO9RaOamfgoae6EgAcsfglc9WGhCabaOad2fhXaAcethQaxaDfhiaOaeaoaeao6E9RhLalcl4cifcd4hKazcj;cbfaAfhYcbh8AazcjdfhEaHh3incbh5dnawTmbaxa8Acd4fRbbh5kcbh8Eazcj;cbfhqinaih8Fdndndndna5a8Ecet4ciGgoc9:fPdebdkaPa8F9RaA6mrazcj;cbfa8EaA2fa8FaAz:jjjjb8Aa8FaAfhixdkazcj;cbfa8EaA2fcbaAz:kjjjb8Aa8FhixekaPa8F9RaK6mva8FaKfhidnaCTmbaPai9RcK6mbaocdtc:q:G:cjbfcj:G:cjbawEhaczhrcbhlinargoc9Wfghaqfhrdndndndndndnaaa8Fahco4fRbbalcoG4ciGcdtfydbPDbedvivvvlvkar9cb83bwar9cb83bbxlkarcbaiRbdai8Xbb9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbaqaofgrcGfcbaicdfa8J9c8N1:NfghRbbag9cjjjjjw:dg8J9qE86bbarcVfcbaha8J9c8M1:NfghRbbag9cjjjjjl:dg8J9qE86bbarc7fcbaha8J9c8L1:NfghRbbag9cjjjjjd:dg8J9qE86bbarctfcbaha8J9c8K1:NfghRbbag9cjjjjje:dg8J9qE86bbarc91fcbaha8J9c8J1:NfghRbbag9cjjjj;ab:dg8J9qE86bbarc4fcbaha8J9cg1:NfghRbbag9cjjjja:dg8J9qE86bbarc93fcbaha8J9ch1:NfghRbbag9cjjjjz:dgg9qE86bbarc94fcbahag9ca1:NfghRbbai8Xbe9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbarc95fcbaha8J9c8N1:NfgiRbbag9cjjjjjw:dg8J9qE86bbarc96fcbaia8J9c8M1:NfgiRbbag9cjjjjjl:dg8J9qE86bbarc97fcbaia8J9c8L1:NfgiRbbag9cjjjjjd:dg8J9qE86bbarc98fcbaia8J9c8K1:NfgiRbbag9cjjjjje:dg8J9qE86bbarc99fcbaia8J9c8J1:NfgiRbbag9cjjjj;ab:dg8J9qE86bbarc9:fcbaia8J9cg1:NfgiRbbag9cjjjja:dg8J9qE86bbarcufcbaia8J9ch1:NfgiRbbag9cjjjjz:dgg9qE86bbaiag9ca1:NfhixikaraiRblaiRbbghco4g8Ka8KciSg8KE86bbaqaofgrcGfaiclfa8Kfg8KRbbahcl4ciGg8La8LciSg8LE86bbarcVfa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc7fa8Ka8Lfg8KRbbahciGghahciSghE86bbarctfa8Kahfg8KRbbaiRbeghco4g8La8LciSg8LE86bbarc91fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc4fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc93fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc94fa8Kahfg8KRbbaiRbdghco4g8La8LciSg8LE86bbarc95fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc96fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc97fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc98fa8KahfghRbbaiRbigico4g8Ka8KciSg8KE86bbarc99faha8KfghRbbaicl4ciGg8Ka8KciSg8KE86bbarc9:faha8KfghRbbaicd4ciGg8Ka8KciSg8KE86bbarcufaha8KfgrRbbaiciGgiaiciSgiE86bbaraifhixdkaraiRbwaiRbbghcl4g8Ka8KcsSg8KE86bbaqaofgrcGfaicwfa8Kfg8KRbbahcsGghahcsSghE86bbarcVfa8KahfghRbbaiRbeg8Kcl4g8La8LcsSg8LE86bbarc7faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarctfaha8KfghRbbaiRbdg8Kcl4g8La8LcsSg8LE86bbarc91faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc4faha8KfghRbbaiRbig8Kcl4g8La8LcsSg8LE86bbarc93faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc94faha8KfghRbbaiRblg8Kcl4g8La8LcsSg8LE86bbarc95faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc96faha8KfghRbbaiRbvg8Kcl4g8La8LcsSg8LE86bbarc97faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc98faha8KfghRbbaiRbog8Kcl4g8La8LcsSg8LE86bbarc99faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc9:faha8KfghRbbaiRbrgicl4g8Ka8KcsSg8KE86bbarcufaha8KfgrRbbaicsGgiaicsSgiE86bbaraifhixekarai8Pbw83bwarai8Pbb83bbaiczfhikdnaoaC9pmbalcdfhlaoczfhraPai9RcL0mekkaoaC6moaimexokaCmva8FTmvkaqaAfhqa8Ecefg8Ecl9hmbkdndndndnawTmbasa8Acd4fRbbgociGPlbedrbkaATmdaza8Afh8Fazcj;cbfhhcbh8EaEhaina8FRbbhraahocbhlinaoahalfRbbgqce4cbaqceG9R7arfgr86bbaoadfhoaAalcefgl9hmbkaacefhaa8Fcefh8FahaAfhha8Ecefg8Ecl9hmbxikkaATmeaza8Afhaazcj;cbfhhcbhoceh8EaYh8FinaEaofhlaa8Vbbhrcbhoinala8FaofRbbcwtahaofRbbgqVc;:FiGce4cbaqceG9R7arfgr87bbaladfhlaLaocefgofmbka8FaQfh8FcdhoaacdfhaahaQfhha8EceGhlcbh8EalmbxdkkaATmbaocl4h8Eaza8AfRbbhqcwhoa3hlinalRbbaotaqVhqalcefhlaocwfgoca9hmbkcbhhaEh8FaYhainazcj;cbfahfRbbhrcwhoaahlinalRbbaotarVhralaAfhlaocwfgoca9hmbkara8E94aq7hqcbhoa8Fhlinalaqao486bbalcefhlaocwfgoca9hmbka8Fadfh8FaacefhaahcefghaA9hmbkkaEclfhEa3clfh3a8Aclfg8Aad6mbkaXazcjdfaAad2z:jjjjb8AazazcjdfaAcufad2fadz:jjjjb8AaAaOfhOaihxaimbkc9:hoxdkcbc99aPax9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaok:ysezu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:kjjjb8Aav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbavaiaqaDcsGfRbbgscl4gP9RcsGcdtfydbaxcefgOaPEhDavaias9RcsGcdtfydbaOaPTgzfgOascsGgPEhsaPThPdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiazfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaPfhiaOaPfhxxekaxcbalRbbgsEgHaDc;:eSgDfhOascsGhAdndnascl4gCmbaOcefhzxekaOhzavaiaC9RcsGcdtfydbhOkdndnaAmbazcefhxxekazhxavaias9RcsGcdtfydbhzkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhHascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaHhDxekaDcefhDkasce4cbasceG9R7amfgmhHkdndnaCcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhOaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkaOhsxekascefhskaPce4cbaPceG9R7amfgmhOkdndnaAcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhzaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkazhlxekalcefhlkaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabarcetfgDaH87ebaDclfaz87ebaDcdfaO87ebxekabarcdtfgDaHBdbaDcwfazBdbaDclfaOBdbkavc;abfaocitfgDaOBdbaDaHBdlavaicdtfaHBdbavc;abfaocefcsGcitfgDazBdbaDaOBdlavaicefgicsGcdtfaOBdbavc;abfaocdfcsGcitfgDaHBdbaDazBdlavaiaCTaCcsSVfgicsGcdtfazBdbaiaATaAcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk:4ioiue99dud99dud99dnaeTmbcbhiabhlindndnal8Uebgv:YgoJ:ji:1Salcof8UebgrciVgw:Y:vgDNJbbbZJbbb:;avcu9kEMgq:lJbbb9p9DTmbaq:Ohkxekcjjjj94hkkalclf8Uebhvalcdf8UebhxalarcefciGcetfak87ebdndnax:YgqaDNJbbbZJbbb:;axcu9kEMgm:lJbbb9p9DTmbam:Ohxxekcjjjj94hxkabaiarciGgkfcd7cetfax87ebdndnav:YgmaDNJbbbZJbbb:;avcu9kEMgP:lJbbb9p9DTmbaP:Ohvxekcjjjj94hvkalarcufciGcetfav87ebdndnawaw2:ZgPaPMaoaoN:taqaqN:tamamN:tgoJbbbbaoJbbbb9GE:raDNJbbbZMgD:lJbbb9p9DTmbaD:Ohrxekcjjjj94hrkalakcetfar87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk:Tvirud99eudndnadcl9hmbaeTmeindndnabRbbgiabcefgl8Sbbgvabcdfgo8Sbbgrf9R:YJbbuJabcifgwRbbgdce4adVgDcd4aDVgDcl4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax86bbdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao86bbdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai86bbdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad86bbabclfhbaecufgembxdkkaeTmbindndnab8Vebgiabcdfgl8Uebgvabclfgo8Uebgrf9R:YJbFu9habcofgw8Vebgdce4adVgDcd4aDVgDcl4aDVgDcw4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax87ebdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao87ebdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai87ebdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad87ebabcwfhbaecufgembkkk9teiucbcbyd:K:G:cjbgeabcifc98GfgbBd:K:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkk83dbcj:Gdk8Kbbbbdbbblbbbwbbbbbbbebbbdbbblbbbwbbbbc:K:Gdkl8W:qbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuixkbbebeeddddilve9Weeeviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WbwY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbDl79IV9Rbqq:W9Dklbzik94evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaeai86b:q:W:cjbaecitab8Piw83i:q:G:cjbaecefgecjd9hmbkk:JBl8Aud97dur978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaialfgxar9RhodnadTgmmbavaoad;8qbbkaicefhPcj;abad9Uc;WFbGcjdadca0EhsdndndnadTmbaoadfhzcbhHinaeaH9nmdaxaP9RaD6miabaHad2fhOaPaDfhAasaeaH9RaHasfae6EgCcsfgocl4cifcd4hXavcj;cbfaoc9WGgQcetfhLavcj;cbfaQci2fhKavcj;cbfaQfhYcbh8Aaoc;ab6hEincbh3dnawTmbaPa8Acd4fRbbh3kcbh5avcj;cbfh8Eindndndndna3a5cet4ciGgoc9:fPdebdkaxaA9RaQ6mwdnaQTmbavcj;cbfa5aQ2faAaQ;8qbbkaAaCfhAxdkaQTmeavcj;cbfa5aQ2fcbaQ;8kbxekaxaA9RaX6moaoclVcbawEhraAaXfhocbhidnaEmbaxao9Rc;Gb6mbcbhlina8EalfhidndndndndndnaAalco4fRbbgqciGarfPDbedibledibkaipxbbbbbbbbbbbbbbbbpklbxlkaiaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaiaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaiaopbbbpklbaoczfhoxekaiaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqcd4ciGarfPDbedibledibkaiczfpxbbbbbbbbbbbbbbbbpklbxlkaiczfaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaiczfaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaiczfaopbbbpklbaoczfhoxekaiczfaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqcl4ciGarfPDbedibledibkaicafpxbbbbbbbbbbbbbbbbpklbxlkaicafaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaicafaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaicafaopbbbpklbaoczfhoxekaicafaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqco4arfPDbedibledibkaic8Wfpxbbbbbbbbbbbbbbbbpklbxlkaic8Wfaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbaiaoclffaqRb:q:W:cjbfhoxikaic8Wfaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbaiaocwffaqRb:q:W:cjbfhoxdkaic8Wfaopbbbpklbaoczfhoxekaic8WfaopbbdaoRbbgicitpbi:q:G:cjbaiRb:q:W:cjbgipsaoRbegqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbaiaocdffaqRb:q:W:cjbfhokalc;abfhialcjefaQ0meaihlaxao9Rc;Fb0mbkkdnaiaQ9pmbaici4hlinaxao9RcK6mwa8EaifhqdndndndndndnaAaico4fRbbalcoG4ciGarfPDbedibledibkaqpxbbbbbbbbbbbbbbbbpkbbxlkaqaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spkbbahaoclffagRb:q:W:cjbfhoxikaqaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spkbbahaocwffagRb:q:W:cjbfhoxdkaqaopbbbpkbbaoczfhoxekaqaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpkbbahaocdffagRb:q:W:cjbfhokalcdfhlaiczfgiaQ6mbkkaohAaoTmoka8EaQfh8Ea5cefg5cl9hmbkdndndndnawTmbaza8Acd4fRbbglciGPlbedwbkaQTmdavcjdfa8Afhlava8Afpbdbh8Jcbhoinalavcj;cbfaofpblbg8KaYaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaLaofpblbg8NaKaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLg8Fcep9Ta8Fpxeeeeeeeeeeeeeeeegap9op9Hp9rg8Fa8Jp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ma8PpmwDKYqk8AExm35Ps8E8Fg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ka8LpmwDKYqk8AExm35Ps8E8Fg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ugap9Abbbaladfglaaa8Fa8Fpmlvorlvorlvorlvorp9Ugap9Abbbaladfglaaa8Fa8FpmwDqkwDqkwDqkwDqkp9Ugap9Abbbaladfglaaa8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9AbbbaladfhlaoczfgoaQ6mbxikkaQTmeavcjdfa8Afhlava8Afpbdbh8Jcbhoinalavcj;cbfaofpblbg8KaYaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaLaofpblbg8NaKaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLg8Fcep:nea8Fpxebebebebebebebebgap9op:bep9rg8Fa8Jp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ma8PpmwDKYqk8AExm35Ps8E8Fg8Fcep:nea8Faap9op:bep9rg8Fp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLg8Fcep:nea8Faap9op:bep9rg8Fp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ka8LpmwDKYqk8AExm35Ps8E8Fg8Fcep:nea8Faap9op:bep9rg8Fp:oegap9Abbbaladfglaaa8Fa8Fpmlvorlvorlvorlvorp:oegap9Abbbaladfglaaa8Fa8FpmwDqkwDqkwDqkwDqkp:oegap9Abbbaladfglaaa8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9AbbbaladfhlaoczfgoaQ6mbxdkkaQTmbcbhocbalcl4gl9Rc8FGhiavcjdfa8Afhrava8Afpbdbhainaravcj;cbfaofpblbg8JaYaofpblbg8KpmbzeHdOiAlCvXoQrLg8LaLaofpblbg8MaKaofpblbg8NpmbzeHdOiAlCvXoQrLgypmbezHdiOAlvCXorQLg8Faip:Rea8Falp:Tep9qg8Faap9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8LaypmwDKYqk8AExm35Ps8E8Fg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8Ja8KpmwKDYq8AkEx3m5P8Es8Fg8Ja8Ma8NpmwKDYq8AkEx3m5P8Es8Fg8KpmbezHdiOAlvCXorQLg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8Ja8KpmwDKYqk8AExm35Ps8E8Fg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9AbbbaradfhraoczfgoaQ6mbkka8Aclfg8Aad6mbkdnaCad2goTmbaOavcjdfao;8qbbkdnammbavavcjdfaCcufad2fad;8qbbkaCaHfhHc9:hoaAhPaAmbxlkkaeTmbaDalfhrcbhocuhlinaralaD9RglfaD6mdasaeao9Raoasfae6Eaofgoae6mbkaial9RhPkcbc99axaP9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaokwbz:bjjjbkNsezu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbavaiaqaDcsGfRbbgscl4gP9RcsGcdtfydbaxcefgOaPEhDavaias9RcsGcdtfydbaOaPTgzfgOascsGgPEhsaPThPdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiazfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaPfhiaOaPfhxxekaxcbalRbbgsEgHaDc;:eSgDfhOascsGhAdndnascl4gCmbaOcefhzxekaOhzavaiaC9RcsGcdtfydbhOkdndnaAmbazcefhxxekazhxavaias9RcsGcdtfydbhzkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhHascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaHhDxekaDcefhDkasce4cbasceG9R7amfgmhHkdndnaCcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhOaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkaOhsxekascefhskaPce4cbaPceG9R7amfgmhOkdndnaAcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhzaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkazhlxekalcefhlkaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabarcetfgDaH87ebaDclfaz87ebaDcdfaO87ebxekabarcdtfgDaHBdbaDcwfazBdbaDclfaOBdbkavc;abfaocitfgDaOBdbaDaHBdlavaicdtfaHBdbavc;abfaocefcsGcitfgDazBdbaDaOBdlavaicefgicsGcdtfaOBdbavc;abfaocdfcsGcitfgDaHBdbaDazBdlavaiaCTaCcsSVfgicsGcdtfazBdbaiaATaAcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk;Toio97eue97aec98Ghedndnadcl9hmbaeTmecbhdinababpbbbgicKp:RecKp:Sep;6eglaicwp:RecKp:Sep;6ealp;Geaiczp:RecKp:Sep;6egvp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgwp9op9rp;Keglpxbb;:9cbb;:9cbb;:9cbb;:9calalp;Meaoaop;Meavaravawp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFbbbFbbbFbbbFbbbp9oaipxbbbFbbbFbbbFbbbFp9op9qalavp;Mearp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaoavp;Mearp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgDaDpbbbgipxbbbbbbFFbbbbbbFFgwp9oabpbbbgoaipmbediwDqkzHOAKY8AEgvczp:Reczp:Sep;6eglaoaipmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eavczp:Sep;6egvp;Gealp;Gep;Kep;Legipxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgqp9op9rp;Keglpxb;:FSb;:FSb;:FSb;:FSalalp;Meaiaip;Meavaravaqp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbp9oaiavp;Mearp;Keczp:Rep9qgialavp;Mearp;KepxFFbbFFbbFFbbFFbbp9oglpmwDKYqk8AExm35Ps8E8Fp9qpkbbabaoawp9oaialpmbezHdiOAlvCXorQLp9qpkbbabcafhbadclfgdae6mbkkk;2ileue97euo97dnaec98GgiTmbcbheinabcKfpx:ji:1S:ji:1S:ji:1S:ji:1SabpbbbglabczfgvpbbbgopmlvorxmPsCXQL358E8Fgrczp:Segwpxibbbibbbibbbibbbp9qp;6egDp;NegqaDaDp;MegDaDp;KealaopmbediwDqkzHOAKY8AEgDczp:Reczp:Sep;6eglalp;MeaDczp:Sep;6egoaop;Mearczp:Reczp:Sep;6egrarp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jep;Mepxbbn0bbn0bbn0bbn0gDp;KepxFFbbFFbbFFbbFFbbgkp9oaqaop;MeaDp;Keczp:Rep9qgoaqalp;MeaDp;Keakp9oaqarp;MeaDp;Keczp:Rep9qgDpmwDKYqk8AExm35Ps8E8Fglp5eawclp:RegqpEi:T:j83ibavalp5baqpEd:T:j83ibabcwfaoaDpmbezHdiOAlvCXorQLgDp5eaqpEe:T:j83ibabaDp5baqpEb:T:j83ibabcafhbaeclfgeai6mbkkkuee97dnadcd4ae2c98GgeTmbcbhdinababpbbbgicwp:Recwp:Sep;6eaicep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbabczfhbadclfgdae6mbkkk:Sodw97euaec98Ghedndnadcl9hmbaeTmecbhdinabpxbbuJbbuJbbuJbbuJabpbbbgicKp:TeglaicYp:Tep9qgvcdp:Teavp9qgvclp:Teavp9qgop;6ep;Negvaicwp:RecKp:SegraipxFbbbFbbbFbbbFbbbgwp9ogDp:Uep;6ep;Mepxbbn0bbn0bbn0bbn0gqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9oavaDarp:Xeaiczp:RecKp:Segip:Uep;6ep;Meaqp;Keawp9op9qavaDaraip:Uep:Xep;6ep;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qavaoalcep:Rep9oalpxebbbebbbebbbebbbp9op9qp;6ep;Meaqp;KecKp:Rep9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgkpxbFu9hbFu9hbFu9hbFu9habpbbbglakpbbbgrpmlvorxmPsCXQL358E8Fgvczp:TegqavcHp:Tep9qgicdp:Teaip9qgiclp:Teaip9qgicwp:Teaip9qgop;6ep;NegialarpmbediwDqkzHOAKY8AEgDpxFFbbFFbbFFbbFFbbglp9ograDczp:Segwp:Ueavczp:Reczp:SegDp:Xep;6ep;Mepxbbn0bbn0bbn0bbn0gvp;Kealp9oaiarawaDp:Uep:Xep;6ep;Meavp;Keczp:Rep9qgwaiaoaqcep:Rep9oaqpxebbbebbbebbbebbbp9op9qp;6ep;Meavp;Keczp:ReaiaDarp:Uep;6ep;Meavp;Kealp9op9qgipmwDKYqk8AExm35Ps8E8FpkbbabawaipmbezHdiOAlvCXorQLpkbbabcafhbadclfgdae6mbkkk9teiucbcbydj:G:cjbgeabcifc98GfgbBdj:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkxebcj:Gdklz:zbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),n=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var r=WebAssembly.validate(t)?a(e):a(i),s,o=WebAssembly.instantiate(r,{}).then(function(p){s=p.instance,s.exports.__wasm_call_ctors()});function a(p){for(var M=new Uint8Array(p.length),T=0;T<p.length;++T){var x=p.charCodeAt(T);M[T]=x>96?x-97:x>64?x-39:x+4}for(var S=0,T=0;T<p.length;++T)M[S++]=M[T]<60?n[M[T]]:(M[T]-60)*64+M[++T];return M.buffer.slice(0,S)}function c(p,M,T,x,S,E,R){var v=p.exports.sbrk,w=x+3&-4,C=v(w*S),F=v(E.length),U=new Uint8Array(p.exports.memory.buffer);U.set(E,F);var B=M(C,x,S,F,E.length);if(B==0&&R&&R(C,w,S),T.set(U.subarray(C,C+x*S)),v(C-v(0)),B!=0)throw new Error("Malformed buffer data: "+B)}var l={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp",COLOR:"meshopt_decodeFilterColor"},h={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},u=[],d=0;function f(p){var M={object:new Worker(p),pending:0,requests:{}};return M.object.onmessage=function(T){var x=T.data;M.pending-=x.count,M.requests[x.id][x.action](x.value),delete M.requests[x.id]},M}function g(p){for(var M="self.ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(r)+"]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = "+m.name+";"+c.toString()+m.toString(),T=new Blob([M],{type:"text/javascript"}),x=URL.createObjectURL(T),S=u.length;S<p;++S)u[S]=f(x);for(var S=p;S<u.length;++S)u[S].object.postMessage({});u.length=p,URL.revokeObjectURL(x)}function _(p,M,T,x,S){for(var E=u[0],R=1;R<u.length;++R)u[R].pending<E.pending&&(E=u[R]);return new Promise(function(v,w){var C=new Uint8Array(T),F=++d;E.pending+=p,E.requests[F]={resolve:v,reject:w},E.object.postMessage({id:F,count:p,size:M,source:C,mode:x,filter:S},[C.buffer])})}function m(p){var M=p.data;self.ready.then(function(T){if(!M.id)return self.close();try{var x=new Uint8Array(M.count*M.size);c(T,T.exports[M.mode],x,M.count,M.size,M.source,T.exports[M.filter]),self.postMessage({id:M.id,count:M.count,action:"resolve",value:x},[x.buffer])}catch(S){self.postMessage({id:M.id,count:M.count,action:"reject",value:S})}})}return{ready:o,supported:!0,useWorkers:function(p){g(p)},decodeVertexBuffer:function(p,M,T,x,S){c(s,s.exports.meshopt_decodeVertexBuffer,p,M,T,x,s.exports[l[S]])},decodeIndexBuffer:function(p,M,T,x){c(s,s.exports.meshopt_decodeIndexBuffer,p,M,T,x)},decodeIndexSequence:function(p,M,T,x){c(s,s.exports.meshopt_decodeIndexSequence,p,M,T,x)},decodeGltfBuffer:function(p,M,T,x,S,E){c(s,s.exports[h[S]],p,M,T,x,s.exports[l[E]])},decodeGltfBufferAsync:function(p,M,T,x,S){return u.length>0?_(p,M,T,h[x],l[S]):o.then(function(){var E=new Uint8Array(p*M);return c(s,s.exports[h[x]],E,p,M,T,s.exports[l[S]]),E})}}})();var us=i=>(i%360+540)%360-180;function Fu(i,e){let t=i.aneis[e.dono],n=i.aneis[e.alvo];return Math.atan2(t.y-n.y,t.x-n.x)*180/Math.PI}function $c(i){var r,s;let e={};for(let[o,a]of Object.entries(i.aneis))e[o]={...a,rot:a.rot??0,fora:!1};let t=i.travas.map((o,a)=>({...o,i:a,ativa:!0,ang:Fu(i,o)})),n={};for(let o of i.travas)(n[r=o.dono]??(n[r]=new Set)).add(o.alvo),(n[s=o.alvo]??(n[s]=new Set)).add(o.dono);return{fase:i,aneis:e,travas:t,viz:n,giros:0,venceu:!1}}var Lu=i=>Object.entries(i.aneis).filter(([,e])=>!e.fechado);function Up(i,e){return i.travas.filter(t=>t.ativa&&(t.dono===e||t.alvo===e))}function Lp(i,e){let t=i.aneis[e];return!t||t.fechado||t.fora||t.congelado?!1:!i.travas.some(n=>n.ativa&&n.dono===e)}function Du(i,e){let t=i.aneis[e]&&i.aneis[e].gemeo;return t&&i.aneis[t]&&!i.aneis[t].fora?t:null}function ds(i,e){let t=Du(i,e);return Lp(i,e)&&(!t||Lp(i,t))}function Op(i,e){let t=Du(i,e);return i.travas.filter(n=>n.ativa&&(n.dono===e||t&&n.dono===t))}function Dp(i,e){return Math.abs(us(e-i.rot))<=i.gap/2-9}function Bp(i,e){let t=!0;for(;t;){t=!1;for(let[n,r]of Object.entries(i.aneis))if(!(r.fechado||r.fora)&&Up(i,n).length===0){r.fora=!0,t=!0,e.push({tipo:"saiu",id:n});for(let s of i.travas)s.ativa&&(s.dono===n||s.alvo===n)&&(s.ativa=!1)}}kp(i,e),!i.venceu&&Lu(i).every(([,n])=>n.fora)&&(i.venceu=!0,e.push({tipo:"venceu"}))}function kp(i,e){for(let[t,n]of Object.entries(i.aneis))if(!(!n.congelado||n.fora)){for(let r of i.viz[t]||[])if(i.aneis[r].fora){n.congelado=!1,e.push({tipo:"degelou",id:t});break}}}function Nu(i,e,t){let n=[];if(!ds(i,e))return n;let r=i.aneis[e],s=Du(i,e),o=s&&i.aneis[s],a=t-r.rot,c=Math.max(1,Math.ceil(Math.abs(a)/2));for(let l=1;l<=c;l++){r.rot=r.rot+a/c,o&&!o.fora&&(o.rot=o.rot-a/c);for(let h of i.travas)h.ativa&&h.alvo===e&&Dp(r,h.ang)&&(h.ativa=!1,n.push({tipo:"escapou",trava:h.i,id:e})),o&&!o.fora&&h.ativa&&h.alvo===s&&Dp(o,h.ang)&&(h.ativa=!1,n.push({tipo:"escapou",trava:h.i,id:s}));if(Bp(i,n),r.fora)break}return n}function Np(i){let e=$c(i),t=[];return Bp(e,t),t.filter(n=>n.tipo==="saiu").map(n=>n.id)}function Qc(i){let e=structuredClone(i);for(let[t,n]of Object.entries(e.aneis)){if(n.fechado)continue;let r=[];for(let c of e.travas)if(c.alvo===t&&r.push(Fu(e,c)),c.dono===t){let l=e.aneis[c.alvo];r.push(Math.atan2(l.y-n.y,l.x-n.x)*180/Math.PI)}let s=c=>r.every(l=>Math.abs(us(l-c))>=n.gap/2+28),o=n.rot??0,a=null;for(let c=0;c<=24&&a===null;c++)for(let l of[1,-1]){let h=o+l*c*7.5;if(s(h)){a=h;break}}n.rot=us(a??o)}return e}function el(i){for(let n of i.travas){if(i.aneis[n.alvo].fechado)return{ok:!1,motivo:`trava ${n.dono}->${n.alvo}: alvo fechado nunca solta`};if(n.dono===n.alvo)return{ok:!1,motivo:"trava em si mesmo"}}if(Np(i).length)return{ok:!1,motivo:"anel solto no in\xEDcio: "+Np(i).join(",")};for(let n of i.travas){let r=i.aneis[n.alvo];if(Math.abs(us(Fu(i,n)-(r.rot??0)))<=r.gap/2+12)return{ok:!1,motivo:`abertura de ${n.alvo} come\xE7a em cima da trava de ${n.dono}`}}let e=$c(i),t=[];for(let n=0;n<200&&!e.venceu;n++){let r=Object.keys(e.aneis).find(s=>ds(e,s)&&e.travas.some(o=>o.ativa&&o.alvo===s));if(!r)return{ok:!1,motivo:"travado: nenhum anel pode girar",restantes:Lu(e).filter(([,s])=>!s.fora).map(([s])=>s)};t.push(r),Nu(e,r,e.aneis[r].rot+360)}return e.venceu?{ok:!0,minimo:t.length,ordem:t}:{ok:!1,motivo:"n\xE3o terminou"}}function zp(i,e){return i<=e?3:i<=e+2?2:1}function Gp(i){return Object.keys(i.aneis).find(e=>ds(i,e)&&i.travas.some(t=>t.ativa&&t.alvo===e))||null}function Hp(i,e){let t=i.aneis[e],n=[];if(!t||t.fechado||t.fora)return n;for(let s of i.travas)s.ativa&&(s.dono===e||s.alvo===e)&&(s.ativa=!1,n.push({tipo:"escapou",trava:s.i,id:e}));t.fora=!0,n.push({tipo:"saiu",id:e});let r=!0;for(;r;){r=!1;for(let[s,o]of Object.entries(i.aneis))o.fechado||o.fora||Up(i,s).length||(o.fora=!0,r=!0,n.push({tipo:"saiu",id:s}))}return kp(i,n),!i.venceu&&Lu(i).every(([,s])=>s.fora)&&(i.venceu=!0,n.push({tipo:"venceu"})),n}var tl=3;var tn=1,dr=.17,jp={coral:"#FF6B6B",ambar:"#FFB547",menta:"#3FCFB4",azul:"#4E8CF5",roxo:"#A774F2",lima:"#82D84E",tronco:"#B98A5A"},fs=Math.PI/180,Uu={};function Kp(i){return Uu[i]??(Uu[i]=new Nt({color:i,roughness:.28,clearcoat:1,clearcoatRoughness:.18,sheen:.3,sheenColor:new Ee("#ffffff"),emissive:"#000000"}))}var Jp=new gn(dr,24,16),nl={};function Sy(i){return nl[i]??(nl[i]=new bn(tn,dr,28,140,Math.PI*2-i*fs))}function Ey(i,e){let t=new ut,n=e*fs,r=Math.PI*2-n,s=new ze(Sy(e),Kp(i).clone());s.rotation.z=n/2,t.add(s);for(let a of[n/2,n/2+r]){let c=new ze(Jp,s.material);c.position.set(Math.cos(a)*tn,Math.sin(a)*tn,0),t.add(c)}let o=new ze(new bn(tn,dr*3.2,8,48),new jt({visible:!1}));return t.add(o),t.traverse(a=>{a.isMesh&&a.material.visible!==!1&&(a.castShadow=!0)}),{g:t,mat:s.material,toque:o}}function Ty(){let i=new ut,e=new ze(new bn(tn,dr*1.12,28,140),Kp(jp.tronco).clone());e.castShadow=!0,i.add(e);let t=new ze(new Ci(tn*.82,tn*.82,.12,48),new Pt({color:"#C8925A",roughness:.9}));t.rotation.x=Math.PI/2,t.position.z=-.08,i.add(t);for(let n=1;n<=3;n++){let r=new ze(new bn(tn*.2*n,.018,6,48),new Pt({color:"#A8713F",roughness:1}));r.position.z=-.01,i.add(r)}return{g:i,mat:e.material,toque:e}}function wy(i,e,t){let n=new ut,r=new P().subVectors(e,i).normalize(),s=i.clone().addScaledVector(r,tn),o=e.clone().addScaledVector(r,-tn),a=new ze(new Ci(.1,.1,s.distanceTo(o)+.1,16),t);a.position.copy(s).lerp(o,.5),a.quaternion.setFromUnitVectors(new P(0,1,0),r),n.add(a);let c=new P(-r.y,r.x,0),l=new ut;l.position.copy(o),l.quaternion.setFromUnitVectors(new P(0,1,0),c),l.add(new ze(new Ci(.29,.29,.34,28),t));let h=new ze(new bn(.29,.035,8,28),new Pt({color:"#ffffff",roughness:.3}));return h.rotation.x=Math.PI/2,h.position.y=.175,l.add(h),n.add(l),n.traverse(u=>{u.isMesh&&(u.castShadow=!0)}),{g:n,abraco:l}}var Bu=new Nt({color:"#CFF2FF",roughness:.06,transmission:.35,thickness:.5,transparent:!0,opacity:.62,clearcoat:1,emissive:"#9EE6FF",emissiveIntensity:.12,depthWrite:!1}),Yp=new bn(tn,dr*2.05,16,72),Zp=new Pi(.1,.42,5);function Ay(){let i=new ut;i.add(new ze(Yp,Bu));for(let e=0;e<9;e++){let t=e/9*Math.PI*2+.3,n=new ze(Zp,Bu);n.position.set(Math.cos(t)*(tn+.28),Math.sin(t)*(tn+.28),.05),n.rotation.z=t-Math.PI/2,i.add(n)}return i}var Ou=new jt({color:"#FFD45E",transparent:!0,opacity:.55,depthWrite:!1}),Vp=new bn(tn*1.36,.04,8,72),Wp=new Nt({color:"#E8F8FF",roughness:.05,transmission:.6,thickness:.2,clearcoat:1}),qp=new gn(dr*.55,14,10),il=class{constructor(e,t,n,r={}){this.camera=t,this.dom=n,this.ao=r,this.raiz=new ut,this.raiz.position.set(.4,-.77,0),e.add(this.raiz),this.conteudo=new ut,this.raiz.add(this.conteudo),this.anims=[],this.ray=new uo,this.plano=new pn(new P(0,0,1),0),this.arrasto=null,this.travado=!1,n.addEventListener("pointerdown",s=>this.desce(s)),addEventListener("pointermove",s=>this.move(s)),addEventListener("pointerup",s=>this.sobe(s)),addEventListener("pointercancel",s=>this.sobe(s))}monta(e){let t=new Set([Jp,...Object.values(nl),Yp,Zp,Vp,qp]);this.conteudo.traverse(l=>{l.isMesh&&(t.has(l.geometry)||l.geometry.dispose(),l.material&&l.material.dispose&&![Bu,Ou,Wp].includes(l.material)&&l.material.dispose())}),this.conteudo.clear(),this.anims.length=0,this.arrasto=null,this.piscando=!1,this.modoMira=!1,this.estado=$c(e),this.aneis={},this.travas=[];let n=Object.values(e.aneis).map(l=>l.x),r=Object.values(e.aneis).map(l=>l.y),s=Math.max(...n)-Math.min(...n)+2.8,o=Math.max(...r)-Math.min(...r)+2.8,a=Math.min(1.08,11.2/s,8.4/o);this.conteudo.scale.setScalar(a),this.conteudo.position.set(-(Math.max(...n)+Math.min(...n))/2*a,-(Math.max(...r)+Math.min(...r))/2*a+1.05,0);for(let[l,h]of Object.entries(this.estado.aneis)){let u=h.fechado?Ty():Ey(jp[h.cor]||h.cor,h.gap);if(u.g.position.set(h.x,h.y,0),u.g.rotation.z=(h.rot||0)*fs,u.toque.userData.anel=l,u.g.userData.anel=l,h.congelado&&(u.gelo=Ay(),u.g.add(u.gelo)),h.gemeo&&(u.miragem=new ze(Vp,Ou),u.g.add(u.miragem)),h.agua)for(let d=0;d<4;d++){let f=new ze(qp,Wp),g=(40+d*75)*fs;f.position.set(Math.cos(g)*tn,Math.sin(g)*tn,dr*.75),u.g.add(f)}this.conteudo.add(u.g),this.aneis[l]={...u,base:new P(h.x,h.y,0)}}this.conteudo.updateMatrixWorld(!0);for(let l of this.estado.travas){let h=this.aneis[l.dono],u=this.aneis[l.alvo],d=wy(h.base,u.base,h.mat);this.conteudo.add(d.g),this.conteudo.updateMatrixWorld(!0),h.g.attach(d.g),this.travas[l.i]=d}let c=0;for(let l of Object.values(this.aneis))l.g.scale.setScalar(.001),this.anima(.45,h=>l.g.scale.setScalar(Ry(h)),c++*.06)}anima(e,t,n=0,r){this.anims.push({t:-n,dur:e,fn:t,fim:r})}atualiza(e){this.t=(this.t||0)+e,Ou.opacity=.35+.25*Math.sin(this.t*3);for(let t=this.anims.length-1;t>=0;t--){let n=this.anims[t];if(n.t+=e,n.t<0)continue;let r=Math.min(1,n.t/n.dur);n.fn(r),r>=1&&(this.anims.splice(t,1),n.fim&&n.fim())}}pega(e){let t=this.dom.getBoundingClientRect(),n=new ce((e.clientX-t.left)/t.width*2-1,-((e.clientY-t.top)/t.height)*2+1);this.ray.setFromCamera(n,this.camera);let r=Object.values(this.aneis).filter(o=>o.g.parent===this.conteudo&&!this.estado.aneis[o.g.userData.anel].fora).map(o=>o.toque),s=this.ray.intersectObjects(r,!1)[0];return s?s.object.userData.anel:null}anguloNoAnel(e,t){let n=this.dom.getBoundingClientRect();this.ray.setFromCamera(new ce((e.clientX-n.left)/n.width*2-1,-((e.clientY-n.top)/n.height)*2+1),this.camera);let r=new P;if(this.plano.constant=-this.raiz.position.z,!this.ray.ray.intersectPlane(this.plano,r))return null;this.conteudo.worldToLocal(r);let s=this.aneis[t].base;return Math.atan2(r.y-s.y,r.x-s.x)/fs}desce(e){if(this.travado||this.pausado||!this.estado||this.estado.venceu)return;let t=this.pega(e);if(!t)return;if(this.modoMira){if(this.estado.aneis[t].fechado){this.preso(t);return}this.modoMira=!1,this.estado.giros++,this.contaGiro(),this.ao.mira&&this.ao.mira(t);for(let r of Hp(this.estado,t))this.evento(r);return}if(!ds(this.estado,t)){this.preso(t);return}let n=this.anguloNoAnel(e,t);if(!this.arrasto){try{this.dom.setPointerCapture(e.pointerId)}catch{}this.arrasto={ptr:e.pointerId,id:t,ang0:n,angAnt:n,acum:0,rot0:this.estado.aneis[t].rot,x:e.clientX,y:e.clientY,moveu:!1},this.ao.toque&&this.ao.toque(t)}}move(e){let t=this.arrasto;if(!t||e.pointerId!==t.ptr||this.estado.aneis[t.id].fora)return;if(e.pointerType==="mouse"&&e.buttons===0)return this.sobe(e);Math.hypot(e.clientX-t.x,e.clientY-t.y)>6&&(t.moveu=!0);let n=this.anguloNoAnel(e,t.id);n!=null&&(t.acum+=us(n-t.angAnt),t.angAnt=n,!t.contou&&Math.abs(t.acum)>4&&(t.contou=!0,this.estado.giros++,this.contaGiro()),this.giraPara(t.id,t.rot0+t.acum))}sobe(e){let t=this.arrasto;if(!(!t||e&&e.pointerId!==void 0&&e.pointerId!==t.ptr))if(this.arrasto=null,!t.moveu&&!t.contou){this.estado.giros++;let n=this.aneis[t.id],r=n.alvoRot??this.estado.aneis[t.id].rot;n.alvoRot=r-60,n.animGiro&&(n.animGiro.t=n.animGiro.dur),this.anima(.32,s=>this.giraPara(t.id,r-60*Xp(s)),0,()=>{n.alvoRot=void 0,n.animGiro=null}),n.animGiro=this.anims[this.anims.length-1],this.contaGiro()}else!t.contou&&Math.abs(t.acum)>.5&&(this.estado.giros++,this.contaGiro())}giraPara(e,t){let n=this.estado.aneis[e];if(n.fora)return;let r=Math.floor(n.rot/15),s=Nu(this.estado,e,t);Math.floor(n.rot/15)!==r&&!n.fora&&this.ao.tique&&this.ao.tique(),this.sincroniza();for(let o of s)this.evento(o)}sincroniza(){for(let[e,t]of Object.entries(this.aneis)){let n=this.estado.aneis[e];!n.fora&&!n.fechado&&(t.g.rotation.z=n.rot*fs)}}contaGiro(){if(this.ao.giros&&this.ao.giros(this.estado.giros),!this.estado.fase.mare)return;let e=this.estado.giros%tl;if(this.ao.mare&&this.ao.mare(e===0?tl:tl-e,e===0),e!==0)return;let t=this.estado,n=()=>{if(this.estado!==t||t.venceu||this.travado)return;if(this.pausado){setTimeout(n,300);return}let r=Object.keys(t.aneis).filter(s=>t.aneis[s].agua&&ds(t,s)&&!(this.arrasto&&this.arrasto.id===s));this.ao.evento&&this.ao.evento({tipo:"mare",ids:r},this);for(let s of r){let o=0;this.anima(.7,a=>{if(this.estado!==t)return;let c=45*Xp(a);this.giraPara(s,t.aneis[s].rot+c-o),o=c})}};setTimeout(n,380)}preso(e){let t=this.aneis[e],n=t.base.x;this.anima(.38,r=>{t.g.position.x=n+Math.sin(r*Math.PI*6)*.09*(1-r)});for(let r of Op(this.estado,e)){let s=this.travas[r.i];this.anima(.6,o=>s.abraco.scale.setScalar(1+Math.sin(o*Math.PI*3)*.25*(1-o)))}t.mat.emissive.set("#ff3b3b"),this.anima(.5,r=>t.mat.emissiveIntensity=.35*(1-r),0,()=>t.mat.emissive.set("#000000")),this.ao.evento&&this.ao.evento({tipo:"preso",id:e},this)}evento(e){if(e.tipo==="escapou"){let t=this.travas[e.trava];this.anima(.3,n=>t.abraco.scale.setScalar(1+Math.sin(n*Math.PI)*.35))}if(e.tipo==="saiu"&&this.sai(e.id),e.tipo==="degelou"){let t=this.aneis[e.id],n=t&&t.gelo;if(n){t.gelo=null,this.anima(.45,s=>{n.scale.setScalar(1+s*.5),n.children.forEach(o=>{o.position.multiplyScalar(1+s*.04)})},0,()=>{t.g.remove(n)});let r=new P;t.g.getWorldPosition(r),this.ao.estouro&&this.ao.estouro(r,"#CFF2FF")}}this.ao.evento&&this.ao.evento(e,this)}sai(e){let t=this.aneis[e],n=t.g.position.clone(),r=(n.x>=0?1:-1)*(.6+Math.random()*.6),s=t.g.rotation.z,o=new P;this.anima(.55,a=>{t.g.position.set(n.x+r*a*1.4,n.y+Math.sin(a*Math.PI)*1.2+a*.8,n.z+a*2.5),t.g.rotation.z=s+a*4,t.g.scale.setScalar(a<.25?1+a*.8:1.2*(1-(a-.25)/.75)+.001)},0,()=>{t.g.getWorldPosition(o),t.g.visible=!1,this.ao.estouro&&this.ao.estouro(o,t.mat.color)})}destaca(e){let t=this.aneis[e];t&&(t.mat.emissive.set("#ffffff"),this.piscando=!0,this.anima(1.4,n=>t.mat.emissiveIntensity=.45*Math.abs(Math.sin(n*Math.PI*3)),0,()=>{t.mat.emissive.set("#000000"),this.piscando=!1}))}},Xp=i=>i*i*(3-2*i),Ry=i=>{let t=i-1;return 1+(1.7+1)*t*t*t+1.7*t*t};var Oi=-4.6,Cy={floresta:{topo:"#5DB7EC",meio:"#A8DCF5",base:"#FFE9C7",c1:"#8FCB55",c2:"#6DAE3E",clareira:"#D9B77A",ceuLuz:"#CFEAFF",chaoLuz:"#7FA65A",sol:"#FFE7C2",forca:2.3,nuvem:"#FFF4E4"},gelo:{topo:"#5F9FD8",meio:"#BFE1F6",base:"#F3F8FF",c1:"#F5F9FF",c2:"#DCE9F6",clareira:"#CADCEE",ceuLuz:"#E6F3FF",chaoLuz:"#B7CDE3",sol:"#FFFFFF",forca:2,nuvem:"#F4FAFF"},deserto:{topo:"#4C9FE0",meio:"#F3D7A6",base:"#FFE3B3",c1:"#EAC47F",c2:"#DCAE68",clareira:"#F3D9A0",ceuLuz:"#FFEACC",chaoLuz:"#C99A5A",sol:"#FFE3B5",forca:2.6,nuvem:"#FFF1DC"},mar:{topo:"#3A97E6",meio:"#A1D9F6",base:"#E6F6FF",c1:"#F1DCA6",c2:"#E6CC8E",clareira:"#F6E5BB",ceuLuz:"#D8F1FF",chaoLuz:"#E4CF9E",sol:"#FFF1D6",forca:2.4,nuvem:"#FFFFFF"}},sl={floresta:{titulo:"jardim",total:30},gelo:{titulo:"colGelo",total:20},deserto:{titulo:"colDeserto",total:20},mar:{titulo:"colMar",total:20}},rl=class{constructor(e,t){this.scene=e,this.carregar=t,this.atual=null,this.grupos={},this.prontos={},this.molde={},this.altura={},this.colecao={};let n=7;this.rnd=()=>((n=n*16807%2147483647)-1)/2147483646,this.fog=new Us("#FFE9C7",48,150),e.fog=this.fog,this.ceu(),this.luzes(),this.chao(),this.halo(),this.neve=null,this.agua=null,this.t=0}entre(e,t){return e+(t-e)*this.rnd()}ceu(){this.ceuMat=new Qt({side:Jt,depthWrite:!1,fog:!1,uniforms:{topo:{value:new Ee},meio:{value:new Ee},base:{value:new Ee}},vertexShader:"varying vec3 p; void main(){ p = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }",fragmentShader:"uniform vec3 topo, meio, base; varying vec3 p; void main(){ float h = clamp(p.y*1.6+0.05,0.,1.); vec3 c = mix(base, meio, smoothstep(0.,.35,h)); c = mix(c, topo, smoothstep(.35,1.,h)); gl_FragColor = vec4(c,1.); }"}),this.scene.add(new ze(new gn(200,32,16),this.ceuMat)),this.nuvemMat=new Yr({color:"#ffffff",emissive:"#FFF4E4",emissiveIntensity:.55,fog:!1});let e=new gn(1,20,14);this.nuvens=new ut,this.scene.add(this.nuvens);let t=(n,r,s,o)=>{let a=new ut,c=5+Math.floor(this.rnd()*3);for(let l=0;l<c;l++){let h=new ze(e,this.nuvemMat),u=this.entre(.8,1.5);h.scale.set(u*1.25,u,u),h.position.set((l-c/2)*1.15+this.entre(-.3,.3),Math.sin(l/(c-1)*Math.PI)*.9+this.entre(-.2,.2),this.entre(-.4,.4)),a.add(h)}a.position.set(n,r,s),a.scale.setScalar(o),this.nuvens.add(a)};t(-30,17,-70,2.4),t(4,22,-90,3),t(34,15,-75,2.2),t(-58,11,-95,2.8),t(62,20,-100,3.2)}luzes(){this.hemi=new oo("#CFEAFF","#7FA65A",1.25),this.scene.add(this.hemi);let e=this.sol=new rr("#FFE7C2",2.3);e.position.set(-14,22,16),e.castShadow=!0,e.shadow.mapSize.set(2048,2048),Object.assign(e.shadow.camera,{left:-26,right:26,top:20,bottom:-20,near:1,far:80}),e.shadow.bias=-5e-4,e.shadow.normalBias=.03,this.scene.add(e)}altChao(e,t){return Math.sin(e*.18)*Math.cos(t*.21)*.35+(t<-20?(-t-20)*.06:0)}chao(){let e=new Ln(160,120,120,90);e.rotateX(-Math.PI/2);let t=e.attributes.position;for(let n=0;n<t.count;n++)t.setY(n,this.altChao(t.getX(n),t.getZ(n)));e.setAttribute("color",new it(new Float32Array(t.count*3),3)),e.computeVertexNormals(),this.chaoMesh=new ze(e,new Yr({vertexColors:!0})),this.chaoMesh.position.y=Oi,this.chaoMesh.receiveShadow=!0,this.scene.add(this.chaoMesh)}pintaChao(e){let t=this.chaoMesh.geometry,n=t.attributes.position,r=t.attributes.color,s=new Ee(e.c1),o=new Ee(e.c2),a=new Ee(e.clareira),c=new Ee;for(let l=0;l<n.count;l++){let h=n.getX(l),u=n.getZ(l);c.copy(s).lerp(o,.5+.5*Math.sin(h*.7+u*.43)*Math.cos(u*.9)),c.lerp(a,So.smoothstep(7.5,4.5,Math.hypot(h*.55,(u-1)*.9))*.85),r.setXYZ(l,c.r,c.g,c.b)}r.needsUpdate=!0}halo(){let e=document.createElement("canvas");e.width=e.height=256;let t=e.getContext("2d"),n=t.createRadialGradient(128,128,0,128,128,128);n.addColorStop(0,"rgba(255,250,235,.85)"),n.addColorStop(.55,"rgba(255,245,220,.35)"),n.addColorStop(1,"rgba(255,245,220,0)"),t.fillStyle=n,t.fillRect(0,0,256,256);let r=new tr(e);r.colorSpace=wt;let s=new ze(new Ln(15,15),new jt({map:r,transparent:!0,depthWrite:!1,fog:!1}));s.position.set(.4,.3,-1.4),this.scene.add(s)}preparaObj(e){return e.traverse(t=>{if(!t.isMesh)return;t.castShadow=!0,t.receiveShadow=!0;let n=t.material;n&&n.map&&n.transparent&&(n.alphaTest=.45,n.transparent=!1),n&&(n.side=hn)}),e}async pacote(e){if(this.molde[e])return this.molde[e];let t=await this.carregar("a-1d616cb6/models/"+e+".glb"),n={};for(let r of t.scenes)n[r.name]=r;return this.molde[e]=n}poe(e,t,n,r,s,o,a=this.rnd()*Math.PI*2,c){let l=this.molde[t]&&this.molde[t][n];if(!l)return null;let h=this.preparaObj(l.clone(!0)),u=t+"/"+n;if(!this.altura[u]){let d=new Kt().setFromObject(l);this.altura[u]=d.max.y-d.min.y||1}return h.scale.setScalar(o/this.altura[u]),h.position.set(r,Oi+this.altChao(r,s)-.05,s),h.rotation.y=a,c&&c(h),e.add(h),h}nevado(e,t=.74){e.traverse(n=>{if(!n.isMesh)return;let r=n.material.clone();r.onBeforeCompile=s=>{s.fragmentShader=s.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
 diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.93, 0.96, 1.0), ${t.toFixed(2)});`)},r.customProgramCacheKey=()=>"neve"+t,n.material=r})}tinge(e,t){e.traverse(n=>{n.isMesh&&(n.material=n.material.clone(),n.material.color.set(t))})}cristal(e="#9EE6FF"){let t=new ut,n=new Nt({color:e,roughness:.08,transmission:.5,thickness:.6,clearcoat:1,emissive:e,emissiveIntensity:.12});for(let r=0;r<5;r++){let s=.7+this.rnd()*1.3,o=new ze(new Pi(.22+this.rnd()*.12,s,6),n);o.position.set((this.rnd()-.5)*.7,s/2,(this.rnd()-.5)*.7),o.rotation.set((this.rnd()-.5)*.7,this.rnd()*3,(this.rnd()-.5)*.7),o.castShadow=!0,t.add(o)}return t}bonecoNeve(){let e=new ut,t=new Pt({color:"#F7FBFF",roughness:.9});[[.62,.55],[.46,1.38],[.33,2]].forEach(([o,a])=>{let c=new ze(new gn(o,20,14),t);c.position.y=a,c.castShadow=!0,e.add(c)});let n=new ze(new Pi(.07,.36,10),new Pt({color:"#FF8A3D"}));n.rotation.x=Math.PI/2,n.position.set(0,2.02,.42),e.add(n);let r=new Pt({color:"#2B2B33"});for(let o of[-.11,.11]){let a=new ze(new gn(.045,8,6),r);a.position.set(o,2.12,.29),e.add(a)}let s=new ze(new bn(.34,.08,8,20),new Pt({color:"#E8504A"}));return s.rotation.x=Math.PI/2,s.position.y=1.72,e.add(s),e}cacto(e=!1){let t=new ut,n=new Pt({color:"#5FA85A",roughness:.7}),r=(s,o,a,c,l)=>{let h=new ze(new Xs(s,o,6,14),n);return h.position.set(a,c,0),h.rotation.z=l,h.castShadow=!0,t.add(h),h};if(r(.32,1.6,0,1.1,0),this.rnd()<.8&&(r(.2,.6,.45,1.1,-Math.PI/2),r(.2,.5,.72,1.45,0)),this.rnd()<.6&&(r(.18,.5,-.42,.85,Math.PI/2),r(.18,.45,-.66,1.15,0)),e){let s=new ze(new gn(.17,12,8),new Pt({color:"#FF7FB0",emissive:"#FF7FB0",emissiveIntensity:.15}));s.position.set(0,2.25,0),t.add(s)}return t}estrelaMar(e="#FF8A5C"){let t=new Kr;for(let o=0;o<10;o++){let a=o/10*Math.PI*2+Math.PI/2,c=o%2?.22:.55,l=Math.cos(a)*c,h=Math.sin(a)*c;o?t.lineTo(l,h):t.moveTo(l,h)}let n=new no(t,{depth:.12,bevelEnabled:!0,bevelThickness:.06,bevelSize:.06,bevelSegments:2}),r=new ze(n,new Pt({color:e,roughness:.6}));r.rotation.x=-Math.PI/2,r.position.y=.06,r.castShadow=!0;let s=new ut;return s.add(r),s}noChao(e,t,n,r,s=1){return t.position.set(n,Oi+this.altChao(n,r)-.02,r),t.scale.setScalar(s),t.rotation.y=this.rnd()*6.28,e.add(t),t}async monta(e){if(this.prontos[e])return this.grupos[e];this.grupos[e]&&(this.scene.remove(this.grupos[e]),delete this.grupos[e]);let t=this.grupos[e]=new ut;t.visible=!1,this.scene.add(t);let n=(r,s)=>{for(let o=0;o<r;o++){let c=(o%2?1:-1)*this.entre(9.5,34),l=this.entre(-34,-7);Math.abs(c)<13&&l>-16||s(c,l)}};if(e==="floresta"||e==="gelo"){await this.pacote("floresta");let r=["CommonTree_1","CommonTree_2","CommonTree_3","CommonTree_4","CommonTree_5","TwistedTree_1","TwistedTree_2"],s=["Pine_1","Pine_2","Pine_3"];if(e==="floresta"){n(46,(o,a)=>this.poe(t,"floresta",this.rnd()<.3?s[Math.floor(this.rnd()*3)]:r[Math.floor(this.rnd()*r.length)],o,a,this.entre(8,13)));for(let o=0;o<16;o++)this.poe(t,"floresta",s[Math.floor(this.rnd()*3)],this.entre(-40,40),this.entre(-55,-38),this.entre(12,17));this.poe(t,"floresta","CommonTree_2",-14.5,-3.5,11.5,.6),this.poe(t,"floresta","TwistedTree_1",15.5,-4.5,10.5,2.2),this.poe(t,"floresta","CommonTree_4",19,1.5,12,4.1);for(let[o,a,c,l]of[["Bush_Common_Flowers",-10.8,-.5,2.6],["Bush_Common",11.5,.5,2.4],["Bush_Common",-6.5,-6,2.2],["Bush_Common_Flowers",7.8,-6.5,2.1],["Rock_Medium_1",9.6,2.6,1.5],["Rock_Medium_2",-12.5,3.4,1.7],["Rock_Medium_3",4.5,-8.5,1.4],["Fern_1",-9.2,3.2,1.6],["Fern_1",12.8,4.2,1.5],["Mushroom_Common",-7.6,4.6,.6],["Mushroom_Laetiporus",10.5,5.6,.7],["Flower_3_Group",-4.8,5.8,.9],["Flower_4_Group",6.2,6.1,.9],["Flower_3_Group",9,-2.5,.9],["Flower_4_Group",-11.5,6.4,.9],["Plant_1_Big",13.6,-1.5,1.8],["Plant_1_Big",-15.5,-2.5,1.6]])this.poe(t,"floresta",o,a,c,l);for(let o=0;o<70;o++){let a=this.entre(-17,17),c=this.entre(-10,8);Math.hypot(a*.55,(c-1)*.9)<5.2||this.poe(t,"floresta",["Grass_Common_Tall","Grass_Wispy_Tall","Grass_Common_Short","Clover_1"][Math.floor(this.rnd()*4)],a,c,this.entre(.6,1.2))}}else{let o=l=>this.nevado(l);n(44,(l,h)=>this.poe(t,"floresta",this.rnd()<.7?s[Math.floor(this.rnd()*3)]:r[Math.floor(this.rnd()*5)],l,h,this.entre(8,13),void 0,o));for(let l=0;l<18;l++)this.poe(t,"floresta",s[Math.floor(this.rnd()*3)],this.entre(-40,40),this.entre(-55,-38),this.entre(12,17),void 0,o);this.poe(t,"floresta","Pine_2",-14.5,-3.5,11.5,.6,o),this.poe(t,"floresta","Pine_1",15.5,-4.5,10.5,2.2,o),this.poe(t,"floresta","Pine_3",19,1.5,12,4.1,o);for(let[l,h,u,d]of[["Rock_Medium_1",9.6,2.6,1.5],["Rock_Medium_2",-12.5,3.4,1.7],["Rock_Medium_3",4.5,-8.5,1.4]])this.poe(t,"floresta",l,h,u,d,void 0,f=>this.nevado(f,.45));for(let[l,h,u]of[[-10.8,-.5,1.3],[11.5,.6,1.1],[-6.5,-6,1],[7.8,-6.5,1.2],[13,4.5,.9],[-9,3.5,.8]])this.noChao(t,this.cristal(),l,h,u);let a=new Pt({color:"#F6FAFF",roughness:.95});for(let l=0;l<22;l++){let h=this.entre(-18,18),u=this.entre(-12,7);if(Math.hypot(h*.55,(u-1)*.9)<5.6)continue;let d=new ze(new gn(1,16,10),a);d.scale.set(this.entre(.8,1.8),this.entre(.25,.5),this.entre(.8,1.6)),d.receiveShadow=!0,this.noChao(t,d,h,u,1),d.scale.set(this.entre(.8,1.8),this.entre(.25,.5),this.entre(.8,1.6))}let c=new ze(new js(1,48),new Nt({color:"#BDE6FF",roughness:.05,clearcoat:1,transmission:.2}));c.rotation.x=-Math.PI/2,c.scale.set(9,4,1),c.position.set(-2,Oi+.08,-16),c.receiveShadow=!0,t.add(c),this.neveCai(t)}}if(e==="deserto"){await this.pacote("deserto");let r=["DeadTree_1","DeadTree_2","DeadTree_3","DeadTree_4","DeadTree_5"];n(26,(s,o)=>{this.rnd()<.45?this.poe(t,"deserto",r[Math.floor(this.rnd()*5)],s,o,this.entre(6,10)):this.noChao(t,this.cacto(this.rnd()<.3),s,o,this.entre(1.5,2.4))});for(let s=0;s<9;s++)this.poe(t,"deserto",["Rock_Medium_1","Rock_Medium_2","Rock_Medium_3"][s%3],this.entre(-70,70),this.entre(-85,-62),this.entre(5,9),void 0,o=>{this.tinge(o,"#E8A86E"),o.scale.x*=1.8,o.scale.z*=1.4});for(let[s,o,a,c]of[["Rock_Medium_1",9.6,2.6,1.5],["Rock_Medium_2",-12.5,3.4,1.7],["Rock_Medium_3",4.5,-8.5,1.4],["DeadTree_3",-14.5,-3.5,7.5],["DeadTree_1",15.5,-4.5,7]])this.poe(t,"deserto",s,o,a,c,void 0,l=>{/Rock/.test(s)&&this.tinge(l,"#EAB07A")});for(let[s,o,a,c]of[[-10.8,-.5,1.4,!0],[11.5,.6,1.2,!1],[-13.5,-6,1.1,!1],[14,-6.5,1.3,!0],[13,4.5,.9,!1]])this.noChao(t,this.cacto(c),s,o,a)}if(e==="mar"){await this.pacote("mar");let r=["palm-bend","palm-detailed-bend","palm-detailed-straight","palm-straight"];n(22,(o,a)=>{a>-24&&this.poe(t,"mar",r[Math.floor(this.rnd()*4)],o,a,this.entre(8,12))}),this.poe(t,"mar","palm-detailed-bend",-14.5,-3.5,11,.6),this.poe(t,"mar","palm-bend",15.5,-4.5,10.5,2.4),this.poe(t,"mar","palm-straight",19,1.5,12,4.1);for(let[o,a,c,l]of[["rocks-sand-a",9.6,2.6,1.3],["rocks-sand-b",-12.5,3.4,1.5],["rocks-sand-c",4.5,-8.5,1.2],["chest",11.8,.4,.9],["barrel",-10.6,-.8,1.2],["boat-row-small",-7,-7.5,1.4],["patch-sand-foliage",13,4.5,.8],["grass-plant",-9,3.5,1.2],["structure-platform-dock",8,-14,3.5]])this.poe(t,"mar",o,a,c,l);this.agua=new Qt({transparent:!0,fog:!0,uniforms:zc.merge([me.fog,{t:{value:0}}]),vertexShader:`#include <fog_pars_vertex>
uniform float t; varying vec2 vu; void main(){ vu = position.xy; vec3 p = position; p.z += sin(p.x*0.15+t)*0.25+cos(p.y*0.2+t*0.8)*0.2; vec4 mvPosition = modelViewMatrix*vec4(p,1.); gl_Position = projectionMatrix*mvPosition; 
#include <fog_vertex>
}`,fragmentShader:`#include <fog_pars_fragment>
uniform float t; varying vec2 vu; void main(){ float o = sin(vu.x*0.3+t*1.3)*sin(vu.y*0.4-t)*0.5+0.5; vec3 fundo = mix(vec3(0.16,0.55,0.86), vec3(0.32,0.78,0.92), smoothstep(-40.,0.,vu.y)); vec3 c = fundo + o*0.08 + step(0.93, o)*0.18; gl_FragColor = vec4(c, 0.96);
#include <fog_fragment>
}`});let s=new ze(new Ln(260,90,120,40),this.agua);s.rotation.x=-Math.PI/2,s.position.set(0,Oi+.35,-62),t.add(s),this.poe(t,"mar","ship-pirate-medium",26,-70,9,-.6),this.poe(t,"mar","ship-wreck",-34,-40,4,1.2)}return this.prontos[e]=!0,t}neveCai(e){let n=new Float32Array(2100);for(let s=0;s<700;s++)n[s*3]=this.entre(-40,40),n[s*3+1]=this.entre(-5,25),n[s*3+2]=this.entre(-30,15);let r=new Tt;r.setAttribute("position",new Ft(n,3)),this.neve=new er(r,new wi({color:"#ffffff",size:.16,transparent:!0,opacity:.9,depthWrite:!1})),e.add(this.neve)}async usa(e){try{await this.monta(e)}catch(n){throw this.grupos[e]&&(this.scene.remove(this.grupos[e]),delete this.grupos[e]),n}for(let[n,r]of Object.entries(this.grupos))r.visible=n===e;for(let[n,r]of Object.entries(this.colecao))r.grupo.visible=n===e;let t=Cy[e];this.ceuMat.uniforms.topo.value.set(t.topo),this.ceuMat.uniforms.meio.value.set(t.meio),this.ceuMat.uniforms.base.value.set(t.base),this.fog.color.set(t.base),this.hemi.color.set(t.ceuLuz),this.hemi.groundColor.set(t.chaoLuz),this.sol.color.set(t.sol),this.sol.intensity=t.forca,this.nuvemMat.emissive.set(t.nuvem),this.pintaChao(t),this.atual=e}lugares(){if(this._lugares)return this._lugares;let e=[],t=99,n=()=>((t=t*16807%2147483647)-1)/2147483646;for(let r=0;e.length<30&&r<2e3;r++){let s=-13+n()*26,o=2.5+n()*5.5;Math.abs(s+6.9)<2.2&&o<4.4||Math.abs(s-.4)<3.2||e.some(a=>Math.hypot(a.x-s,a.z-o)<1.5)||e.push({x:s,z:o,g:n()*6.28})}return this._lugares=e}pecaColecao(e,t,n){let r=this.colecao[e].grupo;if(e==="floresta"){let s=["Flower_3_Group","Mushroom_Common","Flower_4_Group","Bush_Common_Flowers","Fern_1","Mushroom_Laetiporus","Clover_1","Plant_1_Big"],o={Flower_3_Group:1,Flower_4_Group:1,Mushroom_Common:.75,Mushroom_Laetiporus:.8,Bush_Common_Flowers:1.7,Fern_1:1.4,Clover_1:.6,Plant_1_Big:1.5},a=s[t%s.length];return this.poe(r,"floresta",a,n.x,n.z,o[a],n.g)}if(e==="gelo")return this.noChao(r,t%4===3?this.bonecoNeve():this.cristal(["#9EE6FF","#C7B8FF","#A8F0E0"][t%3]),n.x,n.z,t%4===3?.75:.8);if(e==="deserto")return this.noChao(r,this.cacto(!0),n.x,n.z,.55);if(e==="mar")return this.noChao(r,this.estrelaMar(["#FF8A5C","#FFC14D","#FF6F91","#B58CFF"][t%4]),n.x,n.z,1)}cresceAte(e,t,n,r){var c;let s=(c=this.colecao)[e]??(c[e]={grupo:new ut,pecas:[]});s.grupo.parent||this.scene.add(s.grupo),s.grupo.visible=e===this.atual;let o=this.lugares(),a=sl[e].total;for(;s.pecas.length<Math.min(t,a,o.length);){let l=this.pecaColecao(e,s.pecas.length,o[s.pecas.length]);if(!l)break;if(s.pecas.push(l),n){let h=l.scale.x;l.scale.setScalar(.001);let u=performance.now(),d=()=>{let f=Math.min(1,(performance.now()-u)/700),g=f-1;l.scale.setScalar(h*Math.max(.001,1+2.7*g*g*g+1.7*g*g)),f<1&&requestAnimationFrame(d)};d(),r&&(r.estoura(l.position.clone().add(new P(0,.6,0)),"#FF8FB1",18,.6),r.estoura(l.position.clone().add(new P(0,.6,0)),"#FFE27A",14,.6))}}}atualiza(e){if(this.t+=e,this.nuvens.position.x=Math.sin(this.t*.02)*6,this.neve&&this.neve.parent.visible){let t=this.neve.geometry.attributes.position;for(let n=0;n<t.count;n++){let r=t.getY(n)-e*(1.2+n%7*.12);r<-5&&(r+=30),t.setY(n,r),t.setX(n,t.getX(n)+Math.sin(this.t+n)*e*.3)}t.needsUpdate=!0}this.agua&&(this.agua.uniforms.t.value=this.t)}};var ol=class{constructor(e,t=700){let n=new Ri(.16,.1,.04);this.malha=new $i(n,new Pt({roughness:.5}),t),this.malha.instanceMatrix.setUsage(Ch),this.malha.frustumCulled=!1,this.malha.count=0,e.add(this.malha),this.p=[],this.max=t,this.m=new Ve,this.q=new Ht,this.e=new En,this.s=new P}estoura(e,t,n=46,r=1){let s=new Ee(t);for(let o=0;o<n;o++){this.p.length>=this.max&&this.p.shift();let a=Math.random()*Math.PI*2,c=(2.5+Math.random()*4.5)*r,l=s.clone().offsetHSL((Math.random()-.5)*.04,0,(Math.random()-.3)*.18);this.p.push({x:e.x,y:e.y,z:e.z,vx:Math.cos(a)*c,vy:Math.sin(a)*c+3.5*r,vz:(Math.random()-.2)*3,rx:Math.random()*6,ry:Math.random()*6,vr:(Math.random()-.5)*18,vida:1.1+Math.random()*.7,t:0,cor:l})}}atualiza(e){for(let n=this.p.length-1;n>=0;n--){let r=this.p[n];if(r.t+=e,r.t>r.vida){this.p.splice(n,1);continue}r.vy+=-14*e,r.vx*=1-1.6*e,r.vz*=1-1.6*e,r.vy*=1-.8*e,r.x+=r.vx*e,r.y+=r.vy*e,r.z+=r.vz*e,r.rx+=r.vr*e,r.ry+=r.vr*.7*e}this.malha.count=this.p.length;for(let n=0;n<this.p.length;n++){let r=this.p[n],s=Math.min(1,(r.vida-r.t)*3);this.e.set(r.rx,r.ry,0),this.q.setFromEuler(this.e),this.s.setScalar(s),this.m.compose(new P(r.x,r.y,r.z),this.q,this.s),this.malha.setMatrixAt(n,this.m),this.malha.setColorAt(n,r.cor)}this.malha.instanceMatrix.needsUpdate=!0,this.malha.instanceColor&&(this.malha.instanceColor.needsUpdate=!0)}};var $p=[{nome:"F6",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:-2.55,y:0,gap:64,rot:120,cor:"menta"},c:{x:1.275,y:-2.208364779650318,gap:64,rot:-30,cor:"azul"},d:{x:2.55,y:0,gap:64,rot:90,cor:"roxo"},e:{x:-3.8249999999999997,y:-2.208364779650318,gap:64,rot:-180,cor:"lima"},f:{x:-1.275,y:2.208364779650318,gap:64,rot:-180,cor:"coral"}},travas:[{dono:"c",alvo:"d"},{dono:"b",alvo:"f"},{dono:"b",alvo:"e"},{dono:"a",alvo:"b"},{dono:"a",alvo:"c"},{dono:"a",alvo:"d"},{dono:"a",alvo:"f"}],dificil:!1,amigo:"coruja"},{nome:"F7",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:2.55,y:0,gap:64,rot:120,cor:"ambar"},c:{x:1.275,y:-2.208364779650318,gap:64,rot:0,cor:"menta"},d:{x:-2.55,y:0,gap:64,rot:0,cor:"azul"},e:{x:-1.275,y:-2.208364779650318,gap:64,rot:-180,cor:"roxo"},f:{x:5.1,y:0,gap:64,rot:105,cor:"lima"},g:{x:3.8249999999999997,y:-2.208364779650318,gap:64,rot:-165,cor:"coral"}},travas:[{dono:"f",alvo:"b"},{dono:"a",alvo:"c"},{dono:"e",alvo:"c"},{dono:"b",alvo:"c"},{dono:"e",alvo:"d"},{dono:"g",alvo:"b"},{dono:"a",alvo:"e"},{dono:"a",alvo:"b"}],dificil:!1,amigo:"passarinho"},{nome:"F8",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:-1.275,y:-2.208364779650318,gap:62,rot:-60,cor:"roxo"},c:{x:1.275,y:-2.208364779650318,gap:62,rot:120,cor:"lima"},d:{x:1.275,y:2.208364779650318,gap:62,rot:120,cor:"coral"},e:{x:3.8249999999999997,y:2.208364779650318,gap:62,rot:60,cor:"ambar"},f:{x:-1.275,y:2.208364779650318,gap:62,rot:-120,cor:"menta"},g:{x:6.375,y:2.208364779650318,gap:62,rot:-30,cor:"azul"},h:{x:2.55,y:0,gap:62,rot:0,cor:"roxo"}},travas:[{dono:"a",alvo:"b"},{dono:"e",alvo:"d"},{dono:"a",alvo:"h"},{dono:"a",alvo:"f"},{dono:"c",alvo:"b"},{dono:"f",alvo:"d"},{dono:"e",alvo:"g"},{dono:"a",alvo:"d"},{dono:"e",alvo:"h"},{dono:"d",alvo:"h"}],dificil:!1,amigo:"esquilo"},{nome:"F9",aneis:{a:{x:0,y:0,gap:66,rot:-52.5,cor:"menta"},b:{x:1.275,y:2.208364779650318,gap:66,rot:67.5,cor:"azul"},c:{x:3.8249999999999997,y:2.208364779650318,gap:66,rot:45,cor:"roxo"},d:{x:-1.275,y:-2.208364779650318,fechado:!0,cor:"tronco"},e:{x:-3.8249999999999997,y:-2.208364779650318,gap:66,rot:67.5,cor:"lima"}},travas:[{dono:"d",alvo:"e"},{dono:"d",alvo:"a"},{dono:"b",alvo:"c"},{dono:"b",alvo:"a"}],dificil:!1,amigo:"ourico"},{nome:"F10",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:2.55,y:0,fechado:!0,cor:"tronco"},c:{x:5.1,y:0,gap:60,rot:-15,cor:"lima"},d:{x:3.8249999999999997,y:2.208364779650318,gap:60,rot:60,cor:"coral"},e:{x:6.375,y:2.208364779650318,gap:60,rot:120,cor:"ambar"},f:{x:-1.275,y:2.208364779650318,gap:60,rot:150,cor:"menta"},g:{x:1.275,y:2.208364779650318,gap:60,rot:90,cor:"azul"},h:{x:-1.275,y:-2.208364779650318,gap:60,rot:-90,cor:"roxo"},i:{x:1.275,y:-2.208364779650318,gap:60,rot:-90,cor:"lima"}},travas:[{dono:"b",alvo:"c"},{dono:"d",alvo:"g"},{dono:"b",alvo:"g"},{dono:"c",alvo:"e"},{dono:"a",alvo:"h"},{dono:"g",alvo:"f"},{dono:"a",alvo:"i"},{dono:"a",alvo:"g"},{dono:"d",alvo:"e"},{dono:"d",alvo:"c"},{dono:"b",alvo:"d"}],dificil:!0,amigo:"coelho"},{nome:"F11",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:-1.275,y:-2.208364779650318,gap:67,rot:-112.5,cor:"azul"},c:{x:-3.8249999999999997,y:-2.208364779650318,gap:67,rot:67.5,cor:"roxo"},d:{x:2.55,y:0,gap:67,rot:112.5,cor:"lima"},e:{x:-1.275,y:2.208364779650318,gap:67,rot:112.5,cor:"coral"},f:{x:-3.8249999999999997,y:2.208364779650318,gap:67,rot:67.5,cor:"ambar"}},travas:[{dono:"a",alvo:"e"},{dono:"e",alvo:"f"},{dono:"b",alvo:"c"},{dono:"a",alvo:"b"},{dono:"a",alvo:"d"}],dificil:!1,amigo:"cervo"},{nome:"F12",aneis:{a:{x:0,y:0,gap:65,rot:127.5,cor:"coral"},b:{x:1.275,y:2.208364779650318,gap:65,rot:-52.5,cor:"ambar"},c:{x:1.275,y:-2.208364779650318,gap:65,rot:-15,cor:"menta"},d:{x:-1.275,y:-2.208364779650318,fechado:!0,cor:"tronco"},e:{x:-3.8249999999999997,y:-2.208364779650318,gap:65,rot:-67.5,cor:"azul"},f:{x:-5.1,y:0,gap:65,rot:135,cor:"roxo"},g:{x:-6.375,y:-2.208364779650318,gap:65,rot:127.5,cor:"lima"}},travas:[{dono:"d",alvo:"e"},{dono:"f",alvo:"e"},{dono:"d",alvo:"a"},{dono:"c",alvo:"a"},{dono:"b",alvo:"a"},{dono:"f",alvo:"g"},{dono:"d",alvo:"c"},{dono:"e",alvo:"g"}],dificil:!1,amigo:"coruja"},{nome:"F13",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:-1.275,y:-2.208364779650318,gap:63,rot:-30,cor:"azul"},c:{x:-2.55,y:0,gap:63,rot:-180,cor:"roxo"},d:{x:1.275,y:2.208364779650318,gap:63,rot:60,cor:"lima"},e:{x:-3.8249999999999997,y:-2.208364779650318,gap:63,rot:-15,cor:"coral"},f:{x:3.8249999999999997,y:2.208364779650318,gap:63,rot:-60,cor:"ambar"},g:{x:-1.275,y:2.208364779650318,gap:63,rot:60,cor:"menta"},h:{x:2.55,y:0,gap:63,rot:-15,cor:"azul"}},travas:[{dono:"a",alvo:"c"},{dono:"c",alvo:"b"},{dono:"d",alvo:"g"},{dono:"a",alvo:"d"},{dono:"d",alvo:"f"},{dono:"a",alvo:"h"},{dono:"c",alvo:"e"},{dono:"a",alvo:"b"},{dono:"d",alvo:"h"},{dono:"f",alvo:"h"}],dificil:!1,amigo:"passarinho"},{nome:"F14",aneis:{a:{x:0,y:0,gap:63,rot:120,cor:"lima"},b:{x:-1.275,y:-2.208364779650318,gap:63,rot:135,cor:"coral"},c:{x:1.275,y:2.208364779650318,gap:63,rot:-30,cor:"ambar"},d:{x:1.275,y:-2.208364779650318,gap:63,rot:-120,cor:"menta"},e:{x:2.55,y:0,gap:63,rot:-60,cor:"azul"},f:{x:-2.55,y:0,gap:63,rot:135,cor:"roxo"}},travas:[{dono:"e",alvo:"d"},{dono:"a",alvo:"e"},{dono:"a",alvo:"f"},{dono:"b",alvo:"d"},{dono:"a",alvo:"c"},{dono:"a",alvo:"d"},{dono:"a",alvo:"b"}],dificil:!1,amigo:"esquilo"},{nome:"F15",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:2.55,y:0,gap:61,rot:0,cor:"azul"},c:{x:1.275,y:2.208364779650318,gap:61,rot:75,cor:"roxo"},d:{x:-1.275,y:-2.208364779650318,gap:61,rot:135,cor:"lima"},e:{x:3.8249999999999997,y:-2.208364779650318,gap:61,rot:45,cor:"coral"},f:{x:1.275,y:-2.208364779650318,gap:61,rot:-90,cor:"ambar"},g:{x:-2.55,y:0,gap:61,rot:-120,cor:"menta"},h:{x:-1.275,y:2.208364779650318,gap:61,rot:60,cor:"azul"},i:{x:-5.1,y:0,gap:61,rot:-120,cor:"roxo"}},travas:[{dono:"a",alvo:"b"},{dono:"a",alvo:"g"},{dono:"h",alvo:"g"},{dono:"a",alvo:"c"},{dono:"a",alvo:"d"},{dono:"f",alvo:"e"},{dono:"b",alvo:"f"},{dono:"g",alvo:"i"},{dono:"h",alvo:"c"},{dono:"b",alvo:"e"},{dono:"a",alvo:"h"}],dificil:!0,amigo:"ourico"},{nome:"F16",aneis:{a:{x:0,y:0,gap:61,rot:-120,cor:"menta"},b:{x:-1.275,y:2.208364779650318,gap:61,rot:0,cor:"azul"},c:{x:-3.8249999999999997,y:2.208364779650318,gap:61,rot:60,cor:"roxo"},d:{x:2.55,y:0,gap:61,rot:-120,cor:"lima"},e:{x:5.1,y:0,gap:61,rot:-15,cor:"coral"},f:{x:-2.55,y:0,fechado:!0,cor:"tronco"},g:{x:-5.1,y:0,gap:61,rot:-60,cor:"ambar"},h:{x:-6.375,y:-2.208364779650318,gap:61,rot:120,cor:"menta"}},travas:[{dono:"f",alvo:"c"},{dono:"b",alvo:"c"},{dono:"g",alvo:"c"},{dono:"a",alvo:"d"},{dono:"f",alvo:"a"},{dono:"e",alvo:"d"},{dono:"h",alvo:"g"},{dono:"f",alvo:"b"},{dono:"b",alvo:"a"},{dono:"f",alvo:"g"}],dificil:!1,amigo:"coelho"},{nome:"F17",aneis:{a:{x:0,y:0,gap:61,rot:120,cor:"roxo"},b:{x:-1.275,y:-2.208364779650318,gap:61,rot:-180,cor:"lima"},c:{x:-1.275,y:2.208364779650318,gap:61,rot:-30,cor:"coral"},d:{x:1.275,y:-2.208364779650318,gap:61,rot:-60,cor:"ambar"},e:{x:-2.55,y:0,fechado:!0,cor:"tronco"},f:{x:3.8249999999999997,y:-2.208364779650318,gap:61,rot:120,cor:"menta"},g:{x:-3.8249999999999997,y:2.208364779650318,gap:61,rot:60,cor:"azul"},h:{x:5.1,y:0,gap:61,rot:45,cor:"roxo"},i:{x:-5.1,y:0,gap:61,rot:-30,cor:"lima"}},travas:[{dono:"g",alvo:"c"},{dono:"b",alvo:"a"},{dono:"d",alvo:"f"},{dono:"e",alvo:"b"},{dono:"b",alvo:"d"},{dono:"e",alvo:"c"},{dono:"i",alvo:"g"},{dono:"h",alvo:"f"},{dono:"d",alvo:"a"},{dono:"e",alvo:"a"},{dono:"e",alvo:"g"}],dificil:!1,amigo:"cervo"},{nome:"F18",aneis:{a:{x:0,y:0,gap:59,rot:-120,cor:"coral"},b:{x:1.275,y:-2.208364779650318,gap:59,rot:-180,cor:"ambar"},c:{x:-2.55,y:0,gap:59,rot:-60,cor:"menta"},d:{x:2.55,y:0,fechado:!0,cor:"tronco"},e:{x:5.1,y:0,gap:59,rot:150,cor:"azul"},f:{x:-1.275,y:2.208364779650318,gap:59,rot:120,cor:"roxo"},g:{x:-5.1,y:0,gap:59,rot:-150,cor:"lima"},h:{x:-3.8249999999999997,y:2.208364779650318,gap:59,rot:-150,cor:"coral"},i:{x:6.375,y:-2.208364779650318,gap:59,rot:75,cor:"ambar"},j:{x:3.8249999999999997,y:-2.208364779650318,gap:59,rot:-60,cor:"menta"}},travas:[{dono:"d",alvo:"a"},{dono:"a",alvo:"c"},{dono:"f",alvo:"h"},{dono:"j",alvo:"e"},{dono:"g",alvo:"c"},{dono:"d",alvo:"j"},{dono:"d",alvo:"b"},{dono:"a",alvo:"f"},{dono:"i",alvo:"j"},{dono:"b",alvo:"j"},{dono:"a",alvo:"b"},{dono:"h",alvo:"c"},{dono:"f",alvo:"c"}],dificil:!1,amigo:"coruja"},{nome:"F19",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:-2.55,y:0,gap:63,rot:-60,cor:"ambar"},c:{x:1.275,y:2.208364779650318,gap:63,rot:-60,cor:"menta"},d:{x:-3.8249999999999997,y:-2.208364779650318,gap:63,rot:120,cor:"azul"},e:{x:1.275,y:-2.208364779650318,gap:63,rot:45,cor:"roxo"},f:{x:-1.275,y:2.208364779650318,gap:63,rot:120,cor:"lima"},g:{x:-3.8249999999999997,y:2.208364779650318,gap:63,rot:60,cor:"coral"}},travas:[{dono:"a",alvo:"b"},{dono:"f",alvo:"g"},{dono:"a",alvo:"f"},{dono:"a",alvo:"e"},{dono:"a",alvo:"c"},{dono:"d",alvo:"b"},{dono:"b",alvo:"g"},{dono:"f",alvo:"c"}],dificil:!1,amigo:"passarinho"},{nome:"F20",aneis:{a:{x:0,y:0,gap:57,rot:-60,cor:"azul"},b:{x:1.275,y:2.208364779650318,gap:57,rot:120,cor:"roxo"},c:{x:-1.275,y:2.208364779650318,gap:57,rot:60,cor:"lima"},d:{x:2.55,y:0,gap:57,rot:-120,cor:"coral"},e:{x:-2.55,y:0,fechado:!0,cor:"tronco"},f:{x:-3.8249999999999997,y:-2.208364779650318,gap:57,rot:-120,cor:"ambar"},g:{x:-3.8249999999999997,y:2.208364779650318,gap:57,rot:0,cor:"menta"},h:{x:-5.1,y:0,fechado:!0,cor:"tronco"},i:{x:-6.375,y:2.208364779650318,gap:57,rot:90,cor:"azul"},j:{x:-6.375,y:-2.208364779650318,gap:57,rot:120,cor:"roxo"},k:{x:3.8249999999999997,y:2.208364779650318,gap:57,rot:-60,cor:"lima"}},travas:[{dono:"h",alvo:"j"},{dono:"k",alvo:"d"},{dono:"h",alvo:"i"},{dono:"a",alvo:"b"},{dono:"e",alvo:"a"},{dono:"e",alvo:"g"},{dono:"a",alvo:"d"},{dono:"b",alvo:"c"},{dono:"i",alvo:"g"},{dono:"h",alvo:"f"},{dono:"b",alvo:"k"},{dono:"a",alvo:"c"},{dono:"j",alvo:"f"},{dono:"b",alvo:"d"}],dificil:!0,amigo:"esquilo"},{nome:"F21",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:2.55,y:0,fechado:!0,cor:"tronco"},c:{x:1.275,y:-2.208364779650318,gap:64,rot:-60,cor:"coral"},d:{x:-1.275,y:-2.208364779650318,gap:64,rot:60,cor:"ambar"},e:{x:-2.55,y:0,gap:64,rot:-120,cor:"menta"},f:{x:3.8249999999999997,y:2.208364779650318,gap:64,rot:105,cor:"azul"},g:{x:3.8249999999999997,y:-2.208364779650318,gap:64,rot:-120,cor:"roxo"},h:{x:1.275,y:2.208364779650318,gap:64,rot:-180,cor:"lima"}},travas:[{dono:"a",alvo:"c"},{dono:"c",alvo:"d"},{dono:"d",alvo:"e"},{dono:"b",alvo:"h"},{dono:"b",alvo:"g"},{dono:"f",alvo:"h"},{dono:"a",alvo:"h"},{dono:"b",alvo:"c"},{dono:"b",alvo:"f"},{dono:"c",alvo:"g"}],dificil:!1,amigo:"ourico"},{nome:"F22",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:2.55,y:0,gap:62,rot:0,cor:"ambar"},c:{x:1.275,y:-2.208364779650318,gap:62,rot:-120,cor:"menta"},d:{x:1.275,y:2.208364779650318,gap:62,rot:45,cor:"azul"},e:{x:-1.275,y:-2.208364779650318,gap:62,rot:-60,cor:"roxo"},f:{x:-2.55,y:0,fechado:!0,cor:"tronco"},g:{x:-3.8249999999999997,y:2.208364779650318,gap:62,rot:-165,cor:"lima"},h:{x:3.8249999999999997,y:-2.208364779650318,gap:62,rot:-45,cor:"coral"},i:{x:-1.275,y:2.208364779650318,gap:62,rot:165,cor:"ambar"}},travas:[{dono:"a",alvo:"e"},{dono:"f",alvo:"i"},{dono:"c",alvo:"e"},{dono:"f",alvo:"g"},{dono:"d",alvo:"b"},{dono:"f",alvo:"e"},{dono:"c",alvo:"b"},{dono:"c",alvo:"h"},{dono:"b",alvo:"h"},{dono:"a",alvo:"c"},{dono:"a",alvo:"d"}],dificil:!1,amigo:"coelho"},{nome:"F23",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:1.275,y:-2.208364779650318,gap:60,rot:-60,cor:"azul"},c:{x:3.8249999999999997,y:-2.208364779650318,gap:60,rot:-60,cor:"roxo"},d:{x:2.55,y:0,fechado:!0,cor:"tronco"},e:{x:6.375,y:-2.208364779650318,gap:60,rot:30,cor:"lima"},f:{x:1.275,y:2.208364779650318,gap:60,rot:60,cor:"coral"},g:{x:-2.55,y:0,gap:60,rot:-105,cor:"ambar"},h:{x:-3.8249999999999997,y:2.208364779650318,gap:60,rot:-135,cor:"menta"},i:{x:3.8249999999999997,y:2.208364779650318,gap:60,rot:-15,cor:"azul"},j:{x:-1.275,y:2.208364779650318,gap:60,rot:-180,cor:"roxo"}},travas:[{dono:"a",alvo:"f"},{dono:"g",alvo:"h"},{dono:"g",alvo:"j"},{dono:"a",alvo:"g"},{dono:"f",alvo:"i"},{dono:"d",alvo:"f"},{dono:"d",alvo:"c"},{dono:"a",alvo:"b"},{dono:"e",alvo:"c"},{dono:"b",alvo:"c"},{dono:"d",alvo:"b"},{dono:"j",alvo:"f"},{dono:"a",alvo:"j"}],dificil:!1,amigo:"cervo"},{nome:"F24",aneis:{a:{x:0,y:0,gap:60,rot:-120,cor:"azul"},b:{x:2.55,y:0,fechado:!0,cor:"tronco"},c:{x:1.275,y:2.208364779650318,gap:60,rot:60,cor:"roxo"},d:{x:3.8249999999999997,y:2.208364779650318,gap:60,rot:60,cor:"lima"},e:{x:-2.55,y:0,gap:60,rot:60,cor:"coral"},f:{x:5.1,y:0,gap:60,rot:-180,cor:"ambar"},g:{x:1.275,y:-2.208364779650318,gap:60,rot:150,cor:"menta"},h:{x:6.375,y:2.208364779650318,gap:60,rot:15,cor:"azul"}},travas:[{dono:"d",alvo:"f"},{dono:"b",alvo:"a"},{dono:"c",alvo:"a"},{dono:"b",alvo:"d"},{dono:"h",alvo:"f"},{dono:"a",alvo:"e"},{dono:"b",alvo:"g"},{dono:"b",alvo:"c"},{dono:"c",alvo:"d"},{dono:"h",alvo:"d"}],dificil:!1,amigo:"coruja"},{nome:"F25",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:1.275,y:-2.208364779650318,gap:58,rot:-180,cor:"menta"},c:{x:1.275,y:2.208364779650318,gap:58,rot:60,cor:"azul"},d:{x:3.8249999999999997,y:2.208364779650318,gap:58,rot:-60,cor:"roxo"},e:{x:-1.275,y:-2.208364779650318,gap:58,rot:-90,cor:"lima"},f:{x:-1.275,y:2.208364779650318,gap:58,rot:60,cor:"coral"},g:{x:2.55,y:0,gap:58,rot:0,cor:"ambar"},h:{x:-3.8249999999999997,y:-2.208364779650318,gap:58,rot:120,cor:"menta"},i:{x:-2.55,y:0,fechado:!0,cor:"tronco"},j:{x:-3.8249999999999997,y:2.208364779650318,gap:58,rot:-135,cor:"azul"},k:{x:3.8249999999999997,y:-2.208364779650318,gap:58,rot:60,cor:"roxo"}},travas:[{dono:"a",alvo:"b"},{dono:"a",alvo:"g"},{dono:"i",alvo:"h"},{dono:"a",alvo:"e"},{dono:"a",alvo:"f"},{dono:"c",alvo:"d"},{dono:"g",alvo:"d"},{dono:"e",alvo:"h"},{dono:"g",alvo:"k"},{dono:"j",alvo:"f"},{dono:"b",alvo:"k"},{dono:"g",alvo:"c"},{dono:"f",alvo:"c"},{dono:"b",alvo:"g"}],dificil:!0,amigo:"passarinho"},{nome:"F26",aneis:{a:{x:0,y:0,gap:58,rot:60,cor:"menta"},b:{x:-1.275,y:2.208364779650318,gap:58,rot:120,cor:"azul"},c:{x:-3.8249999999999997,y:2.208364779650318,gap:58,rot:-180,cor:"roxo"},d:{x:1.275,y:-2.208364779650318,gap:58,rot:-180,cor:"lima"},e:{x:-2.55,y:0,fechado:!0,cor:"tronco"},f:{x:2.55,y:0,gap:58,rot:45,cor:"coral"},g:{x:-5.1,y:0,fechado:!0,cor:"tronco"},h:{x:-6.375,y:-2.208364779650318,gap:58,rot:90,cor:"ambar"},i:{x:-3.8249999999999997,y:-2.208364779650318,gap:58,rot:0,cor:"menta"},j:{x:3.8249999999999997,y:-2.208364779650318,gap:58,rot:-45,cor:"azul"}},travas:[{dono:"e",alvo:"c"},{dono:"g",alvo:"c"},{dono:"e",alvo:"a"},{dono:"a",alvo:"b"},{dono:"f",alvo:"j"},{dono:"g",alvo:"i"},{dono:"a",alvo:"f"},{dono:"i",alvo:"h"},{dono:"d",alvo:"f"},{dono:"e",alvo:"b"},{dono:"e",alvo:"i"},{dono:"b",alvo:"c"},{dono:"a",alvo:"d"}],dificil:!1,amigo:"esquilo"},{nome:"F27",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:1.275,y:2.208364779650318,gap:58,rot:75,cor:"ambar"},c:{x:-1.275,y:-2.208364779650318,gap:58,rot:0,cor:"menta"},d:{x:3.8249999999999997,y:2.208364779650318,gap:58,rot:120,cor:"azul"},e:{x:-2.55,y:0,fechado:!0,cor:"tronco"},f:{x:2.55,y:0,gap:58,rot:-60,cor:"roxo"},g:{x:6.375,y:2.208364779650318,gap:58,rot:105,cor:"lima"},h:{x:5.1,y:0,gap:58,rot:60,cor:"coral"},i:{x:-3.8249999999999997,y:-2.208364779650318,gap:58,rot:0,cor:"ambar"},j:{x:-1.275,y:2.208364779650318,gap:58,rot:120,cor:"menta"},k:{x:-3.8249999999999997,y:2.208364779650318,gap:58,rot:-60,cor:"azul"}},travas:[{dono:"e",alvo:"j"},{dono:"e",alvo:"i"},{dono:"h",alvo:"d"},{dono:"g",alvo:"d"},{dono:"e",alvo:"c"},{dono:"f",alvo:"d"},{dono:"a",alvo:"c"},{dono:"k",alvo:"j"},{dono:"b",alvo:"f"},{dono:"b",alvo:"j"},{dono:"a",alvo:"j"},{dono:"b",alvo:"d"},{dono:"f",alvo:"h"},{dono:"a",alvo:"b"}],dificil:!1,amigo:"ourico"},{nome:"F28",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:-1.275,y:-2.208364779650318,gap:56,rot:-120,cor:"azul"},c:{x:1.275,y:2.208364779650318,gap:56,rot:-45,cor:"roxo"},d:{x:2.55,y:0,fechado:!0,cor:"tronco"},e:{x:1.275,y:-2.208364779650318,gap:56,rot:-120,cor:"lima"},f:{x:-1.275,y:2.208364779650318,gap:56,rot:90,cor:"coral"},g:{x:-2.55,y:0,gap:56,rot:60,cor:"ambar"},h:{x:-3.8249999999999997,y:2.208364779650318,gap:56,rot:-165,cor:"menta"},i:{x:5.1,y:0,gap:56,rot:0,cor:"azul"},j:{x:-3.8249999999999997,y:-2.208364779650318,gap:56,rot:120,cor:"roxo"},k:{x:6.375,y:-2.208364779650318,gap:56,rot:0,cor:"lima"},l:{x:3.8249999999999997,y:-2.208364779650318,gap:56,rot:-60,cor:"coral"}},travas:[{dono:"k",alvo:"i"},{dono:"a",alvo:"b"},{dono:"a",alvo:"e"},{dono:"e",alvo:"l"},{dono:"a",alvo:"f"},{dono:"g",alvo:"h"},{dono:"b",alvo:"j"},{dono:"d",alvo:"i"},{dono:"l",alvo:"i"},{dono:"h",alvo:"f"},{dono:"a",alvo:"c"},{dono:"b",alvo:"e"},{dono:"l",alvo:"k"},{dono:"b",alvo:"g"},{dono:"g",alvo:"j"}],dificil:!1,amigo:"coelho"},{nome:"F29",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:-2.55,y:0,fechado:!0,cor:"tronco"},c:{x:2.55,y:0,gap:60,rot:-120,cor:"coral"},d:{x:3.8249999999999997,y:-2.208364779650318,gap:60,rot:-45,cor:"ambar"},e:{x:-3.8249999999999997,y:2.208364779650318,gap:60,rot:-120,cor:"menta"},f:{x:-1.275,y:2.208364779650318,gap:60,rot:60,cor:"azul"},g:{x:1.275,y:2.208364779650318,gap:60,rot:0,cor:"roxo"},h:{x:-3.8249999999999997,y:-2.208364779650318,gap:60,rot:0,cor:"lima"},i:{x:-5.1,y:0,gap:60,rot:-120,cor:"coral"}},travas:[{dono:"a",alvo:"g"},{dono:"f",alvo:"g"},{dono:"f",alvo:"e"},{dono:"b",alvo:"h"},{dono:"h",alvo:"i"},{dono:"g",alvo:"c"},{dono:"b",alvo:"f"},{dono:"d",alvo:"c"},{dono:"a",alvo:"f"},{dono:"a",alvo:"c"},{dono:"b",alvo:"i"}],dificil:!1,amigo:"cervo"},{nome:"F30",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:1.275,y:-2.208364779650318,gap:56,rot:-60,cor:"coral"},c:{x:3.8249999999999997,y:-2.208364779650318,fechado:!0,cor:"tronco"},d:{x:-2.55,y:0,gap:56,rot:-120,cor:"ambar"},e:{x:2.55,y:0,fechado:!0,cor:"tronco"},f:{x:6.375,y:-2.208364779650318,gap:56,rot:-45,cor:"menta"},g:{x:-1.275,y:2.208364779650318,gap:56,rot:105,cor:"azul"},h:{x:5.1,y:0,gap:56,rot:0,cor:"roxo"},i:{x:-5.1,y:0,gap:56,rot:-60,cor:"lima"},j:{x:1.275,y:2.208364779650318,gap:56,rot:105,cor:"coral"},k:{x:3.8249999999999997,y:2.208364779650318,gap:56,rot:-120,cor:"ambar"},l:{x:-3.8249999999999997,y:2.208364779650318,gap:56,rot:75,cor:"menta"}},travas:[{dono:"a",alvo:"d"},{dono:"d",alvo:"l"},{dono:"a",alvo:"j"},{dono:"i",alvo:"l"},{dono:"c",alvo:"b"},{dono:"c",alvo:"h"},{dono:"c",alvo:"f"},{dono:"e",alvo:"b"},{dono:"j",alvo:"g"},{dono:"k",alvo:"j"},{dono:"k",alvo:"h"},{dono:"d",alvo:"i"},{dono:"f",alvo:"h"},{dono:"g",alvo:"l"},{dono:"g",alvo:"d"}],dificil:!0,amigo:"coruja"}];var Qp=[{nome:"F31",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:-1.275,y:-2.208364779650318,gap:68,rot:135,cor:"coral"},c:{x:1.275,y:-2.208364779650318,gap:68,rot:-7.5,cor:"ambar"},d:{x:2.55,y:0,gap:68,rot:52.5,cor:"menta"},e:{x:1.275,y:2.208364779650318,gap:68,rot:7.5,cor:"azul",congelado:!0}},travas:[{dono:"a",alvo:"e"},{dono:"c",alvo:"d"},{dono:"c",alvo:"b"},{dono:"a",alvo:"b"},{dono:"a",alvo:"d"},{dono:"e",alvo:"d"}],dificil:!1,amigo:"passarinho",bioma:"gelo"},{nome:"F32",aneis:{a:{x:0,y:0,gap:66,rot:-112.5,cor:"azul",congelado:!0},b:{x:-2.55,y:0,fechado:!0,cor:"tronco"},c:{x:-1.275,y:2.208364779650318,gap:66,rot:150,cor:"roxo"},d:{x:-3.8249999999999997,y:-2.208364779650318,gap:66,rot:-75,cor:"lima"},e:{x:1.275,y:2.208364779650318,gap:66,rot:-52.5,cor:"coral"},f:{x:-5.1,y:0,gap:66,rot:-180,cor:"ambar"}},travas:[{dono:"e",alvo:"a"},{dono:"b",alvo:"a"},{dono:"b",alvo:"f"},{dono:"b",alvo:"c"},{dono:"b",alvo:"d"},{dono:"e",alvo:"c"},{dono:"a",alvo:"c"}],dificil:!1,amigo:"esquilo",bioma:"gelo"},{nome:"F33",aneis:{a:{x:0,y:0,gap:64,rot:60,cor:"coral",congelado:!0},b:{x:-1.275,y:2.208364779650318,gap:64,rot:0,cor:"ambar"},c:{x:-3.8249999999999997,y:2.208364779650318,gap:64,rot:-120,cor:"menta"},d:{x:-1.275,y:-2.208364779650318,gap:64,rot:0,cor:"azul"},e:{x:-3.8249999999999997,y:-2.208364779650318,gap:64,rot:60,cor:"roxo"},f:{x:-5.1,y:0,gap:64,rot:15,cor:"lima"},g:{x:-2.55,y:0,fechado:!0,cor:"tronco"}},travas:[{dono:"f",alvo:"e"},{dono:"c",alvo:"b"},{dono:"g",alvo:"a"},{dono:"a",alvo:"d"},{dono:"e",alvo:"d"},{dono:"g",alvo:"c"},{dono:"g",alvo:"d"},{dono:"a",alvo:"b"}],dificil:!1,amigo:"ourico",bioma:"gelo"},{nome:"F34",aneis:{a:{x:0,y:0,gap:64,rot:-180,cor:"coral"},b:{x:-1.275,y:-2.208364779650318,gap:64,rot:0,cor:"ambar"},c:{x:1.275,y:2.208364779650318,gap:64,rot:15,cor:"menta"},d:{x:-1.275,y:2.208364779650318,gap:64,rot:60,cor:"azul"},e:{x:2.55,y:0,gap:64,rot:-45,cor:"roxo",congelado:!0}},travas:[{dono:"a",alvo:"b"},{dono:"a",alvo:"e"},{dono:"e",alvo:"c"},{dono:"d",alvo:"c"},{dono:"a",alvo:"c"},{dono:"a",alvo:"d"}],dificil:!1,amigo:"coelho",bioma:"gelo"},{nome:"F35",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:2.55,y:0,gap:62,rot:60,cor:"menta"},c:{x:-1.275,y:2.208364779650318,gap:62,rot:135,cor:"azul"},d:{x:1.275,y:2.208364779650318,gap:62,rot:0,cor:"roxo"},e:{x:-2.55,y:0,gap:62,rot:120,cor:"lima"},f:{x:1.275,y:-2.208364779650318,gap:62,rot:-120,cor:"coral"},g:{x:-1.275,y:-2.208364779650318,gap:62,rot:-180,cor:"ambar",congelado:!0},h:{x:-5.1,y:0,gap:62,rot:-60,cor:"menta"}},travas:[{dono:"a",alvo:"g"},{dono:"a",alvo:"e"},{dono:"a",alvo:"c"},{dono:"b",alvo:"d"},{dono:"g",alvo:"f"},{dono:"a",alvo:"d"},{dono:"h",alvo:"e"},{dono:"c",alvo:"e"},{dono:"g",alvo:"e"},{dono:"c",alvo:"d"}],dificil:!0,amigo:"cervo",bioma:"gelo"},{nome:"F36",aneis:{a:{x:0,y:0,gap:62,rot:60,cor:"ambar"},b:{x:-2.55,y:0,fechado:!0,cor:"tronco"},c:{x:-1.275,y:2.208364779650318,gap:62,rot:30,cor:"menta"},d:{x:-3.8249999999999997,y:-2.208364779650318,gap:62,rot:-60,cor:"azul",congelado:!0},e:{x:-5.1,y:0,gap:62,rot:165,cor:"roxo"},f:{x:-1.275,y:-2.208364779650318,gap:62,rot:0,cor:"lima",congelado:!0},g:{x:-3.8249999999999997,y:2.208364779650318,gap:62,rot:-60,cor:"coral"}},travas:[{dono:"d",alvo:"e"},{dono:"d",alvo:"f"},{dono:"b",alvo:"c"},{dono:"b",alvo:"e"},{dono:"b",alvo:"a"},{dono:"e",alvo:"g"},{dono:"f",alvo:"a"},{dono:"b",alvo:"f"}],dificil:!1,amigo:"coruja",bioma:"gelo"},{nome:"F37",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:1.275,y:-2.208364779650318,gap:62,rot:-75,cor:"roxo"},c:{x:1.275,y:2.208364779650318,gap:62,rot:120,cor:"lima",congelado:!0},d:{x:3.8249999999999997,y:2.208364779650318,gap:62,rot:-120,cor:"coral",congelado:!0},e:{x:-1.275,y:-2.208364779650318,gap:62,rot:120,cor:"ambar"},f:{x:6.375,y:2.208364779650318,gap:62,rot:120,cor:"menta"},g:{x:-1.275,y:2.208364779650318,gap:62,rot:150,cor:"azul"},h:{x:5.1,y:0,gap:62,rot:-15,cor:"roxo"}},travas:[{dono:"a",alvo:"b"},{dono:"a",alvo:"e"},{dono:"c",alvo:"g"},{dono:"d",alvo:"f"},{dono:"h",alvo:"f"},{dono:"a",alvo:"c"},{dono:"d",alvo:"c"},{dono:"d",alvo:"h"},{dono:"e",alvo:"b"},{dono:"a",alvo:"g"}],dificil:!1,amigo:"passarinho",bioma:"gelo"},{nome:"F38",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:1.275,y:-2.208364779650318,gap:60,rot:60,cor:"lima"},c:{x:-2.55,y:0,gap:60,rot:-120,cor:"coral",congelado:!0},d:{x:-5.1,y:0,gap:60,rot:60,cor:"ambar",congelado:!0},e:{x:1.275,y:2.208364779650318,gap:60,rot:75,cor:"menta"},f:{x:-1.275,y:-2.208364779650318,gap:60,rot:-180,cor:"azul"},g:{x:-3.8249999999999997,y:2.208364779650318,gap:60,rot:150,cor:"roxo"},h:{x:-1.275,y:2.208364779650318,gap:60,rot:-30,cor:"lima"},i:{x:3.8249999999999997,y:-2.208364779650318,gap:60,rot:-15,cor:"coral"}},travas:[{dono:"i",alvo:"b"},{dono:"c",alvo:"g"},{dono:"a",alvo:"b"},{dono:"c",alvo:"f"},{dono:"c",alvo:"h"},{dono:"a",alvo:"f"},{dono:"a",alvo:"e"},{dono:"d",alvo:"c"},{dono:"a",alvo:"c"},{dono:"f",alvo:"b"},{dono:"h",alvo:"g"}],dificil:!1,amigo:"esquilo",bioma:"gelo"},{nome:"F39",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:-2.55,y:0,gap:64,rot:60,cor:"ambar"},c:{x:2.55,y:0,gap:64,rot:-60,cor:"menta"},d:{x:3.8249999999999997,y:2.208364779650318,gap:64,rot:105,cor:"azul"},e:{x:1.275,y:-2.208364779650318,gap:64,rot:0,cor:"roxo",congelado:!0},f:{x:6.375,y:2.208364779650318,gap:64,rot:30,cor:"lima",congelado:!0}},travas:[{dono:"a",alvo:"b"},{dono:"e",alvo:"c"},{dono:"d",alvo:"c"},{dono:"a",alvo:"e"},{dono:"f",alvo:"d"},{dono:"a",alvo:"c"}],dificil:!1,amigo:"ourico",bioma:"gelo"},{nome:"F40",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:-2.55,y:0,gap:58,rot:120,cor:"lima"},c:{x:-1.275,y:-2.208364779650318,gap:58,rot:0,cor:"coral"},d:{x:1.275,y:-2.208364779650318,gap:58,rot:-15,cor:"ambar"},e:{x:2.55,y:0,fechado:!0,cor:"tronco"},f:{x:-1.275,y:2.208364779650318,gap:58,rot:-180,cor:"menta"},g:{x:5.1,y:0,gap:58,rot:15,cor:"azul",congelado:!0},h:{x:1.275,y:2.208364779650318,gap:58,rot:-60,cor:"roxo"},i:{x:3.8249999999999997,y:-2.208364779650318,gap:58,rot:-180,cor:"lima"},j:{x:3.8249999999999997,y:2.208364779650318,gap:58,rot:0,cor:"coral",congelado:!0}},travas:[{dono:"g",alvo:"i"},{dono:"a",alvo:"f"},{dono:"a",alvo:"c"},{dono:"j",alvo:"g"},{dono:"h",alvo:"f"},{dono:"e",alvo:"g"},{dono:"a",alvo:"d"},{dono:"e",alvo:"d"},{dono:"a",alvo:"b"},{dono:"a",alvo:"h"},{dono:"e",alvo:"j"},{dono:"e",alvo:"i"},{dono:"b",alvo:"f"}],dificil:!0,amigo:"coelho",bioma:"gelo"},{nome:"F41",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:-1.275,y:-2.208364779650318,gap:66,rot:-105,cor:"ambar",congelado:!0},c:{x:2.55,y:0,gap:66,rot:-112.5,cor:"menta",congelado:!0},d:{x:1.275,y:2.208364779650318,fechado:!0,cor:"tronco"},e:{x:3.8249999999999997,y:2.208364779650318,gap:66,rot:-52.5,cor:"azul"},f:{x:-2.55,y:0,gap:66,rot:67.5,cor:"roxo"}},travas:[{dono:"a",alvo:"b"},{dono:"d",alvo:"c"},{dono:"c",alvo:"e"},{dono:"a",alvo:"f"},{dono:"a",alvo:"c"},{dono:"d",alvo:"e"},{dono:"b",alvo:"f"}],dificil:!1,amigo:"cervo",bioma:"gelo"},{nome:"F42",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:-1.275,y:-2.208364779650318,gap:64,rot:-60,cor:"menta",congelado:!0},c:{x:-1.275,y:2.208364779650318,gap:64,rot:-60,cor:"azul",congelado:!0},d:{x:2.55,y:0,fechado:!0,cor:"tronco"},e:{x:1.275,y:2.208364779650318,gap:64,rot:0,cor:"roxo"},f:{x:-3.8249999999999997,y:-2.208364779650318,gap:64,rot:-60,cor:"lima",congelado:!0},g:{x:1.275,y:-2.208364779650318,gap:64,rot:-60,cor:"coral"}},travas:[{dono:"a",alvo:"b"},{dono:"d",alvo:"g"},{dono:"a",alvo:"g"},{dono:"d",alvo:"e"},{dono:"c",alvo:"e"},{dono:"f",alvo:"b"},{dono:"a",alvo:"e"},{dono:"b",alvo:"g"}],dificil:!1,amigo:"coruja",bioma:"gelo"},{nome:"F43",aneis:{a:{x:0,y:0,gap:62,rot:-60,cor:"coral"},b:{x:2.55,y:0,fechado:!0,cor:"tronco"},c:{x:-1.275,y:2.208364779650318,gap:62,rot:-180,cor:"ambar",congelado:!0},d:{x:1.275,y:-2.208364779650318,gap:62,rot:60,cor:"menta",congelado:!0},e:{x:3.8249999999999997,y:-2.208364779650318,gap:62,rot:-120,cor:"azul"},f:{x:5.1,y:0,gap:62,rot:-60,cor:"roxo",congelado:!0},g:{x:3.8249999999999997,y:2.208364779650318,gap:62,rot:75,cor:"lima"},h:{x:1.275,y:2.208364779650318,fechado:!0,cor:"tronco"}},travas:[{dono:"h",alvo:"g"},{dono:"b",alvo:"a"},{dono:"d",alvo:"e"},{dono:"f",alvo:"e"},{dono:"b",alvo:"f"},{dono:"c",alvo:"a"},{dono:"b",alvo:"g"},{dono:"b",alvo:"e"},{dono:"h",alvo:"a"},{dono:"g",alvo:"f"}],dificil:!1,amigo:"passarinho",bioma:"gelo"},{nome:"F44",aneis:{a:{x:0,y:0,gap:62,rot:-180,cor:"azul"},b:{x:2.55,y:0,gap:62,rot:120,cor:"roxo",congelado:!0},c:{x:1.275,y:2.208364779650318,fechado:!0,cor:"tronco"},d:{x:-1.275,y:2.208364779650318,gap:62,rot:150,cor:"lima",congelado:!0},e:{x:5.1,y:0,gap:62,rot:0,cor:"coral",congelado:!0},f:{x:3.8249999999999997,y:2.208364779650318,gap:62,rot:0,cor:"ambar"}},travas:[{dono:"c",alvo:"a"},{dono:"b",alvo:"a"},{dono:"e",alvo:"f"},{dono:"d",alvo:"a"},{dono:"c",alvo:"f"},{dono:"b",alvo:"f"},{dono:"b",alvo:"e"}],dificil:!1,amigo:"esquilo",bioma:"gelo"},{nome:"F45",aneis:{a:{x:0,y:0,gap:60,rot:-120,cor:"ambar"},b:{x:-1.275,y:2.208364779650318,gap:60,rot:120,cor:"menta"},c:{x:1.275,y:2.208364779650318,fechado:!0,cor:"tronco"},d:{x:3.8249999999999997,y:2.208364779650318,gap:60,rot:30,cor:"azul"},e:{x:2.55,y:0,fechado:!0,cor:"tronco"},f:{x:-3.8249999999999997,y:2.208364779650318,gap:60,rot:-75,cor:"roxo"},g:{x:1.275,y:-2.208364779650318,gap:60,rot:-30,cor:"lima",congelado:!0},h:{x:5.1,y:0,gap:60,rot:-60,cor:"coral",congelado:!0},i:{x:3.8249999999999997,y:-2.208364779650318,gap:60,rot:-150,cor:"ambar",congelado:!0}},travas:[{dono:"e",alvo:"a"},{dono:"i",alvo:"h"},{dono:"c",alvo:"d"},{dono:"e",alvo:"h"},{dono:"h",alvo:"d"},{dono:"e",alvo:"g"},{dono:"c",alvo:"b"},{dono:"b",alvo:"f"},{dono:"c",alvo:"a"},{dono:"g",alvo:"a"},{dono:"e",alvo:"i"}],dificil:!0,amigo:"ourico",bioma:"gelo"},{nome:"F46",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:-2.55,y:0,fechado:!0,cor:"tronco"},c:{x:-1.275,y:2.208364779650318,gap:60,rot:105,cor:"azul",congelado:!0},d:{x:-1.275,y:-2.208364779650318,gap:60,rot:-90,cor:"roxo",congelado:!0},e:{x:-3.8249999999999997,y:2.208364779650318,gap:60,rot:-120,cor:"lima"},f:{x:1.275,y:-2.208364779650318,gap:60,rot:-120,cor:"coral",congelado:!0},g:{x:3.8249999999999997,y:-2.208364779650318,gap:60,rot:-120,cor:"ambar"},h:{x:2.55,y:0,gap:60,rot:-120,cor:"menta",congelado:!0}},travas:[{dono:"d",alvo:"f"},{dono:"a",alvo:"f"},{dono:"a",alvo:"h"},{dono:"b",alvo:"c"},{dono:"a",alvo:"c"},{dono:"c",alvo:"e"},{dono:"f",alvo:"g"},{dono:"b",alvo:"e"},{dono:"h",alvo:"g"},{dono:"a",alvo:"d"}],dificil:!1,amigo:"coelho",bioma:"gelo"},{nome:"F47",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:1.275,y:-2.208364779650318,gap:60,rot:-120,cor:"ambar",congelado:!0},c:{x:2.55,y:0,fechado:!0,cor:"tronco"},d:{x:3.8249999999999997,y:-2.208364779650318,gap:60,rot:45,cor:"menta",congelado:!0},e:{x:1.275,y:2.208364779650318,gap:60,rot:60,cor:"azul"},f:{x:-1.275,y:-2.208364779650318,gap:60,rot:60,cor:"roxo"},g:{x:3.8249999999999997,y:2.208364779650318,gap:60,rot:-120,cor:"lima"},h:{x:-3.8249999999999997,y:-2.208364779650318,gap:60,rot:60,cor:"coral",congelado:!0},i:{x:-1.275,y:2.208364779650318,gap:60,rot:60,cor:"ambar",congelado:!0}},travas:[{dono:"i",alvo:"e"},{dono:"a",alvo:"i"},{dono:"d",alvo:"b"},{dono:"a",alvo:"b"},{dono:"g",alvo:"e"},{dono:"c",alvo:"b"},{dono:"h",alvo:"f"},{dono:"b",alvo:"f"},{dono:"a",alvo:"e"},{dono:"c",alvo:"e"},{dono:"c",alvo:"d"}],dificil:!1,amigo:"cervo",bioma:"gelo"},{nome:"F48",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:2.55,y:0,fechado:!0,cor:"tronco"},c:{x:3.8249999999999997,y:2.208364779650318,gap:58,rot:120,cor:"menta",congelado:!0},d:{x:-1.275,y:-2.208364779650318,gap:58,rot:120,cor:"azul",congelado:!0},e:{x:-3.8249999999999997,y:-2.208364779650318,gap:58,rot:-90,cor:"roxo"},f:{x:3.8249999999999997,y:-2.208364779650318,gap:58,rot:0,cor:"lima"},g:{x:-1.275,y:2.208364779650318,gap:58,rot:60,cor:"coral"},h:{x:5.1,y:0,gap:58,rot:60,cor:"ambar",congelado:!0},i:{x:-6.375,y:-2.208364779650318,gap:58,rot:105,cor:"menta",congelado:!0},j:{x:1.275,y:2.208364779650318,gap:58,rot:60,cor:"azul"}},travas:[{dono:"b",alvo:"j"},{dono:"a",alvo:"g"},{dono:"a",alvo:"j"},{dono:"b",alvo:"h"},{dono:"b",alvo:"f"},{dono:"b",alvo:"c"},{dono:"i",alvo:"e"},{dono:"a",alvo:"d"},{dono:"d",alvo:"e"},{dono:"j",alvo:"g"},{dono:"j",alvo:"c"},{dono:"c",alvo:"h"},{dono:"h",alvo:"f"}],dificil:!1,amigo:"coruja",bioma:"gelo"},{nome:"F49",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:-2.55,y:0,gap:62,rot:90,cor:"roxo"},c:{x:-1.275,y:-2.208364779650318,fechado:!0,cor:"tronco"},d:{x:1.275,y:2.208364779650318,gap:62,rot:-180,cor:"lima",congelado:!0},e:{x:1.275,y:-2.208364779650318,gap:62,rot:0,cor:"coral",congelado:!0},f:{x:2.55,y:0,gap:62,rot:-60,cor:"ambar"},g:{x:-5.1,y:0,gap:62,rot:60,cor:"menta",congelado:!0}},travas:[{dono:"c",alvo:"b"},{dono:"g",alvo:"b"},{dono:"a",alvo:"b"},{dono:"a",alvo:"e"},{dono:"a",alvo:"d"},{dono:"a",alvo:"f"},{dono:"d",alvo:"f"},{dono:"e",alvo:"f"}],dificil:!1,amigo:"passarinho",bioma:"gelo"},{nome:"F50",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:-1.275,y:2.208364779650318,gap:58,rot:-60,cor:"menta",congelado:!0},c:{x:-2.55,y:0,fechado:!0,cor:"tronco"},d:{x:-3.8249999999999997,y:2.208364779650318,gap:58,rot:60,cor:"azul",congelado:!0},e:{x:1.275,y:2.208364779650318,gap:58,rot:120,cor:"roxo",congelado:!0},f:{x:-1.275,y:-2.208364779650318,gap:58,rot:60,cor:"lima"},g:{x:3.8249999999999997,y:2.208364779650318,gap:58,rot:-120,cor:"coral"},h:{x:-3.8249999999999997,y:-2.208364779650318,gap:58,rot:60,cor:"ambar"},i:{x:-6.375,y:2.208364779650318,gap:58,rot:60,cor:"menta"},j:{x:-5.1,y:0,fechado:!0,cor:"tronco"},k:{x:1.275,y:-2.208364779650318,gap:58,rot:30,cor:"azul",congelado:!0}},travas:[{dono:"j",alvo:"h"},{dono:"a",alvo:"e"},{dono:"j",alvo:"d"},{dono:"k",alvo:"f"},{dono:"h",alvo:"f"},{dono:"j",alvo:"i"},{dono:"e",alvo:"g"},{dono:"a",alvo:"k"},{dono:"c",alvo:"f"},{dono:"b",alvo:"d"},{dono:"d",alvo:"i"},{dono:"c",alvo:"d"},{dono:"e",alvo:"b"},{dono:"c",alvo:"b"}],dificil:!0,amigo:"esquilo",bioma:"gelo"},{nome:"F51",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:-1.275,y:-2.208364779650318,gap:68,rot:-90,cor:"menta",gemeo:"e"},c:{x:-1.275,y:2.208364779650318,gap:68,rot:112.5,cor:"azul"},d:{x:-3.8249999999999997,y:2.208364779650318,gap:68,rot:67.5,cor:"roxo"},e:{x:2.55,y:0,gap:68,rot:-112.5,cor:"menta",gemeo:"b"}},travas:[{dono:"a",alvo:"c"},{dono:"a",alvo:"e"},{dono:"a",alvo:"b"},{dono:"d",alvo:"c"}],dificil:!1,amigo:"ourico",bioma:"deserto"},{nome:"F52",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:-1.275,y:2.208364779650318,gap:66,rot:112.5,cor:"roxo"},c:{x:-1.275,y:-2.208364779650318,gap:66,rot:127.5,cor:"lima"},d:{x:2.55,y:0,gap:66,rot:7.5,cor:"coral"},e:{x:3.8249999999999997,y:-2.208364779650318,gap:66,rot:-75,cor:"menta",gemeo:"f"},f:{x:-3.8249999999999997,y:2.208364779650318,gap:66,rot:75,cor:"menta",gemeo:"e"}},travas:[{dono:"a",alvo:"c"},{dono:"a",alvo:"d"},{dono:"f",alvo:"b"},{dono:"a",alvo:"b"},{dono:"e",alvo:"d"}],dificil:!1,amigo:"coelho",bioma:"deserto"},{nome:"F53",aneis:{a:{x:0,y:0,gap:64,rot:-180,cor:"ambar"},b:{x:-2.55,y:0,fechado:!0,cor:"tronco"},c:{x:1.275,y:2.208364779650318,gap:64,rot:120,cor:"menta"},d:{x:-3.8249999999999997,y:2.208364779650318,gap:64,rot:120,cor:"roxo",gemeo:"e"},e:{x:-3.8249999999999997,y:-2.208364779650318,gap:64,rot:-60,cor:"roxo",gemeo:"d"},f:{x:-1.275,y:-2.208364779650318,gap:64,rot:-120,cor:"lima"},g:{x:-1.275,y:2.208364779650318,gap:64,rot:-60,cor:"coral"}},travas:[{dono:"e",alvo:"f"},{dono:"a",alvo:"f"},{dono:"g",alvo:"c"},{dono:"b",alvo:"g"},{dono:"a",alvo:"c"},{dono:"b",alvo:"d"},{dono:"b",alvo:"e"},{dono:"b",alvo:"f"}],dificil:!1,amigo:"cervo",bioma:"deserto"},{nome:"F54",aneis:{a:{x:0,y:0,gap:64,rot:-135,cor:"ambar"},b:{x:2.55,y:0,gap:64,rot:-105,cor:"menta"},c:{x:3.8249999999999997,y:2.208364779650318,gap:64,rot:75,cor:"lima",gemeo:"e"},d:{x:6.375,y:2.208364779650318,gap:64,rot:120,cor:"roxo"},e:{x:-1.275,y:2.208364779650318,gap:64,rot:0,cor:"lima",gemeo:"c"}},travas:[{dono:"b",alvo:"a"},{dono:"e",alvo:"a"},{dono:"b",alvo:"c"},{dono:"d",alvo:"c"}],dificil:!1,amigo:"coruja",bioma:"deserto"},{nome:"F55",aneis:{a:{x:0,y:0,gap:62,rot:60,cor:"menta"},b:{x:-1.275,y:2.208364779650318,gap:62,rot:45,cor:"azul"},c:{x:-2.55,y:0,fechado:!0,cor:"tronco"},d:{x:-3.8249999999999997,y:2.208364779650318,gap:62,rot:-180,cor:"roxo",gemeo:"h"},e:{x:1.275,y:-2.208364779650318,gap:62,rot:-180,cor:"lima"},f:{x:-5.1,y:0,gap:62,rot:-135,cor:"coral"},g:{x:3.8249999999999997,y:-2.208364779650318,gap:62,rot:-60,cor:"ambar"},h:{x:5.1,y:0,gap:62,rot:-180,cor:"roxo",gemeo:"d"}},travas:[{dono:"e",alvo:"a"},{dono:"c",alvo:"b"},{dono:"c",alvo:"f"},{dono:"g",alvo:"h"},{dono:"d",alvo:"b"},{dono:"e",alvo:"g"},{dono:"c",alvo:"a"},{dono:"c",alvo:"d"},{dono:"d",alvo:"f"},{dono:"a",alvo:"b"}],dificil:!0,amigo:"passarinho",bioma:"deserto"},{nome:"F56",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:-1.275,y:-2.208364779650318,gap:62,rot:45,cor:"lima",gemeo:"c"},c:{x:1.275,y:2.208364779650318,gap:62,rot:60,cor:"lima",gemeo:"b"},d:{x:-1.275,y:2.208364779650318,gap:62,rot:15,cor:"ambar"},e:{x:-2.55,y:0,gap:62,rot:165,cor:"menta"},f:{x:2.55,y:0,gap:62,rot:60,cor:"azul"},g:{x:-3.8249999999999997,y:-2.208364779650318,gap:62,rot:-60,cor:"roxo"}},travas:[{dono:"a",alvo:"c"},{dono:"a",alvo:"d"},{dono:"a",alvo:"e"},{dono:"g",alvo:"e"},{dono:"f",alvo:"c"},{dono:"b",alvo:"e"},{dono:"a",alvo:"f"},{dono:"e",alvo:"d"}],dificil:!1,amigo:"esquilo",bioma:"deserto"},{nome:"F57",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:1.275,y:2.208364779650318,gap:62,rot:120,cor:"menta"},c:{x:2.55,y:0,gap:62,rot:60,cor:"azul"},d:{x:1.275,y:-2.208364779650318,gap:62,rot:-180,cor:"roxo"},e:{x:3.8249999999999997,y:2.208364779650318,gap:62,rot:-120,cor:"lima",gemeo:"h"},f:{x:-1.275,y:2.208364779650318,gap:62,rot:60,cor:"coral"},g:{x:3.8249999999999997,y:-2.208364779650318,gap:62,rot:30,cor:"ambar"},h:{x:-2.55,y:0,gap:62,rot:-60,cor:"lima",gemeo:"e"}},travas:[{dono:"a",alvo:"f"},{dono:"a",alvo:"h"},{dono:"a",alvo:"d"},{dono:"f",alvo:"b"},{dono:"a",alvo:"c"},{dono:"g",alvo:"d"},{dono:"e",alvo:"b"},{dono:"c",alvo:"d"},{dono:"c",alvo:"b"},{dono:"a",alvo:"b"}],dificil:!1,amigo:"ourico",bioma:"deserto"},{nome:"F58",aneis:{a:{x:0,y:0,gap:60,rot:120,cor:"ambar"},b:{x:2.55,y:0,fechado:!0,cor:"tronco"},c:{x:1.275,y:-2.208364779650318,gap:60,rot:-120,cor:"menta"},d:{x:5.1,y:0,gap:60,rot:-120,cor:"azul"},e:{x:6.375,y:2.208364779650318,gap:60,rot:15,cor:"coral",gemeo:"g"},f:{x:-1.275,y:-2.208364779650318,gap:60,rot:120,cor:"lima"},g:{x:3.8249999999999997,y:-2.208364779650318,gap:60,rot:-180,cor:"coral",gemeo:"e"},h:{x:3.8249999999999997,y:2.208364779650318,gap:60,rot:-180,cor:"ambar"},i:{x:-2.55,y:0,gap:60,rot:105,cor:"menta"}},travas:[{dono:"b",alvo:"d"},{dono:"c",alvo:"a"},{dono:"d",alvo:"h"},{dono:"i",alvo:"a"},{dono:"a",alvo:"f"},{dono:"b",alvo:"a"},{dono:"b",alvo:"g"},{dono:"d",alvo:"e"},{dono:"b",alvo:"h"},{dono:"c",alvo:"f"},{dono:"h",alvo:"e"}],dificil:!1,amigo:"coelho",bioma:"deserto"},{nome:"F59",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:-1.275,y:-2.208364779650318,gap:64,rot:-15,cor:"ambar"},c:{x:1.275,y:2.208364779650318,gap:64,rot:105,cor:"menta",gemeo:"e"},d:{x:-2.55,y:0,gap:64,rot:-180,cor:"azul"},e:{x:-3.8249999999999997,y:-2.208364779650318,gap:64,rot:-135,cor:"menta",gemeo:"c"},f:{x:2.55,y:0,gap:64,rot:60,cor:"lima"}},travas:[{dono:"e",alvo:"d"},{dono:"a",alvo:"f"},{dono:"d",alvo:"b"},{dono:"a",alvo:"c"},{dono:"a",alvo:"b"},{dono:"f",alvo:"c"},{dono:"a",alvo:"d"}],dificil:!1,amigo:"cervo",bioma:"deserto"},{nome:"F60",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:-1.275,y:-2.208364779650318,gap:58,rot:60,cor:"roxo"},c:{x:-3.8249999999999997,y:-2.208364779650318,gap:58,rot:120,cor:"lima"},d:{x:1.275,y:-2.208364779650318,fechado:!0,cor:"tronco"},e:{x:-2.55,y:0,gap:58,rot:-60,cor:"coral"},f:{x:1.275,y:2.208364779650318,gap:58,rot:75,cor:"menta",gemeo:"g"},g:{x:3.8249999999999997,y:-2.208364779650318,gap:58,rot:-45,cor:"menta",gemeo:"f"},h:{x:2.55,y:0,gap:58,rot:15,cor:"roxo",gemeo:"i"},i:{x:-6.375,y:-2.208364779650318,gap:58,rot:120,cor:"roxo",gemeo:"h"},j:{x:-1.275,y:2.208364779650318,gap:58,rot:60,cor:"lima"}},travas:[{dono:"h",alvo:"g"},{dono:"e",alvo:"j"},{dono:"c",alvo:"e"},{dono:"j",alvo:"f"},{dono:"d",alvo:"b"},{dono:"a",alvo:"f"},{dono:"d",alvo:"h"},{dono:"h",alvo:"f"},{dono:"c",alvo:"i"},{dono:"a",alvo:"e"},{dono:"c",alvo:"b"},{dono:"d",alvo:"g"},{dono:"a",alvo:"j"}],dificil:!0,amigo:"coruja",bioma:"deserto"},{nome:"F61",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:-1.275,y:2.208364779650318,gap:66,rot:67.5,cor:"azul"},c:{x:2.55,y:0,fechado:!0,cor:"tronco"},d:{x:3.8249999999999997,y:-2.208364779650318,gap:66,rot:45,cor:"roxo",gemeo:"e"},e:{x:1.275,y:2.208364779650318,gap:66,rot:7.5,cor:"roxo",gemeo:"d"},f:{x:1.275,y:-2.208364779650318,gap:66,rot:-7.5,cor:"coral"}},travas:[{dono:"a",alvo:"b"},{dono:"c",alvo:"d"},{dono:"c",alvo:"e"},{dono:"c",alvo:"f"},{dono:"a",alvo:"e"},{dono:"a",alvo:"f"},{dono:"e",alvo:"b"}],dificil:!1,amigo:"passarinho",bioma:"deserto"},{nome:"F62",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:1.275,y:-2.208364779650318,gap:64,rot:-150,cor:"roxo"},c:{x:3.8249999999999997,y:-2.208364779650318,gap:64,rot:-120,cor:"lima"},d:{x:5.1,y:0,fechado:!0,cor:"tronco"},e:{x:3.8249999999999997,y:2.208364779650318,gap:64,rot:-120,cor:"coral"},f:{x:6.375,y:2.208364779650318,gap:64,rot:45,cor:"menta",gemeo:"g"},g:{x:-1.275,y:2.208364779650318,gap:64,rot:165,cor:"menta",gemeo:"f"}},travas:[{dono:"a",alvo:"g"},{dono:"f",alvo:"e"},{dono:"d",alvo:"c"},{dono:"c",alvo:"b"},{dono:"a",alvo:"b"},{dono:"d",alvo:"f"},{dono:"d",alvo:"e"}],dificil:!1,amigo:"esquilo",bioma:"deserto"},{nome:"F63",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:-1.275,y:-2.208364779650318,fechado:!0,cor:"tronco"},c:{x:1.275,y:-2.208364779650318,gap:62,rot:-15,cor:"coral"},d:{x:-2.55,y:0,gap:62,rot:-60,cor:"roxo",gemeo:"g"},e:{x:2.55,y:0,gap:62,rot:-60,cor:"azul",gemeo:"f"},f:{x:-3.8249999999999997,y:-2.208364779650318,gap:62,rot:120,cor:"azul",gemeo:"e"},g:{x:3.8249999999999997,y:2.208364779650318,gap:62,rot:15,cor:"roxo",gemeo:"d"},h:{x:1.275,y:2.208364779650318,gap:62,rot:120,cor:"lima"}},travas:[{dono:"e",alvo:"h"},{dono:"a",alvo:"e"},{dono:"h",alvo:"g"},{dono:"a",alvo:"c"},{dono:"b",alvo:"f"},{dono:"b",alvo:"c"},{dono:"f",alvo:"d"},{dono:"a",alvo:"h"},{dono:"e",alvo:"g"},{dono:"e",alvo:"c"}],dificil:!1,amigo:"ourico",bioma:"deserto"},{nome:"F64",aneis:{a:{x:0,y:0,gap:62,rot:-180,cor:"roxo"},b:{x:-1.275,y:2.208364779650318,gap:62,rot:-165,cor:"coral",gemeo:"d"},c:{x:1.275,y:2.208364779650318,fechado:!0,cor:"tronco"},d:{x:3.8249999999999997,y:2.208364779650318,gap:62,rot:-120,cor:"coral",gemeo:"b"},e:{x:2.55,y:0,gap:62,rot:-120,cor:"ambar"},f:{x:5.1,y:0,gap:62,rot:-75,cor:"menta"}},travas:[{dono:"f",alvo:"e"},{dono:"c",alvo:"d"},{dono:"a",alvo:"b"},{dono:"f",alvo:"d"},{dono:"c",alvo:"b"},{dono:"c",alvo:"a"},{dono:"a",alvo:"e"}],dificil:!1,amigo:"coelho",bioma:"deserto"},{nome:"F65",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:-1.275,y:-2.208364779650318,gap:60,rot:0,cor:"azul",gemeo:"c"},c:{x:-1.275,y:2.208364779650318,gap:60,rot:0,cor:"azul",gemeo:"b"},d:{x:-2.55,y:0,gap:60,rot:-120,cor:"lima"},e:{x:2.55,y:0,gap:60,rot:75,cor:"coral",gemeo:"h"},f:{x:5.1,y:0,gap:60,rot:30,cor:"ambar"},g:{x:1.275,y:-2.208364779650318,fechado:!0,cor:"tronco"},h:{x:-3.8249999999999997,y:2.208364779650318,gap:60,rot:-120,cor:"coral",gemeo:"e"},i:{x:3.8249999999999997,y:-2.208364779650318,gap:60,rot:0,cor:"azul"}},travas:[{dono:"b",alvo:"d"},{dono:"h",alvo:"d"},{dono:"c",alvo:"d"},{dono:"f",alvo:"i"},{dono:"a",alvo:"e"},{dono:"a",alvo:"c"},{dono:"g",alvo:"e"},{dono:"e",alvo:"f"},{dono:"a",alvo:"b"},{dono:"g",alvo:"i"},{dono:"a",alvo:"d"}],dificil:!0,amigo:"cervo",bioma:"deserto"},{nome:"F66",aneis:{a:{x:0,y:0,gap:60,rot:0,cor:"lima",gemeo:"h"},b:{x:-2.55,y:0,gap:60,rot:60,cor:"roxo",gemeo:"e"},c:{x:-5.1,y:0,gap:60,rot:-60,cor:"menta"},d:{x:-6.375,y:-2.208364779650318,gap:60,rot:-75,cor:"azul"},e:{x:1.275,y:-2.208364779650318,gap:60,rot:60,cor:"roxo",gemeo:"b"},f:{x:-3.8249999999999997,y:-2.208364779650318,fechado:!0,cor:"tronco"},g:{x:-1.275,y:-2.208364779650318,fechado:!0,cor:"tronco"},h:{x:3.8249999999999997,y:-2.208364779650318,gap:60,rot:120,cor:"lima",gemeo:"a"}},travas:[{dono:"a",alvo:"e"},{dono:"a",alvo:"b"},{dono:"g",alvo:"a"},{dono:"f",alvo:"d"},{dono:"f",alvo:"b"},{dono:"b",alvo:"c"},{dono:"h",alvo:"e"},{dono:"g",alvo:"e"},{dono:"g",alvo:"b"},{dono:"d",alvo:"c"}],dificil:!1,amigo:"coruja",bioma:"deserto"},{nome:"F67",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:1.275,y:-2.208364779650318,fechado:!0,cor:"tronco"},c:{x:-1.275,y:-2.208364779650318,gap:60,rot:60,cor:"azul",gemeo:"g"},d:{x:3.8249999999999997,y:-2.208364779650318,gap:60,rot:-90,cor:"roxo",gemeo:"h"},e:{x:1.275,y:2.208364779650318,gap:60,rot:120,cor:"lima"},f:{x:-2.55,y:0,gap:60,rot:60,cor:"coral"},g:{x:-1.275,y:2.208364779650318,gap:60,rot:105,cor:"azul",gemeo:"c"},h:{x:-3.8249999999999997,y:-2.208364779650318,gap:60,rot:75,cor:"roxo",gemeo:"d"},i:{x:2.55,y:0,gap:60,rot:30,cor:"azul"}},travas:[{dono:"a",alvo:"g"},{dono:"b",alvo:"i"},{dono:"g",alvo:"e"},{dono:"c",alvo:"f"},{dono:"a",alvo:"f"},{dono:"b",alvo:"c"},{dono:"c",alvo:"h"},{dono:"d",alvo:"i"},{dono:"e",alvo:"i"},{dono:"a",alvo:"i"},{dono:"a",alvo:"e"}],dificil:!1,amigo:"passarinho",bioma:"deserto"},{nome:"F68",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:1.275,y:2.208364779650318,gap:58,rot:150,cor:"menta"},c:{x:2.55,y:0,gap:58,rot:60,cor:"azul"},d:{x:-2.55,y:0,fechado:!0,cor:"tronco"},e:{x:-1.275,y:2.208364779650318,gap:58,rot:0,cor:"lima",gemeo:"f"},f:{x:-5.1,y:0,gap:58,rot:120,cor:"lima",gemeo:"e"},g:{x:-1.275,y:-2.208364779650318,gap:58,rot:-120,cor:"coral",gemeo:"j"},h:{x:-3.8249999999999997,y:-2.208364779650318,gap:58,rot:-60,cor:"menta",gemeo:"i"},i:{x:5.1,y:0,gap:58,rot:60,cor:"menta",gemeo:"h"},j:{x:3.8249999999999997,y:2.208364779650318,gap:58,rot:0,cor:"coral",gemeo:"g"}},travas:[{dono:"i",alvo:"j"},{dono:"a",alvo:"g"},{dono:"c",alvo:"b"},{dono:"a",alvo:"c"},{dono:"a",alvo:"e"},{dono:"h",alvo:"g"},{dono:"d",alvo:"f"},{dono:"d",alvo:"h"},{dono:"c",alvo:"i"},{dono:"d",alvo:"e"},{dono:"a",alvo:"b"},{dono:"d",alvo:"g"},{dono:"j",alvo:"b"}],dificil:!1,amigo:"esquilo",bioma:"deserto"},{nome:"F69",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:-2.55,y:0,fechado:!0,cor:"tronco"},c:{x:-1.275,y:-2.208364779650318,gap:62,rot:-135,cor:"azul"},d:{x:1.275,y:-2.208364779650318,gap:62,rot:-135,cor:"roxo"},e:{x:-5.1,y:0,gap:62,rot:-105,cor:"lima"},f:{x:2.55,y:0,gap:62,rot:120,cor:"ambar",gemeo:"g"},g:{x:-1.275,y:2.208364779650318,gap:62,rot:0,cor:"ambar",gemeo:"f"}},travas:[{dono:"a",alvo:"f"},{dono:"a",alvo:"d"},{dono:"a",alvo:"c"},{dono:"a",alvo:"g"},{dono:"b",alvo:"e"},{dono:"b",alvo:"g"},{dono:"f",alvo:"d"},{dono:"b",alvo:"c"}],dificil:!1,amigo:"ourico",bioma:"deserto"},{nome:"F70",aneis:{a:{x:0,y:0,gap:58,rot:-120,cor:"lima",gemeo:"g"},b:{x:-1.275,y:2.208364779650318,gap:58,rot:90,cor:"ambar",gemeo:"i"},c:{x:-2.55,y:0,fechado:!0,cor:"tronco"},d:{x:-3.8249999999999997,y:2.208364779650318,gap:58,rot:-60,cor:"coral",gemeo:"h"},e:{x:1.275,y:2.208364779650318,fechado:!0,cor:"tronco"},f:{x:-5.1,y:0,fechado:!0,cor:"tronco"},g:{x:-3.8249999999999997,y:-2.208364779650318,gap:58,rot:-15,cor:"lima",gemeo:"a"},h:{x:2.55,y:0,gap:58,rot:-105,cor:"coral",gemeo:"d"},i:{x:-6.375,y:2.208364779650318,gap:58,rot:0,cor:"ambar",gemeo:"b"},j:{x:5.1,y:0,gap:58,rot:60,cor:"menta"},k:{x:3.8249999999999997,y:2.208364779650318,gap:58,rot:120,cor:"azul"}},travas:[{dono:"c",alvo:"a"},{dono:"b",alvo:"d"},{dono:"e",alvo:"h"},{dono:"h",alvo:"j"},{dono:"e",alvo:"a"},{dono:"c",alvo:"g"},{dono:"k",alvo:"j"},{dono:"f",alvo:"i"},{dono:"e",alvo:"b"},{dono:"f",alvo:"g"},{dono:"h",alvo:"k"},{dono:"a",alvo:"h"},{dono:"e",alvo:"k"},{dono:"a",alvo:"b"}],dificil:!0,amigo:"coelho",bioma:"deserto"},{nome:"F71",aneis:{a:{x:0,y:0,gap:68,rot:45,cor:"coral"},b:{x:1.275,y:-2.208364779650318,fechado:!0,cor:"tronco"},c:{x:3.8249999999999997,y:-2.208364779650318,gap:68,rot:-105,cor:"ambar"},d:{x:5.1,y:0,gap:68,rot:172.5,cor:"menta",agua:!0},e:{x:-2.55,y:0,gap:68,rot:120,cor:"azul",agua:!0}},travas:[{dono:"b",alvo:"a"},{dono:"e",alvo:"a"},{dono:"d",alvo:"c"},{dono:"b",alvo:"c"}],dificil:!1,amigo:"cervo",bioma:"mar",mare:!0},{nome:"F72",aneis:{a:{x:0,y:0,gap:66,rot:-67.5,cor:"menta",agua:!0},b:{x:-2.55,y:0,gap:66,rot:67.5,cor:"ambar"},c:{x:-5.1,y:0,gap:66,rot:105,cor:"menta"},d:{x:2.55,y:0,fechado:!0,cor:"tronco"},e:{x:5.1,y:0,gap:66,rot:0,cor:"azul",agua:!0},f:{x:3.8249999999999997,y:2.208364779650318,gap:66,rot:172.5,cor:"roxo"}},travas:[{dono:"d",alvo:"a"},{dono:"a",alvo:"b"},{dono:"e",alvo:"f"},{dono:"c",alvo:"b"},{dono:"d",alvo:"f"},{dono:"d",alvo:"e"}],dificil:!1,amigo:"coruja",bioma:"mar",mare:!0},{nome:"F73",aneis:{a:{x:0,y:0,gap:64,rot:90,cor:"menta",agua:!0},b:{x:1.275,y:-2.208364779650318,gap:64,rot:-180,cor:"azul",agua:!0},c:{x:-2.55,y:0,gap:64,rot:60,cor:"roxo"},d:{x:3.8249999999999997,y:-2.208364779650318,gap:64,rot:120,cor:"lima"},e:{x:5.1,y:0,gap:64,rot:-15,cor:"coral"},f:{x:2.55,y:0,fechado:!0,cor:"tronco"},g:{x:-5.1,y:0,gap:64,rot:-90,cor:"ambar"}},travas:[{dono:"g",alvo:"c"},{dono:"d",alvo:"e"},{dono:"f",alvo:"b"},{dono:"f",alvo:"a"},{dono:"d",alvo:"b"},{dono:"a",alvo:"c"},{dono:"a",alvo:"b"},{dono:"f",alvo:"e"}],dificil:!1,amigo:"passarinho",bioma:"mar",mare:!0},{nome:"F74",aneis:{a:{x:0,y:0,gap:64,rot:-105,cor:"coral"},b:{x:-1.275,y:2.208364779650318,gap:64,rot:-120,cor:"ambar"},c:{x:-3.8249999999999997,y:2.208364779650318,gap:64,rot:150,cor:"azul",agua:!0},d:{x:-5.1,y:0,gap:64,rot:-60,cor:"menta",agua:!0},e:{x:-6.375,y:-2.208364779650318,gap:64,rot:-180,cor:"roxo"}},travas:[{dono:"b",alvo:"a"},{dono:"d",alvo:"e"},{dono:"d",alvo:"c"},{dono:"b",alvo:"c"}],dificil:!1,amigo:"esquilo",bioma:"mar",mare:!0},{nome:"F75",aneis:{a:{x:0,y:0,gap:62,rot:-120,cor:"menta"},b:{x:-1.275,y:2.208364779650318,gap:62,rot:-180,cor:"azul",agua:!0},c:{x:2.55,y:0,fechado:!0,cor:"tronco"},d:{x:-2.55,y:0,gap:62,rot:-120,cor:"roxo"},e:{x:3.8249999999999997,y:2.208364779650318,gap:62,rot:0,cor:"azul",agua:!0},f:{x:1.275,y:-2.208364779650318,gap:62,rot:-75,cor:"coral"},g:{x:5.1,y:0,gap:62,rot:-90,cor:"menta",agua:!0},h:{x:1.275,y:2.208364779650318,gap:62,rot:-120,cor:"menta"}},travas:[{dono:"b",alvo:"h"},{dono:"c",alvo:"e"},{dono:"h",alvo:"e"},{dono:"b",alvo:"a"},{dono:"b",alvo:"d"},{dono:"g",alvo:"e"},{dono:"f",alvo:"a"},{dono:"d",alvo:"a"},{dono:"c",alvo:"h"},{dono:"c",alvo:"a"}],dificil:!0,amigo:"ourico",bioma:"mar",mare:!0},{nome:"F76",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:2.55,y:0,gap:62,rot:120,cor:"menta"},c:{x:1.275,y:2.208364779650318,gap:62,rot:120,cor:"azul"},d:{x:-1.275,y:2.208364779650318,gap:62,rot:-180,cor:"roxo"},e:{x:-2.55,y:0,gap:62,rot:-90,cor:"lima"},f:{x:-3.8249999999999997,y:-2.208364779650318,gap:62,rot:60,cor:"menta",agua:!0},g:{x:-5.1,y:0,gap:62,rot:-120,cor:"azul",agua:!0}},travas:[{dono:"a",alvo:"c"},{dono:"a",alvo:"e"},{dono:"g",alvo:"e"},{dono:"d",alvo:"c"},{dono:"a",alvo:"b"},{dono:"g",alvo:"f"},{dono:"d",alvo:"e"},{dono:"a",alvo:"d"}],dificil:!1,amigo:"coelho",bioma:"mar",mare:!0},{nome:"F77",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:2.55,y:0,gap:62,rot:-60,cor:"azul",agua:!0},c:{x:-1.275,y:2.208364779650318,gap:62,rot:-60,cor:"azul"},d:{x:-1.275,y:-2.208364779650318,gap:62,rot:-60,cor:"roxo"},e:{x:-2.55,y:0,gap:62,rot:120,cor:"lima"},f:{x:3.8249999999999997,y:-2.208364779650318,gap:62,rot:-45,cor:"azul",agua:!0},g:{x:1.275,y:-2.208364779650318,gap:62,rot:-120,cor:"menta",agua:!0},h:{x:-3.8249999999999997,y:2.208364779650318,gap:62,rot:60,cor:"menta"}},travas:[{dono:"a",alvo:"d"},{dono:"g",alvo:"d"},{dono:"f",alvo:"g"},{dono:"e",alvo:"d"},{dono:"g",alvo:"b"},{dono:"e",alvo:"c"},{dono:"h",alvo:"c"},{dono:"a",alvo:"g"},{dono:"a",alvo:"e"},{dono:"a",alvo:"b"}],dificil:!1,amigo:"cervo",bioma:"mar",mare:!0},{nome:"F78",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:-1.275,y:2.208364779650318,gap:60,rot:-60,cor:"azul",agua:!0},c:{x:1.275,y:2.208364779650318,gap:60,rot:0,cor:"menta",agua:!0},d:{x:2.55,y:0,gap:60,rot:-120,cor:"azul",agua:!0},e:{x:1.275,y:-2.208364779650318,gap:60,rot:60,cor:"roxo"},f:{x:-1.275,y:-2.208364779650318,gap:60,rot:-120,cor:"lima"},g:{x:3.8249999999999997,y:-2.208364779650318,gap:60,rot:-120,cor:"coral"},h:{x:-3.8249999999999997,y:-2.208364779650318,gap:60,rot:60,cor:"ambar"},i:{x:6.375,y:-2.208364779650318,gap:60,rot:0,cor:"menta"}},travas:[{dono:"c",alvo:"b"},{dono:"a",alvo:"e"},{dono:"e",alvo:"g"},{dono:"a",alvo:"c"},{dono:"a",alvo:"d"},{dono:"e",alvo:"f"},{dono:"h",alvo:"f"},{dono:"g",alvo:"i"},{dono:"c",alvo:"d"},{dono:"g",alvo:"d"},{dono:"a",alvo:"f"}],dificil:!1,amigo:"coruja",bioma:"mar",mare:!0},{nome:"F79",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:2.55,y:0,gap:64,rot:120,cor:"coral"},c:{x:-2.55,y:0,gap:64,rot:-60,cor:"ambar"},d:{x:-5.1,y:0,gap:64,rot:-90,cor:"menta"},e:{x:-6.375,y:2.208364779650318,gap:64,rot:-180,cor:"menta",agua:!0},f:{x:3.8249999999999997,y:-2.208364779650318,gap:64,rot:30,cor:"azul",agua:!0}},travas:[{dono:"d",alvo:"e"},{dono:"d",alvo:"c"},{dono:"a",alvo:"c"},{dono:"f",alvo:"b"},{dono:"a",alvo:"b"}],dificil:!1,amigo:"passarinho",bioma:"mar",mare:!0},{nome:"F80",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:1.275,y:2.208364779650318,gap:58,rot:-60,cor:"menta",agua:!0},c:{x:1.275,y:-2.208364779650318,gap:58,rot:-180,cor:"azul"},d:{x:2.55,y:0,fechado:!0,cor:"tronco"},e:{x:-1.275,y:-2.208364779650318,gap:58,rot:-180,cor:"azul",agua:!0},f:{x:-1.275,y:2.208364779650318,gap:58,rot:-60,cor:"azul",agua:!0},g:{x:3.8249999999999997,y:2.208364779650318,gap:58,rot:120,cor:"coral"},h:{x:-2.55,y:0,gap:58,rot:-120,cor:"ambar"},i:{x:3.8249999999999997,y:-2.208364779650318,gap:58,rot:60,cor:"menta"},j:{x:-5.1,y:0,gap:58,rot:75,cor:"azul"}},travas:[{dono:"i",alvo:"c"},{dono:"g",alvo:"b"},{dono:"h",alvo:"e"},{dono:"h",alvo:"f"},{dono:"a",alvo:"b"},{dono:"d",alvo:"i"},{dono:"d",alvo:"g"},{dono:"h",alvo:"j"},{dono:"a",alvo:"h"},{dono:"d",alvo:"c"},{dono:"a",alvo:"c"},{dono:"a",alvo:"e"},{dono:"b",alvo:"f"}],dificil:!0,amigo:"esquilo",bioma:"mar",mare:!0},{nome:"F81",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:2.55,y:0,fechado:!0,cor:"tronco"},c:{x:1.275,y:-2.208364779650318,gap:66,rot:-7.5,cor:"coral"},d:{x:1.275,y:2.208364779650318,gap:66,rot:7.5,cor:"azul",agua:!0},e:{x:-1.275,y:-2.208364779650318,gap:66,rot:-112.5,cor:"menta",agua:!0},f:{x:-3.8249999999999997,y:-2.208364779650318,gap:66,rot:165,cor:"azul"}},travas:[{dono:"b",alvo:"c"},{dono:"a",alvo:"c"},{dono:"e",alvo:"f"},{dono:"e",alvo:"c"},{dono:"a",alvo:"d"},{dono:"a",alvo:"e"},{dono:"b",alvo:"d"}],dificil:!1,amigo:"ourico",bioma:"mar",mare:!0},{nome:"F82",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:-1.275,y:-2.208364779650318,gap:64,rot:-60,cor:"azul",agua:!0},c:{x:-1.275,y:2.208364779650318,gap:64,rot:-120,cor:"menta",agua:!0},d:{x:1.275,y:2.208364779650318,fechado:!0,cor:"tronco"},e:{x:3.8249999999999997,y:2.208364779650318,gap:64,rot:-120,cor:"roxo"},f:{x:1.275,y:-2.208364779650318,gap:64,rot:60,cor:"lima"},g:{x:5.1,y:0,gap:64,rot:-180,cor:"coral"}},travas:[{dono:"a",alvo:"f"},{dono:"a",alvo:"b"},{dono:"a",alvo:"c"},{dono:"d",alvo:"e"},{dono:"d",alvo:"c"},{dono:"e",alvo:"g"},{dono:"b",alvo:"f"}],dificil:!1,amigo:"coelho",bioma:"mar",mare:!0},{nome:"F83",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:-2.55,y:0,gap:62,rot:135,cor:"coral"},c:{x:-1.275,y:-2.208364779650318,gap:62,rot:-105,cor:"ambar"},d:{x:-1.275,y:2.208364779650318,gap:62,rot:0,cor:"menta",agua:!0},e:{x:2.55,y:0,fechado:!0,cor:"tronco"},f:{x:1.275,y:-2.208364779650318,gap:62,rot:-120,cor:"azul",agua:!0},g:{x:3.8249999999999997,y:-2.208364779650318,gap:62,rot:60,cor:"roxo"},h:{x:3.8249999999999997,y:2.208364779650318,gap:62,rot:15,cor:"lima"}},travas:[{dono:"e",alvo:"f"},{dono:"a",alvo:"d"},{dono:"c",alvo:"f"},{dono:"e",alvo:"g"},{dono:"a",alvo:"b"},{dono:"a",alvo:"c"},{dono:"e",alvo:"h"},{dono:"a",alvo:"f"},{dono:"c",alvo:"b"},{dono:"f",alvo:"g"}],dificil:!1,amigo:"cervo",bioma:"mar",mare:!0},{nome:"F84",aneis:{a:{x:0,y:0,gap:62,rot:-180,cor:"azul",agua:!0},b:{x:-1.275,y:2.208364779650318,gap:62,rot:-165,cor:"menta",agua:!0},c:{x:1.275,y:-2.208364779650318,gap:62,rot:-90,cor:"roxo"},d:{x:1.275,y:2.208364779650318,gap:62,rot:0,cor:"lima"},e:{x:2.55,y:0,fechado:!0,cor:"tronco"},f:{x:5.1,y:0,gap:62,rot:120,cor:"coral"}},travas:[{dono:"e",alvo:"c"},{dono:"e",alvo:"f"},{dono:"e",alvo:"d"},{dono:"c",alvo:"a"},{dono:"b",alvo:"a"},{dono:"d",alvo:"a"},{dono:"b",alvo:"d"}],dificil:!1,amigo:"coruja",bioma:"mar",mare:!0},{nome:"F85",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:2.55,y:0,fechado:!0,cor:"tronco"},c:{x:5.1,y:0,gap:60,rot:-30,cor:"azul",agua:!0},d:{x:-2.55,y:0,gap:60,rot:-120,cor:"ambar"},e:{x:-1.275,y:-2.208364779650318,gap:60,rot:-180,cor:"menta",agua:!0},f:{x:-1.275,y:2.208364779650318,gap:60,rot:60,cor:"azul",agua:!0},g:{x:1.275,y:2.208364779650318,gap:60,rot:120,cor:"roxo"},h:{x:3.8249999999999997,y:-2.208364779650318,gap:60,rot:0,cor:"lima"},i:{x:3.8249999999999997,y:2.208364779650318,gap:60,rot:-15,cor:"coral"}},travas:[{dono:"d",alvo:"f"},{dono:"g",alvo:"i"},{dono:"b",alvo:"c"},{dono:"a",alvo:"f"},{dono:"a",alvo:"e"},{dono:"h",alvo:"c"},{dono:"b",alvo:"i"},{dono:"g",alvo:"f"},{dono:"b",alvo:"g"},{dono:"b",alvo:"h"},{dono:"e",alvo:"d"}],dificil:!0,amigo:"passarinho",bioma:"mar",mare:!0},{nome:"F86",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:-2.55,y:0,fechado:!0,cor:"tronco"},c:{x:-3.8249999999999997,y:2.208364779650318,gap:60,rot:165,cor:"ambar"},d:{x:-3.8249999999999997,y:-2.208364779650318,gap:60,rot:-45,cor:"menta"},e:{x:1.275,y:-2.208364779650318,gap:60,rot:-150,cor:"menta",agua:!0},f:{x:-1.275,y:2.208364779650318,gap:60,rot:0,cor:"azul",agua:!0},g:{x:-5.1,y:0,gap:60,rot:165,cor:"lima"},h:{x:2.55,y:0,gap:60,rot:120,cor:"coral"}},travas:[{dono:"g",alvo:"d"},{dono:"b",alvo:"d"},{dono:"h",alvo:"e"},{dono:"a",alvo:"h"},{dono:"g",alvo:"c"},{dono:"a",alvo:"f"},{dono:"c",alvo:"f"},{dono:"b",alvo:"g"},{dono:"a",alvo:"e"},{dono:"b",alvo:"c"}],dificil:!1,amigo:"esquilo",bioma:"mar",mare:!0},{nome:"F87",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:-1.275,y:2.208364779650318,gap:60,rot:-180,cor:"coral"},c:{x:2.55,y:0,fechado:!0,cor:"tronco"},d:{x:-2.55,y:0,gap:60,rot:-150,cor:"azul",agua:!0},e:{x:3.8249999999999997,y:-2.208364779650318,gap:60,rot:-180,cor:"menta",agua:!0},f:{x:1.275,y:2.208364779650318,gap:60,rot:120,cor:"azul"},g:{x:6.375,y:-2.208364779650318,gap:60,rot:-75,cor:"roxo"},h:{x:5.1,y:0,gap:60,rot:90,cor:"azul",agua:!0},i:{x:-1.275,y:-2.208364779650318,gap:60,rot:-90,cor:"coral"}},travas:[{dono:"c",alvo:"h"},{dono:"g",alvo:"h"},{dono:"d",alvo:"i"},{dono:"b",alvo:"f"},{dono:"e",alvo:"h"},{dono:"a",alvo:"f"},{dono:"a",alvo:"i"},{dono:"c",alvo:"f"},{dono:"b",alvo:"d"},{dono:"a",alvo:"d"},{dono:"a",alvo:"b"}],dificil:!1,amigo:"ourico",bioma:"mar",mare:!0},{nome:"F88",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:-1.275,y:2.208364779650318,gap:58,rot:105,cor:"menta",agua:!0},c:{x:1.275,y:2.208364779650318,gap:58,rot:0,cor:"coral"},d:{x:-3.8249999999999997,y:2.208364779650318,gap:58,rot:60,cor:"ambar"},e:{x:1.275,y:-2.208364779650318,gap:58,rot:75,cor:"menta"},f:{x:-2.55,y:0,fechado:!0,cor:"tronco"},g:{x:-1.275,y:-2.208364779650318,gap:58,rot:-90,cor:"azul",agua:!0},h:{x:2.55,y:0,gap:58,rot:-120,cor:"roxo"},i:{x:-6.375,y:2.208364779650318,gap:58,rot:165,cor:"azul",agua:!0},j:{x:-5.1,y:0,gap:58,rot:-60,cor:"coral"}},travas:[{dono:"d",alvo:"i"},{dono:"f",alvo:"b"},{dono:"a",alvo:"h"},{dono:"c",alvo:"h"},{dono:"b",alvo:"d"},{dono:"j",alvo:"i"},{dono:"a",alvo:"g"},{dono:"a",alvo:"b"},{dono:"e",alvo:"g"},{dono:"d",alvo:"j"},{dono:"f",alvo:"d"},{dono:"f",alvo:"j"},{dono:"b",alvo:"c"}],dificil:!1,amigo:"coelho",bioma:"mar",mare:!0},{nome:"F89",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:-1.275,y:-2.208364779650318,gap:62,rot:60,cor:"coral"},c:{x:-1.275,y:2.208364779650318,gap:62,rot:15,cor:"ambar"},d:{x:-3.8249999999999997,y:2.208364779650318,gap:62,rot:-120,cor:"azul",agua:!0},e:{x:1.275,y:-2.208364779650318,gap:62,rot:15,cor:"menta",agua:!0},f:{x:-6.375,y:2.208364779650318,gap:62,rot:-105,cor:"roxo"},g:{x:-2.55,y:0,fechado:!0,cor:"tronco"}},travas:[{dono:"g",alvo:"c"},{dono:"c",alvo:"d"},{dono:"g",alvo:"b"},{dono:"f",alvo:"d"},{dono:"a",alvo:"c"},{dono:"a",alvo:"e"},{dono:"b",alvo:"e"},{dono:"g",alvo:"d"}],dificil:!1,amigo:"cervo",bioma:"mar",mare:!0},{nome:"F90",aneis:{a:{x:0,y:0,fechado:!0,cor:"tronco"},b:{x:1.275,y:-2.208364779650318,gap:58,rot:-180,cor:"azul"},c:{x:3.8249999999999997,y:-2.208364779650318,gap:58,rot:-60,cor:"roxo"},d:{x:2.55,y:0,fechado:!0,cor:"tronco"},e:{x:3.8249999999999997,y:2.208364779650318,gap:58,rot:0,cor:"lima"},f:{x:5.1,y:0,gap:58,rot:-60,cor:"azul",agua:!0},g:{x:-2.55,y:0,gap:58,rot:120,cor:"ambar"},h:{x:1.275,y:2.208364779650318,fechado:!0,cor:"tronco"},i:{x:-1.275,y:2.208364779650318,gap:58,rot:90,cor:"menta"},j:{x:-5.1,y:0,gap:58,rot:-150,cor:"azul",agua:!0},k:{x:-3.8249999999999997,y:-2.208364779650318,gap:58,rot:-180,cor:"menta",agua:!0}},travas:[{dono:"h",alvo:"i"},{dono:"a",alvo:"b"},{dono:"g",alvo:"j"},{dono:"a",alvo:"i"},{dono:"a",alvo:"g"},{dono:"c",alvo:"b"},{dono:"j",alvo:"k"},{dono:"h",alvo:"e"},{dono:"d",alvo:"c"},{dono:"f",alvo:"c"},{dono:"g",alvo:"k"},{dono:"e",alvo:"f"},{dono:"d",alvo:"e"},{dono:"d",alvo:"b"}],dificil:!0,amigo:"coruja",bioma:"mar",mare:!0}];var Ot=2.55,$n=Ot*.72,Py=[{nome:"F1",aneis:{a:{x:-Ot/2,y:0,gap:72,rot:180,cor:"azul"},b:{x:Ot/2,y:0,gap:72,rot:0,cor:"ambar"}},travas:[{dono:"a",alvo:"b"}],amigo:"passarinho"},{nome:"F2",aneis:{a:{x:-Ot,y:-.3,gap:70,rot:200,cor:"coral"},b:{x:0,y:.3,gap:70,rot:90,cor:"menta"},c:{x:Ot,y:-.3,gap:70,rot:300,cor:"roxo"}},travas:[{dono:"a",alvo:"b"},{dono:"b",alvo:"c"}],amigo:"esquilo"},{nome:"F3",aneis:{t:{x:0,y:0,fechado:!0,cor:"tronco"},a:{x:-Ot,y:0,gap:66,rot:90,cor:"azul"},b:{x:Ot*.5,y:Ot*.87,gap:66,rot:330,cor:"lima"},c:{x:Ot*.5,y:-Ot*.87,gap:66,rot:150,cor:"coral"}},travas:[{dono:"t",alvo:"a"},{dono:"t",alvo:"b"},{dono:"t",alvo:"c"}],amigo:"ourico"},{nome:"F4",aneis:{centro:{x:0,y:0,fechado:!0,cor:"tronco"},no:{x:-$n,y:$n,gap:64,rot:300,cor:"azul"},ne:{x:$n,y:$n,gap:64,rot:200,cor:"coral"},so:{x:-$n,y:-$n,gap:64,rot:20,cor:"ambar"},se:{x:$n,y:-$n,gap:64,rot:110,cor:"menta"},topo:{x:0,y:$n*2,gap:64,rot:250,cor:"lima"},dir:{x:$n*2,y:0,gap:64,rot:160,cor:"roxo"}},travas:[{dono:"centro",alvo:"no"},{dono:"centro",alvo:"ne"},{dono:"centro",alvo:"so"},{dono:"centro",alvo:"se"},{dono:"no",alvo:"topo"},{dono:"ne",alvo:"dir"},{dono:"ne",alvo:"topo"}],amigo:"coelho"},{nome:"F5",dificil:!0,aneis:{t:{x:0,y:0,fechado:!0,cor:"tronco"},a:{x:-Ot,y:0,gap:62,rot:0,cor:"azul"},b:{x:Ot,y:0,gap:62,rot:180,cor:"coral"},c:{x:-Ot*.5,y:Ot*.87,gap:62,rot:210,cor:"lima"},e:{x:Ot*.5,y:Ot*.87,gap:62,rot:300,cor:"roxo"},f:{x:-Ot*.5,y:-Ot*.87,gap:62,rot:120,cor:"ambar"},g:{x:Ot*.5,y:-Ot*.87,gap:62,rot:40,cor:"menta"},h:{x:0,y:Ot*1.74,gap:62,rot:90,cor:"azul"}},travas:[{dono:"t",alvo:"a"},{dono:"t",alvo:"b"},{dono:"a",alvo:"c"},{dono:"c",alvo:"h"},{dono:"e",alvo:"h"},{dono:"b",alvo:"e"},{dono:"a",alvo:"f"},{dono:"f",alvo:"g"},{dono:"b",alvo:"g"}],amigo:"cervo"}].map(Qc),al=[...Py,...$p,...Qp];var em=2.55,Iy=["coral","ambar","menta","azul","roxo","lima"],Fy=["passarinho","esquilo","ourico","coelho","cervo","coruja"],zu=1,fr=()=>((zu=zu*16807%2147483647)-1)/2147483646,tm=i=>i[Math.floor(fr()*i.length)],nm=[[4,1,2,70],[5,1,2,68],[6,1,3,66],[4,0,2,66],[7,1,3,64],[6,1,3,64],[7,1,3,64],[8,1,4,62],[5,1,2,66],[9,2,4,60]],Ly=(i,e)=>({x:em*(i+e/2),y:em*(e*Math.sqrt(3)/2)}),im=[[1,0],[-1,0],[0,1],[0,-1],[1,-1],[-1,1]],ku=(i,e)=>i+","+e;function Dy(i){let e=new Map([[ku(0,0),[0,0]]]);for(;e.size<i.aneis;){let[m,p]=tm([...e.values()]),[M,T]=tm(im),x=ku(m+M,p+T),S=p+T,E=m+M+S/2;!e.has(x)&&Math.abs(S)<=1&&Math.abs(E)<=2.6&&e.set(x,[m+M,S])}let t=[...e.keys()],n={};t.forEach((m,p)=>{n[m]=String.fromCharCode(97+p)});let r=[];for(let[m,[p,M]]of e)for(let[T,x]of im){let S=ku(p+T,M+x);e.has(S)&&m<S&&r.push([m,S])}let s=m=>r.filter(p=>p.includes(m)).length,o=new Set([...t].sort((m,p)=>s(p)-s(m)+(fr()-.5)*2).slice(0,i.troncos)),a={};for(let m of t)a[m]=o.has(m)?-1:fr();let c={},l=m=>c[m]===void 0||c[m]===m?m:c[m]=l(c[m]),h=[...r].sort(()=>fr()-.5),u=[];for(let[m,p]of h){if(o.has(m)&&o.has(p))continue;let M=l(m),T=l(p);M!==T&&(c[M]=T,u.push([m,p]))}for(let[m,p]of h){if(u.length>=t.length-1+Math.round(t.length*.35))break;o.has(m)&&o.has(p)||u.some(M=>M[0]===m&&M[1]===p)||u.push([m,p])}let d=u.map(([m,p])=>a[m]<a[p]?{dono:n[m],alvo:n[p]}:{dono:n[p],alvo:n[m]}),f={},g=Math.floor(fr()*6);for(let m of t){let p=Ly(...e.get(m));f[n[m]]=o.has(m)?{x:p.x,y:p.y,fechado:!0,cor:"tronco"}:{x:p.x,y:p.y,gap:i.gap,rot:Math.round(fr()*24)*15,cor:Iy[g++%6]}}let _={nome:"F"+i.n,aneis:f,travas:d,dificil:i.dificil||i.super,amigo:Fy[(i.n-1)%6]};return i.bioma&&i.bioma!=="floresta"&&(_.bioma=i.bioma,Ny(_,i)),Qc(_)}function Ny(i,e){let t=Object.keys(i.aneis).filter(r=>!i.aneis[r].fechado).sort(()=>fr()-.5),n=e.j||0;if(e.bioma==="gelo"){let r=Math.max(1,Math.min(t.length-2,1+Math.floor(n/5)));for(let s of t.slice(0,r))i.aneis[s].congelado=!0}if(e.bioma==="deserto"){let r=Math.max(1,Math.min(Math.floor(t.length/2)-1,1+Math.floor(n/8)));for(let s=0;s<r;s++){let o=t[s*2],a=t[s*2+1];if(!o||!a)break;i.aneis[o].gemeo=a,i.aneis[a].gemeo=o,i.aneis[a].cor=i.aneis[o].cor}}if(e.bioma==="mar"){i.mare=!0;let r=Math.max(1,Math.round(t.length*.4));t.slice(0,r).forEach((s,o)=>{i.aneis[s].agua=!0,i.aneis[s].cor=o%2?"menta":"azul"})}}function Uy(i){let e={},t=n=>e[n]??(e[n]=1+Math.max(0,...i.travas.filter(r=>r.dono===n).map(r=>t(r.alvo))));return Math.max(...Object.keys(i.aneis).map(t))}function Oy(i){let e=0;for(let t of i.travas)i.aneis[t.dono].cor===i.aneis[t.alvo].cor&&e++;return e}var rm=["floresta","gelo","deserto","mar"];function ps(i){return i<=30?"floresta":i<=90?rm[1+Math.floor((i-31)/20)]:rm[Math.floor((i-91)/20)%4]}function By(i){if(i>30){let c=(i-31)%20,l=c%10,h=1+Math.floor(c/10)+(i>90?1:0),[u,d,f,g]=nm[l];return{n:i,j:c,bioma:ps(i),aneis:Math.min(12,u+h),troncos:Math.min(3,d+(h>1?1:0)),prof:f+h-1,gap:Math.max(58,g-h*2),dificil:l===4,super:l===9,bonus:l===3||l===8}}let e=Math.floor((i-1)/10),t=(i-1)%10,[n,r,s,o]=nm[t],a=Math.min(e,4);return{n:i,aneis:Math.min(12,n+a*2),troncos:Math.min(3,r+(a>1?1:0)),prof:s+a,gap:Math.max(56,o-a*3),dificil:t===4,super:t===9,bonus:t===3||t===8}}function Gu(i,e=400){let t=By(i);zu=1e3+i*7919;let n=null,r=1e9;for(let s=0;s<e;s++){let o=Dy(t);if(!el(o).ok)continue;let c=Math.abs(Uy(o)-t.prof)*3+Oy(o)*2+Math.abs(Object.keys(o.aneis).length-t.aneis);if(c<r&&(r=c,n=o),r===0)break}return n}var Hu={pt:{musica:"M\xFAsica",floresta:"Floresta",gelo:"Gelo",deserto:"Deserto",mar:"Mar",colGelo:"Jardim de Gelo",colDeserto:"O\xE1sis do Pots",colMar:"Praia do Pots",mareEm:i=>i===1?"Mar\xE9 no pr\xF3ximo giro":`Mar\xE9 em ${i} giros`,entendi:"Entendi!",novoBioma:i=>`Novo lugar: ${i}!`,"regra.gelo":"An\xE9is congelados n\xE3o giram. Solte um anel vizinho e o gelo quebra.","regra.deserto":"Miragem! An\xE9is g\xEAmeos giram juntos, um para cada lado. Os dois precisam estar livres.","regra.mar":"A cada 3 giros vem a mar\xE9 e gira sozinha os an\xE9is de \xE1gua que estiverem livres.",fase:i=>`Fase ${i}`,minimo:i=>`m\xEDnimo ${i}`,giros:"Giros",faltam:i=>i===1?"Falta <b>1</b> fase":`Faltam <b>${i}</b> fases`,dica:"Dica",reiniciar:"Reiniciar",mira:"Mira",dificil:"DIF\xCDCIL",perfeito:"Perfeito!",muitoBem:"Muito bem!",conseguiu:"Conseguiu!",solucaoPerfeita:i=>`Solu\xE7\xE3o perfeita: <b>${i}</b> giros`,girosMin:(i,e)=>`<b>${i}</b> giros \xB7 m\xEDnimo poss\xEDvel ${e}`,proxima:"Pr\xF3xima fase",jardim:"Jardim do Pots",subtitulo:"Quebra-cabe\xE7a de an\xE9is",jogar:"JOGAR",ajustes:"Ajustes",som:"Som",ligado:"LIGADO",desligado:"DESLIGADO",creditos:"Cr\xE9ditos",fechar:"Fechar",novaPlanta:"Uma nova planta brotou no jardim!",toqueAnel:"Toque num anel para estour\xE1-lo",maisDica:"+1 Dica",maisMira:"+1 Mira",gratisVideo:"Gr\xE1tis com v\xEDdeo",bauAberto:i=>`Ba\xFA aberto! <b>+${i.moedas}</b> moedas \xB7 <b>+${i.dica}</b> Dicas \xB7 <b>+${i.mira}</b> Mira`},en:{musica:"Music",floresta:"Forest",gelo:"Ice",deserto:"Desert",mar:"Sea",colGelo:"Ice Garden",colDeserto:"Pots's Oasis",colMar:"Pots's Beach",mareEm:i=>i===1?"Tide on the next turn":`Tide in ${i} turns`,entendi:"Got it!",novoBioma:i=>`New place: ${i}!`,"regra.gelo":"Frozen rings cannot turn. Free a ring next to one and the ice breaks.","regra.deserto":"Mirage! Twin rings turn together, in opposite directions. Both must be free.","regra.mar":"Every 3 turns the tide comes in and turns the free water rings on its own.",fase:i=>`Level ${i}`,minimo:i=>`best ${i}`,giros:"Turns",faltam:i=>i===1?"<b>1</b> level to go":`<b>${i}</b> levels to go`,dica:"Hint",reiniciar:"Restart",mira:"Aim",dificil:"HARD",perfeito:"Perfect!",muitoBem:"Great job!",conseguiu:"You did it!",solucaoPerfeita:i=>`Perfect solution: <b>${i}</b> turns`,girosMin:(i,e)=>`<b>${i}</b> turns \xB7 best possible ${e}`,proxima:"Next level",jardim:"Pots's Garden",subtitulo:"Ring Puzzle",jogar:"PLAY",ajustes:"Settings",som:"Sound",ligado:"ON",desligado:"OFF",creditos:"Credits",fechar:"Close",novaPlanta:"A new plant sprouted in the garden!",toqueAnel:"Tap a ring to pop it",maisDica:"+1 Hint",maisMira:"+1 Aim",gratisVideo:"Free with a video",bauAberto:i=>`Chest opened! <b>+${i.moedas}</b> coins \xB7 <b>+${i.dica}</b> Hints \xB7 <b>+${i.mira}</b> Aim`},es:{musica:"M\xFAsica",gelo:"Hielo",deserto:"Desierto",mar:"Mar",colGelo:"Jard\xEDn de hielo",colDeserto:"Oasis de Pots",colMar:"Playa de Pots",mareEm:i=>i===1?"Marea en el pr\xF3ximo giro":`Marea en ${i} giros`,entendi:"\xA1Entendido!",novoBioma:i=>`\xA1Nuevo lugar: ${i}!`,"regra.gelo":"Los anillos congelados no pueden girar. Libera un anillo a su lado y el hielo se rompe.","regra.deserto":"\xA1Espejismo! Los anillos gemelos giran juntos, en sentidos opuestos. Ambos deben estar libres.","regra.mar":"Cada 3 giros sube la marea y gira sola los anillos de agua libres.",floresta:"Bosque",fase:i=>`Nivel ${i}`,minimo:i=>`m\xEDn. ${i}`,giros:"Giros",faltam:i=>i===1?"Falta <b>1</b> nivel":`Faltan <b>${i}</b> niveles`,dica:"Pista",reiniciar:"Reiniciar",mira:"Mira",dificil:"DIF\xCDCIL",perfeito:"\xA1Perfecto!",muitoBem:"\xA1Muy bien!",conseguiu:"\xA1Lo lograste!",solucaoPerfeita:i=>`Soluci\xF3n perfecta: <b>${i}</b> giros`,girosMin:(i,e)=>`<b>${i}</b> giros \xB7 m\xEDnimo posible ${e}`,proxima:"Siguiente nivel",jardim:"El jard\xEDn de Pots",subtitulo:"Rompecabezas de anillos",jogar:"JUGAR",ajustes:"Ajustes",som:"Sonido",ligado:"S\xCD",desligado:"NO",creditos:"Cr\xE9ditos",fechar:"Cerrar",novaPlanta:"\xA1Brot\xF3 una planta nueva en el jard\xEDn!",toqueAnel:"Toca un anillo para hacerlo estallar",maisDica:"+1 Pista",maisMira:"+1 Mira",gratisVideo:"Gratis con un video",bauAberto:i=>`\xA1Cofre abierto! <b>+${i.moedas}</b> monedas \xB7 <b>+${i.dica}</b> Pistas \xB7 <b>+${i.mira}</b> Mira`},ar:{musica:"\u0627\u0644\u0645\u0648\u0633\u064A\u0642\u0649",gelo:"\u0627\u0644\u062C\u0644\u064A\u062F",deserto:"\u0627\u0644\u0635\u062D\u0631\u0627\u0621",mar:"\u0627\u0644\u0628\u062D\u0631",colGelo:"\u062D\u062F\u064A\u0642\u0629 \u0627\u0644\u062C\u0644\u064A\u062F",colDeserto:"\u0648\u0627\u062D\u0629 Pots",colMar:"\u0634\u0627\u0637\u0626 Pots",mareEm:i=>i===1?"\u0627\u0644\u0645\u062F\u0651 \u0641\u064A \u0627\u0644\u062F\u0648\u0631\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629":`\u0627\u0644\u062F\u0648\u0631\u0627\u062A \u062D\u062A\u0649 \u0627\u0644\u0645\u062F\u0651: ${i}`,entendi:"\u0641\u0647\u0645\u062A!",novoBioma:i=>`\u0645\u0643\u0627\u0646 \u062C\u062F\u064A\u062F: ${i}!`,"regra.gelo":"\u0627\u0644\u062D\u0644\u0642\u0627\u062A \u0627\u0644\u0645\u062A\u062C\u0645\u062F\u0629 \u0644\u0627 \u062A\u062F\u0648\u0631. \u062D\u0631\u0651\u0631 \u062D\u0644\u0642\u0629 \u0628\u062C\u0648\u0627\u0631\u0647\u0627 \u0641\u064A\u0646\u0643\u0633\u0631 \u0627\u0644\u062C\u0644\u064A\u062F.","regra.deserto":"\u0633\u0631\u0627\u0628! \u0627\u0644\u062D\u0644\u0642\u0627\u062A \u0627\u0644\u062A\u0648\u0623\u0645 \u062A\u062F\u0648\u0631 \u0645\u0639\u064B\u0627 \u0641\u064A \u0627\u062A\u062C\u0627\u0647\u064A\u0646 \u0645\u062A\u0639\u0627\u0643\u0633\u064A\u0646. \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0627\u0644\u062D\u0644\u0642\u062A\u0627\u0646 \u062D\u0631\u0651\u062A\u064A\u0646.","regra.mar":"\u0643\u0644 3 \u062F\u0648\u0631\u0627\u062A \u064A\u0631\u062A\u0641\u0639 \u0627\u0644\u0645\u062F\u0651 \u0648\u064A\u064F\u062F\u064A\u0631 \u062D\u0644\u0642\u0627\u062A \u0627\u0644\u0645\u0627\u0621 \u0627\u0644\u062D\u0631\u0651\u0629 \u0648\u062D\u062F\u0647.",floresta:"\u0627\u0644\u063A\u0627\u0628\u0629",fase:i=>`\u0627\u0644\u0645\u0631\u062D\u0644\u0629 ${i}`,minimo:i=>`\u0627\u0644\u0623\u0641\u0636\u0644 ${i}`,giros:"\u0627\u0644\u062F\u0648\u0631\u0627\u062A",faltam:i=>i===1?"\u0628\u0642\u064A\u062A <b>1</b> \u0645\u0631\u062D\u0644\u0629":`\u0627\u0644\u0645\u0631\u0627\u062D\u0644 \u0627\u0644\u0645\u062A\u0628\u0642\u064A\u0629: <b>${i}</b>`,dica:"\u062A\u0644\u0645\u064A\u062D",reiniciar:"\u0625\u0639\u0627\u062F\u0629",mira:"\u062A\u0635\u0648\u064A\u0628",dificil:"\u0635\u0639\u0628\u0629",perfeito:"\u0645\u062B\u0627\u0644\u064A!",muitoBem:"\u0623\u062D\u0633\u0646\u062A!",conseguiu:"\u0644\u0642\u062F \u0646\u062C\u062D\u062A!",solucaoPerfeita:i=>`\u062D\u0644\u0651 \u0645\u062B\u0627\u0644\u064A \xB7 \u0639\u062F\u062F \u0627\u0644\u062F\u0648\u0631\u0627\u062A: <b>${i}</b>`,girosMin:(i,e)=>`\u0639\u062F\u062F \u0627\u0644\u062F\u0648\u0631\u0627\u062A: <b>${i}</b> \xB7 \u0627\u0644\u0623\u0641\u0636\u0644 \u0627\u0644\u0645\u0645\u0643\u0646 ${e}`,proxima:"\u0627\u0644\u0645\u0631\u062D\u0644\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629",jardim:"\u062D\u062F\u064A\u0642\u0629 Pots",subtitulo:"\u0644\u063A\u0632 \u0627\u0644\u062D\u0644\u0642\u0627\u062A",jogar:"\u0627\u0644\u0639\u0628",ajustes:"\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A",som:"\u0627\u0644\u0635\u0648\u062A",ligado:"\u062A\u0634\u063A\u064A\u0644",desligado:"\u0625\u064A\u0642\u0627\u0641",creditos:"\u0641\u0631\u064A\u0642 \u0627\u0644\u0639\u0645\u0644",fechar:"\u0625\u063A\u0644\u0627\u0642",novaPlanta:"\u0646\u0628\u062A\u062A \u0646\u0628\u062A\u0629 \u062C\u062F\u064A\u062F\u0629 \u0641\u064A \u0627\u0644\u062D\u062F\u064A\u0642\u0629!",toqueAnel:"\u0627\u0644\u0645\u0633 \u062D\u0644\u0642\u0629 \u0644\u0625\u0632\u0627\u0644\u062A\u0647\u0627",maisDica:"+1 \u062A\u0644\u0645\u064A\u062D",maisMira:"+1 \u062A\u0635\u0648\u064A\u0628",gratisVideo:"\u0645\u062C\u0627\u0646\u064B\u0627 \u0628\u0645\u0634\u0627\u0647\u062F\u0629 \u0641\u064A\u062F\u064A\u0648",bauAberto:i=>`\u0641\u064F\u062A\u062D \u0627\u0644\u0635\u0646\u062F\u0648\u0642! \u0639\u0645\u0644\u0627\u062A: <b>+${i.moedas}</b> \xB7 \u062A\u0644\u0645\u064A\u062D\u0627\u062A: <b>+${i.dica}</b> \xB7 \u062A\u0635\u0648\u064A\u0628: <b>+${i.mira}</b>`},hi:{musica:"\u0938\u0902\u0917\u0940\u0924",gelo:"\u092C\u0930\u094D\u092B\u093C",deserto:"\u0930\u0947\u0917\u093F\u0938\u094D\u0924\u093E\u0928",mar:"\u0938\u092E\u0941\u0926\u094D\u0930",colGelo:"\u092C\u0930\u094D\u092B\u093C \u0915\u093E \u092C\u0917\u0940\u091A\u093E",colDeserto:"Pots \u0915\u093E \u0913\u090F\u0938\u093F\u0938",colMar:"Pots \u0915\u093E \u092C\u0940\u091A",mareEm:i=>i===1?"\u0905\u0917\u0932\u0947 \u0918\u0941\u092E\u093E\u0935 \u092A\u0930 \u091C\u094D\u0935\u093E\u0930":`${i} \u0918\u0941\u092E\u093E\u0935 \u092E\u0947\u0902 \u091C\u094D\u0935\u093E\u0930`,entendi:"\u0920\u0940\u0915 \u0939\u0948!",novoBioma:i=>`\u0928\u0908 \u091C\u0917\u0939: ${i}!`,"regra.gelo":"\u091C\u092E\u0940 \u0939\u0941\u0908 \u0930\u093F\u0902\u0917 \u0918\u0942\u092E \u0928\u0939\u0940\u0902 \u0938\u0915\u0924\u0940\u0964 \u092A\u093E\u0938 \u0935\u093E\u0932\u0940 \u0930\u093F\u0902\u0917 \u0915\u094B \u0906\u091C\u093C\u093E\u0926 \u0915\u0930\u094B, \u092C\u0930\u094D\u092B\u093C \u091F\u0942\u091F \u091C\u093E\u090F\u0917\u0940\u0964","regra.deserto":"\u092E\u0943\u0917\u0924\u0943\u0937\u094D\u0923\u093E! \u091C\u0941\u0921\u093C\u0935\u093E\u0901 \u0930\u093F\u0902\u0917 \u090F\u0915 \u0938\u093E\u0925, \u0909\u0932\u094D\u091F\u0940 \u0926\u093F\u0936\u093E \u092E\u0947\u0902 \u0918\u0942\u092E\u0924\u0940 \u0939\u0948\u0902\u0964 \u0926\u094B\u0928\u094B\u0902 \u0915\u093E \u0906\u091C\u093C\u093E\u0926 \u0939\u094B\u0928\u093E \u091C\u093C\u0930\u0942\u0930\u0940 \u0939\u0948\u0964","regra.mar":"\u0939\u0930 3 \u0918\u0941\u092E\u093E\u0935 \u092A\u0930 \u091C\u094D\u0935\u093E\u0930 \u0906\u0924\u093E \u0939\u0948 \u0914\u0930 \u092A\u093E\u0928\u0940 \u0935\u093E\u0932\u0940 \u0906\u091C\u093C\u093E\u0926 \u0930\u093F\u0902\u0917 \u0915\u094B \u0916\u0941\u0926 \u0918\u0941\u092E\u093E \u0926\u0947\u0924\u093E \u0939\u0948\u0964",floresta:"\u091C\u0902\u0917\u0932",fase:i=>`\u0932\u0947\u0935\u0932 ${i}`,minimo:i=>`\u092C\u0947\u0938\u094D\u091F ${i}`,giros:"\u0918\u0941\u092E\u093E\u0935",faltam:i=>i===1?"<b>1</b> \u0932\u0947\u0935\u0932 \u092C\u093E\u0915\u0940":`<b>${i}</b> \u0932\u0947\u0935\u0932 \u092C\u093E\u0915\u0940`,dica:"\u0939\u093F\u0902\u091F",reiniciar:"\u092B\u093F\u0930 \u0938\u0947",mira:"\u0928\u093F\u0936\u093E\u0928\u093E",dificil:"\u0915\u0920\u093F\u0928",perfeito:"\u092A\u0930\u092B\u0947\u0915\u094D\u091F!",muitoBem:"\u092C\u0939\u0941\u0924 \u092C\u0922\u093C\u093F\u092F\u093E!",conseguiu:"\u0906\u092A\u0928\u0947 \u0915\u0930 \u0926\u093F\u0916\u093E\u092F\u093E!",solucaoPerfeita:i=>`\u092A\u0930\u092B\u0947\u0915\u094D\u091F \u0939\u0932: <b>${i}</b> \u0918\u0941\u092E\u093E\u0935`,girosMin:(i,e)=>`<b>${i}</b> \u0918\u0941\u092E\u093E\u0935 \xB7 \u0938\u092C\u0938\u0947 \u0915\u092E ${e}`,proxima:"\u0905\u0917\u0932\u093E \u0932\u0947\u0935\u0932",jardim:"Pots \u0915\u093E \u092C\u0917\u0940\u091A\u093E",subtitulo:"\u0930\u093F\u0902\u0917 \u092A\u091C\u093C\u0932",jogar:"\u0916\u0947\u0932\u0947\u0902",ajustes:"\u0938\u0947\u091F\u093F\u0902\u0917\u094D\u0938",som:"\u0906\u0935\u093E\u091C\u093C",ligado:"\u091A\u093E\u0932\u0942",desligado:"\u092C\u0902\u0926",creditos:"\u0915\u094D\u0930\u0947\u0921\u093F\u091F\u094D\u0938",fechar:"\u092C\u0902\u0926 \u0915\u0930\u0947\u0902",novaPlanta:"\u092C\u0917\u0940\u091A\u0947 \u092E\u0947\u0902 \u090F\u0915 \u0928\u092F\u093E \u092A\u094C\u0927\u093E \u0909\u0917 \u0906\u092F\u093E!",toqueAnel:"\u0930\u093F\u0902\u0917 \u092A\u0930 \u091F\u0948\u092A \u0915\u0930\u0915\u0947 \u0909\u0938\u0947 \u092B\u094B\u0921\u093C\u0947\u0902",maisDica:"+1 \u0939\u093F\u0902\u091F",maisMira:"+1 \u0928\u093F\u0936\u093E\u0928\u093E",gratisVideo:"\u0935\u0940\u0921\u093F\u092F\u094B \u0926\u0947\u0916\u0915\u0930 \u092E\u0941\u092B\u093C\u094D\u0924",bauAberto:i=>`\u0938\u0902\u0926\u0942\u0915 \u0916\u0941\u0932 \u0917\u092F\u093E! <b>+${i.moedas}</b> \u0938\u093F\u0915\u094D\u0915\u0947 \xB7 <b>+${i.dica}</b> \u0939\u093F\u0902\u091F \xB7 <b>+${i.mira}</b> \u0928\u093F\u0936\u093E\u0928\u093E`},ja:{musica:"BGM",gelo:"\u6C37",deserto:"\u7802\u6F20",mar:"\u6D77",colGelo:"\u6C37\u306E\u5EAD",colDeserto:"\u30DD\u30C3\u30C4\u306E\u30AA\u30A2\u30B7\u30B9",colMar:"\u30DD\u30C3\u30C4\u306E\u30D3\u30FC\u30C1",mareEm:i=>i===1?"\u3042\u30681\u56DE\u3067\u6E80\u3061\u6F6E":`\u3042\u3068${i}\u56DE\u3067\u6E80\u3061\u6F6E`,entendi:"\u308F\u304B\u3063\u305F\uFF01",novoBioma:i=>`\u65B0\u3057\u3044\u5834\u6240\uFF1A${i}\uFF01`,"regra.gelo":"\u51CD\u3063\u305F\u30EA\u30F3\u30B0\u306F\u56DE\u305B\u307E\u305B\u3093\u3002\u3068\u306A\u308A\u306E\u30EA\u30F3\u30B0\u3092\u5916\u3059\u3068\u3001\u6C37\u304C\u308F\u308C\u307E\u3059\u3002","regra.deserto":"\u8703\u6C17\u697C\uFF01\u53CC\u5B50\u306E\u30EA\u30F3\u30B0\u306F\u9006\u5411\u304D\u306B\u4E00\u7DD2\u306B\u56DE\u308A\u307E\u3059\u3002\u4E21\u65B9\u3068\u3082\u52D5\u304B\u305B\u308B\u6642\u3060\u3051\u56DE\u305B\u307E\u3059\u3002","regra.mar":"3\u56DE\u3054\u3068\u306B\u6F6E\u304C\u6E80\u3061\u3066\u3001\u52D5\u304B\u305B\u308B\u6C34\u306E\u30EA\u30F3\u30B0\u3092\u81EA\u52D5\u3067\u56DE\u3057\u307E\u3059\u3002",floresta:"\u68EE",fase:i=>`\u30B9\u30C6\u30FC\u30B8${i}`,minimo:i=>`\u6700\u5C11${i}\u56DE`,giros:"\u56DE\u8EE2\u6570",faltam:i=>i===1?"\u3042\u3068<b>1</b>\u30B9\u30C6\u30FC\u30B8":`\u3042\u3068<b>${i}</b>\u30B9\u30C6\u30FC\u30B8`,dica:"\u30D2\u30F3\u30C8",reiniciar:"\u3084\u308A\u76F4\u3059",mira:"\u306D\u3089\u3044\u6483\u3061",dificil:"\u3080\u305A\u304B\u3057\u3044",perfeito:"\u30AB\u30F3\u30DA\u30AD\uFF01",muitoBem:"\u304A\u898B\u4E8B\uFF01",conseguiu:"\u3084\u3063\u305F\u306D\uFF01",solucaoPerfeita:i=>`\u6700\u77ED\u30AF\u30EA\u30A2\uFF1A<b>${i}</b>\u56DE`,girosMin:(i,e)=>`<b>${i}</b>\u56DE \xB7 \u6700\u5C11${e}\u56DE`,proxima:"\u6B21\u306E\u30B9\u30C6\u30FC\u30B8",jardim:"\u30DD\u30C3\u30C4\u306E\u5EAD",subtitulo:"\u30EA\u30F3\u30B0\u30D1\u30BA\u30EB",jogar:"\u3042\u305D\u3076",ajustes:"\u8A2D\u5B9A",som:"\u30B5\u30A6\u30F3\u30C9",ligado:"ON",desligado:"OFF",creditos:"\u30AF\u30EC\u30B8\u30C3\u30C8",fechar:"\u9589\u3058\u308B",novaPlanta:"\u5EAD\u306B\u65B0\u3057\u3044\u82BD\u304C\u51FA\u305F\u3088\uFF01",toqueAnel:"\u30EA\u30F3\u30B0\u3092\u30BF\u30C3\u30D7\u3057\u3066\u5916\u305D\u3046",maisDica:"\u30D2\u30F3\u30C8+1",maisMira:"\u306D\u3089\u3044\u6483\u3061+1",gratisVideo:"\u52D5\u753B\u3092\u898B\u3066\u7121\u6599",bauAberto:i=>`\u5B9D\u7BB1\u30AA\u30FC\u30D7\u30F3\uFF01 \u30B3\u30A4\u30F3<b>+${i.moedas}</b> \xB7 \u30D2\u30F3\u30C8<b>+${i.dica}</b> \xB7 \u306D\u3089\u3044\u6483\u3061<b>+${i.mira}</b>`}},sm=(new URLSearchParams(location.search).get("lang")||navigator.language||"en").slice(0,2).toLowerCase(),om=Hu[sm]?sm:"en";function Rt(i,...e){let t=Hu[om][i]??Hu.en[i]??i;return typeof t=="function"?t(...e):t}function am(){document.querySelectorAll("[data-t]").forEach(i=>{i.textContent=Rt(i.dataset.t)}),document.documentElement.classList.toggle("rtl",om==="ar")}var ky=["tique","escapa","sai","preso","botao","moedas","estrela","vitoria","abre"],_t=null,ms=null,qu={},pr=!1,ll=!1;try{pr=localStorage.getItem("ringamigo.mudo")==="1"}catch{}var lm={url:"a-1d616cb6/sons/"};function zy(){if(_t)return;let i=window.AudioContext||window.webkitAudioContext;if(i){_t=new i,ms=_t.createGain(),ms.connect(_t.destination),ju();for(let e of ky)fetch(lm.url+e+".mp3").then(t=>t.arrayBuffer()).then(t=>_t.decodeAudioData(t)).then(t=>{qu[e]=t}).catch(()=>{})}}for(let i of["pointerdown","keydown"])addEventListener(i,()=>{zy(),_t&&_t.state==="suspended"&&_t.resume()},{capture:!0});function ju(){ms&&(ms.gain.value=pr||ll?0:1)}function hl(i){if(i===void 0)return pr;pr=i;try{localStorage.setItem("ringamigo.mudo",i?"1":"0")}catch{}ju()}function Ku(i){ll=i,ju(),_t&&(i?_t.suspend().catch(()=>{}):pr||_t.resume().catch(()=>{}))}var Vu=0,cm=0;function xt(i,{vol:e=1,tom:t=1,varia:n=.06}={}){if(!_t||!qu[i]||pr||ll)return;if(i==="sai"){let o=performance.now();Vu=o-cm<2500?Math.min(Vu+1,8):0,cm=o,t*=Math.pow(2,Vu*2/12)}let r=_t.createBufferSource();r.buffer=qu[i],r.playbackRate.value=t*(1+(Math.random()-.5)*2*n);let s=_t.createGain();s.gain.value=e,r.connect(s),s.connect(ms),r.start()}var Co=!1;try{Co=localStorage.getItem("ringamigo.musica")==="0"}catch{}var Ct=null,Xu=null,Ro=null,cl={};function Gy(){!_t||Ct||(Ct=_t.createGain(),Ct.gain.value=0,Ct.connect(ms))}function Hy(i){return cl[i]??(cl[i]=fetch(lm.url+"musica-"+i+".mp3").then(e=>e.arrayBuffer()).then(e=>_t.decodeAudioData(e)).catch(e=>{throw delete cl[i],e}))}var Ju=.42;async function ul(i){if(Ro=i,!_t)return;Gy();let e;try{e=await Hy(i)}catch{return}if(Ro!==i)return;let t=_t.currentTime,n=Xu;Ct.gain.cancelScheduledValues(t),Ct.gain.setValueAtTime(Ct.gain.value,t),Ct.gain.linearRampToValueAtTime(0,t+.6),setTimeout(()=>{if(Ro!==i)return;try{n&&n.stop()}catch{}let r=_t.createBufferSource();r.buffer=e,r.loop=!0,r.connect(Ct),r.start(),Xu=r;let s=_t.currentTime;Ct.gain.cancelScheduledValues(s),Ct.gain.setValueAtTime(0,s),Ct.gain.linearRampToValueAtTime(Co?0:Ju,s+1.2)},n?650:0)}function hm(i=2){if(!Ct||Co)return;let e=_t.currentTime;Ct.gain.cancelScheduledValues(e),Ct.gain.setValueAtTime(Ct.gain.value,e),Ct.gain.linearRampToValueAtTime(.08,e+.2),Ct.gain.linearRampToValueAtTime(Ju,e+i)}function dl(i){if(i===void 0)return!Co;Co=!i;try{localStorage.setItem("ringamigo.musica",i?"1":"0")}catch{}if(Ct){let e=_t.currentTime;Ct.gain.cancelScheduledValues(e),Ct.gain.setValueAtTime(Ct.gain.value,e),Ct.gain.linearRampToValueAtTime(i?Ju:0,e+.4)}}for(let i of["pointerdown","keydown"])addEventListener(i,()=>{_t&&Ro&&!Xu&&!Wu&&(Wu=!0,ul(Ro).finally(()=>{Wu=!1}))},{capture:!0});var Wu=!1;document.addEventListener("visibilitychange",()=>{_t&&(document.hidden?_t.suspend().catch(()=>{}):!pr&&!ll&&_t.resume().catch(()=>{}))});var Gt=i=>document.querySelector(i),fl=0;function um({numero:i,bioma:e="floresta",dificil:t,minimo:n,capitulo:r,moedas:s,mare:o=!1}){Gt("#bioma").textContent=Rt(e),document.body.dataset.bioma=e,Gt("#mare").hidden=!o,o&&Zu(3),Gt("#numFase").textContent=Rt("fase",i),Gt("#hud").classList.toggle("dificil",t),Gt("#selo").hidden=!t,Gt("#minimo").textContent=Rt("minimo",n);let a=r,c=20+a/10*80;Gt("#enche").style.width=c+"%";let l=10-a;Gt("#falta").innerHTML=Rt("faltam",l),fl||Yu(s,!1)}function pl(i){Gt("#numGiros").textContent=i}function Yu(i,e=!0){let t=Gt("#numMoedas"),n=fl;if(fl=i,!e){t.textContent=i.toLocaleString("pt-BR");return}let r=performance.now(),s=o=>{let a=Math.min(1,(o-r)/700);t.textContent=Math.round(n+(i-n)*a).toLocaleString("pt-BR"),a<1&&requestAnimationFrame(s)};requestAnimationFrame(s)}function dm({estrelas:i,giros:e,minimo:t,moedas:n,bau:r},s){Gt("#vBau").hidden=!r,r&&(Gt("#vBauTxt").innerHTML=Rt("bauAberto",r));let o=Gt("#vitoria");Gt("#vTitulo").textContent=i===3?Rt("perfeito"):i===2?Rt("muitoBem"):Rt("conseguiu"),Gt("#vAmigo").textContent=Rt("novaPlanta"),Gt("#vGiros").innerHTML=i===3?Rt("solucaoPerfeita",e):Rt("girosMin",e,t),Gt("#vMoedas").textContent="+"+n,o.querySelectorAll(".estrela").forEach((c,l)=>{c.classList.remove("acesa"),c.style.animationDelay=.25+l*.22+"s",l<i&&c.classList.add("acesa")}),o.hidden=!1,requestAnimationFrame(()=>o.classList.add("aberto")),xt("abre",{vol:.6});for(let c=0;c<i;c++)setTimeout(()=>xt("estrela",{tom:1+c*.12,varia:0}),450+c*220);let a=Gt("#vProxima");a.onclick=()=>{a.onclick=null,o.classList.remove("aberto"),setTimeout(()=>{o.hidden=!0},250),xt("botao"),setTimeout(()=>xt("moedas",{vol:.7}),120),Yu(fl+n),s()}}function fm(i){Gt("#bDica").onclick=()=>{xt("botao"),i()}}function pm(i){Gt("#bReiniciar").onclick=()=>{xt("botao"),i()}}function mm(i){Yu(i)}function Zu(i){let e=document.querySelector("#mareTxt");e&&(e.textContent=Rt("mareEm",i))}var Wy={gelo:'<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="20" fill="none" stroke="#4E8CF5" stroke-width="8" stroke-dasharray="100 26"/><circle cx="32" cy="32" r="20" fill="none" stroke="#CFF2FF" stroke-width="14" opacity=".65"/><path d="M32 6v52M10 19l44 26M10 45l44-26" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>',deserto:'<svg viewBox="0 0 64 64"><circle cx="18" cy="32" r="12" fill="none" stroke="#FF6B6B" stroke-width="6" stroke-dasharray="58 18"/><circle cx="46" cy="32" r="12" fill="none" stroke="#FF6B6B" stroke-width="6" stroke-dasharray="58 18" opacity=".55" transform="rotate(180 46 32)"/><path d="M24 14c4-4 12-4 16 0M40 50c-4 4-12 4-16 0" fill="none" stroke="#E0A030" stroke-width="3" stroke-linecap="round"/><path d="M38 11l3 3-4 1M26 53l-3-3 4-1" fill="none" stroke="#E0A030" stroke-width="3" stroke-linecap="round"/></svg>',mar:'<svg viewBox="0 0 64 64"><circle cx="32" cy="26" r="16" fill="none" stroke="#3FCFB4" stroke-width="7" stroke-dasharray="78 22"/><path d="M6 50c6-8 12-8 18 0s12 8 18 0 12-8 16 0" fill="none" stroke="#4E8CF5" stroke-width="5" stroke-linecap="round"/></svg>'};function gm(i,e){let t=document.querySelector("#cartaoBioma");document.querySelector("#cbTitulo").textContent=Rt("novoBioma",Rt(i)),document.querySelector("#cbIcone").innerHTML=Wy[i]||"",document.querySelector("#cbTexto").textContent=Rt("regra."+i),t.hidden=!1,xt("abre",{vol:.6}),document.querySelector("#cbOk").onclick=()=>{xt("botao"),t.hidden=!0,e()}}var mr={pausa(){},volta(){}},Xy=9e4,jy=6,Ky={nome:"local",init(){},mostra:()=>Promise.resolve(!1)},Jy={nome:"gamemonetize",pronto:!1,pausado:!1,atual:null,T:{inicio:2500,preso:18e4,erro:3e3},init(){let i=e=>this.evento(e);window.GM_ON=i,window.SDK_OPTIONS||(window.SDK_OPTIONS={gameId:window.GM_GAME_ID||"",onEvent:i}),window.sdk&&typeof window.sdk.showBanner=="function"&&(this.pronto=!0),(window.GM_EV||[]).splice(0).forEach(i)},evento(i){if(!i||!i.name)return;let e=i.name;e==="SDK_READY"?this.pronto=!!(window.sdk&&typeof window.sdk.showBanner=="function"):e==="SDK_GAME_PAUSE"?this.pausa():e==="SDK_GAME_START"?this.volta():(e==="AD_ERROR"||e==="AD_SDK_ERROR"||e==="AD_CANCELED")&&(this.atual&&!this.atual.comecou?this.fim():this.pausado&&(clearTimeout(this.tErro),this.tErro=setTimeout(()=>{this.pausado&&this.volta()},this.T.erro)))},pausa(){this.atual&&(this.atual.comecou=!0,clearTimeout(this.atual.t)),this.pausado||(this.pausado=!0,mr.pausa()),clearTimeout(this.tPreso),this.tPreso=setTimeout(()=>this.volta(),this.T.preso)},volta(){clearTimeout(this.tPreso),clearTimeout(this.tErro);let i=this.pausado;this.pausado=!1,this.atual?this.fim():i&&mr.volta()},fim(){let i=this.atual;i&&(this.atual=null,clearTimeout(i.t),mr.volta(),i.res(i.comecou))},mostra(){return new Promise(i=>{let e=window.sdk;if(!this.pronto||!e||typeof e.showBanner!="function"||this.atual||this.pausado)return i(!1);this.atual={comecou:!1,res:i},this.atual.t=setTimeout(()=>{this.atual&&!this.atual.comecou&&this.fim()},this.T.inicio);try{e.showBanner()}catch{this.fim()}})}},Yy={nome:"lipy",ponte(){let i=window.LIPY_ANUNCIO;return i&&typeof i.pedir=="function"?i:null},init(){},temPremiado(){let i=this.ponte();return!!(i&&i.premiado&&i.premiado())},mostra(i="intersticial"){let e=this.ponte();return e?new Promise(t=>{let n=!1,r=0,s=o=>{n||(n=!0,clearTimeout(r),mr.volta(),t(o))};r=setTimeout(()=>s(!1),1e5);try{e.pedir(i,{comecou:()=>{n||mr.pausa()},terminou:o=>s(!!o)})}catch{s(!1)}}):Promise.resolve(!1)}},Qn=window.RINGAMIGO_PORTAL==="gamemonetize"?Jy:window.RINGAMIGO_PORTAL==="lipy"?Yy:Ky;function Po(i){if(Qn.nome==="lipy")try{parent.postMessage(i,location.origin)}catch{}}function xm(){return Qn.nome==="lipy"?Qn.temPremiado():!0}var ml=-1e9,sE=Qn.nome;function vm({pausa:i,volta:e}){mr.pausa=i,mr.volta=e,Qn.init()}function _m(){return ml=performance.now(),Qn.mostra()}function ym(i){return i<jy||performance.now()-ml<Xy?Promise.resolve(!1):(ml=performance.now(),Qn.mostra())}var bm=-1e9;function Mm(){return ml=performance.now(),Qn.nome==="lipy"?Qn.mostra("premiado"):Qn.mostra().then(i=>{if(i)return!0;let e=performance.now();return e-bm<6e4?!1:(bm=e,!0)})}am();var Am=document.getElementById("cena"),ki=new qc({canvas:Am,antialias:!0,preserveDrawingBuffer:!0});ki.setPixelRatio(Math.min(devicePixelRatio,2));ki.outputColorSpace=wt;ki.toneMapping=fo;ki.toneMappingExposure=1.05;ki.shadowMap.enabled=!0;ki.shadowMap.type=sr;var bs=new Os,Bi=new zt(32,16/9,.1,400);Bi.position.set(0,1.6,21);Bi.lookAt(0,.2,0);var $y=new Jc().setMeshoptDecoder(Fp),Rm=i=>new Promise((e,t)=>$y.load(i,e,void 0,t)),xs=new rl(bs,Rm),Do=new ol(bs),at=new il(bs,Bi,Am,{evento:iM,estouro:(i,e)=>Do.estoura(i,e),giros:i=>pl(i),tique:()=>xt("tique",{vol:.35,varia:.1}),mare:(i,e)=>{if(Zu(i),e){let t=document.getElementById("mare");t.classList.remove("chegou"),t.offsetWidth,t.classList.add("chegou")}}}),Lo=null,$u=null,Cm=0,Io=0,Bn={};async function Qy(){let i=await Rm("a-1d616cb6/models/pots.glb"),e=i.scene;e.rotation.x=Math.PI/2,e.traverse(h=>{h.isMesh&&(h.castShadow=!0,h.receiveShadow=!0,h.frustumCulled=!1,h.material.map&&(h.material.map.anisotropy=8),h.material.emissive&&h.material.emissive.set(0))});let t=new ut;t.add(e),t.updateMatrixWorld(!0),t.traverse(h=>{h.isSkinnedMesh&&(h.skeleton.update(),h.computeBoundingBox())});let n=new Kt().setFromObject(t,!0),r=n.max.y-n.min.y;t.scale.setScalar(3.7/r),t.position.set(-6.9,Oi-n.min.y*(3.7/r)+.05,2.4),t.rotation.y=.5,bs.add(t),Lo=new Qr(e);let s=h=>i.animations.find(u=>h.test(u.name));Bn.parado=Lo.clipAction(s(/Idle/)||i.animations[0]),Bn.parado.play(),s(/Explanation/)&&(Bn.explica=Lo.clipAction(s(/Explanation/)),Bn.explica.setLoop(Uc),Bn.explica.clampWhenFinished=!1),$u=t,Cm=t.position.y;let o=document.createElement("canvas");o.width=o.height=128;let a=o.getContext("2d"),c=a.createRadialGradient(64,64,0,64,64,64);c.addColorStop(0,"rgba(40,30,10,.45)"),c.addColorStop(1,"rgba(40,30,10,0)"),a.fillStyle=c,a.fillRect(0,0,128,128);let l=new ze(new Ln(3.2,3.2),new jt({map:new tr(o),transparent:!0,depthWrite:!1}));l.rotation.x=-Math.PI/2,l.position.set(t.position.x,Oi+.4,t.position.z),bs.add(l)}function Pm(){let i=innerWidth,e=innerHeight;ki.setSize(i,e,!1),Bi.aspect=i/e,Bi.position.z=21*Math.max(1,16/9/Bi.aspect*.92),Bi.updateProjectionMatrix()}addEventListener("resize",Pm);Pm();var Sm=performance.now(),Em=0;function Im(i){if(Em+=i,Lo&&Lo.update(i),$u){Io=Math.max(0,Io-i);let e=Io>0?Math.sin((1-Io/.45)*Math.PI):0;$u.position.y=Cm+e*.9}at.raiz.position.y=-.77+Math.sin(Em*1.2)*.05,at.atualiza(i),Do.atualiza(i),xs.atualiza(i),ki.render(bs,Bi)}function Fm(){let i=performance.now();Im(Math.min((i-Sm)/1e3,1/20)),Sm=i,requestAnimationFrame(Fm)}var Lm="ringamigo.v1",Fo=(()=>{try{return JSON.parse(localStorage.getItem(Lm))||{}}catch{return{}}})(),nt={fase:Fo.fase||0,estrelas:Fo.estrelas||{},moedas:Fo.moedas??120,vistos:Fo.vistos||{}},Uo=()=>{try{localStorage.setItem(Lm,JSON.stringify(nt))}catch{}},gs=null,bl=0,Xe=i=>document.querySelector(i);function eM(i){return Object.keys(nt.estrelas).filter(e=>ps(+e+1)===i).length}function Dm(i,e){let t=eM(i),n=sl[i].total;xs.cresceAte(i,t,e,Do),Xe("#jardimTitulo").textContent=Rt(sl[i].titulo),Xe("#jardimN").textContent=Math.min(t,n),Xe("#jardimT").textContent=n,Xe("#jardimBar").style.width=Math.min(100,t/n*100)+"%"}var Qu={};function tM(i){if(i<al.length||Qu[i])return;let e=()=>{Qu[i]=Gu(i+1)};(window.requestIdleCallback||setTimeout)(e)}var Tm=0;async function ed(i){let e=++Tm;tM(i+1),nt.fase=i,gs=i<al.length?al[i]:Qu[i]||Gu(i+1),bl=el(gs).minimo;let t=ps(i+1);if(xs.atual!==t){at.travado=!0,document.body.classList.add("carregando");try{await xs.usa(t)}catch(n){console.warn("bioma n\xE3o carregou, segue no atual",n)}if(document.body.classList.remove("carregando"),e!==Tm)return;at.travado=!1}Dm(t,!1),at.monta(gs),um({numero:i+1,bioma:t,dificil:!!gs.dificil,minimo:bl,capitulo:i%10,moedas:nt.moedas,mare:!!gs.mare}),pl(0),Po({lipy:"fase",n:i+1}),Nm(i+1,t)}function Nm(i,e){e==="floresta"||![31,51,71].includes(i)||nt.vistos[e]||!Xe("#inicio").hidden||(nt.vistos[e]=1,Uo(),gm(e,()=>{at.pausado=!1}),at.pausado=!0)}function gl(){Io=.45}function nM(){Bn.explica&&(Bn.explica.reset().play(),Bn.explica.crossFadeFrom(Bn.parado,.2,!1),setTimeout(()=>Bn.parado.reset().play().crossFadeFrom(Bn.explica,.3,!1),2200))}function iM(i,e){if(i.tipo==="escapou"&&xt("escapa",{vol:.8}),i.tipo==="degelou"&&xt("estrela",{tom:1.5,vol:.9}),i.tipo==="mare"){xt("abre",{tom:.7,vol:.7});for(let t of i.ids){let n=new P;e.aneis[t].g.getWorldPosition(n),Do.estoura(n,"#7FD3FF",14,.5)}}if(i.tipo==="saiu"&&(xt("sai"),e.estado.venceu||gl()),i.tipo==="preso"&&(xt("preso",{vol:.6}),nM()),i.tipo==="venceu"){e.travado=!0;let t=e.estado.giros,n=zp(t,bl),r=10+n*5,s=!(nt.fase in nt.estrelas);nt.estrelas[nt.fase]=Math.max(nt.estrelas[nt.fase]||0,n),nt.moedas+=r,Po({lipy:"venceu",n:nt.fase+1}),n===3&&Po({lipy:"alegria"});let o=nt.fase+1;nt.fase=o;let a=o%10===0?{moedas:100,dica:2,mira:1}:null;a&&(nt.moedas+=a.moedas,nt.itens.dica+=a.dica,nt.itens.mira+=a.mira),Uo(),setTimeout(()=>{let c=new P;e.conteudo.getWorldPosition(c),hm(2.8),xt("vitoria",{varia:0});for(let l of["#FF6B6B","#FFB547","#3FCFB4","#4E8CF5","#A774F2","#82D84E"])Do.estoura(c,l,28,1.3);if(gl(),setTimeout(gl,480),s){Dm(xs.atual,!0);let l=Xe(".album");l.classList.remove("pula"),l.offsetWidth,l.classList.add("pula")}},650),setTimeout(()=>dm({estrelas:n,giros:t,minimo:bl,moedas:r+(a?a.moedas:0),bau:a},()=>{Oo(),ym(o+1).then(()=>{e.travado=!1,ed(o)})}),1500)}}pm(()=>{at.travado||ed(nt.fase)});var xl={dica:60,mira:100};nt.itens=Object.assign({dica:3,mira:2},Fo.itens||{});function Oo(){Xe("#qDica").textContent=nt.itens.dica||"+",Xe("#qMira").textContent=nt.itens.mira||"+"}function rM(){mm(nt.moedas)}var No=null;function Um(i){No=i,Xe("#cTitulo").textContent=Rt(i==="dica"?"maisDica":"maisMira"),Xe("#cIcone").innerHTML=Xe(i==="dica"?"#bDica svg":"#bMira svg").outerHTML,Xe("#cPreco").textContent=xl[i],Xe("#cMoedas").disabled=nt.moedas<xl[i],Xe("#cVideo").hidden=!xm(),Xe("#compra").hidden=!1,at.pausado=!0}function Om(){Xe("#compra").hidden=!0,at.pausado=!1,No=null}function Bm(i){nt.itens[i]=(nt.itens[i]||0)+1,Uo(),Oo(),xt("estrela",{varia:0})}Xe("#cMoedas").onclick=()=>{let i=No;!i||nt.moedas<xl[i]||(nt.moedas-=xl[i],xt("moedas"),rM(),Bm(i),Om())};Xe("#cVideo").onclick=()=>{let i=No;i&&(xt("botao"),Xe("#compra").hidden=!0,Mm().then(e=>{e&&Bm(i),at.pausado=!1,No=null}))};Xe("#cFechar").onclick=()=>{xt("botao"),Om()};fm(()=>{if(at.travado||at.pausado)return;if(!nt.itens.dica)return Um("dica");let i=Gp(at.estado);!i||at.piscando||(nt.itens.dica--,Uo(),Oo(),at.destaca(i))});Xe("#bMira").onclick=()=>{if(xt("botao"),!(at.travado||at.pausado)){if(at.modoMira){at.modoMira=!1,Xe("#bMira").classList.remove("ativo"),Xe("#avisoMira").hidden=!0;return}if(!nt.itens.mira)return Um("mira");at.modoMira=!0,Xe("#bMira").classList.add("ativo"),Xe("#avisoMira").hidden=!1}};at.ao.mira=()=>{nt.itens.mira--,Uo(),Oo(),Xe("#bMira").classList.remove("ativo"),Xe("#avisoMira").hidden=!0,xt("vitoria",{tom:1.6,vol:.5})};Oo();function td(){let i=Xe("#somEstado"),e=hl();i.textContent=Rt(e?"desligado":"ligado"),i.classList.toggle("off",e);let t=Xe("#musicaEstado"),n=dl();t.textContent=Rt(n?"ligado":"desligado"),t.classList.toggle("off",!n)}Xe("#bMusica").onclick=()=>{dl(!dl()),xt("botao"),td()};Xe("#bAjustes").onclick=()=>{xt("botao"),td(),Xe("#ajustes").hidden=!1,at.pausado=!0};Xe("#bFechaAjustes").onclick=()=>{xt("botao"),Xe("#ajustes").hidden=!0,at.pausado=!1};Xe("#bSom").onclick=()=>{hl(!hl()),xt("botao"),td()};vm({pausa:()=>{Ku(!0),at.pausado=!0},volta:()=>{Ku(!1),at.pausado=!Xe("#ajustes").hidden||!Xe("#compra").hidden}});function sM(){Xe("#jogarFase").textContent=Rt("fase",nt.fase+1),ul("titulo"),Xe("#hud").classList.add("escondido"),at.travado=!0,at.raiz.visible=!1}Xe("#bJogar").onclick=()=>{xt("botao");let i=Xe("#inicio");i.dataset.ocupado||(i.dataset.ocupado="1",_m().then(()=>{i.classList.add("saindo"),setTimeout(()=>{i.hidden=!0},350),Xe("#hud").classList.remove("escondido"),at.raiz.visible=!0,at.monta(gs),pl(0),at.travado=!1,gl(),setTimeout(()=>Nm(nt.fase+1,ps(nt.fase+1)),400),ul("fase")}))};var mE=new URLSearchParams,wm=nt.fase;Promise.all([xs.usa(ps(wm+1)),Qy(),document.fonts.ready]).then(async()=>{await ed(wm),sM();for(let i=0;i<40;i++)Im(1/60);document.body.dataset.pronto="1",Po({lipy:"carregou"}),Fm()}).catch(i=>{console.error(i)});})();
