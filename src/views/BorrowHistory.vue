<template>
  <div style="padding:0px 0">
    <!--    功能区域-->
    <div style="margin: 10px">
      <el-button type="primary" @click="add">新增</el-button>

      <span style="float: right; width: 40%">
        <el-input v-model="search" placeholder="请输入订单号" style="width: 80%" clearable></el-input>
        <el-button type="primary" style="margin-left: 5px;" @click="load">查询</el-button>
      </span>
    </div>
    <!--    行区-->
    <div style="margin: 10px">
      <el-table :data="tableData" border stripe style="width: 99%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="35" v-if="admin.role===1"></el-table-column>
        <el-table-column prop="id" label="ID" sortable></el-table-column>
        <el-table-column prop="number" label="订单号" sortable></el-table-column>
        <el-table-column prop="totalPrice" label="总价"></el-table-column>
        <el-table-column prop="payPrice" label="实付款"></el-table-column>
        <el-table-column prop="discount" label="优惠"></el-table-column>
        <el-table-column prop="transportPrice" label="运费"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="payTime" label="付款时间"></el-table-column>
        <el-table-column label="支付状态">
          <template #default="scope">
            <span v-if="scope.row.state===0">未支付</span>
            <span v-if="scope.row.state===1">已支付</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="330px">
          <template #default="scope">
              <el-button type="primary" size="mini" @click="showBook(scope.row.bookList)" style="margin-bottom: 5px">图书信息</el-button>
              <el-button type="primary" size="mini" @click="showUser(scope.row.userList)">用户信息</el-button>
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-popconfirm title="确定删除吗？" @confirm="handleDelete(scope.row.id)">
              <template #reference>
                <el-button size="mini" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    分页区-->
    <div style="margin: 10px">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
      <!--订单相关窗口-->
      <el-dialog title="提示" v-model="dialogVisible" width="30%">
        <el-form ref="form" :model="form" label-width="120px" :rules="rules">
          <el-form-item label="书籍ID" prop="bookId">
            <el-input v-model="form.bookId" v-model.number="form.bookId" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="客户ID" prop="userId">
            <el-input v-model="form.userId" v-model.number="form.userId" style="width: 80%"></el-input>
          </el-form-item>
