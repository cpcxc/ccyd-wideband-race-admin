<template>
  	<div>
	  	<transition name="form-fade" mode="in-out">
	  		<div class="container" v-show="showLogin">
          <div class="top">
            <div class="header">
              <img alt="" class="logo" src="../assets/logo.svg" />
              <span class="title">长春分公司员工宽带竞赛开</span>
            </div>
            <p class="desc">管理当前完成提交的宽带办理信息</p>
          </div>
		    	<el-form class="main" :model="loginForm" :rules="rules" ref="loginForm">
						<el-form-item prop="username">
							<el-input v-model="loginForm.username" placeholder="用户名" prefix-icon="gaf-icons gaf-icon-user"><span>dsfsf</span></el-input>
						</el-form-item>
						<el-form-item prop="password">
							<el-input type="password" placeholder="密码" v-model="loginForm.password" prefix-icon="gaf-icons gaf-icon-password"></el-input>
						</el-form-item>
						<el-form-item>
								<el-button type="primary" @click="submitForm('loginForm')" :style="{width: '100%'}">登录</el-button>
						</el-form-item>
					</el-form>
	  		</div>
	  	</transition>
  	</div>
</template>

<script>
import api from '@/api'
// import {mapActions, mapState} from 'vuex'
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      showLogin: false
    };
  },
  mounted() {
    this.showLogin = true;
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await api.login(this.loginForm);
          console.log(res);
          if (res.errcode === 0) {
            this.$message({
              type: "success",
              message: "登录成功",
              duration: 1000
            });
            this.$root.login = true;
            this.$root.groups = res.groups || [];
            this.$router.push("/");
          } else {
            this.$notify.error({
              title: "错误",
              message: res.errmsg,
              offset: 140
            });
          }
        } else {
          this.$notify.error({
            title: "错误",
            message: "请输入正确的用户名和密码",
            offset: 140
          });
          return false;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.container {
  width: 100%;
  padding: 0 40px 0 40px;
  position: absolute;
  top: 50%;
  margin-top: -150px;
  height: 300px;
}
.main {
  max-width: 368px;
  margin: 0 auto;
}
.top {
  text-align: center;
}

.header {
  height: 44px;
  line-height: 44px;
}

.logo {
  height: 44px;
  vertical-align: top;
  margin-right: 16px;
}

.title {
  font-size: 1.5em;
  color: fade(#000, 85%);
  font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 600;
  position: relative;
  top: 2px;
}

.desc {
  font-size: 14px;
  color: fade(#000, 45%);
  margin-top: 12px;
  margin-bottom: 20px;
  }
@media screen and (max-width: 320px) {
  .container {
    padding: 0 20px 0 20px;
  }
  .title {
    font-size: 24px;
  }
}
</style>
