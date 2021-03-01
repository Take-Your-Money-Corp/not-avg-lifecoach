<template>
  <div class="user-flexbox" v-if="conversation[index].chatStyle === 'user'">
    <p class="chat-message userMessage">
      {{ conversation[index].message }}
    </p>
    <img class="userPic" src="../assets/female.png" />
  </div>
</template>

<script>
export default {
  props: {
    conversation: {
      type: Array
    },
    index: {
      type: Number
    }
  }
};
</script>

<style></style>
