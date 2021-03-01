<template>
  <div class="bot-flexbox" v-if="conversation[index].chatStyle === 'bot'">
    <img class="botPic" src="../assets/male.png" />
    <p data-testid="botMessage" class="chat-message botMessage">
      {{ conversation[index].message }}
    </p>
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
