<template>
  <div style="padding:0px 0">
    <!--    功能区域-->
    <div style="margin: 10px">
      <el-button type="primary" @click="add">新增</el-button>
      <el-upload
          :action="importUrl"
          :on-success="handleUploadSuccess"
          :show-file-list=false
          :limit="10"
          accept='.xlsx'
          style="display: inline-block; margin: 0 10px"
          v-if="admin.role===1"
      >
        <el-button type="primary">导入</el-button>
      </el-upload>
      <el-button type="primary" @click="exportBook" v-if="admin.role===1">导出</el-button>

      <el-popconfirm title="确定删除吗？" @confirm="deleteBatch" v-if="admin.role===1">
        <template #reference>
          <el-button type="danger">批量删除</el-button>
        </template>
      </el-popconfirm>
      <span style="float: right; width: 40%">
        <el-input v-model="search" placeholder="请输入关键字" style="width: 80%" clearable></el-input>
        <el-button type="primary" style="margin-left: 5px;" @click="load">查询</el-button>
      </span>
    </div>
    <!--    行区-->
    <div style="margin: 10px">
      <el-table :data="tableData" border stripe style="width: 99%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="35" v-if="admin.role===1"></el-table-column>
        <el-table-column prop="id" label="ID" sortable></el-table-column>
        <el-table-column prop="name" label="名称" sortable></el-table-column>
        <el-table-column prop="price" label="单价" sortable></el-table-column>
        <el-table-column prop="author" label="作者" sortable></el-table-column>
        <el-table-column prop="category" label="分类" sortable></el-table-column>
        <el-table-column prop="isbn" label="ISBN" sortable></el-table-column>
        <el-table-column prop="createtime" label="出版时间" sortable></el-table-column>
        <el-table-column label="封面" width="122px" sortable>
          <template #default="scope">
            <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.cover"
                :preview-src-list="[scope.row.cover]">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="inventory" label="库存" sortable></el-table-column>
        <el-table-column label="操作" width="210px">
          <template #default="scope">
            <el-button type="primary" size="mini" @click="buy(scope.row.id)">购买</el-button>
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

      <el-dialog title="提示" v-model="dialogVisible" width="30%">
        <el-form ref="form" :model="form" label-width="120px" :rules="rules">
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="单价" prop="price">
            <el-input v-model="form.price" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="作者" prop="author">
            <el-input v-model="form.author" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="分类" prop="category">
            <el-input v-model="form.category" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="出版日期" prop="createtime">
            <div>
              <el-date-picker v-model="form.createtime" value-format="YYYY-MM-DD" type="date" style="width: 80%"
                              clearable></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="封面">
            <el-upload ref="upload" :action="headpicUploadUrl" :on-success="headpicUploadSuccess">
              <el-button type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="ISBN" prop="isbn">
            <el-input v-model="form.isbn" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="库存" prop="inventory">
            <el-input v-model="form.inventory" v-model.number="form.inventory" style="width: 80%"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm()">确 定</el-button>
        </span>
        </template>
      </el-dialog>
      <!--      购买提示-->
      <el-dialog title="提示" v-model="buyVisible" width="30%">
        <el-form ref="buyForm" :model="buyForm" label-width="120px" :rules="rules">
          <el-form-item label="图书Id" prop="bookId">
            <el-input v-model="buyForm.bookId" style="width: 80%" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户Id" prop="userId">
            <el-input v-model="buyForm.userId" v-model.number="buyForm.userId" style="width: 80%" placeholder="请输入有效用户Id"></el-input>
          </el-form-item>
          <el-form-item label="优惠" prop="discount">
            <el-input v-model="buyForm.discount" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="运费" prop="transportPrice">
            <el-input v-model="buyForm.transportPrice" style="width: 80%"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
        <span class="dialog-footer">
          <el-button @click="buyVisible = false">取 消</el-button>
          <el-button type="primary" @click="sendBuy">确 定</el-button>
        </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Book",
  components: {},
  data() {
    return {
      rules: {
        name: [
          {required: true, message: '请输入书籍名称', trigger: 'blur'},
        ],
        price: [
          {required: true, message: '请输入价格', trigger: 'blur'},
          {
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: '请输入正确金额格式,可保留两位小数'
          },
        ],
        author: [
          {required: true, message: '请输入作者', trigger: 'blur'},
        ],
        category: [
          {required: true, message: '请输入分类', trigger: 'blur'},
        ],
        isbn: [
          {required: true, message: '请输入ISBN', trigger: 'blur'},
          {
            pattern: /^\d{13}$/,
            message: '请输入正确的ISBN'
          },
        ],
        createtime: [
          {required: true, message: '请选择出版日期', trigger: 'blur'},
        ],
        inventory: [
          {required: true, message: '请输入库存', trigger: 'blur'},
          {type: 'number', message: '库存必须为数字值'}
        ],
        userId: [
          {required: true, message: '请输入用户id', trigger: 'blur'},
          {type: 'number', message: '用户Id必须为数字值'}
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
      buyVisible:false,
      form: {},
      tableData: [],
      importUrl: "http://" + window.server.Url + ":9090/book/import",
      headpicUploadUrl: "http://" + window.server.Url + ":9090/files/upload",
      ids: [],  //需要删除的id的数组
      //暂时只加这两个参数
      buyForm: {},
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
    buy(bookId) {
      this.buyVisible=true;
      this.buyForm= {};
      this.buyForm.bookId = bookId;
      this.$nextTick(() => {
        this.$refs['buyForm'].clearValidate(); // 只清除清除验证
      });
    },
    sendBuy() {
      this.$refs['buyForm'].validate((valid) => {
        if (!valid) {
          this.$message({
            type: "error",
            message: "请检查表单"
          })
          return false;
        }
        //表单合法，发送请求
        // console.log(this.buyForm);
        request.post("/order/buy", this.buyForm).then(
            res => {
              // console.log("sendBuy" + res);
              if (res.code === '0') {
                this.$message({
                  type: "success",
                  message: "订单创建成功,3秒后自动跳转至付款界面"
                });
                // console.log(res);
                setTimeout(() => {
                  window.open(res.data);
                }, 3000);
              } else {
                this.$message({
                  type: "error",
                  message: res.msg
                })
              }
              this.buyVisible=false;
            }
        )
      });
    },
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
    deleteBatch() {
      //判断是否选择了数据
      if (!this.ids.length) {
        this.$message.warning("请选择数据！");
        return;
      }
      //一次性将ids数组中的id发送到后台
      request.post("/book/deleteBatch", this.ids).then(res => {
        if (res.code === '0') {
          this.$message.success("批量删除成功！");
          this.load();
        } else {
          this.$message.error(res.msg);
        }
      })
    }
    ,
    handleSelectionChange(val) {
      this.ids = val.map(v => v.id);      //只将id存到ids数组中
    }
    ,
    handleUploadSuccess(res) {
      if (res.code === "0") {
        this.$message.success("导入成功");
        this.load();
      } else {
        this.$message.error("导入失败");
      }
    }
    ,
    exportBook() {
      location.href = "http://" + window.server.Url + ":9090/book/export";
    }
    ,
    headpicUploadSuccess(res) {
      // console.log("headpicUploadSuccess" + res);
      this.form.cover = res.data;
    }
    ,
    load() {
      request.get("/book", {
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
      // console.log(this.tableData);
    }
    ,
    //添加按钮
    add() {
      this.dialogVisible = true;
      this.form = {};
      this.$nextTick(() => {
        if (this.$refs["upload"]) {
          this.$refs["upload"].clearFiles();
        }
      });
      this.$nextTick(() => {
        this.$refs['form'].clearValidate(); // 只清除清除验证
      });
    }
    ,
    //保存&更新
    save() {
      if (this.form.id) {
        request.put("/book", this.form).then(
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
        request.post("/book", this.form).then(
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
    }
    ,
    handleDelete(id) {
      console.log(id);
      request.delete("/book/" + id).then(
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
    }
    ,
    //编辑
    handleEdit(row) {
      //深拷贝，避免浅拷贝问题
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true;
      //这是一个处理未来元素的方法
      //处理可能因为点击按钮和弹窗是异步加载导致读取不到元素的情况
      this.$nextTick(() => {
        if (this.$refs["upload"]) {
          this.$refs["upload"].clearFiles();
        }
      });
      this.$nextTick(() => {
        this.$refs['form'].clearValidate(); // 只清除清除验证
      });
    }
    ,
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.load();
    }
    ,
    handleCurrentChange(pageNum) {
      this.currentPage = pageNum;
      this.load();
    }
    ,
  }
}
</script>
