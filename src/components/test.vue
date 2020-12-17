<template>
  <div>
      <h3>i am test</h3>
      <div>
          <h4>
              {{msg1}}
          </h4>
      </div>
  </div>
</template>

<script>
export default {
  // props: [
  //   'msg'
  // ],
  name: 'test',
  data () {
    return {
      msg1: ''
    }
  },
  mounted () {
    this.msg1 = this.$route.query.msg
  }
}
</script>

<style>

</style>
