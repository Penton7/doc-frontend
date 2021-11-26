<template>
  <div class="app-container">
     <br>
    <!-- our custom upload button -->
    <label for="actual-btn"> <input type="file" ref="file" id="actual-btn" @change="selectFile" hidden/> Choose File
    </label>
    <br>
    <div class="alert alert-light" role="alert">{{ message }}</div>
    <br><br>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Document Name">
        <template slot-scope="scope">
          {{ scope.row.document_name }}
        </template>
      </el-table-column>
      <el-table-column label="Document Hash">
        <template slot-scope="scope">
          {{ scope.row.doc_hash }}
        </template>
      </el-table-column>
      <el-table-column label="Transaction Hash">

        <template slot-scope="scope">
          <a target="_blank" :href="`https://horizon-testnet.stellar.org/transactions/${scope.row.tx_hash}`">
          {{ scope.row.tx_hash }}
         </a>
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <!--      <el-table-column label="Pageviews" width="110" align="center">-->
      <!--        <template slot-scope="scope">-->
      <!--          {{ scope.row.pageviews }}-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column class-name="status-col" label="Sign" width="110" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.sign" :type="scope.row.sign | statusFilter">{{ scope.row.sign }}</el-tag>
          <el-button  v-if="!scope.row.sign" @click="sendToSing(scope.row.doc_hash)">Sign</el-button>
        </template>
      </el-table-column>
      <!--      <el-table-column align="center" prop="created_at" label="Display_time" width="200">-->
      <!--        <template slot-scope="scope">-->
      <!--          <i class="el-icon-time" />-->
      <!--          <span>{{ scope.row.display_time }}</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
    </el-table>
  </div>
</template>

<script>
import {getList} from '@/api/table'
import UploadService from "../../services/UploadFilesService";
import {Message} from "element-ui";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        true: 'success',
        // draft: 'gray',
        false: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
      doc_hash: "",
      fileInfos: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        console.log(this.list)
        this.listLoading = false
      })
    },
    selectFile() {
      this.selectedFiles = this.$refs.file.files;
      this.upload();
    },
    sendToSing(doc_hash) {
      this.$router.push({ path: '/documents/index', query: {doc_hash: doc_hash}})
      this.$emit('el-input', doc_hash)
    },
    upload() {
      this.progress = 0;

      this.currentFile = this.selectedFiles.item(0);
      UploadService.upload(this.currentFile, this.privateKey, event => {
        this.progress = Math.round((100 * event.loaded) / event.total);
        Message({
            message: 'Success Upload!',
            type: 'success',
            duration: 5 * 500
          });
        this.fetchData();
      })
        .catch(() => {
          this.progress = 0;
          this.message = "Could not upload the file!";
          this.currentFile = undefined;
        });

      this.selectedFiles = undefined;
    }
  }
}
</script>
<style scoped>
a {
    text-decoration: none; /* отменяем стандартное подчеркивание,
                            * иначе будет две полосы */
    border-bottom: 3px solid pink; /* добавляем нижнюю границу */
    padding-bottom: 1px; /* делаем небольшое расстояние между текстом и границей */
}
label {
  background-color: indigo;
  color: white;
  padding: 0.5rem;
  font-family: sans-serif;
  border-radius: 0.3rem;
  cursor: pointer;
  margin-top: 1rem;
}

#file-chosen {
  margin-left: 0.3rem;
  font-family: sans-serif;
}
.el-button {

  background-color: #8bd9bd;
}
</style>
