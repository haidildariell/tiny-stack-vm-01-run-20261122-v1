import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'fs';
const T="!2b%'+,0        *******&***&*** ***             AEEA!           &)              %%\"%\"";
function run(p,g){
 const D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536);
 let l=0,s=0,c=0,i=0,x=0,t=0;
 const e=z=>({out:o.slice(0,l),code:z});
 for(;;){
  if(t==1e6)return e(10);
  if(x<0||x>=p.length)return e(9);
  const op=p[x],q=T.charCodeAt(op)-33;
  if(!(q>=0))return e(5);
  const m=q>>4,y=q>>2&3,w=q&3;
  if(x+m>=p.length)return e(9);
  t++;const v=x+1+m;
  if(s<y||s-y+w>256)return e(s<y?2:3);
  x=v;
  if(op>15&&op<35){
   if(op==23||op==27)D[s-1]=op<24?-D[s-1]|0:~D[s-1];
   else{
    const b=D[s-1],a=D[s-2],A=a>>>0,B=b>>>0;
    if(!b&&op>18&&op<23)return e(4);
    const r=op==16?a+b|0:op==17?a-b|0:op==18?Math.imul(a,b):op==19?(a/b)|0:op==20?a%b|0:op==21?A/B|0:op==22?A%B|0:op==24?a&b:op==25?a|b:op==26?a^b:op==28?a<<b:op==29?a>>b:op==30?(a>>>b)|0:op==32?a==b?1:0:op==33?a<b?1:0:A<B?1:0;
    s-=2;D[s++]=r;
   }
  }else switch(op){
   case 0:return e(0);
   case 1:D[s++]=(p[v-1]<<24)>>24;break;
   case 2:D[s++]=p[v-4]|p[v-3]<<8|p[v-2]<<16|p[v-1]<<24;break;
   case 3:s--;break;
   case 4:D[s]=D[s-1];s++;break;
   case 5:{const a=D[s-1];D[s-1]=D[s-2];D[s-2]=a;break;}
   case 6:D[s]=D[s-2];s++;break;
   case 7:{const a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;break;}
   case 48:case 49:case 50:if(op==48||(op==49?D[--s]==0:D[--s]!=0))x=v+(((p[v-2]|p[v-1]<<8)<<16)>>16);break;
   case 51:if(c==64)return e(7);C[c++]=v;x=p[v-2]|p[v-1]<<8;break;
   case 52:if(!c)return e(8);x=C[--c];break;
   case 64:{const a=D[s-1];if(a<0||a>255)return e(6);D[s-1]=M[a];break;}
   case 65:{const a=D[s-1],z=D[s-2];if(a<0||a>255)return e(6);s-=2;M[a]=z;break;}
   case 80:{const d=String(D[s-1]);if(l+d.length>65536)return e(11);s--;for(const k of d)o[l++]=k.charCodeAt(0);break;}
   case 81:if(l+1>65536)return e(11);o[l++]=D[--s]&255;break;
   case 82:D[s++]=i<g.length?g[i++]:-1;break;
   default:return e(D[--s]&255);
  }
 }
}
const I=process.env.MAKEFUN_INPUT_DIR||'/input',O=process.env.MAKEFUN_OUTPUT_DIR||'/output';
for(const d of readdirSync(I)){
 const r=run(readFileSync(I+'/'+d+'/program.bin'),readFileSync(I+'/'+d+'/input.bin'));
 mkdirSync(O+'/'+d,{recursive:true});
 writeFileSync(O+'/'+d+'/stdout.bin',r.out);
 writeFileSync(O+'/'+d+'/exit.txt',r.code+'\n');
}
