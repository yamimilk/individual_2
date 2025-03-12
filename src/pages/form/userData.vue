<template>

    <div class="search" style="margin-top: 30px;">
        <!-- <el-icon><Search style="width: 1em; height: 2em; margin-right: 8px" /></el-icon> -->
        <el-input v-model="inputValue" placeholder="请输入关键字" prefix-icon="Search">          
        </el-input> 
    </div>
    <el-table :data="currentPageData" style="width: 100%">
        <el-table-column fixed prop="date" label="日期" width="150">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="province" label="省份" width="120">
        </el-table-column>
        <el-table-column prop="city" label="市区" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址" width="300">
        </el-table-column>
        <el-table-column prop="zip" label="邮编" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
            <template #default="scope">
                <el-popconfirm title="确定删除吗？" @confirm="del(scope.row)">
                    <template #reference>
                        <el-button size="small">删除</el-button>
                    </template>
                </el-popconfirm>         
                <el-button size="small" @click="edit(scope.row)">编辑</el-button>
                <el-dialog v-model="dialogFormVisible" title="编辑信息" width="500">
                    <el-form :model="form">
                        <el-form-item label="姓名" :label-width="formLabelWidth">
                            <el-input v-model="form.name" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="省份" :label-width="formLabelWidth">
                            <el-select v-model="form.province" placeholder="请选择省份">
                                <el-option label="上海" value="上海" />
                                <el-option label="山东" value="山东" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="地区" :label-width="formLabelWidth">
                            <el-input v-model="form.city" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="地址" :label-width="formLabelWidth">
                            <el-input v-model="form.address" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="邮编" :label-width="formLabelWidth">
                            <el-input v-model="form.zip" autocomplete="off" />
                        </el-form-item>
                    </el-form>
                    <template #footer>
                        <div class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">Cancel</el-button>
                            <el-button type="primary" @click="saveEdit">
                                Confirm
                            </el-button>
                        </div>
                    </template>
                </el-dialog>
                <el-button size="small" @click="add()">添加</el-button>
                <el-dialog v-model="dialogFormVisible" title="添加用户" width="500">
                    <el-form :model="form">
                        <el-form-item label="姓名" :label-width="formLabelWidth">
                            <el-input v-model="form.name" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="省份" :label-width="formLabelWidth">
                            <el-select v-model="form.province" placeholder="请选择省份">
                                <el-option label="上海" value="上海" />
                                <el-option label="山东" value="山东" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="地区" :label-width="formLabelWidth">
                            <el-input v-model="form.city" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="地址" :label-width="formLabelWidth">
                            <el-input v-model="form.address" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="邮编" :label-width="formLabelWidth">
                            <el-input v-model="form.zip" autocomplete="off" />
                        </el-form-item>
                    </el-form>
                    <template #footer>
                        <div class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">Cancel</el-button>
                            <el-button type="primary" @click="saveAdd">
                                Confirm
                            </el-button>
                        </div>
                    </template>
                </el-dialog>
            </template>
        </el-table-column>


    </el-table>
    <el-pagination size="small" background layout="prev, pager, next" :total="total" :page-size="pageSize"
        v-model:current-page="currentPage" class="mt-4" />

</template>


<script lang="ts">
export default {
    name: "userdata",
}
</script>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from 'vue';
import { type UserInter, type Users } from '@/type';

const inputValue = ref('')

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const form = reactive({
    id: 1,
    date: '',
    name: '',
    province: '' as string | undefined,
    city: '' as string | undefined,
    address: '' as string | undefined,
    zip: 1111 as number | undefined,
})
const edit = (row: UserInter) => {
    form.id = row.id,
    form.name = row.name
    form.province = row.province
    form.city = row.city
    form.address = row.address
    form.zip = row.zip
    dialogFormVisible.value = true
}
function saveEdit() {
    const index = tableData.findIndex((item) => item.id === form.id)
    if (index != -1) {
        tableData[index].name = form.name,
        tableData[index].province = form.province,
        tableData[index].city = form.city,
        tableData[index].address = form.address,
        tableData[index].zip = form.zip

    }
    dialogFormVisible.value = false
    console.log('edit success');
    console.log(tableData[index]);
    console.log(index);

}

function add(){
    dialogFormVisible.value = true
    form.date = new Date().toISOString().slice(0, 10);
    form.id = Math.floor(Math.random() * 11) + 20;
    console.log('输入新用户');
    
}

function saveAdd(){
    tableData.push({...form})
    console.log('保存添加');
    console.log(form);  
    dialogFormVisible.value = false
    // 清空表单
    Object.assign(form, {
        id: 1,
        date: '',
        name: '',
        province: '',
        city: '',
        address: '',
        zip: 1111,
    });
}

//模糊查询功能
const filteredData = computed(()=>{
    if(!inputValue.value){
        return tableData
    }
    const keyword = inputValue.value.toLowerCase();
    return tableData.filter(item =>{
        return(
            item.name.toLowerCase().includes(keyword)||
            item.province?.toLowerCase().includes(keyword)||
            item.city?.toLowerCase().includes(keyword)||
            item.address?.toLowerCase().includes(keyword)
        )
    })
})

let tableData = reactive<Users>([
    {
        id: 1,
        date: '2016-05-03',
        name: '张三',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
    },
    {
        id: 2,
        date: '2016-05-03',
        name: '里斯',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
    }, {
        id: 3,
        date: '2016-05-03',
        name: '二狗',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
    }, {
        id: 4,
        date: '2016-05-03',
        name: '大牛',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
    }, {
        id: 5,
        date: '2016-05-03',
        name: '大牛',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
    }, {
        id: 6,
        date: '2016-05-03',
        name: '大牛',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
    }, {
        id: 7,
        date: '2016-05-03',
        name: '大牛',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
    }, {
        id: 8,
        date: '2016-05-03',
        name: '大牛',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
    }, {
        id: 9,
        date: '2016-05-03',
        name: '大牛',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
    }, {
        id: 10,
        date: '2016-05-03',
        name: '大牛',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
    }, {
        id: 11,
        date: '2016-05-03',
        name: '大牛',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
    }, {
        id: 12,
        date: '2016-05-03',
        name: '大牛',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
    }, {
        id: 13,
        date: '2016-05-03',
        name: '大牛',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
    }
])

function page() {
    //分页相关数据
    const currentPage = ref(1)
    const pageSize = ref(5)
    // const total = ref(tableData.length)
    const total = computed(()=> filteredData.value.length)  

    //当前页数据
    const currentPageData = computed(() => {
        const start = (currentPage.value - 1) * pageSize.value
        const end = start + pageSize.value
        return filteredData.value.slice(start, end)
    })

    //监听搜索框输入变化，重置当前页
    watch(inputValue,()=>{
        currentPage.value = 1;
    })

    return { currentPage, pageSize, total, currentPageData }
}
const { currentPage, pageSize, total, currentPageData } = page();

const del = ((row: UserInter) => {
    const index = tableData.findIndex((item) => item.id === row.id);
    // console.log(index);
    console.log('del success');
    if (index != -1) {
        tableData.splice(index, 1)
    }
})

</script>

