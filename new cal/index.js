const buttons=document.querySelectorAll(".btn")
// console.log(buttons)
const text=document.querySelector("#text")
let map = new Map();
map.set("+", true);
map.set("-", true);
map.set("*", true);
map.set("/", true);
function evaluate(string){
    let arr=[];
    let flag=false;
    
    let str="";
    for(let i=0;i<string.length;i++)
    {
        if(string[i]<='9' && string[i]>='0')
        {
            str=str+string[i];
        }
        else if(string[i]=='.')
        {
            if (
              flag ||
              i == 0 ||
              i == string.length - 1 ||
              !(string[i - 1] <= "9" && string[i - 1] >= "0") ||
              !(string[i+1] <= "9" && string[i+1] >= "0")
            )
              return "ERROR";
            else{
                str=str+'.';
                flag=true;
            }
        }
        else if(map.has(string[i]))
        {
            //console.log(str)
            if (
              str == "" ||
              i == 0 ||
              i == string.length - 1 ||
              !(string[i - 1] <= "9" && string[i - 1] >= "0") ||
              !(string[i + 1] <= "9" && string[i + 1] >= "0")
            )
              return "ERROR";
            flag=false;
            str=+str;
            if(String(str)==NaN)return "ERROR";
            arr.push(str);
            arr.push(string[i])
            str="";
        }
        else
        {
            return "ERROR";
        }
    }
    str=+str
    arr.push(str);
    console.log(arr)
    //console.log(string)
        let a=arr;
      let narr = [];
      //let k=a[0];
      narr.push(a[0]);
      for (let i = 1; i < a.length; i = i + 2) {
        // let k=a[0];
        if (arr[i] == "/") {
          let k = narr.pop();

          narr.push(k / a[i + 1]);
        } else if (a[i] == "*") {
          narr.push(narr.pop() * a[i + 1]);
        } else {
          narr.push(a[i]);
          narr.push(a[i + 1]);
        }
      }

      // console.log(narr);
      if (narr.length == 1) return narr[0];
      let ans = narr[0];
      for (let i = 1; i < narr.length; i = i + 2) {
        if (narr[i] == "+") {
          ans = ans + narr[i + 1];
        } else {
          ans = ans - narr[i + 1];
        }
      }

      if(String(ans)==NaN)return "ERROR";
      return String(ans);
}
for(let i of buttons)
{
    i.addEventListener("click",()=>{
        // console.log(i.innerHTML)

        let c=i.innerHTML;
        let str=text.value;
        if(str=="ERROR")
        {
            text.value="";
        }
        if(c=='C')
        {
            let string=text.value;
            text.value=string.substring(0,string.length-1);
        }
        else if(c=="AC")
        {
            text.value="";
        }
        else if(c=="=")
        {
            let string =text.value;
            text.value=evaluate(string);
            text.value=text.value.slice(0,14);
        }
        else if(c=="%")
        {
            let string =text.value;
            string=evaluate(string);
            string=string+"/100";
            string=evaluate(string)
            text.value=string;
            text.value=text.value.slice(0,14);
        }
        else{
            text.value=text.value+c;
        }
    })
}
const form=document.querySelector("#form")
const body=document.body;
form.addEventListener("submit",(event)=>{
    event.preventDefault();
  //console.log(text.value);
  text.value=evaluate(text.value);
  text.value=text.value.slice(0,14);
})