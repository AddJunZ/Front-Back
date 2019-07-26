<template>
  <div class="enter">
    <div class="login-wrapper">
      <div class="login-items">
        <span>用户名：</span>
        <input type="text" v-model="username" />
      </div>
      <div class="login-items">
        <span>密码：</span>
        <input type="password" v-model="password" />
      </div>
    </div>
    <div class="submit-items">
      <div class="submit" @click="submit">提交</div>
      <div class="submit" @click="regist">注册</div>
    </div>
  </div>
</template>
<script>
import { log } from 'util';
export default {
  name: "Login",
  data() {
    return {
      username: "AddJunZ",
      password: "123"
    };
  },
  methods: {
    submit() {
      this.$axios
        .post("/user/login", {
          username: this.username,
          password: this.password
          //应该还有一个身份字段的
        })
        .then(res => {
          console.log(res.data.data);
        });
    },
    regist() {
      //通过注册按钮只能申请学生和快递员账号
      console.log("注册");
      this.$axios
        .post("/user/regist", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          if (res.status == 200) {
            console.log("注册成功", res);
          } else {
            console.log("注册失败");
          }
        });
    }
  }
};
</script>
<style scoped>
.login-wrapper {
  width: 400px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
}
.login-items {
  margin: 14px 0;
  width: 350px;
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: right;
}
.login-items > span {
  user-select: none;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.login-items > input {
  padding: 4px 10px;
  border-radius: 6px;
  outline: none;
  border: 1px solid rgba(65, 184, 131, 0.5);
  flex: 3.5;
  width: 200px;
  height: 36px;
}
.submit-items {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 350px;
}
.submit {
  border-radius: 10px;
  padding: 6px 12px;
  margin: 0 20px;
  cursor: pointer;
  background-color: rgba(65, 184, 131, 0.5);
}
</style>

