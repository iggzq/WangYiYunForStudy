<template>
  <div>
    <div @click="QRCode">登录</div>
    <div>
      <img :src="QRcodeImg" />
    </div>
  </div>
</template>
<script>
import { getQRCode, getCode, getQRresult } from "@/request/api/home.js";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      QRcodeImg: "",
      qrCodeResult: null,
      unikey: "",
      pollingInterval: null,
    };
  },
  methods: {
    QRCode: async function () {
      const timeStamp = Date.now();
      let code = await getCode(timeStamp);
      let result = await getQRCode(code);
      this.QRcodeImg = result.data.data.qrimg;
      this.unikey = code.data.data.unikey;
    },
    startPolling: async function () {
      this.stopPolling();
      this.pollingInterval = setInterval(async () => {
        console.log(1);
        try {
          let time = Date.now();
          const response = await getQRresult(this.unikey, time);
          if (response.data.code === 802) {
            alert("等待确认");
          }
          if (response.data.code === 803) {
            this.stopPolling();
            alert("登录成功");
            console.log(response);
            console.log(response.data.cookie);
            const cookies = {};
            const cookiePairs = response.data.cookie.split(";");

            cookiePairs.forEach((pair) => {
              const trimmedPair = pair.trim();
              const splitIndex = trimmedPair.indexOf("=");
              const key = trimmedPair.substring(0, splitIndex);
              const value = trimmedPair.substring(splitIndex + 1);
              cookies[key] = value;
              Cookies.set(key,value);
            });
            Cookies.set("cookie", response.data.cookie);
            console.log(Cookies.get());
            console.log(document.cookie);

            this.$router.go(-1);
          }
        } catch (error) {
          console.error(error);
        }
      }, 6000);
    },
    stopPolling() {
      clearInterval(this.pollingInterval);
    },
  },
  watch: {
    unikey() {
      this.startPolling();
    },
  },
};
</script>
