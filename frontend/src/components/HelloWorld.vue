<template>
  <div class="hello">
    <button @click="submit">GET Data</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  methods: {
    submit() {
      axios
        .get("http://localhost:3000/boom")
        .then(function(response) {
          alert(response.data);
        })
        .catch(function(error) {
          alert(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
