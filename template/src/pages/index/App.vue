<template>
  {{#ProjectType}}
  <div id="wrapper" v-if="isShow">
    {{else}}
    <div id="wrapper">
      {{/ProjectType}}
      <h1>hello,world</h1>
      {{#router}}
      <router-view></router-view>
      {{/router}}
    </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
      {{#ProjectType}}
      isShow: true
      {{/ProjectType}}
      };
      },
      created() {
        {{#ProjectType}}

        {{/ProjectType}}
        }
        };
</script>

<style lang="less" type="text/less">
  @import "~styles/base";
  @import "~styles/main";
  @import "~styles/dialog";
</style>
