<template>
  <v-dialog
    :value="show"
    persistent
    max-width="600"
    scrollable
    @input="$emit('update:show', $event)"
  >
    <template v-slot:activator="{ on }">
      <v-btn large color="primary " rounded v-on="on">
        <v-icon>mdi-playlist-plus</v-icon>
        <div class="title">
          新增审计项目
        </div>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">新增审计项目</span>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-container grid-list-xl>
          <v-form ref="auditForm" lazy-validation>
            <v-layout wrap row align-baseline>
              <v-flex xs12 md3>
                <v-chip class="md-2" color="error">
                  审计域名：
                </v-chip>
              </v-flex>
              <v-flex xs12 md8>
                <v-text-field
                  v-model="formItem.domain"
                  label="项目域名"
                  required
                  :rules="auditFormRules.domainRule"
                />
              </v-flex>
              <v-flex xs12 md3>
                <v-chip class="md-2" color="primary">
                  发现漏洞：
                </v-chip>
              </v-flex>
              <v-flex
                v-for="(level, idx) in Object.keys(vulsLevel)"
                :key="`${idx}+A`"
                xs4
                md3
              >
                <v-text-field
                  v-model="formItem.vulsNum[level]"
                  v-mask="numMask"
                  :suffix="vulsLevel[level].label"
                  :rules="auditFormRules.numRule"
                />
              </v-flex>
              <v-flex xs12 md3>
                <v-chip class="md-2" color="success">
                  审计时间：
                </v-chip>
              </v-flex>
              <v-flex xs1 md1>
                <v-icon>mdi-calendar-range</v-icon>
              </v-flex>
              <v-flex
                v-for="item in [auditStartDate, auditEndDate]"
                :key="item.title"
                xs5
                md3
              >
                <v-menu
                  :ref="item.title"
                  v-model="item.datePicker"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="formItem[item.title]"
                      v-mask="dateMask"
                      :label="item.label"
                      :rules="auditFormRules.dateRule"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="formItem[item.title]"
                    no-title
                    :min="item.min"
                    :max="item.max"
                    @change="changeDateAction(item)"
                    @input="item.datePicker = false"
                  />
                </v-menu>
              </v-flex>
              <v-flex xs12 md12>
                <v-divider />
              </v-flex>
              <v-flex xs12 md4>
                <span class="title">审计漏洞细节：</span>
              </v-flex>
              <v-flex xs12 md8>
                <v-select
                  v-model="enabledVulsDetailItem"
                  :items="Object.values(vulsDetailItems)"
                  item-value="key"
                  :menu-props="{
                    bottom: true,
                    offsetY: true
                  }"
                  chips
                  label="点击选择漏洞类型"
                  multiple
                  clearable
                >
                  <template
                    v-slot:selection="{
                      attrs,
                      item,
                      select,
                      index,
                      selected
                    }"
                  >
                    <v-chip
                      v-bind="attrs"
                      :input-value="selected"
                      close
                      color="primary"
                      small
                      @click="select"
                      @click:close="removeVulsDetailItem(index)"
                    >
                      <span>{{ item.text }}</span>
                    </v-chip>
                  </template>
                </v-select>
              </v-flex>
              <v-flex
                v-for="(key, i) in enabledVulsDetailItem"
                :key="`${i}+B`"
                xs12
                md12
              >
                <v-textarea
                  v-model="formItem.vulsDetail[key]"
                  clearable
                  outlined
                  rounded
                  hide-details
                  :label="vulsDetailItems[key].text"
                  rows="6"
                />
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-1" text @click.native="cancelForm">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click.native="submitForm">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { copyObject } from "@/util";
import { mask } from "vue-the-mask";

export default {
  directives: {
    mask
  },
  props: {
    show: Boolean,
    initItem: { type: Object, default: null }
  },
  data: () => {
    return {
      isEdit: false,
      auditFormRules: {
        domainRule: [
          v => !!v || "请输入域名",
          v => v.length <= 256 || "域名过长"
        ],
        numRule: [v => /0{1,2}/.test(v) || !!v || "请输入漏洞数"],
        dateRule: [v => !!v || "请输入审计时间"]
      },
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
      numMask: "##",
      dateMask: "####-##-##",
      auditStartDate: {
        title: "startDate",
        date: new Date().toISOString().substr(0, 10),
        datePicker: false,
        label: "开始日期",
        min: "",
        max: ""
      },
      auditEndDate: {
        title: "endDate",
        date: new Date().toISOString().substr(0, 10),
        datePicker: false,
        label: "结束日期",
        min: "",
        max: ""
      },
      defaultFormItem: {
        domain: "",
        vulsNum: { high: 0, med: 0, low: 0 },
        startDate: new Date().toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        vulsDetail: {
          sqli: "",
          xss: "",
          upload: "",
          xxe: "",
          ssrf: "",
          cmdinject: "",
          csrf: "",
          urljump: "",
          auth: "",
          leakage: "",
          rce: ""
        }
      },
      formItem: {},
      enabledVulsDetailItem: [],
      editedIndex: -1
    };
  },
  watch: {
    enabledVulsDetailItem: newVal => console.log(newVal),
    initItem: function(newVal) {
      if (newVal === null) {
        // if create a new item, init empty form item
        this.isEdit = false;
        this.formItem = copyObject(this.defaultFormItem);
        this.enabledVulsDetailItem = [];
      } else {
        // if edit current item, copy it to form item
        this.isEdit = true;
        this.enabledVulsDetailItem = [];
        this.formItem = copyObject(newVal);
        Object.keys(this.formItem.vulsDetail).forEach(key => {
          if (this.formItem.vulsDetail[key]) {
            this.enabledVulsDetailItem.push(key);
          }
        });
      }
    }
  },
  created() {
    this.initAuditForm();
  },
  methods: {
    changeDateAction(item) {
      if (item.title === "startDate") {
        this.auditEndDate.min = this.formItem["startDate"];
      } else {
        this.auditStartDate.max = this.formItem["endDate"];
      }
    },

    removeVulsDetailItem(index) {
      console.log("remove " + this.enabledVulsDetailItem[index]);
      this.enabledVulsDetailItem.splice(index, 1);
      this.enabledVulsDetailItem = [...this.enabledVulsDetailItem];
    },

    initAuditForm() {
      this.formItem = copyObject(this.defaultFormItem);
      this.editedIndex = -1;
      this.enabledVulsDetailItem = [];
      this.auditDialog = false;
    },
    loadAuditForm(item) {
      this.enabledVulsDetailItem = [];
      this.formItem = copyObject(item);
      Object.keys(this.formItem.vulsDetail).forEach(key => {
        if (this.formItem.vulsDetail[key]) {
          this.enabledVulsDetailItem.push(key);
        }
      });
    },
    submitForm() {
      if (this.$refs.auditForm.validate()) {
        // update vuls detail first
        console.log("submit");
        console.log(this.enabledVulsDetailItem);
        Object.keys(this.formItem.vulsDetail).forEach(key => {
          if (!this.enabledVulsDetailItem.includes(key)) {
            this.formItem.vulsDetail[key] = "";
          }
        });

        // update vuls num type from string to int
        Object.keys(this.formItem.vulsNum).forEach(key => {
          this.formItem.vulsNum[key] = parseInt(this.formItem.vulsNum[key]);
        });

        // this.showDialog = false;
        this.$emit("update:show", false);
        this.$emit("submit-form", this.formItem);
      }
    },
    cancelForm() {
      // this.showDialog = false;
      this.$emit("update:show", false);
      this.$emit("cancel-form");
    }
  }
};
</script>
