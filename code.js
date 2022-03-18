process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "coronavirus 3 abcde crnas onarous"
var input_stdin_array = "";
var input_currentline = 0;


    input_stdin_array = input_stdin.split(" ");
    console.log("print");
	//Write code here
  console.log(input_stdin);
    var N_numberofpeple=2
    console.log(input_stdin_array[0].length);

    str1_len=input_stdin_array[0].length
    var i=0
    var j=0

    for(var iu=1;iu<=input_stdin_array[1];iu++){
      str2_len=input_stdin_array[N_numberofpeple].length
      for(i=0; i<=str1_len; i++){
        console.log(i);
        for(j=0; j<=str2_len; j++){
          console.log(j);
          console.log(input_stdin_array[0][i]);
          console.log(input_stdin_array[N_numberofpeple][j]);
          if(input_stdin_array[0][i] == input_stdin_array[N_numberofpeple][j]){
            console.log(input_stdin_array[N_numberofpeple][j])
            j=j+1
          }
          i=i+1
        }
      }
      if(j==str1_len){
        console.log("print the next value");
      }
      N_numberofpeple=N_numberofpeple+1
    }
