<template>
  <div class="login">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户登录" name="login">
        <el-form ref="submitform" :model="submitform" label-width=
        "80px" :rules="rules">
          <el-form-item label="登录名" prop="name">
            <el-input v-model="submitform.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input v-model="submitform.pwd"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
            <el-button @click="resetForm('submitform')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="用户注册" name="regist">
        <el-form ref="registform" :model="registform" label-width="80px" :rules="rules">
          <el-form-item label="注册名" prop="name">
            <el-input v-model="registform.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input v-model="registform.pwd"></el-input>
          </el-form-item> 
          <el-form-item label="确认密码" prop="checkpwd">
            <el-input v-model="registform.checkpwd"></el-input>
          </el-form-item>                    
          <el-form-item>
            <el-button type="primary" @click="onRegist">注册</el-button>
            <el-button @click="resetForm('registform')">重置</el-button>
          </el-form-item>          
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    var pwdValidator = (rule,value,callback) =>{
      if(value == '')callback(new Error('请输入密码'))
      else if (this.registform.checkpwd !== '') this.$refs.registform.validateField('checkpwd');
      callback();
    }
    var checkPwd = (rule,value,callback) => {
      if(value == '')callback(new Error('请再次输入密码'))
      else if(value != this.registform.pwd){
        callback('两次输入不一致')
      }
      callback();
    }
    return {
      activeName:'login',
      //登录的
      submitform:{
        name:'',
        pwd:''
      },
      //注册的
      registform:{
        name:'',
        pwd:'',
        checkpwd:''
      },
      rules:{
        name:[{required:true,message:'请输入用户名',trigger:'blur'}],
        pwd:{required:true,validator:pwdValidator,trigger:'blur'},
        checkpwd:{required:true,validator:checkPwd,trigger:'blur'}
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.submitform.validate((valid) => {
        if (valid) {
          this.$axios.post("/user/login", {
            username: this.submitform.name,
            password: this.submitform.pwd
          }).then(res => {
            if (res.status == 200 && res.data.code == 0) {
              this.$message({
                type: 'success',
                message: '登录成功'
              });
            } else {
              this.$message({
                type:'error',
                message:res.data.msg
              })
            }          
          });
        }
      });      
    },
    onRegist() {
      this.$refs.registform.validate((valid) => {
        if(valid){
          this.$axios.post("/user/regist", {
            username: this.registform.name,
            password: this.registform.pwd
          }).then(res => {
              console.log(res);
            if (res.status == 200 && res.data.code == 0) {
              this.$message({
                type: 'success',
                message: '注册成功'
              });
            } else {
              this.$message({
                type:'error',
                message:res.data.msg
              })
            }
          }).catch(err=>{
            console.log(err);
          })
        }
      })
    },
    handleClick(){

    }
  }
};
</script>
<style scoped>
.login{
  width:400px;
  height:600px;
  margin:0 auto;
}
</style>

