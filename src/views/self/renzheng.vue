<template>
  <div class="containers">
    <div class="conbox boxshadow">
      <div class="inputblock">
        <span>*</span>真实姓名：
        <input type="text" class="reinput">
      </div>
      <div class="inputblock">
        <span>*</span>身份证号：
        <input type="text" class="reinput">
      </div>
    </div>
    <div class="conbox2 boxshadow">
      <div class="title">请上传身份证照片</div>
      <div class="imgs">
        <div class="pic">
          <div class="cameraIcon"></div>
          <div class="text">添加(正面)照片</div>
        </div>
        <div class="pic">
          <div class="cameraIcon"></div>
          <div class="text">添加(背面)照片</div>
        </div>
      </div>
      <div class="desc">证件必须是清晰彩色原件电子版本。可以是扫描件或者数码拍摄照片。支持jpg、png、jpeg的图片格式</div>
    </div>
    <div class="addbtn">保存上传</div>
  </div>
</template>
<script lang="ts">
import { getSelfInfo } from '@/api/hospital'
import { Component, Vue } from 'vue-property-decorator';
import Cookies from 'js-cookie'
@Component({
})
export default class RenZheng extends Vue {
  private pageData: any = {
  }
  private list: any[] = []
  private mounted(): void {
    document.title = '实名认证'
  }
  private save() {
    this.$router.goBack()
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/utils.scss";
.containers{
  height: 100%;
  background: #F3F3F3;
  color: #333333;
  font-size: pm(13);
  .conbox{
    background: white;
    margin: pm(13) pm(10) 0 pm(10);
    padding: pm(16) pm(11) pm(17) pm(4);
  }
  .conbox2{
    background: white;
    margin: pm(10);
    padding: pm(21) pm(19) pm(50) pm(23);
    .title{
      color: #2F2F2F;
      font-size: pm(15);
    }
    .imgs{
      margin-top: pm(20);
      display: flex;
      justify-content: space-between;
      .pic{
        @include wh(135, 137);
        border: 1px dashed #DCE4E5;
        background: #F0F8FA;
        .cameraIcon{
          @include wh(32, 26);
          @include bk('../../assets/image/camera.png');
          margin: pm(44) auto pm(12) auto;
        }
        .text{
          text-align: center;
          color: #999999;
          font-size: pm(10);
        }
      }
    }
    .desc{
      margin-top: pm(21);
      color: #999999;
      font-size: pm(9);
      width: pm(250);
    }
  }
  .reinput{
    flex: 1;
    margin-right: pm(15);
  }
  .addbtn{
    margin-top: pm(68);
  }
}

</style>

