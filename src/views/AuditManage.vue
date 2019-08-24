<template>
  <div id="auditManage">
    <v-container grid-list-xl fill-height fluid>
      <v-layout justify-center column align-content-space-around class="mx-10">
        <v-flex lg10>
          <div class="display-2 mt-10">
            审计项目管理
          </div>
        </v-flex>
        <v-flex lg10 />
        <v-flex lg10>
          <v-data-table
            :headers="auditTableHeader"
            :items="auditItems"
            item-key="domain"
            show-expand
            :expanded.sync="expandedItems"
            :page.sync="page"
            :search="searchedDomain"
            hide-default-footer
            class="elevation-1"
            transition="fade-transition"
            @page-count="pageCount = $event"
          >
            <template v-slot:expanded-item="{ headers, item }">
              <v-fade-transition mode="out-in">
                <td :colspan="headers.length" class="px-0">
                  <v-card flat>
                    <v-tabs vertical color="info">
                      <v-tabs-slider></v-tabs-slider>
                      <v-tab
                        v-for="key in filterZeroVulsDetail(item.vulsDetail)"
                        :key="key"
                        class="subtitle font-weight-bold"
                      >
                        {{ vulsDetailItems[key].text }}
                      </v-tab>
                      <v-tab-item
                        v-for="key in filterZeroVulsDetail(item.vulsDetail)"
                        :key="key + '-detail'"
                        class="subtitle px-4"
                      >
                        <p class="blockquote ">
                          {{ item.vulsDetail[key] }}
                        </p>
                      </v-tab-item>
                    </v-tabs>
                  </v-card>
                </td>
              </v-fade-transition>
            </template>
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-layout row align-center>
                  <v-flex xs12 md6>
                    <v-text-field
                      v-model="searchedDomain"
                      single-line
                      prepend-icon="mdi-magnify"
                      label="搜索域名"
                      hide-details
                    />
                  </v-flex>
                  <v-flex xs2 md3>
                    <v-btn text icon @click="refreshAuditTable">
                      <v-icon large>mdi-reload</v-icon>
                    </v-btn>
                  </v-flex>
                  <v-flex xs10 md3 d-flex flex-row-reverse pr-5>
                    <audit-dialog
                      :show.sync="dialogOption.show"
                      :init-item="editedAuditItem"
                      @cancel-form="cancelAuditForm"
                      @submit-form="submitAuditForm($event)"
                    ></audit-dialog>
                  </v-flex>
                </v-layout>
              </v-toolbar>
            </template>

            <template v-slot:item.action="{ item }">
              <v-btn
                small
                class="mr-2"
                color="info"
                @click="editAuditItem(item)"
              >
                <v-icon small>
                  mdi-pencil
                </v-icon>
              </v-btn>
              <v-btn
                small
                class="mr-2"
                color="error"
                @click="deleteAuditItem(item)"
              >
                <v-icon small>
                  mdi-delete
                </v-icon>
              </v-btn>
            </template>
            <template v-slot:item.vulsNum="{ item }">
              <v-chip
                v-for="(vul, i) in filterZeroVulsNum(item.vulsNum)"
                :key="`${i}+C`"
                small
                :color="vulsLevel[vul].color"
              >
                {{ item.vulsNum[vul] }}
              </v-chip>
            </template>
          </v-data-table>
          <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCount" />
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <notify-bar
      :show.sync="notifyOption.show"
      :message="notifyOption.message"
      :color="notifyOption.color"
    ></notify-bar>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";
import { mapActions, mapState } from "vuex";
import { copyObject } from "@/util";
import notifyBar from "@/components/NotifyBar.vue";
import auditDialog from "@/components/AuditDialog.vue";

export default {
  components: {
    notifyBar,
    auditDialog
  },
  directives: {
    mask
  },
  data: () => {
    return {
      notifyOption: {
        show: false,
        message: "",
        color: "success",
        timeout: 2000
      },
      dialogOption: {
        show: false
      },
      searchedDomain: "",
      vulsLevel: {
        high: { color: "error", label: "高" },
        med: { color: "warning", label: "中" },
        low: { color: "success", label: "低" }
      },
      vulsDetailItems: {
        sqli: { key: "sqli", text: "SQL注入" },
        xss: { key: "xss", text: "XSS" },
        upload: { key: "upload", text: "文件上传" },
        xxe: { key: "xxe", text: "XXE" },
        ssrf: { key: "ssrf", text: "SSRF" },
        cmdinject: { key: "cmdinject", text: "命令注入" },
        csrf: { key: "csrf", text: "CSRF" },
        urljump: { key: "urljump", text: "URL任意跳转" },
        auth: { key: "auth", text: "权限漏洞" },
        leakage: { key: "leakage", text: "信息泄露" },
        rce: { key: "rce", text: "远程代码执行" }
      },
      auditDialog: false,
      auditTableHeader: [
        {
          text: "审计域名",
          align: "left",
          sortable: true,
          value: "domain"
        },
        {
          text: "发现漏洞数",
          align: "left",
          sortable: true,
          value: "vulsNum"
        },
        {
          text: "审计开始日期",
          align: "left",
          sortable: true,
          value: "startDate"
        },
        {
          text: "审计结束日期",
          align: "left",
          sortable: true,
          value: "endDate"
        },
        {
          text: "操作",
          align: "center",
          value: "action",
          sortable: false
        }
      ],
      expandedItems: [],
      editedAuditItem: null,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10
    };
  },
  computed: {
    ...mapState(["auditItems"])
  },
  created() {
    this.resetAuditForm();
    this.refreshAuditTable();
  },
  methods: {
    ...mapActions([
      "deleteAuditItemAction",
      "saveAuditItemAction",
      "getAllAuditItemsAction"
    ]),
    showNotify(message, success) {
      this.notifyOption.message = message;
      this.notifyOption.color = success ? "success" : "error";
      this.notifyOption.show = true;
    },
    filterZeroVulsNum(vulsNum) {
      return Object.keys(vulsNum).filter(key => vulsNum[key] !== 0);
    },
    filterZeroVulsDetail(vulsDetails) {
      return Object.keys(vulsDetails).filter(key => vulsDetails[key] !== "");
    },
    async refreshAuditTable() {
      if (await this.getAllAuditItemsAction()) {
        this.showNotify("刷新数据成功", true);
      } else {
        this.showNotify("刷新数据失败", false);
      }
    },
    async reloadAuditTable() {
      await this.getAllAuditItemsAction();
    },
    resetAuditForm() {
      this.editedAuditItem = null;
    },
    loadAuditForm(item) {
      this.editedAuditItem = item;
      this.dialogOption.show = true;
    },
    async submitAuditForm(item) {
      const create = this.editedAuditItem === null;
      if (await this.saveAuditItemAction({ data: item, create })) {
        this.showNotify(create ? "创建成功" : "修改成功", true);
      } else {
        this.showNotify(create ? "创建失败" : "修改失败", false);
      }
      this.resetAuditForm();
    },
    cancelAuditForm() {
      this.resetAuditForm();
    },
    editAuditItem(item) {
      this.loadAuditForm(item);
    },
    async deleteAuditItem(item) {
      if (confirm("确定删除该审计条目吗？")) {
        if (await this.deleteAuditItemAction({ itemId: item._id })) {
          this.showNotify("删除成功", true);
        } else {
          this.showNotify("删除失败", false);
        }
      }
    }
  }
};
</script>

<style></style>
