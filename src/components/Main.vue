<template>
  <div style="height: 100%">
    <el-container class="container">
      <el-header height="80px" style="line-height:36px;">
        <div>
          <span>长春分公司员工宽带竞赛开</span>
          <el-button icon="el-icon-download" type="text" v-on:click="downTable">下载表格</el-button>
        </div>
        <div class="filter-box">
          <el-date-picker v-model="dates" type="daterange" range-separator="至"
            start-placeholder="开始日期" end-placeholder="结束日期" size="mini">
          </el-date-picker>
          <el-input placeholder="请输入内容" v-model="fieldValue" class="input-with-select" :clearable="true" size="mini">
            <el-select v-model="fieldName" slot="prepend" placeholder="请选择" width="110">
              <el-option label="员工部门" value="dept"></el-option>
              <el-option label="员工姓名" value="name"></el-option>
              <el-option label="员工编号" value="number"></el-option>
              <el-option label="员工手机号" value="mobile"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" v-on:click="query"></el-button>
          </el-input>
        </div>
      </el-header>
      <el-main>
        <el-table v-loading="loading" :data="dataSource" border style="width: 100%;overflow: auto;" size="mini">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="dept" label="员工部门" width="100"></el-table-column>
          <el-table-column prop="name" label="员工姓名" width="80"></el-table-column>
          <el-table-column prop="number" label="员工编号" width="80"></el-table-column>
          <el-table-column prop="mobile" label="员工手机号" width="100"></el-table-column>
          <el-table-column prop="area" label="用户区域" width="80"></el-table-column>
          <el-table-column prop="village" label="用户小区" width="100"></el-table-column>
          <el-table-column prop="building" label="用户楼栋" width="80"></el-table-column>
          <el-table-column prop="unit" label="用户单元" width="80"></el-table-column>
          <el-table-column prop="door" label="门牌号" width="80"></el-table-column>
          <el-table-column prop="user_name" label="办理人姓名" width="100"></el-table-column>
          <el-table-column prop="user_contact" label="联系电话" width="100"></el-table-column>
          <el-table-column prop="user_mobile" label="融合主卡号码" width="100"></el-table-column>
          <el-table-column prop="remark" label="备注" width="100"></el-table-column>
          <el-table-column prop="create_time" label="填报时间" width="160">
            <template slot-scope="scope">
              <span>{{formatDate(scope.row.create_time)}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer height="36px">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 50, 100, 200]" :page-size="size" :total="total" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import qs from 'qs';
import api from '@/api';
import moment from 'moment';

moment.locale('zh-cn');

export default {
  data() {
    return {
      loading: false,
      dataSource: [],
      total: 0,
      page: 1,
      size: 20,
      fieldName: '',
      fieldValue: '',
      dates: [],
    };
  },
  mounted() {
    this.query();
  },
  methods: {
    async query() {
      this.loading = true;
      if(!this.dates || this.dates.length != 2) return;
      try {
        const res = await api.query({
          page: this.page,
          size: this.size,
          field: this.fieldName,
          value: this.fieldValue,
          start: moment(this.dates[0]).format('YYYYMMDD'),
          end: moment(this.dates[1]).format('YYYYMMDD')
        });
        console.log(res);
        if (res.errcode === 0) {
          this.$message({
            type: 'success',
            message: '信息查询成功',
            duration: 1000
          });
          this.dataSource = res.data;
          this.total = res.total;
        } else {
          this.$notify.error({
            title: '错误',
            message: res.errmsg
          });
        }
      } catch (err) {
        console.error(err);
        this.$notify.error({
          title: '错误',
          message: err.message || '处理失败'
        });
      } finally {
        this.loading = false;
      }
    },
    down() {
      this.$message({
        type: 'warn',
        message: '功能未实现',
        duration: 1000
      });
    },
    downTable() {
      if(!this.dates || this.dates.length != 2) return;
      const params = {
          field: this.fieldName,
          value: this.fieldValue,
          start: moment(this.dates[0]).format('YYYYMMDD'),
          end: moment(this.dates[1]).format('YYYYMMDD')
      };
      window.open(`/race/admin/exportXlsx?${qs.stringify(params)}`, '_blank');
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val;
      if (this.total == 0) return;
      var pages = Math.floor((this.total + val) / val);
      if (pages < this.page) this.page = pages;
      this.query();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.query();
    },
    formatDate(date) {
      return moment(date).format('lll');
    },
    handleSelect(item) {
      console.log(item);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.container {
  min-width: 100%;
  height: 100%;
}
.el-table {
  height: 100%;
  overflow: auto;
}
.filter-box {
  display: inline-block;
  .el-input {
    width: 280px;
  }
  .el-select {
    width: 100px;
  }
  .el-date-editor{
    width: 240px;
  }
  .el-range-separator{
    width: auto;
  }
}
.label {
  font-weight: bold;
}
.text {
  word-wrap: none;
}
</style>
