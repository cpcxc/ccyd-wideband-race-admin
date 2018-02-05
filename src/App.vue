<template>
  <el-container id="app">
    <el-main>
      <router-view/>
    </el-main>
    <el-footer class="footer" height="48px">
		  <span>中国移动吉林分公司长春公司 © 2018</span>
		</el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      login: false,
      groups: [],
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.el-footer {
  height: 48px;
  line-height: 48px;
  text-align: center;
  font-size: 12px;
  color: #999;
  background: #fff;
  -webkit-box-shadow: 4px 4px 40px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 4px 4px 40px 0 rgba(0, 0, 0, 0.05);
  width: 100%;
  border-top: solid 1px #e6e6e6;
  text-align: center;
}

.copyright {
  color: fade(#000, 45%);
  font-size: 14px;
}

</style>
