let input = "";

      function appendInput(value) {
        input += value;
        document.getElementById("result").value = input;
      }

      function clearResult() {
        input = "";
        document.getElementById("result").value = "";
      }

      function calculate() {
        try {
          const result = eval(input);
          document.getElementById("result").value = result;
          input = "";
        } catch (error) {
          document.getElementById("result").value = "Error";
        }
      }