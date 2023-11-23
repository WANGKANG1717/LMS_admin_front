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
            >
                <el-button type="primary">导入</el-button>
            </el-upload>
            <el-button type="primary" @click="exportBook">导出</el-button>

            <el-popconfirm title="确定删除吗？" style="margin-left: 10px" @confirm="deleteBatch">
                <template #reference>
                    <el-button type="danger">批量删除</el-button>
                </template>
            </el-popconfirm>
        </div>
        <div style="margin-bottom: 10px; margin-left: 10px; width: 100%;">
            <span style="float: right; margin-right: 40px;margin-bottom: 10px;">
                            <el-input v-model="searchParams.bookName"
                                      style="margin-right: 10px; margin-bottom: 10px; width: 200px"
                                      placeholder="请输入图书名"
                                      clearable></el-input>
            <el-input v-model="searchParams.author" placeholder="请输入作者"
                      style="margin-right:  10px; margin-bottom: 10px; width: 200px"
                      clearable></el-input>
            <el-input v-model="searchParams.category" placeholder="请输入图书类别"
                      style="margin-right: 10px; margin-bottom: 10px; width: 200px"
                      clearable></el-input>
            <el-input v-model="searchParams.inventory" placeholder="请输入图书库存"
                      style="margin-right: 10px; margin-bottom: 10px; width: 200px"
                      clearable></el-input>
            <el-input v-model="searchParams.isbn" placeholder="请输入ISBN"
                      style="margin-right: 10px; margin-bottom: 10px; width: 200px"
                      clearable></el-input>
            <el-button type="primary" style="margin-left: 5px;" @click="load">查询</el-button>
            </span>
        </div>
        <!--    行区-->
        <div style="margin: 10px">
            <el-table :data="tableData" border stripe style="width: 99%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column prop="id" label="ID" sortable></el-table-column>
                <el-table-column prop="bookName" label="名称" sortable></el-table-column>
                <el-table-column prop="price" label="单价" sortable></el-table-column>
                <el-table-column prop="author" label="作者" sortable></el-table-column>
                <el-table-column prop="translator" label="译者" sortable></el-table-column>
                <el-table-column prop="category" label="分类" sortable></el-table-column>
                <el-table-column prop="isbn" label="ISBN" sortable></el-table-column>
                <el-table-column prop="publishTime" label="出版时间" sortable>
                    <template slot-scope="scope">
                        {{ scope.row.publishTime | formatDate('yyyy-MM-dd') }}
                    </template>
                </el-table-column>
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
                    layout="total, sizes, ->, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>

            <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
                <el-form ref="form" :model="form" label-width="120px" :rules="rules">
                    <el-form-item label="名称" prop="bookName">
                        <el-input v-model="form.bookName" style="width: 80%"></el-input>
                    </el-form-item>
                    <el-form-item label="单价" prop="price">
                        <el-input v-model="form.price" style="width: 80%"></el-input>
                    </el-form-item>
                    <el-form-item label="作者" prop="author">
                        <el-input v-model="form.author" style="width: 80%"></el-input>
                    </el-form-item>
                    <el-form-item label="译者" prop="translator">
                        <el-input v-model="form.translator" style="width: 80%"></el-input>
                    </el-form-item>
                    <el-form-item label="分类" prop="category">
                        <el-input v-model="form.category" style="width: 80%"></el-input>
                    </el-form-item>
                    <el-form-item label="出版日期" prop="publishTime">
                        <div>
                            <el-date-picker v-model="form.publishTime" value-format="yyyy-MM-dd" type="date"
                                            style="width: 80%"
                                            clearable></el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="封面">
                        <el-upload ref="upload" :action="avatarUploadUrl" :on-success="avatarUploadSuccess">
                            <el-button type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="ISBN" prop="isbn">
                        <el-input v-model="form.isbn" style="width: 80%"></el-input>
                    </el-form-item>
                    <el-form-item label="库存" prop="inventory">
                        <el-input v-model="form.inventory" v-model.number="form.inventory"
                                  style="width: 80%"></el-input>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                      <el-button @click="dialogVisible = false">取 消</el-button>
                      <el-button type="primary" @click="submitForm()">确 定</el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import request from "@/utils/request";
