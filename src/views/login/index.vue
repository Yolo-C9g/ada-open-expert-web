<template>
  <section class="login">
    <section class="login-container">
      <div class="login-container-left">
        <div class="login-container-left-wrap">
          <el-carousel autoplay height="500px" direction="vertical" indicator-position="none">
            <el-carousel-item v-for="item in loginPinia.banners" :key="item" >
              <img class="login-container-left-wrap-bkg" :src="loginPinia.onImageUrlAction(item)" alt="" />
            </el-carousel-item>
          </el-carousel>
        </div>

      </div>

      <div class="login-container-content">
        <div class="login-container-module">
          <div class="logo">
            <div class="logo-pic">
              <img :src="loginPinia.onImageUrlAction('sys_logo.svg')" alt="">
            </div>
          </div>

          <div class="login-container-form">
            <div class="login-container-form-username">
              <el-icon size="18" color="#409EFF"><User /></el-icon>
              <el-input
                placeholder="请输入企业账户ID"
                type="text"
                v-model="loginPinia.username"
                maxlength="8"
                clearable
                v-enter-key-down="{data: loginPinia.onLoginAction}"
              >
              </el-input>
            </div>
            <div class="login-container-form-username">
              <el-icon size="18" color="#409EFF"><Lock /></el-icon>
              <el-input
                placeholder="请输入密码"
                v-model="loginPinia.password"
                type="password"
                clearable
                v-enter-key-down="{data: loginPinia.onLoginAction}"
              >
              </el-input>
            </div>
          </div>

          <div class="login-container-btnwwrap" @click="loginPinia.onLoginAction()">
            <el-button 
                class="btn" 
                type="primary"
                :loading="loginPinia.loading"
                :disabled="(!loginPinia.username) || (!loginPinia.password)"
                @click="loginPinia.onLoginAction()"
            >登 录</el-button>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useLoginPinia from '@/pinia/login/index'
import vEnterKeyDown from '@/directives/key-down'

export default defineComponent({
  name: 'loginPage',
  directives: {
    vEnterKeyDown,
  }
})
</script>

<script lang="ts" setup>
const loginPinia = useLoginPinia()
</script>

<style lang="scss">
@import '../../assets/style/colors';

  .login {
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .el-button {
      width: 100%;
      font-size: 16px;
      font-weight: normal;
    }

    &-container {
      display: flex;
      justify-content: space-between;
      width: 700px;
      height: 500px;
      border-radius: 8px;

      &:hover {
        box-shadow: rgb(211, 221, 232) 0px 3px 30px 0px;
      }

      &-left {
        width: 373px;
        height: 100%;

        &-wrap {
          position: relative;
          width: 100%;
          height: 100%;

          &-bkg {
            width: 100%;
            height: 100%;
            z-index: -10;
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
          }

          &-title {
            position: absolute;
            top: 15%;
            left: 10%;
            z-index: 10;
          }

        }
      }

      &-content {
        flex: 1;
        position: relative;
        background:rgba(255,255,255,1);
        box-shadow:0px 12px 70px 0px rgba(141,149,169,0.27);
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
      }

      .wwlogin {
        padding-top: 50px;
        width: 100%;
        height: 100%;
      }

      &-type {
        position: absolute;
        width: 100%;

        img {
          position: absolute;
          top: 0;
          right: 0;
          width: 54px;
          height: 54px;
          cursor: pointer;
        }

        div {
          position: absolute;
          top: 10px;
          right: 10px;
          color: $main-color;
          cursor: pointer;
        }
      }

      &-module {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin: 20% 20% 0;

        .logo {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-top: 20px;

          &-pic {
            width: 70px;
            img {
              width: 120px;
            }
          }
          &-info {
            display: flex;
            margin-top: 40px;
            align-items: center;
            height:17px;
            font-size:18px;
            font-weight:500;
            line-height:17px;
            color: #293754;

            img {
              width: 28%;
            }
          }
        }
      }

      &-form {
        margin-top: 25px;

        &-username {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 36px;
          border-bottom: 1px solid #EBEFF3;


          img {
            margin-left: 14px;
            width: 20px;
            height: 21px;
          }

          .el-input__wrapper {
            box-shadow: none;
          }
        }

      }

      &-btnwwrap {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 40px auto 0;
        width: 100%;
        font-size:18px;
        border-radius:20px;

        .btn {
            height: 100%;
        }
      }
    }
  }
</style>
