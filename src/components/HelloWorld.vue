<template>
  <div>
    <h1>{{ msg }}</h1>
    MyComponent
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped>
</style>
