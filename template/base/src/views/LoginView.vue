<template>
  <div class="login-container">
    <div class="new-layout">
      <div class="title-text">标题名称</div>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container">
          <span class="title">用户登录</span>
        </div>
        <el-form-item prop="username" size="medium">
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="用户名"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          >
            <template #prefix>
              <svg-icon name="user" />
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password" size="medium">
          <el-input
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            auto-complete="on"
          >
            <template #prefix>
              <svg-icon name="password" />
            </template>
            <template #suffix>
              <svg-icon
                :name="passwordType === 'password' ? 'eye' : 'eye-open'"
                color="black"
                :style="`cursor: pointer; margin-top: ${
                  passwordType === 'password' ? 12 : 12
                }px`"
                @click="showPwd"
              />
            </template>
          </el-input>
        </el-form-item>
        <!-- 若不需要验证码，隐藏即可 -->
        <!-- <el-form-item prop="verification" size="medium">
          <div class="inline-item">
            <el-input
              ref="verification"
              v-model="loginForm.verification"
              placeholder="验证码"
              name="verification"
              tabindex="3"
              auto-complete="on"
              @keyup.enter="handleLogin"
            />
            <el-image
              class="verification-code"
              :src="verificationUrl"
              fit="fill"
              @click="refreshVerification"
            />
          </div>
        </el-form-item> -->
        <el-button class="submit-btn" :loading="loading" @click="handleLogin"
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick, computed } from "vue";

const baseURL = import.meta.env.VUE_APP_BASE_API;
const loginForm = reactive({
  username: "",
  password: "",
  verification: "",
});
const loading = ref(false);
const passwordType = ref("password");
const callbackUrl = ref("");
const throttleFun = ref<any>("");
const password = ref<any>(null);
const autofrettage = ref<any>(null);

const validateUsername = (rule: any, value: string, callback: any) => {
  if (value === "") {
    callback(new Error("请输入用户名"));
  } else {
    callback();
  }
};
const validateVerification = (rrule: any, value: string, callback: any) => {
  if (value === "") {
    callback(new Error("请输入验证码"));
  } else {
    callback();
  }
};

const loginRules = {
  username: [{ required: true, trigger: "blur", validator: validateUsername }],
  password: [
    { required: true, message: "请输入登录密码", trigger: "blur" },
    {
      pattern:
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()])(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()])[\da-zA-Z!@#$%^&*()]{8,32}$/,
      message:
        "密码最少包含2个大写字母、2个小写字母、2个数字、2个特殊字符、长度8到32位",
    },
  ],
  verification: [
    { required: true, trigger: "blur", validator: validateVerification },
  ],
};

const showPwd = () => {
  if (passwordType.value === "password") {
    passwordType.value = "";
  } else {
    passwordType.value = "password";
  }
  nextTick(() => {
    password.value.focus();
  });
};
const handleLogin = () => {
  console.log("登录");
};

/********************* 验证码 start ************************** */

// const verificationUrl = computed(() => {
//   // 获取验证码的接口地址，实例地址为公卫单点验证码接口地址
//   return baseURL + `/tool/captcha?sign=${autofrettage.value}`;
// });

// const refreshVerification = () => {
//   const refresh = () => {
//     autofrettage.value = randomNumber();
//   };
//   if (!throttleFun.value) {
//     refresh();
//     throttleFun.value = 1;
//     setTimeout(() => {
//       throttleFun.value = "";
//     });
//   }
// };

// const randomNumber = () => {
//   const stamp = new Date().getTime();
//   return (((1 + Math.random()) * stamp) | 0).toString(16);
// };

// const setCallbackUrl = () => {
//   const url = window.location.href;
//   callbackUrl.value = url.split("?callbackUrl=")[1];
// };

/********************* 验证码 end ************************** */
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #fff;
$light_gray: #fff;
$cursor: #fff;

html {
  background-color: #050f3a;
}

@media screen and (max-width: 1360px) {
  html {
    font-size: 12.5px !important;
  }
}

@media screen and (min-width: 1360px) {
  html {
    font-size: calc(100vw / 96) !important;
  }
}

.login-container {
  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .el-form-item__error {
    text-align: left;
    font-size: 12px;
  }

  .el-form-item {
    width: 100%;
    border: 1px solid #e1e3e6;
    // background:  #38427D;
    border-radius: 2px;
    color: #f0f3fa;
    margin-bottom: 30px;

    .el-input__prefix {
      left: 8px !important;
      top: 8px;
    }

    .el-input__suffix {
      top: 50%;
      transform: translateY(-50%);
    }
    .el-input__inner {
      box-shadow: none;
    }

    .el-input {
      input {
        // background: #38427D;
        border: 0;
        -webkit-appearance: none;
        border-radius: 0;
        color: #333;
        caret-color: #333;

        &:-webkit-autofill {
          box-shadow: 0 0 0 1000px $bg inset !important;
          -webkit-text-fill-color: #333 !important;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  position: relative;
  height: 100%;
  width: 100%;
  //min-width: 1360px;
  background-image: url("../assets/login-bg2.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  text-align: center;

  .submit-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 36px;
    color: #ffffff;
    background: rgba(74, 129, 254, 1);
    border: none;
    border-radius: 2px;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 3.6rem;
  }

  .login-title {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }

  .title-text {
    position: absolute;
    top: -68px;
    left: -66px;
    margin-bottom: 24px;
    // right: 2.3rem;
    text-align: center;
    width: 100%;
    // font-size: 1.8rem;
    font-size: 44px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #fff;
    letter-spacing: 4px;
    white-space: nowrap;
  }

  .login-pic {
    position: absolute;
    left: 10rem;
    top: 58%;
    transform: translate(0, -60%);
    display: block;
    width: 38%;
  }

  .login-form {
    width: 100%;
    min-width: 350px;
    background: #fff;
    border-radius: 4px;
    padding: 0 2.5rem;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #333;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title-container {
    position: relative;
    padding: 1.8rem 0 !important;

    .title {
      width: 100%;
      text-align: center;
      font-size: 1.6rem;
      font-weight: 500;
      color: #333;
    }
  }

  .inline-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .verification-code {
    width: 128px;
    height: 30px;
    margin-right: 4px;
    border-radius: 4px;
    cursor: pointer;
    background-color: #ddd;
  }
  .new-layout {
    position: absolute;
    right: 13rem;
    top: 50%;
    transform: translate(0, -50%);
    width: 440px;
  }
  .svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    vertical-align: middle;
  }
}
</style>
