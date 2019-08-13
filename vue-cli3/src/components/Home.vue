<template>
  <div class="home">
    <el-table
      max-height="500"
      ref="multipleTable"
      :data="userList"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="username" label="账号" width="120"></el-table-column>
      <el-table-column prop="password" label="密码" show-overflow-tooltip></el-table-column>
      <el-table-column prop="token" label="令牌" show-overflow-tooltip></el-table-column>
      <el-table-column fixed="right" label="操作" width="60">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, userList)"
            type="text"
            size="small"
          >移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="exit" @click="exit">退出</div>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      userList: []
    };
  },
  mounted() {
    //获得所有角色
    this.$axios.get("/user/searchPerson").then(({ data }) => {
      this.userList = data;
    });
  },
  methods: {
    exit() {
      this.$confirm("确定退出？", "提示")
        .then(() => {
          this.$router.replace('login');
          this.$store.commit('logout');
        })
        .catch(() => {
          //取消代码
        });
    },
    handleSelectionChange() {},
    deleteRow(index, list) {
      this.$confirm(`确定删除该用户:${list[index].username}吗？`, "提示")      
        .then(() => {
          return this.$axios.get("/user/deletePerson", {
            params: {
              username: list[index].username
            }
          })
        }).then(()=>{
          //前端渲染也要去掉那一项
          this.userList.splice(index,1);
          this.$alert('删除成功');          
        })
        .catch(() => {
          console.log('删除失败或取消');
        });
    }
  }
};
</script>
<style scoped>
.home {
  width: 500px;
  margin: 0 auto;
}
.exit {
  position: fixed;
  right: 30px;
  top: 30px;
  height: 100px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: pink;
  cursor: pointer;
}
</style>