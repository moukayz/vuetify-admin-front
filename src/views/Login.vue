<template>
  <v-app id="login" class="image-bg">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-4 pa-3">
              <v-layout align-center justify-center>
                <v-flex md10>
                  <v-card-text>
                    <div class="layout column align-center">
                      <img
                        src="https://mouka-yang.github.io/images/Hack-logo.jpg"
                        alt="Vue Material Admin"
                        width="120"
                        height="120"
                      />
                      <!-- <h1 class="flex my-4 primary--text">登录</h1> -->
                    </div>
                    <v-spacer />
                    <v-form ref="loginForm" v-model="valid">
                      <v-container grid-list-md align-center justify-center>
                        <v-layout row wrap justify-center>
                          <v-flex d-flex xs12 sm12 md12 lg12>
                            <v-text-field
                              v-model="model.username"
                              :rules="accountRules"
                              append-icon="mdi-account"
                              name="login"
                              label="Login"
                              type="text"
                              maxlength="20"
                              counter="18"
                              color="grey darken-3"
                              outlined
                              rounded
                              autofocus
                            />
                          </v-flex>
                          <v-flex d-flex xs12 sm12 md12 lg12>
                            <v-text-field
                              id="password"
                              v-model="model.password"
                              :rules="passwordRules"
                              append-icon="mdi-lock"
                              name="password"
                              label="Password"
                              type="password"
                              maxlength="20"
                              counter="18"
                              color="grey darken-3"
                              outlined
                              rounded
                            />
                          </v-flex>
                          <v-flex d-flex xs12 sm12 md6 lg6>
                            <v-text-field
                              id="captcha"
                              v-model="model.captcha"
                              :rules="captchaRules"
                              name="captcha"
                              label="Captcha"
                              type="text"
                              color="grey darken-3"
                              maxlength="6"
                              outlined
                              rounded
                              validate-on-blur
                              @keyup.enter="login"
                            />
                          </v-flex>
                          <v-flex xs12 sm12 md6 lg6>
                            <v-img
                              :src="captchaUrl"
                              alt="等一哈"
                              @click.native="reloadCaptcha"
                            />
                          </v-flex>
                          <v-spacer />
                          <v-btn
                            class="grey darken-4 white--text elevation-4"
                            rounded
                            x-large
                            :loading="loading"
                            @click="login"
                          >
                            <div class="pr-3 title">
                              登录
                            </div>
                            <v-icon>mdi-login</v-icon>
                          </v-btn>
                        </v-layout>
                      </v-container>
                    </v-form>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data: () => ({
    baseCaptchaUrl: "/auth/getCaptcha?",
    captchaUrl: "/auth/getCaptcha",
    valid: true,
    loading: false,
    disabled: false,
    model: {
      username: "jasonzyang",
      password: "",
      captcha: ""
    },
    accountRules: [
      v => !!v || "请输入用户名",
      v => (v.length <= 18 && v.length >= 6) || "用户名需要在6~18位之间"
    ],
    passwordRules: [
      v => !!v || "请输入密码",
      v => (v.length <= 18 && v.length >= 6) || "密码需要在6~18位之间"
    ],
    captchaRules: [
      v => !!v || "请输入验证码",
      v => v.length === 6 || "验证码长度为6位"
    ]
  }),

  methods: {
    async login() {
      this.loading = true;

      if (this.$refs.loginForm.validate()) {
        // fetch login state
        if (await this.loginAction(this.model)) {
          // login success
          this.$router.push("/dashboard");
        } else {
          this.reloadCaptcha();
          this.model.captcha = "";
          console.log("login error");
        }
      }

      this.loading = false;
    },
    reloadCaptcha() {
      this.captchaUrl = this.baseCaptchaUrl + Date.now();
    },
    ...mapActions(["loginAction"])
  }
};
</script>
<style scoped lang="css">
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
.login {
  background-color: #000000;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cg fill-opacity='0.15'%3E%3Ccircle fill='%23000000' cx='400' cy='400' r='600'/%3E%3Ccircle fill='%23180d1c' cx='400' cy='400' r='500'/%3E%3Ccircle fill='%23261431' cx='400' cy='400' r='400'/%3E%3Ccircle fill='%23351947' cx='400' cy='400' r='300'/%3E%3Ccircle fill='%23451e5e' cx='400' cy='400' r='200'/%3E%3Ccircle fill='%23552277' cx='400' cy='400' r='100'/%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
}
.image-bg {
  background-color: #0833a2;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23181722' stroke-width='66.7' stroke-opacity='0.05' %3E%3Ccircle fill='%230833a2' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%231b2f99' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23252b90' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%232b2788' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%232f237f' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%23312077' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%23331c6f' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%23331967' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%23331660' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%23331358' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%23321051' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%23300e4a' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%232e0b43' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%232c093c' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%23290736' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%2326062f' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%2324032a' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%23210024' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
}
</style>
