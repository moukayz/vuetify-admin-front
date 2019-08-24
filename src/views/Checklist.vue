<template>
  <div id="checklist" class="white-color">
    <v-container grid-list-xl>
      <v-layout class="mx-10" justify-center column align-content-space-around>
        <v-flex lg10>
          <div class="display-2 mt-10">Checklist参考</div>
        </v-flex>
        <v-flex lg10>
          <v-card flat class="mt-5">
            <v-layout row wrap align-start justify-start class="px-5">
              <v-flex sm12 xs12 md4 lg2>
                <span class="title">请选择漏洞类型：</span>
              </v-flex>
              <v-flex md6 lg4>
                <v-select
                  v-model="selectedItem"
                  prepend-inner-icon="mdi-target"
                  placeholder="漏洞类型"
                  full-width
                  hide-details
                  solo
                  :items="checkItems"
                ></v-select>
              </v-flex>
              <v-flex md12 class="mt-5">
                <v-list v-if="selectedItem !== ''" flat>
                  <v-subheader class="title method-header" color="info"
                    ><v-icon class="method-icon">mdi-alert-circle</v-icon
                    >排查项目</v-subheader
                  >
                  <v-list-item-group multiple>
                    <template
                      v-for="(item, index) in checklists[selectedItem].methods"
                    >
                      <v-list-item :key="index">
                        <template v-slot:default="{ active, toggle }">
                          <v-list-item-action>
                            <v-checkbox
                              v-model="active"
                              color="info"
                              @click="toggle"
                            >
                            </v-checkbox>
                          </v-list-item-action>
                          <v-list-item-content class="list-item">
                            {{ index }} - {{ item }}
                          </v-list-item-content>
                        </template>
                      </v-list-item>
                      <v-divider :key="index + 'A'"></v-divider>
                    </template>
                  </v-list-item-group>
                  <v-subheader class="title mt-3 result-header"
                    ><v-icon class="result-icon">mdi-check</v-icon
                    >预期结果</v-subheader
                  >
                  <v-list-item-group multiple>
                    <template
                      v-for="(item, index) in checklists[selectedItem].results"
                    >
                      <v-list-item :key="index">
                        <template v-slot:default="{ active, toggle }">
                          <v-list-item-action>
                            <v-checkbox
                              v-model="active"
                              color="success"
                              @click="toggle"
                            >
                            </v-checkbox>
                          </v-list-item-action>
                          <v-list-item-content class="list-item">
                            {{ index }} - {{ item }}
                          </v-list-item-content>
                        </template>
                      </v-list-item>
                      <v-divider :key="index + 'B'"></v-divider>
                    </template>
                  </v-list-item-group>
                </v-list>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => {
    return {
      checkItems: [
        { text: "无", value: "" },
        { text: "存储型XSS", value: "storexss" },
        { text: "DOM型XSS", value: "domxss" },
        { text: "SQL注入", value: "sqli" },
        { text: "XXE", value: "xxe" },
        { text: "SSRF", value: "ssrf" },
        { text: "命令注入", value: "cmdinject" },
        { text: "CSRF", value: "csrf" },
        { text: "URL任意跳转", value: "urljump" },
        { text: "文件上传", value: "fileupload" },
        { text: "路径穿越", value: "pathtraverse" }
      ],
      selectedItem: "",
      checkItemDetail: {
        xss: {
          methods: [
            "列举所有用户输入跨请求返回前端的场景",
            "测试每个场景的服务端处理和输出点。确保无法插入DOM中",
            "确认服务端是否存在全局的XSS过滤，梳理过滤遗漏以及防御失效的场景",
            "对于Ajax接口，需要了解前端js框架中拼接写入DOM的方式。排查这些函数以及JS原生写入DOM函数的使用。排查是否用户可控"
          ],
          results: [
            "前端代码未将外部参数直接写入DOM。",
            "如写入DOM，则必须进行过滤"
          ]
        },
        fileupload: {
          methods: [
            "文件后缀是否外部可控。",
            '如果外部可控则判断前置目录设置是否合理，是否可执行目录。用户可控部分是否对"../ "或着"..\\"（windows）做相应的检测处理。是否对读取文件后缀进行控制。',
            "尝试跨目录上传是否可以成功",
            "测试服务器后台是否对文件类型做限制"
          ],
          results: [
            "文件上传无目录穿越问题",
            "文件不能上传到可执行目录",
            "限制文件后缀不能是该开发语言可执行文件，如.php  .jsp .jspx   .js 等"
          ]
        }
      }
    };
  },
  computed: {
    ...mapState(["checklists"])
  },
  watch: {
    selectedItem: (cur, prev) => console.log(cur)
  },
  methods: {
    ...mapActions(["getAllRefsAction"])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getAllRefsAction());
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+SC&display=swap");

.list-item {
  font-family: "Noto Sans SC", sans-serif;
  font-size: 18px;
}
.white-color {
  background-color: white !important;
  height: 100%;
  width: 100%;
}
.method-header {
  color: red !important;
}
.result-header {
  color: green !important;
}
.method-icon {
  color: red !important;
  padding-right: 4px;
}
.result-icon {
  color: green !important;
  padding-right: 4px;
}

.list-enter-active,
.list-leave-active,
.list-move {
  transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.list-enter {
  opacity: 0;
  transform: translateX(50px) scaleY(0.5);
}

.list-enter-to {
  opacity: 1;
  transform: translateX(0) scaleY(1);
}

.list-leave-active {
  position: absolute;
}

.list-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: center top;
}
</style>