<!--          <el-form-item label="总价" prop="totalPrice">-->
<!--            <el-input v-model="form.totalPrice" style="width: 80%"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="实付款" prop="payPrice">-->
<!--            <el-input v-model="form.payPrice" style="width: 80%"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="优惠" prop="discount">
            <el-input v-model="form.discount" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="运费" prop="transportPrice">
            <el-input v-model="form.transportPrice" style="width: 80%"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm()">确 定</el-button>
        </span>
        </template>
      </el-dialog>
      <!--图书相关窗口-->
      <el-dialog title="图书信息" v-model="bookVis" width="60%">
        <el-table :data="bookList" stripe border>
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="price" label="单价"></el-table-column>
          <el-table-column prop="author" label="作者"></el-table-column>
          <el-table-column prop="category" label="分类"></el-table-column>
          <el-table-column prop="isbn" label="ISBN"></el-table-column>
          <el-table-column prop="createtime" label="出版时间"></el-table-column>
          <el-table-column label="封面" width="122px">
            <template #default="scope">
              <el-image
                  style="width: 100px; height: 100px"
                  :src="scope.row.cover"
                  :preview-src-list="[scope.row.cover]">
              </el-image>
            </template>
          </el-table-column>
          <el-table-column prop="inventory" label="库存" sortable></el-table-column>
        </el-table>
        <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="this.bookVis=false">确 定</el-button>
        </span>
        </template>
      </el-dialog>
      <!--用户信息窗口-->
      <el-dialog title="用户信息" v-model="userVis" width="50%">
        <el-table :data="userList" stripe border>
          <el-table-column prop="id" label="ID" sortable></el-table-column>
          <el-table-column prop="name" label="用户名" sortable></el-table-column>
          <el-table-column prop="nickname" label="昵称" sortable></el-table-column>
          <el-table-column prop="age" label="年龄" sortable></el-table-column>
          <el-table-column prop="sex" label="性别" sortable></el-table-column>
          <el-table-column prop="address" label="地址" sortable></el-table-column>
          <el-table-column label="角色">
            <template #default="scope">
              <span v-if="scope.row.role===0">普通用户</span>
              <span v-if="scope.row.role===1">会员</span>
            </template>
          </el-table-column>
          <el-table-column label="头像" width="122px">
            <template #default="scope">
              <el-image
                  style="width: 100px; height: 100px"
                  :src="scope.row.headpic"
                  :preview-src-list="[scope.row.headpic]">
              </el-image>
            </template>
          </el-table-column>
        </el-table>
        <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="this.userVis=false">确 定</el-button>
        </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Order",
  components: {},
  data() {
    return {
      //用户信息和图书信息
      bookVis: false,
      bookList: [],
      userVis: false,
      userList: [],
      rules: {
        bookId: [
          {required: true, message: '请输入书籍ID', trigger: 'blur'},
          {type: 'number', message: 'bookId必须为数字值'}
        ],
        userId: [
          {required: true, message: '请输入用户ID', trigger: 'blur'},
          {type: 'number', message: 'bookId必须为数字值'}
        ],
        totalPrice: [
          {required: true, message: '请输入总价', trigger: 'blur'},
          {
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: '请输入正确金额格式,可保留两位小数'
          },
        ],
        payPrice: [
          {required: true, message: '请输入实付款', trigger: 'blur'},
          {
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: '请输入正确金额格式,可保留两位小数'
          },
        ],
        discount: [
          {required: true, message: '请输入优惠', trigger: 'blur'},
          {
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: '请输入正确金额格式,可保留两位小数'
          },
        ],
        transportPrice: [
          {required: true, message: '请输入运费', trigger: 'blur'},
          {
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: '请输入正确金额格式,可保留两位小数'
          },
        ],
      },
      admin: {},
      search: '',
      currentPage: 1,
      pageSize: 10,
      total: 10,
      dialogVisible: false,
      form: {},
      tableData: [],
      importUrl: window.server.Url + "/order/import",
      ids: [],  //需要删除的id的数组
    }
  },
  //网页一加载就调用这个方法
  created() {
    let adminStr = sessionStorage.getItem("admin");
    this.admin = JSON.parse(adminStr);
    //请求服务器，确认当前用户的合法信息
    request.get("/admin/" + this.admin.id).then(res => {
      if (res.code === '0') {
        this.admin = res.data;
      }
    })
    // console.log(window.server.filesUploadUrl);
    this.load();
  },
  methods: {
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          this.$message({
            type: "error",
            message: "请检查表单"
          })
          return false;
        }
        this.save();
      });
    },
    showBook(book) {
      this.bookList = book;
      this.bookVis = true;
    },
    showUser(user) {
      this.userList = user;
      this.userVis = true;
    },
    deleteBatch() {
      //判断是否选择了数据
      if (!this.ids.length) {
        this.$message.warning("请选择数据！");
        return;
      }
      //一次性将ids数组中的id发送到后台
      request.post("/order/deleteBatch", this.ids).then(res => {
        if (res.code === '0') {
          this.$message.success("批量删除成功！");
          this.load();
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    handleSelectionChange(val) {
      this.ids = val.map(v => v.id);      //只将id存到ids数组中
    },
    handleUploadSuccess(res) {
      if (res.code === "0") {
        this.$message.success("导入成功");
        this.load();
      } else {
        this.$message.error("导入失败");
      }
    },
    exportOrder() {
      location.href = "http://" + window.server.Url + ":9090/order/export";
    },
    load() {
      request.get("/order", {
        params: {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          search: this.search,
        }
      }).then(
          res => {
            console.log("load" + res);
            this.tableData = res.data.records;
            this.total = res.data.total;
          }
      )
    },
    //添加按钮
    add() {
      this.dialogVisible = true;
      this.form = {};
      this.$nextTick(() => {
        this.$refs['form'].clearValidate() // 只清除清除验证
      });
    },
    //保存&更新
    save() {
      if (this.form.id) {
        request.put("/order", this.form).then(
            res => {
              console.log("update" + res);
              if (res.code === '0') {
                this.$message({
                  type: "success",
                  message: "更新成功"
                })
              } else {
                this.$message({
                  type: "error",
                  message: res.msg
                })
              }
              //刷新数据，并关闭弹窗
              this.load();
              this.dialogVisible = false;
            }
        )
      } else {
        request.post("/order", this.form).then(
            res => {
              console.log("add" + res);
              if (res.code === '0') {
                this.$message({
                  type: "success",
                  message: "新增成功"
                })
              } else {
                this.$message({
                  type: "error",
                  message: res.msg
                })
              }
              this.load();
              this.dialogVisible = false;
            }
        )
      }
    },
    handleDelete(id) {
      console.log(id);
      request.delete("/order/" + id).then(
          res => {
            console.log("delete" + res);
            if (res.code === '0') {
              this.$message({
                type: "success",
                message: "删除成功"
              })
            } else {
              this.$message({
                type: "error",
                message: res.msg
              })
            }
            this.load();
          }
      )
    },
    //编辑
    handleEdit(row) {
      //深拷贝，避免浅拷贝问题
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true;
      this.$nextTick(()=>{
        this.$refs['form'].clearValidate() // 只清除清除验证
      });
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.load();
    },
    handleCurrentChange(pageNum) {
      this.currentPage = pageNum;
      this.load();
    },
  }
}
</script>