import {addBook, bookList, deleteBatchBook, deleteBook, updateBook} from "@/api/book";

export default {
    name: "Book",
    components: {},
    filters: {
        formatDate: function (value, args) {
            var dt = new Date(value)
            if (args === 'yyyy-M-d') { // yyyy-M-d
                const year = dt.getFullYear()
                const month = dt.getMonth() + 1
                const date = dt.getDate()
                return `${year}-${month}-${date}`
            } else if (args === 'yyyy-M-d H:m:s') { // yyyy-M-d H:m:s
                const year = dt.getFullYear()
                const month = dt.getMonth() + 1
                const date = dt.getDate()
                const hour = dt.getHours()
                const minute = dt.getMinutes()
                const second = dt.getSeconds()
                return `${year}-${month}-${date} ${hour}:${minute}:${second}`
            } else if (args === 'yyyy-MM-dd') { // yyyy-MM-dd
                const year = dt.getFullYear()
                const month = (dt.getMonth() + 1).toString().padStart(2, '0')
                const date = dt.getDate().toString().padStart(2, '0')
                return `${year}-${month}-${date}`
            } else { // yyyy-MM-dd HH:mm:ss
                const year = dt.getFullYear()
                const month = (dt.getMonth() + 1).toString().padStart(2, '0')
                const date = dt.getDate().toString().padStart(2, '0')
                const hour = dt.getHours().toString().padStart(2, '0')
                const minute = dt.getMinutes().toString().padStart(2, '0')
                const second = dt.getSeconds().toString().padStart(2, '0')
                return `${year}-${month}-${date} ${hour}:${minute}:${second}`
            }
        }
    },
    data() {
        return {
            rules: {
                bookName: [
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
                publishTime: [
                    {required: true, message: '请选择出版日期', trigger: 'blur'},
                ],
                inventory: [
                    {required: true, message: '请输入库存', trigger: 'blur'},
                    {type: 'number', message: '库存必须为数字值'}
                ],
            },
            admin: {},
            searchParams: {
                "bookName": "",
                "author": "",
                "category": "",
                "isbn": "",
                "inventory": "",
            },
            search: '',
            currentPage: 1,
            pageSize: 10,
            total: 10,
            dialogVisible: false,
            form: {},
            tableData: [],
            importUrl: window.server.Url + "/book/import",
            avatarUploadUrl: window.server.Url + "/files/upload",
            ids: [],  //需要删除的id的数组
        }
    },
    //网页一加载就调用这个方法
    created() {
        this.admin = this.$store.getters.admin
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
        deleteBatch() {
            //判断是否选择了数据
            if (!this.ids.length) {
                this.$message.warning("请选择数据！");
                return;
            }
            //一次性将ids数组中的id发送到后台
            deleteBatchBook(this.ids).then(res => {
                if (res.code === 200) {
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
            location.href = window.server.Url + "/book/export";
        }
        ,
        avatarUploadSuccess(res) {
            // console.log("avatarUploadSuccess" + res);
            this.form.cover = res.data;
        }
        ,
        load() {
            var params = {
                'pageNum': this.currentPage,
                'pageSize': this.pageSize,
                ...this.searchParams
            }
            console.log(params)
            bookList(params).then(
                res => {
                    console.log("load" + res);
                    if (res.code == 200) {
                        this.tableData = res.data.rows;
                        this.total = parseInt(res.data.total);
                    }
                    else {
                        this.$message.error(res.msg);
                    }
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
                updateBook(this.form).then(
                    res => {
                        console.log("update" + res);
                        if (res.code === 200) {
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
                addBook(this.form).then(
                    res => {
                        console.log("add" + res);
                        if (res.code === 200) {
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
            deleteBook(id).then(
                res => {
                    console.log("delete" + res);
                    if (res.code === 200) {
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
            console.log(this.dialogVisible)
            //这是一个处理未来元素的方法
            //处理可能因为点击按钮和弹窗是异步加载导致读取不到元素的情况
            this.$nextTick(() => {
                if (this.$refs["upload"]) {
                    this.$refs["upload"].clearFiles();
                }
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
