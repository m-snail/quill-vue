<template>
  <div class="hello">
    <commonEditor :postsonDisabled="lookState" :postsonContent="content" @postfatherContent="delsonContent"></commonEditor>
  </div>
</template>

<script>
  import commonEditor from './common/commonEditor';
export default {
  name: 'HelloWorld',
  components: {
    commonEditor
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      lookState: false,//查看状态下 不可编辑
      //        新增文章
      content: '',
    }
  },
  methods: {
    //接收文本编辑器
    delsonContent(msg){this.content=msg;},
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
