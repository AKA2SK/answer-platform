import { Image, View } from "@tarojs/components";
import { AtButton } from "taro-ui";

import Taro from "@tarojs/taro";
import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.scss";
import GlobalFooter from "../../components/GlobalFooter";
import headerBg from "../../assets/headerBg.png";

export default () => {
  return (
    <View className="indexPage">
      <View className="at-article__h1 title"> MBTI 性格测试 </View>
      <View className="at-article__h3 subTitle">
        只要短短几分钟，就可以准备的描述出你是谁，以及你的性格特点
      </View>
      <AtButton
        type="primary"
        size="normal"
        className="enterBtn"
        circle
        onClick={() => {
          Taro.navigateTo({
            url: "/pages/doQuestion/index",
          });
        }}
      >
        开始测试
      </AtButton>
      <Image src={headerBg} style={{ width: "100%", height: "100vh" }} mode="aspectFill" />
      <GlobalFooter />
    </View>
  );
};
