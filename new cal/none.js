const buttons = document.querySelectorAll(".btn");
const form = document.querySelector("form");
// console.log(buttons[0])
const text = document.querySelector("#text");
let string = "";
var arr=[];
var flag=true;
console.log("calculator");
function evaluate(a)
{
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
  
  return ans;
}
for (let button of buttons) {
  button.addEventListener("click", (event) => {
    let c = event.target.innerHTML;
    //  console.log(typeof c)
    if(c<="9"&& c>="0")
    {
        string=string+c;
        text.value=text.value+c;
    }
    else if(c=="/" || c=="*" || c=="+" || c=="-")
    {
        
        if(string!="" && string[string.length-1]!=".")
        {
            string=+string;
            console.log(string);
            arr.push(string);
            arr.push(c);
            string="";
            flag=true;
        }
        let s=text.value;
        if (
          s != "" &&
          s[s.length - 1] != "/" &&
          s[s.length - 1] != "-" &&
          s[s.length - 1] != "+" &&
          s[s.length - 1] != "*" &&
          s[s.length-1]!="."
        )
        {
            text.value = text.value + c;
        }
    }
    else if(c=="." && flag && string!="")
    {

        let s=text.value;
        if (
          s != "" &&
          s[s.length - 1] != "/" &&
          s[s.length - 1] != "-" &&
          s[s.length - 1] != "+" &&
          s[s.length - 1] != "*"
        )
        {
            string=string+".";
            text.value=text.value+c;
            flag=false;
        }

    }
    else if(c=="=" || c=="%")
    {
        let s=text.value;
        if (
          s != "" &&
          s[s.length - 1] != "/" &&
          s[s.length - 1] != "-" &&
          s[s.length - 1] != "+" &&
          s[s.length - 1] != "*" &&
          s[s.length-1]!="."
        )
        {
            if(string!="")
            {
                string=+string;
                arr.push(string);
            }
            //console.log(evaluate(arr));
            let ans=evaluate(arr);
            if(c=="%")
            {
              ans=ans/100;
            }
            arr=[];
            string=String(ans)
            if(String(ans)=="NaN")
            ans="ERROR"
            // console.log(ans,typeof ans);
            string=string.slice(0,14);
            text.value=String(ans).slice(0,14);
        }
    }
    else if(c=="AC")
    {
      arr=[];
      string="";
      text.value="";
    }
    else if(c=="C")
    {
      let lchar=text.value;
      console.log(lchar)
      if(lchar=="")
      {
        arr=[];
        string="";
      }
      else{
        let lc=lchar[lchar.length-1];
        if(lc=="/" || lc=="*" || lc=="+" || lc=="-")
        {
          arr.pop();
          string=String(arr.pop());
        }
        else{
          string=string.slice(0,string.length-1);
          console.log('c'," ",string)
        }
      }
      // console.log(lchar);
      text.value=lchar.slice(0,lchar.length-1);
    }
     console.log(arr);
  });
}