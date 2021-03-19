<template>
  <div class="user-flexbox" v-if="conversation[index].chatStyle === 'user'">
    <p data-testid="userMessage" class="chat-message userMessage">
      {{ conversation[index].text }}
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
