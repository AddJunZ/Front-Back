<template>
  <div class="login-wrapper">
    <div class="login-items">
      <span>用户名：</span>
      <input type="text" v-model="username" />
    </div>
    <div class="login-items">
      <span>密码：</span>
      <input type="password" v-model="password" />
    </div>
    <div class="submit" @click="submit">提交</div>
    <div class="submit" @click="regist">注册</div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      username: "AddJunZ",
      password: "123"
    };
  },
  methods:{
    submit(){
      this.$axios.post('/user/addPerson',{
        username:this.username,
        password:this.password
      }).then(res=>{
        console.log(res);
      })
    }
  }
};
</script>
<style scoped>
.login-wrapper {
  width: 500px;
  margin:0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.login-items {
  margin:10px 0;
  width: 300px;
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
  flex: 3;
  width: 200px;
  height: 30px;
}
.submit{
  border-radius: 10px;
  padding: 6px 12px;
  cursor: pointer;
  background-color: rgba(65, 184, 131, 0.5);
}
</style>

